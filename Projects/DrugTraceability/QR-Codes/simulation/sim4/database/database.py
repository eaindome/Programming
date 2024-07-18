import sqlite3
import bcrypt, json
from time import sleep

DB_PATH = 'supply_chain.db'

# create tables
def create_tables():
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()

        # manufacturer table	
        c.execute('''CREATE TABLE IF NOT EXISTS user_manu (
                        id INTEGER PRIMARY KEY,
                        username TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL,
                        company_name TEXT,
                        company_address TEXT,
                        company_location TEXT,
                        product_name TEXT,
                        fda_code TEXT,
                        fda_reg_number TEXT
                    )''')
        
        # distributor table
        c.execute('''CREATE TABLE IF NOT EXISTS user_dist (
                        id INTEGER PRIMARY KEY,
                        username TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL,
                        distributor_name TEXT NOT NULL,
                        distributor_location TEXT NOT NULL
                    )''')
        
        # user_retail table
        c.execute('''CREATE TABLE IF NOT EXISTS user_retail (
                        id INTEGER PRIMARY KEY,
                        username TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL,
                        retailer_name TEXT NOT NULL,
                        retailer_location TEXT NOT NULL
                    )''')
        
        # users table
        c.execute('''CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY,
                        username TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL,
                        role TEXT NOT NULL
                    )''')
        
        # qr_codes table
        c.execute('''CREATE TABLE IF NOT EXISTS qr_codes (
                        id INTEGER PRIMARY KEY,
                        data TEXT NOT NULL,
                        history TEXT
                    )''')
        conn.commit()

def add_user(username, password, role):
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        c.execute('''INSERT INTO users (username, password, role)
                     VALUES (?, ?, ?)''', (username, hashed_password, role))
        conn.commit()

# 
def execute_with_retry(query, params, retries=5):
    for attempt in range(retries):
        try:
            with sqlite3.connect(DB_PATH) as conn:
                c = conn.cursor()
                c.execute(query, params)
                conn.commit()
                return c
        except sqlite3.OperationalError as e:
            if 'locked' in str(e).lower() and attempt < retries - 1:
                sleep(0.5)
            else:
                raise


# QR CODES
# insert qr code
def insert_qr_code(data):
    c = execute_with_retry(
        '''INSERT INTO qr_codes (data, history) VALUES (?, ?)''',
        (data, json.dumps([]))
    )
    return c.lastrowid

def update_qr_code_history(qr_id, role, new_data):
    c = execute_with_retry('''SELECT history FROM qr_codes WHERE id = ?''', (qr_id,))
    history = c.fetchone()
    if history:
        history = json.loads(history[0])
    else:
        history = []
    history.append({role: new_data})
    execute_with_retry('''UPDATE qr_codes SET history = ? WHERE id = ?''', (json.dumps(history), qr_id))

# get qr code data
def get_qr_code_data(qr_id):
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute('''SELECT data, history FROM qr_codes WHERE id = ?''', (qr_id,))
        return c.fetchone()

# get qr code history
def get_qr_code_history(qr_id):
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute('''SELECT history FROM qr_codes WHERE id = ?''', (qr_id,))
        result = c.fetchone()
        if result:
            return result[0]
        return "No history found."





# GETTING USER INFO
# get manufacturer info
def get_manu_info(username):
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute('''
            SELECT company_name, company_address, company_location, product_name, fda_code, fda_reg_number
            FROM user_manu WHERE username = ?
        ''', (username,))
        result = c.fetchone()
        if result:
            return {
                'company_name': result[0],
                'company_address': result[1],
                'company_location': result[2],
                'product_name': result[3],
                'fda_code': result[4],
                'fda_reg_number': result[5]	
            }
        return None
    
# get distributor info
def get_dist_info(username):
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute('''
            SELECT distributor_name, distributor_location
            FROM user_dist WHERE username = ?
        ''', (username,))
        result = c.fetchone()
        if result:
            return {
                'distributor_name': result[0],
                'distributor_location': result[1]
            }
        return None

# get retailer info
def get_retail_info(username):
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute('''
            SELECT retailer_name, retailer_location
            FROM user_retail WHERE username = ?
        ''', (username,))
        result = c.fetchone()
        if result:
            return {
                'retailer_name': result[0],
                'retailer_location': result[1]
            }
        return None





# REGISTRATION
def register_manufacturer(username, password, company_name, company_address, company_location, product_name, fda_code, fda_reg_number):
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
            c.execute('''
                INSERT INTO user_manu (username, password, company_name, company_address, company_location, product_name, fda_code, fda_reg_number)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (username, hashed_password, company_name, company_address, company_location, product_name, fda_code, fda_reg_number))
            conn.commit()
            c.execute('''
                INSERT INTO users (username, password, role)
                VALUES (?, ?, ?)
            ''', (username, hashed_password, 'manufacturer'))
            conn.commit()
    except sqlite3.IntegrityError as e:
        # print(f"Integrity Error: {e}")
        return None

def register_distributor(username, password, distributor_name, distributor_location):
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
            c.execute('''
                INSERT INTO user_dist (username, password, distributor_name, distributor_location)
                VALUES (?, ?, ?, ?)
            ''', (username, hashed_password, distributor_name, distributor_location))
            conn.commit()
            c.execute('''
                INSERT INTO users (username, password, role)
                VALUES (?, ?, ?)
            ''', (username, hashed_password, 'distributor'))
            conn.commit()
    except sqlite3.IntegrityError as e:
        # print(f"Integrity Error: {e}")
        return None

def register_retailer(username, password, retailer_name, retailer_location):
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
            c.execute('''
                INSERT INTO user_retail (username, password, retailer_name, retailer_location)
                VALUES (?, ?, ?, ?)
            ''', (username, hashed_password, retailer_name, retailer_location))
            conn.commit()
            c.execute('''
                INSERT INTO users (username, password, role)
                VALUES (?, ?, ?)
            ''', (username, hashed_password, 'retailer'))
            conn.commit()
    except sqlite3.IntegrityError as e:
    # print(f"Integrity Error: {e}")
        return None

def register_user(username, password):
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
            c.execute('''
                INSERT INTO users (username, password, role)
                VALUES (?, ?, ?)
            ''', (username, hashed_password, 'user'))
            conn.commit()
    except sqlite3.IntegrityError as e:
        # print(f"Integrity Error: {e}")
        return None
