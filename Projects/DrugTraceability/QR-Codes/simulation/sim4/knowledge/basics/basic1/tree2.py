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

def create_hierarchy(num_packs):
    packs = []
    for i in range(1, num_packs + 1):
        pack = Node(f"Pack-{i}: ")
        packs.append(pack)
        for j in range(1, 5):
            box = Node(f"Box{i}_{j}", parent=pack)
            pack.add_child(box)
            for k in range(1, 3):
                product = Node(f"Product{i}_{j}_{k:02d}", parent=box)
                box.add_child(product)
    return packs

# function to print all packs and their hierarchies
def print_all_packs(packs):
    for pack in packs:
        pack.print_tree()

# user input for the number of packs
num_packs = int(input("Enter the number of packs: "))
packs = create_hierarchy(num_packs)
print_all_packs(packs)