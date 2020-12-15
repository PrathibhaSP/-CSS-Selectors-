const puppeteer = require('puppeteer');
function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();
            await page.goto("https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020");
            let urls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('.lbl-licitacao');
                items.forEach((item) => {
                    results.push({
                        text: item.innerText,
                    });
                });
                return results;
            })
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log).catch(console.error);
