class RAF {
	private timeoutTimer: number | null;
	private intervalTimer: number | null;

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
	setTimeout = (cb: () => void, delay: number): number => {
		const stime = performance.now();
		const loop = () => {
			const etime = performance.now();
			if (etime - stime >= delay) {
				cb();
				cancelAnimationFrame(this.timeoutTimer as number);
				this.timeoutTimer = null;
			} else if (this.timeoutTimer) {
				this.timeoutTimer = requestAnimationFrame(loop);
			}
		};
		this.timeoutTimer = requestAnimationFrame(loop);
		return this.timeoutTimer;
	};
	/**
	 * 清除 setTimeout 定时器
	 */
	clearTimeout = (): void => {
		if (this.timeoutTimer) {
			cancelAnimationFrame(this.timeoutTimer);
			this.timeoutTimer = null;
		}
	};
	/**
	 * requestAnimationFrame实现setInterval
	 * @param {function} cb 回调函数
	 * @param {number} delay 延时
	 * @returns setInterval ID
	 */
	setInterval = (cb: () => void, delay: number): number => {
		let stime = performance.now();
		const loop = () => {
			const etime = performance.now();
			if (etime - stime >= delay) {
				stime = performance.now();
				cb();
			}
			if (this.intervalTimer) {
				this.intervalTimer = requestAnimationFrame(loop);
			}
		};
		this.intervalTimer = requestAnimationFrame(loop);
		return this.intervalTimer;
	};
	/**
	 * 清除 setInterval 定时器
	 */
	clearInterval = (): void => {
		if (this.intervalTimer) {
			cancelAnimationFrame(this.intervalTimer);
			this.intervalTimer = null;
		}
	};
}

export default RAF;
