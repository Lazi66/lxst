<template>
    <view class="page-container">
        <l-nav fanhui title="确认兑换" bgColor="#f8f9fa"></l-nav>

        <view class="content-wrap p-30" v-if="loading">
            <view class="loading-state x c y p-y-80">
                <text class="f28 fc-999">正在查询卡密信息...</text>
            </view>
        </view>

        <view class="content-wrap p-30" v-else-if="cardInfo">
            <view class="info-card br-24 bg-white p-30 m-b-30">
                <view class="card-header x jc-sb c-y m-b-30 bottom-border p-b-20">
                    <view class="f32 fw-bold fc-333">卡密信息</view>
                    <view class="status-tag tag-green x c-y p-x-15 p-y-5 br-8">
                        <view class="m-r-5">
                            <uv-icon name="checkbox-mark" color="#07C160" size="14"></uv-icon>
                        </view>
                        <text class="f22 fc-green">可兑换</text>
                    </view>
                </view>

                <view class="info-list y">
                    <view class="info-item x jc-sb m-b-20">
                        <text class="f28 fc-999">卡号</text>
                        <text class="f28 fw-bold fc-333">{{ formattedCdkey }}</text>
                    </view>
                    <view class="info-item x jc-sb m-b-20">
                        <text class="f28 fc-999">卡密类型</text>
                        <text class="f28 fw-bold fc-333">{{ cardInfo.card_type_text || '-' }}</text>
                    </view>
                    <view class="info-item x jc-sb m-b-20">
                        <text class="f28 fc-999">权益名称</text>
                        <text class="f28 fw-bold fc-333">{{ cardInfo.target_name || '-' }}</text>
                    </view>
                    <view class="info-item x jc-sb m-b-20" v-if="isMemberCard">
                        <text class="f28 fc-999">会员时长</text>
                        <text class="f28 fw-bold fc-333">{{ memberDurationText }}</text>
                    </view>
                    <view class="info-item x jc-sb">
                        <text class="f28 fc-999">权益类型</text>
                        <text class="f28 fw-bold fc-333">{{ displayTargetType }}</text>
                    </view>
                </view>

                <view class="tips-box bg-green-light br-12 p-20 m-t-30 x c-y">
                    <view class="m-r-10">
                        <uv-icon name="info-circle" color="#07C160" size="16"></uv-icon>
                    </view>
                    <text class="f24 fc-green">该卡密状态正常，确认后将立即发放权益</text>
                </view>
            </view>

            <view class="account-card br-24 bg-white p-30 m-b-40">
                <view class="card-header f32 fw-bold fc-333 m-b-30">{{ detailCardTitle }}</view>

                <view class="account-info x c-y" v-if="isMemberCard">
                    <image :src="displayUser.avatar || `${imgHost}/static/images/f.png`" class="avatar br-50 m-r-20"></image>
                    <view class="y jc-c">
                        <text class="f30 fw-bold fc-333 m-b-10">{{ displayUser.nickname || '当前用户' }}</text>
                        <text class="f24 fc-999">账号：{{ displayUser.phone || displayUser.uid || '-' }}</text>
                    </view>
                </view>

                <view class="target-info x c-y" v-else>
                    <image :src="displayTarget.cover_image || `${imgHost}/static/images/w/kami.png`" class="target-cover br-12 m-r-20" mode="aspectFill"></image>
                    <view class="y flex-1">
                        <text class="f30 fw-bold fc-333 m-b-10">{{ displayTarget.title || cardInfo.target_name || '-' }}</text>
                        <text class="f24 fc-999 m-b-10">{{ displayTargetType }}</text>
                        <text class="f24 fc-999" v-if="displayTarget.vip_day">时长：{{ displayTarget.vip_day }} 天</text>
                    </view>
                </view>

                <view class="notice-box bg-gray-light br-12 p-20 m-t-30">
                    <text class="f24 fc-666 lh-1-5">{{ detailNotice }}</text>
                </view>
            </view>

            <view class="bottom-action">
                <button
                    class="btn-primary"
                    @click="confirmActivate"
                    :loading="activating"
                    :disabled="activating"
                >
                    确认兑换
                </button>
            </view>
        </view>

        <view class="content-wrap p-30" v-else-if="errorMsg">
            <view class="error-state x c y p-y-80">
                <uv-icon name="close-circle-fill" color="#FA5151" size="64" class="m-b-30"></uv-icon>
                <text class="f32 fw-bold fc-333 m-b-20">查询失败</text>
                <text class="f26 fc-666">{{ errorMsg }}</text>
                <button class="btn-primary btn-outline m-t-60 w-100" @click="handleBack">重新输入卡密</button>
            </view>
        </view>
    </view>
</template>

<script>
import { HTTP_REQUEST_URL } from '@/config/app';
import { getRedeemCardInfo, redeemCard } from '@/api/api.js';
import { getUserInfo } from '@/api/user.js';
import { mapState } from 'vuex';
import lNav from '@/components/l-nav/nav.vue';

export default {
    components: {
        lNav
    },
    data() {
        return {
            imgHost: HTTP_REQUEST_URL,
            cdkey: '',
            loading: true,
            activating: false,
            cardInfo: null,
            latestUserInfo: {},
            errorMsg: ''
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.app.userInfo || uni.getStorageSync('userInfo') || {}
        }),
        currentUserInfo() {
            return (this.latestUserInfo && this.latestUserInfo.uid) ? this.latestUserInfo : this.userInfo;
        },
        displayUser() {
            return (this.cardInfo && this.cardInfo.user) || this.currentUserInfo || {};
        },
        displayTarget() {
            return (this.cardInfo && this.cardInfo.target) || {};
        },
        targetType() {
            return (this.cardInfo && this.cardInfo.target && this.cardInfo.target.type) || '';
        },
        isMemberCard() {
            return this.targetType === 'member';
        },
        formattedCdkey() {
            if (!this.cdkey) return '';
            return this.cdkey.replace(/(.{4})/g, '$1-').slice(0, -1).toUpperCase();
        },
        displayTargetType() {
            const typeMap = {
                course: '课程',
                material: '资料',
                member: '会员'
            };
            return typeMap[this.targetType] || this.targetType || '-';
        },
        detailCardTitle() {
            const titleMap = {
                course: '课程信息',
                material: '资料信息',
                member: '到账账号'
            };
            return titleMap[this.targetType] || '权益信息';
        },
        detailNotice() {
            const noticeMap = {
                course: '兑换后课程将发放到当前账号，你可以在“我的课程”中查看，也可以直接进入课程学习。',
                material: '兑换后资料将发放到当前账号，你可以在“我的资料”中查看，也可以直接打开资料详情。',
                member: '兑换后会员权益将绑定到当前登录账号，不支持转移，请确认账号信息无误。'
            };
            return noticeMap[this.targetType] || '兑换成功后权益将发放到当前账号。';
        },
        memberDurationText() {
            const vipDay = this.displayTarget.vip_day;
            if (!vipDay) return '-';
            return `${vipDay} 天`;
        }
    },
    onLoad(options) {
        if (options.cdkey) {
            this.cdkey = String(options.cdkey).replace(/-/g, '').toUpperCase();
            this.fetchLatestUserInfo();
            this.fetchCardInfo();
        } else {
            this.errorMsg = '卡密参数缺失';
            this.loading = false;
        }
    },
    methods: {
        handleBack() {
            uni.navigateBack();
        },
        async fetchLatestUserInfo() {
            try {
                const res = await getUserInfo();
                this.latestUserInfo = res.data || {};
                if (this.latestUserInfo && this.latestUserInfo.uid) {
                    this.$store.commit('UPDATE_USERINFO', this.latestUserInfo);
                }
            } catch (err) {
            }
        },
        async getLatestUserInfoForRedeem() {
            try {
                const res = await getUserInfo();
                const latestUserInfo = res.data || {};
                this.latestUserInfo = latestUserInfo;
                if (latestUserInfo && latestUserInfo.uid) {
                    this.$store.commit('UPDATE_USERINFO', latestUserInfo);
                }
                return latestUserInfo;
            } catch (err) {
                return this.currentUserInfo || {};
            }
        },
        async fetchCardInfo() {
            this.loading = true;
            this.errorMsg = '';
            this.cardInfo = null;
            try {
                const res = await getRedeemCardInfo({
                    card_number: this.cdkey
                });
                this.cardInfo = res.data || {};
            } catch (err) {
                this.errorMsg = (err && err.msg) || err || '卡密不存在或已被使用';
            } finally {
                this.loading = false;
            }
        },
        async confirmActivate() {
            if (this.activating) return;
            this.activating = true;
            try {
                const latestUserInfo = this.isMemberCard ? await this.getLatestUserInfoForRedeem() : (this.currentUserInfo || {});
                const res = await redeemCard({
                    card_number: this.cdkey
                });
                const payload = res.data || this.cardInfo || {};
                const target = payload.target || {};
                const productName = payload.target_name || target.title || '';
                const previousExpireDate = (latestUserInfo && latestUserInfo.overdue_time_text) || '';
                const previousVipStatus = (latestUserInfo && latestUserInfo.vip_status) || 0;
                uni.redirectTo({
                    url: `/pages/w/kami_hexiao_result?status=success&product_name=${encodeURIComponent(productName)}&target_type=${encodeURIComponent(target.type || '')}&target_id=${target.id || ''}&cover_image=${encodeURIComponent(target.cover_image || '')}&vip_day=${target.vip_day || 0}&card_type_text=${encodeURIComponent(payload.card_type_text || '')}&previous_expire_date=${encodeURIComponent(previousExpireDate)}&previous_vip_status=${previousVipStatus}`
                });
            } catch (err) {
                const errorMsg = (err && err.msg) || err || '兑换失败';
                uni.redirectTo({
                    url: `/pages/w/kami_hexiao_result?status=fail&error=${encodeURIComponent(errorMsg)}`
                });
            } finally {
                this.activating = false;
            }
        }
    }
};
</script>

<style scoped>
.page-container {
    background-color: #f8f9fa;
    min-height: 100vh;
}
.p-30 { padding: 30rpx; }
.p-20 { padding: 20rpx; }
.p-x-15 { padding-left: 15rpx; padding-right: 15rpx; }
.p-y-5 { padding-top: 5rpx; padding-bottom: 5rpx; }
.p-y-80 { padding-top: 80rpx; padding-bottom: 80rpx; }
.p-b-20 { padding-bottom: 20rpx; }
.m-b-10 { margin-bottom: 10rpx; }
.m-b-20 { margin-bottom: 20rpx; }
.m-b-30 { margin-bottom: 30rpx; }
.m-b-40 { margin-bottom: 40rpx; }
.m-t-30 { margin-top: 30rpx; }
.m-t-60 { margin-top: 60rpx; }
.m-r-5 { margin-right: 5rpx; }
.m-r-10 { margin-right: 10rpx; }
.m-r-20 { margin-right: 20rpx; }

.br-8 { border-radius: 8rpx; }
.br-12 { border-radius: 12rpx; }
.br-24 { border-radius: 24rpx; }
.br-50 { border-radius: 50%; }

.bg-white { background-color: #ffffff; }
.bg-green-light { background-color: rgba(7, 193, 96, 0.1); }
.bg-gray-light { background-color: #f5f5f5; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { align-items: center; justify-content: center; }
.c-y { align-items: center; }
.jc-c { justify-content: center; }
.jc-sb { justify-content: space-between; }
.flex-1 { flex: 1; }
.w-100 { width: 100%; }

.f22 { font-size: 22rpx; }
.f24 { font-size: 24rpx; }
.f26 { font-size: 26rpx; }
.f28 { font-size: 28rpx; }
.f30 { font-size: 30rpx; }
.f32 { font-size: 32rpx; }

.fc-333 { color: #333333; }
.fc-666 { color: #666666; }
.fc-999 { color: #999999; }
.fc-green { color: #07C160; }
.fw-bold { font-weight: bold; }

.bottom-border {
    border-bottom: 2rpx solid #F0F0F0;
}
.lh-1-5 {
    line-height: 1.5;
}

.avatar {
    width: 96rpx;
    height: 96rpx;
    background-color: #e5e5e5;
}
.target-cover {
    width: 120rpx;
    height: 120rpx;
    background-color: #f5f5f5;
    flex-shrink: 0;
}

.btn-primary {
    background: #1677FF;
    color: #ffffff;
    font-size: 32rpx;
    font-weight: bold;
    height: 96rpx;
    line-height: 96rpx;
    border-radius: 48rpx;
    text-align: center;
}
.btn-primary::after {
    border: none;
}
.btn-outline {
    background: transparent;
    color: #1677FF;
    border: 2rpx solid #1677FF;
}
</style>
