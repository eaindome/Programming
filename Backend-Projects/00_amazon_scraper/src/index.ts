import http from 'http';
import { scrapeAmazon } from './services/scraperService';
import { saveProducts, getProductsByCategory } from './models/productModel';
import pool from './config/db';
import url from 'url';

const server = http.createServer(async (req, res) => {
    // Parse the URL using the modern URL API
    const { searchParams } = new URL(req.url || '', `http://${req.headers.host}`);
  
    if (req.url?.startsWith('/scrape') && req.method === 'GET') {
      // Get the categories from the query parameters, allowing for multiple categories
      const categoriesParam = searchParams.get('category');
      const categories = categoriesParam ? categoriesParam.split(',') : [];
  
      if (categories.length === 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'At least one category is required' }));
        return;
      }
  
      try {
        // Scrape and save products for each category
        const products = await scrapeAmazon(categories);
      await saveProducts(products, categories.join(',')); 
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Data scraped for categories: ${categories.join(', ')}` }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Failed to scrape data: ${errorMessage}` }));
      }
    } else if (req.url?.startsWith('/products') && req.method === 'GET') {
      // Get the category from the query parameters
      const category = searchParams.get('category');
  
      if (!category) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Category is required' }));
        return;
      }
  
      try {
        const products = await getProductsByCategory(category);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // Return an empty array if no products are found
        res.end(JSON.stringify(products.length ? products : []));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Failed to fetch products: ${errorMessage}` }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Route not found' }));
    }
  });
  
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
  process.on('SIGINT', () => {
    pool.end(() => {
      console.log('Database connection closed');
    });
    process.exit();
  });

// const server = http.createServer(async (req, res) => {
//   const queryObject = url.parse(req.url || '', true).query;

//   if (req.url?.startsWith('/scrape') && req.method === 'GET') {
//     const category = queryObject.category as string;
//     if (!category) {
//       res.writeHead(400, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ error: 'Category is required' }));
//       return;
//     }

//     try {
//       const products = await scrapeAmazon(category);
//       await saveProducts(products, category);
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ message: `Data scraped for category: ${category}` }));
//     } catch (error) {
//       res.writeHead(500, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ error: 'Failed to scrape data' }));
//     }
//   } else if (req.url?.startsWith('/products') && req.method === 'GET') {
//     const category = queryObject.category as string;
//     if (!category) {
//       res.writeHead(400, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ error: 'Category is required' }));
//       return;
//     }

//     try {
//       const products = await getProductsByCategory(category);
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify(products));
//     } catch (error) {
//       res.writeHead(500, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ error: 'Failed to fetch products' }));
//     }
//   } else {
//     res.writeHead(404);
//     res.end('Route not found');
//   }
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// process.on('SIGINT', () => {
//   pool.end(() => {
//     console.log('Database connection closed');
//   });
//   process.exit();
// });
