const p = new Promise((resolve, reject) => {
  let a = 2 + 1;
  if (a === 2) {
    setTimeout(() => {
      resolve("Success");
    }, 2000);
  } else {
    reject("Failed");
  }
});

p.then((message) => console.log("This is successfull: " + message)).catch(
  (error) => console.log("This is bad: " + error)
);

console.log(p);

setTimeout(() => {
  console.log(p);
}, 2500);
