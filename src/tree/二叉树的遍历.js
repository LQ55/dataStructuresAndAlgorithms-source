/**
 * 节点构造函数
 * @param value 节点的值
 * @constructor
 */
function Node(value){
    this.value = value;
    this.left = null;
    this.right = null;
}

/******************************************递归实现二叉树的遍历*********************************************/

/**
 * 二叉树先序遍历函数 采用递归进行实现
 * @param head
 */
function preOrderWithRecur(head) {
    if(head == null){
        return;
    }
    console.log(head.value);
    preOrderWithRecur(head.left);
    preOrderWithRecur(head.right);
}
/**
 * 二叉树的中序遍历 采用递归进行实现
 * @param head
 */
function inOrderWithRecur(head) {
    if(head == null){
        return ;
    }
    inOrderWithRecur(head.left);
    console.log(head.value);
    inOrderWithRecur(head.right);
}
/**
 * 二叉树的后续遍历 采用递归进行实现
 * @param head
 */
function postOrderWithRecur(head){
    if(head == null){
        return ;
    }
    inOrderWithRecur(head.left);
    inOrderWithRecur(head.right);
    console.log(head.value);
}

/************************************非递归实现二叉树的遍历**************************************/
/**
 * 非递归实现二叉树的前序遍历
 * @param head
 */
function preOrderWithNotRecur(head) {
    if(head==null){
        return;
    }
    var stack = [];
    stack.push(head);
    while(stack.length!=0){
        var curNode = stack.pop();
        console.log(curNode.value);
        // 压栈顺序非常重要，保证访问顺序为中左右
        // 先放右孩子
        if(curNode.right!=null){
            stack.push(curNode.right);
        }
        // 再放右孩子
        if(curNode.left!=null){
            stack.push(curNode.left);
        }
    }
}

/**
 * 非递归实现二叉树的中序遍历
 * @param head
 */
function inOrderWithNotRecur(head) {
    if(head==null){
        return;
    }
    var stack = [];
    while(stack.length !=0 || head != null){
        if(head!=null){
            stack.push(head);
            head = head.left;
        }else{
            var curNode = stack.pop();
            console.log(curNode.value);
            head = head.right;
        }
    }
}

/**
 * 采用非递归实现二叉树的后序遍历
 * @param head
 */
function postOrderWithNotRecur(head) {
    if(head==null){
        return;
    }
    var stack = [];
    var help = [];
    while(stack.length!=0){
        var curNode = stack.pop();
        help.push(curNode);
        // 放左孩子
        if(curNode.left!=null){
            stack.push(curNode.left);
        }
        // 放右孩子
        if(curNode.right!=null){
            stack.push(curNode.right);
        }
    }
    //统一输出
    while(help.length!=0){
        console.log(help.pop().value);
    }
}