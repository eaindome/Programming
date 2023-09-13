-- Insert data into the User table
INSERT INTO "User" (username, email, password, first_name, last_name, created_at, updated_at)
VALUES
    ('sarah22', 'sarah@email.com', 'hashed123', 'Sarah', 'Smith', '2023-09-01 08:30:00', '2023-09-01 08:30:00'),
    ('mark89', 'mark@email.com', 'hashed456', 'Mark', 'Johnson', '2023-09-02 14:15:00', '2023-09-02 14:15:00'),
    ('emma17', 'emma@email.com', 'hashed789', 'Emma', 'Davis', '2023-09-03 10:45:00', '2023-09-03 10:45:00');

-- Insert data into the Category table
INSERT INTO Category (category_name, category_description, created_at, updated_at)
VALUES
    ('Groceries', 'Purchases from grocery stores', '2023-09-01 08:30:00', '2023-09-01 08:30:00'),
    ('Dining Out', 'Restaurant and takeout expenses', '2023-09-02 14:15:00', '2023-09-02 14:15:00'),
    ('Utilities', 'Monthly utility bills', '2023-09-03 10:45:00', '2023-09-03 10:45:00'),
    ('Rent/Mortgage', 'Housing-related expenses', '2023-09-04 11:30:00', '2023-09-04 11:30:00'),
    ('Transportation', 'Commuting and vehicle expenses', '2023-09-05 09:20:00', '2023-09-05 09:20:00'),
    ('Entertainment', 'Leisure activities', '2023-09-06 15:45:00', '2023-09-06 15:45:00');

-- Insert data into the Expense table
INSERT INTO Expense (user_id, category_id, amount, date, created_at, updated_at)
VALUES
    (1, 1, 100.50, '2023-09-10', '2023-09-10 08:30:00', '2023-09-10 08:30:00'),
    (1, 2, 50.00, '2023-09-08', '2023-09-08 19:45:00', '2023-09-08 19:45:00'),
    (2, 5, 70.25, '2023-09-09', '2023-09-09 11:20:00', '2023-09-09 11:20:00'),
    (2, 6, 25.00, '2023-09-05', '2023-09-05 21:10:00', '2023-09-05 21:10:00'),
    (3, 2, 20.00, '2023-09-07', '2023-09-07 14:30:00', '2023-09-07 14:30:00');

-- Insert data into the Budget table
INSERT INTO Budget (user_id, category_id, target_amount, start_date, end_date, created_at, updated_at)
VALUES
    (1, 1, 150.00, '2023-09-01', '2023-09-30', '2023-09-01 10:00:00', '2023-09-01 10:00:00'),
    (1, 2, 100.00, '2023-09-01', '2023-09-30', '2023-09-01 10:05:00', '2023-09-01 10:05:00'),
    (2, 5, 200.00, '2023-09-01', '2023-09-30', '2023-09-01 14:30:00', '2023-09-01 14:30:00'),
    (2, 6, 75.00, '2023-09-01', '2023-09-30', '2023-09-01 14:35:00', '2023-09-01 14:35:00');

-- Insert data into the BillReminder table
INSERT INTO BillReminder (user_id, payee, amount, due_date, created_at, updated_at)
VALUES
    (1, 'Rent', 1200.00, '2023-09-01', '2023-08-25 16:00:00', '2023-08-25 16:00:00'),
    (1, 'Netflix Subscription', 15.00, '2023-09-15', '2023-08-26 09:30:00', '2023-08-26 09:30:00'),
    (2, 'Internet', 60.00, '2023-09-05', '2023-08-27 12:45:00', '2023-08-27 12:45:00');

-- Insert data into the LinkedAccounts table
INSERT INTO LinkedAccounts (user_id, account_name, account_type, institution, account_number, created_at, updated_at)
VALUES
    (1, 'Savings', 'Bank Account', 'ABC Bank', 'XXXX-XXXX-1234', '2023-09-01 08:30:00', '2023-09-01 08:30:00'),
    (1, 'Credit Card', 'Credit Card', 'XYZ Credit', 'XXXX-XXXX-5678', '2023-09-02 14:15:00', '2023-09-02 14:15:00'),
    (2, 'Savings', 'Bank Account', 'DEF Bank', 'XXXX-XXXX-9876', '2023-09-03 10:45:00', '2023-09-03 10:45:00');
