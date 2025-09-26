# Todo API - TypeORM + PostgreSQL

Bu proje, Hafta 3 ödevleri için geliştirilmiş ve hafta 4 için yeni özellikler
eklenmiş bir REST API'dir. PostgreSQL veritabanı ve TypeORM kullanarak
kullanıcılar ve todo'lar yönetimini sağlar. JWT ile kimlik ve yetki doğrulaması
yapar.

## Özellikler

- User (1) → (N) Todo ilişkisi
- PostgreSQL + TypeORM entegrasyonu
- Zod ile request validasyonu
- Query builder ile filtreleme, arama ve sayfalama
- Migration desteği
- Hesap sistemi, JWT
- Eposta doğrulama

## Kurulum

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. `.env` dosyasını oluşturun ve database bilgilerinizi ekleyin:

```env
PORT=3000
DB_HOST=your-neon-db-host
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=neondb
JWT_SECRET=CHANGEME
KOLPOMAIL_HOST=http://your-kolpomail-host.example.com
```
Açtığınız `kolpomail` sunucusunun linkini `KOLPOMAIL_HOST`a yapıştırın. GitHub
CodeSpace kullanabilirsiniz.

3. Migration'ları çalıştırın:

```bash
npm run migration:run
```

4. Uygulamayı başlatın:

```bash
npm run dev
```

## API Endpoints

### Users

- `POST /api/users` - Yeni kullanıcı oluştur
- `POST /api/users/login` - Kullanıcı hesabına giriş yap (JWT)
- `GET /api/users` - Tüm kullanıcıları listele

### Accounts

Bu kategorideki endpointler için kullanıcı `Authorization: <token>` şeklinde
bir header gönderir.

- `GET /api/me/todos` - Kullanıcının todo'larını listele
- `POST /api/me/2fa` - Kullanıcı epostasına yetki yükseltme token'ı gönder
- `POST /api/me/change_email` - Epostayı güncelle
  (yetki yükseltme icin token gerekir)
- `POST /api/me/change_password` - Şifreyi güncelle
  (yetki yükseltme için token gerekir)

#### Yetki Yükseltme Tokenları

Eposta ya da şifre değiştirmek için epostaya gönderilen token gerekir. Bu
token back end'e `?token=<epostaya-iletilen-token>` şeklinde query ile
iletilir.

### Todos

- `GET /api/todos` - Todo'ları listele (filtreleme, arama, sayfalama)
- `GET /api/todos/:id` - Todo detayını getir
- `POST /api/todos` - Yeni todo oluştur
- `PUT /api/todos/:id` - Todo'yu tamamen güncelle
- `PATCH /api/todos/:id` - Todo'yu kısmen güncelle
- `DELETE /api/todos/:id` - Todo'yu sil

## Query Parametreleri

### GET /api/todos

- `completed=true|false` - Tamamlanma durumuna göre filtrele
- `q=text` - Başlık ve açıklamada arama
- `page=1` - Sayfa numarası
- `limit=10` - Sayfa başına kayıt sayısı
- `sort=createdAt|title|updated_at` - Sıralama alanı
- `order=asc|desc` - Sıralama yönü

## Validasyon

Tüm endpoint'lerde Zod ile validasyon yapılır:

- Email formatı kontrolü
- UUID format kontrolü
- Zorunlu alan kontrolü
- Tip kontrolü

## ERD (Entity Relationship Diagram)

```
┌─────────────────────┐                    ┌─────────────────────┐
│        User         │                    │        Todo         │
├─────────────────────┤                    ├─────────────────────┤
│ id (uuid) PK        │ 1                N │ id (uuid) PK        │
│ username (unique)   │ ──────────────────>│ title               │
│ email (unique)      │                    │ description         │
│ password_hash       │                    │ completed (boolean) │
│ created_at          │                    │ user_id (uuid) FK   │
└─────────────────────┘                    │ created_at          │
                                           │ updated_at          │
                                           └─────────────────────┘

Relationship: User (1) → (N) Todo
- One user can have many todos
- Each todo belongs to exactly one user
- Foreign key: Todo.user_id → User.id
- On delete: CASCADE (when user is deleted, all their todos are deleted)

Constraints:
- User.username: UNIQUE, NOT NULL
- User.email: UNIQUE, NOT NULL
- Todo.user_id: NOT NULL, FOREIGN KEY
- Indexes on: Todo.completed, Todo.created_at, Todo.user_id
```

## Migration Komutları

```bash
npm run migration:generate  # Yeni migration oluştur
npm run migration:run       # Migration'ları çalıştır
npm run migration:revert    # Son migration'ı geri al
npm run migration:show      # Migration durumunu göster
```

## Hata Yönetimi

- Geçersiz userId → 400 Bad Request
- Password hiçbir response'ta dönülmez
- Tutarlı JSON hata formatı
