<template>
    <view class="page-container">
        <l-nav fanhui title="卡密核销" bgColor="#ffffff" @back="handleBack"></l-nav>

        <view class="content-wrap p-30">
            <view class="header-section x c y">
                <view class="page-title m-b-20">输入卡密并核销</view>
                <view class="page-desc">输入正确的卡密后，可查询对应权益并完成兑换</view>
            </view>

            <view class="form-section">
                <view class="form-label">卡密信息</view>
                <view class="input-box x c-y jc-sb">
                    <input
                        v-model="cdkey"
                        class="cdkey-input flex-1"
                        placeholder="请输入 16 位卡密"
                        placeholder-class="placeholder-text"
                        maxlength="23"
                        @input="formatInput"
                    />
                    <view v-if="cdkey" class="clear-icon x c" @click="clearCdkey">
                        <uv-icon name="close" color="#999999" size="14"></uv-icon>
                    </view>
                </view>

                <view class="format-tips x c m-t-10">
                    <text class="fc-999 f24">格式示例：XXXX-XXXX-XXXX-XXXX</text>
                </view>
            </view>

            <view class="notice-section m-t-40 p-30 br-16 bg-blue-light">
                <view class="notice-title x c-y m-b-20">
                    <view class="m-r-10">
                        <uv-icon name="info-circle" color="#333333" size="16"></uv-icon>
                    </view>
                    <text class="f28 fw-bold">注意事项</text>
                </view>
                <view class="notice-list y">
                    <text class="notice-item">1. 卡密仅可兑换一次，兑换成功后立即失效。</text>
                    <text class="notice-item">2. 权益会发放到当前登录账号，请确认当前账号无误。</text>
                    <text class="notice-item">3. 若提示卡密无效或已使用，请联系发卡渠道核实。</text>
                </view>
            </view>

            <view class="bottom-btn-box p-y-40">
                <button
                    class="btn-primary"
                    :class="{ 'btn-disabled': !normalizedCdkey }"
                    :disabled="!normalizedCdkey"
                    @click="nextStep"
                >
                    下一步
                </button>
                <button class="btn-outline m-t-30" @click="toRecord">
                    查看兑换记录
                </button>
            </view>
        </view>
    </view>
</template>

<script>
import lNav from '@/components/l-nav/nav.vue';

export default {
    components: {
        lNav
    },
    data() {
        return {
            cdkey: ''
        };
    },
    computed: {
        normalizedCdkey() {
            return (this.cdkey || '').replace(/-/g, '').trim().toUpperCase();
        }
    },
    methods: {
        handleBack() {
            uni.navigateBack();
        },
        formatInput(event) {
            const value = (event.detail.value || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 16);
            this.cdkey = value.replace(/(.{4})/g, '$1-').replace(/-$/, '');
        },
        clearCdkey() {
            this.cdkey = '';
        },
        nextStep() {
            if (!this.normalizedCdkey) {
                uni.showToast({
                    title: '请输入卡密',
                    icon: 'none'
                });
                return;
            }
            if (this.normalizedCdkey.length !== 16) {
                uni.showToast({
                    title: '请输入正确的卡密格式',
                    icon: 'none'
                });
                return;
            }

            uni.navigateTo({
                url: `/pages/w/kami_hexiao_confirm?cdkey=${this.normalizedCdkey}`
            });
        },
        toRecord() {
            uni.navigateTo({
                url: '/pages/w/kami_hexiao_record'
            });
        }
    }
};
</script>

<style scoped>
.page-container {
    background-color: #ffffff;
    min-height: 100vh;
}
.p-30 {
    padding: 30rpx;
}
.m-t-10 { margin-top: 10rpx; }
.m-t-40 { margin-top: 40rpx; }
.m-b-20 { margin-bottom: 20rpx; }
.m-r-10 { margin-right: 10rpx; }
.p-y-40 { padding-top: 40rpx; padding-bottom: 40rpx; }
.br-16 { border-radius: 16rpx; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { align-items: center; justify-content: center; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.flex-1 { flex: 1; }

.f24 { font-size: 24rpx; }
.f28 { font-size: 28rpx; }
.fc-999 { color: #999999; }
.bg-blue-light { background-color: #F0F5FF; }
.fw-bold { font-weight: bold; }

.header-section {
    padding-top: 60rpx;
    padding-bottom: 80rpx;
}
.page-title {
    font-size: 40rpx;
    font-weight: 700;
    color: #333333;
}
.page-desc {
    font-size: 26rpx;
    color: #666666;
    text-align: center;
}

.form-section {
    margin-bottom: 40rpx;
}
.form-label {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 20rpx;
}
.input-box {
    height: 96rpx;
    border: 2rpx solid #E5E5E5;
    border-radius: 16rpx;
    padding: 0 30rpx;
}
.clear-icon {
    width: 40rpx;
    height: 40rpx;
    flex-shrink: 0;
}
.cdkey-input {
    font-size: 30rpx;
    color: #333333;
    height: 100%;
}
.placeholder-text {
    color: #CCCCCC;
}

.notice-list {
    margin-left: 10rpx;
}
.notice-item {
    font-size: 24rpx;
    color: #666666;
    line-height: 2;
}

.bottom-btn-box {
    margin-top: 60rpx;
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
.btn-disabled {
    background: #A0C5FF;
    color: #ffffff;
}
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
.btn-outline::after {
    border: none;
}
</style>
