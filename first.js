var json2xls = require('json2xls');
const fs=require('fs');
const puppeteer = require('puppeteer');
const { scrollPageToBottom } = require('puppeteer-autoscroll-down')
async function getElText(page, selector) { 
    return await page.evaluate((selector) => {
        return document.querySelector(selector.innerText)
    }, selector);
}



function getAllMatches(link,t){
    console.log(link,t);
    let data=[];
    (async function scrape() {
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

        const lastPosition = await scrollPageToBottom(page, {
            size: 500,
            delay: 250
          })
          
    
    
        //await page.goto('https://www.linkedin.com/sales/search/people?companyIncluded=BrowserStack%3A2553488&companyTimeScope=CURRENT&doFetchHeroCard=false&logHistory=false&page=2');
        
        await page.waitForSelector('.result-lockup__name > a');
         const selectorPersonNames = await page.$$('.result-lockup__name > a');
         const selectorPage = await page.$$('.search-results__pagination-list>.selected');
        //  console.log(selectorPersonNames);
         console.log("-----------------------------------------------------------------------------------------------");
         const selectorCompanyName = await page.$$('.result-lockup__position-company > a > span[data-anonymize=company-name]');
       
        for(i = 0 ; i < selectorPersonNames.length ; i++) {
            
           
            const full = await (await selectorPersonNames[i].getProperty('innerText')).jsonValue();
            const company = await (await selectorCompanyName[i].getProperty('innerText')).jsonValue();
            let inning={
                fullName:full,
                companyName:company
            }
            data.push(inning);
        }
        let pageno=await (await selectorPage[0].getProperty('innerText')).jsonValue();
        let batsmanFilePath=`./temp.json`;
    let batsmanFile = fs.readFileSync(batsmanFilePath);
    batsmanFile=JSON.parse(batsmanFile);
    for(let i=0;i<data.length;i++){
        batsmanFile.push(data[i]);
    }

    console.log(batsmanFile.length);
    fs.writeFileSync(batsmanFilePath,JSON.stringify(batsmanFile));
        if(t<=25){
            let jsonFilePath=`./temp.json`;
        let batsmanFile = fs.readFileSync(jsonFilePath);
        batsmanFile=JSON.parse(batsmanFile);
        console.log(batsmanFile);
        var xls = json2xls(batsmanFile);

        fs.writeFileSync('data.xlsx', xls, 'binary');
        }
        else{
            let aftertime=(10+(pageno%10));
            setTimeout( function() { getAllMatches(link+1,t-25); }, aftertime);
        }
      })();
};
module.exports=getAllMatches;