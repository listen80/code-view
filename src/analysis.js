// src/utils/analysis.js
import { analysisForMarkupCode } from './parse/markupAnalysis.js';
import { analysisForSourceCode } from './parse/sourceAnalysis.js';
import { analysisForString } from './parse/analysisForString.js';
import { createElement, createHtml } from './utils/domUtils.js';

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
			const { ast, lan } = analysisForString(firstChild.nodeValue.replace(/^\s+|\s+$/g, ''), element.getAttribute('code'));
			element.codes = ast;
			element.setAttribute('code', lan);
			const ol = createElement(ast);
			element.replaceChild(ol, firstChild);
		} else {
			const { ast, lan } = analysisForString(element.innerText + '', element.getAttribute('code'));
			element.codes = ast;
			element.setAttribute('code', lan);
			const ol = createHtml(ast);
			element.innerHTML = ol;
		}
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
