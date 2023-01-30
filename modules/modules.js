let puppeteer = require('puppeteer');

module.exports = {
    getDirUrl: (url) => {
        return new Promise(async (resolve, reject) => {
            try {
                const launch = await puppeteer.launch().catch((err) => { console.error(err) });;
                const page = await launch.newPage().catch((err) => { console.error(err) });;
                await page.goto(url).catch((err) => { console.error(err) });
                setTimeout(async () => {
                    let src = await page.$eval("video", n => n.getAttribute("src")).catch((err) => { console.error(err) });
                    console.log(src);
                    resolve(src);
                    await launch.close().catch((err) => { console.error(err) });
                }, 3000)
            } catch (err) {
                console.error(err)
            }
        })
    }
}