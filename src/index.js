// src/index.js
import { analysisForString, analysisForElement, analysisForTagName } from './analysis.js';
// import { createElement, createHtml } from './utils/domUtils.js';
function code(element, indent) {
    if (!element) {
        return [
            ...analysisForTagName('code'),
            ...analysisForTagName('pre'),
            ...analysisForTagName('script'),
            ...analysisForTagName('xmp')
        ];
    } else {
        if (element instanceof Node) {
            return analysisForElement(element);
        } else {
            return analysisForString(element.toString(), indent);
        }
    }
}

if (document.currentScript.hasAttribute('code')) {
    console.log(code())
}

export default code;
