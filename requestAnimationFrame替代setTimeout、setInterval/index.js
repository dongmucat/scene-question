class RAF {
	constructor() {
		this.timeoutTimer = null;
		this.intervalTimer = null;
	}

	setTimeout = (cb, delay) => {
		let now = Date.now;
		let stime = now();
		let etime = stime;
		let loop = () => {
			this.timeoutTimer = requestAnimationFrame(loop);
			etime = now();
			if (etime - stime >= delay) {
				cb();
				cancelAnimationFrame(this.timeoutTimer);
			}
		};
		this.timeoutTimer = requestAnimationFrame(loop);
		return this.timeoutTimer;
	};

	clearTimout = () => {
		cancelAnimationFrame(this.timeoutTimer);
	};

	setInterval = (cb, delay) => {
		// 实现setInterval功能
		let now = Date.now;
		let stime = now();
		let etime = stime;
		let loop = () => {
			this.intervalTimer = requestAnimationFrame(loop);
			etime = now();
			if (etime - stime >= delay) {
				stime = now();
				etime = stime;
				cb();
			}
		};
		this.intervalTimer = requestAnimationFrame(loop);
		return this.intervalTimer;
	};
	clearInterval = () => {
		cancelAnimationFrame(this.intervalTimer);
	};
}
