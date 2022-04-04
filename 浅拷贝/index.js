//特别注意以下的浅拷贝：单层的时候也是深拷贝，深层(2层包括2层以上)就是浅拷贝了


// 浅拷贝实现方法之一：Object.assign()
//ps:当对象中只有一级属性,没有二级属性的时候,此方法为深拷贝,
//但是对象中有对象的时候,此方法,在二级属性以后就是浅拷贝。
function solution1() {
    let obj1 = {
        info: {
            age: 18,
            name: 'jack'
        },
        car:'true'
    }
    
    let obj2 = Object.assign({}, obj1);
    obj2.info.age = 50;
    obj2.info.name = 'tom';
    obj2.car = 'false';
    console.log(obj1);
    //结果是:{ info: { age: 50, name: 'tom' }, car: 'true' },
    //注意此处  car为深拷贝，而{ age: 50, name: 'tom' }为浅拷贝
}
// 浅拷贝实现方法之二：Array.prototype.concat(),单层的时候也是深拷贝，深层(2层包括2层以上)就是浅拷贝了
function solution2() {
    const arr1 = [{name:'jack'},1,2,3,4];
    const arr2 = arr1.concat();
    arr2[0].name = 'tom';
    arr2[1] = 1000;
    console.log(arr1);
}

// 浅拷贝实现方式之三：Array.prototype.slice(),单层的时候也是深拷贝，深层(2层包括2层以上)就是浅拷贝了
function solution3() {
    const arr1 = [{name:'jack'},1,2,3,4];
    const arr2 = arr1.slice();
    arr2[0].name = 'tom';
    arr2[1] = 1000;
    console.log(arr1);
}

// 浅拷贝实现方式之四：Array.from()
function solution4() {
    const arr1 = [{name:'jack'},1,2,3,4];
    const arr2 = Array.from(arr1);
    arr2[0].name = 'tom';
    arr2[1] = 1000;
    console.log(arr1);
}
// 浅拷贝实现方式之五：展开运算符
function solution5() {
    const arr1 = [{name:'jack'},1,2,3,4];
    const arr2 = [...arr1]
    arr2[0].name = 'hh';
    arr2[1] = 1000;
    console.log(arr1);
}
