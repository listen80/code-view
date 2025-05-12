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
    if (element) {
      if (element instanceof HTMLElement) {
        if (element.tagName === 'CODE' || element.tagName === 'PRE' || element.tagName === 'SCRIPT' || element.tagName === 'XMP') {
          return analysisForElement(element);
        }
      }
      return analysisForString(element + '', indent);
    } else {
      return null;
    }

  }
}

if (document.currentScript.hasAttribute('code')) {
  console.log(code())
}

export default code;
