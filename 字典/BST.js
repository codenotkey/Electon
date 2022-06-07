class Node {
    constructor ( key ) {
        this.key = key
        this.left = null
        this.right = null 
    } 
}

const Compare = {
    LESS_THAN:  -1,
    BIGGER_THEN: 1
}

function defaultCompare (a, b) {
    if ( a === b) {
        return 0
    }
    return a < b  ?  Compare.LESS_THAN :  Compare.BIGGER_THEN
}

class BinarySearchTree {
    constructor ( compareFn = defaultCompare ) {
        this.compareFn = compareFn
        this.root = null
    }
    insert (key) {
        if ( this.root == null ){
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }
    insertNode( node, key ){
        if ( this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if( node.left == null ){
                node.left = new Node(key)
            } else {
                this.insertNode( node.left, key)
            }
        }
        else {
            if( node.right == null ){
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }
    inOrderTraverse( callback ) {
        this.inOrderTraverseNode (this.root, callback)
    }
    inOrderTraverseNode(node, callback) {
        if( node != null ){
            this.inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this.inOrderTraverseNode(node.right, callback)
        }
    }
    min () {
        return this.minNode( this.root )
    }
    minNode( node ){
        let current = node
        console.log(current);
        while (current != null && current.left != null) {
            current = current.left
        }
        return current
    }
    max () {
        return this.maxNode( this.root )
    }
    maxNode( node ){
        let current = node
        while (current != null && current.right != null) {
            current = current.right
        }
        return current
    }
}

const tree = new BinarySearchTree(); 
tree.insert(11)
tree.insert(7); 
tree.insert(15); 
tree.insert(5); 
tree.insert(3); 
tree.insert(9); 
tree.insert(8); 
tree.insert(10); 
tree.insert(13); 
tree.insert(12); 
tree.insert(14); 
tree.insert(20); 
tree.insert(18); 
tree.insert(25);
console.dir(tree);


const printNode = (value) => console.log(value)
// tree.inOrderTraverse(printNode)
console.log(tree.min());