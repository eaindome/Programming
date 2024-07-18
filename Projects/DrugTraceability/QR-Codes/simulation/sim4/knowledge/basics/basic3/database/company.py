from .connection import get_connection

def setup_company():
    conn = get_connection()
    c = conn.cursor()
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS company (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            address TEXT NOT NULL
        )
    ''')
    
    c.execute('''
        INSERT INTO company (name, location, address) 
        VALUES ('My Company', 'City', '1234 Street Address')
    ''')
    
    conn.commit()
    conn.close()

def get_company_info():
    conn = get_connection()
    c = conn.cursor()
    c.execute('SELECT name, location, address FROM company')
    company = c.fetchone()
    conn.close()
    return company
