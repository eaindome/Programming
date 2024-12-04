import pool from '../config/db';

interface Product {
    title: string;
    price: string | null;
    imageUrl: string,
    link: string
}

export const saveProducts = async (products: Product[], category: string) => {
    if (products.length === 0) return;

        const values = products.map(product => [product.title, product.price, product.imageUrl, product.link, category]);
        const query = `
            INSERT INTO products (title, price, imageUrl, link, category)
            VALUES ${values}
            ON CONFLICT (link) DO NOTHING;
        `;

    await pool.query(query, [values]); // Batch insert
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    const query = `
    SELECT title, price, image_url AS "imageUrl", link, category
    FROM products
    WHERE category = $1;
  `;

  const { rows } = await pool.query(query, [category]);
  return rows;
}



// export const saveProducts = async (products: Product[], category: string): Promise<void> => {
//     const query = `
//     INSERT INTO products (title, price, image_url, link, category)
//     VALUES ($1, $2, $3, $4, $5);
//   `;

//   const client = await pool.connect();

//   try {
//     for (const product of products) {
//         await client.query(query, [
//             product.title,
//             product.price,
//             product.imageUrl,
//             product.link,
//             category
//         ]);
//     }
//   } finally {
//     client.release();
//   }
// };