-- Users table to store basic user information
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    account TEXT,
    private_key TEXT UNIQUE,
    role TEXT NOT NULL
);

-- 2. Create a new table for shipping trucks
CREATE TABLE IF NOT EXISTS shipping_trucks (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255),
    shipping_truck_number VARCHAR(255) UNIQUE NOT NULL,
    CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES users (username)
);

-- Companies table for manufacturer information
CREATE TABLE IF NOT EXISTS companies (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_serial_code VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES users (username)
);

-- Alter Companies table to add a unique constraint on product_name
ALTER TABLE companies ADD CONSTRAINT unique_product_name UNIQUE (product_name);

ALTER TABLE companies
ADD CONSTRAINT unique_company_name UNIQUE (name);

-- 1. Create a new table for FDA information
CREATE TABLE IF NOT EXISTS fda (
    id BIGSERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    fda_code VARCHAR(255) UNIQUE NOT NULL,
    CONSTRAINT fk_company_name FOREIGN KEY (company_name) REFERENCES companies (name)
);

-- Primary distributors table for storing initial registration information
CREATE TABLE IF NOT EXISTS primary_distributors (
    id BIGSERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    username VARCHAR(255) NOT NULL,
    CONSTRAINT fk_primary_distributor_username FOREIGN KEY (username) REFERENCES users (username)
);

-- Secondary distributors table for storing initial registration information
CREATE TABLE IF NOT EXISTS secondary_distributors (
    id BIGSERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    username VARCHAR(255) NOT NULL,
    CONSTRAINT fk_secondary_distributor_username FOREIGN KEY (username) REFERENCES users (username)
);

-- Retailers table for storing initial registration information
CREATE TABLE IF NOT EXISTS retailers (
    id BIGSERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    username VARCHAR(255) NOT NULL,
    CONSTRAINT fk_retailer_username FOREIGN KEY (username) REFERENCES users (username)
);

-- Packs table to store information about packs and their shipping date
CREATE TABLE IF NOT EXISTS packs (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company_id BIGINT,
    distributor_id BIGINT,
    shipping_date DATE,
    shipping_truck_number VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES companies (id),
    CONSTRAINT fk_distributor_id FOREIGN KEY (distributor_id) REFERENCES primary_distributors (id),
    CONSTRAINT fk_shipping_users_truck_number FOREIGN KEY (shipping_truck_number) REFERENCES shipping_trucks (shipping_truck_number)
);

-- Boxes table to store information about boxes and their receiving date
CREATE TABLE IF NOT EXISTS boxes (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    pack_id BIGINT,
    company_id BIGINT,
    secondary_distributor_id BIGINT,
    retailer_id BIGINT,
    receiving_date_1 DATE,
    receiving_date_2 DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_boxes_company_id FOREIGN KEY (company_id) REFERENCES companies (id),
    CONSTRAINT fk_pack_id FOREIGN KEY (pack_id) REFERENCES packs (id),
    CONSTRAINT fk_secondary_distributor_id FOREIGN KEY (secondary_distributor_id) REFERENCES secondary_distributors (id),
    CONSTRAINT fk_retailer_id FOREIGN KEY (retailer_id) REFERENCES retailers (id)
);

-- Products table to store information about individual products
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    identity_number VARCHAR(255) UNIQUE NOT NULL,
    pack_id BIGINT,
    box_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    company_id BIGINT,
    CONSTRAINT fk_product_name FOREIGN KEY (product_name) REFERENCES companies (product_name),
    CONSTRAINT fk_product_pack_id FOREIGN KEY (pack_id) REFERENCES packs (id),
    CONSTRAINT fk_product_box_id FOREIGN KEY (box_id) REFERENCES boxes (id),
    CONSTRAINT fk_product_company_id FOREIGN KEY (company_id) REFERENCES companies (id)
);

-- -- 1. Update users table to include an 'account' column
-- ALTER TABLE users
-- ADD COLUMN account VARCHAR(255);



-- 3. Create a new table for linking shipping users to shipping trucks
CREATE TABLE IF NOT EXISTS shipping_users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    shipping_truck_number VARCHAR(255) NOT NULL,
    CONSTRAINT fk_shipping_users_username FOREIGN KEY (username) REFERENCES users (username),
    CONSTRAINT fk_shipping_users_truck_number FOREIGN KEY (shipping_truck_number) REFERENCES shipping_trucks (shipping_truck_number)
);

-- 4. Update companies table to include an 'FDA' column
ALTER TABLE companies
ADD COLUMN FDA BOOLEAN;

-- 5. Update packs table to include an 'approval_status' and 'delivery_status' column
ALTER TABLE packs
ADD COLUMN approval_status BOOLEAN DEFAULT false,
ADD COLUMN delivery_status BOOLEAN DEFAULT false;

-- 6. Update boxes table to include an 'approval_status' and 'delivery_status' column
ALTER TABLE boxes
ADD COLUMN approval_status BOOLEAN DEFAULT false,
ADD COLUMN delivery_status BOOLEAN DEFAULT false;

-- 7. Update products table to include an 'approval_status' and 'delivery_status' column
ALTER TABLE products
ADD COLUMN approval_status BOOLEAN DEFAULT false,
ADD COLUMN delivery_status BOOLEAN DEFAULT false;

-- 8. Create a new table for delivery transactions
CREATE TABLE IF NOT EXISTS delivery (
    id BIGSERIAL PRIMARY KEY,
    item TEXT NOT NULL,
    from_username VARCHAR(255) NOT NULL,
    to_username VARCHAR(255) NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction TEXT,
    CONSTRAINT fk_delivery_from_username FOREIGN KEY (from_username) REFERENCES users (username),
    CONSTRAINT fk_delivery_to_username FOREIGN KEY (to_username) REFERENCES users (username)
);

-- Step 1: Add the username column to the shipping_trucks table
-- ALTER TABLE shipping_trucks
-- ADD COLUMN username VARCHAR(255);

-- Step 2: Add the foreign key constraint
-- ALTER TABLE shipping_trucks
-- ADD CONSTRAINT fk_username
-- FOREIGN KEY (username) REFERENCES users(username);



-- Indexes for performance improvement
CREATE INDEX idx_users_username ON users (username);
CREATE INDEX idx_companies_username ON companies (username);
CREATE INDEX idx_primary_distributors_username ON primary_distributors (username);
CREATE INDEX idx_secondary_distributors_username ON secondary_distributors (username);
CREATE INDEX idx_retailers_username ON retailers (username);
CREATE INDEX idx_packs_company_id ON packs (company_id);
CREATE INDEX idx_packs_distributor_id ON packs (distributor_id);
CREATE INDEX idx_boxes_pack_id ON boxes (pack_id);
CREATE INDEX idx_boxes_company_id ON boxes (company_id);
CREATE INDEX idx_boxes_secondary_distributor_id ON boxes (secondary_distributor_id);
CREATE INDEX idx_boxes_retailer_id ON boxes (retailer_id);
CREATE INDEX idx_products_pack_id ON products (pack_id);
CREATE INDEX idx_products_box_id ON products (box_id);
CREATE INDEX idx_products_company_id ON products (company_id);

-- -- Indexes for performance improvement (if necessary)
CREATE INDEX idx_shipping_users_username ON shipping_users (username);
CREATE INDEX idx_shipping_users_truck_number ON shipping_users (shipping_truck_number);
CREATE INDEX idx_delivery_from_username ON delivery (from_username);
CREATE INDEX idx_delivery_to_username ON delivery (to_username);








-- QR code tables

-- QR Codes for Packs
CREATE TABLE IF NOT EXISTS qr_code_packs (
    id BIGSERIAL PRIMARY KEY,
    pack_id BIGINT NOT NULL,
    transaction_data TEXT,
    CONSTRAINT fk_qr_code_pack_id FOREIGN KEY (pack_id) REFERENCES packs (id)
);

-- QR Codes for Boxes
CREATE TABLE IF NOT EXISTS qr_code_boxes (
    id BIGSERIAL PRIMARY KEY,
    box_id BIGINT NOT NULL,
    transaction_data TEXT,
    CONSTRAINT fk_qr_code_box_id FOREIGN KEY (box_id) REFERENCES boxes (id)
);

-- QR Codes for Products
CREATE TABLE IF NOT EXISTS qr_code_products (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    transaction_data TEXT,
    CONSTRAINT fk_qr_code_product_id FOREIGN KEY (product_id) REFERENCES products (id)
);

-- Indexes for QR code tables
CREATE INDEX idx_qr_code_packs_pack_id ON qr_code_packs (pack_id);
CREATE INDEX idx_qr_code_boxes_box_id ON qr_code_boxes (box_id);
CREATE INDEX idx_qr_code_products_product_id ON qr_code_products (product_id);

-- ALTER TABLE users
-- ADD COLUMN private_key TEXT UNIQUE;

-- ALTER TABLE users
-- ADD COLUMN email TEXT;




-- Password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

CREATE TABLE pending_transactions (
    id SERIAL PRIMARY KEY,
    from_user VARCHAR(255) NOT NULL,
    to_user VARCHAR(255) NOT NULL,
    data TEXT NOT NULL,
    goods_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending'
);




























-- -- QR Codes table to store QR code data and scan history
-- CREATE TABLE IF NOT EXISTS qr_codes (
--     id BIGSERIAL PRIMARY KEY,
--     pack_id BIGINT,
--     box_id BIGINT,
--     product_id BIGINT,
--     data TEXT,
--     scan_history TEXT,
--     CONSTRAINT fk_qr_pack_id FOREIGN KEY (pack_id) REFERENCES packs (id),
--     CONSTRAINT fk_qr_box_id FOREIGN KEY (box_id) REFERENCES boxes (id),
--     CONSTRAINT fk_qr_product_id FOREIGN KEY (product_id) REFERENCES products (id)
-- );

-- CREATE INDEX idx_qr_codes_pack_id ON qr_codes (pack_id);
-- CREATE INDEX idx_qr_codes_box_id ON qr_codes (box_id);
-- CREATE INDEX idx_qr_codes_product_id ON qr_codes (product_id);



