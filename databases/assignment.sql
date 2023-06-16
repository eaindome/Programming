CREATE TABLE CarCollection (
    ID SERIAL PRIMARY KEY NOT NULL,
    Make VARCHAR(255) NOT NULL,
    Model VARCHAR(255) NOT NULL,
    Price NUMERIC(10,2) NOT NULL
);

INSERT INTO CarCollection (Make, Model, Price)
VALUES ('Aston Martin', 'Valhalla', 542189), 
('Honda', 'Accord', 475112), 
('Toyota', 'Vitz', 231056),
('Lamborghini', 'Aventador', 105487.55), 
('Ferrari', '458 Italia', 478000.56), 
('Aston Martin', 'DBS', 785100.00), 
('McLaren', '720S', 450000.00),
('Honda', 'Civic', 120000.55), 
('Toyota', 'Yaris', 452000.33), 
('Mercedes', 'Maybach', 454545.45);

-- Calculate the total number of cars in the collection
SELECT COUNT(*) AS TotalCars FROM CarCollection;

-- Calculate the average price of the cars in the collection
SELECT AVG(Price) AS AveragePrice FROM CarCollection;

-- Find the most expensive car among all the cars in the collection
SELECT Make, Model, Price FROM CarCollection WHERE Price = (SELECT MAX(Price) FROM CarCollection);

-- Find the most affordable car among all the cars in the collection
SELECT Make, Model, Price FROM CarCollection WHERE Price = (SELECT MIN(Price) FROM CarCollection);

-- Calculate teh total value for car collection
SELECT SUM(Price) AS TotalValue FROM CarCollection;

-- Calculate the average price of the cars grouped by the car make
SELECT Make, AVG(Price) AS AveragePrice FROM CarCollection GROUP BY Make;

-- Find the most expensive car among all the cars, grouped by the car make
SELECT Make, Model, Price FROM CarCollection WHERE (Make, Price) IN (SELECT Make, MAX(Price) FROM CarCollection GROUP BY Make);

-- Find the most affordable car among the cars, group by car make
SELECT Make, Model, Price FROM CarCollection WHERE (Make, Price) IN (SELECT Make, MIN(Price) FROM CarCollection GROUP BY Make);