-- Create the User Table
CREATE TABLE "User" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the Category Table
CREATE TABLE Category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    category_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the Expense Table
CREATE TABLE Expense (
    expense_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(user_id),
    category_id INT REFERENCES Category(category_id),
    amount DECIMAL(10, 2) NOT NULL,
    date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on frequently queried columns in Expense Table
CREATE INDEX idx_expense_user_id ON Expense(user_id);
CREATE INDEX idx_expense_category_id ON Expense(category_id);
CREATE INDEX idx_expense_date ON Expense(date);

-- Create the Budget Table
CREATE TABLE Budget (
    budget_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(user_id),
    category_id INT REFERENCES Category(category_id),
    target_amount DECIMAL(10, 2) NOT NULL,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on frequently queried columns in Budget Table
CREATE INDEX idx_budget_user_id ON Budget(user_id);
CREATE INDEX idx_budget_category_id ON Budget(category_id);

-- Create the Bill Reminder Table
CREATE TABLE BillReminder (
    reminder_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(user_id),
    payee VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    due_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on frequently queried columns in Bill Reminder Table
CREATE INDEX idx_billreminder_user_id ON BillReminder(user_id);

-- Create the Linked Accounts Table
CREATE TABLE LinkedAccounts (
    account_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(user_id),
    account_name VARCHAR(255) NOT NULL,
    account_type VARCHAR(255),
    institution VARCHAR(255),
    account_number VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on frequently queried columns in Linked Accounts Table
CREATE INDEX idx_linkedaccounts_user_id ON LinkedAccounts(user_id);

