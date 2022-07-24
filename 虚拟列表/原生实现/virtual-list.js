class VritualList {
	constructor(container, options = {}) {
		// 原始容器
		this.container = container;
		// 列表数据 NODE节点数组
		this.data = options.data;
		// 最大加载数量
		this.maxCount = options.maxCount;
		// 最条数据的高度
		this.itemHeight = options.itemHeight;
		// 初始化
		this.init();
	}
	/**
	 * 初始化啊
	 */
	init() {
		// 容器高度
		this.containerHeight = this.container.clientHeight;
		// 总数据
		this.total = this.data.length;
		// 已加载的第一个index
		this.start = 0;
		// 已加载的最后一个index
		this.end = 0;
		// 目前滚动条位置
		this.scrollTop = 0;
		// 上次滚动条位置
		this.oscrollTop = 0;
		// 预留数量
		this.reserveCount = this.getReserveCount();
		// 包装用div
		this.wrapperNode = this.createWrapper();
		// 滚动用div
		this.scrollBarNode = this.createScrollBar();
		// 展示列表用div
		this.scrollListNode = this.createScrollList();

		this.wrapperNode.onscroll = this.handleScroll.bind(this);
		this.wrapperNode.append(this.scrollBarNode, this.scrollListNode);
		this.container.append(this.wrapperNode);

		this.end = this.start + this.maxCount;
		this.scrollListNode.append(...this.data.slice(this.start, this.end));
	}
	/**
	 * 获取当前滚动到item的索引值
	 */
	get current() {
		return Math.floor(this.scrollTop / this.itemHeight);
	}
	/**
	 * 监听滚动的回调函数
	 */
	handleScroll() {
		this.scrollTop = this.wrapperNode.scrollTop;
		// 往下滑动
		if (this.scrollTop > this.oscrollTop) {
			this.scrollNext();
		} else {
			// 往上滑动
			this.scrollPrev();
		}
		// 记录滚动的位置
		this.oscrollTop = this.scrollTop;
		// 偏移y
		this.scrollListNode.style.transform = `translateY(${
			this.start * this.itemHeight
		}px)`;
	}
	/**
	 * 用于向下滚动
	 */
	scrollNext() {
		/**
		 *  如果当前可见的元素距离第一个加载的元素超过了预留数量
		 * 则不断的去从列表头部移除多余的元素，同时相同数量元素向尾部添加。
		 */
		const listNode = this.scrollListNode;
		while (this.current - this.start > this.reserveCount) {
			this.start++;
			listNode.firstChild.remove();

			if (this.end < this.total) {
				listNode.append(this.data[this.end++]);
			}
		}
	}
	/**
	 * 用于向上滚动
	 */
	scrollPrev() {
		/**
		 * 如果列表中第一个加载出的元素不是首个元素，
		 * 并且距离当前可见元素距离小于预留数量，
		 * 则不断的将元素加入到列表头部，
		 * 如果整体加载出的元素多于整体可加载元素的最大数量，
		 * 则多余的元素从尾部移除
		 */
		const listNode = this.scrollListNode;
		while (this.start && this.current - this.start < this.reserveCount) {
			listNode.prepend(this.data[--this.start]);

			if (this.end - this.start >= this.maxCount) {
				this.end--;
				listNode.lastChild.remove();
			}
		}
	}

	// 预留数量 相当于current - start的最大数量
	getReserveCount() {
		const oneScreenShow = Math.floor(
			this.containerHeight / this.itemHeight
		);
		// (总体显示的数量 - 一个屏幕最多显示的数量) 的一半
		return Math.floor((this.maxCount - oneScreenShow) / 2);
	}
	/**
	 * 创建出一个Wrapper容器
	 * @returns node Wrapper容器
	 */
	createWrapper() {
		const node = document.createElement("div");

		node.style.width = "100%";
		node.style.height = "100%";
		node.style.position = "relative";
		node.style.overflow = "auto";

		return node;
	}
	/**
	 * 创建出一个占位滚动条
	 * @returns node 占位滚动条
	 */
	createScrollBar() {
		const node = document.createElement("div");
		// 高度设置为列表的总高度，为了正常的显示滚动条
		node.style.height = this.total * this.itemHeight + "px";
		return node;
	}
	/**
	 * 创建出一个存放item的列表容器
	 * @returns node 列表容器
	 */
	createScrollList() {
		const node = document.createElement("div");

		node.style.position = "absolute";
		node.style.left = 0;
		node.style.top = 0;
		node.style.width = "100%";

		return node;
	}
}
