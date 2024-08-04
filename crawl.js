import { JSDOM } from "jsdom";
import fs from "fs";
function normalizeURL(url) {
  try {
    let myUrl = new URL(url);
    let u = `${myUrl.host}${myUrl.pathname}`;
    if (u.slice(-1) === "/") {
      u = u.slice(0, -1);
    }
    return u;
  } catch (err) {
    return err;
  }
}
// console.log("url =", normalizeUrl("http://fb.com/"));

function getURLsFromHTML(htmlBody, baseUrl) {
  const dom = new JSDOM(htmlBody);
  // console.log(dom);
  let links = dom.window.document.querySelectorAll("a");
  let linkArr = [];
  let newArr = links.forEach((anc) => {
    if (anc.hasAttribute("href")) {
      let href = anc.getAttribute("href");
      try {
        let url = new URL(href, baseUrl).href;
        // console.log("url", url);
        linkArr.push(url);
      } catch (error) {
        console.error(error);
      }
    }
  });

  return linkArr;
}
console.log(
  getURLsFromHTML(
    `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>`,
    "https://blog.boot.dev",
  ),
);
let i = 0;



async function fetchUrlAndGetUrlsArrFromHtml(currentUrl) {
  try {
    const response = await fetch(currentUrl, {
      "Content-type": "text/html",
    });
    if(!response)return []
    // console.log(response)
    if (response.status >= 400) {
      console.log("something wrong");
      return[];
    }
    // console.log(response.headers);
    const contentType = response.headers.get("content-type");
    // console.log("Content-Type:", contentType); // Debugging line

    if (!contentType || !contentType.includes("text/html")) {
      console.log("did not get text/html");
      return [];
    }
    let html = await response.text();
    // console.log(html);
    let urls = getURLsFromHTML(html, currentUrl);
    return urls;
  } catch (error) {
    return [];
  }
}
// function getHtml(res) {
//   return res.text();
// }

async function crawlPage(baseUrl, currentUrl = baseUrl, pages = {}) {
  let bUrl = new URL(baseUrl);
  let cUrl = new URL(currentUrl);
  if(cUrl.pathname === "/index.xml"){
    return pages;
  }
  if (cUrl.hostname !== bUrl.hostname) {
    return pages;
  }
  let normalUrl = normalizeURL(currentUrl);
  
  if (!pages[normalUrl]) {
    pages[normalUrl] = 1;
  } else {
    pages[normalUrl] = pages[normalUrl] + 1;
    
  return pages
  }
  console.log("crawling ",cUrl.href) 

  let urls = await fetchUrlAndGetUrlsArrFromHtml(cUrl.href);
  // console.log(urls);

   for(let eachUrl of urls){

    pages = await crawlPage(baseUrl,eachUrl,pages)
   }

  // for (let i = 0; i < urls.length; i++) {
  //   console.log("crawl page called  ")
  //  await crawlPage(baseUrl, urls[i], pages);
  // }
  return pages;
}
export { normalizeURL, getURLsFromHTML, crawlPage };
