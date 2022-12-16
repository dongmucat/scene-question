export default function scroll(position) {
	/**
	 * 平滑滚动到页面顶部
	 */
	function scrollToTop() {
		const top =
			document.documentElement.scrollTop || document.body.scrollTop;
		if (top > 0) {
			window.requestAnimationFrame(scrollToTop);
			window.scrollTo(0, top - top / 8);
		}
	}

	/**
	 * 平滑滚动到页面底部
	 */
	function scrollToBottom() {
		const top =
			document.documentElement.scrollTop || document.body.scrollTop;
		if (top < document.documentElement.scrollHeight - window.innerHeight) {
			window.requestAnimationFrame(scrollToBottom);
			window.scrollTo(0, top + top / 8 + 8);
		}
	}

	position === "top" && scrollToTop();
	position === "bottom" && scrollToBottom();
}
