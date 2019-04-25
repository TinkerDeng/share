(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{171:function(t,a,s){"use strict";s.r(a);var n=s(0),r=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"选择排序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#选择排序","aria-hidden":"true"}},[t._v("#")]),t._v(" 选择排序")]),t._v(" "),s("h2",{attrs:{id:"_1-算法描述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-算法描述","aria-hidden":"true"}},[t._v("#")]),t._v(" 1 算法描述")]),t._v(" "),s("p",[t._v("选择排序是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。")]),t._v(" "),s("p",[t._v("n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下：")]),t._v(" "),s("ul",[s("li",[t._v("初始状态：无序区为R[1...n]，有序区为空")]),t._v(" "),s("li",[t._v("第i趟排序(i=1,2,3,…,n-1)开始时，当前有序区和无序区分别为R[1,...,i-1]和R[i,...,n]。该趟排序从当前无序区中-选出关键字最小的记录R[k]，将它与无序区的第1个记录R交换，使R[1,...,i]和R[i+1,...,n]分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区")]),t._v(" "),s("li",[t._v("n-1趟结束，数组有序化了")])]),t._v(" "),s("h2",{attrs:{id:"_2-算法图示"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-算法图示","aria-hidden":"true"}},[t._v("#")]),t._v(" 2 算法图示")]),t._v(" "),s("p",[s("img",{attrs:{src:"/sort/selectSort.gif",alt:"选择排序图示"}})]),t._v(" "),s("h2",{attrs:{id:"_3-代码实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-代码实现","aria-hidden":"true"}},[t._v("#")]),t._v(" 3 代码实现")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("selectSort")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" len "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" arr"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\n  "),s("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" minIndex"),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" temp\n  "),s("span",{attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("0")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v(" len"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{attrs:{class:"token operator"}},[t._v("++")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    minIndex "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" i\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" j "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" i "),s("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("1")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j "),s("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v(" len"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),s("span",{attrs:{class:"token operator"}},[t._v("++")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v(" arr"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("minIndex"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        minIndex "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" j\n      "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    temp "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" arr"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    arr"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" arr"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("minIndex"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    arr"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("minIndex"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" temp\n  "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" arr\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}],!1,null,null,null);r.options.__file="selectSort.md";a.default=r.exports}}]);