<template>
    <view class="page-container y">
        <!-- 导航栏 -->
        <l-nav fanhui title="算力规则" bg-color="#f8f9fa" @back="handleBack"></l-nav>

        <view class="content-wrap p-30 flex-1">
            <view class="rules-table y">
                <view class="table-header x">
                    <view class="th-cell flex-1">功能</view>
                    <view class="th-cell flex-1">算力消耗规则</view>
                </view>
                <view class="table-body y">
                    <view class="tr-row x" v-for="(item, index) in rulesList" :key="index">
                        <view class="td-cell flex-1 c-y">{{ item.name }}</view>
                        <view class="td-cell flex-1 c-y">{{ item.rule }}</view>
                    </view>
                </view>
            </view>
            
            <view class="tips-box m-t-40 y">
                <text class="tip-title m-b-20">温馨提示：</text>
                <text class="tip-desc m-b-10">1. 当前平台算力兑换比例为 1元人民币 = {{ computeRate }} 算力</text>
                <text class="tip-desc">2. 实际消耗以各功能界面提示为准</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            config: {},
            computeRate: 10
        };
    },
    computed: {
        rulesList() {
            const c = this.config;
            const fallback = '?';
            return [
                { name: '对话消耗算力', rule: `一次AI对话消耗多少 ${c.compute_power_char || fallback} 算力` },
                { name: '生成视频文本', rule: `生成一次视频文本消耗 ${c.compute_power_video_text || fallback} 算力` },
                { name: '文生图', rule: `文字生成一张图片消耗 ${c.compute_power_image || fallback} 算力` },
                { name: '文生视频', rule: `文字生成一个视频消耗 ${c.compute_power_video || fallback} 算力` },
                { name: '图生成数字人', rule: `图片生成一个数字人消耗 ${c.compute_power_digital_human || fallback} 算力` },
                { name: '数字人视频创作', rule: `用数字人进行视频创作视频长度每秒消耗 ${c.compute_power_digital_human_video || fallback} 算力` },
                { name: '声音克隆', rule: `声音克隆消耗 ${c.voice_clone_compute_power || 0} 算力` }
            ];
        }
    },
    onLoad() {
        this.loadConfig();
    },
    methods: {
        loadConfig() {
            const localConfig = uni.getStorageSync('compute_power_config');
            if (localConfig) {
                this.config = localConfig;
                if (localConfig.compute_power_rate) {
                    this.computeRate = localConfig.compute_power_rate;
                }
            } else {
                import('@/api/public.js').then(api => {
                    api.getComputePowerConfig().then(res => {
                        if (res.status === 200 && res.data) {
                            this.config = res.data;
                            if (res.data.compute_power_rate) {
                                this.computeRate = res.data.compute_power_rate;
                            }
                            uni.setStorageSync('compute_power_config', res.data);
                        }
                    });
                });
            }
        },
        handleBack() {
            uni.navigateBack();
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
.m-t-40 { margin-top: 40rpx; }
.m-b-10 { margin-bottom: 10rpx; }
.m-b-20 { margin-bottom: 20rpx; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c-y { align-items: center; display: flex; }
.flex-1 { flex: 1; }

.rules-table {
    background: #fff;
    border-radius: 16rpx;
    border: 1px solid #ebedf0;
    overflow: hidden;
    margin-top: 20rpx;
}
.table-header {
    background: #f7f9fc;
    border-bottom: 1px solid #ebedf0;
}
.th-cell {
    padding: 24rpx 30rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
    border-right: 1px solid #ebedf0;
}
.th-cell:last-child {
    border-right: none;
}
.tr-row {
    border-bottom: 1px solid #ebedf0;
}
.tr-row:last-child {
    border-bottom: none;
}
.td-cell {
    padding: 26rpx 30rpx;
    font-size: 28rpx;
    color: #666;
    border-right: 1px solid #ebedf0;
    line-height: 1.5;
}
.td-cell:last-child {
    border-right: none;
}

.tips-box {
    background: #f0f7ff;
    padding: 30rpx;
    border-radius: 16rpx;
}
.tip-title {
    font-size: 28rpx;
    color: #1677ff;
    font-weight: bold;
}
.tip-desc {
    font-size: 24rpx;
    color: #666;
    line-height: 1.6;
}
</style>
