const puppeteer = require('puppeteer')
const { AxePuppeteer } = require('@axe-core/puppeteer')

describe('Performance', ()=>{

    let browser
    let page

    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        })

        page = await browser.newPage()
        await page.goto('http://platzi.com')

    },30000)

    afterAll(async ()=>{
        await browser.close()
    })

    test('Medir el performance de la automatizacion', async () => {
        
        await page.waitForSelector('img')
        const metrics = await page.metrics()
        console.log(metrics)

    },35000)

    test('Medir el performance de la pagina', async () => {
        
        await page.waitForSelector('img')
        const metrics2 = await page.evaluate(()=>JSON.stringify(window.performance))
        console.log(metrics2)

    },35000)

    test('Medir el performance del page load', async () => {
        
        await page.tracing.start({ path: 'profile.json', screenshots: true })    
        await page.goto('http://platzi.com')
        await page.tracing.stop()
        const tracing = JSON.parse(fs.readFileSync('./profile.json','utf8'))
        //Filtrar el JSON
        const traceScreenShots = tracing.traceEvents.filter(
            (x)=>
            x.cat === 'disabled-by-default-devtools.screenshot' &&
            x.name === 'Screensho' &&
            typeof x.args !== 'undefined' &&
            typeof x.args.snapshot !== 'undefined'
        )

        //Iterar sobre este arreglo para crear las imagenes

        traceScreenShots.forEach(function(snap,index){
            fs.writeFile(`trace-screenshot-${index}.png`,snap.args.snapshot, 'base64',function(err){
                if(err){
                    console.log('No pude crear el archivo', err)
                }
            })
        });

    },35000)

    test('Debera medir el perfomance del first paint y first contentful paint', async () => {
        const navigationPromise = page .waitForNavigation()
        await page.goto('http://platzi.com')
        await navigationPromise

        let firstPaint = JSON.parse(
            await page.evaluate(()=> JSON.stringify(performance.getEntriesByName('first-paint')))
        )

        let firstContentfulPaint= JSON.parse(
            await page.evaluate(()=> JSON.stringify(performance.getEntriesByName('first-contentful-paint')))
        )

        console.log('firstPaint', firstPaint)
        console.log('firstContentfulPain', firstContentfulPaint)
       
    },35000)

    test('Debera medir el perfomance los frames for segundo', async () => {
        const devtoolsProtocolClient = await page.target().createCDPSession()
        await devtoolsProtocolClient.send('Overlay.setShowFPSCounter',{ show : true})
        await page.goto('http://platzi.com')

        await page.screenshots({ path : 'framePorSegundo.jpg', type: 'jpeg'})
        
    },35000)
    
    
})