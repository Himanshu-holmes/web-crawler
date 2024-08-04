console.log("app is running");

import { argv } from "process";
import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";
function main() {
  console.log("I am from main fnc");

  // console.log("your argument is", process.argv2);
  if (argv.length <= 2) {
    throw Error("one argument is required");
    return;
  }
  if (argv.length > 3) {
    throw Error("you cannot passed more than one argument");
    return;
  }
  // print process.argv
  argv.forEach(async (val, index) => {
    if (index > 1) {
      console.log(`crawler is starting at baseURL ${val} `);
      console.log("loading....");
      let res = await crawlPage(val);
      
      console.log("response from main func ", res);
      printReport(res)
    }
  });
}
main();
