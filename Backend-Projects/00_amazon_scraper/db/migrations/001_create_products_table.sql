CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price VARCHAR(50),
    image_url TEXT NOT NULL,
    link TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);