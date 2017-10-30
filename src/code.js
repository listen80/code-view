! function(document) {
    var space = 'space',
        line = 'line',
        dark = 'dark',
        italic = ' i',
        white = 'white',
        purple = 'purple',
        gold = 'gold',
        red = 'red',
        green = 'green',
        yellow = 'yellow',
        ryan = 'ryan';

    var token, style, cache, match, i, analysis;

    var styles = getComputedStyle(document.createElement('div'))
    
    var keywords = "if,for,else,continue,switch,return,while,break,throw,new,do,typeof,try,catch,abstract,assert,extends,finally,final,implements,import,instanceof,interface,native,package,strictfp,super,synchronized,throws,transient".split(',');

    var tags = 'a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,nav,object,ol,optgroup,option,p,pre,progress,q,s,samp,script,section,select,small,span,strong,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,tr,u,ul,video'.split(',');

    var cssValue = 'rgba,rgb,auto,left,right,center,pointer,none,border-box,middle,normal,content-box,thin,dotted,solid,hidden,opacity,visibility,fixed,underline,translateX,translateY,translateZ,transform,relative,table,both,block,url,bold,transparent,absolute,inline-block,inline,top,bottom'.split(',');

    function push() {
        analysis.push([cache, style])
    }

    function isSpace() {
        return token && /[\v\t ]/.test(token)
    }

    function isNewLine() {
        return token === '\n' || token === '\r';
    }

    function isHex() {
        return token && /[0-9A-Fa-f]/.test(token);
    }

    function isNumber() {
        return token && /[0-9]/.test(token)
    }

    function isPunctuation() {
        return "~`!@#$%^&*()-_+=[]{}\\;:'\"|,.<>/?".indexOf(token) !== -1;
    }

    function isLetter() {
        return token && /[a-zA-Z_]/.test(token);
    }

    function isHtmlLetter() {
        return isLetter() || token === '-';
    }

    function isLogistic() {
        return "$!+-=*%&|^<>".indexOf(token) !== -1;
    }

    function isKeyword() {
        return keywords.indexOf(cache) !== -1;
    }

    function isConstant() {
        return ['null', 'true', 'false', 'undefined'].indexOf(cache) !== -1;
    }

    function isVariable() {
        return cache === 'var' || cache === 'let' || cache === 'const';
    }

    function isParameter() {
        return cache === 'self' || cache === 'this' || cache === 'argument';
    }

    function isNormal() {
        return ['module', 'window', 'document', 'history', 'location', 'screen', 'console', 'Object', 'Array', 'Number', 'Boolean', 'String', 'RegExp', 'Math'].indexOf(cache) !== -1;
    }

    function getHex() {
        style = purple;
        cache = token;
        while (true) {
            token = source[++i];
            if (isHex()) {
                cache += token;
            } else {
                break;
            }
        }
    }

    function getNumber() {
        cache = token;
        while (true) {
            token = source[++i];
            if (isNumber()) {
                cache += token;
            } else if (token === '.') {
                cache += token;
                while (true) {
                    token = source[++i];
                    if (isNumber()) {
                        cache += token;
                    } else {
                        break;
                    }
                }
                break;
            } else {
                break;
            }
        }
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

    function getHtmlWord() {
        cache = token;
        while (true) {
            token = source[++i];
            if (isHtmlLetter() || isNumber()) {
                cache += token;
            } else {
                break;
            }
        }
    }

    function isTargetName() {
        return tags.indexOf(cache) !== -1;
    }

    function isStyleKey() {
        return styles.hasOwnProperty(cache) || styles.hasOwnProperty(cache.replace(/^-(webkit|moz|ms|o)-/, ''));
    }

    function isCssValue() {
        return cssValue.indexOf(cache.replace(/^-(webkit|moz|ms|o)-/, '')) !== -1;
    }

    function handle(style) {
        analysis.push([token, style])
        i++;
    }

    function handleSpace() {
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

    function AnalysisForCSSCode() {

        while (true) {
            token = source[i];
            if (!token) {
                break;
            } else if (token === '/' && source[i + 1] === '*') {
                cache = '/*';
                i += 2;

                while (true) {
                    token = source[i];
                    if (!token) {
                        cache && push();
                        break;
                    } else if (token === '*' && source[i + 1] === '/') {
                        cache += '*/';
                        push();
                        i += 2;
                        break;
                    } else if (isNewLine()) {
                        style = dark;
                        cache && push();
                        handle(line);
                        cache = '';
                    } else {
                        cache += token;
                        i++;
                    }
                }
            } else if (token === '.' || token === '#') {
                match = token;
                i++;
                token = source[i];
                if (isHtmlLetter()) {
                    getHtmlWord();
                    style = green;
                    cache = match + cache;
                    push();
                } else {
                    style = white;
                    cache = match;
                    push();
                }
            } else if (token === '[') {
                handle(white);
                while (true) {
                    token = source[i]
                    if (!token || isNewLine()) {
                        break;
                    } else if (token === ']') {
                        handle(white);
                        break;
                    } else if (isHtmlLetter()) {
                        getHtmlWord();
                        style = green;
                        push();
                    } else if (isSpace()) {
                        handleSpace();
                    } else if (token === '=') {
                        handle(red);
                        while (true) {
                            token = source[i];
                            if (!token || isNewLine() || token === ']') {
                                break;
                            } else if (isSpace()) {
                                handleSpace();
                            } else if (token === '"' || token === "'") {
                                match = cache = token;
                                style = yellow;
                                i++;
                                while (true) {
                                    token = source[i]
                                    if (!token || isNewLine()) {
                                        cache && push();
                                        break;
                                    } else if (token === match) {
                                        cache += token;
                                        push();
                                        i++;
                                        break;
                                    } else {
                                        cache += token;
                                        i++;
                                    }
                                }
                            } else if (isHtmlLetter()) {
                                getHtmlWord();
                                style = yellow;
                                push();
                            } else {
                                handle(white);
                            }
                        }
                    } else {
                        cache = token;
                        style = white;
                        push();
                        i++;
                    }
                }
            } else if (isNewLine()) {
                handle(line);
            } else if (token === ':') {
                handle(white);
                while (true) {
                    token = source[i];
                    if (!token) {
                        break;
                    } else if (isSpace()) {
                        handleSpace();
                    } else if (isNewLine()) {
                        handle(line);
                        break;
                    } else if (isHtmlLetter()) {
                        getHtmlWord();
                        if (isCssValue()) {
                            style = ryan;
                            push();
                        } else {
                            style = white;
                            push();
                        }
                    } else if (isNumber() || token === '.') {
                        getNumber();
                        style = purple;
                        push();
                        // hanldeNumber();
                        // px em %
                        if (token === '%') {
                            handle(red);
                        } else if (token === 's') {
                            handle(red);
                        } else if (token === 'p' && source[i + 1] === 'x') {
                            cache = 'px';
                            style = red;
                            push();
                            i += 2;
                        } else if (token === 'e' && source[i + 1] === 'm') {
                            cache = 'em';
                            style = red;
                            push();
                            i += 2;
                        }
                    } else if (token === ';') {
                        handle(white);
                        break;
                    } else if (token === '#') {
                        cache = match = token;
                        i++;
                        token = source[i];
                        if (isHex()) {
                            getHex();
                            cache = match + cache;
                            style = purple;
                            push();
                        } else {
                            style = white;
                            push();
                            i++;
                        }
                    } else if (token === '#') {
                        cache = match = token;
                        i++;
                        token = source[i];
                        if (isHex()) {
                            getHex();
                            cache = match + cache;
                            style = purple;
                            push();
                        } else {
                            style = white;
                            push();
                            i++;
                        }
                    } else {
                        // ( ) ,
                        handle(white);
                    }
                }
            } else if (isSpace()) {
                handleSpace();
            } else if (isHtmlLetter()) {
                getHtmlWord();
                if (isTargetName()) {
                    style = red;
                    push();
                } else if (isStyleKey()) {
                    style = ryan + italic;
                    push();
                } else {
                    style = white;
                    push();
                }
            } else if (token === '*') {
                handle(red);
            } else if (token === '@') {
                cache = token;
                style = red;
                i++;
                while (true) {
                    token = source[i];
                    if (!token || isNewLine()) {
                        cache && push();
                        break;
                    } else if (token === '{') {
                        push();
                        break;
                    } else {
                        cache += token;
                        i++;
                    }
                }
            } else {
                handle(white);
            }
        }

        return analysis;
    }

    function AnalysisForMarkupCode() {

        function handleWord() {
            // tag attribute (name) = value
            style = green;
            cache = token;
            while (token = source[++i]) {
                if (isHtmlLetter() || isNumber()) {
                    cache += token;
                } else {
                    push();
                    break;
                }
            }

            while (true) {
                token = source[i];
                if (isNewLine()) {
                    handle(line);
                } else if (isSpace()) {
                    handleSpace()
                } else {
                    break;
                }
            }

            if (token === '=') {
                cache = token;
                // tag attribute name (=) value
                style = white;
                i++;
                push();

                if (isSpace()) {
                    handleSpace()
                }
                token = source[i];
                if (token === '"' || token === "'") {
                    // attribute value
                    style = yellow;
                    match = cache = token;
                    while (token = source[++i]) {
                        if (token === match) {
                            cache += token;
                            push();
                            i++;
                            break;
                        } else if (isNewLine()) {
                            push();
                            style = line;
                            cache = token;
                            i++;
                            push()
                        } else {
                            cache += token;
                        }
                    }
                } else {
                    if (!(!token || isNewLine() || token === '>')) {
                        style = yellow;
                        cache = token;
                        while (true) {
                            token = source[++i];
                            if (!token || isNewLine() || token === '>' || token === ' ') {
                                push();
                                break;
                            } else {
                                cache += token;
                            }
                        }
                    }
                }
            }
        }

        function handleInnerTag() {
            var endIndex = source.indexOf('</' + matchTag + '>', i);
            if (endIndex !== -1 && endIndex > i) {
                var preSource = source;
                source = source.substring(i, endIndex);
                i = 0;
                if (matchTag === 'style') {
                    AnalysisForCSSCode();
                } else {
                    AnalysisForSourceCode();
                }
                source = preSource;
                i = endIndex;
            }
        }

        var matchTag = '';
        var isEndTag = 0;
        while (true) {
            token = source[i]
            if (!token) {
                break;
            } else if (token === '<') {
                if (source[i + 1] === '!') {
                    if (source[i + 2] === '-' && source[i + 3] === '-') {
                        cache = '<!--';
                        style = dark;
                        i += 4;
                        while (true) {
                            token = source[i]
                            if (!token) {
                                cache && push();
                            } else if (token === '-' && source[i + 1] === '-' && source[i + 2] === '>') {
                                cache += '-->';
                                push();
                                i += 3;
                                break;
                            } else if (isNewLine()) {
                                cache && push();
                                handle(line);
                                cache = '';
                            } else {
                                cache += token;
                                i++;
                            }
                        }
                        continue;
                    }
                }

                handle(white);
                token = source[i]

                if (token === '!' || token === '?') {
                    handle(white);
                } else if (token === '/') {
                    handle(white);
                    isEndTag = 1;
                } else {
                    isEndTag = 0;
                }

                token = source[i]
                if (isHtmlLetter()) {
                    // tag name
                    getHtmlWord();
                    if (isEndTag) {
                        matchTag = '';
                    } else {
                        matchTag = cache;
                    }
                    style = red;
                    push();                    
                    while (token = source[i]) {
                        if (token === '>') {
                            // tag end
                            handle(white);
                            if (matchTag === 'script' || matchTag === 'style') {
                                handleInnerTag()
                            }
                            break;
                        } else if (isSpace()) {
                            handleSpace();
                        } else if (token === '"' || token === "'") {
                            // attribute value
                            style = yellow;
                            cache = match = token;
                            while (token = source[++i]) {
                                if (token === match) {
                                    cache += token;
                                    i++;
                                    push();
                                    break;
                                } else {
                                    cache += token;
                                }
                            }
                        } else if (isHtmlLetter() || isNumber()) {
                            // tag inner word
                            handleWord();
                        } else if (isPunctuation()) {
                            // for 
                            handle(white);
                        } else if (isNewLine()) {
                            handle(line);
                        } else {
                            handle('fail');
                        }
                    }
                }
            } else if (isNewLine()) {
                handle(line);
            } else if (isSpace()) {
                handleSpace();
            } else {
                // inner html
                style = white;
                cache = token;
                while (true) {
                    token = source[++i]
                    if (!token || isNewLine() || token === '<') {
                        push();
                        break;
                    } else {
                        cache += token;
                    }
                }
            }
        }
        return analysis;
    }

    function AnalysisForSourceCode() {

        function isRegExp() {
            var _i;
            if(token === '/') {
                _i = i;
                while (true) {
                    token = source[--_i];
                    if (isSpace()) {
                        continue;
                    } else if (token === '=' || token === ':' || token === '(' || token === '|' || token === '?' || isNewLine() || !token) {
                        _i = i
                        while (token = source[++_i]) {
                            if (isNewLine() || !token) {
                                break;
                            } else if (token === '\\') {
                                _i++;
                                continue
                            } else if (token === "/") {
                                return 1;
                            } else {
                                continue;
                            }
                        }
                        break;
                    } else {
                        break;
                    }
                }
            }
        }

        function handlePunctuation() {
            if (token === '/' && source[i + 1] === '*') {
                cache = '/*';
                i += 2;

                while (true) {
                    token = source[i];
                    if (!token) {
                        cache && push();
                        break;
                    } else if (token === '*' && source[i + 1] === '/') {
                        cache += '*/';
                        push();
                        i += 2;
                        break;
                    } else if (isNewLine()) {
                        style = dark;
                        cache && push();
                        handle(line);
                        cache = '';
                    } else {
                        cache += token;
                        i++;
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
                i++;
            } else if (token === "'" || token === '"') {
                match = cache = token;
                while (true) {
                    token = source[++i];
                    if (!token || isNewLine()) {
                        cache && push();
                        break;
                    } else if (token === '\\') {
                        style = yellow;
                        push();
                        cache = token + source[++i];
                        style = purple;
                        push();
                        cache = '';
                    } else if (token === match) {
                        cache += token;
                        style = yellow;
                        push();
                        break;
                    } else {
                        cache += token;
                    }
                }
                i++;
            } else if (token === '/' || isLogistic()) {
                match = isRegExp();
                if (match === 1) {
                    cache = '/';
                    style = 'yellow hehe';
                    push();
                    i++;
                    while (true) {
                        token = source[i];
                        if (!token || isNewLine()) {
                            cache && push();
                        } else if (token === '\\') {
                            style = purple;
                            cache = token + source[++i];
                            push();
                            i++;
                        } else if (token === "/") {
                            style = yellow;
                            cache = token;
                            push();
                            i++;
                            cache = '';
                            while (token = source[i]) {
                                if ('gi'.indexOf(token) !== -1) {
                                    style = red;
                                    cache += token;
                                    i++;
                                } else {
                                    break;
                                }
                                cache && push();
                            }
                            break;
                        } else if (isLogistic()) {
                            handle(red);
                        } else if (isLetter()) {
                            style = yellow;
                            getWord();
                            push();
                            cache = '';
                        } else {
                            handle(yellow);
                        }
                    }
                } else {
                    // logic
                    style = red;
                    cache = source[i];
                    while (token = source[++i]) {
                        if (isLogistic()) {
                            cache += token;
                        } else {
                            push();
                            break;
                        }
                    }
                }
            } else {
                handle(white);
            }

        }

        function hanldeNumberAndHex() {
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
                hanldeNumber()
            }
        }


        while (true) {
            token = source[i];
            if (!token) {
                break;
            } else if (isSpace()) {
                handleSpace();
            } else if (isNewLine()) {
                handle(line);
            } else if (isNumber()) {
                hanldeNumberAndHex();
            } else if (isLetter()) {
                getWord();
                if (cache === 'function') {
                    style = ryan + italic;
                    push();
                    if (isSpace()) {
                        handleSpace();
                    }
                    if (isLetter()) {
                        getWord();
                        style = green;
                        push();
                        if (isSpace()) {
                            handleSpace();
                        }
                    }
                    if (token === '(') {
                        handle(white)
                        while (true) {
                            token = source[i];
                            if (isSpace()) {
                                handleSpace();
                            } else if (token === ',') {
                                handle(white)
                            } else if (isLetter()) {
                                getWord();
                                style = gold + italic;
                                push();
                            } else {
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
                    } else if (isNormal()) {
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
                                    handleSpace();
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
            } else {
                handle('fail');
            }
        }
        return analysis;
    }

    function AnalysisFor(s) {
        source = s;i = 0,analysis = [];
        return /^\s*</.test(s) ? AnalysisForMarkupCode() : AnalysisForSourceCode()
    }

    function AnalysisForElement(script) {
        if (!script.code) {
            script.code = true;
            var firstChild = script.firstChild;
            if (firstChild) {
                console.time();
                var codes = AnalysisFor(firstChild.nodeValue.replace(/^\s+|\s+$/g, ""));
                console.timeEnd();
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
                console.timeEnd();
                setTimeout(console.timeEnd)
            }
        }
    }

    function AnalysisForTagName(tagname) {
        var scripts = document.body.getElementsByTagName(tagname);
        for (var k = 0, len = scripts.length; k < len; k++) {
            var script = scripts[k];
            script.hasAttribute('code') && AnalysisForElement(script);
        }
    }

    function code(element) {
        if (!element) {
            AnalysisForTagName('xmp');
            AnalysisForTagName('script');
        } else {
            if (element instanceof Node) {
                element.setAttribute('code', ''), AnalysisForElement(element);
            } else {
                return AnalysisFor(element.toString());
            }
        }
    }

    if (typeof module !== 'undefined') {
        module.exports = code;
    } else {
        this.code = code;
    }

    document && setTimeout(document.body && code);

}(this.document)