# codejs

## 优点

1. 简单 语法简单易懂
2. 极速 超过绝大数引擎
3. 小巧 zip 后不足 2KB

## 例子

[HTML + JS + CSS 混杂](https://listen80.github.io/code-view/examples/)  
[解析jQuery](https://listen80.github.io/code-view/examples/jquery.html)  
[解析highcharts](https://listen80.github.io/code-view/examples/escape.html)  
[范例](https://listen80.github.io/code-view/examples/easy.html)

## 用法

### xmp,script 标签上加 code 属性

```
<xmp code>
<html>
  <body>
    <div>
      <p>test</p>
    </div>
  </body>
<html>
</xmp>
```

```
<script code type="js">
  var a = 10;
  var b = function() {};
</script>
```

## 安装

引入 js 文件

```html
<script type="text/javascript" src="code.js"></script>
```

## 用法

### 数据

```js
var data = {
  "name": "北京市",
  "city": [
      "东城区",
      "西城区",
      "崇文区",
      "宣武区",
      "朝阳区",
      "丰台区",
      "石景山区",
      "海淀区",
      "门头沟区",
      "房山区",
      "通州区",
      "顺义区",
      "昌平区",
      "大兴区",
      "平谷区",
      "怀柔区",
      "密云县",
      "延庆县"
    ]
  }
}
var html = lt('test')(data)
```

### 模版

```html
<div>
  {if $d.name}
  <ul>
    {for $d.city}
    <li>{$i + 1} : {$v}</li>
    {/for}
  </ul>
  {/if}
</div>
```
