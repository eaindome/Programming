class Node:
    def __init__(self, name, parent=None):
        self.name = name
        self.parent = parent
        self.children = []

    def add_child(self, child):
        self.children.append(child)

    def __str__(self):
        return self.name
    
    def print_tree(self, level=0):
        indent = ' ' * (level * 2)
        print(indent + str(self))
        for child in self.children:
            child.print_tree(level + 1)

# test cases
# create nodes for packages and products
pack1 = Node("Pack1")

# creating boxes
box_a = Node("BoxA", parent=pack1)
box_b = Node("BoxB", parent=pack1)
box_c = Node("BoxC", parent=pack1)
box_d = Node("BoxD", parent=pack1)

# creating products
# product in BoxA
productA1 = Node("Product_A01", parent=box_a)
productA2 = Node("Product_A02", parent=box_a)

# product in BoxB
productB1 = Node("Product_B01", parent=box_b)
productB2 = Node("Product_B01", parent=box_b)

# product in BoxC
productC1 = Node("Product_C01", parent=box_c)
productC2 = Node("Product_C01", parent=box_c)

# product in BoxD
productD1 = Node("Product_D01", parent=box_d)
productD2 = Node("Product_D01", parent=box_d)

# add children to parent nodes
# boxes to pack
pack1.add_child(box_a)
pack1.add_child(box_b)
pack1.add_child(box_c)
pack1.add_child(box_d)

# products to boxes
# product a to box a
box_a.add_child(productA1)
box_a.add_child(productA2)

# product b to box b
box_b.add_child(productB1)
box_b.add_child(productB2)

# product c to box c
box_c.add_child(productC1)
box_c.add_child(productC2)

# product d to box d
box_d.add_child(productD1)
box_d.add_child(productD2)

# print tree
pack1.print_tree()


