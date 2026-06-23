<template>
    <view class="page-container y">
        <!-- 导航栏 -->
        <l-nav title="账号定位" bg-color="#f8f9fa" @back="handleBack"></l-nav>

        <view class="content-wrap y flex-1">
            <!-- 定位描述 -->
            <view class="section y">
                <view class="section-title">定位描述</view>
                <view class="input-box y">
                    <textarea 
                        class="desc-textarea flex-1" 
                        v-model="positioningDesc" 
                        placeholder="请填写你的账号人设、内容与风格。" 
                        placeholder-class="ph-style"
                        maxlength="50"
                    ></textarea>
                    <view class="word-count">{{ positioningDesc.length }}/50</view>
                </view>
            </view>

            <!-- 参考示范 -->
            <view class="section y">
                <view class="section-title">参考示范</view>
                <view class="section-text">
                    保险经纪人，普及保险知识，提供建议，专业严谨。
                    家居带货达人，家居好物推荐与营销。少女心，亲切。
                </view>
            </view>

            <!-- 填写账号定位的好处 -->
            <view class="section y">
                <view class="section-title">填写账号定位的好处</view>
                <view class="section-text">
                    准确填写账号定位，可以获得更符合定位，吸引力更强的文案，来帮你提升曝光、快速增粉。
                </view>
            </view>
        </view>

        <!-- 底部保存按钮 -->
        <view class="bottom-bar c">
            <view 
                class="save-btn c" 
                :class="{'active': positioningDesc.length > 0}"
                @click="handleSave"
            >
                保存
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            positioningDesc: ''
        };
    },
    methods: {
        handleBack() {
            uni.navigateBack();
        },
        handleSave() {
            if (!this.positioningDesc) {
                return;
            }
            // 保存定位逻辑，并返回上一层（或触发后续生成流程）
            uni.showToast({ title: '保存成功，开始生成...', icon: 'none' });
            setTimeout(() => {
                 uni.navigateBack();
            }, 1000);
        }
    }
};
</script>

<style scoped>
.page-container {
    background: linear-gradient(180deg, #e8fff8 0%, #f8f9fa 15%, #f8f9fa 100%);
    min-height: 100vh;
}
.y { display: flex; flex-direction: column; }
.c { display: flex; align-items: center; justify-content: center; }
.flex-1 { flex: 1; }

.content-wrap {
    padding: 30rpx;
    padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
}

.section {
    margin-bottom: 50rpx;
}

.section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 24rpx;
}

.input-box {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    height: 280rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.02);
    position: relative;
}

.desc-textarea {
    width: 100%;
    font-size: 30rpx;
    color: #333;
    line-height: 1.6;
}

.ph-style {
    color: #ccc;
}

.word-count {
    position: absolute;
    bottom: 24rpx;
    right: 30rpx;
    font-size: 26rpx;
    color: #999;
}

.section-text {
    font-size: 28rpx;
    color: #666;
    line-height: 1.8;
}

/* 底部操作栏 */
.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24rpx 40rpx;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    background: #f8f9fa;
    z-index: 100;
}

.save-btn {
    width: 100%;
    height: 96rpx;
    background: #cdd1dd;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    border-radius: 20rpx;
    transition: all 0.3s;
}

.save-btn.active {
    background: #1677FF;
    box-shadow: 0 8rpx 24rpx rgba(22, 119, 255, 0.3);
}
</style>
