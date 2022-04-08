// 实现深拷贝方法之一：JSON.parse(JSON.stringify(obj))
//缺点如下
/*如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式。而不是时间对象；

如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象；

如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失；

如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null */

function solution1() {
    const obj1 = {
        info: {
            age: 18,
            name: 'jack'
        },
        price: 100
    }

    const obj2 = JSON.parse(JSON.stringify(obj1));
    obj2.info.age = 50;
    obj2.info.name = 'tom';
    obj2.price = 200;
    console.log(obj1);
    console.log(obj2);
}

// 实现深拷贝方法之二：第三方库Lodash中的_.cloneDeep(value)

// 手写深拷贝（递归：对属性所有引用值进行遍历，直到是基本类型的值为止）
function deepCopy1(obj) {
    if (!obj && typeof obj !== 'object') {
        throw new Error('error arguments');
    }
    // const targetObj = obj.constructor === Array ? [] : {};
    const targetObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        //只对 对象自有属性进行拷贝
        if (obj.hasOwnProperty(key)) {
            //递归：对属性所有引用值进行遍历，直到是基本类型的值为止
            if (obj[key] && typeof obj[key] === 'object') {
                targetObj[key] = deepCopy1(obj[key]);
            } else {
                targetObj[key] = obj[key];
            }
        }
    }
    return targetObj;
}
//第二版本
function deepCopy(obj, map = new WeakMap()) {
    //空值和非引用对象处理
    if (obj === null || typeof obj !== 'object') {
        throw new TypeError('error arguments');
    }
    //特殊判断
    if (Object.prototype.toString.call(obj) === '[object Date]') return new Date(obj)
    if (Object.prototype.toString.call(obj) === '[object RegExp]') return new RegExp(obj)
    if (Object.prototype.toString.call(obj) === '[object Error]') return new Error(obj)
    if (Object.prototype.toString.call(obj) === '[object Function]') {
        return function (...args) {
            return obj.apply(this, args)
        }
    }
    // 判断属性值之前有没有被遍历过
    if (map.has(obj)) return map.get(obj)
    //声明新对象/数组
    const newObj = Array.isArray(obj) ? [] : {};
    //标记
    map.set(obj, newObj);
    for (let key in obj) {
        //只对 对象自有属性进行拷贝
        if (obj.hasOwnProperty(key)) {
            //递归：对属性所有引用值进行遍历，直到是基本类型的值为止
            if (obj[key] && typeof obj[key] === 'object') {
                newObj[key] = deepCopy(obj[key], map);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}


function test() {
    const obj = {
        info: {
            age: 18,
            name: 'jack'
        },
        price: 100
    }
    const obj2 = deepCopy(obj);
    obj2.info.age = 50;
    obj2.info.name = 'tom';
    obj2.price = 200;
    console.log('obj: ', obj);
    console.log('obj2: ', obj2);
    //=====================分割线=====================
    const arr = [{ name: 'jack' }, 1, { info: { age: 18 } }];
    const arr2 = deepCopy(arr);
    arr2[0].name = 'tom';
    arr2[2].info.age = 20;
    console.log('arr: ', arr);
    console.log('arr2: ', arr2);
}

function test2() {
    var obj = { a: 1 };
    obj.obj1 = obj;
    var newObj = deepCopy(obj);
    console.log(newObj);
}

test2();


