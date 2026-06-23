(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/w/common/vendor"],{

/***/ 1060:
/*!******************************************************************!*\
  !*** D:/外接项目/bgte/bgte/template/bgte-uniapp/api/digitalHuman.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVoiceTrain = createVoiceTrain;
exports.generateVideoText = generateVideoText;
exports.generateVirtualmanBroadcast = generateVirtualmanBroadcast;
exports.getClipTemplateList = getClipTemplateList;
exports.getIndustryTemplateCategoryList = getIndustryTemplateCategoryList;
exports.getIndustryTemplateDetail = getIndustryTemplateDetail;
exports.getIndustryTemplateList = getIndustryTemplateList;
exports.getMyVirtualmanList = getMyVirtualmanList;
exports.getMyVoiceList = getMyVoiceList;
exports.getPublicVirtualmanList = getPublicVirtualmanList;
exports.getVoiceList = getVoiceList;
var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 43));
/**
 * 获取我的数字人列表
 */
function getMyVirtualmanList() {
  return _request.default.get('ai/digital_human/my/virtualman/list');
}

/**
 * 获取公共数字人列表
 */
function getPublicVirtualmanList() {
  return _request.default.get('ai/digital_human/virtualman/list');
}

/**
 * AI 生成视频文案
 */
function generateVideoText(data) {
  return _request.default.post('ai/digital_human/generate_video_text', data);
}

/**
 * 获取声音列表
 */
function getVoiceList() {
  return _request.default.get('ai/digital_human/voice/list');
}

/**
 * 获取我的定制声音列表
 */
function getMyVoiceList() {
  return _request.default.get('ai/digital_human/my/voice/list');
}

/**
 * 声音克隆（提交音频训练）
 * @param {Object} data - { audio_url: string }
 */
function createVoiceTrain(data) {
  return _request.default.post('ai/digital_human/voice_train', data);
}

/**
 * 获取视频剪辑模板列表
 */
function getClipTemplateList(params) {
  return _request.default.get('ai/digital_human/clip_template/list', {
    params: params
  });
}

/**
 * 提交生成数字人视频
 */
function generateVirtualmanBroadcast(data) {
  return _request.default.post('ai/digital_human/clip_virtualman_broadcast', data);
}

/**
 * 获取行业模板分类列表
 */
function getIndustryTemplateCategoryList() {
  return _request.default.get('ai/industry_template/category/list');
}

/**
 * 获取行业模板列表
 * @param {Object} data - { category_id, keyword, sort_by, sort_order }
 * sort_by: time(时间) / views(浏览量) / score(评分)
 * sort_order: asc / desc
 */
function getIndustryTemplateList(data) {
  return _request.default.get('ai/industry_template/list', {
    params: data
  });
}

/**
 * 获取行业模板详情
 */
function getIndustryTemplateDetail(id) {
  return _request.default.get("ai/industry_template/detail/".concat(id));
}

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/w/common/vendor.js.map