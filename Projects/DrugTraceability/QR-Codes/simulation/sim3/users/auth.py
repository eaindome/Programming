import sqlite3
import bcrypt

def authenticate_user(username, password):
    conn = sqlite3.connect('supply_chain.db')
    c = conn.cursor()
    
    c.execute('''SELECT password, role FROM users WHERE username = ?''', (username,))
    user = c.fetchone()
    
    conn.close()
    
    if user and bcrypt.checkpw(password.encode(), user[0]):
        return user[1]
    else:
        return None

