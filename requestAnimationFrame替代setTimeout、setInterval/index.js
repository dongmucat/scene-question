class RAF {
	/**
	 * 构造函数
	 */
	constructor() {
		this.timeoutTimer = null;
		this.intervalTimer = null;
	}
	/**
	 * requestAnimationFrame实现setTimeout
	 * @param {function} cb 回调函数
	 * @param {number} delay 延时
	 * @returns setTimeout ID
	 */
	setTimeout = (cb, delay) => {
		let stime = Date.now();
		let etime = null;
		let loop = () => {
			etime = Date.now();
			if (etime - stime >= delay) {
				cb();
				cancelAnimationFrame(this.timeoutTimer);
			}
			this.timeoutTimer = requestAnimationFrame(loop);
		};
		this.timeoutTimer = requestAnimationFrame(loop);
		return this.timeoutTimer;
	};

	/**
	 * 清除 setTimeout 定时器
	 */
	clearTimout = () => {
		cancelAnimationFrame(this.timeoutTimer);
	};

	/**
	 * requestAnimationFrame实现setInterval
	 * @param {function} cb 回调函数
	 * @param {number} delay 延时
	 * @returns setInterval ID
	 */
	setInterval = (cb, delay) => {
		// 实现setInterval功能
		let stime = Date.now();
		let etime = null;
		let loop = () => {
			etime = Date.now();
			if (etime - stime >= delay) {
				stime = Date.now();
				cb();
			}
			this.intervalTimer = requestAnimationFrame(loop);
		};
		this.intervalTimer = requestAnimationFrame(loop);
		return this.intervalTimer;
	};

	/**
	 * 清除 setInterval 定时器
	 */
	clearInterval = () => {
		cancelAnimationFrame(this.intervalTimer);
	};
}
