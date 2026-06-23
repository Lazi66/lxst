require('./common/vendor.js');(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/w/create_custom_voice"],{

/***/ 1175:
/*!*************************************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/main.js?{"page":"pages%2Fw%2Fcreate_custom_voice"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _create_custom_voice = _interopRequireDefault(__webpack_require__(/*! ./pages/w/create_custom_voice.vue */ 1176));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_create_custom_voice.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 1176:
/*!******************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/create_custom_voice.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_custom_voice_vue_vue_type_template_id_36517186_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create_custom_voice.vue?vue&type=template&id=36517186&scoped=true& */ 1177);
/* harmony import */ var _create_custom_voice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create_custom_voice.vue?vue&type=script&lang=js& */ 1179);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _create_custom_voice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _create_custom_voice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _create_custom_voice_vue_vue_type_style_index_0_id_36517186_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create_custom_voice.vue?vue&type=style&index=0&id=36517186&scoped=true&lang=css& */ 1181);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 68);

var renderjs





/* normalize component */

var component = Object(_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _create_custom_voice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _create_custom_voice_vue_vue_type_template_id_36517186_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _create_custom_voice_vue_vue_type_template_id_36517186_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "36517186",
  null,
  false,
  _create_custom_voice_vue_vue_type_template_id_36517186_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/w/create_custom_voice.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1177:
/*!*************************************************************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/create_custom_voice.vue?vue&type=template&id=36517186&scoped=true& ***!
  \*************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_template_id_36517186_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./create_custom_voice.vue?vue&type=template&id=36517186&scoped=true& */ 1178);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_template_id_36517186_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_template_id_36517186_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_template_id_36517186_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_template_id_36517186_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 1178:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/create_custom_voice.vue?vue&type=template&id=36517186&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uvIcon: function () {
      return Promise.all(/*! import() | node-modules/@climblee/uv-ui/components/uv-icon/uv-icon */[__webpack_require__.e("common/vendor"), __webpack_require__.e("node-modules/@climblee/uv-ui/components/uv-icon/uv-icon")]).then(__webpack_require__.bind(null, /*! @climblee/uv-ui/components/uv-icon/uv-icon.vue */ 1361))
    },
    uvPopup: function () {
      return Promise.all(/*! import() | node-modules/@climblee/uv-ui/components/uv-popup/uv-popup */[__webpack_require__.e("common/vendor"), __webpack_require__.e("node-modules/@climblee/uv-ui/components/uv-popup/uv-popup")]).then(__webpack_require__.bind(null, /*! @climblee/uv-ui/components/uv-popup/uv-popup.vue */ 2013))
    },
    privacyPop: function () {
      return __webpack_require__.e(/*! import() | components/privacy-pop/privacy-pop */ "components/privacy-pop/privacy-pop").then(__webpack_require__.bind(null, /*! @/components/privacy-pop/privacy-pop.vue */ 2020))
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
  var m0 = _vm.status === "recording" ? _vm.formatTime(_vm.recordTenths) : null
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

/***/ 1179:
/*!*******************************************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/create_custom_voice.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./create_custom_voice.vue?vue&type=script&lang=js& */ 1180);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1180:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/create_custom_voice.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 34));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 36));
var _app = _interopRequireDefault(__webpack_require__(/*! @/config/app.js */ 44));
var _digitalHuman = __webpack_require__(/*! @/api/digitalHuman.js */ 1060);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var PrivacyPop = function PrivacyPop() {
  __webpack_require__.e(/*! require.ensure | components/privacy-pop/privacy-pop */ "components/privacy-pop/privacy-pop").then((function () {
    return resolve(__webpack_require__(/*! @/components/privacy-pop/privacy-pop.vue */ 2020));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    PrivacyPop: PrivacyPop
  },
  data: function data() {
    return {
      statusBarHeight: 0,
      navBarHeight: 44,
      showTutorial: false,
      // idle | recording | finished
      status: 'idle',
      recordSeconds: 0,
      timer: null,
      recordFilePath: '',
      // 录音完成后的文件路径
      isPlaying: false,
      recordTenths: 0,
      // 录音时长（以0.1秒为单位）

      // 波形栏高度数组（20栏）
      barHeights: Array(20).fill(15),
      scripts: ["我正在定制我的声音，录音 10 秒左右就可以了。现在周围很安静，我说话很放松，表达很流畅，录音时情绪风格比较统一。之后只需要打字，就可以生成我说话的视频了，真的很简单！", "如果可以的话，我希望能够用最自然的声音来表达这段话的内容。录音的环境我已经布置好了，周围没有多余的杂音，我现在的状态也很不错，随时可以开始录制。", "声音定制是一项非常有意思的技术，通过简短的录音，系统就能学习到我独特的音色和语气连贯性。现在我正在做这个准备工作，按照要求清晰地朗读。"],
      currentScriptIndex: 0
    };
  },
  computed: {
    currentScript: function currentScript() {
      return this.scripts[this.currentScriptIndex];
    }
  },
  onLoad: function onLoad() {
    var sysInfo = uni.getSystemInfoSync();
    this.statusBarHeight = sysInfo.statusBarHeight || 0;
  },
  onHide: function onHide() {
    // 切后台或按返回键时，立即释放麦克风
    this._stopRecorderSafe();
    this._destroyAudio();
  },
  watch: {},
  methods: {
    handleBack: function handleBack() {
      // 退出前清理录音和播放
      this._stopRecorderSafe();
      this._destroyAudio();
      uni.navigateBack();
    },
    openTutorial: function openTutorial() {
      this.$refs.tutorialPopup.open();
    },
    closeTutorial: function closeTutorial() {
      this.$refs.tutorialPopup.close();
    },
    changeScript: function changeScript() {
      this.currentScriptIndex = (this.currentScriptIndex + 1) % this.scripts.length;
    },
    formatTime: function formatTime(cs) {
      var totalSec = Math.floor(cs / 100);
      var m = Math.floor(totalSec / 60).toString().padStart(2, '0');
      var s = (totalSec % 60).toString().padStart(2, '0');
      var c = (cs % 100).toString().padStart(2, '0');
      return "".concat(m, ":").concat(s, ".").concat(c);
    },
    // ============ 录音相关 ============
    _initRecorder: function _initRecorder() {
      var _this = this;
      if (this._recorder) return;
      var recorder = uni.getRecorderManager();
      this._recorder = recorder;
      recorder.onStart(function () {
        _this.status = 'recording';
        _this.recordTenths = 0;
        _this.timer = setInterval(function () {
          _this.recordTenths++;
          // 录音最多120秒 (120 * 100 = 12000 个 10ms 也就是 120秒)
          if (_this.recordTenths >= 12000) {
            _this._stopRecorderSafe();
            uni.showToast({
              title: '录音已达最大时长(120秒)',
              icon: 'none'
            });
          }
        }, 10);
      });

      // 利用 onFrameRecorded 事件来获取当前帧鼠标动态数据，并驱动波形
      recorder.onFrameRecorded(function (_ref) {
        var frameBuffer = _ref.frameBuffer;
        if (_this.status !== 'recording') return;
        // 计算此帧的平均绝对値（简体音量)
        var data = new Int16Array(frameBuffer);
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
          sum += Math.abs(data[i]);
        }
        var avg = sum / data.length; // 0 ~ 32768
        var volume = Math.min(avg / 32768, 1); // 归一化到 0~1
        _this._applyVolume(volume);
      });
      recorder.onStop(function (_ref2) {
        var tempFilePath = _ref2.tempFilePath;
        clearInterval(_this.timer);
        _this.recordFilePath = tempFilePath;
        _this.status = 'finished';
        _this._resetBars();
      });
      recorder.onError(function (err) {
        clearInterval(_this.timer);
        _this.status = 'idle';
        _this._resetBars();
        uni.showToast({
          title: err.errMsg || '录音失败',
          icon: 'none'
        });
      });
    },
    _stopRecorderSafe: function _stopRecorderSafe() {
      if (this._recorder && this.status === 'recording') {
        this._recorder.stop();
      }
      clearInterval(this.timer);
    },
    // 波形算法：根据音量随机生成每一栏的高度
    _applyVolume: function _applyVolume(volume) {
      var minH = 10;
      var maxH = 90;
      this.barHeights = this.barHeights.map(function () {
        // 在音量范围内带随机波动
        var jitter = (Math.random() - 0.5) * 0.4;
        var v = Math.max(0, Math.min(1, volume + jitter));
        return Math.round(minH + v * (maxH - minH));
      });
    },
    _resetBars: function _resetBars() {
      this.barHeights = Array(20).fill(15);
    },
    toggleRecord: function toggleRecord() {
      if (this.status === 'idle') {
        this.startRecord();
      } else if (this.status === 'recording') {
        this.stopRecord();
      } else if (this.status === 'finished') {
        // 重新录制
        this.recordFilePath = '';
        this.status = 'idle';
        this.startRecord();
      }
    },
    startRecord: function startRecord() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                try {
                  _this2._initRecorder();
                  _this2._doStartRecord();
                } catch (e) {
                  console.error('startRecord error:', e);
                  uni.showToast({
                    title: e.message || '启动录音失败',
                    icon: 'none',
                    duration: 2000
                  });
                }
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    _doStartRecord: function _doStartRecord() {
      this._recorder.start({
        duration: 600000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 128000,
        format: 'mp3',
        frameSize: 5
      });
    },
    stopRecord: function stopRecord() {
      // recordTenths 每 10ms +1，500 = 5 秒
      if (this.recordTenths < 500) {
        uni.showToast({
          title: '录音时长不能少于5秒',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      this._stopRecorderSafe();
    },
    reRecord: function reRecord() {
      this._destroyAudio();
      this.recordFilePath = '';
      this.status = 'idle';
      this.recordSeconds = 0;
      this._resetBars();
    },
    // ============ 播放相关 ============
    _initAudio: function _initAudio() {
      var _this3 = this;
      if (this._audio) return;
      this._audio = uni.createInnerAudioContext();
      this._audio.src = this.recordFilePath;
      this._audio.onEnded(function () {
        _this3.isPlaying = false;
      });
      this._audio.onError(function () {
        _this3.isPlaying = false;
        uni.showToast({
          title: '播放失败',
          icon: 'none'
        });
      });
    },
    _destroyAudio: function _destroyAudio() {
      if (this._audio) {
        this._audio.stop();
        this._audio.destroy();
        this._audio = null;
        this.isPlaying = false;
      }
    },
    togglePlay: function togglePlay() {
      if (!this.recordFilePath) return;
      if (this.isPlaying) {
        this._audio && this._audio.pause();
        this.isPlaying = false;
      } else {
        this._initAudio();
        this._audio.play();
        this.isPlaying = true;
      }
    },
    // ============ 提交 ============
    submitVoice: function submitVoice() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var audioUrl, res, _res$data;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this4.recordFilePath) {
                  _context2.next = 3;
                  break;
                }
                uni.showToast({
                  title: '请先录制声音',
                  icon: 'none'
                });
                return _context2.abrupt("return");
              case 3:
                _context2.prev = 3;
                uni.showLoading({
                  title: '上传中...'
                });
                _context2.next = 7;
                return _this4._uploadAudioFile(_this4.recordFilePath);
              case 7:
                audioUrl = _context2.sent;
                uni.showLoading({
                  title: '提交中...'
                });
                _context2.next = 11;
                return (0, _digitalHuman.createVoiceTrain)({
                  audio_url: audioUrl
                });
              case 11:
                res = _context2.sent;
                uni.hideLoading();
                if (res.data && res.status === 200) {
                  uni.showToast({
                    title: '提交成功！',
                    icon: 'success',
                    duration: 2000
                  });
                  setTimeout(function () {
                    uni.redirectTo({
                      url: '/pages/w/digital_human_task_list'
                    });
                  }, 2000);
                } else {
                  uni.showToast({
                    title: ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.msg) || '提交失败',
                    icon: 'none'
                  });
                }
                _context2.next = 21;
                break;
              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](3);
                uni.hideLoading();
                console.error('submitVoice error:', _context2.t0);
                uni.showToast({
                  title: _context2.t0 || '提交失败，请重试',
                  icon: 'none'
                });
              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 16]]);
      }))();
    },
    /**
     * 上传音频文件到 OSS
     * 参考 create_digital_human.vue 的 uploadFile 方法
     */
    _uploadAudioFile: function _uploadAudioFile(tempFilePath) {
      var token = uni.getStorageSync('LOGIN_STATUS_TOKEN') || '';
      var HTTP_REQUEST_URL = _app.default.HTTP_REQUEST_URL;
      return new Promise(function (resolve, reject) {
        uni.request({
          url: HTTP_REQUEST_URL + '/api/upload/oss_config',
          method: 'POST',
          header: {
            Authorization: 'Bearer ' + token
          },
          success: function success(res) {
            if (res.data.status !== 200) {
              reject(new Error(res.data.msg || '获取上传配置失败'));
              return;
            }
            var ossConfig = res.data.data;
            var timestamp = Date.now();
            var randomStr = Math.random().toString(36).substr(2, 9);
            var fileName = 'store/' + timestamp + '_' + randomStr + '.mp3';
            uni.uploadFile({
              url: ossConfig.host,
              filePath: tempFilePath,
              name: 'file',
              formData: {
                key: fileName,
                policy: ossConfig.policy,
                OSSAccessKeyId: ossConfig.accessid,
                signature: ossConfig.signature,
                success_action_status: '200',
                'x-oss-object-acl': 'public-read'
              },
              success: function success() {
                var fileUrl = ossConfig.host + '/' + fileName;
                uni.request({
                  url: HTTP_REQUEST_URL + '/api/upload/record_oss_file',
                  method: 'POST',
                  header: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                  },
                  data: JSON.stringify({
                    url: fileUrl,
                    filename: fileName,
                    file_type: 'audio'
                  }),
                  success: function success(notifyRes) {
                    if (notifyRes.data.status === 200) {
                      resolve(fileUrl);
                    } else {
                      reject(new Error(notifyRes.data.msg || '文件记录失败'));
                    }
                  },
                  fail: function fail() {
                    return reject(new Error('文件记录失败'));
                  }
                });
              },
              fail: function fail() {
                return reject(new Error('音频上传失败'));
              }
            });
          },
          fail: function fail() {
            return reject(new Error('获取上传配置失败'));
          }
        });
      });
    }
  },
  onUnload: function onUnload() {
    this._stopRecorderSafe();
    this._destroyAudio();
    if (this.timer) clearInterval(this.timer);
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1181:
/*!***************************************************************************************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/create_custom_voice.vue?vue&type=style&index=0&id=36517186&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_style_index_0_id_36517186_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HbuilderX/HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./create_custom_voice.vue?vue&type=style&index=0&id=36517186&scoped=true&lang=css& */ 1182);
/* harmony import */ var _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_style_index_0_id_36517186_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_style_index_0_id_36517186_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_style_index_0_id_36517186_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_style_index_0_id_36517186_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HbuilderX_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_custom_voice_vue_vue_type_style_index_0_id_36517186_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1182:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/外接项目/bgte/bgte/template/bgte-uniapp/pages/w/create_custom_voice.vue?vue&type=style&index=0&id=36517186&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[1175,"common/runtime","common/vendor","pages/w/common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/w/create_custom_voice.js.map