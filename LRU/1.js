
class LRU {
	constructor(max) {
		// 记录顺序，存放最近被访问的key
		this.keys = [];
		// 用对象来保存key对应的value值
		this.cache = {};
		// 缓存最大容量
		this.max = max;
	}

	get(key) {
		// 如果不存在直接返回 -1
		if (!this.cache[key]) {
			return -1;
		}
		// 移动位置，将最新访问的key放到数组末尾
		this.move(key);
		// 返回这个key的value
		return this.cache[key];
	}

	put(key, value) {
		// 更新值和位置
		const arr = this.keys;
		// 更新值
		this.cache[key] = value;
		// 更新位置，将最新访问的key放到数组末尾
		this.move(key);

		if (arr.length > this.max) {
			// 如果超出缓存最大容量，则淘汰最近最少使用的key和value
			delete this.cache[arr[0]];
			arr.shift();
		}

		// 返回当前keys数组
		return this.keys;
	}

	move(key) {
		// 栈顶就是最新的，将最新访问的key放到数组末尾
		const arr = this.keys;
		const index = arr.indexOf(key);
		if (index > -1) {
			arr.splice(index, 1);
		}
		arr.push(key);
		return arr;
	}
}


function test() {
	// 创建一个最大容量为 2 的缓存
	const cache = new LRU(2);

	// 添加两个 key-value 对
	cache.put("key1", "value1");
	cache.put("key2", "value2");

	// 获取已存在的 key 的值
	console.log(cache.get("key1")); // "value1"

	// 添加第三个 key-value 对，会删除最旧的 key2
	cache.put("key3", "value3");

	// 获取已经被删除的 key2 的值，返回 -1
	console.log(cache.get("key2")); // -1

	// 获取其他两个 key 的值
	console.log(cache.get("key1")); // "value1"
	console.log(cache.get("key3")); // value3

	// 添加一个已存在的 key-value 对，会将该 key 移动到 keys 数组的末尾
	cache.put("key1", "new_value1");

	// 获取更新后的 key 的值
	console.log(cache.get("key1")); // "new_value1"

	// 添加第四个 key-value 对，会删除最旧的 key
	cache.put("key4", "value4");

	// 获取其他三个 key 的值
	console.log(cache.get("key1")); // "new_value1"
	console.log(cache.get("key3")); // -1
	console.log(cache.get("key4")); // "value4"

	// 添加第五个 key-value 对，会删除最旧的 key
	cache.put("key5", "value5");

	// 获取其他三个 key 的值，key1 key3 返回 -1
	console.log(cache.get("key3")); // -1
	console.log(cache.get("key4")); // "value4"
	console.log(cache.get("key1")); // "-1"

	// 获取已经被删除的 key 的值，返回 value5
	console.log(cache.get("key5")); // "value5"
}


test();

