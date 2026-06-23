(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/index/common/vendor"],{

/***/ 1848:
/*!******************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/mixins/skuSelect.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _store = __webpack_require__(/*! @/api/store.js */ 112);
var _order = __webpack_require__(/*! @/api/order.js */ 113);
var _login = __webpack_require__(/*! @/libs/login.js */ 37);
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
var _default = {
  data: function data() {
    return {
      attr: {
        cartAttr: false,
        productAttr: [],
        productSelect: {}
      },
      productValue: []
    };
  },
  created: function created() {},
  methods: {
    updateFun: function updateFun(e, num) {
      if (e.cartNum) {
        this.tempArr.forEach(function (item) {
          if (item.id == e.id) {
            item.cart_num = e.cartNum;
          }
        });
        // 只有门店页面过来时调用
        if (num) {
          this.getCartNum();
        }
      }
    },
    /**
     * 默认选中属性
     *
     */
    DefaultSelect: function DefaultSelect() {
      var productAttr = this.attr.productAttr;
      var value = [];
      for (var key in this.productValue) {
        if (this.productValue[key].stock > 0) {
          value = this.attr.productAttr.length ? key.split(",") : [];
          break;
        }
      }
      for (var i = 0; i < productAttr.length; i++) {
        this.$set(productAttr[i], "index", value[i]);
      }
      //sort();排序函数:数字-英文-汉字；
      var productSelect = this.productValue[value.join(",")];
      this.$set(this.attr.productSelect, "store_name", this.storeName);
      if (productSelect && productAttr.length) {
        this.$set(this.attr.productSelect, "image", productSelect.image);
        this.$set(this.attr.productSelect, "price", productSelect.price);
        this.$set(this.attr.productSelect, "stock", productSelect.stock);
        this.$set(this.attr.productSelect, "unique", productSelect.unique);
        this.$set(this.attr.productSelect, "cart_num", 1);
        this.$set(this.attr.productSelect, 'vip_price', productSelect.vip_price);
        this.$set(this, "attrValue", value.join(","));
      } else if (!productSelect && productAttr.length) {
        this.$set(this.attr.productSelect, "image", this.storeInfo.image);
        this.$set(this.attr.productSelect, "price", this.storeInfo.price);
        this.$set(this.attr.productSelect, "stock", 0);
        this.$set(this.attr.productSelect, "unique", "");
        this.$set(this.attr.productSelect, "cart_num", 0);
        this.$set(this, "attrValue", "");
        this.$set(this.attr.productSelect, 'vip_price', this.storeInfo.vip_price);
      } else if (!productSelect && !productAttr.length) {
        this.$set(this.attr.productSelect, "image", this.storeInfo.image);
        this.$set(this.attr.productSelect, "price", this.storeInfo.price);
        this.$set(this.attr.productSelect, "stock", this.storeInfo.stock);
        this.$set(this.attr.productSelect, "unique", this.storeInfo.unique || "");
        this.$set(this.attr.productSelect, "cart_num", 1);
        this.$set(this, "attrValue", "");
        this.$set(this.attr.productSelect, 'vip_price', this.storeInfo.vip_price);
      }
    },
    /**
     * 属性变动赋值
     *
     */
    ChangeAttr: function ChangeAttr(res) {
      var productSelect = this.productValue[res];
      if (productSelect && productSelect.stock >= 0) {
        this.$set(this.attr.productSelect, "image", productSelect.image);
        this.$set(this.attr.productSelect, "price", productSelect.price);
        this.$set(this.attr.productSelect, "stock", productSelect.stock);
        this.$set(this.attr.productSelect, "unique", productSelect.unique);
        this.$set(this.attr.productSelect, 'vip_price', productSelect.vip_price);
        this.$set(this.attr.productSelect, "cart_num", 1);
        this.$set(this, "attrValue", res);
      } else {
        this.$set(this.attr.productSelect, 'image', this.storeInfo.image);
        this.$set(this.attr.productSelect, 'price', this.storeInfo.price);
        this.$set(this.attr.productSelect, 'stock', 0);
        this.$set(this.attr.productSelect, 'unique', '');
        this.$set(this.attr.productSelect, 'cart_num', 0);
        this.$set(this.attr.productSelect, 'vip_price', this.storeInfo.vip_price);
        this.$set(this, 'attrValue', '');
      }
    },
    attrVal: function attrVal(val) {
      this.$set(this.attr.productAttr[val.indexw], 'index', this.attr.productAttr[val.indexw].attr_values[val.indexn]);
    },
    /**
     * 购物车手动填写
     *
     */
    iptCartNum: function iptCartNum(e) {
      this.$set(this.attr.productSelect, 'cart_num', e);
    },
    onMyEvent: function onMyEvent() {
      this.$set(this.attr, 'cartAttr', false);
    },
    // 改变多属性购物车
    ChangeCartNumDuo: function ChangeCartNumDuo(changeValue) {
      //获取当前变动属性
      var productSelect = this.productValue[this.attrValue];
      //如果没有属性,赋值给商品默认库存
      if (productSelect === undefined && !this.attr.productAttr.length) productSelect = this.attr.productSelect;
      //无属性值即库存为0；不存在加减；
      if (productSelect === undefined) return;
      var stock = productSelect.stock || 0;
      var num = this.attr.productSelect;
      this.ChangeCartNum(changeValue, num, stock, 1);
    },
    // 改变单属性购物车
    ChangeCartNumDan: function ChangeCartNumDan(changeValue, index, item) {
      var num = this.tempArr[index];
      var stock = this.tempArr[index].stock;
      this.ChangeCartNum(changeValue, num, stock, 0, item.id);
    },
    ChangeSubDel: function ChangeSubDel(event) {
      var that = this,
        list = that.cartData.cartList,
        ids = [];
      list.forEach(function (item) {
        ids.push(item.id);
      });
      (0, _order.cartDel)(ids.join(",")).then(function (res) {
        that.$set(that.cartData, 'cartList', []);
        that.cartData.iScart = false;
        that.totalPrice = 0.00;
        that.page = 1;
        that.loadend = false;
        that.tempArr = [];
        that.productslist();
        that.getCartNum();
      });
    },
    ChangeOneDel: function ChangeOneDel(id, index) {
      var that = this,
        list = that.cartData.cartList;
      (0, _order.cartDel)(id.toString()).then(function (res) {
        list.splice(index, 1);
        if (!list.length) {
          that.cartData.iScart = false;
          that.page = 1;
          that.loadend = false;
          that.tempArr = [];
          that.productslist();
        }
        ;
        that.getCartNum();
      });
    },
    // 多规格加入购物车；
    goCatNum: function goCatNum() {
      this.goCat(1, this.id, 1);
    },
    closeList: function closeList(e) {
      this.$set(this.cartData, 'iScart', e);
    },
    // 已经加入购物车时的购物加减；
    ChangeCartList: function ChangeCartList(changeValue, index) {
      var list = this.cartData.cartList;
      var num = list[index];
      var stock = list[index].trueStock;
      this.ChangeCartNum(changeValue, num, stock, 0, num.product_id, index, 1);
      if (!list.length) {
        this.cartData.iScart = false;
        this.page = 1;
        this.loadend = false;
        this.tempArr = [];
        this.productslist();
      }
    },
    // 购物车加减计算函数
    ChangeCartNum: function ChangeCartNum(changeValue, num, stock, isDuo, id, index, cart) {
      if (changeValue) {
        num.cart_num++;
        if (num.cart_num > stock) {
          if (isDuo) {
            this.$set(this.attr.productSelect, "cart_num", stock ? stock : 1);
            this.$set(this, "cart_num", stock ? stock : 1);
          } else {
            num.cart_num = stock ? stock : 0;
            this.$set(this, 'tempArr', this.tempArr);
            this.$set(this.cartData, 'cartList', this.cartData.cartList);
          }
          return this.$util.Tips({
            title: "该产品没有更多库存了"
          });
        } else {
          if (!isDuo) {
            if (cart) {
              this.goCat(0, id, 1, 1, num.product_attr_unique);
              this.getTotalPrice();
            } else {
              this.goCat(0, id, 1);
            }
          }
        }
      } else {
        num.cart_num--;
        if (num.cart_num == 0) {
          this.cartData.cartList.splice(index, 1);
          if (isDuo) {
            this.$set(this.attr.productSelect, "cart_num", 1);
            this.$set(this, "cart_num", 1);
          }
        }
        if (num.cart_num < 0) {
          if (isDuo) {
            this.$set(this.attr.productSelect, "cart_num", 1);
            this.$set(this, "cart_num", 1);
          } else {
            num.cart_num = 0;
            this.$set(this, 'tempArr', this.tempArr);
            this.$set(this.cartData, 'cartList', this.cartData.cartList);
          }
        } else {
          if (!isDuo) {
            if (cart) {
              this.goCat(0, id, 0, 1, num.product_attr_unique);
              this.getTotalPrice();
            } else {
              this.goCat(0, id, 0);
            }
          }
        }
      }
      this.tempArr.forEach(function (item) {
        if (item.id == id) {
          item.cart_num = num.cart_num;
        }
      });
    },
    /*
     * 加入购物车
     */
    goCat: function goCat(duo, id, type, cart, unique) {
      var that = this;
      if (duo) {
        var productSelect = that.productValue[this.attrValue];
        //如果有属性,没有选择,提示用户选择
        console.log(productSelect);
        if (that.attr.productAttr.length && productSelect === undefined) {
          return that.$util.Tips({
            title: "产品库存不足，请选择其它属性"
          });
        }
      }
      var q = {
        product_id: id,
        num: duo ? that.attr.productSelect.cart_num : 1,
        type: type,
        unique: duo ? that.attr.productSelect.unique : cart ? unique : ""
      };
      (0, _store.postCartNum)(q).then(function (res) {
        if (duo) {
          that.attr.cartAttr = false;
          // that.page = 1;
          // that.loadend = false;
          that.tempArr.forEach(function (item, index) {
            if (item.id == that.id) {
              var arrtStock = that.attr.productSelect.stock;
              var objNum = parseInt(item.cart_num) + parseInt(that.attr.productSelect.cart_num);
              item.cart_num = objNum > arrtStock ? arrtStock : objNum;
            }
          });
          // that.productslist();
        }

        that.$util.Tips({
          title: res.msg
        });
        that.getCartNum();
        if (!cart) {
          that.getCartList(1);
        }
      }).catch(function (err) {
        return that.$util.Tips({
          title: err
        });
      });
    },
    goCartDuo: function goCartDuo(item, num) {
      if (!this.isLogin) {
        (0, _login.toLogin)();
      } else {
        if (item.cart_button == 0) {
          if (item.is_presale_product) {
            uni.navigateTo({
              url: "/pages/activity/goods_details/index?id=".concat(item.id, "&type=6")
            });
          } else {
            //num:表示从首页点击进来的
            var page1 = "/pages/goods_details/index?id=".concat(item.id, "&fromType=1");
            var page2 = "/pages/goods_details/index?id=".concat(item.id);
            uni.navigateTo({
              url: num ? page2 : page1
            });
          }
        } else {
          this.storeName = item.store_name;
          this.getAttrs(item.id);
          this.$set(this, 'id', item.id);
          this.$set(this.attr, 'cartAttr', true);
        }
      }
    },
    // 点击默认单属性购物车
    goCartDan: function goCartDan(item, index, num) {
      if (!this.isLogin) {
        (0, _login.toLogin)();
      } else {
        if (item.cart_button == 0) {
          if (item.is_presale_product) {
            uni.navigateTo({
              url: "/pages/activity/goods_details/index?id=".concat(item.id, "&type=6")
            });
          } else {
            uni.navigateTo({
              url: "/pages/goods_details/index?id=".concat(item.id, "&fromType=1")
            });
          }
        } else {
          this.tempArr[index].cart_num = 1;
          // num表示从门店过来的；
          // if(num){
          // 	this.$store.commit('indexData/setCartNum', parseInt(this.cartNum)+1)
          // }
          this.$set(this, 'tempArr', this.tempArr);
          this.goCat(0, item.id, 1);
        }
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1861:
/*!******************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/static/images/f.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/common/vendor.js.map