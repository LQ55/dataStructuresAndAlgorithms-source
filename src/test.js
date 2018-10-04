// function sortStudents(students) {
//     students.sort(function(stu1,stu2){
//         return stu1.class - stu2.class;
//     });
//     var bigarys = [];
//     var pre = students[0].class,cur,temp = [];
//     for(var i = 0; i < students.length; i ++){
//         cur = students[i].class;
//         if(pre != cur){
//             pre = cur;
//             bigarys.push(temp);
//             temp = [];
//             i --;
//         }else{
//             temp.push(students[i]);
//         }
//     }
//     bigarys.push(temp);
//
//     var result = [];
//     for(var j = 0; j < bigarys.length;j ++){
//         result = result.concat(bigarys[j].sort(function(stu1,stu2){return stu2.score - stu1.score}));
//     }
//     return result;
// }
// /******************************结束写代码******************************/
//
//
// var res;
//
// var _students = [{"name":"张三","class":2,"score":64},{"name":"李四","class":1,"score":80},{"name":"王五","class":1,"score":80},{"name":"赵六","class":4,"score":94}]
//
//
// res = sortStudents(_students);
// console.log(res);


function FindNumsAppearOnce(array)
{
    // write code here
    // return list, 比如[a,b]，其中ab是出现一次的两个数字
    array.sort(function(a,b){
        return a-b;
    });
    var result = [];
    var current = array[0] ;
    for(var i = 0;i < array.length; i ++){
    if(current == array[i]){
        continue;
    }else {
        if(array[i] == array[i+1]){
            current = array[i];
        }else{
            result.push(array[i]);
        }
    }
}
    return result;
}

console.log(FindNumsAppearOnce([2,4,3,6,3,2,5,5]
));