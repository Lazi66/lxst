<template>
    <view class="page-container">
        <!-- 导航栏 -->
        <l-nav fanhui title="AI数字人助手" @back="handleBack"></l-nav>

        <view class="content-wrap p-30">
            <!-- 顶部横幅 -->
            <view class="banner-card">
                <view class="banner-info">
                    <view class="banner-title">欢迎使用AI数字人助手</view>
                    <view class="banner-desc">创建专属数字人，轻松制作营销视频</view>
                    <view class="banner-btn" @click="toUrl('/pages/w/create_digital_human')">立即体验</view>
                </view>
                <image :src="`${imgHost}/static/images/w/roabt.png`" class="banner-robot" mode="aspectFit"></image>
            </view>

            <!-- 核心功能 -->
            <view class="section-title">核心功能</view>
            <view class="grid-wrap">
                <view class="grid-item" @click="toUrl('/pages/w/create_digital_human')">
                    <view class="icon-box icon-blue">
                        <uv-icon name="account" color="#3A5DFB" size="24"></uv-icon>
                    </view>
                    <view class="item-info">
                        <view class="item-title">数字人生成</view>
                        <view class="item-desc">上传照片，10分钟创建专属数字人</view>
                    </view>
                </view>
                <view class="grid-item" @click="toUrl('/pages/w/digital_human_video_intro')">
                    <view class="icon-box icon-purple">
                        <uv-icon name="play-circle" color="#A03AFB" size="24"></uv-icon>
                    </view>
                    <view class="item-info">
                        <view class="item-title">视频创作</view>
                        <view class="item-desc">插入门店视频，数字人专业解说</view>
                    </view>
                </view>
                <view class="grid-item" @click="toUrl('/pages/w/create_custom_voice')">
                    <view class="icon-box icon-orange">
                        <uv-icon name="mic" color="#FB9E3A" size="24"></uv-icon>
                    </view>
                    <view class="item-info">
                        <view class="item-title">声音生成</view>
                        <view class="item-desc">复刻专属声音，智能转语音</view>
                    </view>
                </view>
                <view class="grid-item" @click="toAi">
                    <view class="icon-box icon-green">
                        <uv-icon name="chat" color="#18D08D" size="24"></uv-icon>
                    </view>
                    <view class="item-info">
                        <view class="item-title">AI对话</view>
                        <view class="item-desc">深度思考，连续对话，内容可复制</view>
                    </view>
                </view>
                <view class="grid-item" @click="toUrl('/pages/w/industry_templates')">
                    <view class="icon-box icon-orange">
                        <uv-icon name="grid" color="#FB9E3A" size="24"></uv-icon>
                    </view>
                    <view class="item-info">
                        <view class="item-title">行业模板</view>
                        <view class="item-desc">20+行业模板，快速制作专业内容</view>
                    </view>
                </view>
                <view class="grid-item" @click="toUrl('/pages/w/digital_human_task_list')">
                    <view class="icon-box icon-blue">
                        <uv-icon name="list" color="#3A5DFB" size="24"></uv-icon>
                    </view>
                    <view class="item-info">
                        <view class="item-title">我的任务</view>
                        <view class="item-desc">查看数字人制作任务进度与结果</view>
                    </view>
                </view>
                <view class="grid-item" @click="toUrl('/pages/w/my_digital_human')">
                    <view class="icon-box icon-green">
                        <uv-icon name="account-fill" color="#18D08D" size="24"></uv-icon>
                    </view>
                    <view class="item-info">
                        <view class="item-title">我的数字人</view>
                        <view class="item-desc">查看已生成的数字人形象</view>
                    </view>
                </view>
            </view>


            <view class="p-b-safe"></view>
        </view>
    </view>
</template>

<script>
import { getComputePowerConfig } from '@/api/public.js';
import { HTTP_REQUEST_URL } from '@/config/app';

export default {
    data() {
        return {
            imgHost: HTTP_REQUEST_URL,
        };
    },
    onShow() {
        this.fetchComputePowerConfig();
    },
    methods: {
        async fetchComputePowerConfig() {
            try {
                const res = await getComputePowerConfig();
                if (res.status === 200 && res.data) {
                    uni.setStorageSync('compute_power_config', res.data);
                }
            } catch (e) {
                console.error('获取算力配置失败', e);
            }
        },

        handleBack() {
            const pages = getCurrentPages();
            if (pages.length > 1) {
                uni.navigateBack({ delta: 1 });
            } else {
                uni.switchTab({ url: '/pages/index_/index' });
            }
        },
        toUrl(url) {
            uni.navigateTo({ url });
        },
        toAi() {
            uni.navigateTo({ url: '/pages/w/ai' });
        }
    }
}
</script>

<style scoped>
.page-container {
    background-color: #f8f9fa;
    min-height: 100vh;
}
.p-30 {
    padding: 30rpx;
}
.m-b-0 {
    margin-bottom: 0 !important;
}
.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.flex-1 { flex: 1; }
.p-b-safe { height: env(safe-area-inset-bottom); padding-bottom: 40rpx; }

/* 顶部 banner */
.banner-card {
    background: #1677FF;
    border-radius: 24rpx;
    padding: 40rpx 30rpx;
    color: #fff;
    margin-bottom: 40rpx;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10rpx 30rpx rgba(104, 72, 255, 0.2);
}
.banner-title {
    font-size: 36rpx;
    font-weight: 700;
    margin-bottom: 16rpx;
}
.banner-desc {
    font-size: 24rpx;
    opacity: 0.9;
    margin-bottom: 30rpx;
}
.banner-btn {
    background: #fff;
    color: #1677FF;
    font-size: 26rpx;
    font-weight: bold;
    padding: 12rpx 30rpx;
    border-radius: 100rpx;
    display: inline-block;
}
.banner-robot {
    position: absolute;
    right: 10rpx;
    top: 50%;
    transform: translateY(-50%);
    width: 200rpx;
    height: 200rpx;
    z-index: 1;
}
.banner-info {
    position: relative;
    z-index: 2;
}

/* 标题 */
.section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 24rpx;
}
.section-header {
    margin-bottom: 24rpx;
}
.section-more {
    font-size: 26rpx;
    color: #555BFD;
}

/* 核心功能网格 */
.grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 40rpx;
}
.grid-item {
    width: 48%;
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx 20rpx;
    margin-bottom: 20rpx;
    box-sizing: border-box;
}
.icon-box {
    width: 72rpx;
    height: 72rpx;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20rpx;
}
.icon-blue { background: rgba(58, 93, 251, 0.1); }
.icon-purple { background: rgba(160, 58, 251, 0.1); }
.icon-green { background: rgba(24, 208, 141, 0.1); }
.icon-orange { background: rgba(251, 158, 58, 0.1); }

.item-info .item-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 10rpx;
}
.item-info .item-desc {
    font-size: 22rpx;
    color: #999;
    line-height: 1.4;
}

/* 列表 */
.list-wrap {
    margin-bottom: 40rpx;
}
.empty-wrap {
    padding: 60rpx 0;
    background: #fff;
    border-radius: 20rpx;
    margin-bottom: 40rpx;
}
.empty-text {
    font-size: 28rpx;
    color: #999;
}
.list-item {
    background: #fff;
    border-radius: 20rpx;
    padding: 24rpx;
    margin-bottom: 20rpx;
}
.item-img {
    width: 120rpx;
    height: 120rpx;
    border-radius: 16rpx;
    margin-right: 24rpx;
}
.item-content .item-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 12rpx;
}
.item-content .item-desc {
    font-size: 24rpx;
    color: #999;
}

/* 热门滚屏 */
.template-scroll {
    width: 100%;
    white-space: nowrap;
}
.template-wrap {
    padding-bottom: 20rpx;
    display: inline-block;
}
.template-item {
    width: 240rpx;
    margin-right: 20rpx;
    background: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    padding-bottom: 20rpx;
    display: inline-block;
    vertical-align: top;
}
.template-img-box {
    width: 100%;
    height: 240rpx;
    box-sizing: border-box;
}
.p-10 {
    padding: 10rpx;
}
.br-12 {
    border-radius: 12rpx;
}
.template-img {
    width: 100%;
    height: 100%;
    display: block;
}
.template-name {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-top: 10rpx;
}
</style>
