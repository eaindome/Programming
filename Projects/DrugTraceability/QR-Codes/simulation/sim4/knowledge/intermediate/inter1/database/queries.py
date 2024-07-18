from .connection import get_connection

def get_pack_by_id(pack_id):
    conn = get_connection()
    c = conn.cursor()
    c.execute('SELECT name FROM packs WHERE id = ?', (pack_id,))
    pack = c.fetchone()
    conn.close()
    return pack

def get_box_by_id(box_id):
    conn = get_connection()
    c = conn.cursor()
    c.execute('SELECT name, pack_id FROM boxes WHERE id = ?', (box_id,))
    box = c.fetchone()
    conn.close()
    return box

def get_product_by_id(product_id):
    conn = get_connection()
    c = conn.cursor()
    c.execute('SELECT name, box_id FROM products WHERE id = ?', (product_id,))
    product = c.fetchone()
    conn.close()
    return product
