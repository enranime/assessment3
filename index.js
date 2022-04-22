const axios = require('axios');
const cheerio = require('cheerio');
const args = process.argv.slice(2);

const url = "https://codequiz.azurewebsites.net/";

async function getHTMLData() {

    const name = args.toString();

    axios.get(url, {
        headers: {
            Cookie: "hasCookie=true"
        }
    }).then(response => {
        const html_data = response.data;
        const $ = cheerio.load(html_data);
        let nav ;

        $(`body > table > tbody > tr`).each((index,element) => {
            const tName = $($(element).find("td")[0]).text();
            if(name === tName){
                nav = $($(element).find("td")[1]).text();
            }
        
        })
        
        if(nav){
            console.log(nav)
        }else{
            console.log(`Fund Name:"${args}" doesn't exist` )
        }

    });
     
}


getHTMLData();