require('./common/vendor.js');(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/w/ai"],{

/***/ 1207:
/*!********************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/main.js?{"page":"pages%2Fw%2Fai"} ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _ai = _interopRequireDefault(__webpack_require__(/*! ./pages/w/ai.vue */ 1208));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_ai.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 1208:
/*!*************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/ai.vue ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ai_vue_vue_type_template_id_f6170a8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ai.vue?vue&type=template&id=f6170a8e&scoped=true& */ 1209);
/* harmony import */ var _ai_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ai.vue?vue&type=script&lang=js& */ 1211);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ai_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ai_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _ai_vue_vue_type_style_index_0_id_f6170a8e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ai.vue?vue&type=style&index=0&id=f6170a8e&scoped=true&lang=less& */ 1213);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 68);

var renderjs





/* normalize component */

var component = Object(_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ai_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ai_vue_vue_type_template_id_f6170a8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ai_vue_vue_type_template_id_f6170a8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "f6170a8e",
  null,
  false,
  _ai_vue_vue_type_template_id_f6170a8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/w/ai.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1209:
/*!********************************************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/ai.vue?vue&type=template&id=f6170a8e&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_template_id_f6170a8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ai.vue?vue&type=template&id=f6170a8e&scoped=true& */ 1210);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_template_id_f6170a8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_template_id_f6170a8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_template_id_f6170a8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_template_id_f6170a8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 1210:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/ai.vue?vue&type=template&id=f6170a8e&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    lNav: function () {
      return __webpack_require__.e(/*! import() | components/l-nav/nav */ "components/l-nav/nav").then(__webpack_require__.bind(null, /*! @/components/l-nav/nav.vue */ 2001))
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
  var l0 = _vm.__map(_vm.messages, function (msg, index) {
    var $orig = _vm.__get_orig(msg)
    var m0 =
      msg.role == "assistant" &&
      msg.type == "conversation" &&
      msg.reasoning_content &&
      msg.reasoning_expanded
        ? _vm.formatText(msg.reasoning_content)
        : null
    var m1 =
      msg.role == "assistant" && msg.type == "conversation" && msg.content
        ? _vm.formatText(msg.content)
        : null
    return {
      $orig: $orig,
      m0: m0,
      m1: m1,
    }
  })
  var g0 =
    _vm.activeFunction === "chat" &&
    (_vm.uploadedImages.length > 0 || _vm.uploadedVideo || _vm.uploading)
  var m2 = _vm.getPlaceholder()
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        g0: g0,
        m2: m2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1211:
/*!**************************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/ai.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ai.vue?vue&type=script&lang=js& */ 1212);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1212:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/ai.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _api = __webpack_require__(/*! @/api/api.js */ 57);
var _app = _interopRequireDefault(__webpack_require__(/*! @/config/app.js */ 44));
var _vuex = __webpack_require__(/*! vuex */ 39);
var _login = __webpack_require__(/*! @/libs/login.js */ 37);
var _user = __webpack_require__(/*! @/api/user.js */ 42);
var _public = __webpack_require__(/*! @/api/public.js */ 54);
var _app2 = __webpack_require__(/*! @/config/app */ 44);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  computed: _objectSpread({}, (0, _vuex.mapGetters)(['isLogin'])),
  data: function data() {
    return {
      imgHost: _app2.HTTP_REQUEST_URL,
      active: 0,
      messages: [],
      inputMessage: '',
      loading: false,
      scrollTop: 0,
      isAtBottom: true,
      // 是否在底部
      scrollViewHeight: 0,
      // 滚动区域高度
      sessionId: '',
      activeFunction: 'chat',
      // chat, image, video
      // 分页相关
      page: 1,
      limit: 10,
      hasMore: true,
      loadingMore: false,
      aiQuestion: '',
      // 文件上传相关
      uploadedImages: [],
      // 上传的图片URL数组
      uploadedVideo: '',
      // 上传的视频URL
      uploading: false,
      // 上传中状态
      isChoosingFile: false,
      // 是否正在选择文件（用于避免onShow重复加载）
      // 个人用户信息
      userInfo: {},
      roleId: '',
      // 传递进来的AI员工ID
      roleDetail: null,
      // AI员工详情
      aiModelName: 'qwen3.5-plus' // 当前选择的模型名称
    };
  },
  onLoad: function onLoad(options) {
    var _this = this;
    // 生成会话ID
    this.sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    console.log('sessionId', this.sessionId);

    //AI员工
    if (options && options.id) {
      this.roleId = options.id;
      // 获取员工详情
      (0, _public.getAiRoleDetail)(this.roleId, this.sessionId).then(function (res) {
        if (res.status === 200 && res.data) {
          _this.roleDetail = res.data;
          _this.page = 1;
          _this.hasMore = true;
          _this.messages = [];
          _this.getHistoryMessages();
        }
      }).catch(function (err) {
        console.error('获取AI员工详情数据失败', err);
      });
    }

    // 初始化时添加系统消息
    this.page = 1;
    this.hasMore = true;
    this.getAiQuestion();

    // 获取算力配置（包含模型信息）
    this.loadComputePowerConfig();
  },
  onReady: function onReady() {
    var _this2 = this;
    // 获取滚动区域高度
    var query = uni.createSelectorQuery().in(this);
    query.select('.chat-list').boundingClientRect(function (data) {
      if (data) {
        _this2.scrollViewHeight = data.height;
      }
    }).exec();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    // 下拉刷新，重新加载第一页
    this.page = 1;
    this.hasMore = true;
    this.messages = [];
    this.getHistoryMessages();
    uni.stopPullDownRefresh();
  },
  onShow: function onShow() {
    if (!this.isLogin) {
      uni.showModal({
        title: '提示',
        content: '未登录，请先登录',
        showCancel: true,
        confirmText: '去登录',
        success: function success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            (0, _login.toLogin)();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
        fail: function fail(res) {
          console.log('showModal', res);
        }
      });
      return;
    }

    // 如果正在选择文件，不重新加载历史消息
    if (this.isChoosingFile) {
      this.isChoosingFile = false;
      return;
    }

    //获取个人用户信息
    this.getUserInfo();
    this.getHistoryMessages();
  },
  methods: {
    /**
    * 获取个人用户信息
    */
    getUserInfo: function getUserInfo() {
      var that = this;
      (0, _user.getUserInfo)().then(function (res) {
        that.userInfo = res.data;
        if (that.userInfo.is_money_level == 0) {
          uni.showModal({
            title: '提示',
            content: '您不是会员，无法使用该功能',
            showCancel: true,
            confirmText: '去升级',
            success: function success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                uni.navigateTo({
                  url: '/pages/annex/vip_paid/index'
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
                uni.reLaunch({
                  url: '/pages/index_/index'
                });
              }
            },
            fail: function fail(res) {
              console.log('showModal', res);
            }
          });
        }
      });
    },
    /**
     * 获取算力配置
     */
    loadComputePowerConfig: function loadComputePowerConfig() {
      var _this3 = this;
      (0, _api.getComputePowerConfig)().then(function (res) {
        if (res.status === 200 && res.data && res.data.ai_text_model) {
          _this3.aiModelName = res.data.ai_text_model;
        }
      }).catch(function (err) {
        console.error('获取算力配置失败', err);
      });
    },
    /**
     * 处理返回按钮点击
     */
    handleBack: function handleBack() {
      // 获取当前页面栈
      var pages = getCurrentPages();

      // 如果页面栈大于1，说明有上一页，可以正常返回
      if (pages.length > 1) {
        uni.navigateBack({
          delta: 1
        });
      } else {
        // 如果页面栈只有1页，说明是从tabbar跳转过来的，返回到首页
        uni.switchTab({
          url: '/pages/index_/index'
        });
      }
    },
    // 添加文本格式化方法
    formatText: function formatText(text) {
      if (!text) return '';
      // 将换行符转换为 HTML 换行标签
      return text.replace(/\n/g, '<br>');
    },
    // 复制文字
    copyText: function copyText(text) {
      uni.setClipboardData({
        data: text,
        success: function success() {
          uni.showToast({
            title: '复制成功',
            icon: 'success'
          });
        },
        fail: function fail(err) {
          console.log(err);
          uni.showToast({
            title: '复制失败',
            icon: 'none'
          });
        }
      });
    },
    getAiQuestion: function getAiQuestion() {
      var _this4 = this;
      (0, _api.getAiQuestion)().then(function (res) {
        if (res.status === 200 && res.data) {
          _this4.aiQuestion = res.data;
          console.log(_this4.aiQuestion);
        }
      });
    },
    loadError: function loadError(msg) {
      // 使用Vue.set或this.$set来确保响应式更新
      this.$set(msg, 'loadError', true);
    },
    getHistoryMessages: function getHistoryMessages() {
      var _this5 = this;
      if (this.loadingMore || !this.hasMore) return;
      this.loadingMore = true;

      // 调用获取历史消息接口
      (0, _api.aiGetHistory)(this.page, this.limit, this.sessionId).then(function (res) {
        if (res.status === 200 && res.data) {
          // 处理历史消息，添加 reasoning_expanded 属性
          var historyMessages = res.data.map(function (msg) {
            if (msg.question_type == 1) {
              msg.content_url = msg.content_url.split(',');
            }
            msg.reasoning_expanded = false;
            return msg;
          });
          historyMessages = historyMessages.reverse();
          console.log('historyMessages', historyMessages);
          // 如果是第一页，直接替换消息列表
          if (_this5.page === 1) {
            //反转一下historyMessages
            _this5.messages = historyMessages;
            _this5.scrollToBottom();
          } else {
            // 否则，将新消息添加到列表前面
            _this5.messages = [].concat((0, _toConsumableArray2.default)(historyMessages), (0, _toConsumableArray2.default)(_this5.messages));
          }

          // 判断是否还有更多数据
          if (res.data.length < _this5.limit) {
            _this5.hasMore = false;
          } else {
            _this5.page++;
          }
        } else {
          _this5.hasMore = false;
        }
      }).finally(function () {
        _this5.loadingMore = false;
      });
    },
    /**
     * 获取输入框占位符
     */
    getPlaceholder: function getPlaceholder() {
      switch (this.activeFunction) {
        case 'chat':
          return '给AI智能体发送消息';
        case 'image':
          return '描述你想要生成的图像';
        case 'video':
          return '描述你想要生成的视频';
        default:
          return '给AI智能体发送消息';
      }
    },
    /**
     * 切换功能模式
     * @param string functionType 功能类型（chat/image/video）
     */
    switchFunction: function switchFunction(functionType) {
      if (this.activeFunction === functionType) return;

      // 切换功能时清空已上传的文件
      this.uploadedImages = [];
      this.uploadedVideo = '';
      this.uploading = false;

      // 切换功能
      this.activeFunction = functionType;
    },
    fastSendMessage: function fastSendMessage(question) {
      this.inputMessage = question;
      this.sendMessage();
    },
    /**
     * 选择文件
     */
    chooseFile: function chooseFile() {
      var _this6 = this;
      uni.showActionSheet({
        itemList: ['选择图片', '选择视频'],
        success: function success(res) {
          if (res.tapIndex === 0) {
            _this6.chooseImage();
          } else if (res.tapIndex === 1) {
            _this6.chooseVideo();
          }
        }
      });
    },
    /**
     * 选择图片
     */
    chooseImage: function chooseImage() {
      var _this7 = this;
      if (this.uploadedVideo) {
        uni.showToast({
          title: '已选择视频，无法同时选择图片',
          icon: 'none'
        });
        return;
      }
      this.isChoosingFile = true;
      uni.chooseImage({
        count: 9 - this.uploadedImages.length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function success(res) {
          _this7.uploading = true;
          var tempFiles = res.tempFilePaths;
          var uploadPromises = tempFiles.map(function (tempFile) {
            return _this7.uploadFile(tempFile, 'image');
          });
          Promise.all(uploadPromises).then(function (uploadedUrls) {
            _this7.uploading = false;
            _this7.uploadedImages = [].concat((0, _toConsumableArray2.default)(_this7.uploadedImages), (0, _toConsumableArray2.default)(uploadedUrls));
          }).catch(function (err) {
            _this7.uploading = false;
            uni.showToast({
              title: '图片上传失败',
              icon: 'none'
            });
          });
        },
        complete: function complete() {
          _this7.isChoosingFile = false;
        }
      });
    },
    /**
     * 选择视频
     */
    chooseVideo: function chooseVideo() {
      var _this8 = this;
      if (this.uploadedImages.length > 0) {
        uni.showToast({
          title: '已选择图片，无法同时选择视频',
          icon: 'none'
        });
        return;
      }
      this.isChoosingFile = true;
      uni.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        success: function success(res) {
          _this8.uploading = true;
          _this8.uploadFile(res.tempFilePath, 'video').then(function (url) {
            _this8.uploading = false;
            _this8.uploadedVideo = url;
          }).catch(function (err) {
            _this8.uploading = false;
            uni.showToast({
              title: '视频上传失败',
              icon: 'none'
            });
          });
        },
        complete: function complete() {
          _this8.isChoosingFile = false;
        }
      });
    },
    /**
     * 上传文件到OSS（直传）
     */
    uploadFile: function uploadFile(tempFilePath, fileType) {
      var token = uni.getStorageSync('LOGIN_STATUS_TOKEN') || '';
      return new Promise(function (resolve, reject) {
        // 先获取OSS配置
        uni.request({
          url: _app.default.HTTP_REQUEST_URL + '/api/upload/oss_config',
          method: 'POST',
          header: {
            'Authorization': 'Bearer ' + token
          },
          success: function success(res) {
            if (res.data.status !== 200) {
              reject(new Error(res.data.msg || '获取OSS配置失败'));
              return;
            }
            var ossConfig = res.data.data;

            // 生成文件名（包含时间戳和随机字符串）
            var timestamp = Date.now();
            var randomStr = Math.random().toString(36).substr(2, 9);
            var fileExt = fileType === 'video' ? '.mp4' : '.jpg';
            var fileName = 'store/' + timestamp + '_' + randomStr + fileExt;

            // 构建OSS上传URL
            var ossUploadUrl = ossConfig.host;

            // 直传到OSS
            uni.uploadFile({
              url: ossUploadUrl,
              filePath: tempFilePath,
              name: 'file',
              formData: {
                'key': fileName,
                'policy': ossConfig.policy,
                'OSSAccessKeyId': ossConfig.accessid,
                'signature': ossConfig.signature,
                'success_action_status': '200',
                'x-oss-object-acl': 'public-read'
              },
              success: function success(uploadRes) {
                // 上传成功，获取文件URL
                var fileUrl = ossConfig.host + '/' + fileName;

                // 通知服务器记录文件
                uni.request({
                  url: _app.default.HTTP_REQUEST_URL + '/api/upload/record_oss_file',
                  method: 'POST',
                  header: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                  },
                  data: JSON.stringify({
                    url: fileUrl,
                    filename: fileName,
                    file_type: fileType
                  }),
                  success: function success(notifyRes) {
                    if (notifyRes.data.status === 200) {
                      resolve(fileUrl);
                    } else {
                      reject(new Error(notifyRes.data.msg || '文件记录失败'));
                    }
                  },
                  fail: function fail(err) {
                    reject(new Error('文件记录失败'));
                  }
                });
              },
              fail: function fail(err) {
                reject(new Error('上传失败: ' + JSON.stringify(err)));
              }
            });
          },
          fail: function fail(err) {
            reject(new Error('获取配置失败'));
          }
        });
      });
    },
    /**
     * 删除已上传的文件
     */
    deleteFile: function deleteFile(type, index) {
      if (type === 'image') {
        this.uploadedImages.splice(index, 1);
      } else if (type === 'video') {
        this.uploadedVideo = '';
      }
    },
    /**
     * 发送消息
     */
    sendMessage: function sendMessage() {
      if (!this.inputMessage.trim()) return;
      if (this.loading) {
        uni.showToast({
          title: '任务处理中',
          icon: 'loading',
          duration: 2000
        });
        return;
      }
      var message = this.inputMessage.trim();
      // 添加用户消息
      var userMessage = {
        role: 'user',
        content: message,
        question_type: 0
      };
      if (this.uploadedImages.length > 0) {
        userMessage.images = this.uploadedImages;
        userMessage.question_type = 1;
        userMessage.content_url = this.uploadedImages;
      }
      if (this.uploadedVideo) {
        userMessage.video = this.uploadedVideo;
        userMessage.question_type = 2;
        userMessage.content_url = this.uploadedVideo;
      }
      this.messages.push(userMessage);
      this.inputMessage = '';
      this.scrollToBottom(true);
      this.loading = true;

      // 根据当前激活的功能类型调用相应的API
      if (this.activeFunction === 'chat') {
        this.sendChatMessage(message);
      } else if (this.activeFunction === 'image') {
        // this.generateImage(message);
        this.generateImageSync(message);
      } else if (this.activeFunction === 'video') {
        this.generateVideo(message);
      }

      // 清空已上传的文件
      this.uploadedImages = [];
      this.uploadedVideo = '';
    },
    /**
     * 发送聊天消息
     */
    sendChatMessage: function sendChatMessage(message) {
      // 调用AI对话接口
      // aiChat({ message, session_id: this.sessionId })
      //     .then(res => {
      //         if (res.status === 200 && res.data) {
      //             // 添加AI回复
      //             this.messages.push({ role: 'assistant', type: 'conversation', content: res.data.message || '抱歉，我没有理解你的问题，请再试一次。' });
      //         } else {
      //             this.messages.push({ role: 'assistant', type: 'conversation', content: '抱歉，我暂时无法回答你的问题，请稍后再试。' });
      //         }
      //     })
      //     .catch(err => {
      //         console.error('AI对话失败:', err);
      //         this.messages.push({ role: 'assistant', type: 'conversation', content: '抱歉，服务器暂时无法响应，请稍后再试。' });
      //     })
      //     .finally(() => {
      //         this.loading = false;
      //         this.scrollToBottom();
      //     });

      this.inputMessage = '';
      this.scrollToBottom(true);
      this.loading = true;

      // 调用流式响应API
      // this.sendChatStream(message);

      this.sendChatStreamThink(message, this.uploadedImages, this.uploadedVideo);
    },
    /**
     * 发送流式聊天消息
     */
    sendChatStream: function sendChatStream(message) {
      try {
        // 创建AI回复消息对象，用于实时更新
        var aiMessageIndex = this.messages.length;
        this.messages.push({
          role: 'assistant',
          type: 'conversation',
          content: ''
        });

        // 构建请求参数对象
        var params = {
          message: message,
          session_id: this.sessionId,
          role_id: this.roleId
        };

        // 获取token
        var token = uni.getStorageSync('LOGIN_STATUS_TOKEN') || '';

        // 保存this引用
        var that = this;

        // 构建API请求URL
        var baseUrl = _app.default.HTTP_REQUEST_URL;
        var apiUrl = "".concat(baseUrl, "/api/ai/chat_stream");
        var requestTask = uni.request({
          url: apiUrl,
          timeout: 120000,
          responseType: 'text',
          method: 'POST',
          enableChunked: true,
          //配置这里
          data: JSON.stringify(params),
          header: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          success: function success(response) {
            console.log(response);
            if (response.statusCode === 500) {
              uni.showToast({
                title: '服务器频繁，请稍后再试。',
                icon: 'none',
                duration: 2000
              });
              return;
            }
            if (response.statusCode === 503) {
              uni.showToast({
                title: '请求频繁，请稍后再试。',
                icon: 'none',
                duration: 2000
              });
              return;
            }
          },
          fail: function fail(error) {}
        });
        requestTask.onHeadersReceived(function (res) {
          // console.log('onHeadersReceived',res.header);
        });
        // 这里监听消息
        // requestTask.onChunkReceived(function(res) {
        //     let decoder = new TextDecoder('utf-8');
        //     let text = decoder.decode(new Uint8Array(res.data));
        //     console.log(text)
        // })
        var buffer = '';
        requestTask.onChunkReceived(function (res) {
          that.loading = false;
          var uint8Array = new Uint8Array(res.data);
          var text = String.fromCharCode.apply(null, uint8Array);
          text = decodeURIComponent(escape(text));
          // console.log('onChunkReceived',text);

          // 解码数据
          buffer += text;
          // 处理数据行
          var lines = buffer.split('\n');
          buffer = lines.pop(); // 保留最后不完整的行

          lines.forEach(function (line) {
            line = line.trim();
            if (line.startsWith('data:')) {
              // 提取data部分
              var dataPart = line.substring(5);
              var data = JSON.parse(dataPart);
              console.log('onChunkReceiveddata', data);
              if (data.output && data.output.choices && data.output.choices[0] && data.output.choices[0].message && data.output.choices[0].message.content) {
                var content = data.output.choices[0].message.content;
                // 更新AI回复内容
                that.messages[aiMessageIndex].content += content;
                that.scrollToBottom();
              }
            }
          });
        });
      } catch (e) {
        console.error('AI对话失败:', e);
        this.messages.push({
          role: 'assistant',
          type: 'conversation',
          content: '抱歉，服务器暂时无法响应，请稍后再试。'
        });
      }
    },
    /**
     * 发送流式聊天消息（思考模式）
     */
    sendChatStreamThink: function sendChatStreamThink(message) {
      var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var video = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      try {
        // 创建AI回复消息对象，用于实时更新
        var aiMessageIndex = this.messages.length;
        this.messages.push({
          role: 'assistant',
          type: 'conversation',
          content: '',
          reasoning_content: '',
          reasoning_expanded: true
        });

        // 构建请求参数对象
        var params = {
          message: message,
          session_id: this.sessionId,
          role_id: this.roleId
        };

        // 添加图片参数
        if (images && images.length > 0) {
          params.image_url = images;
        }

        // 添加视频参数
        if (video) {
          params.video_url = video;
        }

        // 获取token
        var token = uni.getStorageSync('LOGIN_STATUS_TOKEN') || '';

        // 保存this引用
        var that = this;

        // 构建API请求URL
        var baseUrl = _app.default.HTTP_REQUEST_URL;
        var apiUrl = "".concat(baseUrl, "/api/ai/chat_stream_think");
        var requestTask = uni.request({
          url: apiUrl,
          timeout: 120000,
          responseType: 'text',
          method: 'POST',
          enableChunked: true,
          //配置这里
          data: JSON.stringify(params),
          header: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          success: function success(response) {
            console.log('sendChatStreamThink', response);
            that.loading = false;
            if (response.statusCode === 500) {
              uni.showToast({
                title: '服务器繁忙，请稍后再试。',
                icon: 'none',
                duration: 2000
              });
              return;
            }
            if (response.statusCode === 503) {
              uni.showToast({
                title: '请求频繁，请稍后再试。',
                icon: 'none',
                duration: 2000
              });
              return;
            }
            if (response.statusCode === 504) {
              uni.showModal({
                title: '提示',
                content: '算力不足，请充值',
                showCancel: true,
                confirmText: '去充值',
                success: function success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    uni.navigateTo({
                      url: '/pages/w/computing_power_recharge'
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                },
                fail: function fail(res) {
                  console.log('showModal', res);
                }
              });
              return;
            }
            if (response.statusCode === 403) {
              uni.showModal({
                title: '提示',
                content: '您不是会员，无法使用该功能',
                showCancel: true,
                confirmText: '去升级',
                success: function success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    uni.navigateTo({
                      url: '/pages/annex/vip_paid/index'
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                },
                fail: function fail(res) {
                  console.log('showModal', res);
                }
              });
              return;
            }
          },
          fail: function fail(error) {}
        });
        requestTask.onHeadersReceived(function (res) {
          // console.log('onHeadersReceived',res.header);
        });
        // 这里监听消息
        // requestTask.onChunkReceived(function(res) {
        //     let decoder = new TextDecoder('utf-8');
        //     let text = decoder.decode(new Uint8Array(res.data));
        //     console.log(text)
        // })
        var buffer = '';
        requestTask.onChunkReceived(function (res) {
          that.loading = false;
          var uint8Array = new Uint8Array(res.data);
          var text = String.fromCharCode.apply(null, uint8Array);
          text = decodeURIComponent(escape(text));
          // console.log('onChunkReceived',text);

          // 解码数据
          buffer += text;
          // 处理数据行
          var lines = buffer.split('\n');
          buffer = lines.pop(); // 保留最后不完整的行

          lines.forEach(function (line) {
            line = line.trim();
            if (line.startsWith('data:')) {
              // 提取data部分
              var dataPart = line.substring(5);
              var data = JSON.parse(dataPart);
              // console.log('onChunkReceiveddata',data);
              // 思考过程
              if (data.choices && data.choices[0] && data.choices[0].delta && data.choices[0].delta.reasoning_content) {
                var reasoning_content = data.choices[0].delta.reasoning_content;
                // 更新AI思考过程
                that.messages[aiMessageIndex].reasoning_content += reasoning_content;
                that.scrollToBottom();
              }
              // 流式回复内容
              if (data.choices && data.choices[0] && data.choices[0].delta && data.choices[0].delta.content) {
                // 流式数据结束后，5秒自动收起思考过程
                that.autoCollapseReasoning(aiMessageIndex);
                var content = data.choices[0].delta.content;
                // 更新AI回复内容
                that.messages[aiMessageIndex].content += content;
                that.scrollToBottom();
              }
            }
          });
        });
      } catch (e) {
        console.error('AI对话失败:', e);
        this.messages.push({
          role: 'assistant',
          type: 'conversation',
          content: '抱歉，服务器暂时无法响应，请稍后再试。'
        });
      }
    },
    /**
     * 发送流式聊天消息
     */
    sendChatStream1: function sendChatStream1(message) {
      try {
        // 构建API请求URL
        var baseUrl = _app.default.HTTP_REQUEST_URL;
        var apiUrl = "".concat(baseUrl, "/api/ai/chat_stream");

        // 创建AI回复消息对象，用于实时更新
        var aiMessageIndex = this.messages.length;
        this.messages.push({
          role: 'assistant',
          type: 'conversation',
          content: ''
        });

        // 构建请求参数对象
        var params = {
          message: message,
          session_id: this.sessionId
        };

        // 获取token
        var token = uni.getStorageSync('LOGIN_STATUS_TOKEN') || '';

        // 保存this引用
        var that = this;

        // 发送流式请求
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Form-type': 'h5'
          },
          body: JSON.stringify(params)
        }).then(function (response) {
          if (!response.ok) {
            throw new Error('网络响应错误');
          }
          var reader = response.body.getReader();
          var decoder = new TextDecoder();
          var buffer = '';

          // 处理流式数据
          var processStream = function processStream() {
            return reader.read().then(function (_ref) {
              var done = _ref.done,
                value = _ref.value;
              if (done) {
                that.loading = false;
                that.scrollToBottom(true);
                return;
              }

              // 解码数据
              buffer += decoder.decode(value, {
                stream: true
              });
              // 处理数据行
              var lines = buffer.split('\n');
              buffer = lines.pop(); // 保留最后不完整的行

              // 临时存储当前消息的data部分
              var currentData = '';
              lines.forEach(function (line) {
                line = line.trim();
                if (line.startsWith('data:')) {
                  // 提取data部分
                  var dataPart = line.substring(5);
                  var data = JSON.parse(dataPart);
                  if (data.output && data.output.choices && data.output.choices[0] && data.output.choices[0].message && data.output.choices[0].message.content) {
                    var content = data.output.choices[0].message.content;
                    // 更新AI回复内容
                    that.messages[aiMessageIndex].content += content;
                    that.scrollToBottom(true);
                  }
                }
                // if (!line) {
                //     // 空行表示一条消息的结束，处理当前消息
                //     if (currentData) {
                //         try {
                //             const data = JSON.parse(currentData);
                //             console.log('解析到的数据:', data);
                //             // 从标准SSE格式的数据中提取content
                //             if (data.output && data.output.choices && data.output.choices[0] && data.output.choices[0].message && data.output.choices[0].message.content) {
                //                 const content = data.output.choices[0].message.content;
                //                 // 更新AI回复内容
                //                 that.messages[aiMessageIndex].content += content;
                //                 that.scrollToBottom();
                //             }
                //         } catch (e) {
                //             console.error('解析流式数据失败:', e);
                //         }
                //         // 重置currentData
                //         currentData = '';
                //     }
                //     return;
                // }

                // // 处理data字段
                // if (line.startsWith('data: ')) {
                //     // 提取data部分
                //     const dataPart = line.substring(6);
                //     currentData += dataPart;
                // }
              });

              return processStream();
            });
          };
          return processStream();
        }).catch(function (err) {
          console.error('AI对话失败:', err);
          that.messages[aiMessageIndex].content = '抱歉，服务器暂时无法响应，请稍后再试。';
          that.loading = false;
          that.scrollToBottom(true);
        });
      } catch (e) {
        console.error('AI对话失败:', e);
        this.messages.push({
          role: 'assistant',
          type: 'conversation',
          content: '抱歉，服务器暂时无法响应，请稍后再试。'
        });
      }
    },
    //同步生成图像
    generateImageSync: function generateImageSync(prompt) {
      var _this9 = this;
      if (!prompt.trim()) {
        uni.showToast({
          title: '请输入图像描述',
          icon: 'none'
        });
        return;
      }

      // 调用同步图像生成接口
      (0, _api.aiGenerateImageSync)({
        prompt: prompt,
        session_id: this.sessionId
      }).then(function (res) {
        if (res.status === 200 && res.data) {
          // 添加图像消息
          _this9.messages.push({
            role: 'assistant',
            type: 'image',
            content_url: res.data.url
          });
          _this9.loading = false;
          _this9.scrollToBottom(true);
        } else if (res.status == 400097) {
          _this9.loading = false;
          uni.showModal({
            title: '提示',
            content: '您不是会员，无法使用该功能',
            showCancel: true,
            confirmText: '去升级',
            success: function success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                uni.navigateTo({
                  url: '/pages/annex/vip_paid/index'
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            },
            fail: function fail(res) {
              console.log('showModal', res);
            }
          });
        } else if (res.status == 100105) {
          _this9.loading = false;
          uni.showModal({
            title: '提示',
            content: '算力不足，请充值',
            showCancel: true,
            confirmText: '去充值',
            success: function success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                uni.navigateTo({
                  url: '/pages/w/computing_power_recharge'
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            },
            fail: function fail(res) {
              console.log('showModal', res);
            }
          });
        }
      }).catch(function (err) {
        console.error('图像生成失败:', err);
        uni.showToast({
          title: err || '服务器暂时无法响应',
          icon: 'none'
        });
      }).finally(function () {});
    },
    /**
     * 生成图像
     */
    generateImage: function generateImage(prompt) {
      var _this10 = this;
      if (!prompt.trim()) {
        uni.showToast({
          title: '请输入图像描述',
          icon: 'none'
        });
        return;
      }

      // 调用图像生成接口
      (0, _api.aiGenerateImage)({
        prompt: prompt,
        session_id: this.sessionId
      }).then(function (res) {
        if (res.status === 200 && res.data && res.data.task_id) {
          // 轮询获取图像结果
          _this10.pollImageResult(res.data.task_id);
        } else if (res.status == 400097) {
          _this10.loading = false;
          uni.showModal({
            title: '提示',
            content: '您不是会员，无法使用该功能',
            showCancel: true,
            confirmText: '去升级',
            success: function success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                uni.navigateTo({
                  url: '/pages/annex/vip_paid/index'
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            },
            fail: function fail(res) {
              console.log('showModal', res);
            }
          });
        } else if (res.status == 100105) {
          _this10.loading = false;
          uni.showModal({
            title: '提示',
            content: '算力不足，请充值',
            showCancel: true,
            confirmText: '去充值',
            success: function success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                uni.navigateTo({
                  url: '/pages/w/computing_power_recharge'
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            },
            fail: function fail(res) {
              console.log('showModal', res);
            }
          });
        }
      }).catch(function (err) {
        console.error('图像生成失败:', err);
        uni.showToast({
          title: err || '服务器暂时无法响应',
          icon: 'none'
        });
      }).finally(function () {});
    },
    /**
     * 轮询获取图像结果
     */
    pollImageResult: function pollImageResult(taskId) {
      var _this11 = this;
      var attempts = 0;
      var maxAttempts = 50;
      var interval = 2000;
      var poll = function poll() {
        if (attempts >= maxAttempts) {
          _this11.loading = false;
          uni.showToast({
            title: '图像生成超时',
            icon: 'none'
          });
          return;
        }
        (0, _api.aiGetImageResult)(taskId).then(function (res) {
          if (res.status === 200 && res.data) {
            if (res.data.status === 'SUCCEEDED' && res.data.url) {
              // 添加图像消息
              _this11.messages.push({
                role: 'assistant',
                type: 'image',
                content_url: res.data.url
              });
              _this11.loading = false;
              _this11.scrollToBottom(true);
            } else if (res.data.status === 'FAILED') {
              _this11.loading = false;
              uni.showToast({
                title: '图像生成失败',
                icon: 'none'
              });
            } else {
              // 继续轮询
              attempts++;
              setTimeout(poll, interval);
            }
          } else {
            attempts++;
            setTimeout(poll, interval);
          }
        }).catch(function (err) {
          console.error('获取图像结果失败:', err);
          attempts++;
          setTimeout(poll, interval);
        });
      };
      poll();
    },
    /**
     * 生成视频
     */
    generateVideo: function generateVideo(prompt) {
      var _this12 = this;
      if (!prompt.trim()) {
        uni.showToast({
          title: '请输入视频描述',
          icon: 'none'
        });
        return;
      }

      // 调用视频生成接口
      (0, _api.aiGenerateVideo)({
        prompt: prompt,
        session_id: this.sessionId
      }).then(function (res) {
        if (res.status === 200 && res.data && res.data.task_id) {
          // 轮询获取视频结果
          _this12.pollVideoResult(res.data.task_id);
        } else if (res.status == 400097) {
          _this12.loading = false;
          uni.showModal({
            title: '提示',
            content: '您不是会员，无法使用该功能',
            showCancel: true,
            confirmText: '去升级',
            success: function success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                uni.navigateTo({
                  url: '/pages/annex/vip_paid/index'
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            },
            fail: function fail(res) {
              console.log('showModal', res);
            }
          });
        } else if (res.status == 100105) {
          _this12.loading = false;
          uni.showModal({
            title: '提示',
            content: '算力不足，请充值',
            showCancel: true,
            confirmText: '去充值',
            success: function success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                uni.navigateTo({
                  url: '/pages/w/computing_power_recharge'
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            },
            fail: function fail(res) {
              console.log('showModal', res);
            }
          });
        }
      }).catch(function (err) {
        console.error('视频生成失败:', err);
        uni.showToast({
          title: err || '服务器暂时无法响应',
          icon: 'none'
        });
      }).finally(function () {});
    },
    /**
     * 轮询获取视频结果
     */
    pollVideoResult: function pollVideoResult(taskId) {
      var _this13 = this;
      var attempts = 0;
      var maxAttempts = 60;
      var interval = 3000;
      var poll = function poll() {
        if (attempts >= maxAttempts) {
          _this13.loading = false;
          uni.showToast({
            title: '视频生成超时',
            icon: 'none'
          });
          return;
        }
        (0, _api.aiGetVideoResult)(taskId).then(function (res) {
          if (res.status === 200 && res.data) {
            if (res.data.status === 'SUCCEEDED' && res.data.url) {
              // 添加视频消息
              _this13.messages.push({
                role: 'assistant',
                type: 'video',
                content_url: res.data.url
              });
              _this13.loading = false;
              _this13.scrollToBottom(true);
            } else if (res.data.status === 'FAILED') {
              _this13.loading = false;
              uni.showToast({
                title: '视频生成失败',
                icon: 'none'
              });
            } else {
              // 继续轮询
              attempts++;
              setTimeout(poll, interval);
            }
          } else {
            attempts++;
            setTimeout(poll, interval);
          }
        }).catch(function (err) {
          console.error('获取视频结果失败:', err);
          attempts++;
          setTimeout(poll, interval);
        });
      };
      poll();
    },
    /**
     * 监听滚动
     */
    onScroll: function onScroll(e) {
      var _e$detail = e.detail,
        scrollTop = _e$detail.scrollTop,
        scrollHeight = _e$detail.scrollHeight;
      if (this.scrollViewHeight > 0) {
        this.isAtBottom = scrollTop + this.scrollViewHeight >= scrollHeight - 100;
      } else {
        // 如果还没获取到高度，兜底逻辑
        this.isAtBottom = true;
      }
    },
    scrollToBottom: function scrollToBottom() {
      var _this14 = this;
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (force || this.isAtBottom) {
        this.scrollTop = this.scrollTop + 1;
        this.$nextTick(function () {
          _this14.scrollTop = 9999999;
        });
      }
    },
    /**
     * 加载更多历史消息
     */
    loadMore: function loadMore() {
      //TODO 需修复加载问题
      if (!this.loadingMore && this.hasMore) {
        this.getHistoryMessages();
      }
    },
    /**
     * 预览图片并提供下载功能
     * @param string imageUrl 图片URL
     */
    previewImage: function previewImage(imageUrl) {
      // 使用uni-app的图片预览API
      uni.previewImage({
        urls: [imageUrl],
        current: imageUrl,
        success: function success(res) {
          console.log('预览图片成功');
        },
        fail: function fail(err) {
          console.error('预览图片失败:', err);
        }
      });
    },
    /**
     * 播放视频
     * @param string videoUrl 视频URL
     */
    playVideo: function playVideo(videoUrl) {
      uni.navigateTo({
        url: "/pages/video/video?url=".concat(encodeURIComponent(videoUrl)),
        fail: function fail(err) {
          console.error('跳转视频播放页面失败:', err);
          uni.showToast({
            title: '视频播放失败',
            icon: 'none'
          });
        }
      });
    },
    /**
     * 下载视频并保存到相册
     * @param string videoUrl 视频URL
     */
    downloadVideo: function downloadVideo(videoUrl) {
      uni.showLoading({
        title: '下载中...'
      });

      // 下载视频文件
      uni.downloadFile({
        url: videoUrl,
        success: function success(res) {
          if (res.statusCode === 200) {
            // 保存视频到相册
            uni.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function success() {
                uni.hideLoading();
                uni.showToast({
                  title: '视频已保存到相册',
                  icon: 'success'
                });
              },
              fail: function fail(err) {
                uni.hideLoading();
                console.error('保存视频失败:', err);
                uni.showToast({
                  title: '保存视频失败',
                  icon: 'none'
                });
              }
            });
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '下载视频失败',
              icon: 'none'
            });
          }
        },
        fail: function fail(err) {
          uni.hideLoading();
          console.error('下载视频失败:', err);
          uni.showToast({
            title: '下载视频失败',
            icon: 'none'
          });
        }
      });
    },
    /**
     * 切换思考过程展开/收起状态
     */
    toggleReasoning: function toggleReasoning(msg) {
      console.log(msg);
      if (!msg.reasoning_expanded) {
        msg.reasoning_expanded = true;
      } else {
        msg.reasoning_expanded = false;
      }
    },
    /**
     * 自动收起思考过程
     */
    autoCollapseReasoning: function autoCollapseReasoning(index) {
      var _this15 = this;
      setTimeout(function () {
        if (_this15.messages[index]) {
          _this15.messages[index].reasoning_expanded = false;
        }
      }, 2000); // 2秒后自动收起
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1213:
/*!***********************************************************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/ai.vue?vue&type=style&index=0&id=f6170a8e&scoped=true&lang=less& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_style_index_0_id_f6170a8e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--10-oneOf-1-3!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ai.vue?vue&type=style&index=0&id=f6170a8e&scoped=true&lang=less& */ 1214);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_style_index_0_id_f6170a8e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_style_index_0_id_f6170a8e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_style_index_0_id_f6170a8e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_style_index_0_id_f6170a8e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ai_vue_vue_type_style_index_0_id_f6170a8e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1214:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/ai.vue?vue&type=style&index=0&id=f6170a8e&scoped=true&lang=less& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[1207,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/w/ai.js.map