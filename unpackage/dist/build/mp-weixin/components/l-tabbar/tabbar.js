(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/l-tabbar/tabbar"],{"07a2":function(t,n,e){},"513e":function(t,n,e){"use strict";e.r(n);var u=e("bb67"),a=e.n(u);for(var i in u)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return u[t]}))}(i);n["default"]=a.a},"7b55":function(t,n,e){"use strict";e.r(n);var u=e("f622"),a=e("513e");for(var i in a)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("a363");var o=e("828b"),r=Object(o["a"])(a["default"],u["b"],u["c"],!1,null,"592c9581",null,!1,u["a"],void 0);n["default"]=r.exports},a363:function(t,n,e){"use strict";var u=e("07a2"),a=e.n(u);a.a},bb67:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={options:{virtualHost:!0},props:{bgColor:{type:String,default:"#fff"},placeholder:{type:Boolean,default:!0}},computed:{getTabbarStyle:function(){return"\n                background: ".concat(this.bgColor,";\n            ")}},mounted:function(){this.getHeight()},data:function(){return{fuHeight:0}},methods:{getHeight:function(){var n=this;this.placeholder&&this.$nextTick((function(){var e=t.createSelectorQuery().in(n);e.select("#tabbarId").boundingClientRect((function(t){n.fuHeight=t.height+"px"})).exec()}))}}};n.default=e}).call(this,e("df3c")["default"])},f622:function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){}));var u=function(){var t=this.$createElement;this._self._c},a=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/l-tabbar/tabbar-create-component',
    {
        'components/l-tabbar/tabbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("7b55"))
        })
    },
    [['components/l-tabbar/tabbar-create-component']]
]);
