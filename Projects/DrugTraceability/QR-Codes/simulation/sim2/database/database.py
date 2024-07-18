import sqlite3

# Function to create database table
def create_table():
    try:
        # print("Creating table...")
        conn = sqlite3.connect('qr_code.db')  # ('./database.py/qr_code.db')
        c = conn.cursor() # Create a cursor object using the cursor() method
        c.execute('''CREATE TABLE IF NOT EXISTS qr_codes (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)''')
        conn.commit()
        conn.close()
        # print("Table created...")
        # return True
    except Exception as e:
        print("Error creating table:", e)
        # return False

# Function to insert QR code content into the database
def insert_qr_code_content(content):
    try:
        #print("Inserting QR code content...")
        conn = sqlite3.connect('qr_code.db')
        c = conn.cursor()
        c.execute('''INSERT INTO qr_codes (content) VALUES (?)''', (content,))
        conn.commit()
        last_id = c.lastrowid
        conn.close()
        print("QR code content inserted successfully!")
        return last_id
    except Exception as e:
        print(f"Error inserting QR code content: {e}")
        return False

# Function to update QR code content in the database
def update_qr_code_content(id, content):
    try:
        #print("Updating QR code content...")
        conn = sqlite3.connect('qr_code.db')
        c = conn.cursor()
        c.execute('''UPDATE qr_codes SET content = ? WHERE id = ?''', (content, id))
        conn.commit()
        conn.close()
        print("QR code content updated successfully!")
        return True
    except Exception as e:
        print("Error updating QR code content:", e)
        return False

# Function to fetch QR code content from the database
def fetch_qr_code_content(id):
    try:
        conn = sqlite3.connect('qr_code.db')
        c = conn.cursor()
        c.execute('''SELECT content FROM qr_codes WHERE id = ?''', (id,))
        result = c.fetchone()
        conn.close()
        if result:
            return result[0]
        else:
            return None
    except Exception as e:
        print(f"Error fetching QR code content: {e}")
        return None

