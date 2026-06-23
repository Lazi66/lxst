<template>
    <view class="page-container">
        <l-nav fanhui title="兑换详情" bgColor="#f8f9fa" @back="handleBack"></l-nav>

        <view class="content-wrap p-30" v-if="loading">
            <view class="loading-wrap y c p-y-40">
                <text class="f24 fc-999">加载中...</text>
            </view>
        </view>

        <view class="content-wrap p-30" v-else-if="detail">
            <view class="status-card bg-white br-24 p-30 m-b-20 y">
                <view class="status-tag x c bg-green-light br-30 p-x-20 p-y-5 m-b-30" style="align-self: flex-start;">
                    <text class="f24 fc-green fw-bold">{{ detail.status_text || '已使用' }}</text>
                </view>
                <view class="y f26 fc-666 lh-2 m-b-20 bottom-border p-b-20">
                    <text>记录ID：{{ detail.id }}</text>
                    <text>兑换时间：{{ detail.use_time || '-' }}</text>
                    <text>卡密：{{ detail.card_number || '-' }}</text>
                </view>

                <view class="product-wrap x p-y-10">
                    <image :src="detail.target_cover_image || defaultCover" class="product-img br-12" mode="aspectFill"></image>
                    <view class="product-info flex-1 y jc-sb m-l-20">
                        <view class="y">
                            <text class="f28 fw-bold fc-333 line2 m-b-10">{{ detail.target_name || detail.target_title || '-' }}</text>
                            <text class="f24 fc-999">{{ detail.card_type_text || '-' }}</text>
                        </view>
                        <view class="x jc-sb c-y">
                            <text class="f24 fc-999">权益类型：{{ displayType }}</text>
                            <text class="f24 fc-999" v-if="detail.target_vip_day">时长：{{ detail.target_vip_day }} 天</text>
                        </view>
                    </view>
                </view>
            </view>

            <view class="detail-list-card bg-white br-24 p-x-30 p-y-40">
                <view class="f32 fw-bold fc-333 m-b-40">记录信息</view>

                <view class="info-row x jc-sb m-b-30">
                    <text class="f28 fc-666">批次ID</text>
                    <text class="f28 fc-333">{{ detail.batch_id || '-' }}</text>
                </view>
                <view class="info-row x jc-sb m-b-30">
                    <text class="f28 fc-666">卡密类型</text>
                    <text class="f28 fc-333">{{ detail.card_type_text || '-' }}</text>
                </view>
                <view class="info-row x jc-sb m-b-30">
                    <text class="f28 fc-666">目标ID</text>
                    <text class="f28 fc-333">{{ detail.target_id || '-' }}</text>
                </view>
                <view class="info-row x jc-sb m-b-30">
                    <text class="f28 fc-666">创建时间</text>
                    <text class="f28 fc-333">{{ addTimeText }}</text>
                </view>
                <view class="info-row x jc-sb">
                    <text class="f28 fc-666">状态</text>
                    <text class="f28 fc-333">{{ detail.status_text || '-' }}</text>
                </view>
            </view>
        </view>

        <view class="content-wrap p-30" v-else>
            <view class="loading-wrap y c p-y-40">
                <text class="f24 fc-999">未找到对应兑换记录</text>
            </view>
        </view>
    </view>
</template>

<script>
import lNav from '@/components/l-nav/nav.vue';
import { HTTP_REQUEST_URL } from '@/config/app';
import { getRedeemCardHistory } from '@/api/api.js';

export default {
    components: {
        lNav
    },
    data() {
        return {
            defaultCover: `${HTTP_REQUEST_URL}/static/images/w/kami.png`,
            loading: false,
            detail: null
        };
    },
    computed: {
        displayType() {
            const type = (this.detail && this.detail.target && this.detail.target.type) || (this.detail && this.detail.target_type) || '';
            const typeMap = {
                course: '课程',
                material: '资料',
                member: '会员'
            };
            return typeMap[type] || type || '-';
        },
        addTimeText() {
            const addTime = this.detail && this.detail.add_time;
            if (!addTime) return '-';
            if (String(addTime).length === 10) {
                return new Date(addTime * 1000).toLocaleString('zh-CN', { hour12: false });
            }
            return addTime;
        }
    },
    onLoad(options) {
        if (options.data) {
            try {
                this.detail = JSON.parse(decodeURIComponent(options.data));
                return;
            } catch (e) {}
        }
        if (options.id) {
            this.fetchDetailById(options.id);
        }
    },
    methods: {
        handleBack() {
            uni.navigateBack();
        },
        async fetchDetailById(id) {
            this.loading = true;
            try {
                const res = await getRedeemCardHistory();
                const list = (res.data && res.data.listArr) || [];
                this.detail = list.find((item) => String(item.id) === String(id)) || null;
            } catch (err) {
                uni.showToast({
                    title: (err && err.msg) || err || '获取详情失败',
                    icon: 'none'
                });
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.page-container {
    background-color: #f8f9fa;
    min-height: 100vh;
}

.bg-white { background-color: #ffffff; }
.bg-green-light { background-color: #E8F8F0; }

.p-30 { padding: 30rpx; }
.p-x-20 { padding-left: 20rpx; padding-right: 20rpx; }
.p-x-30 { padding-left: 30rpx; padding-right: 30rpx; }
.p-y-5 { padding-top: 5rpx; padding-bottom: 5rpx; }
.p-y-10 { padding-top: 10rpx; padding-bottom: 10rpx; }
.p-y-40 { padding-top: 40rpx; padding-bottom: 40rpx; }
.p-b-20 { padding-bottom: 20rpx; }

.m-l-20 { margin-left: 20rpx; }
.m-b-10 { margin-bottom: 10rpx; }
.m-b-20 { margin-bottom: 20rpx; }
.m-b-30 { margin-bottom: 30rpx; }
.m-b-40 { margin-bottom: 40rpx; }

.br-12 { border-radius: 12rpx; }
.br-24 { border-radius: 24rpx; }
.br-30 { border-radius: 30rpx; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { align-items: center; justify-content: center; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.flex-1 { flex: 1; }

.lh-2 { line-height: 2; }

.f24 { font-size: 24rpx; }
.f26 { font-size: 26rpx; }
.f28 { font-size: 28rpx; }
.f32 { font-size: 32rpx; }

.fc-333 { color: #333333; }
.fc-666 { color: #666666; }
.fc-999 { color: #999999; }
.fc-green { color: #07C160; }
.fw-bold { font-weight: bold; }

.bottom-border {
    border-bottom: 2rpx solid #F0F0F0;
}

.product-img {
    width: 140rpx;
    height: 140rpx;
    background-color: #f0f0f0;
}

.product-info {
    height: 140rpx;
}

.line2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>
