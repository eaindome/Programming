
delay  = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
async function retry<T>(fn: () => Promise<T>, retries: number, delayMS: number, fallback: T): Promise<T> {
    let attempt = 0;
    while (attempt < retries) {
        try {
            return await fn();
        } catch (err) {
            attempt++;
            if (attempt >= retries) {
                throw err;
            }
            console.error(`Retrying due to error: ${err}`);
            await delay(delayMS);
        }
    }
}




/**
 * @param categoryURL
 * @param category
 * @returns
 */
async function scrapeCategory(categoryURL: string, category: string): Promise<Product[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const userAgents = [];
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)]
    await page.setUserAget(randomUserAgent);
};