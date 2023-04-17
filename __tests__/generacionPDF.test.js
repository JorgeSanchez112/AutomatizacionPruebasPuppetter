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

    test('PDF de pantalla completa', async()=> {

        let pdfCSS = []
        pdfCSS.push('<style>')
        pdfCSS.push('h1 { font-size:10px; margin-left:30px;}')
        pdfCSS.push('</style>')

        const css = pdfCSS.join('')

        await page.pdf({
            path:'./google.pdf',
            format:'A4',
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: css + '<h1>' + 'Mira mama mi primer PDF con pupeteer' + '</h1>',
            footerTemplate: css + '<h1> page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>',
            margin: {
                top: '100px',
                bottom: '200px',
                right: '30px',
                left: '30px'
            }

        })

    }, 35000)

    test('PDF de pantalla completa en modo landscape', async()=> {

        let pdfCSS = []
        pdfCSS.push('<style>')
        pdfCSS.push('h1 { font-size:10px; margin-left:30px;}')
        pdfCSS.push('</style>')

        const css = pdfCSS.join('')

        await page.pdf({
            path:'./googleLandscape.pdf',
            format:'A4',
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: css + '<h1>' + 'Mira mama mi primer PDF con pupeteer' + '</h1>',
            footerTemplate: css + '<h1> page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>',
            margin: {
                top: '100px',
                bottom: '200px',
                right: '30px',
                left: '30px'
            }
        })

    }, 35000)

})