function getQueryVariable(variable) {
	/* substring除去? */
	let query = window.location.search.substring(1);
	/* 分离 */
	let vars = query.split("&");
	for (let i = 0; i < vars.length; i++) {
		/* 分离 */
		let pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return false;
}

/**
 * 根据键名获取 URL 查询字符串参数的值。
 * @param {string} key - 要获取的查询字符串参数的键名。
 * @returns {string|null} 查询字符串参数的值，如果不存在则返回 null。
 */
function getQueryString(key) {
	const search = window.location.search;

	// 创建正则表达式，用于匹配查询字符串参数。
	const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);

	// 使用正则表达式从查询字符串中提取参数值。
	const match = search.substr(1).match(reg);

	// 如果找到匹配项，则返回解码后的参数值；否则返回 null。
	return match ? decodeURIComponent(match[2]) : null;
}

const url = "https://www.example.com/path?name1=value1&name2=value2#top";

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
	arr.forEach((item) => {
		let [key, value] = item.split("="); // 取出数组中每一项的键与值
		key = decodeURIComponent(key);
		value = decodeURIComponent(value);
		if (key in obj) {
			obj[key] = [].concat(obj[key], value); // 表示不是第一次遍历说明这个键已有，通过数组存起来。
		} else {
			obj[key] = value; // 表示第一次遍历这个元素，直接添加到对象上面
		}
	});
	//不指定参数名称(sKey为'')，返回全部的参数对象 或者 {}
	return !sKey ? obj : obj[sKey] || "";
}

/**
 * 从 URL 中获取查询参数的值。
 * @param {string} [sKey] - 参数名称。如果不提供该参数，则返回全部参数对象。
 * @param {string} [sUrl=window.location.search] - URL 地址。
 * @returns {string|object} 返回参数值或参数对象。
 */
function getUrlParams(sKey = "", sUrl = window.location.search) {
	const search = sUrl.split("?")[1]; // 获取查询参数部分，不包括开头的 '?'
	if (!search) {
		// 没有查询参数，返回空对象或空字符串
		return sKey ? "" : {};
	}

	const arr = search.split("#")[0].split("&"); // 将查询参数拆分为数组
	const obj = {};
	arr.forEach((item) => {
		const [key, value] = item.split("="); // 取出数组中每一项的键与值
		const decodedKey = decodeURIComponent(key);
		const decodedValue = decodeURIComponent(value || ""); // 如果值不存在则设为空字符串
		if (decodedKey in obj) {
			obj[decodedKey] = [].concat(obj[decodedKey], decodedValue); // 表示不是第一次遍历说明这个键已有，通过数组存起来。
		} else {
			obj[decodedKey] = decodedValue; // 表示第一次遍历这个元素，直接添加到对象上面
		}
	});

	// 不指定参数名称(sKey 为空字符串)，返回全部的参数对象，否则返回参数值或空字符串
	return sKey === "" ? obj : obj[sKey] || "";
}
