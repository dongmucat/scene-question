function solution1() {
    //Promises/A+标准：原Promise对象的状态将跟新对象保持一致。
    Promise.resolve().then(() => {
        console.log('ok1');
        // 非常重要
        return new Promise(() => {}) // 返回“pending”状态的Promise对象
    }).then(() => {
        // 后续的函数不会被调用
        console.log('ok2');
    }).catch(err => {
        console.log(err);
    })
}

function solution2() {
    // 使用Promise.race
    //     说明：当传入的所有的promise其中有任何一个状态变成fulfilled
    //    或者rejected，则执行相应的回调
    let p1 = new Promise((resovle, reject) => {
        resovle('p1 ok');
    })
    let p2 = new Promise((resovle, reject) => {
        setTimeout(() => {
            resovle('p2 ok');
        }, 1000);
    })

    Promise.race([p1, p2]).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
    console.log('p1:', p1);
    console.log('p2:', p2);
}

function solution3() {
    // 当Promise链中抛出一个错误时，错误信息沿着链路向后传递，直至被捕获。
    let p1 = Promise.resolve().then(() => {
        console.log('ok1');
        // 抛出错误
        throw 'err1';
    }).then(() => {
        // 这里不会被调用
        console.log('ok2');
    }).catch(err => {
        console.log(err);
        console.log('p1:', p1);
    })
}