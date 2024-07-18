from database.connection import get_connection
from hierarchy.models import Node

def create_hierarchy_in_db(num_packs):
    conn = get_connection()
    c = conn.cursor()
    
    packs = []
    for i in range(1, num_packs + 1):
        pack_name = f"Pack{i}"
        c.execute("INSERT INTO packs (name) VALUES (?)", (pack_name,))
        pack_id = c.lastrowid
        
        pack = Node(pack_name, id=pack_id, node_type='pack')
        packs.append(pack)
        
        for j in range(1, 5):
            box_name = f"Box{i}_{j}"
            c.execute("INSERT INTO boxes (name, pack_id) VALUES (?, ?)", (box_name, pack_id))
            box_id = c.lastrowid
            
            box = Node(box_name, parent=pack, id=box_id, node_type='box')
            pack.add_child(box)
            
            for k in range(1, 3):
                product_name = f"Product_{i}{j}{k:02d}"
                c.execute("INSERT INTO products (name, box_id) VALUES (?, ?)", (product_name, box_id))
                product_id = c.lastrowid
                
                product = Node(product_name, parent=box, id=product_id, node_type='product')
                box.add_child(product)
    
    conn.commit()
    conn.close()
    return packs
