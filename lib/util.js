
const pad = (n, width, z) => {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//TODO write test unit 
export const xuatzSortByAiring = (series) => {
	let sorted = series.sort(function(a, b){
		let valueA = '' + a.daysUntil + pad(a.hoursUntil, 2) + pad(a.minutesUntil, 2);
		let valueB = '' + b.daysUntil + pad(b.hoursUntil, 2) + pad(b.minutesUntil, 2);

		if (parseInt(valueA) > parseInt(valueB)) {
			return 1;
		}

		if (parseInt(valueA) < parseInt(valueB)) {
			return -1;
		}

		return 0;
	});

	let marker = Math.floor(0.7 * sorted.length);
	let left = sorted.slice(0, marker);
	let right = sorted.slice(marker);

	return right.concat(left);
}