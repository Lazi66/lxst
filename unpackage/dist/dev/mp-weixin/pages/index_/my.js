(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/index_/my"],{

/***/ 100:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/index_/my.vue?vue&type=template&id=6ce52bf6&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    lTopbar: function () {
      return __webpack_require__.e(/*! import() | components/l-topbar/topbar */ "components/l-topbar/topbar").then(__webpack_require__.bind(null, /*! @/components/l-topbar/topbar.vue */ 1354))
    },
    uvIcon: function () {
      return Promise.all(/*! import() | node-modules/@climblee/uv-ui/components/uv-icon/uv-icon */[__webpack_require__.e("common/vendor"), __webpack_require__.e("node-modules/@climblee/uv-ui/components/uv-icon/uv-icon")]).then(__webpack_require__.bind(null, /*! @climblee/uv-ui/components/uv-icon/uv-icon.vue */ 1361))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 = !_vm.userInfo.uid ? _vm.$t("请点击登录") : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 101:
/*!*******************************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/index_/my.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./my.vue?vue&type=script&lang=js& */ 102);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 102:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/index_/my.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _user = __webpack_require__(/*! @/api/user.js */ 42);
var _public = __webpack_require__(/*! @/api/public.js */ 54);
var _login = __webpack_require__(/*! @/libs/login.js */ 37);
var _vuex = __webpack_require__(/*! vuex */ 39);
var _dayjsMin = _interopRequireDefault(__webpack_require__(/*! @/plugin/dayjs/dayjs.min.js */ 103));
var _routine = _interopRequireDefault(__webpack_require__(/*! @/libs/routine */ 53));
var _color = _interopRequireDefault(__webpack_require__(/*! @/mixins/color */ 59));
var _index = __webpack_require__(/*! @/utils/index.js */ 56);
var _cache = _interopRequireDefault(__webpack_require__(/*! @/utils/cache */ 47));
var _app = __webpack_require__(/*! @/config/app */ 44);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var MainMenu = function MainMenu() {
  __webpack_require__.e(/*! require.ensure | pages/index_/menu */ "pages/index_/menu").then((function () {
    return resolve(__webpack_require__(/*! ./menu.vue */ 1379));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var pageFooter = function pageFooter() {
  Promise.all(/*! require.ensure | components/pageFooter/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/pageFooter/index")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/pageFooter/index.vue */ 1386));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var sysHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
var app = getApp();
var editUserModal = function editUserModal() {
  Promise.all(/*! require.ensure | components/eidtUserModal/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/eidtUserModal/index")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/eidtUserModal/index.vue */ 1411));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    MainMenu: MainMenu,
    pageFooter: pageFooter,
    editUserModal: editUserModal
  },
  // computed: mapGetters(['isLogin','cartNum']),
  computed: _objectSpread({}, (0, _vuex.mapGetters)({
    cartNum: 'cartNum',
    isLogin: 'isLogin'
  })),
  filters: {
    coundTime: function coundTime(val) {
      var setTime = val * 1000;
      var nowTime = new Date();
      var rest = setTime - nowTime.getTime();
      var day = parseInt(rest / (60 * 60 * 24 * 1000));
      // var hour = parseInt(rest/(60*60*1000)%24) //小时
      return day + this.$t('day');
    },
    dateFormat: function dateFormat(value) {
      return (0, _dayjsMin.default)(value * 1000).format('YYYY-MM-DD');
    }
  },
  mixins: [_color.default],
  data: function data() {
    return {
      imgHost: _app.HTTP_REQUEST_URL,
      type: 0,
      list: [{
        name: '全部',
        icon: '/static/images/w/Group 286@3x.png',
        page: '/pages/goods/order_list/index'
      }, {
        name: '待付款',
        icon: '/static/images/w/Frame@3x(1).png',
        page: '/pages/goods/order_list/index?status=0'
      }, {
        name: '待发货',
        icon: '/static/images/w/Group 287@3x.png',
        page: '/pages/goods/order_list/index?status=1'
      }, {
        name: '待收货',
        icon: '/static/images/w/Group 283@3x.png',
        page: '/pages/goods/order_list/index?status=2'
      }, {
        name: '待评价',
        icon: '/static/images/w/Frame@3x.png',
        page: '/pages/goods/order_list/index?status=3'
      }],
      editModal: false,
      // 编辑头像信息
      storeMenu: [],
      // 商家管理
      orderMenu: [{
        img: 'icon-daifukuan',
        title: '待付款',
        url: '/pages/goods/order_list/index?status=0'
      }, {
        img: 'icon-daifahuo',
        title: '待发货',
        url: '/pages/goods/order_list/index?status=1'
      }, {
        img: 'icon-daishouhuo',
        title: '待收货',
        url: '/pages/goods/order_list/index?status=2'
      }, {
        img: 'icon-daipingjia',
        title: '待评价',
        url: '/pages/goods/order_list/index?status=3'
      }, {
        img: 'icon-a-shouhoutuikuan',
        title: '售后/退款',
        url: '/pages/users/user_return_list/index'
      }],
      imgUrls: [],
      autoplay: true,
      circular: true,
      interval: 3000,
      duration: 500,
      isAuto: false,
      //没有授权的不会自动授权
      isShowAuth: false,
      //是否隐藏授权
      orderStatusNum: {},
      userInfo: {},
      MyMenus: [],
      sysHeight: sysHeight,
      mpHeight: 0,
      showStatus: 1,
      activeRouter: '',
      pageHeight: '100%',
      routineContact: 0,
      footerSee: false,
      my_menus_status: 0,
      business_status: 0,
      member_style: 0,
      my_banner_status: 0,
      is_diy: uni.getStorageSync('is_diy'),
      configData: _cache.default.get('BASIC_CONFIG') || {}
    };
  },
  onLoad: function onLoad(option) {
    uni.hideTabBar();
    var that = this;

    // 小程序静默授权
    if (!this.$store.getters.isLogin) {
      // Routine.getCode()
      // 	.then(code => {
      // 		Routine.silenceAuth(code).then(res => {
      // 			this.onLoadFun();
      // 		})
      // 	})
      // 	.catch(res => {
      // 		uni.hideLoading();
      // 	});
    }
    var routes = getCurrentPages(); // 获取当前打开过的页面路由数组
    var curRoute = routes[routes.length - 1].route; //获取当前页面路由
    this.activeRouter = '/' + curRoute;
  },
  onReady: function onReady() {
    var self = this;
    var info = uni.createSelectorQuery().select('.sys-head');
    info.boundingClientRect(function (data) {
      //data - 各种参数
      if (data) {
        self.mpHeight = data.height;
      }
    }).exec();
  },
  onShow: function onShow() {
    var that = this;
    if (that.isLogin) {
      this.getUserInfo();
      this.setVisit();
    }
    this.getMyMenus();
    this.getCopyRight();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.onLoadFun();
  },
  methods: {
    toUrl: function toUrl(url) {
      if (!url) return;
      uni.navigateTo({
        url: url
      });
    },
    getWechatuserinfo: function getWechatuserinfo() {},
    editSuccess: function editSuccess() {
      this.editModal = false;
      this.getUserInfo();
    },
    closeEdit: function closeEdit() {
      this.editModal = false;
    },
    // 记录会员访问
    setVisit: function setVisit() {
      (0, _user.setVisit)({
        url: '/pages/user/index'
      }).then(function (res) {});
    },
    // 打开授权
    openAuto: function openAuto() {
      (0, _login.toLogin)();
    },
    // 授权回调
    onLoadFun: function onLoadFun() {
      this.getUserInfo();
      this.getMyMenus();
      this.setVisit();
    },
    Setting: function Setting() {
      uni.openSetting({
        success: function success(res) {}
      });
    },
    // 授权关闭
    authColse: function authColse(e) {
      this.isShowAuth = e;
    },
    // 绑定手机
    bindPhone: function bindPhone() {
      uni.navigateTo({
        url: '/pages/users/user_phone/index'
      });
    },
    getphonenumber: function getphonenumber(e) {
      var _this = this;
      if (e.detail.errMsg == 'getPhoneNumber:ok') {
        _routine.default.getCode().then(function (code) {
          var data = {
            code: code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData
          };
          (0, _user.mpBindingPhone)(data).then(function (res) {
            _this.getUserInfo();
            _this.$util.Tips({
              title: res.msg,
              icon: 'success'
            });
          }).catch(function (err) {
            return _this.$util.Tips({
              title: err
            });
          });
        }).catch(function (error) {
          uni.hideLoading();
        });
      }
    },
    /**
     * 获取个人用户信息
     */
    getUserInfo: function getUserInfo() {
      var that = this;
      (0, _user.getUserInfo)().then(function (res) {
        that.userInfo = res.data;
        that.$store.commit('SETUID', res.data.uid);
        that.orderMenu.forEach(function (item, index) {
          switch (item.title) {
            case '待付款':
              item.num = res.data.orderStatusNum.unpaid_count;
              break;
            case '待发货':
              item.num = res.data.orderStatusNum.unshipped_count;
              break;
            case '待收货':
              item.num = res.data.orderStatusNum.received_count;
              break;
            case '待评价':
              item.num = res.data.orderStatusNum.evaluated_count;
              break;
            case '售后/退款':
              item.num = res.data.orderStatusNum.refunding_count;
              break;
          }
        });
        uni.stopPullDownRefresh();
      });
    },
    //小程序授权api替换 getUserInfo
    getUserProfile: function getUserProfile() {
      (0, _login.toLogin)();
    },
    /**
     *
     * 获取个人中心图标
     */
    switchTab: function switchTab(order) {
      this.orderMenu.forEach(function (item, index) {
        switch (item.title) {
          case '待付款':
            item.img = order.dfk;
            break;
          case '待发货':
            item.img = order.dfh;
            break;
          case '待收货':
            item.img = order.dsh;
            break;
          case '待评价':
            item.img = order.dpj;
            break;
          case '售后/退款':
            item.img = order.sh;
            break;
        }
      });
    },
    getMyMenus: function getMyMenus() {
      var _this2 = this;
      var that = this;
      // if (this.MyMenus.length) return;
      (0, _user.getMenuList)().then(function (res) {
        _this2.member_style = Number(res.data.diy_data.value);
        _this2.my_banner_status = res.data.diy_data.my_banner_status;
        _this2.my_menus_status = res.data.diy_data.my_menus_status;
        _this2.business_status = res.data.diy_data.business_status;
        var storeMenu = [];
        var myMenu = [];
        res.data.routine_my_menus.forEach(function (el, index, arr) {
          if (el.url == '/pages/admin/order/index' || el.url == '/pages/admin/order_cancellation/index' || el.name == '客服接待') {
            storeMenu.push(el);
          } else {
            myMenu.push(el);
          }
        });
        var order01 = {
          dfk: 'icon-daifukuan',
          dfh: 'icon-daifahuo',
          dsh: 'icon-daishouhuo',
          dpj: 'icon-daipingjia',
          sh: 'icon-a-shouhoutuikuan'
        };
        var order02 = {
          dfk: 'icon-daifukuan-lan',
          dfh: 'icon-daifahuo-lan',
          dsh: 'icon-daishouhuo-lan',
          dpj: 'icon-daipingjia-lan',
          sh: 'icon-shouhou-tuikuan-lan'
        };
        var order03 = {
          dfk: 'icon-daifukuan-ju',
          dfh: 'icon-daifahuo-ju',
          dsh: 'icon-daishouhuo-ju',
          dpj: 'icon-daipingjia-ju',
          sh: 'icon-shouhou-tuikuan-ju'
        };
        var order04 = {
          dfk: 'icon-daifukuan-fen',
          dfh: 'icon-daifahuo-fen',
          dsh: 'icon-daishouhuo-fen',
          dpj: 'icon-daipingjia-fen',
          sh: 'icon-a-shouhoutuikuan-fen'
        };
        var order05 = {
          dfk: 'icon-daifukuan-lv',
          dfh: 'icon-daifahuo-lv',
          dsh: 'icon-daishouhuo-lv',
          dpj: 'icon-daipingjia-lv',
          sh: 'icon-shouhou-tuikuan-lv'
        };
        switch (res.data.diy_data.order_status) {
          case 1:
            _this2.switchTab(order01);
            break;
          case 2:
            _this2.switchTab(order02);
            break;
          case 3:
            _this2.switchTab(order03);
            break;
          case 4:
            _this2.switchTab(order04);
            break;
          case 5:
            _this2.switchTab(order05);
            break;
        }
        that.$set(that, 'MyMenus', myMenu);
        that.$set(that, 'storeMenu', storeMenu);
        _this2.imgUrls = res.data.routine_my_banner;
        _this2.routineContact = Number(res.data.routine_contact_type);
      });
    },
    // 编辑页面
    goEdit: function goEdit() {
      if (this.isLogin == false) {
        (0, _login.toLogin)();
      } else {
        uni.navigateTo({
          url: '/pages/users/user_info/index'
        });
      }
    },
    // 签到
    goSignIn: function goSignIn() {
      uni.navigateTo({
        url: '/pages/users/user_sgin/index'
      });
    },
    goPages: function goPages(url) {
      this.$util.JumpPath(url);
    },
    // goMenuPage
    goMenuPage: function goMenuPage(url, name) {
      if (this.isLogin) {
        if (url.indexOf('http') === -1) {
          if (name && name === '联系客服') {
            return (0, _index.getCustomer)(url);
          }
          if (url != '#' && url == '/pages/users/user_info/index') {
            uni.openSetting({
              success: function success(res) {}
            });
          }
          uni.navigateTo({
            url: url,
            fail: function fail(err) {
              uni.switchTab({
                url: url
              });
            }
          });
        } else {
          uni.navigateTo({
            url: "/pages/annex/web_view/index?url=".concat(url)
          });
        }
      } else {
        this.openAuto();
      }
    },
    goRouter: function goRouter(item) {
      var pages = getCurrentPages();
      var page = pages[pages.length - 1].$page.fullPath;
      if (item.link == page) return;
      uni.switchTab({
        url: item.link,
        fail: function fail(err) {
          uni.redirectTo({
            url: item.link
          });
        }
      });
    },
    getCopyRight: function getCopyRight() {
      var copyRight = uni.getStorageSync('copyRight');
      if (copyRight.copyrightImage) {
        this.copyRightPic = copyRight.copyrightImage;
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 104:
/*!****************************************************************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/index_/my.vue?vue&type=style&index=0&id=6ce52bf6&scoped=true&lang=less& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_style_index_0_id_6ce52bf6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--10-oneOf-1-3!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./my.vue?vue&type=style&index=0&id=6ce52bf6&scoped=true&lang=less& */ 105);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_style_index_0_id_6ce52bf6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_style_index_0_id_6ce52bf6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_style_index_0_id_6ce52bf6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_style_index_0_id_6ce52bf6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_style_index_0_id_6ce52bf6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 105:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/index_/my.vue?vue&type=style&index=0&id=6ce52bf6&scoped=true&lang=less& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 97:
/*!*************************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/main.js?{"page":"pages%2Findex_%2Fmy"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _my = _interopRequireDefault(__webpack_require__(/*! ./pages/index_/my.vue */ 98));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_my.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 98:
/*!******************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/index_/my.vue ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _my_vue_vue_type_template_id_6ce52bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./my.vue?vue&type=template&id=6ce52bf6&scoped=true& */ 99);
/* harmony import */ var _my_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./my.vue?vue&type=script&lang=js& */ 101);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _my_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _my_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _my_vue_vue_type_style_index_0_id_6ce52bf6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./my.vue?vue&type=style&index=0&id=6ce52bf6&scoped=true&lang=less& */ 104);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 68);

var renderjs





/* normalize component */

var component = Object(_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _my_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _my_vue_vue_type_template_id_6ce52bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _my_vue_vue_type_template_id_6ce52bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6ce52bf6",
  null,
  false,
  _my_vue_vue_type_template_id_6ce52bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/index_/my.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 99:
/*!*************************************************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/index_/my.vue?vue&type=template&id=6ce52bf6&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_template_id_6ce52bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./my.vue?vue&type=template&id=6ce52bf6&scoped=true& */ 100);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_template_id_6ce52bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_template_id_6ce52bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_template_id_6ce52bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_my_vue_vue_type_template_id_6ce52bf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ })

},[[97,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index_/my.js.map