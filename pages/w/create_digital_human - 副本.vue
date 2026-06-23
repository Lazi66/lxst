<template>
    <view class="page-container">
        <!-- 导航栏 -->
        <l-nav fanhui title="创建数字人" @back="handleBack"></l-nav>

        <view class="content-wrap p-30">
            <!-- 步骤条 -->
            <view class="steps-wrap x c-y jc-sa">
                <view class="step-item y c-y active">
                    <view class="step-circle">1</view>
                    <view class="step-text">上传照片</view>
                </view>
                <view class="step-line"></view>
                <view class="step-item y c-y active-blue">
                    <view class="step-circle">2</view>
                    <view class="step-text">选择语音</view>
                </view>
                <view class="step-line disabled"></view>
                <view class="step-item y c-y disabled">
                    <view class="step-circle">3</view>
                    <view class="step-text">生成数字人</view>
                </view>
            </view>

            <!-- 步骤1: 上传照片 -->
            <view class="card-wrap m-b-40">
                <view class="card-title">上传正面清晰人脸照片</view>
                <view class="card-subtitle">请上传光线充足、正面清晰的人脸照片，背景简单</view>
                
                <view class="upload-area y c-y jc-c">
                    <view class="upload-icon-box m-b-20">
                        <uv-icon name="camera" color="#555BFD" size="32"></uv-icon>
                    </view>
                    <view class="upload-title m-b-10">点击上传图片</view>
                    <view class="upload-desc m-b-30">支持JPG、PNG格式，大小不超过5MB</view>
                    <view class="btn-primary" @click="handleUpload">选择图片</view>
                </view>
                
                <view class="card-tip x c-y">
                    <uv-icon name="info-circle" color="#FB9E3A" size="14"></uv-icon>
                    <text class="tip-text">示例：清晰的正面人像，光线均匀，无遮挡</text>
                </view>
            </view>

            <!-- 步骤2: 选择语音 -->
            <view class="card-wrap m-b-40">
                <view class="x c-y jc-sb m-b-10">
                    <view class="card-title m-b-0">选择音色</view>
                    <view class="link-text" @click="handleSelectVoiceLib">选择音色库</view>
                </view>
                <view class="card-subtitle m-b-30">选择系统音色</view>
                
                <view class="voice-box y c-y jc-c m-b-30">
                    <view class="voice-placeholder">音色波形将显示在这里</view>
                </view>
                
                <view class="action-btns x c-y">
                    <view class="btn-cancel" @click="handleCancel">取消</view>
                    <view class="btn-reselect" @click="handleReselect">重选</view>
                    <view class="btn-next" @click="handleNext">下一步</view>
                </view>
            </view>

            <!-- 提示信息 -->
            <view class="notice-wrap x">
                <uv-icon name="info-circle" color="#FB9E3A" size="20" class="m-r-16 mt-4"></uv-icon>
                <view class="notice-content">
                    <view class="notice-title">生成数字人需要10分钟</view>
                    <view class="notice-desc">我们将使用阿里云数字人API处理您的照片和语音，生成完成后会通知您</view>
                </view>
            </view>

            <view class="p-b-safe"></view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            currentStep: 1, // 1: 上传照片, 2: 选择语音, 3: 生成中
            uploadedImage: '',
            selectedVoice: null
        };
    },
    methods: {
        handleBack() {
            const pages = getCurrentPages();
            if (pages.length > 1) {
                uni.navigateBack({ delta: 1 });
            } else {
                uni.switchTab({ url: '/pages/index_/index' });
            }
        },
        handleUpload() {
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    this.uploadedImage = res.tempFilePaths[0];
                    uni.showToast({ title: '图片已选择', icon: 'none' });
                    // 这里可以添加上传到服务器的逻辑
                }
            });
        },
        handleSelectVoiceLib() {
            uni.showToast({ title: '跳转选择音色库', icon: 'none' });
        },
        handleCancel() {
            this.handleBack();
        },
        handleReselect() {
            uni.showToast({ title: '重新选择音色', icon: 'none' });
        },
        handleNext() {
            uni.showToast({ title: '下一步操作', icon: 'none' });
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
.m-b-0 { margin-bottom: 0 !important; }
.m-b-10 { margin-bottom: 10rpx; }
.m-b-20 { margin-bottom: 20rpx; }
.m-b-30 { margin-bottom: 30rpx; }
.m-b-40 { margin-bottom: 40rpx; }
.m-r-16 { margin-right: 16rpx; }
.mt-4 { margin-top: 4rpx; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.jc-sa { justify-content: space-around; }
.jc-c { justify-content: center; }
.flex-1 { flex: 1; }
.p-b-safe { height: env(safe-area-inset-bottom); padding-bottom: 40rpx; }

/* 步骤条 */
.steps-wrap {
    background: #fff;
    padding: 30rpx 0;
    margin: -30rpx -30rpx 30rpx -30rpx;
    border-bottom: 1px solid #f0f0f0;
}
.step-item {
    position: relative;
    width: 140rpx;
}
.step-circle {
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 16rpx;
    transition: all 0.3s;
}
.step-text {
    font-size: 24rpx;
    color: #333;
}

/* 步骤1 */
.step-item.active .step-circle {
    background: #3a5dfb;
    color: #fff;
}

/* 步骤2 */
.step-item.active-blue .step-circle {
    background: #3a5dfb;
    color: #fff;
}
.step-item.active-blue .step-text {
    color: #666;
}

/* 步骤3 (未激活) */
.step-item.disabled .step-circle {
    background: #e6e6e6;
    color: #999;
}
.step-item.disabled .step-text {
    color: #999;
}

.step-line {
    flex: 1;
    height: 4rpx;
    background: #cfe2ff;
    margin: 0 10rpx;
    position: relative;
    top: -24rpx;
}
.step-line.disabled {
    background: #e6e6e6;
}

/* 卡片样式 */
.card-wrap {
    background: #fff;
    border-radius: 24rpx;
    padding: 40rpx 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.02);
}
.card-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 12rpx;
}
.card-subtitle {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 40rpx;
}

/* 上传区域 */
.upload-area {
    border: 2rpx solid #e0e5ff;
    border-radius: 20rpx;
    padding: 60rpx 0;
    margin-bottom: 30rpx;
    background: #fafbff;
}
.upload-icon-box {
    width: 96rpx;
    height: 96rpx;
    background: #eef1ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.upload-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
}
.upload-desc {
    font-size: 24rpx;
    color: #999;
}

.btn-primary {
    background: #3a5dfb;
    color: #fff;
    font-size: 28rpx;
    font-weight: bold;
    padding: 16rpx 60rpx;
    border-radius: 12rpx;
}

/* 提示图标 */
.card-tip {
    font-size: 24rpx;
    color: #666;
}
.tip-text {
    margin-left: 10rpx;
}

/* 选择语音区域 */
.link-text {
    font-size: 26rpx;
    color: #3a5dfb;
    font-weight: bold;
}
.voice-box {
    background: #f8f9fa;
    border-radius: 16rpx;
    height: 160rpx;
}
.voice-placeholder {
    font-size: 26rpx;
    color: #999;
}

/* 底部操作按钮 */
.action-btns {
    width: 100%;
    gap: 20rpx;
}
.btn-cancel, .btn-reselect {
    flex: 1;
    background: #f0f2f5;
    color: #666;
    font-size: 28rpx;
    text-align: center;
    padding: 24rpx 0;
    border-radius: 16rpx;
    font-weight: 500;
}
.btn-next {
    flex: 2;
    background: #3a5dfb;
    color: #fff;
    font-size: 28rpx;
    text-align: center;
    padding: 24rpx 0;
    border-radius: 16rpx;
    font-weight: bold;
}

/* 黄色提示框 */
.notice-wrap {
    background: #fff8e6;
    border-radius: 16rpx;
    padding: 30rpx;
    align-items: flex-start;
}
.notice-content {
    flex: 1;
}
.notice-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #8c5a20;
    margin-bottom: 8rpx;
}
.notice-desc {
    font-size: 24rpx;
    color: #b07e3a;
    line-height: 1.5;
}
</style>
