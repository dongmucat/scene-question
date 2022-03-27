/* 数组扁平化 */

function myFlat(arr) {
    /* 使用flat 
    当flat里面的参数为 Infinity 的时候，无
    需知道数组的维度，直接将目标数组变成1维数组。  */
    return arr.flat(Infinity);
}

//reduce + concat + isArray + 递归
function flatDeep(arr) {
    return arr.reduce((acc,next)=>{
        return acc.concat(Array.isArray(next)?flatDeep(next):next);
    },[])
}
/* 使用stack */
function flatten(input) {
    const stack = [...input]; //保证不会破坏原数组
    const result = [];
    while (stack.length) {
        /* 从前面处理到后面 */
        const first = stack.shift();
        if (Array.isArray(first)) {
            /* 去掉一层皮后，重新放到stack前面 */
            stack.unshift(...first);
        } else {
            result.push(first);
        }
    }
    return result;
}

//如果数组的项全为数字，可以使用join()，toString()进行扁平化操作。
function flatten_2(input) {
    return input.toString().split(',').map(item => item-0);
  }
//test
const arr = [1, 2, 3, [3, 4, [4, 5]]];
console.log(flatDeep(arr));
