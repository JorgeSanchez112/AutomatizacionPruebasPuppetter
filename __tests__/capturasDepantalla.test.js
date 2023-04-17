const puppeteer = require('puppeteer')


describe(' Capturas de pantalla', ()=>{

    let browser
    let page

    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        })
        
        //Lo emula en modo incognito
        const context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()
        await page.goto('https://google.com/', {waitUntil: 'networkidle0' })

    },30000)

    afterAll(async ()=>{
        await browser.close()
    })

    test(' Captura de pantalla completa', async()=> {

        await page.screenshot({
            path:'./capturasDepantalla.png',
            fullpage: true
        })

    }, 35000)

    test(' Captura de pantalla seleccionando un area', async()=> {

        await page.screenshot({
            path:'./capturaDepantallaSeleccionandoUnArea.png',
            clip: {
                x: 0,
                y: 0,
                width: 500,
                height: 500
            }
        })

    }, 35000)

    test(' Captura de pantalla con fondo transparente', async()=> {

        await page.evaluate(() => (document.body.style.background = 'transparent'))

        await page.screenshot({
            path:'./capturaDepantallaTransparente.png',
            omitBackground: true
        })

    }, 35000)

    test(' Captura de pantalla a un elemento', async()=> {
        
        const elemento = await page.waitForSelector('body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img')

        await elemento.screenshot({
            path:'./capturaDepantallaElemento.png'
        })

    }, 35000)

})