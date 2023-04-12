const puppeteer = require('puppeteer')

describe(' Tipos de espera', ()=>{

    /* jest.setTimout(10000) */

    it('Mostrar todos los diferentes tipos de espera', async()=> {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        })

        const page = await browser.newPage()
        page.setDefaultTimeout(30000)
        await page.goto('https://platzi.com/', { waitUntil : 'networkidle0'})

        //Espera explicita

        await page.waitForTimeout(5000)

        //Espera por un css selector

        /* await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Logo > div > a > div > figure > img') */

        //Espera por un xpath

        await page.waitForXPath('//*[@id="Header-v2"]/nav[1]/div[1]/div/a/div/figure/img')

        await page.goto('https://demoqa.com/modal-dialogs',{ waitUntil: 'networkidle2' })

        const button = await page.waitForSelector('#showSmallModal', { visible: true })
        /* const button = await page.waitForXPath('//*[@id="showSmallModal"]', { visible: true }) */
        await button.click()

        //Espera por funcion

        await page.waitForFunction(()=> document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal')

        // Ejemplo para observar el viewport

       /*  const observaResize = page.waitForFunction('window.innerWidth < 100')
        await page.setViewport({ width: 50, height: 50})

        await observaResize */

        await page.click('#closeSmallModal')
        await page.waitForFunction(()=> !document.querySelector('#example-modal-sizes-title-sm'), {
            timeout:40000
        })

        await browser.close()

       
    }, 45000)
})