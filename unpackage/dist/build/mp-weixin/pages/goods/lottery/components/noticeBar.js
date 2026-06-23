require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/lottery/components/noticeBar"],{"45ef":function(t,n,e){"use strict";var a=e("6ab0"),i=e.n(a);i.a},"67d3":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={name:"noticeBar",data:function(){return{animateUp:!1,listData:JSON.parse(JSON.stringify(this.showMsg)),timer:null}},props:{showMsg:{type:Array}},mounted:function(){this.timer=setInterval(this.scrollAnimate,2500)},methods:{scrollAnimate:function(){var t=this;this.animateUp=!0,setTimeout((function(){t.listData.push(t.listData[0]),t.listData.shift(),t.animateUp=!1}),500)}},destroyed:function(){clearInterval(this.timer)}};n.default=a},"6ab0":function(t,n,e){},b6de:function(t,n,e){"use strict";e.r(n);var a=e("c7ef"),i=e("ce70");for(var r in i)["default"].indexOf(r)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(r);e("45ef");var s=e("828b"),o=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"303a5a66",null,!1,a["a"],void 0);n["default"]=o.exports},c7ef:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){}));var a=function(){var t=this.$createElement,n=(this._self._c,this.$t("恭喜您")),e=this.$t("获得");this.$mp.data=Object.assign({},{$root:{m0:n,m1:e}})},i=[]},ce70:function(t,n,e){"use strict";e.r(n);var a=e("67d3"),i=e.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(r);n["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/goods/lottery/components/noticeBar-create-component',
    {
        'pages/goods/lottery/components/noticeBar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("b6de"))
        })
    },
    [['pages/goods/lottery/components/noticeBar-create-component']]
]);
