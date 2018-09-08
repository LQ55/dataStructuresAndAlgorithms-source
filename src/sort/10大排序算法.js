/**
 * @param size
 * @param value
 */
function generateRandomArray(size, value){
    var arr = [];
    var randomSize = parseInt((size+1)*Math.random());
    for(var i = 0; i < randomSize; i ++){
        arr.push(parseInt((value+1)*Math.random())- parseInt(value*Math.random()));
    }
    return arr;
}

function copyArray(arr) {
    if(arr==null){
        return null;
    }
}

/**
 * 交换数组中两个位置对应的元素
 * @param source
 * @param preIndex
 * @param postIndex
 */
function swap(source,preIndex,postIndex){
    var temp = source[preIndex];
    source[preIndex] = source[postIndex];
    source[postIndex] = temp;
}
/**
 * 冒泡排序 稳定性：稳定
 * @param source
 */
function bubbleSort(source){
    var len = source.length;
    if(source==null||len<2){
        return source;
    }
    for(var i=0; i < len-1; i ++){
        //每一轮比完看是否已经有序，如果有序，不需要再进行
        var isOrder = true;
        for(var j = 0; j < len-1-i; j ++){
            if(source[j]>source[j+1]){
                isOrder = false;
                swap(source,j,j+1);
            }
        }
        if(isOrder){
            break;
        }
    }
    return source;
}

/**
 * 选择排序
 * @param source
 */
function selectionSort(source){
    var len = source.length;
    if(source==null||len<2){
        return source;
    }
    for(var i = 0; i < len -1; i ++){
        var minIndex = i;
        for(var j = i+1;j < len -1; j++){
            if(source[minIndex]>source[j]){
                minIndex = j;
            }
        }
        swap(source,i,minIndex);
    }
    return source;
}

/**
 * 插入排序 稳定
 * 插入排序可以根据选择不同的方法在已经排好序的数据列表中寻找插入位置，依据查找方法的不同，有多种插入排序（直接插入、折半插入、希尔排序）
 * @param source
 */
function insertSort(source){
    var len = source.length;
    if(source==null||len<2){
        return source;
    }
    for(var i = 0; i < len -1; i ++){
        var j = i+1;
        var currentElement = source[j];
        //方式一，交换元素方式
        /* while (j>0&&source[j] < source[j-1]){
             swap(source,j,j-1);
             j--;
         }*/
        //方式二，直接覆盖方式
        while( j>0 && currentElement < source[j-1]){
            source[j] = source[j-1];
            j--;
        }
        source[j] = currentElement;
    }
    return source;
}

/**
 * 希尔排序（希尔排序实际是直接插入排序的进阶版本）不稳定
 * @param source
 */
function shellSort(source) {
    var len = source.length;
    if(source==null||len<2){
        return source;
    }
    //取首次的排序增量
    //var increment = Math.floor(len/3)+1;
    //增量
    var gap;
    //第一层是求一个逐渐减少的增量序列（所以希尔排序又叫减小增量排序）
    for(gap=Math.floor(len/2);gap>0;gap=Math.floor(gap/=3)){
        //第一层取得增量以后，下面就是进行直接插入排序，从增量的位置开始
        for(var j = gap;j < len;j ++){
            //取得当前需要插入的元素
            var curElement = source[j];
            //寻找插入位置，并实现插入
            var i = j;
            while(i>=gap && source[i-gap]>curElement){
                source[i] = source[i-gap];
                i-=gap;
            }
            source[i]=curElement;
        }
    }
    return source;
}

/**
 * 归并排序，是分治思想
 * @param source
 */
function mergeSort(source){
    //将数组分为前后两部分
    if(source.length<=1){
        return source;
    }
    var left = source.slice(0,Math.floor(source.length/2));
    var right = source.slice(Math.floor(source.length/2));
    return merge(mergeSort(left),mergeSort(right));
}

/**
 * 归并排序的归并方法，将左右的排序好的数组合并
 * @param left
 * @param right
 */
function merge(left,right){
    var result = [];
    while(left.length>0&&right.length>0){
        //js中的合并比采用java方便多了，直接有数组的shift方法，哈哈哈
        if(left[0]<right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
    while(left.length){
        result.push(left.shift());
    }
    while(right.length){
        result.push(right.shift());
    }
    return result;
}

/**
 * 快速排序操作 （快速排序可以使用荷兰国旗问题加上快排递归实现）
 * @param source
 * @param leftIndex
 * @param rightIndex
 */
function quickSort(source,leftIndex,rightIndex){
    var len = source.length,
        leftIndex = typeof leftIndex != "number"? 0 : leftIndex,
        rightIndex = typeof rightIndex != "number"? len-1 : rightIndex;
    //递归的结束条件，当leftIndex==rightIndex的时候，这个时候source的长度为一，也就是只有一个元素，不用递归了
    if(leftIndex<rightIndex){
        //首先申明两个游标，左边一个和右边一个，并以第一个为标杆（基准值）进行划分
        var pivotIndex = leftIndex,left=leftIndex+1,right = rightIndex,pivot = source[pivotIndex];
        while(left<=right){
            //从左边往右边找，直到找到一个比中轴大的停止寻找
            while(left<=right&&source[left]<pivot){
                left++;
            }
            //从右边往左边找，直到找到一个比中轴小的停止寻找
            while(right>=left&&source[right]>pivot){
                right--;
            }
            //交换两个元素
            if(left<=right){
                swap(source,left,right);
                left++;
                right--;
            }
        }
        //当循环结束的时候，right指向的元素是最后一个（从左边算起）小于等于中轴元素的位置，这个时候将中轴元素放到正确的位置
        swap(source,pivotIndex,right);
        //分别递归左边和右半边，right所在的位置，就是中轴所在的位置
        quickSort(source,leftIndex,right-1);
        quickSort(source,right+1,rightIndex);
    }
    return source;
}

/**
 * 快速排序的分区操作
 * @param source
 * @param leftIndex
 * @param rightIndex
 */
function partition(source,leftIndex,rightIndex){

}

/**
 *  将新元素插入到（大|小）顶堆中，并重建堆（给定一个数组，循环使用这个方法建立堆）
 * @param source 源素组
 * @param index 当前被插入元素在数组中所处的位置
 */
function heapInsert(source,index){
    //根据index可以计算出该节点的父节点的位置为(index-1)/2
    //如果当前的节点的值大于父节点的值，就往上面换（这里是针对大根堆的情况，如果是小根堆相反）
    while(source[index] > source[parseInt((index-1)/2)]){
        swap(source,index,(parseInt((index-1)/2)));
        index = parseInt((index-1)/2);
    }
}

/**
 * 当堆中元素发生变小往下沉的操作
 * @param source 源数组
 * @param index 变化的元素位置
 * @param heapSize 指定堆的大小，可定制（也就是可以只指定一段距离构成堆）
 */
function heapify(source,index,heapSize){
    var leftChildIndex = index*2+1;
    while(leftChildIndex<heapSize){
        //寻找左右节点中较大的节点
        var largest = leftChildIndex +1 < heapSize && source[leftChildIndex+1] > source[leftChildIndex] ? leftChildIndex+1 : leftChildIndex;
        //寻找当前节点和它的孩子中较大的一个节点
        largest = source[index] > source[largest] ? index:largest;
        //如果最大的节点就是它自己，就不继续向下面沉了，也就是不调整
        if(largest == index){
            break;
        }
        //当前节点向下沉
        swap(source,index,largest);
        index = largest;
        leftChildIndex = index * 2 + 1;
    }
}

/**
 * 堆排序
 * @param source
 */
function heapSort(source){
    if(source == null || source.length < 2){

    }
    //先将数组构建成一个堆结构
    for(var i = 0; i < source.length;i ++){
        heapInsert(source,i);
    }
    var i = 0;
    var heapSize = source.length;
    //然后循环调用heapify的过程，调整数组结构，也就是形成结果
    swap(source,0,--heapSize);
    while(heapSize>0){
        //将堆顶元素和最后一个交换，然后进行heapify的过程。
        //swap(source,0,heapSize-1);
        //heapify(source,0,heapSize--);
        heapify(source,0,heapSize);
        swap(source,0,--heapSize);
    }
}

var soruce1 = [49,38,65,97,26,13,27,49,55,4];
var source2 = [3,44,38,15,67,12,56,28];
//console.log(shellSort(soruce1));
heapSort(source2);
console.log(source2);



