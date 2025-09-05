# 📘 DevTeam Bootcamp – Ders 4

## Hedefler
* Authentication (kimlik doğrulama): Email + şifre ile giriş yapmayı, JWT
  oluşturmayı öğrenecek.
* Authorization (yetkilendirme): Sadece doğrulanmış kullanıcıların belirli
  işlemleri yapabilmesini uygulayacak.
* 2FA / Yetki Yükseltme: Kritik işlemler (email değiştirme, şifre değiştirme,
  hesap silme) için ikinci adım doğrulama epostasını kullanacak.
* Todo API: Her kullanıcı kendi todo listesini yönetecek.

### Authentication & Account
* `POST /signup`: Email ve şifre ile hesap oluşturur.
* `POST /login`: Email + şifre kontrol edilir, başarılıysa JWT döndürülür.

### Authorization & 2FA (Yetki Yükseltme)
* `POST /me/2fa?scope=change_email|change_password|delete_account`
  * Belirtilen işlem için eposta doğrulama tokeni üretir.
  * Mock mail server üzerinden kullanıcıya gönderir.
  * Kullanıcı bu tokeni doğruladıktan sonra kritik işlemi yapabilir.

### Account Management
* `PATCH /me/email`: Kullanıcının email adresini değiştirir (**2FA gerekir**).
* `PATCH /me/password`: Kullanıcının şifresini değiştirir (**2FA gerekir**).
* `DELETE /me`: Hesabı siler (**2FA gerekir**).

### Todos
* `GET /me/todos`: Kullanıcının todo’larını listeler.
* `POST /me/todos`: Yeni todo ekler.
* `DELETE /me/todos/:id`: Kullanıcının kendi todo’sunu siler.

## Express.js Örnek Kod
### Setup
```js
import express from 'express';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

const users = [];
const todos = [];
const JWT_SECRET = 'supersecret';
```

### Mail Gönderim Yardımcısı
```js
async function sendMail(to, title, content) {
  await fetch('http://localhost:1186/api/internal/mail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to,
      from: 'no-reply@my-todo-application.com',
      content,
      type: 'html',
      title
    }),
  });
}
```

### Register & Login
```js
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const user = { id: Date.now(), email, password };
  users.push(user);

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'User not found' });

  if (password != user.password)
    return res.status(401).json({ error: 'Wrong password' });

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});
```

### Middleware
```js
function auth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'No token' });

  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid token' });
  }
}
```

### Todos (Protected Routes)
```js
app.get('/me/todos', auth, (req, res) => {
  const userTodos = todos.filter(t => t.userId === req.user.sub);
  res.json(userTodos);
});

app.post('/me/todos', auth, (req, res) => {
  const todo = { id: Date.now(), userId: req.user.sub, text: req.body.text };
  todos.push(todo);
  res.status(201).json(todo);
});

app.delete('/me/todos/:id', auth, (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id && t.userId === req.user.sub);

  if (!todo)
    return res.status(404).json({ error: 'Todo not found' });

  todos.splice(todos.indexOf(todo), 1);
  res.status(204).send();
});
```

### 2FA & Critical Actions (Örnek: Email Değiştirme)
```js
app.post('/me/2fa', auth, async (req, res) => {
  const { scope } = req.query;
  if (!['change_email', 'change_password', 'delete_account'].includes(scope))
    return res.status(400).json({ error: 'Invalid scope' });

  const token = jwt.sign(
    { sub: req.user.sub, scope },
    JWT_SECRET,
    { expiresIn: '10m' }
  );

  await sendMail(req.user.email, 'İki Faktörlü Doğrulama Tokenı', `${token}`);
  res.json({ message: 'Doğrulama tokenı gönderildi.' });
});

app.patch('/me/email', auth, (req, res) => {
  const { newEmail, token } = req.body;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.sub !== req.user.sub || payload.scope !== 'change_email')
      return res.status(403).json({ error: 'Invalid 2FA token' });

    const user = users.find(u => u.id === req.user.sub);
    user.email = newEmail;
    res.json({ message: 'Email güncellendi.' });
  } catch {
    res.status(403).json({ error: '2FA tokenı geçersiz' });
  }
});
```

## Mini Proje
1. Signup/Login → JWT auth
2. Todo CRUD (sadece kendi todo’ları)
3. Email/password değiştirirken 2FA kontrolü
4. Hesap silme akışı
