// src/utils/analysis.js
import { analysisForMarkupCode } from './markupAnalysis.js';
import { analysisForSourceCode } from './sourceAnalysis.js';
import { analysisForString } from './analysisForString.js';
import { createElement, createHtml } from './domUtils.js';

// export function analysisForString(source, indent) {
// 	if (indent) {
// 		const reg = new RegExp('^\\s{' + indent + '}');
// 		source = source
// 			.split(/\n|\r|(?:\r\n)/)
// 			.map((v) => v.replace(reg, ''))
// 			.join('\n');
// 	}
// 	source = source.trim()
// 	let i = 0;
// 	const analysis = [];
// 	console.log('analysisForString', source);

// 	return /^\s*</.test(source) ? analysisForMarkupCode(source, i, analysis) : analysisForSourceCode(source, i, analysis);
// }

export { analysisForString }

export function analysisForElement(element) {
	if (!element.codes) {
		const firstChild = element.firstChild;
		if (firstChild) {
			const codes = analysisForString(firstChild.nodeValue.replace(/^\s+|\s+$/g, ''), element.getAttribute('code'));
			element.codes = codes;
			const ol = createElement(codes);
			element.replaceChild(ol, firstChild);
		} else {
			const codes = analysisForString(element.innerText + '', element.getAttribute('code'));
			element.codes = codes;
			const ol = createHtml(codes);
			element.innerHTML = ol;
		}
		element.setAttribute('code', '');
		if (getComputedStyle(element).getPropertyValue('display') === 'none') {
			element.style.display = 'block';
		}

	}
	return element;
}

export function analysisForTagName(tagname) {
	const elements = document.getElementsByTagName(tagname)
	for (let k = 0, len = elements.length; k < len; k++) {
		const script = elements[k]
		if (script.src) {
			continue;
		}
		analysisForElement(script)
	}
	return elements;
}
