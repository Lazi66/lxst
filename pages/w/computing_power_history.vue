<template>
    <view class="page-container">
        <!-- 导航栏 -->
        <l-nav fanhui title="算力明细" bg-color="#ffffff">
        </l-nav>

        <view class="content-wrap p-30">
            <!-- 统计 -->
            <view class="stat-card x jc-sb m-b-30">
                <view class="y">
                    <view class="stat-label">总消费</view>
                    <view class="x c-base align-end">
                        <view class="stat-value">{{ totalExpense }}</view>
                        <view class="stat-unit">算力</view>
                    </view>
                </view>
                <view class="y" style="min-width: 40%;">
                    <view class="stat-label">消费次数</view>
                    <view class="x c-base align-end">
                        <view class="stat-value">{{ totalCount }}</view>
                        <view class="stat-unit">次</view>
                    </view>
                </view>
            </view>

            <!-- 类型筛选 -->
            <view class="filter-card m-b-30">
                <scroll-view scroll-x class="filter-scroll" :show-scrollbar="false">
                    <view class="filter-list x">
                        <view
                            v-for="(item, index) in filterTypes"
                            :key="index"
                            class="filter-item c"
                            :class="{ 'active': activeType === index }"
                            @click="onFilterChange(index)"
                        >
                            {{ item.name }}
                        </view>
                    </view>
                </scroll-view>
            </view>

            <!-- 明细列表 -->
            <view class="list-card">
                <view class="list-header x c-y jc-sb">
                    <text>算力明细</text>
                </view>

                <view class="history-list y" v-if="!loading && historyList.length">
                    <view
                        v-for="(item, index) in historyList"
                        :key="item.id"
                        class="history-item x jc-sb"
                        :class="{ 'border-none': index === historyList.length - 1 }"
                    >
                        <view class="x">
                            <view class="icon-box c m-r-24" :class="item.iconBg">
                                <uv-icon :name="item.iconName" :color="item.iconColor" size="20"></uv-icon>
                            </view>
                            <view class="y jc-c">
                                <view class="item-title">{{ item.type_name || item.mark }}</view>
                                <view class="item-time">{{ item.add_time }}</view>
                                <view class="item-desc">{{ item.mark }}</view>
                            </view>
                        </view>
                        <view class="cost-amount p-t-10" :class="item.pm === 1 ? 'text-success' : 'text-error'">
                            {{ item.pm === 1 ? '+' : '-' }}{{ item.number }}
                        </view>
                    </view>
                </view>
                <view v-else-if="loading && !historyList.length" class="list-loading c">加载中...</view>
                <view v-else-if="!historyList.length" class="list-empty c">暂无记录</view>

                <view v-if="!finished && historyList.length" class="load-more c" @click="loadMore">
                    {{ loadMoreLoading ? '加载中...' : '加载更多' }}
                </view>
            </view>
            <view class="p-b-safe"></view>
        </view>
    </view>
</template>

<script>
import { getComputePowerList } from '@/api/public.js';

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
            activeType: 0,
            filterTypes: [
                { name: '全部', value: '' },
                { name: '视频生成', value: 'ai_video' },
                { name: '图片生成', value: 'ai_image' },
                { name: '数字人', value: 'ai_digital_human' }
            ],
            historyList: [],
            loading: false,
            loadMoreLoading: false,
            page: 1,
            limit: 20,
            totalCount: 0,
            totalExpense: '0',
            finished: false
        };
    },
    onLoad() {
        this.loadList(true);
    },
    methods: {
        onFilterChange(index) {
            if (this.activeType === index) return;
            this.activeType = index;
            this.loadList(true);
        },
        async loadList(reset = false) {
            if (reset) {
                this.page = 1;
                this.historyList = [];
                this.finished = false;
            }
            if (this.finished) return;
            if (reset) {
                this.loading = true;
            } else {
                this.loadMoreLoading = true;
            }
            try {
                const type = this.filterTypes[this.activeType].value;
                const params = { page: this.page, limit: this.limit };
                if (type) params.type = type;
                const res = await getComputePowerList(params);
                const data = res.data || {};
                const list = data.list || [];
                this.totalCount = data.expense_count != null ? data.expense_count : 0;
                this.totalExpense = data.total_expense != null ? String(data.total_expense) : '0';
                const mapped = list.map(item => {
                    const icon = TYPE_ICON[item.type] || { iconName: 'list', iconBg: 'bg-blue', iconColor: '#3A5DFB' };
                    return {
                        ...item,
                        iconName: icon.iconName,
                        iconBg: icon.iconBg,
                        iconColor: icon.iconColor
                    };
                });
                this.historyList = reset ? mapped : this.historyList.concat(mapped);
                if (list.length < this.limit) {
                    this.finished = true;
                } else {
                    this.page += 1;
                }
            } catch (e) {
                if (reset) this.historyList = [];
                this.finished = true;
            } finally {
                this.loading = false;
                this.loadMoreLoading = false;
            }
        },
        loadMore() {
            if (this.loadMoreLoading || this.finished) return;
            this.loadList(false);
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
.m-b-30 { margin-bottom: 30rpx; }
.m-l-10 { margin-left: 10rpx; }
.m-r-24 { margin-right: 24rpx; }
.p-t-10 { padding-top: 10rpx; }
.p-r-30 { padding-right: 30rpx; padding-left: 20rpx; }
.w-100 { width: 100%; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c-y { align-items: center; }
.c { align-items: center; justify-content: center; display: flex; }
.jc-sb { justify-content: space-between; }
.jc-c { justify-content: center; }
.align-end { align-items: flex-end; }
.p-b-safe { height: env(safe-area-inset-bottom); padding-bottom: 40rpx; }

/* 导航栏内容 */
.nav-title {
    color: #333;
}
.fc-66 { color: #666; }

/* 统计卡片 */
.stat-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx 40rpx;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.02);
}
.stat-label {
    font-size: 26rpx;
    color: #999;
    margin-bottom: 16rpx;
}
.c-base {
    line-height: 1;
}
.stat-value {
    font-size: 44rpx;
    font-weight: bold;
    color: #1a1a1a;
    margin-right: 8rpx;
}
.stat-unit {
    font-size: 26rpx;
    color: #1a1a1a;
    position: relative;
    top: -4rpx;
}

/* 筛选组 */
.filter-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 24rpx 20rpx;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.02);
}
.filter-scroll {
    width: 100%;
    white-space: nowrap;
}
.filter-item {
    padding: 12rpx 32rpx;
    background: #f5f6f8;
    color: #666;
    font-size: 26rpx;
    border-radius: 100rpx;
    margin-right: 20rpx;
    flex-shrink: 0;
}
.filter-item.active {
    background: #eef1ff;
    color: #3A5DFB;
    font-weight: 500;
}

/* 列表卡片 */
.list-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx 30rpx 10rpx 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.02);
}
.list-header {
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
}

/* 列表项 */
.icon-box {
    width: 88rpx;
    height: 88rpx;
    border-radius: 20rpx;
    flex-shrink: 0;
}
.bg-purple { background: rgba(160, 58, 251, 0.08); }
.bg-green { background: rgba(24, 208, 141, 0.08); }
.bg-blue { background: rgba(58, 93, 251, 0.08); }

.history-item {
    padding: 30rpx 0;
    border-bottom: 1px solid #f2f2f2;
}
.border-none {
    border-bottom: none;
}
.item-title {
    font-size: 30rpx;
    color: #333;
    margin-bottom: 8rpx;
}
.item-time {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 8rpx;
}
.item-desc {
    font-size: 24rpx;
    color: #999;
}
.cost-amount {
    font-size: 32rpx;
    font-weight: 500;
}
.text-error {
    color: #ff4d4f;
}
.text-success {
    color: #18D08D;
}
.list-loading,
.list-empty {
    padding: 60rpx 0;
    font-size: 28rpx;
    color: #999;
}
.load-more {
    padding: 24rpx 0;
    font-size: 26rpx;
    color: #3A5DFB;
}
</style>
