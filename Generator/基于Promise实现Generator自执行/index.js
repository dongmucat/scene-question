// 参考：https://www.ruanyifeng.com/blog/2015/05/co.html
const fs = require("fs");
const path = require("path");

const readFile = function (filename) {
	return new Promise((resolve, reject) => {
		fs.readFile(path.resolve(__dirname, filename), function (err, data) {
			if (err) {
				reject(err);
			}

			resolve(data);
		});
	});
};

const gen = function* () {
	const file1 = yield readFile("../assets/name.txt");
	const file2 = yield readFile("../assets/age.txt");
	console.log(file1?.toString());
	console.log(file2?.toString());
};

// 手动执行 版本
function step1(gen) {
	const g = gen();

	g.next().value.then((data, err) => {
		if (err) {
			throw err;
		}
		g.next(data).value.then((data, err) => {
			if (err) {
				throw err;
			}
			g.next(data);
		});
	});
}

function step2(gen) {
    
	const g = gen();

	function next(data, err) {
		if (err) {
			throw err;
		}
		const res = g.next(data);
		if (res.done) {
			return res.value;
		}

		res.value.then(next);
	}

	next();
}

step1(gen);
step2(gen);
