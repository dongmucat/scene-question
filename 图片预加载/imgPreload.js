/**
 *
 * @param {Array} imgs 存放图片url的数组
 * @returns promiseArr
 */
export default function imgPreload(imgs) {
	const imgNum = imgs.length;
	let count = 0;
	let percent = 0;
	const promiseArr = [];

	function handler(url) {
		return new Promise((resolve, reject) => {
			let image = new Image();
			image.onload = () => {
				count++;
				percent = Math.floor((count / imgNum) * 100);
				resolve();
				console.log(percent+"%");
			};
			image.onerror = () => {
				reject();
			};
			image.src = url;
		});
	}

	imgs.forEach((imgUrl) => promiseArr.push(handler(imgUrl)));

	return Promise.all(promiseArr);
}
