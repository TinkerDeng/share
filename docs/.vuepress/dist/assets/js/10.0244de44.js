(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{175:function(t,a,s){"use strict";s.r(a);var n=s(0),r=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"插入排序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#插入排序","aria-hidden":"true"}},[t._v("#")]),t._v(" 插入排序")]),t._v(" "),s("h2",{attrs:{id:"_1-算法描述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-算法描述","aria-hidden":"true"}},[t._v("#")]),t._v(" 1 算法描述")]),t._v(" "),s("p",[t._v("插入排序的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。")]),t._v(" "),s("ul",[s("li",[t._v("从第一个元素开始，该元素可以认为已经被排序")]),t._v(" "),s("li",[t._v("取出下一个元素，在已经排序的元素序列中从后向前扫描")]),t._v(" "),s("li",[t._v("如果该元素（已排序）大于新元素，将该元素移到下一位置")]),t._v(" "),s("li",[t._v("重复步骤3，直到找到已排序的元素小于或者等于新元素的位置")]),t._v(" "),s("li",[t._v("将新元素插入到该位置后")]),t._v(" "),s("li",[t._v("重复步骤2-5")])]),t._v(" "),s("h2",{attrs:{id:"_2-算法图示"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-算法图示","aria-hidden":"true"}},[t._v("#")]),t._v(" 2 算法图示")]),t._v(" "),s("p",[s("img",{attrs:{src:"/sort/insertSort.gif",alt:"插入排序图示"}})]),t._v(" "),s("h2",{attrs:{id:"_3-代码实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-代码实现","aria-hidden":"true"}},[t._v("#")]),t._v(" 3 代码实现")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("insertSort")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" len "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" arr"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\n  "),s("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" preIndex"),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" current\n  "),s("span",{attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("1")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v(" len"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{attrs:{class:"token operator"}},[t._v("++")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    preIndex "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" i "),s("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("1")]),t._v("\n    current "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" arr"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("preIndex "),s("span",{attrs:{class:"token operator"}},[t._v(">=")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("0")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("&&")]),t._v(" arr"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("preIndex"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(" current"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      arr"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("preIndex "),s("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("1")]),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" arr"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("preIndex"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      preIndex"),s("span",{attrs:{class:"token operator"}},[t._v("--")]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    arr"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("preIndex "),s("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("1")]),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" current\n  "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" arr\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}],!1,null,null,null);r.options.__file="insertSort.md";a.default=r.exports}}]);