function printReport(pages){
    const entries = Object.entries(pages);
    let sortedEntries = entries.sort(([,valueA],[,valueB])=> valueB - valueA);
    let sortedPages = Object.fromEntries(sortedEntries);

    console.log(entries)
   
    // pages.sort((a, b) => b.url - a.url);
    for(let url in sortedPages){
      console.log(`Found ${sortedPages[url]} internal links to ${url}`)
    }
}

export {printReport}