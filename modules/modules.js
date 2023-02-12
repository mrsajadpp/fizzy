let puppeteer = require('puppeteer');

module.exports = {
    getDirUrl: (url) => {
        return new Promise(async (resolve, reject) => {
            try {
                const launch = await puppeteer.launch().catch((err) => { console.error(err); reject(err) });;
                const page = await launch.newPage().catch((err) => { console.error(err); reject(err) });;
                await page.goto(url).catch((err) => { console.error(err); reject(err) });
                setTimeout(async () => {
                    try {
                        let src = await page.$eval("video", n => n.getAttribute("src")).catch((err) => { console.error(err); reject(err) });
                        console.log(src);
                        resolve(src);
                        await launch.close().catch((err) => { console.error(err) });
                    } catch (err) {
                        console.error(err)
                        reject(err)
                    }
                }, 4000);
            } catch (err) {
                console.error(err)
                reject(err)
            }
        })
    }
}