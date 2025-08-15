class Animal {
  #age;
  name;
  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }
  getAge() {
    return this.#age;
  }

  makeNoise() {
    console.log("Generic animal noise");
  }
}

class Dog extends Animal {
  constructor(name, age) {
    super(name, age);
  }
  makeNoise() {
    console.log("Bark");
  }
}
