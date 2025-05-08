// src/utils/helpers.js
export function inArray(value, arr) {
	for (let x = 0, len = arr.length; x < len; x++) {
		if (arr[x] === value) {
			return true;
		}
	}
	return false;
}

export function isSpace(token) {
	return token && /[\v\t ]/.test(token);
}

export function isNewLine(token) {
	return token === '\n' || token === '\r';
}

export function isHex(token) {
	return token && /[0-9A-Fa-f]/.test(token);
}

export function isNumber(token) {
	return token && /[0-9]/.test(token);
}

export function isPunctuation(token) {
	return '~`!@#$%^&*()-_+=[]{}\\;:\'"|,.<>/?'.indexOf(token) !== -1;
}

export function isLetter(token) {
	return token && /[a-zA-Z_]/.test(token);
}

export function isHtmlLetter(token) {
	return isLetter(token) || token === '-';
}

export function isLogistic(token) {
	return '$!+-=*%&|^<>'.indexOf(token) !== -1;
}
