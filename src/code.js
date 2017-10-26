! function(context, document) {
    var space = 'space';
    var purple = 'purple';
    var gold = 'gold';
    var red = 'red';
    var white = 'white';
    var dark = 'dark';
    var line = 'line';
    var green = 'green';
    var yellow = 'yellow';
    var ryan = 'ryan';
    var italic = ' i';

    function codeForString(source, extension) {

        // for a single token
        function isNewLine() {
            return token === '\n' || token === '\r';
        }

        function isSpace() {
            return token === ' ' || token === '\t';
        }

        function isLetter() {
            return token && /[a-zA-Z_]/.test(token);
        }

        function isNumber() {
            return token && /[0-9]/.test(token);
        }

        function isHex() {
            return token && /[0-9A-Fa-f]/.test(token);
        }

        function isPunctuation() {
            return "~`!@#$%^&*()-_+=[]{}\\;:'\"|,.<>/?".indexOf(token) !== -1;
        }

        function isLogistic() {
            return "$!+-=*/%&|^<>".indexOf(token) !== -1;
        }

        // for cache
        function isKeyword() {
            return ['for', 'if', 'else', 'continue', 'switch', 'return', 'while', 'break', 'do', 'typeof', 'abstract', 'assert', 'extends', 'finally', 'final', 'implements', 'import', 'instanceof', 'interface', 'native', 'package', 'strictfp', 'super', 'synchronized', 'throws', 'transient', 'try', 'catch'].indexOf(cache) !== -1;
        }

        function isConstant() {
            return ['null', 'true', 'false', 'undefined'].indexOf(cache) !== -1;
        }

        function isFunction() {
            return cache === 'function';
        }

        function isVariable() {
            return cache === 'var' || cache === 'let' || cache === 'const';
        }

        function isParameter() {
            return cache === 'self' || cache === 'this' || cache === 'argument';
        }

        function isPublicFunc() {
            return ['module', 'window', 'document', 'history', 'location', 'screen', 'console', 'Object', 'Array', 'Number', 'Boolean', 'String', 'RegExp', 'Math'].indexOf(cache) !== -1;
        }

        // todo        
        function isRegExp() {
            var is = 0;
            if (token === "/") {
                j = i;
                while (token = source[++j]) {
                    if (isNewLine()) {
                        break;
                    } else if (token === '\\') {
                        j++;
                    } else if (token === "/") {
                        j = i;
                        while (true) {
                            token = source[--j];
                            if (isNewLine()) {
                                is = 1;
                                break;
                            } else if (isPunctuation()) {
                                is = 1;
                                break;
                            } else if (isNumber()) {
                                break;
                            } else if (!token) {
                                is = 1;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            return is;
        }

        // push cache
        function push() {
            analysis.push([cache, style]);
            cache = '', style = '';
        }

        var analysis = [];

        var token;
        var i = 0;

        var cache = '';
        var style = '';

        var match;

        source = Object(source);

        function handlePunctuation() {
            style = white;
            cache = token;
            if (token === '/' && source[i + 1] === '*') {
                cache = '/*', i++;
                style = dark;
                while (true) {
                    token = source[++i];
                    if (!token) {
                        push();
                        break;
                    } else if (token === '*' && source[i + 1] === '/') {
                        cache += '*/', i++;
                        push();
                        break;
                    } else if (isNewLine()) {
                        push();
                        cache = token;
                        style = line;
                        push();
                        style = dark;
                    } else {
                        cache += token;
                    }
                }
            } else if (token === '/' && source[i + 1] === '/') {
                cache = '//', i++;
                style = dark;
                while (true) {
                    token = source[++i];
                    if (!token) {
                        push();
                        break;
                    } else if (isNewLine()) {
                        push();
                        cache = token;
                        style = line;
                        push();
                        break;
                    } else {
                        cache += token;
                    }
                }
            } else if (token === "'" || token === '"') {
                match = cache = token;
                while (true) {
                    token = source[++i];
                    if (!token) {
                        push();
                        break;
                    } else if (token === '\\') {
                        style = yellow;
                        push();
                        cache += token + source[++i];
                        style = purple;
                        push();
                    } else if (token === match) {
                        cache += token;
                        style = yellow;
                        push();
                        break;
                    } else {
                        cache += token;
                    }
                }
            } else if (isLogistic()) {

                match = isRegExp();
                if (match === 1) {
                    style = yellow;
                    cache = "/";
                    push();
                    while (true) {
                        token = source[++i];
                        if (token === '\\') {
                            style = purple;
                            cache = token + source[++i];
                            push();
                        } else if (token === "/") {
                            style = yellow;
                            cache = "/";
                            push();
                            match = 0;
                            while (token = source[i + 1]) {
                                if ('gi'.indexOf(token) !== -1) {
                                    style = red;
                                    cache += token;
                                    match = 1;
                                    i++;
                                } else {
                                    break;
                                }
                            }
                            if (match) {
                                push();
                            }
                            break;
                        } else if (isLogistic()) {
                            style = red;
                            cache = token;
                            push();
                        } else if (isLetter()) {
                            style = yellow;
                            cache = token;
                            while (token = source[i + 1]) {
                                if (isLetter()) {
                                    cache += token;
                                    i++;
                                } else {
                                    break;
                                }
                            }
                            push();
                        } else {
                            style = yellow;
                            cache += token;
                            push();
                        }
                    }
                } else {
                    // logic
                    style = red;
                    cache = source[i];
                    while (token = source[i + 1]) {
                        if (isLogistic()) {
                            cache += token;
                            i++;
                        } else {
                            push();
                            break;
                        }
                    }
                }
            } else {
                cache = token;
                style = white;
                push();
            }
        }

        function hanldeSpace() {
            style = space;
            cache = token;
            while (true) {
                token = source[++i];
                if (isSpace()) {
                    cache += token;
                } else {
                    push();
                    break;
                }
            }
        }

        function hanldeNumber() {
            style = purple;
            cache = token;
            if (token === '0' && (source[i + 1] === 'x' || source[i + 1] === 'X')) {
                // oxabc十六进制
                cache += source[++i];
                while (true) {
                    token = source[++i];
                    if (isHex()) {
                        cache += token;
                    } else {
                        push();
                        break;
                    }
                }
            } else {
                while (true) {
                    token = source[++i];
                    if (isNumber()) {
                        cache += token;
                    } else {
                        push();
                        break;
                    }
                }
            }
        }

        function hanldeNewLine() {
            cache = token;
            style = line;
            push();
            i++;
        }

        function getWord() {
            cache = token;
            while (true) {
                token = source[++i];
                if (isLetter() || isNumber()) {
                    cache += token;
                } else {
                    break;
                }
            }
        }

        while (true) {
            token = source[i];
            if (!token) {
                break;
            } else if (isSpace()) {
                hanldeSpace();
            } else if (isNewLine()) {
                hanldeNewLine();
            } else if (isNumber()) {
                hanldeNumber();
            } else if (isLetter()) {
                getWord();
                if (isFunction()) {
                    style = ryan + italic;
                    push();

                    if(isSpace()) {
                        hanldeSpace();
                    }

                    if(isLetter()) {
                        getWord();
                        style = green;
                        push();
                        if(isSpace()) {
                            hanldeSpace();
                        }
                    }

                    if (token === '(') {
                        style = white;
                        cache = token;
                        i++;
                        push();
                        while(true) {
                            token = source[i];
                            if (isSpace()) {
                                hanldeSpace();
                            } else if (token === ',') {
                                style = white;
                                cache = token;
                                push();
                                i++;
                            } else if (isLetter()) {
                                // function parameter 
                                getWord();
                                style = gold + italic;
                                push();
                            } else {
                                // nothing
                                break;
                            }
                        }
                    }
                } else {
                    if (isVariable()) {
                        style = ryan + italic;
                    } else if (isKeyword()) {
                        style = red;
                    } else if (isParameter()) {
                        style = gold + italic;
                    } else if (isPublicFunc()) {
                        style = ryan;
                    } else if (isConstant()) {
                        style = purple;
                    } else {
                        style = white;
                        if (token === '(') {
                            style = ryan;
                        } else if (isSpace()) {
                            while (true) {
                                token = source[i + 1];
                                if (isSpace()) {
                                    hanldeSpace();
                                } else if (token === '(') {
                                    style = ryan;
                                    break;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                    push();
                }
            } else if (isPunctuation()) {
                handlePunctuation();
                i++;
            } else {
                cache = token;
                style = 'fail';
                push();
                i++;
            }
        }
        return analysis;
    }

    function codeForElement(script, extension) {
        if (!script.code) {
            script.code = true;
            var firstChild = script.firstChild;
            if (firstChild) {
                var codes = codeForString(
                    firstChild.nodeValue.replace(/^\s+|\s+$/g, ""),
                    extension || script.getAttribute('code')
                );
                var ol = document.createElement('ol');
                var li = document.createElement('li');
                var count = 0;
                for (var x = 0, len = codes.length; x < len; x++) {
                    var code = codes[x];
                    var span = document.createElement('span');
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
                script.replaceChild(ol, firstChild);
                script.style.display = 'block';
            }
        }
    }

    function code(element, extension) {
        if (!element) {
            var scripts = document.body.getElementsByTagName('script');
            for (var k = 0, len = scripts.length; k < len; k++) {
                var script = scripts[k];
                script.hasAttribute('code') && codeForElement(script, extension);
            }
        } else {
            if (element instanceof Node) {
                element.setAttribute('code', '');
                codeForElement(element, extension);
            } else {
                return codeForString(element.toString(), extension);
            }
        }
    }

    if (typeof module !== 'undefined') {
        module.exports = code;
    } else {
        this.code = code;
        code();
    }

}(this, this.document);