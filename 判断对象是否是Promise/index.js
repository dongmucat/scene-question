/* 如果一个变量是 Object, 有 then 和 catch 方法, 就认为是 Promise */
const isPromise = (val) => {
    return (typeof(val) === 'object') && (val.then instanceof Function) && (val.catch instanceof Function);
}

const p = Promise.resolve()

// test
console.log(isPromise(p))
console.log(isPromise(888))
console.log(isPromise({}))