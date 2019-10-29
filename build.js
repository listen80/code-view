const uglify = require('uglify-js');
const clean = require('clean-css');
const fs = require('fs');
const pack = require('./package.json');


// js
let js = fs.readFileSync('./src/code.js').toString();
const result = uglify.minify(js);
if(result.error) {
    console.log(result.error);
} else {
    fs.writeFileSync('./dist/code.js', result.code);
}


// css
let css = fs.readFileSync('./src/code.css').toString();
const min = new clean().minify(css);
if(min.errors.length) {
    console.log(min.errors);
} else {
    fs.writeFileSync('./dist/code.css', min.styles.toString());
}

let msg = `${pack.name} ${pack.version} is built @ ${new Date().toLocaleString()}`
console.log(msg);