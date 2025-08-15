// Data Types in JavaScript

// Primitive Data Types
// These are the most basic data types in JavaScript.

let message = "Hello"; // String
let age = 42; // Number
let isStudent = true; // Boolean
let lectures = null; // Null
let undefined; // Undefined

// Reference Data Types
// These are more complex data types. They can hold collections of values.

let numbers = [1, 2, 3]; // Array
let human = { name: "Alice", age: 25 }; // Object
let greet = function () {
  console.log("Hello World");
}; // Function

// var vs let vs const
function varGreet() {
  var message = "Hello World";
  if (true) {
    var message = "Hello Universe";
  }
  console.log(message);
}
// varGreet();

function letGreet() {
  let message = "Hello World";
  if (true) {
    let message = "Hello Universe";
  }
  console.log(message);
}
// letGreet();
//constGreet() would also act the same way

// == vs ===

//== is used for comparing two variables, but it ignores the datatype of variable.
//Most common use case is for null and undefined
console.log("1" == 1); //true
console.log(3 == [3]); //true
console.log(3 == 3); //true
console.log(3 == "3"); //true
console.log(1 == true); //true
console.log("" == 0); //true

//=== is used for comparing two variables, but this will check the datatype and compare two values.
//We should use this operator in most of the cases.

console.log("1" === 1); //false
// console.log(3===[3]); //false
console.log(3 === 3); //true
console.log(1 === true); //false
console.log("" === 0); //false

//Hoisting
//Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope before code execution.
//This means that no matter where functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local.

//Function Hoisting
hoistFunction();
function hoistFunction() {
  console.log("Function has been hoisted");
}

//Variable Hoisting
console.log(hoistVar); //undefined (instead of ReferenceError)
var hoistVar = "Variable has been hoisted";

// Regular Functions & Arrow functions
// Regular Function
function regularSum(a, b) {
  return a + b;
}

// Arrow Function
const arrowSum = (a, b) => a + b;

console.log(regularSum(1, 2));
console.log(arrowSum(1, 2));

//Anonymous Functions
// Regular Function
const regularGreet = function () {
  console.log("Hello World");
};

// Arrow Function

const arrowGreet = () => {
  console.log("Hello World");
};

regularGreet();
arrowGreet();

//Scope approach of regular and arrow functions
// Regular Function
function greetRegular() {
  this.greeting = "Hello World";
  console.log(this.greeting);
}
greetRegular(); //Hello World

// Arrow Function
greetArrow = () => {
  this.greeting = "Hello World";
  console.log(this.greeting);
};
greetArrow(); //undefined

//functions as arguments
const arr = [1, 2, 3, 4, 5];

arr.sort((a, b) => b - a);

console.log(arr);

arr.sort(function (a, b) {
  return a - b;
});

console.log(arr);

//Array Methods

//forEach
const randomNumbers = [1, 2, 3, 4, 5];

randomNumbers.forEach((number) => {
  console.log(number);
});

//map
const doubleNumbers = randomNumbers.map((number) => number * 2);
console.log(doubleNumbers);

//filter

const evenNumbers = randomNumbers.filter((number) => number % 2 === 0);
console.log(evenNumbers);

//reduce
const sum = randomNumbers.reduce((acc, number) => acc + number, 0);
console.log(sum);

//find
const findNumber = randomNumbers.find((number) => number === 3);
console.log(findNumber);

//findIndex
const findIndex = randomNumbers.findIndex((number) => number === 3);
console.log(findIndex);

//some
const someNumbers = randomNumbers.some((number) => number > 5);
console.log(someNumbers);

//every
const everyNumbers = randomNumbers.every((number) => number > 0);
console.log(everyNumbers);

//includes
const includesNumber = randomNumbers.includes(3);
console.log(includesNumber);

//sort
randomNumbers.sort((a, b) => b - a);
console.log(randomNumbers);

//reverse
randomNumbers.reverse();
console.log(randomNumbers);
