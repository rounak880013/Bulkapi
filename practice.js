//bubble store li at cookie
//page address store bubble
//
const fs=require('fs');
const puppeteer = require('puppeteer');
// const pretty = require("pretty");
const { scrollPageToBottom } = require('puppeteer-autoscroll-down')
const getnext=require("./first.js");
async function getElText(page, selector) { 
    return await page.evaluate((selector) => {
        return document.querySelector(selector.innerText)
    }, selector);
}

function first_scrape(){(async function scrape() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4298.0 Safari/537.36');
    await page.setCookie(
        {
            'name': 'li_at',
            'value': 'AQEDATMzHgcFZ-N8AAABfiOPHgEAAAF-tCl4dE4ApCPTd73q0jxnG8Fc_hkyxTGK_pPndC4XL2oc7akhenq6rq4CiXc6sIphfo-p2byP-sv8eI4kB5s1jyrsRHHE_rJg9CSyaXk7TG9POLFPSPHz3vKV',
            'url': 'https://www.linkedin.com'
          }
        
    );
    await page.setCookie(
        {
            'name':'li_a',
            'value':'AQJ2PTEmc2FsZXNfY2lkPTQ2NTU5NDUwNSUzQSUzQTE4OTI5MDAwMi_EPAOrUOulrmCBrK24j93bvXCu',
            'url': 'https://www.linkedin.com'
          }
        
    );
    let result=await page.goto('http://localhost:8080/');
    
    console.log(result);
    const lastPosition = await scrollPageToBottom(page, {
        size: 500,
        delay: 250
      })
      


    //await page.goto('https://www.linkedin.com/sales/search/people?companyIncluded=BrowserStack%3A2553488&companyTimeScope=CURRENT&doFetchHeroCard=false&logHistory=false&page=2');
    
    await page.waitForSelector('.result-lockup__name > a');


    console.log("-----------------------------------------------------------------------------------------------");

     const selectorPersonNames = await page.$$('.result-lockup__name > a');
     const selectorPage = await page.$$('.search-results__pagination-list>.selected');
    //  console.log(selectorPersonNames);
     console.log("-----------------------------------------------------------------------------------------------");
     const selectorCompanyName = await page.$$('.result-lockup__position-company > a > span[data-anonymize=company-name]');
     const totalpages = await page.$$('.bulk-actions__action-item > label>strong');
     let t=totalpages.length;
     t=await (await totalpages[t-1].getProperty('innerText')).jsonValue()
     t=parseInt(t);
     console.log(t);
     let pageno=await (await selectorPage[0].getProperty('innerText')).jsonValue();
         let data=[];
    for(i = 0 ; i < selectorPersonNames.length ; i++) {
        
       
        const full = await (await selectorPersonNames[i].getProperty('innerText')).jsonValue();
        const company = await (await selectorCompanyName[i].getProperty('innerText')).jsonValue();
        let inning={
            fullName:full,
            companyName:company
        }
        data.push(inning);
        // console.log(fullName);
        // console.log(companyName);
    }
    console.log(data);
    console.log(data.length)
    let batsmanFilePath=`./temp.json`;
    let batsmanFile = data;
    fs.writeFileSync(batsmanFilePath,JSON.stringify(batsmanFile));
    if(data.length==t){
        let jsonFilePath=`./temp.json`;
        let batsmanFile = fs.readFileSync(jsonFilePath);
        batsmanFile=JSON.parse(batsmanFile);
        console.log(batsmanFile);
        var xls = json2xls(batsmanFile);

        fs.writeFileSync('data.xlsx', xls, 'binary');
    }
    else if(t>pageno*25){
         let aftertime=(10+(pageno%10));
         let current=parseInt(pageno);
         console.log(current,"current");

        setTimeout( function() { getnext(current+1,t-25); }, aftertime);
     }
//     let data=[];
//     for(i = 0 ; i < selectorPersonNames.length ; i++) {
        
       
//         const full = await (await selectorPersonNames[i].getProperty('innerText')).jsonValue();
//         const company = await (await selectorCompanyName[i].getProperty('innerText')).jsonValue();
//         let inning={
//             fullName:full,
//             companyName:company
//         }
//         data.push(inning);
//         // console.log(fullName);
//         // console.log(companyName);
//     }
//     console.log(selectorPage.length);
//     // for(i=0;i<selectorPage.length;i++){
//     //     console.log(" ................................................................................................");
//     //     let pageno=await (await selectorPage[i].getProperty('innerText')).jsonValue();
//     //     console.log(pageno);
//     //     let current=parseInt(pageno);
//     //     setTimeout( function() { getnext(current+1); }, 10000);
//     // }
//     // console.log(data);
//     // let batsmanFilePath=`./temp.json`;
//     // let batsmanFile = data;
//     // fs.writeFileSync(batsmanFilePath,JSON.stringify(batsmanFile));
//     // Best Solution : 

//     //  selectors.forEach((node) => {
//     //      console.log("hello");
//     //     console.log(node.innerText);
//     //  })

//     //  Array.from(selectors, function(el) { 
//     //      console.log(el.textContent);
//     //      return el.textContent 
//     //     })

//     //  console.log(selectors.length);
//     // console.log(selectors);

//     // selectors.forEach( (element) => {
//     //     //let tds = element.$$('td');
//     //     //console.log(tds);
//     //     //tds.forEach( (element) => { 
//     //       //console.log(element.innerText());
//     //         //const printer = element.innerText();
//     //         //console.log(printer);
//     //       const trText = page.evaluate(el => 
//     //         el.innerText, element);
//     //     console.log(trText)


//     //     //});
//     //   });


    
//     let urls = await page.evaluate(() => {
//         let results = [];
//         let items = document.querySelectorAll('.caption a');
//         items.forEach((item) => {
//             results.push({
//                 text: item.innerText,
//             });
//             console.log(item.innerText);
//         });
//         return results;
//     })


//     //await page.select('select#author', 'Albert Einstein');
    
//     // await page.waitForSelector('#tag');
//     // await page.select('select#tag', 'learning');

//     // await page.click('.btn');
//     // await page.waitForSelector('.quote');

// //     let quotes = await page.evaluate(() => {
// //         let quotesElement = document.body.querySelectorAll('.quote');
// //     let quotes = Object.values(quotesElement).map(x => {
// //               return {
// //                   author: x.querySelector('.author').textContent ?? null,
// //     quote: x.querySelector('.content').textContent ?? null,
// //     tag: x.querySelector('.tag').textContent ?? null,
// //   };
// // });
// //  return quotes;
// // });

// // console.log(quotes);


// //await browser.close();


  })();

}
module.exports=first_scrape;