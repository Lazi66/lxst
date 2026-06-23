<template>
    <view class="page-container y">
        <!-- 导航栏 -->
        <l-nav title="生成结果" bg-color="#f8f9fa" @back="handleBack">
            <view slot="right" class="nav-right" @click="handleRegenerate">
                <view class="regenerate-btn x c-y">
                    <uv-icon name="reload" color="#333" size="14"></uv-icon>
                    <text class="regenerate-text m-l-10">重新生成</text>
                </view>
            </view>
        </l-nav>

        <view class="content-wrap y flex-1">
            <view class="result-card y">
                <text class="result-title">{{ resultTitle }}</text>
                <scroll-view class="result-scroll flex-1 m-t-20" scroll-y>
                    <text class="result-content">{{ resultContent }}</text>
                </scroll-view>
                
                <view class="card-bottom x c-y jc-sb m-t-30">
                    <view class="left-actions x c-y">
                        <!-- <uv-icon name="thumb-up" color="#999" size="20" customStyle="margin-right: 20rpx;"></uv-icon>
                        <uv-icon name="thumb-down" color="#999" size="20"></uv-icon> -->
                    </view>
                    <view class="copy-btn x c-y c" @click="handleCopy">
                        <uv-icon name="file-text" color="#666" size="14"></uv-icon>
                        <text class="copy-text m-l-10">复制</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 底部生成按钮 -->
        <view class="bottom-bar y c">
            <view class="use-btn c" @click="handleUseScript">
                使用文案
            </view>
            <text class="bottom-tips m-t-20">内容由 AI 生成</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            resultTitle: '时间不够用？3招效率翻倍',
            resultContent: '每天忙到飞起，工作还是做不完？\n\n时间管理不是列清单，而是抓重点。试试「番茄工作法」：25分钟专注+5分钟休息，效率翻倍。重要任务放上午，精力最旺盛；下午处理琐事，轻松不费脑。\n\n想告别加班？从今天开始，把时间用在刀刃上！'
        };
    },
    onLoad(options) {
        if (options.title) {
            this.resultTitle = decodeURIComponent(options.title);
        }
        if (options.content) {
            this.resultContent = decodeURIComponent(options.content);
        }
    },
    methods: {
        handleBack() {
            uni.navigateBack();
        },
        handleRegenerate() {
            uni.showToast({ title: '正在重新生成...', icon: 'none' });
            // TODO: 调用重新生成接口
        },
        handleCopy() {
            uni.setClipboardData({
                data: this.resultContent,
                success: () => {
                    uni.showToast({ title: '复制成功', icon: 'success' });
                }
            });
        },
        handleUseScript() {
            // 获取页面栈，找到需要接收数据的上一页
            const pages = getCurrentPages();
            let prevPage = null;
            
            // 向前遍历页面栈，找到数字人视频编辑页 (digital_human_video)
            for (let i = pages.length - 2; i >= 0; i--) {
                if (pages[i].route.includes('digital_human_video')) {
                    prevPage = pages[i];
                    break;
                }
            }

            if (prevPage) {
                // 如果是 vue3 的 setup 语法，可以直接修改 ref 或 reactive 数据
                // 这里按 vue2 / options api 的方式处理：如果上个页面有对应的方法接收可以直接调，或者简单粗暴使用 uni.$emit 
                // 我们之前在这个项目里通常使用全局事件或页面实例上的数据
                uni.$emit('updateDigitalHumanScript', { content: this.resultContent });
                uni.navigateBack({
                    delta: pages.length - 1 - pages.indexOf(prevPage)
                });
            } else {
                uni.showToast({ title: '没有找到编辑器页面', icon: 'none' });
            }
        }
    }
};
</script>

<style scoped>
.page-container {
    background: linear-gradient(180deg, #f0fdf4 0%, #f8f9fa 15%, #f8f9fa 100%);
    height: 100vh;
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
.m-r-20 { margin-right: 20rpx; }
.m-r-60 { margin-right: 60rpx; }
.m-t-20 { margin-top: 20rpx; }
.m-t-30 { margin-top: 30rpx; }

.nav-right {
    padding-right: 30rpx;
}
.regenerate-btn {
    padding: 10rpx 0;
}
.regenerate-text {
    font-size: 28rpx;
    color: #333;
}

.content-wrap {
    padding: 30rpx;
    padding-bottom: calc(240rpx + env(safe-area-inset-bottom));
}

.result-card {
    background: #fdfdfd;
    border-radius: 20rpx;
    padding: 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.02);
    min-height: 800rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.result-title {
    font-size: 34rpx;
    font-weight: bold;
    color: #333;
    line-height: 1.5;
}

.result-scroll {
    width: 100%;
}

.result-content {
    font-size: 30rpx;
    color: #666;
    line-height: 1.8;
}

.card-bottom {
    margin-top: auto;
    padding-top: 40rpx;
}

.copy-btn {
    border: 2rpx solid #e8e8e8;
    padding: 8rpx 20rpx;
    border-radius: 10rpx;
}
.copy-text {
    font-size: 24rpx;
    color: #666;
}

/* 底部栏 */
.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24rpx 40rpx;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    background: transparent;
    z-index: 100;
}

.use-btn {
    width: 100%;
    height: 96rpx;
    background: #1677FF;
    border-radius: 20rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    box-shadow: 0 8rpx 20rpx rgba(22, 119, 255, 0.2);
}
.use-btn:active {
    opacity: 0.9;
}

.bottom-tips {
    font-size: 24rpx;
    color: #ccc;
}
</style>
