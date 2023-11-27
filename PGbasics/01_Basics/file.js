const fs = require("fs");
const os = require("os");

// Sync calls..
// fs.writeFileSync("./test.txt", "Testing"); // this is to write or create a file in your folder
// fs.writeFileSync("./app.js", "console.log()");

// async calls..
// fs.writeFile("./hello.txt", "Aysnc calls", (err) => {});

// Reading Files

//sync
// const result = fs.readFileSync("./test.txt", "utf-8");
// console.log(result);

// async
// fs.readFile("./hello.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log(result);
//   }
// });

// Async excepts for some callbacks
// Sync excepts for returns

//Append

//sync
fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
fs.appendFileSync("./test.txt", `${Date.now()} hello world\n`);

// So, with the help of fs you can open, create, read, delete, copy, make new folder, but with the help of js you can never handle fs.

//os => Gives your operating system info

console.log(os.cpus().length);

// we Should always write non-blocking operations
