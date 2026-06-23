<template>
    <view class="page-container">
        <!-- 导航栏 -->
        <l-nav fanhui :title="pageTitle" bg-color="#f8f9fa"></l-nav>

        <view class="content-wrap y p-x-30 p-y-20">
            <!-- 文本预览框 -->
            <view class="text-preview-box y">
                <textarea 
                    class="preview-textarea flex-1" 
                    v-model="textContent" 
                    :maxlength="-1"
                    placeholder="请输入需要改写的文案"
                ></textarea>
                <view class="preview-actions x jc-e">
                    <view class="clear-icon-box c" @click="handleClearText">
                        <uv-icon name="close" color="#999" size="14"></uv-icon>
                    </view>
                </view>
            </view>

            <!-- 动态选项区域 -->
            
            <!-- 扩写选项 -->
            <view class="options-section y m-t-40" v-if="rewriteType === '扩写'">
                <view class="section-title fw-700 f30 fc-333">增加字数</view>
                <view class="options-grid x flex-wrap m-t-20">
                    <view class="option-item c" :class="{'active': expandLevel === '少'}" @click="expandLevel = '少'">少</view>
                    <view class="option-item c" :class="{'active': expandLevel === '多'}" @click="expandLevel = '多'">多</view>
                    <view class="option-item c" :class="{'active': expandLevel === '自定义'}" @click="expandLevel = '自定义'">
                        <view class="custom-input-wrap x c-y" v-if="expandLevel === '自定义'">
                            <input class="custom-input" type="number" v-model="customExpand" focus placeholder="输入" placeholder-class="custom-ph" />
                            <text class="custom-unit">字</text>
                        </view>
                        <text v-else>自定义</text>
                    </view>
                </view>
                <view class="option-hint f26 fc-999 m-t-20">
                    <text v-if="expandLevel === '少'">扩写幅度少一点</text>
                    <text v-else-if="expandLevel === '多'">较大幅度增加文章长度</text>
                    <text v-else>自定义扩写要求</text>
                </view>
            </view>

            <!-- 缩写选项 -->
            <view class="options-section y m-t-40" v-if="rewriteType === '缩写'">
                <view class="section-title fw-700 f30 fc-333">减少至</view>
                <view class="options-grid x flex-wrap m-t-20">
                    <view class="option-item c" :class="{'active': shortenLevel === '短'}" @click="shortenLevel = '短'">短</view>
                    <view class="option-item c" :class="{'active': shortenLevel === '中'}" @click="shortenLevel = '中'">中</view>
                    <view class="option-item c" :class="{'active': shortenLevel === '长'}" @click="shortenLevel = '长'">长</view>
                    <view class="option-item c" :class="{'active': shortenLevel === '自定义'}" @click="shortenLevel = '自定义'">
                        <view class="custom-input-wrap x c-y" v-if="shortenLevel === '自定义'">
                            <input class="custom-input" type="number" v-model="customShorten" focus placeholder="输入" placeholder-class="custom-ph" />
                            <text class="custom-unit">字</text>
                        </view>
                        <text v-else>自定义</text>
                    </view>
                </view>
                <view class="option-hint f26 fc-999 m-t-20">
                    <text v-if="shortenLevel === '短'">缩减至很短的视频文案</text>
                    <text v-else-if="shortenLevel === '中'">缩减至中等长度</text>
                    <text v-else-if="shortenLevel === '长'">稍微缩减一些不影响原意</text>
                    <text v-else>自定义缩写要求</text>
                </view>
            </view>

            <!-- 润色选项 -->
            <view class="options-section y m-t-40" v-if="rewriteType === '润色'">
                <view class="section-title fw-700 f30 fc-333">润色要求</view>
                <view class="options-grid x flex-wrap m-t-20">
                    <view class="option-item c" :class="{'active': polishStyle === '更生动'}" @click="polishStyle = '更生动'">更生动</view>
                    <view class="option-item c" :class="{'active': polishStyle === '更专业'}" @click="polishStyle = '更专业'">更专业</view>
                    <view class="option-item c" :class="{'active': polishStyle === '更幽默'}" @click="polishStyle = '更幽默'">更幽默</view>
                    <view class="option-item c" :class="{'active': polishStyle === '自定义'}" @click="polishStyle = '自定义'">自定义</view>
                </view>

                <view class="custom-textarea-wrap y m-t-20" v-if="polishStyle === '自定义'">
                    <textarea 
                        class="custom-textarea" 
                        v-model="customPolishText" 
                        placeholder="请输入自定义润色要求..." 
                        placeholder-class="ph-style"
                        :maxlength="200"
                    ></textarea>
                </view>
                
                <view class="account-positioning x c-y jc-sb m-t-40 p-y-20">
                    <view class="y">
                        <view class="positioning-title fw-700 f30 fc-333">结合账号定位</view>
                        <view class="positioning-desc f26 fc-999 m-t-10">开启以获得更精准的脚本</view>
                    </view>
                    <switch :checked="useAccountPositioning" color="#1677FF" style="transform:scale(0.8)" @change="handleSwitchChange" />
                </view>
            </view>

        </view>

        <!-- 底部生成按钮 -->
        <view class="bottom-action-bar p-40">
            <view class="generate-btn x c c-y" @click="handleGenerate">
                <text class="fc-fff f30 fw-500">使用 DeepSeek 生成</text>
                <uv-icon name="moments" color="#fff" size="18" class="m-l-10 m-r-6"></uv-icon>
                <text class="fc-fff f30 fw-500">1</text>
            </view>
        </view>

    </view>
</template>

<script>
export default {
    data() {
        return {
            rewriteType: '扩写', // 扩写、缩写、润色
            textContent: '',
            
            // 扩写状态
            expandLevel: '少',
            customExpand: '',
            // 缩写状态
            shortenLevel: '短',
            customShorten: '',
            // 润色状态
            polishStyle: '更生动',
            customPolishText: '',
            useAccountPositioning: false
        };
    },
    computed: {
        pageTitle() {
            return this.rewriteType;
        }
    },
    onLoad(options) {
        if (options.type) {
            this.rewriteType = decodeURIComponent(options.type);
        }
        if (options.content) {
            this.textContent = decodeURIComponent(options.content);
        }
    },
    methods: {
        handleClearText() {
            this.textContent = '';
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
            if (!this.textContent) {
                uni.showToast({ title: '文案不能为空', icon: 'none' });
                return;
            }
            uni.showToast({ title: '正在生成...', icon: 'none' });
            // TODO: Implement generation logic
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
.jc-e { justify-content: flex-end; }
.flex-1 { flex: 1; }
.flex-wrap { flex-wrap: wrap; }
.m-l-10 { margin-left: 10rpx; }
.m-r-6 { margin-right: 6rpx; }
.m-t-10 { margin-top: 10rpx; }
.m-t-20 { margin-top: 20rpx; }
.m-t-40 { margin-top: 40rpx; }
.p-x-30 { padding-left: 30rpx; padding-right: 30rpx; }
.p-y-20 { padding-top: 20rpx; padding-bottom: 20rpx; }
.p-40 { padding: 40rpx; }
.fw-500 { font-weight: 500; }
.fw-700 { font-weight: 700; }
.f26 { font-size: 26rpx; }
.f30 { font-size: 30rpx; }
.fc-fff { color: #fff; }
.fc-333 { color: #333; }
.fc-999 { color: #999; }

.content-wrap {
    padding-bottom: calc(160rpx + env(safe-area-inset-bottom));
}

.text-preview-box {
    background: #f4f5f9;
    border-radius: 20rpx;
    padding: 30rpx;
    min-height: 480rpx;
}

.preview-textarea {
    width: 100%;
    min-height: 380rpx;
    font-size: 28rpx;
    line-height: 1.6;
    color: #333;
}

.preview-actions {
    margin-top: 20rpx;
}

.clear-icon-box {
    width: 48rpx;
    height: 48rpx;
    background: #e8e9ed;
    border-radius: 50%;
}

/* 选项公共样式 */
.options-grid {
    gap: 20rpx;
}

.option-item {
    padding: 0 40rpx;
    height: 72rpx;
    background: #fff;
    border: 2rpx solid #eeeeee;
    border-radius: 12rpx;
    font-size: 28rpx;
    color: #333;
    min-width: 140rpx;
    transition: all 0.2s;
}

.option-item.active {
    border-color: #1677FF;
    color: #1677FF;
    background: rgba(22, 119, 255, 0.05);
}

/* 自定义字数输入框 */
.custom-input-wrap {
    width: 100%;
    height: 100%;
    justify-content: center;
}
.custom-input {
    width: 60rpx;
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

/* 自定义润色输入框 */
.custom-textarea-wrap {
    background: #f4f5f9;
    border-radius: 12rpx;
    padding: 24rpx;
}
.custom-textarea {
    width: 100%;
    height: 160rpx;
    font-size: 28rpx;
    color: #333;
    line-height: 1.5;
}
.ph-style {
    color: #999;
}

.account-positioning {
    border-top: 1rpx solid #f0f0f0;
}

/* 底部操作栏 */
.bottom-action-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f8f9fa;
    padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
}

.generate-btn {
    background: #1677FF;
    border-radius: 24rpx;
    height: 100rpx;
    width: 100%;
    box-shadow: 0 8rpx 24rpx rgba(22, 119, 255, 0.3);
}
</style>
