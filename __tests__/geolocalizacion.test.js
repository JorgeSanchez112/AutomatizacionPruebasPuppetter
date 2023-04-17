const puppeteer = require('puppeteer')

expect.extend({ toMatchImageSnapshot})

describe('Geolocalizacion', ()=>{

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

    test('Cambio de la geolocalizacion', async () => {
        const context = browser.defaultBrowserContext()

        await context.overridePermissions('https://chercher.tech/practice/geo-location.html', [
            'geolocation'
        ])

        await page.setGeolocation({ latitude:90, longitude: 20 })

        await page.goto('https://chercher.tech/practice/geo-location.html')

        await page.waitForTimeout(5000)
        await page.setGeolocation({ latitude:90, longitude: 0 })
        await page.goto('https://chercher.tech/practice/geo-location.html')
        await page.waitForTimeout(5000) 

        
    },35000)
    
})