const puppeteer = require('puppeteer')
const { toMatchImageSnapshot} = require('jest-image-snapshot')
expect.extend({ toMatchImageSnapshot})

describe('Visual test', ()=>{

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

    test('Snapshot de toda la pagina', async () => {

    await page.waitForSelector('img')

    const screenshot = await page.screenshot()

    expect(screenshot).toMatchImageSnapshot()
        
    },35000)

    test('Snapshot de solo un elemento', async () => {

        const image = await page.waitForSelector('img')
    
        const screenshot = await page.screenshot()
    
        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: 0.05,
            failureThresholdType: 'percent'
        })
            
    },35000)

    test('Snapshot de solo un elemento', async () => {

        const image = await page.waitForSelector('img')
    
        const screenshot = await page.screenshot()
    
        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: 0.05,
            failureThresholdType: 'percent'
        })
            
    },35000)

    test('Snapshot de un celular', async () => {

        const tablet = puppeteer.KnownDevices['iPad Pro']
        await page.emulate(tablet)

        const image = await page.waitForSelector('img')
    
        const screenshot = await page.screenshot()
    
        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: 0.05,
            failureThresholdType: 'percent'
        })
            
    },35000)

    test('Remover imagen antes de crear snapshot', async () => {

        await page.waitForSelector('img')

        /* await page.evaluate(() => 
            (document.querySelectorAll('img') || []).forEach((img) => img.remove())
        ) */
    
        const screenshot = await page.screenshot()
    
        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: 0.05,
            failureThresholdType: 'percent'
        })
            
    },35000)

})