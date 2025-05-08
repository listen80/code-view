// src/utils/domUtils.js
export function createElement(codes) {
	const ol = document.createElement('ol');
	let li = document.createElement('li');
	let count = 0;
	for (let x = 0, len = codes.length; x < len; x++) {
		const code = codes[x];
		const span = document.createElement('span');
		span.appendChild(document.createTextNode(code[0]));
		span.className = code[1];
		if (span.className === 'line') {
			ol.appendChild(li);
			li = document.createElement('li');
			count++;
		} else {
			li.appendChild(span);
		}
	}
	ol.style.paddingLeft = String(count).length / 2 + 1.3 + 'em';
	ol.appendChild(li);
	return ol;
}

export function createHtml(codes) {
	const ol = document.createElement("ol")
	let li = document.createElement("li")
	let count = 0
	for (let x = 0, len = codes.length; x < len; x++) {
		const code = codes[x]
		const span = document.createElement("span")
		span.appendChild(document.createTextNode(code[0]))
		span.className = code[1]
		if (span.className === "line") {
			ol.appendChild(li)
			li = document.createElement("li")
			count++
		} else {
			li.appendChild(span)
		}
	}
	ol.style.paddingLeft = String(count).length / 2 + 1.3 + "em"
	ol.appendChild(li)
	return ol
}
