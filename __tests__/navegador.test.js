const puppeteer = require('puppeteer')

describe(' Mi primer test en puppeteer', ()=>{

    it('Debe abrir y cerrar el navegador', async()=> {
        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 0,
            devtools: false,
            /* defaultViewport: {
                width: 2100,
                height: 1080
            } */
            /* args:['--window-size=1920,1080'] */
            /* defaultViewport: null */

        })

        const page = await browser.newPage()
        await page.goto('https://github.com/')
        await page.waitForSelector('img')
        //Recargar la pagina
        await page.reload()
        await page.waitForSelector('img')

        //navegar a otro sitio
        await page.goto('https://platzi.com/')
        await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Logo > div > a > div > figure > img')

        //Navegar hacia atras

        await page.goBack()
        await page.goForward()
        await page.waitForSelector('img')

        //Abrir otra pagina
        const page2 = await browser.newPage()
        await page2.goto('htpps://google.com/')

        await browser.close()
    }, 35000)
})