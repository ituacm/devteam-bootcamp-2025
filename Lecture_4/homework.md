# 📅 Hafta 04 — Authentication & Authorization & Mimari İyileştirmeler

## 🎯 Hedef
- Kullanıcılar kayıt olup giriş yapabilsin.
- **JWT (stateless, yalnızca access token)** ile korunan endpoint’lere erişim sağlansın.
- Todo API artık **sadece giriş yapan kullanıcının verileri** üzerinde çalışsın.
- Yetkilendirme: Her kullanıcı **yalnızca kendi todo’larını** okuyup/güncelleyip/silebilsin.
- **Yükseltilmiş yetki** (elevated) ile **/me** üzerinden kritik işlemler yürütülsün.
- **Admin** rolü tanımlansın; user yönetimi sadece admin tarafından yapılsın.


> Notlar
> - Parolalar **hash**’lenerek saklanır (bcrypt). Response’larda **asla** dönmez.
> - Validation ve kimlik doğrulama için **middleware** yapısı kullanılır. Router üzerinde middleware ve controller'lar birlikte kurgulanır.
---

## 🔌 Auth Endpointleri

### 1) **POST `/api/auth/register`**
- Body:
```json
{
  "username": "alice",
  "email": "alice@acm.dev",
  "password": "S3cure!pass"
}
```
- İşleyiş:
  - Validation middleware ile request üzerindeki verileri doğrula. Servis katmanında aynı emaili kullanan başka bir user olmadığından emin ol.
  - Parolayı hash’le ve user’ı kaydet. (Parolanın kendisi değil **hash**'ini kaydet.)
- Cevap (**201 Created**):
```json
{ "id": "<uuid>", "username": "alice", "email": "alice@acm.dev" }
```

### 2) **POST `/api/auth/login`**
- Body:
```json
{ "email": "alice@acm.dev", "password": "S3cure!pass" }
```
- İşleyiş:
  - Validation middleware ile request üzerindeki verileri doğrula. Servis katmanında sistemde bu kullanıcının var olup olmadığını kontrol et. Varsa gönderilen password'un hash'i ile kayıtlı passwordHash'i karşılaştır.
  - Hashler aynıysa(parola doğruysa) **access token** üret (ör. `exp=30m`).
  - **Admin ise** JWT payload: `{ "isAdmin": true }` (Admin kontrolü .env üzerindeki verilerden yapılır. Yazının sonunda örneği veriliyor.)
  - **Normal kullanıcı ise** JWT payload: `{ "userId": "<uuid>" }`
- Cevap (**200 OK**):
```json
{ "accessToken": "<jwt>" }
```

## 🧱 Middleware
- **authAccess (JWT)**
  - `Authorization` header’ı doğrular.
  - İsteklerde access token `Authorization` headeri üzerinden `Bearer <access token>` şeklinde gönderilir.
  - authAccess, Access token'i Bearer'den ayırır ve token'ın geçerli olup olmadığını kontrol eder `verify()`.
  - Geçerliyse `req.userId = id` set eder; değilse **401 Unauthorized**.

### 3) **GET `/api/me`** (Korunan)
- Header: `Authorization: Bearer <access token>`

- İşleyiş:
  - İstek atarken access token `Authorization` headeri üzerinden `Bearer <access token>` şeklinde gönderilmelidir.
  - authAccess middleware'ı ile kimliği doğrular.
  - Servis katmanında db'den user'a ait `username` `email` alanlarını çek ve controller'da response olarak `id` ile birlikte dön.
  - Eğer kullanıcı adminse sadece adminEmail dön.
- Cevap (**200 OK**):
```json
{ "id": "<uuid>", "username": "alice", "email": "alice@acm.dev" }
```
```json
{ "adminEmail": "alice@acm.dev" }
```

---

## 🧩 Todo API — Auth Entegrasyonu (Endpointleri Korumaya al)
- **GET `/api/todos`** → sadece giriş yapan kullanıcının todo’larını döner(💡req.userId).
- **GET `/api/todos/:id`** → kayıt **kullanıcıya ait değilse 403** döner.
- **POST `/api/todos`** → `userId` body’den **kaldırılır**; backend `req.userId` ile ilişkilendirir.
- **PUT/PATCH/DELETE `/api/todos/:id`** → sadece sahibi yetkilidir; aksi hâlde **403 Forbidden**.

> Not: Hafta 02/03’teki response şemaları korunur. Sadece kimlik doğrulama & sahiplik kuralları eklendi.

---

## 🔐 Yükseltilmiş Yetki (Elevated) Akışı — **kolpo-mail** mock servisi
**Amaç:** `changePassword`, `changeEmail` gibi kritik işlemler için ek doğrulama.(2fa)


### Servis: `kolpo-mail`
- Derste gösterilen kolpo-mail servisi tek endpointten kullanıcılara eposta gönderilebilen basit bir mock-email servisidir. Yetki yükseltme işlemlerinde bu servis üzerinden kullanıcının mailine yetkisi yükseltilmiş bir token gönderilir.

- Mail gönderme requesti:
```js
async function sendMail(to, title, content) {
  await fetch('http://localhost:1186/api/internal/mail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to,
      from: 'no-reply@my-todo-application.com',
      content: "İçerik...",
      type: 'html',
      title: "Başlık"
    }),
  });
}
```

### Elevated Token (Yetkisi Yükseltilmiş Token):
- Opak token: içeriğini client’ın anlayamadığı, sadece server’ın bildiği anlamsız ve eşsiz bir string. 
- Oluşturduğun Opak Token'ı db üzerinde kaydedersin:
```json
{
  "token": "<uuidv4>",
  "userId": "uuid-of-user",
  "action": "changeEmail",
  "expiresAt": "2025-09-06T12:34:56.000Z",
  "used": false
}
```
- Token kullanıldığında `used` sütunu `true` olarak güncellenir. Böylece token'ın istenen amaçla ve tek sefer kullanıldığından emin olunur.

## 🧱 Middleware
- **authElevated (JWT)**
  - `req.params` üzerinden gönderilen `elevatedAccessToken`'ın varlığını ve geçerliliğini doğrular.
  - Geçerliyse `used : true` set ederek eder; değilse **401 Unauthorized**.

### Yeni Endpointler (/me)
1) **POST `/api/me/request-elevated-token`**
- Body: `{ "action": "changeEmail" | "changePassword" }`
- `authAccess` zorunlu.
- Kullanıcı için kullanım amacına göre yeni bir `elevatedToken` üretir ve `kolpo-mail` üzerinden kullanıcının emailine amacına göre bir link gönderir. (ör: "www.backend.todoapp.com/api/me/change-email/produced_opaque_token"
- **204 OK** (No content) 


2) **POST `/api/me/change-email/:token`**
- Body: `{ "newEmail": "new@acm.dev" }`
- Middleware sırası: `authAccess` → `authElevated('changeEmail')` → `Controller katmanı...`
- İşleyiş: token doğrulanır, email formatı valid ise DB güncellenir.
- **200 OK** → `{ "id": "<uuid>", "email": "new@acm.dev" }`


3) **POST `/api/me/change-password/:token`**
- Body: `{ "newPassword": "NewS3cure!" }`
- Middleware sırası: `authAccess` → `authElevated('changePassword')` → `Controller katmanı...`
- İşleyiş: token doğrulanır, newPassword hash’lenir ve kaydedilir.
- **204 No Content**


> Not: `authElevated` token’ı doğrular → `req.userId` ile eşleştiğini ve istenen `action` için üretildiğini kontrol eder; aksi hâlde **403** ya da **401** döner.

---

## Uygulama Mimarisi
### 📂 Klasör Yapısı
```
src/
  app.js
  server.js
  routes/
    usersRouter.js
    todosRouter.js
    authRouter.js
    meRouter.js
  controllers/
    usersController.js
    todosController.js
    authController.js
    meController.js
  services/
    usersService.js
    todosService.js
    authService.js
    meService.js
  repositories/ (Dosya isimleri buradaki gibi olmak zorunda değil.)
    UserRepo.js
    TodoRepo.js
    ElevatedTokenRepo.js
  middleware/
    validation/
      userValidation.js
      todoValidation.js
      authValidation.js
    errors/
      errorHandler.js
      notFoundHandler.js
    auth/
      authAccess.js
      authElevated.js
    utils/
        controllerResponseHandler.js
        AppError.js
```
### Dosyaların Rolleri (Özet)
- **routes/**: Yalnızca path ve middleware bağlama (HTTP wiring). İş kuralı içermez.
- **controllers/**: HTTP katmanı. Request’i uygun DTO(Data Transfer Object)’ya çevirir, `service` çağırır, uygun **status code + response body** döner.
- **services/**: İş kuralları, domain mantığı. Repository ile konuşur, hata fırlatır (ör. `{ status: 404, message: "…" }`).
- **repositories/**: Veri erişim katmanı. Veritabanı.
- **middleware/**: Doğrulama, korumalar ve hata yönetimi için kullanılan middleware araçları.
- **app.js**: Express uygulamasını **oluşturur** (export eder).
- **server.js**: Uygulamayı **çalıştırır** (`app.listen`).

---

## Ekstradan eklenecek yapılar:

### controllerResponseHandler
Controller’larda tekrar eden try/catch bloklarını ortadan kaldırmak için yazılır. Her controller fonksiyonunu bu wrapper ile sarmalayarak hataları otomatik olarak `next(err)` ile Express’in hata akışına gönderirsiniz.
```js
export function controllerResponseHandler(fn) {
return async function (req, res, next) {
try {
await fn(req, res, next);
} catch (err) {
next(err);
}
};
}
```

### AppError Modülü
Uygulama genelinde standart hatalar fırlatmak için özel bir Error sınıfıdır. Service katmanında bir problem oluştuğunda `throw new AppError(status, message)` diyerek kontrollü hata fırlatılır.
```js
export class AppError extends Error {
constructor(status, message) {
super(message);
this.status = status;
}
}
```

### ErrorHandler Middleware
Tüm hataları yakalayarak standart JSON formatında döndürür. Artık hata formatı basitleştirilmiştir: sadece `status` ve `message` döner.
```js
export function errorHandler(err, req, res, next) {
const status = err.status || 500;
const message = err.message || "Internal Server Error";
res.status(status).json({ status, message });
}
```
---

## ✅ Kabul Kriterleri
- `POST /api/auth/register` geçersiz email → **400**.
- `POST /api/auth/login` yanlış parola → **401**.
- Token olmadan korunan endpoint → **401**.
- Başka kullanıcının todo’suna erişim/güncelleme/silme → **403**.
- `POST /api/todos` body’de `userId` gelse bile yok sayılır; `req.userId` kullanılır.
- `POST /api/me/request-elevated-token` geçerli token ile → **204**.
- `POST /api/me/change-email` geçersiz/yanlış token → **401/403**.
- `POST /api/me/change-email` geçerli token → **200** ve email güncellenir.
- `POST /api/me/change-password` geçerli token → **204**.
- Elevated token ikinci kez kullanıldığında → **401 Unauthorized**.
- Access token süresi dolmuşsa → **401** (yeniden login gerek).

---

## 🔧 Uygulama Notları
- `.env` örneği:
```
JWT_SECRET=supersecret
JWT_EXPIRES_IN=30m
ELEVATED_TOKEN_TTL_MIN=10
ADMIN_EMAIL=admin@acm.dev
ADMIN_PASSWORD=ChangeMe!
```
- Elevated token formatı `uuidv4` veya `crypto.randomBytes` olabilir; DB’de action/expire/used bilgisiyle saklanır.
- Elevated token **opaque**’tır → içeriği client tarafından okunamaz, server doğrular.
- Kullanıcı admin olarak giriş yaptıysa `/api/me` endpointinde yalnızca `adminEmail` döndürülür.
- Hata yanıtlarını tek formatta tutun:
```json
{ "errors": [ { "path": "body.email", "message": "Geçersiz email" } ] }
```
- Router → Controller → Service → Repository katman ayrımını koruyun.