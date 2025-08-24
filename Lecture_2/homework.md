# 📅 Hafta 02 — Todo Uygulaması için REST API (In-Memory)

## 🎯 Hedef

Bu dersten itibaren kampın ödevleriyle paralel bir şekilde götüreceğimiz proje bir **To-do App** olacak. Bu haftanın ödevi derste temelini attığımız **Express.js**'i kullanarak projenin **REST API**'ını oluşturmaya başlamak.

> **Notlar**
>
> - Bu hafta **in-memory** çalışıyoruz; kalıcılık yok.
> - `uuid` kütüphanesiyle id üretimi yapılacak (`uuidv4`).

---

## 🧩 Modeller

### User

```json
User {
  id: string,       // uuid (şimdilik)
  username: string,
  email: string,
  password: string  // saklanır ama hiçbir response içinde asla dönülmez
}
```

### Todo

```json
Todo {
  id: string,          // uuid (şimdilik)
  title: string,       // kısa başlık (zorunlu)
  description: string, // detaylı açıklama (zorunlu)
  completed: boolean,  // varsayılan: false
  userId: string       // ilgili kullanıcı (User.id)
}
```

---

## 🔌 İstenen Endpointler

### User Endpointleri

#### 1) **POST `/api/users`**

- Yeni kullanıcı oluşturur.
- Gövde:
  ```json
  {
    "username": "farhad",
    "email": "farhad@acm.dev",
    "password": "acmcokyasa123"
  }
  ```
- Kurallar:
  - `username`, `email`, `password` boş olamaz.
  - `email` basit format kontrolünden geçmelidir (ör. `@` içermeli).
- Cevaplar:
  - **201 Created** → `{ id, username, email }`
    > `password` dönülmez.
  - **400 Bad Request** → doğrulama hatası.

#### 2) **GET `/api/users`**

- Tüm kullanıcıları döner.
- Cevap: **200 OK** → `[ { id, username, email }, ... ]`
  > `password` dönülmez.

#### 3) **GET `/api/users/:id/todos`**

- Belirtilen kullanıcıya ait tüm todoları döner.
- Cevaplar:
- **200 OK** → `[ { id, title, description, completed, userId }, ... ]`
- **404 Not Found** → `{ "error": "User not found" }`

---

### Todo Endpointleri

#### 1) **GET `/api/todos`**

- Tüm todoları döndürür.
- Cevap: **200 OK** → `[ { id, title, description, completed, userId }, ... ]`

#### 2) **GET `/api/todos/:id`**

- ID’ye göre tek todo döndürür.
- Cevaplar:
  - **200 OK** → `{ id, title, description, completed, userId }`
  - **404 Not Found** → `{ "error": "Todo not found" }`

#### 3) **POST `/api/todos`**

- Gövde:
  ```json
  {
    "title": "Alışveriş",
    "description": "Marketten süt ve ekmek al",
    "userId": "<geçerli_user_id>"
  }
  ```
- Kurallar:
  - `title` ve `description` zorunlu, boş bırakılamaz.
  - `userId` mevcut bir kullanıcıya ait olmalı.
  - `completed` gönderilmezse varsayılan `false` kabul edilir.
- Cevaplar:
  - **201 Created** → `{ id, title, description, completed, userId }`
  - **400 Bad Request** → doğrulama hatası.

#### 4) **PUT `/api/todos/:id`**

- **Tam güncelleme.**
- Gövde:
  ```json
  {
    "title": "Yeni başlık",
    "description": "Güncellenmiş açıklama",
    "completed": true
  }
  ```
- Kurallar:
  - Tüm alanlar zorunlu.
  - **Aynı `id` korunur; yeni id üretilmez.**
- Cevaplar: **200 OK** / **404 Not Found** / **400 Bad Request**

#### 5) **PATCH `/api/todos/:id`**

- **Kısmi güncelleme.**
- Gövde: güncellenmesi istenen alan(lar) yeterlidir (örn. `{ "completed": true }`).
- Cevaplar: **200 OK** / **404 Not Found** / **400 Bad Request**

#### 6) **DELETE `/api/todos/:id`**

- Cevaplar: **204 No Content** (başarılı) / **404 Not Found**

---

## 🧱 Middleware Kullanımı

- **Global**: `express.json()`
- **Route seviyesinde**:
  - `validateUserCreate` → User POST doğrulaması (username/email/password).
  - `validateTodoCreate` → Todo POST doğrulaması (`title`, `description`, `userId`).
  - `validateTodoUpdate` → Todo PUT/PATCH doğrulaması.

---

## 🗂️ Klasörleme

```
src/
  db/User.js            // in-memory store (şimdilik)
  db/Todo.js            // in-memory store (şimdilik)
  routes/usersRouter.js
  routes/todosRouter.js
  services/usersService.js
  services/todosService.js
  middleware/           // validators, error/notFound, idGuard
  app.js
```

---

## ⭐ Ekstra Puan Getirecekler

### ⭐ Ekstra Puan (Middleware)

- **notFoundHandler** → Tanımsız route’larda her zaman JSON dönsün.
  - Örnek cevap:
  ```json
  { "error": "ENDPOINT_NOT_FOUND" }
  ```
- **Sorgu parametreleri (GET /api/todos)**:
  - `?completed=true/false` → tamamlanma durumuna göre filtreleme
  - `?q=...` → todoları title ve description'ları içinde bulunan bir string öbeğine göre filtreleme

---

## ✅ Kabul Kriterleri (Örnek)

- `POST /api/users` geçersiz email → **400**.
- `POST /api/users` başarılı → **201** ve response’ta **password yok**.
- `POST /api/todos` boş `title` → **400**.
- `PUT /api/todos/:id` tüm alanlar eksiksiz → **200**, **id korunur**.
- `PATCH /api/todos/:id` tek alan güncelle → **200**.
- `GET /api/todos?q=alış` → eşleşenleri döner (case-insensitive önerilir).
