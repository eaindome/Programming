CREATE TABLE CarCollection (
    ID SERIAL PRIMARY KEY NOT NULL,
    Make VARCHAR(255) NOT NULL,
    Model VARCHAR(255) NOT NULL,
    Price NUMERIC(10,2) NOT NULL
);

INSERT INTO CarCollection (Make, Model, Price)
VALUES
('Aston Martin', 'Valhalla', 542189), 
('Honda', 'Accord', 475112), 
('Toyota', 'Vitz', 231056),
('Lamborghini', 'Aventador', 105487.55), 
('Ferrari', '458 Italia', 478000.56), 
('Aston Martin', 'DBS', 785100.00), 
('McLaren', '720S', 450000.00),
('Honda', 'Civic', 120000.55), 
('Toyota', 'Yaris', 452000.33), 
('Mercedes', 'Maybach', 454545.45);