class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  makeNoise() {
    console.log("Some generic animal noise");
  }
}

class Dog extends Animal {
  name = "Animal Name";
  age = 5;
  #color = "Brown";
  constructor(name, age, color) {
    super(name, age);
    this.#color = color;
  }
  get color() {
    return this.#color;
  }
  set color(value) {
    this.#color = value;
  }
}

const dog1 = new Dog("Buddy", 3, "Black");

dog1.color = "Golden";

console.log(dog1.color);

dog1.makeNoise();

console.log(dog1 instanceof Animal);
