/**
 * 二叉树的节点构造函数
 * @param value
 * @constructor
 */
function Node(value) {
    this.left = null;
    this.right = null;
    this.value = value;
    this.parent = null;
}

/**
 * 寻找节点的后继节点
 * @param node
 * @returns {*}
 */
function getHouJiJieDian(node) {
    if (node==null){
        return;
    }
    //如果节点的右子树不为空，那么后继节点就是当前节点的右子树的最左节点
    if(node.right!=null){
        return getLeftMostNode(node.right);
    }else {
        var parent = node.parent;
        //如果当前节点没有右节点，那么就需要向上找
        while(node.parent!=null && parent.left != node){
            node = parent;
            parent = node.parent;
        }
        return parent;
    }
}

/**
 * 寻找最左节点
 * @param node
 * @returns {*}
 */
function getLeftMostNode(node) {
    if(node == null){
        return node;
    }
    while(node.left!=null){
        node = node.left;
    }
    return node;
}