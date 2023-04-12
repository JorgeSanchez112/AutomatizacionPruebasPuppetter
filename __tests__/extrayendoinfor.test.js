const puppeteer = require('puppeteer')

describe(' Extrayendo informacion', ()=>{

    let browser
    let page

    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        })

        page = await browser.newPage()
        await page.goto('http://platzi.com', {waitUntil: 'networkidle0' })

    },30000)

    afterAll(async ()=>{
        await browser.close()
    })

    it(' Extraer la informacion de un elemento', async()=> {

        await page.waitForSelector(' #Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Menu > button')

        const nombreBoton = await page.$eval(' #Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Menu > button', (button)=>button.textContent)

        console.log('nombreBoton', nombreBoton)
        const [button] = await page.$x('//*[@id="Header-v2"]/nav[1]/section/button[2]')
        const propiedad = await button.getProperty('textContent')
        const texto = await propiedad.jsonValue()
        console.log('texto', texto)

        //Segunda forma

        const texto2 = await page.evaluate((name)=>name.textContent, button)
        console.log('texto', texto2)

        const button3 = await page.waitForXPath('//*[@id="Header-v2"]/nav[1]/div[1]/div/a/div/figure/img')
        const texto3 = await page.evaluate((name)=>name.textContent, button3)
        console.log('texto', texto3)        
       
    }, 35000)

    it('Extraer el titulo de la pagina y la url', async ()=> {
        const titulo = await page.title()
        const url = await page.url()

        console.log('titulo', titulo)
        console.log('url', url)
        
    },35000)

    it('Contar los elementos de una pagina', async ()=>{
       
        const images = await page.$$eval('img',(imagenes)=>imagenes.length)
        console.log(images)

        await browser.close()

    },10000)
})