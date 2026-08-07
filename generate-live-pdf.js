const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateLivePDF() {
    const livePdfDir = path.join(__dirname, 'LivePDF');
    if (!fs.existsSync(livePdfDir)) {
        fs.mkdirSync(livePdfDir, { recursive: true });
    }
    const outputPath = path.join(livePdfDir, 'GOKUL_M_Portfolio_Live.pdf');

    const systemChromePaths = [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
    ];

    const executablePath = systemChromePaths.find(p => fs.existsSync(p));
    console.log("Using system browser executable:", executablePath);

    console.log("Launching Puppeteer for landscape Live PDF generation...");
    const browser = await puppeteer.launch({
        executablePath: executablePath,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    const filePath = 'file:///' + path.join(__dirname, 'index.html').replace(/\\/g, '/');
    console.log("Navigating to page:", filePath);
    await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 60000 });

    // Force all AOS animations & cards to render fully
    await page.evaluate(() => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.classList.add('aos-animate');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        window.scrollTo(0, document.body.scrollHeight);
    });

    await new Promise(r => setTimeout(r, 2000));

    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });

    await new Promise(r => setTimeout(r, 1000));

    console.log("Generating A4 Landscape PDF with print backgrounds and clickable links...");
    await page.pdf({
        path: outputPath,
        format: 'A4',
        landscape: true,
        printBackground: true,
        displayHeaderFooter: false,
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    await browser.close();
    console.log("SUCCESS: Live PDF created successfully at:", outputPath);
}

generateLivePDF().catch(err => {
    console.error("Error generating Live PDF:", err);
});
