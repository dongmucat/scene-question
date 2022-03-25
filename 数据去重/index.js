/* 使用set去重 */
function solution_1(arr) {
    //Array.from() 方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
    return Array.from(new Set(arr))
    //或者直接 arr =   [...new Set(arr)] 
    //代码就是这么少----（其实，严格来说并不算是一种，相对于第一种方法来说只是简化了代码）

}

function solution_2(arr) {
    return [...new Set(arr)]
    //代码就是这么少----（其实，严格来说并不算是一种，相对于第一种方法来说只是简化了代码）
}


/* 利用sort  NaN、{}没有去重*/
function solution_3(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return;
    }
    /* 利用排序 */
    arr = arr.sort()
    /* 结果例如[1,1,2,34] */
    var newArr = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i - 1] !== arr[i]) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

/* 利用 filter 和 indexOf  完美 */
function solution_4(arr) {
    /* filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。  */
    return arr.filter((item, index, arr) => {
        //当前元素，在原始数组中的第一个索引==当前索引值，才能通过
        //indexOf(item, 0)  此处的0代表为从索引值0开始查找
        return arr.indexOf(item, 0) === index;
    });
}
/* 利用Map数据结构去重 */
function solution_5(arr) {
    let map = new Map();
    let array = new Array(); // 数组用于返回结果
    for (let i = 0; i < arr.length; i++) {
        if (!map.has(arr[i])) { // 如果没有该key值,就存放到map中
            map.set(arr[i], true);
            array.push(arr[i]);
        }
    }
    return array;
}

let arr = [1, 1, 3, 4, 2, 3]
let y = solution_5(arr)
console.log(y);