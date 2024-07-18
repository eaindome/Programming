from .connection import get_connection

def setup_database():
    conn = get_connection()
    c = conn.cursor()
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS packs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    ''')
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS boxes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            pack_id INTEGER,
            FOREIGN KEY (pack_id) REFERENCES packs (id)
        )
    ''')
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            box_id INTEGER,
            FOREIGN KEY (box_id) REFERENCES boxes (id)
        )
    ''')
    
    conn.commit()
    conn.close()
