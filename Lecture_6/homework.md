# 📅 Hafta 06 — Advanced State Management & API Integration

## 🎯 Hedef

Bu hafta 5. hafta ödevinde oluşturduğunuz Todo uygulamasını **gerçek backend API**'ye bağlayacak, **Redux Toolkit** ile global state management ekleyecek ve **Sentry** ile error monitoring yapacaksınız.

### Önceki Haftadan Devam Eden Yapı:

- ✅ React Layout + Navbar + Footer
- ✅ HomePage, TodosPage, AuthPage sayfaları
- ✅ TodoList ve TodoCard bileşenleri
- ✅ Mock API'den veri çekme

### Bu Hafta Eklenecekler:

- 🔄 **Redux Toolkit** ile global state management
- 🌐 **Axios** ile gerçek API entegrasyonu
- 🐛 **Sentry** ile error monitoring ve debugging
- ✨ CRUD operasyonları (Create, Update, Delete)

---

## 🚀 Yeni Teknolojiler

### 1. Redux Toolkit

- Global state management için
- Async operations için `createAsyncThunk`
- Modern Redux best practices

### 2. Axios

- HTTP istekleri için
- Request/Response interceptors
- Error handling

### 3. Sentry

- Error monitoring
- Performance tracking
- Real-time debugging

---

## 📦 Kurulum

Aşağıdaki paketleri projenize ekleyin:

```bash
npm install @reduxjs/toolkit react-redux axios @sentry/react
```

---

## 🏗️ Redux Store Yapısı

### Store Konfigürasyonu

```javascript
// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./slices/todosSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    auth: authSlice,
  },
});
```

### Todos Slice

Aşağıdaki state ve actions'ları içermelidir:

- **State**: `{ todos: [], loading: false, error: null }`
- **Actions**:
  - `fetchTodos` (async thunk)
  - `createTodo` (async thunk)
  - `updateTodo` (async thunk)
  - `deleteTodo` (async thunk)
  - `toggleComplete` (async thunk)

---

## 🌐 API Entegrasyonu

### Backend API Endpoints

Mevcut todo-app backend'ini kullanın (localhost:3000):

```
GET    /api/todos        → Tüm todoları listele
GET    /api/todos/:id    → Tek todo getir
POST   /api/todos        → Yeni todo oluştur
PUT    /api/todos/:id    → Todo güncelle
PATCH  /api/todos/:id    → Todo kısmi güncelle
DELETE /api/todos/:id    → Todo sil
PATCH  /api/todos/:id/complete → Todo'yu tamamla
```

### Axios Configuration

```javascript
// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
});

// Request interceptor
api.interceptors.request.use((config) => {
  console.log("API Request:", config);
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
```

---

## 🐛 Sentry Konfigürasyonu

### Setup

```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN", // Sentry hesabınızdan alın
  environment: "development",
  tracesSampleRate: 1.0,
});

// App'i Sentry.withProfiler ile sarın
const App = Sentry.withProfiler(YourAppComponent);
```

### Error Boundaries

Ana bileşenleri Sentry Error Boundary ile sarın:

```javascript
import { ErrorBoundary } from "@sentry/react";

<ErrorBoundary fallback={ErrorFallback}>
  <TodosPage />
</ErrorBoundary>;
```

---

## 🧩 Güncellenecek Bileşenler

### 1. TodosPage

- Redux store'dan veri çekmeli
- `useSelector` ve `useDispatch` kullanmalı
- Sayfa yüklendiğinde `fetchTodos` dispatch etmeli
- Loading ve error state'lerini göstermeli

### 2. TodoList

- CRUD operasyonları için butonlar ekleyin:
  - ✅ **Complete/Uncomplete** toggle
  - ✏️ **Edit** butonu (inline editing)
  - 🗑️ **Delete** butonu (confirmation ile)
- Her işlem Redux actions'ları tetiklemeli

### 3. TodoCard

- Complete/Uncomplete toggle butonu
- Edit ve Delete butonları
- Loading state'i göstermeli (işlem sırasında)

### 4. Yeni: AddTodoForm

- Yeni todo eklemek için form
- Title ve description inputları
- Redux'a `createTodo` dispatch etmeli

---

## 📁 Güncellenmiş Proje Yapısı

```
src/
  store/
    index.js              # Store configuration
    slices/
      todosSlice.js       # Todos state management
      authSlice.js        # Auth state (boş bırakabilirsiniz)
  api/
    axios.js              # Axios configuration
    todosApi.js           # Todo API calls
  components/
    TodoList.jsx          # Redux entegrasyonu ile güncellendi
    TodoCard.jsx          # CRUD butonları eklendi
    AddTodoForm.jsx       # YENİ - Todo ekleme formu
    ErrorBoundary.jsx     # YENİ - Sentry error boundary
  pages/
    TodosPage.jsx         # Redux entegrasyonu
    ...
  hooks/
    useTodos.js           # YENİ - Custom hook (opsiyonel)
```

---

## 🧪 Kabul Kriterleri

### 1. Redux Toolkit Entegrasyonu ✅

- [ ] Redux store kurulmuş ve Provider ile App sarılmış
- [ ] TodosSlice oluşturulmuş ve async thunk'lar tanımlanmış
- [ ] Bileşenler `useSelector` ve `useDispatch` kullanıyor
- [ ] Loading ve error state'leri yönetiliyor

### 2. Axios API Entegrasyonu ✅

- [ ] Axios konfigüre edilmiş (base URL, interceptors)
- [ ] Tüm CRUD operasyonları çalışıyor:
  - GET: Todoları listeleme
  - POST: Yeni todo ekleme
  - PUT/PATCH: Todo güncelleme
  - DELETE: Todo silme
  - PATCH: Todo complete/uncomplete
- [ ] API hataları yakalanıyor ve kullanıcıya gösteriliyor

### 3. Sentry Entegrasyonu ✅

- [ ] Sentry kurulmuş ve konfigüre edilmiş
- [ ] Error boundary'ler uygulanmış
- [ ] API hataları Sentry'e gönderiliyor
- [ ] Console'da Sentry logları görünüyor

### 4. UI/UX İyileştirmeleri ✅

- [ ] Loading spinner'ları eklenmiş
- [ ] Error mesajları güzel gösteriliyor
- [ ] CRUD operasyonları için butonlar eklendi
- [ ] Yeni todo ekleme formu çalışıyor
- [ ] Delete işlemi için confirmation dialog'u var

### 5. Code Quality ✅

- [ ] Redux actions ve reducers düzgün organize edilmiş
- [ ] API calls merkezi bir yerden yönetiliyor
- [ ] Error handling tutarlı şekilde yapılmış
- [ ] Console'da gereksiz error/warning yok

---

## 💡 İpuçları

1. **Redux DevTools** extension'ını kullanarak state değişimlerini takip edin
2. **Sentry Dashboard**'da gerçek zamanlı hataları görün
3. **Network Tab**'da API isteklerini kontrol edin
4. **Backend'i çalıştırmayı unutmayın**: `cd todo-app/backend && npm run dev`
5. Loading state'leri için basit spinner'lar kullanın
6. Error mesajlarını kullanıcı dostu hale getirin

---

## 🎯 Bonus Görevler (Opsiyonel)

1. **Custom Hook**: `useTodos` hook'u oluşturun
2. **Optimistic Updates**: Silme/güncelleme işlemlerinde UI'ı hemen güncelleyin
3. **Search/Filter**: Redux'da search ve filter state'i yönetin
4. **Persistence**: Redux Persist ile state'i localStorage'da saklayın

---

## 🚨 Önemli Notlar

- **Backend'i çalıştırmayı unutmayın!** Todo-app klasöründeki backend'i `npm run dev` ile başlatın
- **Sentry DSN**: Ücretsiz Sentry hesabı oluşturup DSN'inizi alın
- **CORS**: Backend'de CORS ayarları yapılmış olmalı
- **Error Handling**: Her API çağrısında error handling yapın
- **State Structure**: Redux state'i düzgün organize edin

---

Bu ödev sayesinde modern React uygulamalarında kullanılan temel teknolojileri (Redux Toolkit, Axios, Sentry) öğrenmiş olacaksınız.

İyi çalışmalar! 💙🚀

---

## 📚 Faydalı Kaynaklar

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Axios Docs](https://axios-http.com/)
- [Sentry React Docs](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
