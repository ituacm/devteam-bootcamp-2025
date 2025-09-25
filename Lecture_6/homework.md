# 📅 Hafta 06 — Advanced State Management & API Integration

## 🎯 Hedef

Geçen hafta mock API ile temel listeleme yaptınız. Bu hafta **gerçek backend API**'sine bağlanıp **tam CRUD** işlemleri yapacak, **global state** yönetimi ekleyecek ve **error handling** sistemi kuracaksınız.

- 🔄 **Redux Toolkit** ile global state management
- 🌐 **Axios** ve **React Query** ile API entegrasyonu
- 🔧 **CRUD** operasyonları (Create, Update, Delete)
- 🔐 **Kullanıcı sistemi** entegrasyonu
- 🐛 **Error handling** ve monitoring

---

## 🚀 Görevler

### 1. 🔌 Gerçek API Entegrasyonu

Mevcut mock API'yi bırakıp **todo-app/backend** API'sine geçin:

- Base URL: `http://localhost:3000/api`
- **Axios** instance oluşturun
- **React Query** ile veri yönetimi yapın

### 2. 🔄 Global State (Redux Toolkit)

- **User authentication** ve ona ait **loading** ve **error** state'leri

### 3. 🔐 Kullanıcı Sistemi

**AuthPage**'i fonksiyonel hale getirin:

- Login/Register form submit işlemleri
- Localstorage ile JWT token yönetimi
- Protected routes (TodosPage sadece login olunca erişilebilir)
- Navbar'da kullanıcı bilgisi gösterimi

### 4. ✏️ CRUD İşlemleri

**TodosPage**'e ekleyin:

- ➕ **Yeni todo ekleme** formu
- ✅ **Todo tamamlama** toggle butonu
- ✏️ **Todo düzenleme** (inline edit veya modal)
- 🗑️ **Todo silme** (confirmation ile)

### 5. 🐛 Error Handling

- API hatalarını yakala ve kullanıcıya göster
- **Toast notifications** sistemi
- Network error durumları
- Form validation hataları

### 6. 🔧 ESLint Kurulumu

- [Eslint](https://eslint.org/) ve [Prettier](https://prettier.io/) konfigürasyonu
- React ve Redux için uygun rules
- Pre-commit hooks (opsiyonel)
- Code quality standartları

---

## 📝 Detaylar

### API Endpoints

```
POST /api/users          → Register
POST /api/users/login    → Login
GET  /api/todos          → Todo listesi
POST /api/todos          → Yeni todo
PUT  /api/todos/:id      → Todo güncelle
DELETE /api/todos/:id    → Todo sil
```

## 🔗 Backend Hazırlığı

```bash
cd todo-app/backend
npm install
npm run dev  # Port 3000'de çalışacak
```

> **Not**: Backend'de eksik endpointleri tamamlayıp uygulamanın son haline getirmeniz gerekebilir.

---

İyi çalışmalar!
