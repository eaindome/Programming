from database.connection import get_connection
from hierarchy.models import Node

def fetch_hierarchy_from_db():
    conn = get_connection()
    c = conn.cursor()
    
    c.execute("SELECT id, name FROM packs")
    packs = [Node(name=row[1], id=row[0], node_type='pack') for row in c.fetchall()]
    
    for pack in packs:
        c.execute("SELECT id, name FROM boxes WHERE pack_id = ?", (pack.id,))
        boxes = [Node(name=row[1], parent=pack, id=row[0], node_type='box') for row in c.fetchall()]
        
        for box in boxes:
            pack.add_child(box)
            c.execute("SELECT id, name FROM products WHERE box_id = ?", (box.id,))
            products = [Node(name=row[1], parent=box, id=row[0], node_type='product') for row in c.fetchall()]
            for product in products:
                box.add_child(product)
    
    conn.close()
    return packs
