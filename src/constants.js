// src/utils/constants.js
const origin = 'break,case,catch,const,continue,debugger,default,delete,do,else,extends,finally,for,if,import,in,instanceof,let,new,return,super,switch,throw,try,typeof,var,void,while,with'

const javaKeywords = 'abstract,assert,boolean,break,byte,case,catch,char,class,const,continue,default,do,double,else,enum,extends,final,finally,float,for,goto,if,implements,import,instanceof,int,interface,long,native,new,package,private,protected,public,return,short,static,strictfp,super,switch,synchronized,this,throw,throws,transient,try,void,volatile,while'

export const keywords = javaKeywords.split(',');

export const variable = ['var', 'let', 'const'];
export const parameter = ['self', 'this', 'argument'];
export const normal = [
	'prototype',
	'module',
	'window',
	'document',
	'history',
	'location',
	'screen',
	'console',
	'Object',
	'Array',
	'Number',
	'Boolean',
	'String',
	'RegExp',
	'Math',
];

export const cssKeys = 'align-content,align-items,align-self,...'.split(',');
export const cssValues = 'red,blue,yellow,green,...'.split(',');

export const tagnames = 'a,abbr,address,area,...'.split(',');
