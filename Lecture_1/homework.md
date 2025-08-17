# 📝 JavaScript Bootcamp - Ödev 1

## 🎯 Amaç

Bu ödevde JavaScript’in temel kavramlarını (değişkenler, koşullar, fonksiyonlar, diziler) pekiştirirken; **class**, **inheritance**, **private field**, **getter/setter** ve **static method** gibi modern OOP özelliklerini de uygulayacaksınız.

---

## 1️⃣ Mini Hesap Makinesi

**Görev:**  
Kullanıcıdan iki sayı ve bir işlem (+, -, \*, /) alıp sonucu hesaplayan bir program yazın.

- **Sürüm A:** `if-else` ile çözün
- **Sürüm B:** `switch-case` ile çözün (derste değinmedik ama çok küçük bir çabayla öğrenebilirsiniz)
- **Kontrol:** Bölmede “0’a bölme” durumunu yönetin.

---

## 2️⃣ String İşleme

**Görev:**  
Kullanıcıdan bir cümle alın ve:

- Kaç karakter olduğunu yazdırın
- Kaç kelime olduğunu yazdırın
- Cümleyi ters çevirip yazdırın

**İpucu:**  
`length`, `split(" ")`, `reverse()`, `join("")`

---

## 3️⃣ Sayı Tahmin Oyunu (Bonus)

**Görev:**  
1–100 arasında rastgele sayı tutun; kullanıcı doğru bilene kadar “daha küçük/büyük” yönlendirmesi yapın.

**İpucu:**  
`Math kütüphanesi`, `while döngüsü`

---

## 4️⃣ Profil Kartı (OOP)

Bu bölümde **class**, **inheritance**, **private fields**, **getter/setter**, **method overriding** ve **static** kullanacaksınız.

### 4.1 İstemler (Requirements)

- `Person` sınıfı yazın:

  - Alanlar: `name` (public), `#age` (private)
  - `constructor(name, age)`
  - `get age()` ve `set age(value)`
    - Negatif veya mantıksız değerler atanmaya çalışılırsa konsola uyarı verin, değeri değiştirmeyin
  - `introduce()` → `"Merhaba, ben <name>. <age> yaşındayım."`

- `Student` sınıfı yazın (Person’dan **extends**):

  - Ek alan: `#studentNo` (private)
  - `constructor(name, age, studentNo)`
  - `introduce()` metodunu **override** edin →  
    `"Merhaba, ben <name>. <age> yaşındayım. Öğrenci Numaram: <studentNo>."`

- `Instructor` sınıfı yazın (Person’dan **extends**):

  - Ek alan: `#branch` (private)
  - `introduce()` **override** →  
    `"Merhaba, ben <name>. <age> yaşındayım. Branşım: <branch>."`

- Person, Student ve Instructor class'ları için statik propertyler ekleyin:
  - **Amaç:** Class'ların oluşturulmuş tüm instance'larının toplam sayısını saklamak ve yazdırmak.
  - `static classnameCount` → oluşturulmuş toplam Person instance'larının sayısını tutar (Derste değinmedik ama metodlar dışında da statik propertyler oluşturulabilir.)
    - Başlangıç değeri olarak 0 verilmeli.
    - Constructor içerisinde instance oluşturulduysa değer 1 artırılmalı.
  - `static count()` → `classnameCount`'u döndürür.

### 4.2 Örnek Kullanım (Beklenen Senaryo)

```js
const p1 = new Person("Bahadır", 21);
const s1 = new Student("Arda", 20, "2025001");
const s2 = new Student("Esma", 19, "2025002");
const i1 = new Instructor("Arca", 20, "Fullstack Development");

console.log(Person.count());
// 4

console.log(Student.count());
// 2

console.log(Instructor.count());
// 1
```
