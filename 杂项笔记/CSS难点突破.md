# CSS难点突破

## 元素展示格式

`display`

* `display:block`:对外显示为块级。
* `display:inline`:对外显示为内联。
* `display:inline-block`:对外显示为内联，但是可以设置宽高。

常见display标签代表：

* `div`：`block`类型
* `span`：`inline`类型
* `img`：`inline-block`类型

`white-space`

`text-overflow`

`overflow`

## 盒模型

在 CSS 中，所有的元素都被一个个的“盒子（box）”包围着，在 CSS 中我们广泛地使用两种“盒子” —— **块级盒子** (**block box**) 和 **内联盒子** (**inline box**)。

* 块级盒子（block box）
  * 占用父容器所有空间，一般而言，和父容器相同宽度。
  * 每个盒子自动换行。
  * `width`和`height`属性可以发挥作用。
  * `magin`、`border`、`padding`会将其它元素推开。
* 内联盒子（inline box）
  * 不会换行。
  * `width` 和`height`不起作用。
  * 垂直方向的`margin`、`border`、`padding`不会将别的元素推开，水平方向会。

css 的 box 模型有一个外部显示类型，来决定盒子是块级还是内联。盒模型还有内部显示类型，它决定了盒子内部元素是如何布局的。默认情况下是按照 **正常文档流**布局，也意味着它们和其他块元素以及内联元素一样。例如，对一个盒子，`display:block`，则盒子对外显示为块级盒子；`display:flex`设置为`flex`则对内显示为弹性盒子（Flexbox）。

例子如下：

```css
p, 
ul {
  border: 2px solid rebeccapurple;
  padding: .5em;
}

.block,
li {
  border: 2px solid blue;
  padding: .5em;
}

ul {
  display: flex;
  list-style: none;
}

.block {
  display: block;
}      
```

```html
<p>I am a paragraph. A short one.</p>

<ul>
  <li>Item One</li>
  <li>Item Two</li>
  <li>Item Three</li>
</ul>

<p>I am another paragraph. Some of the <span class="block">words</span> have been wrapped in a <span>span element</span>.</p>
```

**盒模型组成部分**

- **Content box**: 内容盒子。
- **Padding box**: 内边距。
- **Border box**: 边框。
- **Margin box**: 外边距。

![image-20221112144703235](./CSS%E9%9A%BE%E7%82%B9%E7%AA%81%E7%A0%B4.assets/image-20221112144703235.png)

#### 外边距（margin）

`margin`是四个子属性的总称，并且顺序是上右下左，如果写`magin: 3px 2px`则默认是上面使用3px，左右使用2px。

外边距是盒子周围一圈看不到的空间。它会把**其他元素**从盒子旁边**推开**。外边距属性值可以为正也可以为负。设置负值会导致和其他内容重叠。

* `margin-top`：为正数情况类似效果是原本的盒子 + 一个空白的等宽盒子在上面，但是总盒子的位置不变，表现出来就是下移
* `margin-button`：为正数情况和上面相反。值得注意的是，如果该盒子下面没有其它元素，看上去就好像没有效果一样。
* `margin-left`：原理同上。
* `margin-right`：原理同上。

#### 边框（border）

同`margin`一样，`border`也是四个属性值的总称，使用`border`可以添加框的宽度和高度。在标准盒子中，边框会向外挤，而在IE替代盒子中，边框会向内挤。

#### 内边距（padding）

内边距位于边框和内容区域之间。与外边距不同，您不能有负数量的内边距，所以值必须是 0 或正的值。应用于元素的任何背景都将显示在内边距后面，内边距通常用于将内容推离边框，注意，在**标准盒子**中，这里仍然体现为**对外挤**。

#### 实例

初学的时候,常常分不清`margin`和`padding`的挤有什么区别,下面可以给出一个例子来详细说明:

![image-20221112233549248](./CSS%E9%9A%BE%E7%82%B9%E7%AA%81%E7%A0%B4.assets/image-20221112233549248.png)

该图(`li`)的CSS布局代码如下:

```css
.navitems ul li a {
  display: block;
  height: 45px;
  line-height: 45px;
  font: size 16px;
  /* margin: 0 25px; */
  /* padding:0 25px; */
  background-color: red;
}
```

如果使用`margin`,则效果如下:

![image-20221112233819451](./CSS%E9%9A%BE%E7%82%B9%E7%AA%81%E7%A0%B4.assets/image-20221112233819451.png)

如果使用`padding`，则效果如下：

![image-20221112233849275](./CSS%E9%9A%BE%E7%82%B9%E7%AA%81%E7%A0%B4.assets/image-20221112233849275.png)

可以看出，`margin`是指内容不变，通过拓宽与其他盒子边界来推开其他盒子；`padding`是指将内容盒子到边框的内容按条件放大，从而达到推开其它盒子的结果。两者共同点是可以推开其它盒子。



### CSS布局

- 正常布局流

html的正常排版就是正常布局流，使用`display`、浮动、`position`属性、表格布局、多列布局可以修改正常布局流。

- `display`属性

一般用于设置元素的默认行为方式，一般而言，每一个元素都有一个默认的`display`值，例如`span`默认是`inline`。**值得注意的是**，除了上述三种布局，还有`flex`和`grid（网格）`值得学习。

- 弹性盒子

即应用`display:flex`，弹性盒子内部元素会整整齐齐排成一行，看上去十分智能，符合我们正常认知。

- Grid布局

即应用`display:grid`，通常使用Flexbox来设计横向或者纵向的布局，而Grid则用于同时在两个维度上将行和列排列整齐。效果就是会自动平均，像是表格一样。

![image-20221112154838939](./CSS%E9%9A%BE%E7%82%B9%E7%AA%81%E7%A0%B4.assets/image-20221112154838939.png)

- 浮动

即应用`display:float`，上述的`flex`和`grid`都有点呆板的味道，而`float`则可以改变元素原本的布局流，使得元素始终浮动到左侧或者右侧（从正常布局流中移除），这时候其他的周围内容就会在这个被设置浮动的元素周围环绕。

`float`属性有四个可能的值：

* 
  * `left` — 将元素浮动到左侧。	
  * `right` — 将元素浮动到右侧。
  * `none` — 默认值，不浮动。
  * `inherit` — 继承父元素的浮动属性。

常常使用功能如下是：将元素浮动在左侧，设置一个`margin-right`将其它元素推开，造成下面的效果：

![image-20221112155442301](./CSS%E9%9A%BE%E7%82%B9%E7%AA%81%E7%A0%B4.assets/image-20221112155442301.png)

- 定位技术

之前所学的都是已经设计好的模板，而定位技术则允许我们自己放置位置。定位 (positioning) 能够让我们把一个元素从它原本在正常布局流 (normal flow) 中应该在的位置移动到另一个位置。定位 (positioning) 并不是一种用来给你做主要页面布局的方式，它更像是让你去管理和微调页面中的一个特殊项的位置。

- **静态定位**（Static positioning）是每个元素默认的属性——它表示“将元素放在文档布局流的默认位置——没有什么特殊的地方”。

- **相对定位**（Relative positioning）允许我们相对于元素在正常的文档流中的位置移动它——包括将两个元素叠放在页面上。这对于微调和精准设计（design pinpointing）非常有用。

```css
.positioned {
  position: relative;
  top: 30px;
  left: 30px;
}
```

这里我们给中间段落的`position`一个 `relative`值——这属性本身不做任何事情，所以我们还添加了`top`和`left`属性，这里top和left的值是相对于原本的正常布局流的位置。

- **绝对定位**（Absolute positioning）将元素完全从页面的正常布局流（normal layout flow）中移出，类似将它单独放在一个图层中。我们可以将元素相对于页面的 `<html>` 元素边缘固定，或者相对于该元素的*最近被定位祖先元素*（nearest positioned ancestor element）。绝对定位在创建复杂布局效果时非常有用，例如通过标签显示和隐藏的内容面板或者通过按钮控制滑动到屏幕中的信息面板。

- **固定定位**（Fixed positioning）与绝对定位非常类似，但是它是将一个元素相对浏览器视口固定，而不是相对另外一个元素。这在创建类似在整个页面滚动过程中总是处于屏幕的某个位置的导航菜单时非常有用。
- **粘性定位**（Sticky positioning）是一种新的定位方式，它会让元素先保持和 `position: static` 一样的定位，当它的相对视口位置（offset from the viewport）达到某一个预设值时，它就会像 `position: fixed` 一样定位。

- CSS 表格布局
- 多列布局