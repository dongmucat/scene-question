/* 方法一：使用typeof */
//缺点是只能判断基本类型，对于引用类型，只能判断为object,
//特别注意typeof null是object，这是历史遗留问题
function solution1() {
    console.log(typeof arguments[0]);
    console.log(typeof arguments[1]);
}

solution1(1, []);

/* 方法二：使用instanceof， instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。*/
//缺点是在比较引用类型才有意义,基本类型判断不了，而
function solution2() {
    console.log(arguments[0] instanceof Function);
}
solution2(solution1);

/* 方法三：使用constructor */
//constructor本来是原型对象上的属性，指向构造函数。但是根据实例对象寻找属性的顺序，若实例对象上没有实例属性或方法时，
//就去原型链上寻找，因此，实例对象也是能使用constructor属性的
let x = new Number(1);
console.log(x.constructor === Number);

/* 方法四：使用 Object.prototype.toString.call()
ECMA里规范定义了Object.prototype.toString的行为：首先，取得对象的一个内部属性[[Class]]，
然后依据这个属性，返回一个类似于”[object Array]”的字符串作为结果
*/
console.log(Object.prototype.toString.call(x));
