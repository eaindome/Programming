class Node:
    def __init__(self, name, parent=None, node_type='pack', id=None):
        self.id = id
        self.name = name
        self.parent = parent
        self.children = []
        self.node_type = node_type

    def add_child(self, child):
        self.children.append(child)

    def __str__(self):
        return self.name

    def print_tree(self, level=0):
        indent = ' ' * (level * 2)
        print(indent + str(self))
        for child in self.children:
            child.print_tree(level + 1)
