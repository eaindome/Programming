import axios from 'axios';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import pLimit from 'p-limit';

import { saveProducts } from '../models/productModel';

export interface Product {
    title: string;
    price: string;
    imageUrl: string;
    link: string;
}

const SCRAPE_LIMIT = 5; // Limit concurrent scraping tasks

// Function to scrape products using Puppeteer for JavaScript-heavy pages
export const scrapeAmazonWithPuppeteer = async (category: string): Promise<Product[]> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.amazon.com/s?k=${category}`, { waitUntil: 'networkidle2' });

    const products = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.s-result-item')).map((element) => {
            const title = element.querySelector('h2 a.a-link-normal')?.textContent?.trim();
            const price = element.querySelector('.a-price-whole')?.textContent?.trim();
            const imageUrl = element.querySelector('img.s-image')?.getAttribute('src');
            const link = element.querySelector('h2 a.a-link-normal')?.getAttribute('href');

            if (title && imageUrl && link) {
                return { title, price: price || 'N/A', imageUrl, link: `https://www.amazon.com${link}` };
            }
            return null;
        }).filter(Boolean);
    });

    await browser.close();
    return products as Product[];
};

// Function to scrape static pages using Axios and Cheerio
const scrapeAmazonCategory = async (category: string, page: number = 1): Promise<Product[]> => {
    try {
        const { data: html } = await axios.get(`https://www.amazon.com/s?k=${category}&page=${page}`);
        const $ = cheerio.load(html);

        const products: Product[] = [];
        $('.s-result-item').each((i, element) => {
            const title = $(element).find('h2 a.a-link-normal').text().trim();
            const price = $(element).find('.a-price-whole').text().trim();
            const imageUrl = $(element).find('img.s-image').attr('src');
            const link = `https://www.amazon.com${$(element).find('h2 a.a-link-normal').attr('href')}`;

            if (title && imageUrl && link) {
                products.push({ title, price: price || 'N/A', imageUrl, link });
            }
        });

        return products;
    } catch (err) {
        console.error(`Error scraping page ${page} for category: ${category} - ${err}`);
        return [];
    }
};





export const scrapeAmazon = async (categories: string[], maxPages: number = 5) => {
    const limit = pLimit(SCRAPE_LIMIT); // Set a limit on concurrent scraping tasks
    const allProducts: Product[] = [];

    await Promise.all(
        categories.map((category) =>
            limit(async () => {
                // Iterate through pages for each category
                for (let page = 1; page <= maxPages; page++) {
                    const products = await scrapeAmazonCategory(category, page);

                    if (products.length > 0) {
                        console.log(`Scraped ${products.length} products for category: ${category}, page: ${page}`);
                        await saveProducts(products, category); // Save products in batch to the database
                        allProducts.push(...products);
                    } else {
                        console.warn(`No products found for category: ${category}, page: ${page}`);
                        break; // Stop pagination if no products are found
                    }
                }
            })
        )
    );

    if (allProducts.length === 0) {
        throw new Error('Failed to scrape any products.');
    }

    return allProducts;
};

































// import axios from 'axios';
// import * as cheerio from 'cheerio';
// import pLimit from 'p-limit';

// interface Product {
//     title: string;
//     price: string | null;
//     imageUrl: string,
//     link: string
// }


// export const scrapeAmazon = async (categories: string[]) => {
//     const limit = pLimit(5);
//     const allProducts: Product[] = [];

//     // Create an array of promises for concurrent scraping
//     const scrapingPromises = categories.map(async (category) => {
//         try {
//             const { data: html } = await axios.get(`https://www.amazon.com/s?k=${category}`);
//             const $ = cheerio.load(html);

//             const products: Product[] = [];
//             $('.s-result-item').each((i, element) => {
//                 const title = $(element).find('h2 a.a-link-normal').text().trim();
//                 const price = $(element).find('.a-price-whole').text().trim();
//                 const imageUrl = $(element).find('img.s-image').attr('src');
//                 const link = `https://www.amazon.com${$(element).find('h2 a.a-link-normal').attr('href')}`;

//                 if (title && imageUrl && link) {
//                     products.push({ title, price: price || 'N/A', imageUrl, link });
//                 }
//             });

//             if (products.length > 0) {
//                 console.log(`Scraped ${products.length} products for category: ${category}`);
//                 allProducts.push(...products);
//             } else {
//                 console.warn(`No products found for category: ${category}`);
//             }
//         } catch (err) {
//             console.error(`Error scraping category: ${category} - ${err}`);
//         }
//     });

//     // Await all scraping promises to resolve
//     await Promise.all(scrapingPromises);

//     if (allProducts.length === 0) {
//         throw new Error('Failed to scrape any products.');
//     }

//     return allProducts;
// };



// Modify scrapeAmazon to accept multiple categories
// export const scrapeAmazon = async (categories: string[]) => {
//     const allProducts: Product[] = [];

//     for (const category of categories) {
//         await delay(1000);
        
//         try {
//             const { data: html } = await axios.get(`https://www.amazon.com/s?k=${category}`);
//             const $ = cheerio.load(html);

//             const products: Product[] = [];
//             $('.s-result-item').each((i, element) => {
//                 const title = $(element).find('h2 a.a-link-normal').text().trim();
//                 const price = $(element).find('.a-price-whole').text().trim();
//                 const imageUrl = $(element).find('img.s-image').attr('src');
//                 const link = `https://www.amazon.com${$(element).find('h2 a.a-link-normal').attr('href')}`;

//                 if (title && imageUrl && link) {
//                     products.push({ title, price: price || 'N/A', imageUrl, link });
//                 }
//             });

//             if (products.length > 0) {
//                 console.log(`Scraped ${products.length} products for category: ${category}`);
//                 allProducts.push(...products);
//             } else {
//                 console.warn(`No products found for category: ${category}`);
//             }
//         } catch (err) {
//             console.error(`Error scraping category: ${category} - ${err}`);
//         }
//     }

//     // if (allProducts.length === 0) {
//     //     throw new Error('Failed to scrape any products.');
//     // }

//     return allProducts;
// };



// export const scrapeAmazon = async (category: string) => {
//     try {
//         const { data: html } = await axios.get(`https://www.amazon.com/s?k=${category}`);
//         const $ = cheerio.load(html);
//         console.log($.html());

//         const products: { title: string; price: string; imageUrl: string; link: string; }[] = [];
//         $('.s-result-item').each((i, element) => {
//             const title = $(element).find('h2 a.a-link-normal').text().trim();
//             const price = $(element).find('.a-price-whole').text().trim();
//             const imageUrl = $(element).find('img.s-image').attr('src');
//             const link = `https://www.amazon.com${$(element).find('h2 a.a-link-normal').attr('href')}`;

//             if (title && price && imageUrl && link) {
//                 products.push({ title, price, imageUrl, link });
//             }
//         });

//         return products;
//     } catch (err) {
//         console.error(`Error scraping Amazon: ${err}`);
//         throw new Error('Failed to scrape Amazon.');
//     }
// };