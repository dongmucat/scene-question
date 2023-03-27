/**
 * 计算指定文本在指定字体下的宽度
 * @param {string} text - 待计算的文本
 * @param {string} font - 字体样式，默认为"14px PingFang SC Regular"
 * @returns {number} - 计算得到的文本宽度，单位为像素
 */
function getTextWidth(text, font = "14px PingFang SC Regular") {
	// 创建一个canvas元素
	const canvas = document.createElement("canvas");
	// 获取canvas的2D上下文对象
	const ctx = canvas.getContext("2d");
	// 设置字体样式
	ctx.font = font;
	// 获取文本宽度
	const width = ctx.measureText(text).width;
	// 返回文本宽度
	return width;
}
