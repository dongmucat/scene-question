const url = 'https://www.example.com/path?name1=value1&name2=value2#top';
/*
获取 url 中的参数
1. 指定参数名称，返回该参数的值 或者 空字符串
2. 不指定参数名称，返回全部的参数对象 或者 {}
3. 如果存在多个同名参数，则返回数组
4. 不支持URLSearchParams方法
*/

function getUrlParam(sUrl, sKey) {
    let arr = sUrl.split("?")[1].split("#")[0].split("&");
    let obj = {};
    arr.forEach(item => {
        let [key, value] = item.split("=");// 取出数组中每一项的键与值
        if (key in obj) {
            obj[key] = [].concat(obj[key], value);// 表示不是第一次遍历说明这个键已有，通过数组存起来。
        } else {
            obj[key] = value; // 表示第一次遍历这个元素，直接添加到对象上面
        }
    })
    //不指定参数名称(sKey为'')，返回全部的参数对象 或者 {}
    return !sKey ? obj : obj[sKey] || "";
}

console.log(getUrlParam(url));
console.log(getUrlParam(url,'name1'));