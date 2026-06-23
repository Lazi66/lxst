<template>
    <view class="page-container y">
        <!-- 导航栏 -->
        <l-nav title="视频创作" bg-color="#f8f9fa" @back="handleBack">
            <view slot="left" class="nav-left-btn x c-y" @click="handleBack">
                <uv-icon name="close" color="#333" size="20"></uv-icon>
            </view>
            <view slot="right" class="nav-right-btn x c-y" @click="toMyTemplates">
                <uv-icon name="grid" color="#333" size="16"></uv-icon>
                <text class="nav-right-text">我的模板</text>
            </view>
        </l-nav>

        <view class="content-wrap y flex-1">
            <!-- 手机模拟展示区 -->
            <view class="mockup-container c flex-1">
                <view class="phone-mockup y">
                    <!-- 模拟的内容，缩小版的编辑器页面 -->
                    <view class="mockup-header x c-y jc-sb">
                        <view class="x c-y">
                            <uv-icon name="arrow-left" color="#333" size="14"></uv-icon>
                            <text class="mockup-title m-l-10">1. 输入文字</text>
                        </view>
                    </view>
                    
                    <view class="mockup-editor-area y flex-1">
                        <view class="mockup-input-title">永远不要 提前焦虑</view>
                        <view class="mockup-divider"></view>
                        <view class="mockup-input-desc">请输入视频文案</view>
                        <view class="mockup-example-btn x c-y">
                            <uv-icon name="file-text" color="#666" size="12"></uv-icon>
                            <text class="m-l-10" style="font-size: 20rpx; color: #666;">使用示例文案</text>
                        </view>
                    </view>

                    <view class="mockup-bottom-bar x c-y jc-sb">
                        <view class="mockup-ai-btn x c-y">
                            <uv-icon name="star-fill" color="#1677FF" size="10"></uv-icon>
                            <text class="mockup-ai-text m-l-10">AI帮我写</text>
                        </view>
                        <view class="mockup-next-btn c">下一步</view>
                    </view>
                </view>
            </view>

            <!-- 底部信息区域 -->
            <view class="info-section y">
                <view class="info-title-wrap">
                    <view class="info-title">数字人口播视频</view>
                    <view class="info-title-highlight">一键生成</view>
                </view>
                <view class="info-desc">输入文字，选模板，即刻出片。</view>
            </view>

            <!-- 开始创作按钮 -->
            <view class="bottom-action c">
                <view class="cta-btn c" @click="toCreate">开始创作</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    methods: {
        handleBack() {
            uni.navigateBack();
        },
        toMyTemplates() {
            uni.showToast({
                title: '我的模板功能开发中',
                icon: 'none'
            });
        },
        toCreate() {
            uni.navigateTo({
                url: '/pages/w/digital_human_video'
            });
        }
    }
};
</script>

<style scoped>
.page-container {
    background-color: #f8f9fa;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { display: flex; align-items: center; justify-content: center; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.flex-1 { flex: 1; }
.m-l-10 { margin-left: 10rpx; }

/* 导航栏 */
.nav-left-btn {
    padding: 10rpx;
}
.nav-right-btn {
    background: #e8ebf0;
    padding: 12rpx 24rpx;
    border-radius: 100rpx;
}
.nav-right-text {
    font-size: 24rpx;
    color: #333;
    margin-left: 8rpx;
    font-weight: 500;
}

.content-wrap {
    padding: 0 60rpx;
    padding-bottom: calc(60rpx + env(safe-area-inset-bottom));
}

/* 手机模拟器 */
.mockup-container {
    padding: 40rpx 0 80rpx;
    width: 100%;
}

.phone-mockup {
    width: 460rpx;
    height: 700rpx;
    background: #f8f9fa; /* 模拟屏幕底色 */
    border-radius: 60rpx;
    border: 14rpx solid #ffffff; /* 手机外壳 */
    box-shadow: 0 30rpx 60rpx rgba(22, 119, 255, 0.15), inset 0 0 0 2rpx #eee;
    overflow: hidden;
    position: relative;
}

.mockup-header {
    padding: 30rpx 24rpx 20rpx;
}
.mockup-title {
    font-size: 26rpx;
    font-weight: bold;
    color: #333;
}

.mockup-editor-area {
    background: #fff;
    margin: 0 24rpx;
    border-radius: 16rpx;
    padding: 24rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.02);
}

.mockup-input-title {
    font-size: 26rpx;
    font-weight: bold;
    color: #333;
}
.mockup-divider {
    height: 2rpx;
    background: #f0f0f0;
    margin: 16rpx 0;
}
.mockup-input-desc {
    font-size: 22rpx;
    color: #999;
    margin-bottom: 20rpx;
}
.mockup-example-btn {
    background: #f0f2f5;
    padding: 8rpx 16rpx;
    border-radius: 8rpx;
    align-self: flex-start;
}

.mockup-bottom-bar {
    margin-top: auto;
    background: #fff;
    padding: 20rpx 24rpx;
    border-top: 1rpx solid #f0f0f0;
}

.mockup-ai-btn {
    background: #f0f6ff;
    padding: 10rpx 20rpx;
    border-radius: 40rpx;
}
.mockup-ai-text {
    font-size: 20rpx;
    color: #1677FF;
    font-weight: 500;
}
.mockup-next-btn {
    background: #cdd1dd;
    color: #fff;
    font-size: 20rpx;
    font-weight: bold;
    height: 48rpx;
    padding: 0 30rpx;
    border-radius: 40rpx;
}

/* 底部信息 */
.info-section {
    margin-bottom: 60rpx;
}

.info-title-wrap {
    margin-bottom: 24rpx;
    display: flex;
    flex-direction: column;
}

.info-title {
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
}

.info-title-highlight {
    font-size: 48rpx;
    font-weight: bold;
    color: #1677FF;
}

.info-desc {
    font-size: 28rpx;
    color: #666;
}

/* 按钮区 */
.bottom-action {
    width: 100%;
}

.cta-btn {
    width: 100%;
    height: 96rpx;
    background: linear-gradient(135deg, #1677FF, #3A5DFB);
    border-radius: 100rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    box-shadow: 0 10rpx 30rpx rgba(22, 119, 255, 0.3);
}
</style>
