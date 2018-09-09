function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

/**     目标叉树，序列化后，空节点通过#替代，节点之间通过!分隔
 *                      1
 *                   2      3
 *                 4   5  6   7
 */


/**     序列化的结果
 *      1!2!4!#!#!5!#!#!3!6!#!#!7!#!#!
 */

/**
 * 二叉树的序列化函数（前序遍历的序列化结果）
 * @param node
 */
function serializeBinaryTreeByPre(node) {
    var str = "";
    //如果某个节点的左子树或者右子树为空，那么就添加一个#!分隔符
    if(node == null){
        return "#!";
    }
    //否则，如果不为空，那么就通过!符号分割节点的值
    var serializeResult = node.value + "!";
    serializeResult+=serializeBinaryTreeByPre(node.left);
    serializeResult+=serializeBinaryTreeByPre(node.right);
    return serializeResult;
}

/**
 *
 * @param serializeResult 序列化的结果
 */
function handleDeserializeByPre(serializeResult) {
    var queue = serializeResult.split("!");
    deserializeByPre(queue);
}

/**
 * 先序方式反序列化
 * @param queue
 * @returns {*}
 */
function deserializeByPre(queue) {
    var val = queue.shift();
    //如果为#表示该节点为null
    if(val == "#"){
        return null;
    }
    var head = new Node(val);
    head.left = deserializeByPre(queue);
    head.right = deserializeByPre(queue);
    return head;
}
