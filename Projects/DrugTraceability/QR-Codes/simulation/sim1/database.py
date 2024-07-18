import sqlite3

# Function to create database table
def create_table():
    conn = sqlite3.connect('qr_code.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS qr_codes (id INTEGER PRIMARY KEY, content TEXT)''')
    conn.commit()
    conn.close()

# Function to insert or update QR code content in the database
def insert_or_update_qr_code_content(content):
    conn = sqlite3.connect('qr_code.db')
    c = conn.cursor()
    c.execute('''INSERT OR REPLACE INTO qr_codes (id, content) VALUES (1, ?)''', (content,))
    conn.commit()
    conn.close()

# Function to fetch QR code content from the database
def fetch_qr_code_content():
    conn = sqlite3.connect('qr_code.db')
    c = conn.cursor()
    c.execute('''SELECT content FROM qr_codes WHERE id = 1''')
    result = c.fetchone()
    conn.close()
    if result:
        return result[0]
    else:
        return None
