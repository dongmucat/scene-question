Array.prototype.myMap = function (callback,thisArg) {
    //判断
    if (this == undefined) {
        throw new TypeError('this is null or not defined');
    }
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new TypeError(callback + ' is not a function');
    }
    //创建一个数组
    const res = [];
    const self = Object(this);
    self.reduce((pre, cur, index, arr) => {
        return res.push(callback.call(thisArg, cur, index, arr));
    },null);
    return res;
}
//test
const arr = [1, 2, 3]
const x = arr.myMap((item) => {
    return item = item * 2
    }
);
console.log(x);