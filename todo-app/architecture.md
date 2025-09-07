# Todo API — Mimari Rehberi (Hafta 02)

Bu doküman, Express.js tabanlı **Todo REST API** örneği için kullanılan katmanlı mimariyi açıklar. Amaç, giriş seviyesindeki öğrenciler için **okunabilir, test edilebilir ve büyümeye uygun** bir yapı sağlamaktır.

---

## 🎯 Hedefler
- **Separation of Concerns (SoC):** HTTP yönlendirme, iş kuralları ve veri erişimini ayırmak.
- **Test edilebilirlik:** `app.js` ile uygulamayı oluşturan kodu, `server.js` ile çalıştırma kodundan ayırmak.
- **Genişleyebilirlik:** In-memory store bugün, yarın gerçek DB (repo değişir, service/controller aynı kalır).
- **Standart sözleşmeler:** Doğru HTTP status code’lar, tutarlı JSON hata gövdeleri.

---

## 📂 Klasör Yapısı
```
src/
  app.js
  server.js
  routes/
    usersRouter.js
    todosRouter.js
  controllers/
    usersController.js
    todosController.js
  services/
    usersService.js
    todosService.js
  repositories/
    UserRepo.js
    TodoRepo.js
  middleware/
    validation/
      userValidation.js
      todoValidation.js
    errors/
      errorHandler.js
      notFoundHandler.js
    guards/
      idGuard.js   # (opsiyonel)
```

### Dosyaların Rolleri (Özet)
- **routes/**: Yalnızca path ve middleware bağlama (HTTP wiring). İş kuralı içermez.
- **controllers/**: HTTP katmanı. Request’i uygun DTO’ya çevirir, `service` çağırır, uygun **status code + response body** döner.
- **services/**: İş kuralları, domain mantığı. Repository ile konuşur, hata fırlatır (ör. `{ status: 404, message: "…" }`).
- **repositories/**: Veri erişim katmanı. Bugün dizi (in-memory), yarın Veritabanı. **Arayüz sabit** kalır.
- **middleware/**: Doğrulama, korumalar ve hata yönetimi. Uygulamaya **en sonda** `notFoundHandler` ve `errorHandler` eklenir.
- **app.js**: Express uygulamasını **oluşturur** (export eder).
- **server.js**: Uygulamayı **çalıştırır** (`app.listen`). Test için ayrıdır.

---

## 🔁 İstek Yaşam Döngüsü (Request Lifecycle)

```
Client
  ↓  HTTP request
Express Router (routes/v1/*.js)
  ↓  (gerekirse) Validation Middleware
Controller (controllers/*.js)
  ↓  Service (services/*.js)  ← iş kuralları
Repository (repositories/*.js) ← veri erişimi (in-memory/DB)
  ↑
Controller, service sonucunu uygun status code ile döner
  ↑
Error flow: throw {status,message} → errorHandler → standart JSON hata
```

**Neden böyle?**  
- Router ince ve basit kalır.  
- Controller yalnızca HTTP detaylarına odaklanır.  
- Service saf iş mantığı içerir (yeniden kullanılabilir/test edilebilir).  
- Repository değişince (ör. PostgreSQL’e geçiş) diğer katmanlar etkilenmez.

---

## ✅ Doğrulama (Validation) Stratejisi

### Dosyalar
- `middleware/validation/userValidation.js`
- `middleware/validation/todoValidation.js`

**İlkeler**
- `POST /api/users`: `username`, `email`, `password` zorunlu; email basit format (`@`) kontrolü.
- `POST /api/todos`: `title`, `description`, `userId` zorunlu. `userId` varlığı service katmanında **doğrulanır**.
- `PUT /api/todos/:id`: **tüm alanlar zorunlu** (title, description, completed, userId).
- `PATCH /api/todos/:id`: sadece gelen alanlar kontrol edilir (ileride genişletilebilir).

**Hata Gövdesi Örneği**
```json
{ "error": "VALIDATION_ERROR", "message": "title, description and userId are required" }
```

> Not: `userId`’nin varlığını repository/service katmanında doğrulamak veri bütünlüğünü sağlar.

---

## 🧱 Hata Yönetimi ve Not Found

- **`notFoundHandler`**: Tanımsız route’larda her zaman JSON döner:
  ```json
  { "error": "ENDPOINT_NOT_FOUND" }
  ```
- **`errorHandler`**: Tüm katmanlarda fırlatılan hataları yakalar ve standart bir JSON döndürür.
  - `status`: HTTP kodu (varsayılan **500**).
  - `error`: `"INTERNAL_ERROR"` gibi bir sabit.
  - `message`: geliştirici/öğrenci için kısa açıklama.

Örnek:
```json
{
  "error": "INTERNAL_ERROR",
  "message": "Something went wrong"
}
```

---

## 🔌 Endpoint Sözleşmeleri (Özet)

### Users
- **POST /api/users** → `201 Created` + `{ id, username, email }` (**password dönülmez**).  
  - Geçersiz email → `400`
- **GET /api/users** → `200 OK` + `[ { id, username, email }, ... ]`
- **GET /api/users/:id/todos**  
  - Kullanıcı yoksa `404 { "error": "User not found" }`
  - Varsa `200 OK` + `[ todo, ... ]`

### Todos
- **GET /api/todos** → `200 OK` + `[ todo, ... ]`
  - `?completed=true|false` → boolean filtre
  - `?q=…` → `title`/`description` içinde arama (**case-insensitive** önerilir)
- **GET /api/todos/:id**  
  - Var → `200`, yok → `404 { "error": "Todo not found" }`
- **POST /api/todos** → `201 Created` + todo (`completed` default **false**)
  - Eksik alan → `400`
- **PUT /api/todos/:id** → Tam güncelleme; `id` **değişmez**  
  - Başarılı → `200`, yok → `404`, doğrulama → `400`
- **PATCH /api/todos/:id** → Kısmi güncelleme  
  - Başarılı → `200`, yok → `404`, doğrulama → `400`
- **DELETE /api/todos/:id** → Başarılı → **`204 No Content`** (gövde **yok**), yok → `404`

---

## 💾 In-Memory Store Mantığı

- Basit dizi yapıları kullanılır: `users[]`, `todos[]`.
- `uuid` (v4) ile id üretilir.
- Dönüşlerde **gizli alanlar** (örn. `password`) asla response’a konmaz.
- Gerçek DB’ye geçişte yalnızca `repositories/*Repo.js` değişir; `services` ve `controllers` **aynı kalır**.

---

## 🔍 Arama & Filtreleme

- `GET /api/todos?completed=true|false` → `"true"`/`"false"` string’lerinin güvenli şekilde boolean’a çevrilmesi.
- `GET /api/todos?q=...` → küçük/büyük harf duyarsız arama (örn. `toLowerCase()` veya `/…/i` regex).

---

## 🔄 PUT vs PATCH

- **PUT**: Kaynağın **tam** temsili gönderilir; eksik alan → `400`.  
- **PATCH**: Yalnızca değişen alanlar gönderilir; tip/kurallar kontrol edilir.
- `id` **asla** güncellenmez (immutability).

---

## 🧪 Test Edilebilirlik

- `app.js` → yalnızca uygulamayı **oluşturur** (export).  
  → `supertest` ile doğrudan import ederek entegrasyon testleri yazmak kolaydır.
- `server.js` → **çalıştırma** kodu (`listen`), testlerde gerekmez.
- Basit **smoke test** için `curl` komutlarıyla kabul kriterlerini hızla doğrulayabilirsiniz.

```bash
# User create (201, password dönmemeli)
curl -i -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"farhad","email":"farhad@acm.dev","password":"acmcokyasa123"}'

# Todos with filters (case-insensitive q)
curl -i "http://localhost:3000/api/todos?completed=false&q=alış"
```

---

## 🧭 Genişlemeye Hazırlık

- **Sürümleme:** `routes/v1` → gelecekte `v2` eklenebilir.
- **Feature-first’e geçiş:** Uygulama büyüdükçe domain bazlı klasörleme (örn. `features/users/*`).
- **Gerçek DB:** `repositories` katmanını ORM/Query Builder ile değiştirebilirsiniz (Knex, Prisma, Sequelize…).  
- **Auth/Yetki:** İleride `authMiddleware`, `roleGuard` vb. eklenecek yerler şimdiden hazır.

---

## 🧹 Kod Kalitesi & Stil

- Kısa ve anlamlı fonksiyonlar, tutarlı isimlendirme.
- Tekrarı azalt (DRY); ortak doğrulamalar için yardımcı fonksiyonlar eklenebilir.
- README’de kurulum adımları ve örnek istekler.
- Commit’leri küçük ve anlamlı tut; PR açıklamaları açık olsun.

---

## ❗ Yaygın Hatalar

- `password`’ü response’ta döndürmek → **güvenlik** ihlali.  
- Yanlış status code (örn. DELETE’te `200` yerine `204`).  
- Route içinde iş kuralı yazmak (service/repo ayrımını bozmak).  
- PUT/PATCH farkını korumamak.  
- `userId` varlığını doğrulamamak (veri bütünlüğü).

---

Bu mimari, **giriş seviyesi** için yeterince basit kalırken, sonraki haftalarda veri kalıcılığı (DB), kimlik doğrulama ve testlerin eklenmesine de zemin hazırlar.
