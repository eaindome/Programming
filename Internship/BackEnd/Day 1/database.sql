--- can drop table before creating table
/* 
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pharmacy_admin;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS cart_item;
DROP TABLE IF EXISTS checkouts;
DROP TABLE IF EXISTS orders;
*/
--- use IF NOT EX

CREATE TABLE users (
    id UUID DEFAULT  gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    contact TEXT UNIQUE NOT NULL,
    address TEXT,
    email TEXT UNIQUE,
    password TEXT NOT NULL,
    date_of_birth DATE
);

CREATE TABLE IF NOT EXISTS pharmacy_admin (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    quantity  INTEGER NOT NULL  CHECK( quantity >= 0 ),
    price NUMERIC NOT NULL CHECK ( price >= 0 )
);

CREATE TABLE IF NOT EXISTS cart_item (
    user_id UUID REFERENCES users,
    inventory_id UUID REFERENCES inventory,
    quantity INTEGER CHECK ( quantity > 0 ),
    PRIMARY KEY(user_id, inventory_id)
);

CREATE TABLE IF NOT EXISTS checkouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_item_id UUID REFERENCES cart_item
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    checkout_id UUID REFERENCES checkouts,
    total_price NUMERIC CHECK (total_price > 0),
    status TEXT NOT NULL
);