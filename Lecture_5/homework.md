# 📅 Hafta 05 — React Frontend: Todo App (Temel İskelet & Listeleme)

## 🎯 Hedef

Bu hafta yalnızca **temel arayüz iskeletini** çıkarıyoruz ve **mock API**’den veri çekip listeleme yapıyoruz. Auth & CRUD gibi gelişmiş işlemler **haftaya** eklenecek.

- React ile **Layout + Navbar + Footer** ve **nested routes (Outlet)**
- **HomePage** (tanıtım) ve **TodosPage** (listeleme) olmak üzere **iki ana sekme**
- **Login/Sign Up** sayfası sadece **navigasyon** için mevcut (işlevsellik yok)
- **Mock API**’den todoları çekip **kartlar** halinde listeleme
- `TodosPage` → veriyi çeker, **prop** olarak `TodoList` bileşenine aktarır
- `TodoList` içinde **Show More** davranışı: önce **6** öğe, tıklayınca **tümü**

> Not: Gerçek backend’e bağlamak haftaya. Bu hafta GET/listing yeterli.

---

## 🔌 Mock API

- Aşağıdaki **mock API** endpoint’inden `fetch` ile todo verisi çekin.
- mockapi url:

```
https://66b9a5b1fa763ff550f8f787.mockapi.io/ituacm-website-ekibi/todos
```

---

## 🗂️ Rotalar ve Layout

```
/             → <HomePage/>
/login        → <AuthPage/>  (sadece form iskeleti; submit çalışmak zorunda değil)
/todo         → <TodosPage/> (mock API’den liste)
```

**Layout yapısı**: `Navbar` (yukarıda) + **Outlet** + `Footer` (altta)

- **Navbar**: Sol tarafta App adı, ortada sekmeler: **Home**, **Todos**; sağda **Sign Up** ve **Login** linkleri (ikisi de `/login`’e götürebilir veya ayrı pathler verebilirsiniz şimdilik size kalmış).
- **Footer**: Basit telif/versiyon bilgisi.

---

## 🧩 Bileşenler (önerilen ağaç)

```
src/
  layout/
    AppLayout.jsx
    Navbar.jsx
    Footer.jsx
  pages/
    HomePage.jsx
    TodosPage.jsx
    AuthPage.jsx   // Login/SignUp iskeleti (çalışmasa da olur)
  components/
    TodoList.jsx   // veri props ile gelir, show more state burada
    TodoCard.jsx   // tek bir todo’yu kart olarak çizer
  loaders/
    todosLoader.js
App.jsx
App.css
...
```

### Sayfa - Komponent Yapıları:

- **Home Page**:

  - Basit bir karşılama sayfası. Tasarımında tamamen özgürsünüz. Şaşırtın bizi. ( Yapay zekadan yardım alabilirsiniz ama mevzuyu kavramanız açısından kodu kendinizin yazması çok daha faydalı olacaktır. Direkt yapay zekaya yaptırırsanız anlarız :) )

- **TodosPage**:
  - Veri çekimi: Verilerin sayfa ilk açıldığında hazır bir şekilde orada olmasını istiyoruz. ( **loader** ).
  - Üstte küçük bir **intro** alanı: `You can view your todos here: ` gibi tek cümle bir açıklama bulunur ( ne yazdığı gerçekten pek de önemli değil )
  - Listeleme işlemi TodoList adında başka bir komponent üzerinden yapılır.
- **TodoList**:
  - Bu komponenti verileri filtrelenmiş şekilde listeleyebilecek şekilde tasarlamanızı istiyoruz.
  - Komponentin `todos` dışında `filter` adında bir propu olsun. Bu propta `array.filter()` metodunun içinde kullanılacak bir **callback function** girilmesini bekleyin.
  - Aynı zamanda `header` adında bir prop da olsun. Komponentin en üstünde bu propa girilen değeri başlık olarak gösterin.
  - En sonunda elde edeceğiniz yapıda komponenti `<ListTodos todos={todos} header="Ongoing Todos:" filter={(todo) => !todo.completed} />` şeklinde kullanarak verileri filtreleyip üstüne istediğiniz başlığı koyabilmelisiniz.
  - Bu şekilde TodosPage içerisinde devam eden ve tamamlanan todoları ayrı ayrı listeleyin.
  - Komponent içerisinde showMore adında bir state tanımlayın ve en altta bir Show More/Show Less butonuyla bu state'i yönetin.
  - showMore'a tıklanmadan önce sadece 3 adet todo listeleyin. tıklanırsa hepsi listelensin.
- **TodoCard**:

  - Sade kart: `title`, `description` (iki satır kesme opsiyonel).
  - Listeleme işlemlerinde veriyi bu komponenti kullanarak gösterin. Şık tasarlayabilirseniz güzel olur biraz göze hitap etsin.

- **AuthPage**
  - Basit bir email - password formu ve altında login/signup butonu bulunur. İşlevsel olması gerekmiyor. Sayfa sadece var olsun, butona tıklandığında birşey olmasın. Tasarımsal olarak dilediğinizce uğraşabilirsiniz.

---

## 🧪 Kabul Kriterleri

1. **Navigasyon & Layout**
   - Navbar ve Footer tüm sayfalarda görünür.
   - Outlet, Navbar ile Footer’ın **arasına** yerleştirilmiş.
   - Navbar’da **Home**, **Todos**, **Sign Up**, **Login** linkleri var.
2. **HomePage**
   - Uygulama tanıtımı içeren kısa bir metin ve çağrı linki (örn. "Todos’a git").
3. **TodosPage**
   - Mock API’den GET ile todolar çekiliyor.
   - Üstte bir cümle açıklama var.
   - Altında `TodoList` komponentine **props** ile veri, filtre callback'i ve header aktarılıyor. Tamamlanmış ve devam eden todolar ayrı ayrı listeleniyor.
   - İlk yüklemede **en fazla 3** todo görünüyor; **Show More** tıklanınca **tüm** todolar listeleniyor.
   - Her todo **TodoCard** bileşeninde gösteriliyor.
4. **AuthPage**
   - Basit login & sign up form iskeleti (inputlar + butonlar). Submit zorunlu değil; sadece UI.

---

İyi çalışmalar 💙🚀
