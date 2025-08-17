function sayHello(callback) {
  console.log("Hello");
  callback();
}

function sayWassup() {
  console.log("Wassup?");
}

function sayBye() {
  console.log("bye.");
}

sayHello(sayWassup);
