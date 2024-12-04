import { scrapeAmazon, scrapeAmazonWithPuppeteer } from "../services/scraperService";
import axios from "axios";
import puppeteer from "puppeteer";

jest.mock('axios');
jest.mock('puppeteer');

describe('scrapeAmazon', () => {
    let consoleErrorSpy: jest.SpyInstance;
    let consoleWarnSpy: jest.SpyInstance;

    beforeAll(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
        consoleWarnSpy.mockRestore();
    });

    it('should scrape product data from multiple categories using Axios', async () => {
        const electronicsHtml = `
            <div class="s-main-slot">
                <div class="s-result-item">
                    <h2><a class="a-link-normal a-text-normal" href="/product/1">Test Product Electronics</a></h2>
                    <span class="a-price-whole">199</span>
                    <img class="s-image" src="https://test.com/image1.jpg" />
                </div>
            </div>
        `;
        const furnitureHtml = `
            <div class="s-main-slot">
                <div class="s-result-item">
                    <h2><a class="a-link-normal a-text-normal" href="/product/2">Test Product Furniture</a></h2>
                    <span class="a-price-whole">299</span>
                    <img class="s-image" src="https://test.com/image2.jpg" />
                </div>
            </div>
        `;

        (axios.get as jest.Mock)
            .mockResolvedValueOnce({ data: electronicsHtml })
            .mockResolvedValueOnce({ data: furnitureHtml });

        const products = await scrapeAmazon(['electronics', 'furniture']);

        expect(products.length).toBe(2);
        expect(products[0].title).toBe('Test Product Electronics');
        expect(products[1].title).toBe('Test Product Furniture');
    });

    it('should handle errors and continue scraping other categories', async () => {
        (axios.get as jest.Mock)
            .mockRejectedValueOnce(new Error('Failed to fetch'))
            .mockResolvedValueOnce({ data: '<div class="s-main-slot"></div>' });

        const products = await scrapeAmazon(['non-existing-category', 'furniture']);
        expect(products.length).toBe(0); // No products found
    });

    it('should scrape products using Puppeteer for complex pages', async () => {
        const mockBrowser = {
            newPage: jest.fn().mockResolvedValue({
                goto: jest.fn(),
                evaluate: jest.fn().mockResolvedValue([
                    { title: 'Test Product Puppeteer', price: '399', imageUrl: 'https://test.com/image3.jpg', link: '/product/3' }
                ]),
                close: jest.fn(),
            }),
            close: jest.fn(),
        };

        (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);

        const products = await scrapeAmazonWithPuppeteer('electronics');
        
        expect(products.length).toBe(1);
        expect(products[0].title).toBe('Test Product Puppeteer');
        expect(products[0].link).toBe('https://www.amazon.com/product/3');
    });
});



































// import { scrapeAmazon } from "../services/scraperService";
// import axios from "axios";
// import cheerio from 'cheerio';

// jest.mock('axios');

// describe('scrapeAmazon', () => {
//     let consoleErrorSpy: jest.SpyInstance;
//     let consoleWarnSpy: jest.SpyInstance;

//     beforeAll(() => {
//         consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
//         consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
//     });

//     afterAll(() => {
//         consoleErrorSpy.mockRestore();
//         consoleWarnSpy.mockRestore();
//     });

//     it('should scrape product data from multiple categories', async () => {
//         const electronicsHtml = `
//             <div class="s-main-slot">
//                 <div class="s-result-item">
//                     <h2><a class="a-link-normal a-text-normal" href="/product/1">Test Product Electronics</a></h2>
//                     <span class="a-price-whole">199</span>
//                     <img class="s-image" src="https://test.com/image1.jpg" />
//                 </div>
//             </div>
//         `;
//         const furnitureHtml = `
//             <div class="s-main-slot">
//                 <div class="s-result-item">
//                     <h2><a class="a-link-normal a-text-normal" href="/product/2">Test Product Furniture</a></h2>
//                     <span class="a-price-whole">299</span>
//                     <img class="s-image" src="https://test.com/image2.jpg" />
//                 </div>
//             </div>
//         `;

//         (axios.get as jest.Mock)
//             .mockResolvedValueOnce({ data: electronicsHtml })
//             .mockResolvedValueOnce({ data: furnitureHtml });

//         const products = await scrapeAmazon(['electronics', 'furniture']);

//         expect(products.length).toBe(2);
//         expect(products[0].title).toBe('Test Product Electronics');
//         expect(products[1].title).toBe('Test Product Furniture');
//     });

//     it('should handle errors and continue scraping other categories', async () => {
//         (axios.get as jest.Mock)
//             .mockRejectedValueOnce(new Error('Failed to fetch'))
//             .mockResolvedValueOnce({ data: '<div class="s-main-slot"></div>' });

//         const products = await scrapeAmazon(['non-existing-category', 'furniture']);
//         expect(products.length).toBe(0); // No products found
//     });
// });

// describe('scrapeAmazon', () => {
//     it('should scrape product data from Amazon', async () => {
//         const html = `
//           <div class="s-main-slot">
//             <div class="s-result-item">
//               <h2><a class="a-link-normal a-text-normal" href="/product/1">Test Product</a></h2>
//               <span class="a-price-whole">99</span>
//               <img class="s-image" src="https://test.com/image.jpg" />
//             </div>
//           </div>
//         `;

//         (axios.get as jest.Mock).mockResolvedValue({
//             data: html
//         });

//         const products = await scrapeAmazon('electronics');
//         expect(Array.isArray(products)).toBe(true);
//         expect(products.length).toBeGreaterThan(0);

//         const product = products[0];
//         expect(product).toHaveProperty('title');
//         expect(product).toHaveProperty('price');
//         expect(product).toHaveProperty('imageUrl');
//         expect(product).toHaveProperty('link');
//     });

//     it('should return an empty array if no products are found', async () => {
//         const html = `<div class="s-main-slot"></div>`;
//         (axios.get as jest.Mock).mockResolvedValue({ data: html });

//         const products = await scrapeAmazon('non-existing-category');
//         expect(products).toEqual([]);
//     });
// });