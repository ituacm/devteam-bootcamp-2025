//Callbacks

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

sayHello(sayBye);

function sumNumbers(a, b, callback) {
  const sum = a + b;
  callback(sum);
}

function print(sum) {
  console.log(sum);
}

function printExcited(sum) {
  console.log("OMG!!! sum is " + sum + "!");
}

sumNumbers(1, 2, print);

sumNumbers(1, 2, printExcited);

//Promises

const p = new Promise((resolve, reject) => {
  const result = false;
  if (result) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});

p.then(
  (message) => {
    console.log("This is in the then: " + message);
  },
  (message) => {
    console.log("This is in the then: " + message);
  }
);

p.then((message) => {
  console.log("This is in the then: " + message);
}).catch((message) => {
  console.log("This is in the catch: " + message);
});

console.log(p);

function watchVideo() {
  const gonnaWatch = false;
  return new Promise((resolve, reject) => {
    if (gonnaWatch) {
      console.log("Watching Video...");
      setTimeout(() => {
        resolve("Video Watched");
      }, 2000);
    } else {
      reject("Not gonna watch :(");
    }
  });
}

const videoPromise = watchVideo();

console.log(videoPromise);

setTimeout(() => {
  console.log(videoPromise);
}, 2500);

videoPromise.then(
  (message) => {
    console.log(message);
  },
  (message) => {
    console.log(message);
  }
);

//Async/Await
function giveVideo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Al sana video");
    }, 2000);
  });
}

async function displayVideo() {
  const video = await giveVideo();
  console.log(video);
}

displayVideo();

//try-catch

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = false;
      if (!error) {
        console.log("Data Fetched");
        resolve(["Elma", "Armut", "Muz"]);
      } else {
        console.log("Error");
        reject("Data Fetching Error.");
      }
    }, 2000);
  });
}

async function displayData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.log("An error occured: ", error);
  } finally {
    console.log("Finally its done...");
  }
}

displayData();
