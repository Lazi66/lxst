<template>
    <uv-popup ref="popup" mode="center" round="20" bg-color="#fff" :safeAreaInsetBottom="false" :closeOnClickOverlay="false">
        <view class="loading-content y c p-40" style="width: 500rpx; padding: 60rpx 40rpx 40rpx;">
            <!-- 中心图标区域 (发光小球) -->
            <view class="circle-box c">
                <view class="glow-orb"></view>
            </view>
            
            <!-- <view class="loading-title fw-500 f32 fc-333 m-t-30"> DeepSeek </view> -->
            
            <view class="loading-desc f28 fc-333 m-t-10">
                正在为您生成中 {{ progress }}%
            </view>
            
            <view class="cancel-btn c m-t-40" @click="handleCancel">
                <!-- <text class="f28 fc-999">取消</text> -->
            </view>
        </view>
    </uv-popup>
</template>

<script>
export default {
    name: 'AiLoadingDialog',
    props: {
        title: {
            type: String,
            default: 'DeepSeek'
        },
        descPrefix: {
            type: String,
            default: '为你生成中'
        }
    },
    data() {
        return {
            progress: 0,
            timer: null
        };
    },
    methods: {
        open() {
            this.progress = 0;
            if (this.$refs.popup) {
                this.$refs.popup.open();
            }
            this.simulateProgress();
        },
        close() {
            if (this.$refs.popup) {
                this.$refs.popup.close();
            }
            this.clearTimer();
        },
        handleCancel() {
            // this.close();
            // this.$emit('cancel');
        },
        simulateProgress() {
            this.clearTimer();
            // 简单的虚拟进度条
            this.timer = setInterval(() => {
                if (this.progress < 90) {
                    const step = Math.floor(Math.random() * 5) + 1;
                    this.progress = Math.min(this.progress + step, 90);
                } else if (this.progress < 99) {
                    this.progress += 1;
                }
            }, 300);
        },
        clearTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        finish() {
            this.progress = 100;
            this.clearTimer();
            setTimeout(() => {
                this.close();
            }, 500);
        }
    },
    beforeDestroy() {
        this.clearTimer();
    }
};
</script>

<style scoped>
.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { display: flex; align-items: center; justify-content: center; }
.m-t-10 { margin-top: 10rpx; }
.m-t-30 { margin-top: 30rpx; }
.m-t-40 { margin-top: 40rpx; }
.f28 { font-size: 28rpx; }
.f32 { font-size: 32rpx; }
.fw-500 { font-weight: 500; }
.fc-333 { color: #333; }
.fc-999 { color: #999; }

.loading-content {
    background: #fff;
    border-radius: 20rpx;
    align-items: center;
}

.circle-box {
    width: 120rpx;
    height: 120rpx;
    position: relative;
    margin-bottom: 20rpx;
}

.glow-orb {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    background: linear-gradient(135deg, #4ba3ff 0%, #1677ff 100%);
    box-shadow: 0 0 30rpx rgba(22, 119, 255, 0.5);
    animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
    0% { transform: scale(0.9); box-shadow: 0 0 20rpx rgba(22, 119, 255, 0.3); }
    50% { transform: scale(1.1); box-shadow: 0 0 40rpx rgba(22, 119, 255, 0.7); }
    100% { transform: scale(0.9); box-shadow: 0 0 20rpx rgba(22, 119, 255, 0.3); }
}

.cancel-btn {
    width: 100%;
    padding: 20rpx 0;
}
</style>
