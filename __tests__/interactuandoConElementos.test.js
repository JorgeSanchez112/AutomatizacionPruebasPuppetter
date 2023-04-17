const puppeteer = require('puppeteer')

const {click, type, doubleClick} = require('../lib/helpers')

describe(' Interactuando con elementos', () => {

    it('Debe abrir y cerrar el navegador', async()=> {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        })

        const page = await browser.newPage()
        await page.goto('https://demo.guru99.com/test/simple_context_menu.html')

        page.on('dialog',async(dialog)=>{
            await dialog.accept()
        })

        //Click derecho

        await page.click('#authentication > span', { button: 'right', delay:500})
        page.setDefaultTimeout(3000)

        //Doble click
        await doubleClick(page,'#authentication > button')

        await page.goto('https://devexpress.github.io/testcafe/example/')
        await type(page, '#developer-name', 'Javier', { delay :100})

        await click(page,'#remote-testing')
        await click(page,'#tried-test-cafe')
        await type(page,'#comments','Esto es un comentario')

        await page.select('#preferred-interface', 'Both')

        await click(page,'#submit-button')

        await page.setInterval(3000)

        await browser.close()
        
    }, 35000)
})