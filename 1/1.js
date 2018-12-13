! function() {

    function registry(list, handler) {
        list.forEach(function(lang) { registry[lang] = handler })
    }

    registry(
        ['default-markup', 'html'], [{
                reg: /^(<!)(\w+)/,
                matches: ['white', 'red'],
                next: 'tag-inner',
            }, {
                reg: /^<!--[\S\s]*?-->/,
                matches: 'comment',
            },
            {
                reg: /^(<\/?)(style\b)/,
                matches: ['tag-start white style', 'tag-name red'],
                next: 'style',
            },
            {
                reg: /^(<\/?)(\w+)/,
                matches: ['tag-start white', 'tag-name red'],
                next: 'tag-inner',
            },
            {
                reg: /^\s+/,
                matches: 'space',
            },
            {
                reg: /^[^<]+/,
                matches: 'html-plain white',
            },
        ]
    )

    registry(
        ['tag-inner'], [{
                reg: /^\s+/,
                matches: 'space',
            },
            {
                reg: /^([-:\w]+\s*)(=)?(\s*\"[^\"]*\"?|\'[^\']*\')?/,
                matches: ['atv green', 'white', 'yellow'],
            },
            {
                reg: /^\/?>/,
                matches: 'tag-end white',
                end: true,
            },
            {
                reg: /^\/?>/,
                fn: function(key) {
                    return getComputedStyle(document.body).hasOwnProperty(key)
                },
                matches: 'tag-end white',
                end: true,
            },
        ]
    )

    registry(
        ['style'], [{
                reg: /^[^<]+/,
                matches: 'namesssss',
            }, {
                reg: /^.[\w-]+/,
                matches: 'name',
            },
            {
                reg: /^([-:\w]+\s*)(=)?(\s*\"[^\"]*\"?|\'[^\']*\')?/,
                matches: ['atv green', 'white', 'yellow'],
            },
            {
                reg: /^(<\/)(style)(>)/,
                matches: 'tag-end white',
                end: true,
            },
        ]
    )




    function pretty(source, lang) {
        var el = null,
            result = []

        function analyse(patterns, a) {
            while (source) {
                var match_result
                for (var i = 0, patterns_len = patterns.length; i < patterns_len; i++) {
                    var pattern = patterns[i]
                    match_result = source.match(pattern.reg);
                    if (match_result) {
                        var matched = match_result[0]
                        source = source.substr(matched.length)
                        var match_len = match_result.length
                        if (match_len > 1) {
                            for (var j = 1; j < match_len; j++) {
                                match_result[j] && a.push([pattern.matches[j - 1], match_result[j]])
                            }
                        } else {
                            a.push([pattern.matches, matched])
                        }

                        if (patterns[i].next) {
                            console.log([pattern.next])
                            analyse(registry[pattern.next], a)
                            break
                        } else if (pattern.end) {
                            return
                        } else {
                            break
                        }
                    }
                }
                if (!match_result) {
                    a.push(['ssss', source[0]])
                    source = source.substr(1)
                }
            }
        }

        if (!source) {
            return Array.from(document.getElementsByTagName('script')).map(function(el) {
                return el.hasAttribute('code') && pretty(el)
            })
        } else {
            if (source instanceof Node) {
                el = source, source = source.innerHTML.trim()
            } else if (typeof source !== 'string') {
                throw 'error input'
            }

            analyse(registry[lang || el.getAttribute('code') || (/^\s*</.test(source) ? 'default-markup' : 'default-code')], result)

            if (el) {
                el.parentNode.replaceChild(makeElement(result), el)
            }
            return result
        }
    }

    function makeElement(result) {
        var pre = document.createElement('pre')
        pre.setAttribute('code', '')
        pre.innerHTML = result.map(function(v) { return '<span class="' + v[0] + '">' + v[1].replace(/</g, "&lt;") + '</span>' }).join('')
        return pre
    }

    window.pretty = pretty
}();