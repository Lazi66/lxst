import request from "@/utils/request.js";

/**
 * 获取我的数字人列表
 */
export function getMyVirtualmanList() {
    return request.get('ai/digital_human/my/virtualman/list');
}

/**
 * 获取公共数字人列表
 */
export function getPublicVirtualmanList() {
    return request.get('ai/digital_human/virtualman/list');
}

/**
 * AI 生成视频文案
 */
export function generateVideoText(data) {
    return request.post('ai/digital_human/generate_video_text', data);
}

/**
 * 获取声音列表
 */
export function getVoiceList() {
    return request.get('ai/digital_human/voice/list');
}

/**
 * 获取我的定制声音列表
 */
export function getMyVoiceList() {
    return request.get('ai/digital_human/my/voice/list');
}

/**
 * 声音克隆（提交音频训练）
 * @param {Object} data - { audio_url: string }
 */
export function createVoiceTrain(data) {
    return request.post('ai/digital_human/voice_train', data);
}

/**
 * 获取视频剪辑模板列表
 */
export function getClipTemplateList(params) {
    return request.get('ai/digital_human/clip_template/list', { params });
}

/**
 * 提交生成数字人视频
 */
export function generateVirtualmanBroadcast(data) {
    return request.post('ai/digital_human/clip_virtualman_broadcast', data);
}

/**
 * 获取行业模板分类列表
 */
export function getIndustryTemplateCategoryList() {
    return request.get('ai/industry_template/category/list');
}

/**
 * 获取行业模板列表
 * @param {Object} data - { category_id, keyword, sort_by, sort_order }
 * sort_by: time(时间) / views(浏览量) / score(评分)
 * sort_order: asc / desc
 */
export function getIndustryTemplateList(data) {
    return request.get('ai/industry_template/list', { params: data });
}

/**
 * 获取行业模板详情
 */
export function getIndustryTemplateDetail(id) {
    return request.get(`ai/industry_template/detail/${id}`);
}

