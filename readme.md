# code-view

## 优点

1. 专精 极高的还原 sublime 主题
2. 极速 超过绝大数引擎
3. 小巧 min 后 js 16KB, css 1KB

## 例子

[HTML + JS + CSS 混杂](https://listen80.github.io/code-view/examples/demo.html)  
[解析 jQuery](https://listen80.github.io/code-view/examples/?jquery)  
[解析 vue](https://listen80.github.io/code-view/examples/?vue)  
[解析 react](https://listen80.github.io/code-view/examples/?react)  
[解析 twitter-bootstrap](https://listen80.github.io/code-view/examples/?twitter-bootstrap)

## 安装

引入 js 文件

```html
<link rel="stylesheet" href="https://listen80.github.io/code-view/src/code.css" />
<script type="text/javascript" src="https://listen80.github.io/code-view/src/code.js"></script>
```

## 用法

### xmp,script 标签上加 code 属性

下面这段代码既会**执行**，又会**高亮**

```html
<script type="text/javascript" code>
  var a = 10;
  var b = function() {};
</script>
```
