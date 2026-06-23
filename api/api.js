// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2024 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import request from "@/utils/request.js";
/**
 * 公共接口 ，优惠券接口 , 行业此讯 , 手机号码注册
 *
 */

/**
 * 获取创业记录仪首页数据
 */
export function getStartupIndex() {
	return request.get("startup/index", {}, {
		noAuth: true
	});
}

/**
 * 保存今日经营数据
 * @param object data
 */
export function saveStartupToday(data) {
	return request.post("startup/today", data, {
		noAuth: true
	});
}

/**
 * 设置月度目标
 * @param object data
 */
export function setStartupMonthTarget(data) {
	return request.post("startup/month/target", data, {
		noAuth: true
	});
}

/**
 * 获取利润趋势数据
 * @param string type 趋势类型：week(本周)、month(本月)、year(本年)
 */
export function getStartupTrend(type) {
	return request.get(`startup/trend/${type}`, {}, {
		noAuth: true
	});
}
export function getAjcaptcha(data) {
	return request.get("ajcaptcha", data, {
		noAuth: true
	});
}

export function ajcaptchaCheck(data) {
	return request.post("ajcheck", data, {
		noAuth: true
	});
}

/**
 * 获取主页数据 无需授权
 *
 */
export function getIndexData() {
	return request.get("v2/index", {}, {
		noAuth: true
	});
}
/**
 * 获取服务器类型
 *
 */
export function getServerType() {
	return request.get("v2/site_serve", {}, {
		noAuth: true
	});
}

/**
 * 获取首页数据（轮播图和公告）
 *
 */
export function getHomeData() {
	return request.get("index/data", {}, {
		noAuth: true
	});
}

/**
 * 获取课程列表
 * @param object data
 */
export function getCourseList(data) {
	return request.get("startup/course/list", data, {
		noAuth: true
	});
}

/**
 * 获取登录授权login
 *
 */
export function getLogo() {
	return request.get('wechat/get_logo', {}, {
		noAuth: true
	});
}


/**
 * 保存form_id
 * @param string formId
 */
export function setFormId(formId) {
	return request.post("wechat/set_form_id", {
		formId: formId
	});
}

/**
 * 领取优惠卷
 * @param int couponId
 *
 */
export function setCouponReceive(couponId) {
	return request.post('coupon/receive', {
		couponId: couponId
	});
}
/**
 * 优惠券列表
 * @param object data
 */
export function getCoupons(data) {
	return request.get('v2/coupons', data, {
		noAuth: true
	})
}
/**
 * 首页优惠券列表组件数据
 * @param object data
 */
export function getCouponsIndex(data) {
	return request.get('coupons', data, {
		noAuth: true
	})
}

/**
 * 我的优惠券
 * @param int types 0全部  1未使用 2已使用
 */
export function getUserCoupons(types, data) {
	return request.get('coupons/user/' + types, data)
}

/**
 * 首页新人优惠券
 *
 */
export function getNewCoupon() {
	return request.get('v2/new_coupon')
}

/**
 * 文章分类列表
 *
 */
export function getArticleCategoryList() {
	return request.get('article/category/list', {}, {
		noAuth: true
	})
}

/**
 * 文章列表
 * @param int cid
 *
 */
export function getArticleList(cid, data) {
	return request.get('article/list/' + cid, data, {
		noAuth: true
	})
}

/**
 * 文章 热门列表
 *
 */
export function getArticleHotList() {
	return request.get('article/hot/list', {}, {
		noAuth: true
	});
}

/**
 * 文章 轮播列表
 *
 */
export function getArticleBannerList() {
	return request.get('article/banner/list', {}, {
		noAuth: true
	})
}

/**
 * 文章详情
 * @param int id
 *
 */
export function getArticleDetails(id) {
	return request.get('article/details/' + id, {}, {
		noAuth: true
	});
}

/**
 * 手机号+验证码登录接口
 * @param object data
 */
export function loginMobile(data) {
	return request.post('login/mobile', data, {
		noAuth: true
	})
}

/**
 * 获取短信KEY
 * @param object phone
 */
export function verifyCode() {
	return request.get('verify_code', {}, {
		noAuth: true
	})
}

/**
 * 验证码发送
 * @param object phone
 */
export function registerVerify(phone, reset, key, captchaType, captchaVerification) {
	return request.post('register/verify', {
		phone: phone,
		type: reset === undefined ? 'reset' : reset,
		key: key,
		captchaType: captchaType,
		captchaVerification: captchaVerification
	}, {
		noAuth: true
	})
}

/**
 * 手机号注册
 * @param object data
 *
 */
export function phoneRegister(data) {
	return request.post('register', data, {
		noAuth: true
	});
}

/**
 * 手机号修改密码
 * @param object data
 *
 */
export function phoneRegisterReset(data) {
	return request.post('register/reset', data, {
		noAuth: true
	})
}

/**
 * 手机号+密码登录
 * @param object data
 *
 */
export function phoneLogin(data) {
	return request.post('login', data, {
		noAuth: true
	})
}

/**
 * 切换H5登录
 * @param object data
 */
// #ifdef MP
export function switchH5Login() {
	return request.post('switch_h5', {
		'from': 'routine'
	});
}
// #endif

/*
 * h5切换公众号登录
 * */
// #ifdef H5
export function switchH5Login() {
	return request.post("switch_h5", {
		'from': "wechat"
	});
}
// #endif

/**
 * 绑定手机号
 *
 */
export function bindingPhone(data) {
	return request.post('binding', data, {
		noAuth: true
	});
}



/**
 * 绑定手机号
 *
 */
export function bindingUserPhone(data) {
	return request.post('user/binding', data);
}

/**
 * 退出登錄
 *
 */
export function logout() {
	return request.get('logout');
}

/**
 * 获取订阅消息id
 */
export function getTempIds() {
	return request.get('wechat/temp_ids', {}, {
		noAuth: true
	});
}

/**
 * 首页拼团数据
 */
export function pink() {
	return request.get('pink', {}, {
		noAuth: true
	});
}

/**
 * 获取城市信息
 */
export function getCity() {
	return request.get('city_list', {}, {
		noAuth: true
	});
}

/**
 * 获取列表
 */
export function getLiveList(page, limit) {
	return request.get('wechat/live', {
		page,
		limit
	}, {
		noAuth: true
	});
}

/**
 * 获取首页DIY；
 */
export function getDiy(id) {
	return request.get(`v2/diy/get_diy/default${id ? '?id=' + id : ''}`, {}, {
		noAuth: true
	});
}

/**
 * 一键换色；
 */
export function colorChange(name) {
	return request.get('v2/diy/color_change/' + name, {}, {
		noAuth: true
	});
}

/**
 * 获取公众号关注
 * @returns {*}
 */
export function follow() {
	return request.get("wechat/follow", {}, {
		noAuth: true
	});
}

/**
 * 更换手机号码
 * @returns {*}
 */
export function updatePhone(data) {
	return request.post("user/updatePhone", data, {
		noAuth: true
	});
}

/**
 * 首页优惠券弹窗
 * @returns {*}
 */
export function getCouponV2() {
	return request.get("v2/get_today_coupon", {}, {
		noAuth: true
	});
}

/**
 * 新用户优惠券弹窗
 * @returns {*}
 */
export function getCouponNewUser() {
	return request.get("v2/new_coupon", {}, {
		noAuth: true
	});
}

/**
 * 首页快速选择数据
 * @param {Object} data
 */
export function category(data) {
	return request.get("category", data, {
		noAuth: true
	});
}

/**
 * 个人搜索历史
 * @param {Object} data
 */
export function searchList(data) {
	return request.get('v2/user/search_list', data, {
		noAuth: true
	});
}

/**
 * 删除搜索历史
 */
export function clearSearch() {
	return request.get('v2/user/clean_search');
}
/**
 * 获取网站基础配置
 */
export function siteConfig(data) {
	return request.get('site_config', data, {
		noAuth: true
	});
}

/**
 * App微信登录
 * @returns {*}
 */
export function wechatAppAuth(data) {
	return request.post("wechat/app_auth", data, {
		noAuth: true
	});
}
/**
 * 获取客服类型
 * @returns {*}
 */
export function getCustomerType(data) {
	return request.get("get_customer_type", {}, {
		noAuth: true
	});
}

/**
 * 获取开屏广告
 * @returns {*}
 */
export function getOpenAdv(data) {
	return request.get("get_open_adv", {}, {
		noAuth: true
	});
}

/**
 * 获取版权信息
 */
export function getCrmebCopyRight() {
	return request.get('copyright', {}, {
		noAuth: true
	})
}
/**
 * 获取DIY版本接口
 * @param {Object} id
 */
export function getDiyVersion(name) {
	return request.get(`v2/diy/get_version/${name}`, {}, {
		noAuth: true
	});
}

/**
 * 获取DIY签到信息
 * @param {Object} id
 */
export function getSign() {
	return request.get('v2/diy/sign', {}, {
		noAuth: true
	});
}

/**
 * 获取招募活动信息
 */
export function getRecruitmentCampaign() {
	return request.get('recruitmentCampaign', {}, {
		noAuth: true
	});
}

/**
 * 获取推广统计信息
 */
export function getInviteStatistics() {
	return request.get('inviteStatistics');
}

/**
 * 获取AI对话历史记录
 * @param object data 包含session_id
 */
export function aiGetHistory(page = 1, limit = 10, sessionId = '') {
	return request.get('ai/conversation/history?page=' + page + '&limit=' + limit + '&session_id=' + sessionId);
}



/**
 * AI对话生成
 * @param object data 包含message和session_id
 */
export function aiChat(data) {
	return request.post('ai/chat', data);
}

/**
 * AI对话生成流式输出
 * @param object data 包含message和session_id
 */
export function aiChatStream(data) {
	return request.post('ai/chat_stream', data);
}

/**
 * 同步文字生成图片
 * @param object data 包含prompt和session_id
 */
export function aiGenerateImageSync(data) {
	return request.post('ai/generate_image', data);
}


/**
 * 异步文字生成图片
 * @param object data 包含prompt和session_id
 */
export function aiGenerateImage(data) {
	return request.post('ai/generate_image_async', data);
}

/**
 * 获取图片生成结果
 * @param string taskId 任务ID
 */
export function aiGetImageResult(taskId) {
	return request.get(`ai/get_image_result?task_id=${taskId}`);
}

/**
 * 异步文字生成视频
 * @param object data 包含prompt和session_id
 */
export function aiGenerateVideo(data) {
	return request.post('ai/generate_video_async', data,);
}

/**
 * 获取视频生成结果
 * @param string taskId 任务ID
 */
export function aiGetVideoResult(taskId) {
	return request.get(`ai/get_video_result?task_id=${taskId}`);
}

/**
 * 获取课程详情
 * @param string id 课程ID
 */
export function getCourseDetail(id) {
	return request.get(`startup/course/detail/${id}`, {}, {
		noAuth: true
	});
}

/**
 * 获取课程章节列表
 * @param string courseId 课程ID
 */
export function getCourseChapters(courseId) {
	return request.get(`startup/course/chapters/${courseId}`, {}, {
		noAuth: true
	});
}

/**
 * 获取章节视频地址
 * @param string chapterId 章节ID
 */
export function getChapterVideo(chapterId) {
	return request.get(`startup/chapter/video/${chapterId}`, {}, {
		noAuth: true
	});
}

/**
 * 获取创业分类列表
 * @param string article_type 类型 0课程 1资料
 */
export function getStartupCategoryList(article_type) {
	return request.get(`article/category/list?article_type=${article_type}`, {}, {
		noAuth: true
	});
}

/**
 * 获取资料列表
 * @param object data 包含category_id、keyword、is_free、sort等参数
 */
export function getMaterialList(data) {
	return request.get('startup/material/list', data, {
		noAuth: true
	});
}

/**
 * 获取资料详情
 * @param string id 资料ID
 */
export function getMaterialDetail(id) {
	return request.get(`startup/material/detail/${id}`, {}, {
		noAuth: true
	});
}

/**
 * 下载资料
 * @param string id 资料ID
 */
export function downloadMaterial(id) {
	return request.get(`startup/material/download/${id}`);
}

/**
 * 购买课程/资料
 * @param string type 购买类型：course(课程)、material(资料)
 * @param string item_id 课程/资料ID
 * @param string pay_type 支付方式：weixin(微信支付)、alipay(支付宝)等
 */
export function buyItem(type, item_id, pay_type) {
	return request.post(`startup/buy/${type}`, {
		item_id: item_id,
		pay_type: pay_type
	});
}

/**
 * 获取订单支付状态
 * @param string order_sn 订单号
 */
export function getOrderPayStatus(order_sn) {
	return request.get(`startup/order/pay/status/${order_sn}`);
}

/**
 * 获取我的课程列表
 * @param {Object} params - 请求参数
 * @param {number} params.page - 页码
 * @param {number} params.limit - 每页数量
 * @returns {Promise}
 */
export function getMyCourses(params) {
	return request.get('/startup/my/courses', params);
}

/**
 * 获取我的资料列表
 * @param {Object} params - 请求参数
 * @param {number} params.page - 页码
 * @param {number} params.limit - 每页数量
 * @returns {Promise}
 */
export function getMyMaterials(params) {
	return request.get('/startup/my/materials', params);
}

/**
 * 获取AI问题
 */
export function getAiQuestion() {
	return request.get('/ai/question', {}, {
		noAuth: true
	});
}

/**
 * 获取算力配置
 */
export function getComputePowerConfig() {
	return request.get('/ai/get_compute_power_config', {}, {
		noAuth: true
	});
}

/**
 * 查询卡密信息
 * @param {Object} data
 * @param {string} data.card_number
 */
export function getRedeemCardInfo(data) {
	return request.post('user/redeem/card/info', data);
}

/**
 * 兑换卡密
 * @param {Object} data
 * @param {string} data.card_number
 */
export function redeemCard(data) {
	return request.post('user/redeem/card', data);
}

/**
 * 获取卡密兑换记录
 */
export function getRedeemCardHistory() {
	return request.get('user/redeem/card/history');
}
