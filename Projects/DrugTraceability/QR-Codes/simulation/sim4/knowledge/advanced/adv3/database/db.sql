-- Users table to store basic user information
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
);

-- Companies table for manufacturer information
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name TEXT,
    location TEXT,
    address TEXT,
    product_name TEXT,
    product_serial_code TEXT,
    username TEXT,
    FOREIGN KEY (username) REFERENCES users (username)
);

-- Primary distributors table for storing initial registration information
CREATE TABLE IF NOT EXISTS primary_distributors (
    id SERIAL PRIMARY KEY,
    company TEXT,
    location TEXT,
    address TEXT,
    username TEXT,
    FOREIGN KEY (username) REFERENCES users (username)
);

-- Secondary distributors table for storing initial registration information
CREATE TABLE IF NOT EXISTS secondary_distributors (
    id SERIAL PRIMARY KEY,
    company TEXT,
    location TEXT,
    address TEXT,
    username TEXT,
    FOREIGN KEY (username) REFERENCES users (username)
);

-- Retailers table for storing initial registration information
CREATE TABLE IF NOT EXISTS retailers (
    id SERIAL PRIMARY KEY,
    company TEXT,
    location TEXT,
    address TEXT,
    username TEXT,
    FOREIGN KEY (username) REFERENCES users (username)
);

-- Packs table to store information about packs and their shipping date
CREATE TABLE IF NOT EXISTS packs (
    id SERIAL PRIMARY KEY,
    name TEXT,
    company_id INTEGER,
    distributor_id INTEGER,
    shipping_date TEXT,
    shipping_truck_number TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies (id),
    FOREIGN KEY (distributor_id) REFERENCES primary_distributors (id)
);

-- Boxes table to store information about boxes and their receiving date
CREATE TABLE IF NOT EXISTS boxes (
    id SERIAL PRIMARY KEY,
    name TEXT,
    pack_id INTEGER,
    company_id INTEGER,
    secondary_distributor_id INTEGER,
    retailer_id INTEGER,
    receiving_date_1 TEXT,
    receiving_date_2 TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies (id),
    FOREIGN KEY (pack_id) REFERENCES packs (id),
    FOREIGN KEY (secondary_distributor_id) REFERENCES secondary_distributors (id),
    FOREIGN KEY (retailer_id) REFERENCES retailers (id)
);

-- Products table to store information about individual products
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    product_name TEXT,
    identity_number TEXT,
    pack_id INTEGER,
    box_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    company_id INTEGER,
    FOREIGN KEY (product_name) REFERENCES companies (product_name),
    FOREIGN KEY (pack_id) REFERENCES packs (id),
    FOREIGN KEY (box_id) REFERENCES boxes (id),
    FOREIGN KEY (company_id) REFERENCES companies (id)
);

-- QR Codes table to store QR code data and scan history
CREATE TABLE IF NOT EXISTS qr_codes (
    id SERIAL PRIMARY KEY,
    pack_id INTEGER,
    box_id INTEGER,
    product_id INTEGER,
    data TEXT,
    scan_history TEXT,
    FOREIGN KEY (pack_id) REFERENCES packs (id),
    FOREIGN KEY (box_id) REFERENCES boxes (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);
