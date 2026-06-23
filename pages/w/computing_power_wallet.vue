<template>
    <view class="page-container">
        <!-- 导航栏 -->
        <l-nav fanhui title="算力钱包" @back="handleBack"></l-nav>

        <view class="content-wrap p-30">
            <!-- 算力卡片 -->
            <view class="wallet-card y jc-sb">
                <view class="y">
                    <view class="x c-y jc-sb m-b-20">
                        <view class="card-title">当前可用算力</view>
                        <view class="vip-tag x c-y" @click="toRules">
                            <uv-icon name="info-circle" color="#fff" size="14"></uv-icon>
                            <text style="margin-left: 6rpx;">算力规则</text>
                        </view>
                    </view>
                    <view class="x c-base align-end">
                        <view class="power-amount">{{ formatPower(userInfo.now_computing_power) }}</view>
                        <view class="power-unit">算力</view>
                    </view>
                </view>
                
                <view class="card-btns x jc-sb">
                    <view class="btn-charge c" @click="toRecharge">充值算力</view>
                    <view class="btn-vip c" @click="toVipPage">开通VIP会员</view>
                </view>
            </view>

            <!-- 会员专享权益 -->
            <view class="section-card m-b-30">
                <view class="section-header x c-y jc-sb">
                    <view class="section-title">会员专享权益</view>
                    <view class="section-more" @click="toVipPage">查看全部</view>
                </view>
                <view class="rights-list y">
                    <view class="right-item x c-y jc-sb" @click="toVipPage">
                        <view class="x c-y">
                            <view class="icon-box icon-blue c">
                                <uv-icon name="integral-fill" color="#3A5DFB" size="20"></uv-icon>
                            </view>
                            <view class="y ml-24">
                                <view class="item-title">赠送{{ minGiftPower }}算力</view>
                                <view class="item-desc">开通即赠，永久有效</view>
                            </view>
                        </view>
                        <uv-icon name="arrow-right" color="#cccccc" size="14"></uv-icon>
                    </view>
                    <view class="right-item x c-y jc-sb" @click="toVipPage">
                        <view class="x c-y">
                            <view class="icon-box icon-light-blue c">
                                <uv-icon name="grid-fill" color="#8BA1FF" size="20"></uv-icon>
                            </view>
                            <view class="y ml-24">
                                <view class="item-title">全部AI功能解锁</view>
                                <view class="item-desc">视频/图片/数字人制作</view>
                            </view>
                        </view>
                        <uv-icon name="arrow-right" color="#cccccc" size="14"></uv-icon>
                    </view>
                    <view class="right-item x c-y jc-sb border-none" @click="toVipPage">
                        <view class="x c-y">
                            <view class="icon-box icon-blue c">
                                <uv-icon name="clock" color="#3A5DFB" size="20"></uv-icon>
                            </view>
                            <view class="y ml-24">
                                <view class="item-title">优先生成通道</view>
                                <view class="item-desc">生成速度提升50%</view>
                            </view>
                        </view>
                        <uv-icon name="arrow-right" color="#cccccc" size="14"></uv-icon>
                    </view>
                </view>
            </view>

            <!-- 最近消费明细 -->
            <view class="section-card">
                <view class="section-header x c-y jc-sb">
                    <view class="section-title">最近消费</view>
                    <view class="section-more" @click="toHistory">查看明细</view>
                </view>
                <view class="history-list y" v-if="!historyLoading && historyList.length">
                    <view
                        v-for="(item, index) in historyList"
                        :key="item.id"
                        class="history-item x c-y jc-sb"
                        :class="{ 'border-none': index === historyList.length - 1 }"
                    >
                        <view class="x c-y">
                            <view class="icon-box c" :class="item.iconBg">
                                <uv-icon :name="item.iconName" :color="item.iconColor" size="20"></uv-icon>
                            </view>
                            <view class="y ml-24">
                                <view class="item-title">{{ item.type_name || item.mark }}</view>
                                <view class="item-desc">{{ item.add_time }}</view>
                            </view>
                        </view>
                        <view class="cost-amount" :class="item.pm === 1 ? 'text-success' : 'text-error'">
                            {{ item.pm === 1 ? '+' : '-' }}{{ item.number }}
                        </view>
                    </view>
                </view>
                <view v-else-if="historyLoading" class="history-loading c">加载中...</view>
                <view v-else class="history-empty c">暂无消费记录</view>
            </view>

            <view class="p-b-safe"></view>
        </view>
    </view>
</template>

<script>
import { getComputePowerList } from '@/api/public.js';
import { getUserInfo, memberCard } from '@/api/user.js';

const TYPE_ICON = {
    ai_chat: { iconName: 'chat-fill', iconBg: 'bg-blue', iconColor: '#3A5DFB' },
    ai_image: { iconName: 'photo', iconBg: 'bg-green', iconColor: '#18D08D' },
    ai_video: { iconName: 'play-circle', iconBg: 'bg-purple', iconColor: '#A03AFB' },
    ai_digital_human: { iconName: 'account', iconBg: 'bg-blue', iconColor: '#3A5DFB' },
    ai_digital_human_fast: { iconName: 'account', iconBg: 'bg-blue', iconColor: '#3A5DFB' },
    compute_power_recharge: { iconName: 'reload', iconBg: 'bg-green', iconColor: '#18D08D' },
    register_system_add: { iconName: 'gift', iconBg: 'bg-purple', iconColor: '#A03AFB' },
    pay_member: { iconName: 'account', iconBg: 'bg-blue', iconColor: '#3A5DFB' },
    draw_member_card: { iconName: 'coupon', iconBg: 'bg-purple', iconColor: '#A03AFB' },
    system_add: { iconName: 'plus-circle', iconBg: 'bg-green', iconColor: '#18D08D' },
    system_sub: { iconName: 'minus-circle', iconBg: 'bg-purple', iconColor: '#A03AFB' }
};

export default {
    data() {
        return {
            userInfo: {},
            minGiftPower: 0,
            historyList: [],
            historyLoading: false
        };
    },
    computed: {
        // 会员类型展示：与用户中心 my.vue 一致，vip_status 1/3 且有钱包会员时显示 vip_info.title，否则普通会员
        memberTypeText() {
            const u = this.userInfo;
            if (!u || !u.uid) return '普通会员';
            if ((u.vip_status === 1 || u.vip_status === 3) && u.vip_info && u.vip_info.title) {
                return u.vip_info.title;
            }
            return '普通会员';
        }
    },
    onShow() {
        this.loadUserInfo();
        this.loadMinGiftPower();
        this.loadHistoryList();
    },
    methods: {
        loadUserInfo() {
            getUserInfo().then((res) => {
                this.userInfo = res.data || {};
            }).catch(() => {
                this.userInfo = {};
            });
        },
        // 参考付费会员页：从 member_card 的 member_type 取各档位 compute_power_num，展示最少赠送算力
        loadMinGiftPower() {
            memberCard().then((res) => {
                const list = (res.data && res.data.member_type) || [];
                if (!list.length) {
                    this.minGiftPower = 0;
                    return;
                }
                const nums = list.map((m) => parseInt(m.compute_power_num, 10) || 0).filter((n) => n >= 0);
                this.minGiftPower = nums.length ? Math.min(...nums) : 0;
            }).catch(() => {
                this.minGiftPower = 0;
            });
        },
        formatPower(val) {
            if (val === undefined || val === null || val === '') return '0';
            const num = parseFloat(String(val));
            if (isNaN(num)) return '0';
            const parts = num.toFixed(0).split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        },
        async loadHistoryList() {
            this.historyLoading = true;
            try {
                const res = await getComputePowerList({ page: 1, limit: 10 });
                const list = (res.data && res.data.list) || [];
                this.historyList = list.map(item => {
                    const icon = TYPE_ICON[item.type] || { iconName: 'list', iconBg: 'bg-blue', iconColor: '#3A5DFB' };
                    return {
                        ...item,
                        iconName: icon.iconName,
                        iconBg: icon.iconBg,
                        iconColor: icon.iconColor
                    };
                });
            } catch (e) {
                this.historyList = [];
            } finally {
                this.historyLoading = false;
            }
        },
        handleBack() {
            const pages = getCurrentPages();
            if (pages.length > 1) {
                uni.navigateBack({ delta: 1 });
            } else {
                uni.switchTab({ url: '/pages/index_/index' });
            }
        },
        toVipPage() {
            uni.navigateTo({ url: '/pages/annex/vip_paid/index' });
        },
        toHistory() {
            uni.navigateTo({ url: '/pages/w/computing_power_history' });
        },
        toRules() {
            uni.navigateTo({ url: '/pages/w/computing_power_rules' });
        },
        toRecharge() {
            uni.navigateTo({ url: '/pages/w/computing_power_recharge' });
        }
    }
}
</script>

<style scoped>
.page-container {
    background-color: #f8f9fa;
    min-height: 100vh;
}
.p-30 { padding: 30rpx; }
.m-b-20 { margin-bottom: 20rpx; }
.m-b-30 { margin-bottom: 30rpx; }
.ml-24 { margin-left: 24rpx; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c-y { align-items: center; }
.c { align-items: center; justify-content: center; display: flex; }
.jc-sb { justify-content: space-between; }
.align-end { align-items: flex-end; }
.p-b-safe { height: env(safe-area-inset-bottom); padding-bottom: 40rpx; }

/* 算力卡片 */
.wallet-card {
    background: linear-gradient(135deg, #2E5CF6 0%, #573FF4 100%);
    border-radius: 24rpx;
    padding: 40rpx 36rpx;
    height: 320rpx;
    box-sizing: border-box;
    margin-bottom: 30rpx;
    box-shadow: 0 16rpx 32rpx -10rpx rgba(62, 79, 245, 0.4);
}
.card-title {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.8);
}
.vip-tag {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 24rpx;
    padding: 6rpx 20rpx;
    border-radius: 100rpx;
}
.c-base {
    line-height: 1;
}
.power-amount {
    font-size: 80rpx;
    font-weight: bold;
    color: #fff;
    margin-right: 12rpx;
}
.power-unit {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.8);
    position: relative;
    top: -12rpx;
}
.card-btns {
    width: 100%;
}
.btn-charge {
    width: 47%;
    height: 80rpx;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 30rpx;
    font-weight: bold;
    border-radius: 16rpx;
}
.btn-vip {
    width: 47%;
    height: 80rpx;
    background: #fff;
    color: #3A5DFB;
    font-size: 30rpx;
    font-weight: bold;
    border-radius: 16rpx;
}

/* 通用区块样式 */
.section-card {
    background: #fff;
    border-radius: 24rpx;
    padding: 40rpx 30rpx 10rpx 30rpx;
}
.section-header {
    margin-bottom: 30rpx;
}
.section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
}
.section-more {
    font-size: 26rpx;
    color: #3A5DFB;
}

/* 列表样式 */
.item-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 8rpx;
}
.item-desc {
    font-size: 24rpx;
    color: #999;
}
.icon-box {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
}
.icon-blue { background: #eef1ff; }
.icon-light-blue { background: #e6f0ff; }
.bg-purple { background: rgba(160, 58, 251, 0.1); }
.bg-green { background: rgba(24, 208, 141, 0.1); }
.bg-blue { background: rgba(58, 93, 251, 0.1); }

.right-item, .history-item {
    padding: 10rpx 0 30rpx 0;
    margin-bottom: 20rpx;
    border-bottom: 1px solid #f5f5f5;
}
.border-none {
    border-bottom: none;
}
.cost-amount {
    font-size: 30rpx;
    font-weight: bold;
}
.text-error {
    color: #ff4d4f;
}
.text-success {
    color: #18D08D;
}
.history-loading,
.history-empty {
    padding: 40rpx 0;
    font-size: 28rpx;
    color: #999;
}
</style>
