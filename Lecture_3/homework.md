# 📅 Hafta 03 — Todo Uygulaması (Database & ORM / TypeORM + PostgreSQL) + Zod Validasyon

## 🎯 Hedef

- Geçen haftaki **in-memory** REST API’yi **PostgreSQL + TypeORM** ile **kalıcı** hâle getirmek.
- **Entity → Migration → Repository** akışını kurmak (kurulum/isimlendirme tercihi size bırakılmıştır).
- **User (1) → (N) Todo** ilişkisini şemada ve API’de uygulamak.
- **Zod** ile **request-body / params / query** doğrulamalarını zorunlu tutmak.

---

## ✅ Yapılacaklar (Adım Adım)

### 1) Proje ve Bağlantı Ayarları

- PostgreSQL + TypeORM entegrasyonunu kur (bağlantı URL/credentials formatı serbest).
- TypeORM yapılandırmanda **`synchronize: false`** kullan; şema değişikliklerini **migration** ile yönet.

### 2) ERD / Şema

- **User**: `id`, `username`, `email`, `password_hash`, `created_at`
- **Todo**: `id`, `title`, `description`, `completed`, `user_id`, `created_at`, `updated_at`
- İlişki: **User (1)** → **(N) Todo** (`Todo.user_id` → `User.id` foreign key).
- Kısa **ERD**’yi README’ye ekle (metin veya görsel).

### 3) Entity ve Migration

- **User** ve **Todo** entity’lerini tanımla.
- Migration ile şu kuralları uygula:
  - `User.username` → **unique**
  - `User.email` → **unique**
  - `Todo.user_id` → **foreign key** (User.id), **on delete: cascade** önerilir
  - Zaman alanları: `created_at`, `updated_at`
  - İndeksler: ör. `Todo.completed`, `Todo.created_at`

### 4) API’yi DB’ye Taşı (Geçen Haftayla Davranış Uyumlu)

- Tüm endpoint’ler geçen haftaki URL/girdi/çıktı/sunum kurallarına **uyumlu** çalışmalı.
- In-memory yerine **TypeORM repository**’leri ile veritabanına yaz/oku/güncelle/sil.
- **`password` hiçbir response’ta dönülmeyecek** kuralını koru.

### 5) Listeleme ve Sorgulama (QueryBuilder)

- **GET `/api/todos`**:
  - **Filtre**: `completed=true|false`
  - **Arama**: `q` → `title`/`description` içinde metin arama (Postgres için basit `ILIKE` benzeri yaklaşım yeterli)
  - **Sayfalama**: `page`, `limit`
  - **Sıralama**: `sort=createdAt` + `order=asc|desc`
- **GET `/api/users/:id/todos`**:
  - En azından sayfalama + `completed` filtresi desteği ver.

### 6) **Zod ile Validasyon (Zorunlu)**

- Aşağıdaki alanlarda **Zod** ile doğrulama yap:
  - **Body**:
    - `POST /api/users`: `username` (zorunlu), `email` (format), `password` (zorunlu)
    - `POST /api/todos`: `title` (zorunlu), `description` (zorunlu), `userId` (zorunlu, uuid)
    - `PUT /api/todos/:id`: tüm zorunlu alanlar
    - `PATCH /api/todos/:id`: en az bir alanın güncellenmesini doğrula
  - **Params**: `:id` değerlerini uygun formata göre doğrula (uuid bekleniyorsa uuid).
  - **Query**: `completed`, `page`, `limit`, `sort`, `order`, `q` gibi parametreler için tip/kısıt kontrolü.
- **İstenen hata davranışı**:
  - Zod hatalarında **400 Bad Request** dön.
  - Hata cevabı **tutarlı** ve **geliştirici dostu** bir JSON şeması içersin (alan adı + kısa mesaj).
- Validasyonun **route seviyesinde** veya **middleware** olarak uygulanması serbest; önemli olan her giriş noktasının doğrulanması.

---

## ✅ Kabul Kriterleri

- Migration’lar **temiz çalışıyor** (fresh DB’de sorunsuz).
- `username` ve `email` için **unique** kısıtları aktif.
- **Zod**:
  - Geçersiz `email` ile `POST /api/users` → **400** (tutarlı hata JSON’u).
  - `POST /api/todos` boş `title` veya eksik `userId` → **400**.
  - `PUT /api/todos/:id` tüm alanlar tam verilmezse → **400**.
  - `PATCH /api/todos/:id` boş body → **400**.
  - Geçersiz `id` biçimi (uuid değil) → **400**.
- **Query özellikleri**:
  - `GET /api/todos?q=alış` → metin araması çalışır (case-insensitive kabul).
  - `GET /api/todos?completed=true&page=1&limit=5&order=desc` → sayfalama + sıralama birlikte çalışır.
- **İş kuralları**:
  - `userId` var olmayan kullanıcıyı gösterirse → **400** veya **404** (tercihini README’de belirt).
  - `password` hiçbir response’ta görünmez.

---

## 💡 İpuçları

- Postgres’te zaman için **UTC + timestamptz** iyi varsayılandır.
- Validasyonu **controller girişinde** yapmak hataları erken yakalar.
- Zod hata yanıtlarını **tek biçimde** toplayıp döndürmek (ör. `errors: [{path, message}]`) debug’ı kolaylaştırır.
- QueryBuilder ile filtre/sıralama/sayfalama mantığını **tek yerde** toplamak tekrarları azaltır.
