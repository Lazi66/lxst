<template>
    <view class="page">
        <l-topbar :is_minus="false" bgColor="transparent">
            <view class="x c f34 font-b fc0 w-a">我的</view>
        </l-topbar>
        <view class="m-y-60 m-x-20 x c-y" v-if="!userInfo.uid" @click="openAuto">
            <view class="pic br-50 bg-2 m-r-20 o-h"></view>
            <view>
                <view class="fc-1a f36 fw-500 m-b-10">{{ $t('请点击登录') }}</view>
            </view>
        </view>
        <view class="m-y-60 m-x-20 x c-y" v-if="userInfo.uid">
            <view class="pic br-50 bg-2 m-r-20 o-h">
                <image class="avatar" :src="userInfo.avatar" v-if="userInfo.avatar" @click="goEdit()" style="width: 100%; height: 100%;"></image>
                <image v-else class="avatar" :src="`${imgHost}/static/images/f.png`" mode="" @click="goEdit()" style="width: 100%; height: 100%;"></image>
            </view>
            <view>
                <view class="fc-1a f36 fw-500 m-b-10">{{ userInfo.nickname }}</view>
                <view class="fc9 f24">ID:{{ userInfo.uid }}</view>
            </view>
        </view>
        <view class="p-x-20" @click="toUrl('/pages/annex/vip_paid/index')" v-if="userInfo.uid && configData.review_mode == 0">
            <view v-if="userInfo.vip_status == -1 || userInfo.vip_status == 2" class="w-a pos-r h142 br-24 o-h">
                <image class="img" :src="`${imgHost}/static/images/w/背景@2x.png`"></image>
                <view class="pos-a t-0 w-a h-a x c-y p-x-40 p-y-20">
                    <view class="flex-1 y jc-sb">
                        <view class="x c-y">
                            <view class="t-icon">
                                <image class="img" :src="`${imgHost}/static/images/w/组 126884@2x.png`"></image>
                            </view>
                            <view class="fc-bai f36">开通会员</view>
                        </view>
                        <view class="f24 fc-82 m-t-10">会员课程免费学·一对一课后辅导</view>
                    </view>
                    <view class="x c br-31 bg-fa fc-1f f28 fw-700 p-x-25 p-y-10">立即开通</view>
                </view>
            </view>
            <view v-if="(userInfo.vip_status == 1 || userInfo.vip_status == 3) && userInfo.money_level_id == 1" class="w-a pos-r h142 br-24">
                <image class="img" :src="`${imgHost}/static/images/w/背景@2x1.png`"></image>
                <view class="pos-a t-0 w-a h-a x c-y p-x-40 p-y-20">
                    <view class="flex-1 y jc-sb">
                        <view class="f36 fc-f5">{{ userInfo.vip_info.title }}</view>
                        <view class="f24 fc-bb m-t-10" v-if="userInfo.vip_status == 3">{{userInfo.overdue_time_text}} 到期</view>
                        <view class="f24 fc-82 m-t-10" v-else>终身会员</view>
                    </view>
                    <view class="h-tu">
                        <image class="img" :src="`${imgHost}/static/images/w/组 126933@2x.png`"></image>
                    </view>
                </view>
            </view>
            <view v-if="(userInfo.vip_status == 1 || userInfo.vip_status == 3) && userInfo.money_level_id == 2" class="w-a pos-r h142 br-24">
                <image class="img" :src="`${imgHost}/static/images/w/背景@2x0.png`"></image>
                <view class="pos-a t-0 w-a h-a x c-y p-x-40 p-y-20">
                    <view class="flex-1 y jc-sb">
                        <view class="f36 fc-c3">{{ userInfo.vip_info.title }}</view>
                        <view class="f24 fc-8b m-t-10" v-if="userInfo.vip_status == 3">{{userInfo.overdue_time_text}} 到期</view>
                        <view class="f24 fc-82 m-t-10" v-else>终身会员</view>
                    </view>
                    <view class="h-tu">
                        <image class="img" :src="`${imgHost}/static/images/w/组 126934@2x.png`"></image>
                    </view>
                </view>
            </view>
        </view>
        <view class="p-x-20" @click="toUrl('/pages/annex/vip_paid/index')" v-if="!userInfo.uid && configData.review_mode == 0">
            <view class="w-a pos-r h142 br-24 o-h">
                <image class="img" :src="`${imgHost}/static/images/w/背景@2x.png`"></image>
                <view class="pos-a t-0 w-a h-a x c-y p-x-40 p-y-20">
                    <view class="flex-1 y jc-sb">
                        <view class="x c-y">
                            <view class="t-icon">
                                <image class="img" :src="`${imgHost}/static/images/w/组 126884@2x.png`"></image>
                            </view>
                            <view class="fc-bai f36">开通会员</view>
                        </view>
                        <view class="f24 fc-82 m-t-10">会员课程免费学·一对一课后辅导</view>
                    </view>
                    <view class="x c br-31 bg-fa fc-1f f28 fw-700 p-x-25 p-y-10">立即开通</view>
                </view>
            </view>
        </view>
        <view class="p-x-20 p-y-30" v-if="configData.review_mode == 0">
            <view class="bg-k br-24 p-a-30">
                <view class="x jc-sb c-y">
                    <view class="fc0 f32 fw-700">我的订单</view>
                    <uv-icon @click="toUrl('/pages/goods/order_list/index')" name="arrow-right" color="#111111" size="14"></uv-icon>
                </view>
                <view class="x jc-sb m-t-40">
                    <view v-for="v in list" :key="v" class="y c-x">
                        <view class="icon m-b-10" @click="toUrl(v.page)"><image class="img" :src="`${imgHost}${v.icon}`"></image></view>
                        <view class="f24 fc-66">{{ v.name }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="p-x-20">
            <view class="bg-k br-20 p-a-30 fc-1a">
                <view class="m-b-40 f32 fw-700">我的服务</view>
                <!-- <view class="x c-y m-b-40" @click="goMenuPage('/pages/users/user_money/index')" v-if="configData.review_mode == 0">
                    <view class="icon m-r-20"><image class="img" :src="`${imgHost}/static/images/w/容器@3x(4).png`"></image></view>
                    <view class="f28">我的钱包</view>
                    <view class="flex-1"></view>
                    <uv-icon name="arrow-right" color="#999" size="14"></uv-icon>
                </view> -->
				<view class="x c-y m-b-40" @click="goMenuPage('/pages/users/user_spread_user/index')" v-if="configData.review_mode == 0">
                    <view class="icon m-r-20"><image class="img" :src="`${imgHost}/static/images/w/容器@3x(4).png`"></image></view>
                    <view class="f28">我的钱包</view>
                    <view class="flex-1"></view>
                    <uv-icon name="arrow-right" color="#999" size="14"></uv-icon>
                </view>
                <view class="x c-y m-b-40" @click="toUrl('/pages/w/kami_hexiao')">
                    <view class="icon m-r-20"><image class="img" :src="`${imgHost}/static/images/w/kami.png`"></image></view>
                    <view class="f28">卡密核销</view>
                    <view class="flex-1"></view>
                    <uv-icon name="arrow-right" color="#999" size="14"></uv-icon>
                </view>
                <view class="x c-y m-b-40" @click="toUrl('/pages/users/user_goods_collection/index')">
                    <view class="icon m-r-20"><image class="img" :src="`${imgHost}/static/images/w/容器@3x(1).png`"></image></view>
                    <view class="f28">我的收藏</view>
                    <view class="flex-1"></view>
                    <uv-icon name="arrow-right" color="#999" size="14"></uv-icon>
                </view>
				<view class="x c-y m-b-40" @click="toUrl('/pages/users/user_spread_code/index')" v-if="configData.review_mode == 0">
                    <view class="icon m-r-20"><image class="img" :src="`${imgHost}/static/images/w/容器@3x(3).png`"></image></view>
                    <view class="f28">我的二维码</view>
                    <view class="flex-1"></view>
                    <uv-icon name="arrow-right" color="#999" size="14"></uv-icon>
                </view>
                <view @click="toUrl('/pages/users/user_address_list/index')" class="x c-y m-b-40">
                    <view class="icon m-r-20"><image class="img" :src="`${imgHost}/static/images/w/address.png`"></image></view>
                    <view class="f28">我的地址</view>
                    <view class="flex-1"></view>
                    <uv-icon name="arrow-right" color="#999" size="14"></uv-icon>
                </view>
                <view class="x c-y m-b-40" v-if="configData.review_mode == 0" @click="toUrl('/pages/w/my_courses')">
                    <view class="icon m-r-20"><image class="img" :src="`${imgHost}/static/images/w/容器@3x(2).png`"></image></view>
                    <view class="f28">我的课程</view>
                    <view class="flex-1"></view>
                    <uv-icon name="arrow-right" color="#999" size="14"></uv-icon>
                </view>
                <view class="x c-y m-b-40" v-if="configData.review_mode == 0" @click="toUrl('/pages/w/my_materials')">
                    <view class="icon m-r-20"><image class="img" :src="`${imgHost}/static/images/w/document.png`"></image></view>
                    <view class="f28">我的资料</view>
                    <view class="flex-1"></view>
                    <uv-icon name="arrow-right" color="#999" size="14"></uv-icon>
                </view>
                <view class="x c-y" @click="goEdit()">
                    <view class="icon m-r-20"><image class="img" :src="`${imgHost}/static/images/w/容器@3x.png`"></image></view>
                    <view class="f28">设置</view>
                    <view class="flex-1"></view>
                    <uv-icon name="arrow-right" color="#999" size="14"></uv-icon>
                </view>
            </view>
        </view>
		<view style="height: 200rpx;"></view>
        <!-- <MainMenu value="my"></MainMenu> -->
		<pageFooter :style="colorStyle"></pageFooter>
    </view>
</template>
<script>
import MainMenu from "./menu.vue";
import pageFooter from '@/components/pageFooter/index.vue';
let sysHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
import { getMenuList, getUserInfo, setVisit, mpBindingPhone } from '@/api/user.js';
import { wechatAuthV2, silenceAuth } from '@/api/public.js';
import { toLogin } from '@/libs/login.js';
import { mapState, mapGetters } from 'vuex';
// #ifdef H5
import Auth from '@/libs/wechat';
// #endif
const app = getApp();
import dayjs from '@/plugin/dayjs/dayjs.min.js';
import Routine from '@/libs/routine';
import colors from '@/mixins/color';
import { getCustomer } from '@/utils/index.js';
import editUserModal from '@/components/eidtUserModal/index.vue';
import Cache from '@/utils/cache';
import {
    HTTP_REQUEST_URL
} from '@/config/app';

export default {
    components: {
        MainMenu,
		pageFooter,
        editUserModal
    },
    // computed: mapGetters(['isLogin','cartNum']),
	computed: {
		...mapGetters({
			cartNum: 'cartNum',
			isLogin: 'isLogin'
		})
	},
    filters: {
		coundTime(val) {
			var setTime = val * 1000;
			var nowTime = new Date();
			var rest = setTime - nowTime.getTime();
			var day = parseInt(rest / (60 * 60 * 24 * 1000));
			// var hour = parseInt(rest/(60*60*1000)%24) //小时
			return day + this.$t('day');
		},
		dateFormat: function (value) {
			return dayjs(value * 1000).format('YYYY-MM-DD');
		}
	},
	mixins: [colors],
    data(){
        return {
            imgHost: HTTP_REQUEST_URL,
            type: 0,
            list: [{
                name: '全部',
                icon: '/static/images/w/Group 286@3x.png',
                page: '/pages/goods/order_list/index'
            },{
                name: '待付款',
                icon: '/static/images/w/Frame@3x(1).png',
                page: '/pages/goods/order_list/index?status=0'
            },{
                name: '待发货',
                icon: '/static/images/w/Group 287@3x.png',
                page: '/pages/goods/order_list/index?status=1'
            },{
                name: '待收货',
                icon: '/static/images/w/Group 283@3x.png',
                page: '/pages/goods/order_list/index?status=2'
            },{
                name: '待评价',
                icon: '/static/images/w/Frame@3x.png',
                page: '/pages/goods/order_list/index?status=3'
            },],
            editModal: false, // 编辑头像信息
			storeMenu: [], // 商家管理
			orderMenu: [
				{
					img: 'icon-daifukuan',
					title: '待付款',
					url: '/pages/goods/order_list/index?status=0'
				},
				{
					img: 'icon-daifahuo',
					title: '待发货',
					url: '/pages/goods/order_list/index?status=1'
				},
				{
					img: 'icon-daishouhuo',
					title: '待收货',
					url: '/pages/goods/order_list/index?status=2'
				},
				{
					img: 'icon-daipingjia',
					title: '待评价',
					url: '/pages/goods/order_list/index?status=3'
				},
				{
					img: 'icon-a-shouhoutuikuan',
					title: '售后/退款',
					url: '/pages/users/user_return_list/index'
				}
			],
			imgUrls: [],
			autoplay: true,
			circular: true,
			interval: 3000,
			duration: 500,
			isAuto: false, //没有授权的不会自动授权
			isShowAuth: false, //是否隐藏授权
			orderStatusNum: {},
			userInfo: {},
			MyMenus: [],
			sysHeight: sysHeight,
			mpHeight: 0,
			showStatus: 1,
			activeRouter: '',
			// #ifdef H5 || MP
			pageHeight: '100%',
			routineContact: 0,
			// #endif
			// #ifdef APP-PLUS
			pageHeight: app.globalData.windowHeight,
			// #endif
			// #ifdef H5
			isWeixin: Auth.isWeixin(),
			//#endif
			footerSee: false,
			my_menus_status: 0,
			business_status: 0,
			member_style: 0,
			my_banner_status: 0,
			is_diy: uni.getStorageSync('is_diy'),
            configData: Cache.get('BASIC_CONFIG') || {}

        }
    },
    	onLoad(option) {
		uni.hideTabBar();
		let that = this;
		// #ifdef MP
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
		// #endif

		// #ifdef H5 || APP-PLUS
		// if (that.isLogin == false) {
		// 	toLogin();
		// }
		//获取用户信息回来后授权
		let cacheCode = this.$Cache.get('snsapi_userinfo_code');
		let res1 = cacheCode ? option.code != cacheCode : true;
		if (this.isWeixin && option.code && res1 && option.scope === 'snsapi_userinfo') {
			this.$Cache.set('snsapi_userinfo_code', option.code);
			Auth.auth(option.code)
				.then((res) => {
					this.getUserInfo();
				})
				.catch((err) => {});
		}
		// #endif
		// #ifdef APP-PLUS
		that.$set(that, 'pageHeight', app.globalData.windowHeight);
		// #endif

		let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
		let curRoute = routes[routes.length - 1].route; //获取当前页面路由
		this.activeRouter = '/' + curRoute;
	},
	onReady() {
		let self = this;
		// #ifdef MP
		let info = uni.createSelectorQuery().select('.sys-head');
		info
			.boundingClientRect(function (data) {
				//data - 各种参数
				if (data) {
					self.mpHeight = data.height;
				}
			})
			.exec();
		// #endif
	},
	onShow: function () {
		let that = this;
		// #ifdef APP-PLUS
		uni.getSystemInfo({
			success: function (res) {
				that.pageHeight = res.windowHeight + 'px';
			}
		});
		// #endif
		if (that.isLogin) {
			this.getUserInfo();
			this.setVisit();
		}
		this.getMyMenus();
		this.getCopyRight();
	},
	onPullDownRefresh() {
		this.onLoadFun();
	},
    methods: {
        toUrl(url) {
            if(!url) return
            uni.navigateTo({
                url,
            });
        },
		getWechatuserinfo() {
			//#ifdef H5
			Auth.isWeixin() && Auth.toAuth('snsapi_userinfo', '/pages/user/index');
			//#endif
		},
		editSuccess() {
			this.editModal = false;
			this.getUserInfo();
		},
		closeEdit() {
			this.editModal = false;
		},
		// 记录会员访问
		setVisit() {
			setVisit({
				url: '/pages/user/index'
			}).then((res) => {});
		},
		// 打开授权
		openAuto() {
			toLogin();
		},
		// 授权回调
		onLoadFun() {
			this.getUserInfo();
			this.getMyMenus();
			this.setVisit();
		},
		Setting: function () {
			uni.openSetting({
				success: function (res) {}
			});
		},
		// 授权关闭
		authColse: function (e) {
			this.isShowAuth = e;
		},
		// 绑定手机
		bindPhone() {
			uni.navigateTo({
				url: '/pages/users/user_phone/index'
			});
		},
		getphonenumber(e) {
			if (e.detail.errMsg == 'getPhoneNumber:ok') {
				Routine.getCode()
					.then((code) => {
						let data = {
							code,
							iv: e.detail.iv,
							encryptedData: e.detail.encryptedData
						};
						mpBindingPhone(data)
							.then((res) => {
								this.getUserInfo();
								this.$util.Tips({
									title: res.msg,
									icon: 'success'
								});
							})
							.catch((err) => {
								return this.$util.Tips({
									title: err
								});
							});
					})
					.catch((error) => {
						uni.hideLoading();
					});
			}
		},
		/**
		 * 获取个人用户信息
		 */
		getUserInfo: function () {
			let that = this;
			getUserInfo().then((res) => {
				that.userInfo = res.data;
				that.$store.commit('SETUID', res.data.uid);
				that.orderMenu.forEach((item, index) => {
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
		getUserProfile() {
			toLogin();
		},
		/**
		 *
		 * 获取个人中心图标
		 */
		switchTab(order) {
			this.orderMenu.forEach((item, index) => {
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
		getMyMenus: function () {
			let that = this;
			// if (this.MyMenus.length) return;
			getMenuList().then((res) => {
				this.member_style = Number(res.data.diy_data.value);
				this.my_banner_status = res.data.diy_data.my_banner_status;
				this.my_menus_status = res.data.diy_data.my_menus_status;
				this.business_status = res.data.diy_data.business_status;
				let storeMenu = [];
				let myMenu = [];
				res.data.routine_my_menus.forEach((el, index, arr) => {
					if (el.url == '/pages/admin/order/index' || el.url == '/pages/admin/order_cancellation/index' || el.name == '客服接待') {
						storeMenu.push(el);
					} else {
						myMenu.push(el);
					}
				});

				let order01 = {
					dfk: 'icon-daifukuan',
					dfh: 'icon-daifahuo',
					dsh: 'icon-daishouhuo',
					dpj: 'icon-daipingjia',
					sh: 'icon-a-shouhoutuikuan'
				};
				let order02 = {
					dfk: 'icon-daifukuan-lan',
					dfh: 'icon-daifahuo-lan',
					dsh: 'icon-daishouhuo-lan',
					dpj: 'icon-daipingjia-lan',
					sh: 'icon-shouhou-tuikuan-lan'
				};
				let order03 = {
					dfk: 'icon-daifukuan-ju',
					dfh: 'icon-daifahuo-ju',
					dsh: 'icon-daishouhuo-ju',
					dpj: 'icon-daipingjia-ju',
					sh: 'icon-shouhou-tuikuan-ju'
				};
				let order04 = {
					dfk: 'icon-daifukuan-fen',
					dfh: 'icon-daifahuo-fen',
					dsh: 'icon-daishouhuo-fen',
					dpj: 'icon-daipingjia-fen',
					sh: 'icon-a-shouhoutuikuan-fen'
				};
				let order05 = {
					dfk: 'icon-daifukuan-lv',
					dfh: 'icon-daifahuo-lv',
					dsh: 'icon-daishouhuo-lv',
					dpj: 'icon-daipingjia-lv',
					sh: 'icon-shouhou-tuikuan-lv'
				};
				switch (res.data.diy_data.order_status) {
					case 1:
						this.switchTab(order01);
						break;
					case 2:
						this.switchTab(order02);
						break;
					case 3:
						this.switchTab(order03);
						break;
					case 4:
						this.switchTab(order04);
						break;
					case 5:
						this.switchTab(order05);
						break;
				}
				that.$set(that, 'MyMenus', myMenu);
				that.$set(that, 'storeMenu', storeMenu);
				this.imgUrls = res.data.routine_my_banner;
				this.routineContact = Number(res.data.routine_contact_type);
			});
		},
		// 编辑页面
		goEdit() {
			if (this.isLogin == false) {
				toLogin();
			} else {
				uni.navigateTo({
					url: '/pages/users/user_info/index'
				});
			}
		},
		// 签到
		goSignIn() {
			uni.navigateTo({
				url: '/pages/users/user_sgin/index'
			});
		},

		goPages(url) {
			this.$util.JumpPath(url);
		},

		// goMenuPage
		goMenuPage(url, name) {
			if (this.isLogin) {
				if (url.indexOf('http') === -1) {
					// #ifdef H5 || APP-PLUS
					if (name && name === '客服接待') {
						// return window.location.href = `${location.origin}${url}`
						return uni.navigateTo({
							url: `/pages/annex/web_view/index?url=${location.origin}${url}`
						});
					} else if (name && name === '联系客服') {
						return getCustomer(url);
					} else if (name === '订单核销') {
						return uni.navigateTo({
							url: url
						});
						// return window.location.href = `${location.origin}${url}`
					}
					// #endif

					// #ifdef MP
					if (name && name === '联系客服') {
						return getCustomer(url);
					}
					if (url != '#' && url == '/pages/users/user_info/index') {
						uni.openSetting({
							success: function (res) {}
						});
					}
					// #endif
					uni.navigateTo({
						url: url,
						fail(err) {
							uni.switchTab({
								url: url
							});
						}
					});
				} else {
					uni.navigateTo({
						url: `/pages/annex/web_view/index?url=${url}`
					});
				}
			} else {
				// #ifdef MP
				this.openAuto();
				// #endif
				// #ifndef MP
				toLogin();
				// #endif
			}
		},
		goRouter(item) {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1].$page.fullPath;
			if (item.link == page) return;
			uni.switchTab({
				url: item.link,
				fail(err) {
					uni.redirectTo({
						url: item.link
					});
				}
			});
		},
		getCopyRight() {
			const copyRight = uni.getStorageSync('copyRight');
			if (copyRight.copyrightImage) {
				this.copyRightPic = copyRight.copyrightImage;
			}
		}
	}
};
</script>
<style scoped lang="less">
.fc-c3 {
    color: #C3DFFF;
}
.icon {
    width: 40rpx;
    height: 40rpx;
}
.fc-66{
    color: #666262;
}
.fc-8b {
    color: #8B9EB3;
}
.h-tu {
    width: 168rpx;
    height: 196rpx;
    position: absolute;
    bottom: 20rpx;
    right: 32rpx;
}
.fc-bb{
    color: #BBA88C;
}
.fc-f5 {
    color: #F5D2A0;
}
.h142 {
    height: 142rpx;
}
.t-0 {
    top: 0;
}
.fc-1f {
    color: #1F2D4E;
}
.bg-fa {
    background-color: #FAFBFC;
}
.fc-82 {
    color: #8291B2;
}
.br-31{
    border-radius: 31rpx;
}
.t-icon {
    width: 48rpx;
    height: 48rpx;
}
.page{
    background-color: #F6F6F6;
    background-image: linear-gradient(180deg, rgba(39, 105, 237, 0.15) 0%, rgba(203, 123, 250, 0) 400rpx);
    background-repeat: no-repeat;
    min-height: 100vh;
}
.fc-1a {
    color: #1a1a1a;
}
.pic{
    width: 120rpx;
    height: 120rpx;
}
.m-y-60{
    margin-top: 60rpx;
    margin-bottom: 60rpx;
}
</style>