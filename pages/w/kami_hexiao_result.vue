<template>
    <view class="page-container">
        <l-nav fanhui title="兑换结果" bgColor="#f8f9fa"></l-nav>

        <view class="content-wrap p-30">
            <view class="result-header x c y p-y-40">
                <view class="icon-circle m-b-30" :class="isSuccess ? 'bg-green-light' : 'bg-red-light'">
                    <uv-icon :name="isSuccess ? 'checkmark' : 'info'" :color="isSuccess ? '#07C160' : '#FA5151'" size="48"></uv-icon>
                </view>
                <view class="f40 fw-bold fc-333 m-b-20">{{ isSuccess ? '兑换成功' : '兑换失败' }}</view>

                <view class="f26 fc-666 text-center" v-if="isSuccess">
                    {{ successDesc }}
                </view>
                <view class="y c" v-else>
                    <text class="f28 fc-red fw-bold m-b-10">{{ errorMsg || '卡密已被使用' }}</text>
                    <text class="f24 fc-999">该卡密无法重复兑换，请检查卡密状态或联系发卡渠道</text>
                </view>
            </view>

            <view class="detail-card br-24 bg-white p-30 m-b-40" v-if="isSuccess">
                <view class="card-header x jc-sb c-y m-b-30">
                    <view class="f32 fw-bold fc-333">{{ detailTitle }}</view>
                    <view class="vip-tag x c-y p-x-15 p-y-5 br-20">
                        <text class="f22 fc-orange fw-bold">{{ targetTypeText }}</text>
                    </view>
                </view>

                <view v-if="isMemberCard" class="info-item x jc-sb m-b-30 p-b-20 bottom-border">
                    <view class="y">
                        <text class="f28 fc-333 m-b-10">会员名称</text>
                        <text class="f22 fc-999">当前兑换到账的会员权益</text>
                    </view>
                    <view class="y align-right">
                        <text class="f28 fw-bold fc-333 m-b-10 time-text">{{ memberTitle }}</text>
                    </view>
                </view>

                <view v-if="isMemberCard" class="info-item x jc-sb m-b-30 p-b-20 bottom-border">
                    <view class="y">
                        <text class="f28 fc-333 m-b-10">有效天数</text>
                        <text class="f22 fc-999">本次兑换增加的会员时长</text>
                    </view>
                    <view class="y align-right">
                        <text class="f28 fw-bold fc-333 m-b-10 time-text">{{ memberVipDayText }}</text>
                    </view>
                </view>

                <view v-if="isMemberCard" class="info-item x jc-sb m-b-30 p-b-20 bottom-border">
                    <view class="y">
                        <text class="f28 fc-333 m-b-10">会员有效期限</text>
                        <text class="f22 fc-999">{{ memberDurationTip }}</text>
                    </view>
                    <view class="y align-right">
                        <text class="f28 fw-bold fc-333 m-b-10 time-text">{{ memberStartDate }} 起</text>
                        <text class="f28 fw-bold fc-333 time-text">{{ memberEndDate }}</text>
                    </view>
                </view>

                <view v-if="isMemberCard" class="privilege-tags x flex-wrap">
                    <view class="tag-gray br-30 p-x-20 p-y-10 m-r-20 m-b-20">
                        <text class="f24 fc-666">会员优惠券</text>
                    </view>
                    <view class="tag-gray br-30 p-x-20 p-y-10 m-r-20 m-b-20">
                        <text class="f24 fc-666">线下折扣</text>
                    </view>
                    <view class="tag-gray br-30 p-x-20 p-y-10 m-r-20 m-b-20">
                        <text class="f24 fc-666">签到返利</text>
                    </view>
                </view>

                <view v-else class="resource-card x c-y">
                    <image :src="coverImage || defaultCover" class="resource-cover m-r-20 br-20" mode="aspectFill"></image>
                    <view class="y flex-1">
                        <text class="f30 fw-bold fc-333 m-b-10">{{ productName }}</text>
                        <text class="f24 fc-999 m-b-10">{{ targetTypeText }}</text>
                        <text class="f24 fc-666">{{ resourceDesc }}</text>
                    </view>
                </view>
            </view>

            <view class="detail-card br-24 bg-white p-30 m-b-40" v-else>
                <view class="card-header f32 fw-bold fc-333 m-b-30">处理建议</view>

                <view class="solution-list y">
                    <view class="solution-item x m-b-30">
                        <view class="number-circle x c br-50 m-r-20 bg-gray">
                            <text class="f22 fc-999">1</text>
                        </view>
                        <text class="f26 fc-666 flex-1 pt-4">检查卡密输入是否正确，注意不要带多余空格。</text>
                    </view>
                    <view class="solution-item x m-b-30">
                        <view class="number-circle x c br-50 m-r-20 bg-gray">
                            <text class="f22 fc-999">2</text>
                        </view>
                        <text class="f26 fc-666 flex-1 pt-4">确认该卡密是否已经在其它账号完成兑换。</text>
                    </view>
                    <view class="solution-item x">
                        <view class="number-circle x c br-50 m-r-20 bg-gray">
                            <text class="f22 fc-999">3</text>
                        </view>
                        <text class="f26 fc-666 flex-1 pt-4">联系购买渠道，核实卡密是否有效。</text>
                    </view>
                </view>
            </view>

            <view class="bottom-action">
                <template v-if="isSuccess">
                    <button class="btn-primary m-b-30" @click="handleSuccessAction">{{ primaryBtnText }}</button>
                    <button class="btn-outline w-100" @click="toOrderRecord">查看兑换记录</button>
                </template>
                <template v-else>
                    <button class="btn-primary m-b-30" @click="retryInput">重新输入卡密</button>
                    <button class="btn-outline w-100" @click="callService">联系客服</button>
                </template>
            </view>
        </view>
    </view>
</template>

<script>
import dayjs from '@/plugin/dayjs/dayjs.min.js';
import lNav from '@/components/l-nav/nav.vue';

export default {
    components: {
        lNav
    },
    data() {
        return {
            status: 'success',
            productName: '',
            targetType: '',
            targetId: '',
            coverImage: '',
            vipDay: 0,
            cardTypeText: '',
            defaultCover: '/static/images/w/kami.png',
            previousExpireDate: '',
            previousVipStatus: 0,
            expireDate: '',
            errorMsg: ''
        };
    },
    computed: {
        isSuccess() {
            return this.status === 'success';
        },
        isMemberCard() {
            return this.targetType === 'member';
        },
        memberTitle() {
            return this.productName || '会员服务';
        },
        memberVipDayText() {
            return this.vipDay ? `${this.vipDay} 天` : '-';
        },
        today() {
            return dayjs().format('YYYY-MM-DD');
        },
        normalizedPreviousExpireDate() {
            if (!this.previousExpireDate) return '';
            const matched = String(this.previousExpireDate).match(/\d{4}-\d{2}-\d{2}/);
            if (!matched) return '';
            return matched[0];
        },
        currentMemberExpireDate() {
            if (!this.normalizedPreviousExpireDate) return '';
            const expire = dayjs(this.normalizedPreviousExpireDate);
            return expire.isValid() ? expire.format('YYYY-MM-DD') : '';
        },
        hasActiveMemberBeforeRedeem() {
            return (Number(this.previousVipStatus) === 1 || Number(this.previousVipStatus) === 3) && !!this.currentMemberExpireDate;
        },
        memberStartDate() {
            if (!this.isMemberCard) return this.today;
            if (this.hasActiveMemberBeforeRedeem) {
                return this.currentMemberExpireDate;
            }
            return this.today;
        },
        memberEndDate() {
            if (!this.isMemberCard) return this.expireDate;
            if (!this.vipDay) return this.expireDate;
            return dayjs(this.memberStartDate).add(this.vipDay, 'day').format('YYYY-MM-DD');
        },
        memberDurationTip() {
            if (!this.isMemberCard) return '';
            if (this.hasActiveMemberBeforeRedeem) {
                return '当前会员未到期，本次权益将从当前到期时间后顺延';
            }
            return '当前会员已过期，本次权益将从兑换成功之日起计算';
        },
        targetTypeText() {
            const typeMap = {
                course: '课程',
                material: '资料',
                member: '会员'
            };
            return typeMap[this.targetType] || this.cardTypeText || this.targetType || '权益';
        },
        successDesc() {
            const descMap = {
                course: `你的课程《${this.productName}》已兑换成功，现在可以直接去学习。`,
                material: `你的资料《${this.productName}》已兑换成功，现在可以直接去查看。`,
                member: `你的${this.productName}已兑换成功，快去体验会员权益吧。`
            };
            return descMap[this.targetType] || `${this.productName}已兑换成功。`;
        },
        detailTitle() {
            const titleMap = {
                course: '课程信息',
                material: '资料信息',
                member: '会员信息'
            };
            return titleMap[this.targetType] || '权益信息';
        },
        resourceDesc() {
            const descMap = {
                course: '课程已发放到你的账号，可直接进入课程详情开始学习。',
                material: '资料已发放到你的账号，可直接进入资料详情查看内容。'
            };
            return descMap[this.targetType] || '';
        },
        primaryBtnText() {
            const btnMap = {
                course: '去学习课程',
                material: '去查看资料',
                member: '立即体验会员权益'
            };
            return btnMap[this.targetType] || '立即查看';
        }
    },
    onLoad(options) {
        this.status = options.status || 'fail';
        this.productName = options.product_name ? decodeURIComponent(options.product_name) : '会员服务';
        this.targetType = options.target_type ? decodeURIComponent(options.target_type) : 'member';
        this.targetId = options.target_id || '';
        this.coverImage = options.cover_image ? decodeURIComponent(options.cover_image) : '';
        this.vipDay = Number(options.vip_day || 0);
        this.cardTypeText = options.card_type_text ? decodeURIComponent(options.card_type_text) : '';
        this.previousExpireDate = options.previous_expire_date ? decodeURIComponent(options.previous_expire_date) : '';
        this.previousVipStatus = Number(options.previous_vip_status || 0);
        this.expireDate = options.expire_date || dayjs().add(1, 'year').format('YYYY-MM-DD');
        this.errorMsg = options.error ? decodeURIComponent(options.error) : '';
    },
    methods: {
        toHome() {
            uni.switchTab({ url: '/pages/index_/index' });
        },
        retryInput() {
            uni.navigateBack({ delta: 2 });
        },
        handleSuccessAction() {
            if (this.targetType === 'course' && this.targetId) {
                uni.navigateTo({ url: `/pages/w/kclist?id=${this.targetId}` });
                return;
            }
            if (this.targetType === 'material' && this.targetId) {
                uni.navigateTo({ url: `/pages/w/zlshow?id=${this.targetId}` });
                return;
            }
            this.toHome();
        },
        toOrderRecord() {
            uni.navigateTo({ url: '/pages/w/kami_hexiao_record' });
        },
        callService() {
            uni.makePhoneCall({
                phoneNumber: '4001234567'
            });
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
.p-x-15 { padding-left: 15rpx; padding-right: 15rpx; }
.p-x-20 { padding-left: 20rpx; padding-right: 20rpx; }
.p-y-5 { padding-top: 5rpx; padding-bottom: 5rpx; }
.p-y-10 { padding-top: 10rpx; padding-bottom: 10rpx; }
.p-y-40 { padding-top: 40rpx; padding-bottom: 40rpx; }
.p-b-20 { padding-bottom: 20rpx; }
.m-b-10 { margin-bottom: 10rpx; }
.m-b-20 { margin-bottom: 20rpx; }
.m-b-30 { margin-bottom: 30rpx; }
.m-b-40 { margin-bottom: 40rpx; }
.m-t-40 { margin-top: 40rpx; }
.m-r-20 { margin-right: 20rpx; }

.br-20 { border-radius: 20rpx; }
.br-24 { border-radius: 24rpx; }
.br-30 { border-radius: 30rpx; }
.br-50 { border-radius: 50%; }

.bg-white { background-color: #ffffff; }
.bg-gray { background-color: #F5F5F5; }
.bg-green-light { background-color: #E8F8F0; }
.bg-red-light { background-color: #FEEEEE; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { align-items: center; justify-content: center; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.flex-wrap { flex-wrap: wrap; }
.flex-1 { flex: 1; }
.text-center { text-align: center; }
.align-right { align-items: flex-end; }
.time-text { white-space: nowrap; }

.f22 { font-size: 22rpx; }
.f24 { font-size: 24rpx; }
.f26 { font-size: 26rpx; }
.f28 { font-size: 28rpx; }
.f30 { font-size: 30rpx; }
.f32 { font-size: 32rpx; }
.f40 { font-size: 40rpx; }

.fc-333 { color: #333333; }
.fc-666 { color: #666666; }
.fc-999 { color: #999999; }
.fc-red { color: #FA5151; }
.fc-orange { color: #FF8A00; }
.fw-bold { font-weight: bold; }

.icon-circle {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.vip-tag {
    background: linear-gradient(90deg, #FFF6E5 0%, #FFE9C2 100%);
}

.tag-gray {
    background-color: #F5F5F5;
}
.resource-card {
    align-items: center;
}
.resource-cover {
    width: 160rpx;
    height: 160rpx;
    background-color: #f5f5f5;
    flex-shrink: 0;
}

.bottom-border {
    border-bottom: 2rpx solid #F0F0F0;
}

.number-circle {
    width: 36rpx;
    height: 36rpx;
}
.pt-4 { padding-top: 4rpx; }

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
.btn-primary::after { border: none; }
.btn-outline {
    background: transparent;
    color: #333333;
    border: 2rpx solid #E5E5E5;
    font-size: 32rpx;
    font-weight: bold;
    height: 96rpx;
    line-height: 96rpx;
    border-radius: 48rpx;
    text-align: center;
    box-sizing: border-box;
}
.btn-outline::after { border: none; }
.w-100 { width: 100%; }
</style>
