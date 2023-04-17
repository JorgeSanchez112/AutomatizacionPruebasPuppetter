const puppeteer = require('puppeteer')
const { AxePuppeteer } = require('@axe-core/puppeteer')

describe('Accesibilidad', ()=>{

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

    test('Probar accesibilidad', async () => {
        

        await page.goto('https://platzi.com')
        await page.waitForSelector('img')
        const snapshot = await page.accessibility.snapshot()
        console.log(snapshot)

    },35000)

    test('Probar accesibilidad con axe', async () => {
        

        await page.setBypassCSP(true)
        await page.goto('https://platzi.com')
        await page.waitForSelector('img')

        const result = await new AxePuppeteer(page).analyze()
        console.log(result.violations)

    },35000)
    
    
})