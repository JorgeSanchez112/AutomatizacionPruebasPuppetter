const puppeteer = require('puppeteer')


describe(' Emulando dispositivo', ()=>{

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
        await page.goto('https://platzi.com/', {waitUntil: 'networkidle0' })

    },30000)

    afterAll(async ()=>{
        await browser.close()
    })

    test(' Emulando dispositivos de forma manual', async()=> {

        await page.emulate({
            name: 'Mi dispositivo',
            viewport: {
                width: 375,
                height: 667,
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true,
                isLandscape: false
            },

            userAgent:
            'Mozilla/5.0(Linux; Android 10; SAMSUNG SM-J600G) AppleWebKit/537.38 (KHTML,likeGecko) SamsungBrowser/10.1 Chrome/71.0.3578.99 Mobile Safari/537.36',
        })

        await page.waitForTimeout(3000)

    }, 35000)

    test(' Emulando sitio de escritorio', async()=> {

        await page.setViewport({
            width: 1280,
            height: 800,
            })

        await page.waitForTimeout(3000)

    }, 35000)

    test(' Emulando sitio en una tablet en modo landscape', async()=> {

        const tablet = puppeteer.KnownDevices['iPad landscape']
        await page.emulate(tablet)

        await page.waitForTimeout(3000)

    }, 35000)

    test(' Emulando sitio en un celular', async()=> {

        const celular = puppeteer.KnownDevices['Galaxy S8']
        await page.emulate(celular)

        await page.waitForTimeout(3000)

    }, 35000)
})