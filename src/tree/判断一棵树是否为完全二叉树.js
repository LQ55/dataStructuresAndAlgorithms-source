//第一种方式（左神）
function IsBalanced_Solution(pRoot)
{
    // 判断一个树是否为平衡二叉树
    return process().isB;
}

function process(head){
    if(head == null){
        return {isB:true,h:0}
    }
    var leftOjb = process(head.left);
    if(!leftObj.isB){
        return {isB:false,h:0};
    }
    var rightObj = process(head.right);
    if(!rightObj.isB){
        return {isB:false,h:0};
    }
    if(Math.abs(leftObj.h-rightObj.h) > 1){
        return {isB:false,h:0};
    }
    return {isB:true,h:Math.max(leftObj.h,rightObj.h)+1};
}

//第二种
function isBalanced_tree(root){
    if(root == null){
        return true;
    }
    var leftH = TreeDepth(root.left);
    var rightH = TreeDepth(root.right);
    if(Math.abs(leftH-rightH)>1){
        return false;
    }
    return isBalanced_tree(root.left)&&isBalanced_tree(root.right);
}

function TreeDepth(root){
    if(root == null){
        return 0;
    }
    var leftH = TreeDepth(root.left);
    var rightH = TreeDepth(root.right);
    return Math.max(leftH,rightH)+1;
}