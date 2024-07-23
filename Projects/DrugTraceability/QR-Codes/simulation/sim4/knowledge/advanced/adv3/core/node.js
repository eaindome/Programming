class Node {
    constructor(name, id, node_type, parent = null) {
        this.name = name;
        this.id = id;
        this.node_type = node_type;
        this.parent = parent;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }

    toString() {
        return this.name;
    }

    printTree(level = 0) {
        const indent = ' '.repeat(level * 2);
        console.log(indent + this.toString());
        for (const child of this.children) {
            child.printTree(level + 1);
        }
    }
}

module.exports = Node;
