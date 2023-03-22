class LRU {
	// 构造函数，传入缓存的最大容量
	constructor(max) {
		// 将最大容量和Map实例存储在this中
		this.max = max;
		this.map = new Map();
	}

	// 根据key获取value值
	get(key) {
		// 如果Map中没有对应的key，则返回-1
		if (!this.map.has(key)) return -1;
		// 如果Map中存在对应的key，则将这个key对应的键值对移到Map的末尾
		this.move(key);
        return this.map.get(key);
	}

	// 添加或更新一个键值对
	put(key, value) {
		// 如果Map中已经存在对应的key，则先将这个key对应的键值对从Map中删除
		this.map.has(key) && this.map.delete(key);
		// 如果Map中的键值对数量已经达到了最大容量，则删除最近最少使用的键值对，也就是Map中的第一个键值对
		if (this.map.size >= this.max) {
			const headKey = this.map.keys().next().value;
			this.map.delete(headKey);
		}
		// 将新的键值对添加到Map中
		this.map.set(key, value);
	}

	// 将Map中对应的键值对移到Map的末尾
	move(key) {
		// 先获取key对应的value值
		const tempValue = this.map.get(key);
		// 然后将这个key对应的键值对从Map中删除
		this.map.delete(key);
		// 最后将这个key对应的键值对重新添加到Map中，这样它就被移到了Map的末尾
		this.map.set(key, tempValue);
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
