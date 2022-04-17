/* 方案一：借助 Date和while循环 */

function sleep_1(delay = 0) {
    const preTime = Date.now();
    while (true) {
        if (Date.now() - preTime >= delay) {
            break;
        }
    }
}
function test_1() {
    console.log(1111);
    sleep_1(3000);
    console.log(2222);
}

/* 方案二，借助promise和setTimeout */

function sleep_2(delay = 0) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(true)
        }, delay);
    });
}

async function test_2() {
    console.log(1111);
    await sleep_2(3000);
    console.log(2222);
}

test_2()