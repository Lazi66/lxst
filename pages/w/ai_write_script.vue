<template>
    <view class="page-container y">
        <!-- 导航栏 -->
        <l-nav title="AI 帮我写" bg-color="#f8f9fa" @back="handleBack"></l-nav>

        <view class="content-wrap y flex-1">
            <!-- 剧本类型标签 -->
            <scroll-view class="type-scroll" scroll-x :show-scrollbar="false">
                <view class="type-list x">
                    <view 
                        v-for="(item, index) in typeList" 
                        :key="index"
                        class="type-item x c-y"
                        :class="{'active': currentType === index}"
                        @click="currentType = index"
                    >
                        <text class="type-icon">{{ item.icon }}</text>
                        <text class="type-name">{{ item.name }}</text>
                    </view>
                </view>
            </scroll-view>

            <!-- 输入区域 -->
            <view class="input-section y">
                <textarea 
                    class="main-textarea" 
                    v-model="prompt" 
                    placeholder="如：如何三天游遍一个城市？" 
                    placeholder-class="ph-style"
                    :maxlength="-1"
                ></textarea>
                
                <view class="random-btn-wrap x">
                    <view class="random-btn x c-y" @click="handleRandom">
                        <uv-icon name="reload" size="14" color="#666"></uv-icon>
                        <text class="random-text m-l-10">随机</text>
                    </view>
                </view>
            </view>

            <!-- 字数设置 -->
            <view class="setting-section y">
                <view class="setting-title">字数</view>
                <view class="length-options x flex-wrap">
                    <view 
                        v-for="(item, index) in lengthOptions" 
                        :key="index"
                        class="length-item c"
                        :class="{'active': currentLength === index}"
                        @click="currentLength = index"
                    >
                        {{ item.name }}
                    </view>
                    <view 
                        class="length-item c"
                        :class="{'active': currentLength === 3}"
                        @click="currentLength = 3"
                    >
                        <view class="custom-input-wrap x c-y" v-if="currentLength === 3">
                            <input class="custom-input" type="number" v-model="customLength" focus placeholder="输入" placeholder-class="custom-ph" />
                            <text class="custom-unit">字</text>
                        </view>
                        <text v-else>自定义</text>
                    </view>
                </view>
                <view class="length-desc">{{ lengthDesc }}</view>
            </view>

            <!-- 结合账号定位 -->
            <view class="setting-section account-setting x c-y jc-sb">
                <view class="y">
                    <view class="setting-title" style="margin-bottom: 8rpx;">结合账号定位</view>
                    <view class="setting-desc">开启以获得更精准的脚本</view>
                </view>
                <switch 
                    :checked="useAccountPositioning" 
                    color="#1677FF" 
                    style="transform: scale(0.8);"
                    @change="handleSwitchChange" 
                />
            </view>
        </view>

        <!-- 底部生成按钮 -->
        <view class="bottom-bar c">
            <view 
                class="generate-btn c" 
                :class="{'disabled': !canGenerate}"
                @click="handleGenerate"
            >
                使用 DeepSeek 生成
            </view>
        </view>

        <!-- AI 生成 Loading 弹窗 -->
        <ai-loading-dialog ref="aiLoading" @cancel="handleCancelGenerate" />
    </view>
</template>

<script>
import AiLoadingDialog from '@/components/ai-loading-dialog/ai-loading-dialog.vue';

export default {
    components: {
        AiLoadingDialog
    },
    data() {
        return {
            prompt: '',
            currentType: 0,
            typeList: [
                { name: '通用口播', icon: '🎬' },
                { name: '情感金句', icon: '💌' },
                { name: '知识科普', icon: '📚' },
                { name: '带货种草', icon: '🛍️' }
            ],
            currentLength: 0,
            customLength: '',
            lengthOptions: [
                { name: '短', desc: '约1分钟的视频文案长度' },
                { name: '中', desc: '约3分钟的视频文案长度' },
                { name: '长', desc: '约5分钟的视频文案长度' }
            ],
            useAccountPositioning: false,
            // 选中的内容，如果有选中则返回上一页携带
            generatedContent: '' 
        };
    },
    computed: {
        lengthDesc() {
            if (this.currentLength < 3) {
                return this.lengthOptions[this.currentLength].desc;
            }
            if (this.customLength) {
                return `约需要生成 ${this.customLength} 字长度的视频文案`;
            }
            return '自定义输入期望的字数';
        },
        canGenerate() {
            return this.prompt.length > 0;
        }
    },
    methods: {
        handleBack() {
            uni.navigateBack();
        },
        handleRandom() {
            const randomPrompts = [
                '如何三天游遍一个城市？',
                '普通人如何开启副业赚钱？',
                '为什么现代人越来越不想结婚？',
                '给大家推荐几款超好用的平价护肤品'
            ];
            this.prompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
        },
        handleSwitchChange(e) {
            this.useAccountPositioning = e.detail.value;
            if (this.useAccountPositioning) {
                uni.navigateTo({
                    url: '/pages/w/ai_account_positioning'
                });
            }
        },
        handleGenerate() {
            if (!this.canGenerate) return;
            
            // 打开 Loading 弹窗
            if (this.$refs.aiLoading) {
                this.$refs.aiLoading.open();
            }
            
            // 模拟接口请求延迟
            this.generateTimer = setTimeout(() => {
                if (this.$refs.aiLoading) {
                    this.$refs.aiLoading.finish();
                }
                
                const mockResult = '时间管理不是列清单，而是抓重点。试试「番茄工作法」：25分钟专注+5分钟休息，效率翻倍。重要任务放上午，精力最旺盛；下午处理琐事，轻松不费脑。';
                uni.navigateTo({
                    url: `/pages/w/ai_write_script_result?title=${encodeURIComponent('时间不够用？3招效率翻倍')}&content=${encodeURIComponent(mockResult)}`
                });
            }, 3000); // 模拟 3 秒生成时间
        },
        handleCancelGenerate() {
            // 用户点击了加载弹窗的取消，可以在这里中断请求
            if (this.generateTimer) {
                clearTimeout(this.generateTimer);
                this.generateTimer = null;
            }
            uni.showToast({ title: '已取消生成', icon: 'none' });
        }
    },
    beforeDestroy() {
        if (this.generateTimer) {
            clearTimeout(this.generateTimer);
        }
    }
};
</script>

<style scoped>
.page-container {
    background: linear-gradient(180deg, #e8f5e9 0%, #f8f9fa 15%, #f8f9fa 100%);
    min-height: 100vh;
}
.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { display: flex; align-items: center; justify-content: center; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.flex-1 { flex: 1; }
.flex-wrap { flex-wrap: wrap; }
.m-l-10 { margin-left: 10rpx; }

.content-wrap {
    padding: 0 30rpx;
    padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
}

/* 横向滚动标签 */
.type-scroll {
    width: 100%;
    white-space: nowrap;
    margin: 20rpx 0 30rpx;
}

.type-list {
    display: inline-flex;
    padding: 0 4rpx;
}

.type-item {
    background: #fff;
    padding: 16rpx 32rpx;
    border-radius: 12rpx;
    margin-right: 20rpx;
    border: 2rpx solid transparent;
    transition: all 0.2s;
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.02);
}

.type-item.active {
    border-color: #1677FF;
    background: rgba(22, 119, 255, 0.05);
}

.type-item.active .type-name {
    color: #333;
    font-weight: bold;
}

.type-icon {
    font-size: 32rpx;
    margin-right: 8rpx;
}

.type-name {
    font-size: 28rpx;
    color: #666;
}

/* 输入区域 */
.input-section {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    min-height: 400rpx;
    margin-bottom: 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.02);
}

.main-textarea {
    width: 100%;
    flex: 1;
    font-size: 30rpx;
    color: #333;
    line-height: 1.6;
}

.ph-style {
    color: #bbb;
}

.random-btn-wrap {
    margin-top: 20rpx;
}

.random-btn {
    background: #f5f5f5;
    padding: 12rpx 24rpx;
    border-radius: 8rpx;
    align-self: flex-start;
}

.random-text {
    font-size: 26rpx;
    color: #666;
}

/* 字数等设置区域 */
.setting-section {
    margin-bottom: 50rpx;
}

.setting-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 24rpx;
}

.length-options {
    gap: 20rpx;
    margin-bottom: 20rpx;
}

.length-item {
    width: calc((100% - 40rpx) / 3);
    height: 72rpx;
    background: #fff;
    border-radius: 12rpx;
    font-size: 28rpx;
    color: #666;
    border: 2rpx solid transparent;
    transition: all 0.2s;
}

.length-item.active {
    border-color: #1677FF;
    color: #1677FF;
    font-weight: bold;
    background: rgba(22, 119, 255, 0.05);
}

.length-desc {
    font-size: 26rpx;
    color: #999;
}

/* 自定义字数输入框 */
.custom-input-wrap {
    width: 100%;
    height: 100%;
    justify-content: center;
}
.custom-input {
    width: 120rpx;
    height: 100%;
    font-size: 28rpx;
    text-align: center;
    color: #1677FF;
}
.custom-ph {
    color: #aebce5;
}
.custom-unit {
    color: #1677FF;
    font-size: 28rpx;
    font-weight: bold;
}

/* 结合账号定位 */
.account-setting {
    background: transparent;
}

.setting-desc {
    font-size: 26rpx;
    color: #999;
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

.generate-btn {
    width: 100%;
    height: 96rpx;
    background: #cdd1dd;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    border-radius: 20rpx;
    transition: all 0.3s;
}

.generate-btn:not(.disabled) {
    background: #1677FF;
    box-shadow: 0 8rpx 24rpx rgba(22, 119, 255, 0.3);
}
</style>
