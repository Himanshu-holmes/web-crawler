// Import the url module from Node.js
import url from "url";

// Parse an URL string into its segments
// const myURL = url.parse(
//   "http://localhost:3000/pathname?search=test#hash",
//   true,
// );

// console.log(myURL.query);

// import readline from "node:readline";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question(`What's your name?`, (name) => {
//   console.log(`Hi ${name}!`);
//   rl.close();
// });

// import inquirer from "inquirer";

// const questions = [
//   {
//     type: "input",
//     name: "name",
//     message: "What's your name?",
//   },
//   {
//     type: "password",
//     name: "password",
//     message: "this is your password",
//     mask: "*",
//   },
// ];

// inquirer.prompt(questions).then((answers) => {
//   console.log(`Hi ${answers.name}!`);
//   console.log(`your password is ${answers.password}`);
// });
//
//
// import { argv } from "process";
// function main() {
//   console.log("I am from main fnc");

//   console.log("your argument is", process.argv2);
//   if (argv.length <= 2) {
//     throw Error("one argument is required");
//     return;
//   }
//   if (argv.length > 3) {
//     throw Error("you cannot passed more than one argument");
//     return;
//   }
//   // print process.argv
//   argv.forEach((val, index) => {
//     if (index > 1) {
//       console.log(` ${val}`);
//     }
//   });
// }
// main();

function printArrayRecursive(arr, i) {
  // base case, stop recurring

  if (i === arr.length) {
    return;
  }

  console.log(arr[i]);

  // call ourself with the next index

  printArrayRecursive(arr, i + 1);
}
let arr = [1, 2, 3, 4, 5, 6];
printArrayRecursive(arr, 0);
