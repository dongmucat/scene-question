export type Task = () => Promise<void>;
export type ErrorCallback = (error: any) => void;

/**
 * 任务调度器类，用于按顺序执行异步任务。
 */
export class TaskScheduler {
	/**
	 * 存储待执行任务的队列。
	 * @type {Task[]}
	 */
	private queue: Task[];

	/**
	 * 表示调度器当前是否正在执行任务。
	 * @type {boolean}
	 */
	private running: boolean;

	/**
	 * 发生错误时调用的回调函数。
	 * @type {ErrorCallback}
	 */
	private errorCallback: ErrorCallback;

	/**
	 * 创建一个新的任务调度器实例。
	 * @param {ErrorCallback} [errorCallback] - 发生错误时调用的回调函数。
	 */
	constructor(errorCallback?: ErrorCallback) {
		this.queue = [];
		this.running = false;
		this.errorCallback = errorCallback
			? errorCallback
			: (error: any) => console.error("Error:", error);
	}

	/**
	 * 向队列中添加一个异步任务或任务数组。
	 * @param {Task | Task[]} taskFns - 要添加的任务函数或任务函数数组。
	 */
	public add(taskFns: Task | Task[]): void {
		if (Array.isArray(taskFns)) {
			this.queue.push(...taskFns);
		} else {
			this.queue.push(taskFns);
		}
		if (!this.running) {
			this.running = true;
			this.runNext();
		}
	}

	/**
	 * 执行下一个任务。
	 */
	private async runNext(): Promise<void> {
		if (this.queue.length > 0) {
			const taskFn = this.queue.shift();
			try {
				taskFn && (await taskFn());
			} catch (error) {
				this.errorCallback(error);
			} finally {
                this.runNext();
            }
		} else {
			this.running = false;
		}
	}

	/**
	 * 清空任务队列并停止执行。
	 */
	public clear(): void {
		this.queue = [];
		this.running = false;
	}

	/**
	 * 获取当前队列中的任务数量。
	 * @returns {number} 当前队列中的任务数量。
	 */
	public length(): number {
		return this.queue.length;
	}

	/**
	 * 检查调度器当前是否正在执行任务。
	 * @returns {boolean} 如果正在执行任务，则为 true，否则为 false。
	 */
	public isRunning(): boolean {
		return this.running;
	}
}
