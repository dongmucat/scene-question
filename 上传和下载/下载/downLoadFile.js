/**
 * 下载文件
 * @param {string} filename - 文件名，包括扩展名
 * @param {string|Blob} content - 文件内容，可以是字符串或 Blob 对象
 * @param {Object} [config] - Blob 对象的配置参数
 * @returns {void}
 * @throws {Error} 如果没有指定文件名或文件内容，则会抛出错误
 */
function downloadFile(filename, content, config = {}) {
	if (!filename) {
		throw new Error("Missing required argument: filename");
	}
	if (!content) {
		throw new Error("Missing required argument: content");
	}
	const blob =
		content instanceof Blob ? content : new Blob([content], config);
	const link = document.createElement("a");
	link.download = filename;
	link.href = window.URL.createObjectURL(blob);
	link.onclick = () => {
		// 延迟删除链接，以防止内存泄漏
		setTimeout(() => {
			window.URL.revokeObjectURL(blob);
			document.body.removeChild(link);
		}, 0);
	};
	document.body.appendChild(link);
	link.click();
}
