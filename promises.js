// Create aSimple Prmise and resolve it after 2 seconds.

const a = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            status: "Resolved",
            message: "This is real Slim Shady"
        });
    }, 2000);
});

// Consume the promise
a.then((val) => {
    console.log(val);
});

console.log("An Immediate Log");

// Chaining Promises
const b = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("I'm Slim Shady");
    }, 1000);
});

const c = b.then((val) => {
    console.log(val);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Yes I'm Real Shady");
        }, 1000);
    });
});

c.then(
    (val) => {
        console.log(val);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("All you other Slim Shady's are just imitating, So wont the Real Slim Shady please stand up");
                resolve();
            }, 1000);
        });
    }
)

const d = '1';

const e = new Promise((resolve, reject) => {
    if (d === '1') {
        resolve("Promise is resolved");
    } else {
        reject("Promise is rejected");
    }
});

e.then(
    (val) => {
        console.log(val);
    }
).catch(
    (err) => {
        console.log(err);
    }
);
// Using single then with two parameters
// First parameter is for success and second is for error
// This is not a good practice to handle errors
// Better use catch method to handle errors
// because if there is an error in the success callback then it will not be caught by the second parameter of then method
// but it will be caught by the catch method
// So always use catch method to handle errors
e.then((message) => {
    console.log("Success: ", message);
}, error => {
    console.log("Error: ", error);
})