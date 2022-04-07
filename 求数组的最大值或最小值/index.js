const arr = [6, 4, 1, 8, 2, 11, 3];
//方法一：使用Math.max()和Math.min()
/*
ps:1.如果有任一参数不能被转换为数值，则结果为 NaN。
    2.如果没有参数，则结果为 -Infinity (注意是负无穷大)
 */
console.log(Math.max(...arr))
//方法二：使用reduce()
function max(prev, next) {
    return Math.max(prev, next);
}
console.log(arr.reduce(max));

//方法三：排序
