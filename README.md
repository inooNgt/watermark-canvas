# Canvas 前端水印

### How To Use

```js
watermark.init({
  text: "watermark-username"
});
```

### Options

- container 容器, defalut:document.body
- width canvas 宽度, defalut:"240px"
- height canvas 高度, defalut:"120px"
- x 开始绘制文字的 x 坐标, defalut:10
- y 开始绘制文字的 y 坐标, defalut:100
- textAlign 文字对齐方式, defalut:"left"
- textBaseline Baseline 对齐方式, defalut:"middle"
- text 水印文字, defalut:"username"
- font 字体, defalut:"14px PingFang SC RegularMicrosoft Yahei"
- color 文字颜色, defalut:"rgba(0 0 0 0.25)"
- rotate 旋转角度, defalut:"30"
- zIndex z-index 数值
- observe 使用 MutationObserver 检测 dom 被修改时重新绘制水印, defalut:true

### License

MIT
