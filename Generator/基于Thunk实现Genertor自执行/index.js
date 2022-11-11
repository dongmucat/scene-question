// 参考：https://www.ruanyifeng.com/blog/2015/05/thunk.html
const { readFile } = require("fs");
const { resolve } = require("path");

/**
 * 将函数Thunk化：在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数
 */
const readFileThunk = function (filename) {
	return function (callback) {
		return readFile(resolve(__dirname, filename), callback);
	};
};

const gen = function* () {
	const file1 = yield readFileThunk("../assets/name.txt");
	const file2 = yield readFileThunk("../assets/age.txt");
	console.log(file1?.toString());
	console.log(file2?.toString());
};

// 手动执行 版本
function step1(gen) {
	// 其实是将一样的回调函数，反复传入 next 方法的 value 属性
	const g = gen();
	const r1 = g.next();
	r1.value((err, data) => {
		if (err) {
			throw err;
		}
		const r2 = g.next(data);
		r2.value((err, data) => {
			if (err) {
				throw err;
			}
			g.next(data);
		});
	});
}

// 自动执行版本
function step2(gen) {
	// 自执行的前提是 yiel命令后面跟的是Thunk函数
	function run(gen) {
		const g = gen();
		// next 函数就是 Thunk 的回调函数
		function next(err, data) {
			if (err) {
				throw err;
			}
			const res = g.next(data);
			if (res.done) {
				return;
			}
			res.value(next);
		}

		next();
	}

	run(gen);
}

step1(gen);
step2(gen);
