/**
 *
 * @param {*} cb 回调函数
 * @param {*} n 重复次数
 * @param {*} delay 间隔时间
 */
function repeat(cb = () => null, n = 0, delay = 0) {
	let count = 0;
	function inner() {
		setTimeout(() => {
			cb();
			count++;

			if (count < n) {
				inner();
			}
		}, delay);
	}

	inner();
}

repeat(() => console.log("hello world"), 3, 3000);
