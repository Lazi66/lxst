<template>
    <view class="page-container">
        <l-nav fanhui title="兑换记录" bgColor="#f8f9fa" @back="handleBack"></l-nav>

        <!-- <view class="search-wrap bg-white p-x-30 p-y-20">
            <view class="search-box x c-y br-30 bg-gray p-x-30">
                <uv-icon name="search" color="#999999" size="18"></uv-icon>
                <input
                    class="search-input flex-1 m-l-10 f26"
                    placeholder="搜索卡密或权益名称"
                    placeholder-class="placeholder-text"
                    v-model="keyword"
                />
            </view>
        </view>

        <view class="tabs-wrap bg-white p-x-30 p-b-20 x c-y jc-sb">
            <view class="tabs x c-y">
                <view
                    class="tab-item r-30 p-x-30 p-y-10 f26 m-r-20"
                    :class="currentTab === 0 ? 'tab-active' : 'tab-normal'"
                    @click="switchTab(0)"
                >全部</view>
                <view
                    class="tab-item r-30 p-x-30 p-y-10 f26"
                    :class="currentTab === 1 ? 'tab-active' : 'tab-normal'"
                    @click="switchTab(1)"
                >已使用</view>
            </view>
            <view class="filter-box x c-y">
                <text class="f24 fc-666">共 {{ filteredList.length }} 条</text>
            </view>
        </view> -->

        <scroll-view scroll-y class="list-wrap p-30" refresher-enabled :refresher-triggered="refreshing" @refresherrefresh="fetchRecordList">
            <view class="loading-wrap y c p-y-40" v-if="loading">
                <text class="f24 fc-999">加载中...</text>
            </view>

            <view class="record-item bg-white br-20 p-30 m-b-20" v-for="item in filteredList" :key="item.id" @click="toDetail(item)">
                <view class="item-main x m-b-20 bottom-border p-b-20">
                    <image :src="item.target_cover_image || defaultCover" class="product-img br-12" mode="aspectFill"></image>
                    <view class="product-info flex-1 y jc-sb m-l-20">
                        <view>
                            <view class="f28 fw-bold fc-333 line2">{{ item.target_name || item.target_title || '-' }}</view>
                            <view class="f24 fc-999 m-t-10">{{ item.card_type_text || '-' }}</view>
                        </view>
                    </view>
                </view>
                <view class="item-footer x jc-sb c-y">
                    <view class="x c-y">
                        <text class="f26 fc-666">卡密：</text>
                        <text class="f26 fw-bold fc-333 m-r-10">{{ item.card_number }}</text>
                    </view>
                    <view class="y align-right">
                        <text class="f24 fw-bold fc-green m-b-5">{{ item.status_text || '已使用' }}</text>
                        <text class="f22 fc-999">{{ item.use_time || '-' }}</text>
                    </view>
                </view>
            </view>

            <view class="empty-wrap y c p-y-40" v-if="!loading && filteredList.length === 0">
                <text class="f24 fc-999">暂无兑换记录</text>
            </view>
        </scroll-view>
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
            keyword: '',
            currentTab: 0,
            loading: false,
            refreshing: false,
            recordList: []
        };
    },
    computed: {
        filteredList() {
            const keyword = (this.keyword || '').trim().toLowerCase();
            return this.recordList.filter((item) => {
                const matchStatus = this.currentTab === 0 ? true : Number(item.status) === 1;
                if (!matchStatus) return false;
                if (!keyword) return true;
                return [
                    item.card_number,
                    item.target_name,
                    item.target_title,
                    item.card_type_text
                ].some((field) => String(field || '').toLowerCase().includes(keyword));
            });
        }
    },
    onLoad() {
        this.fetchRecordList();
    },
    onShow() {
        this.fetchRecordList();
    },
    methods: {
        handleBack() {
            uni.navigateBack();
        },
        switchTab(index) {
            this.currentTab = index;
        },
        async fetchRecordList() {
            if (this.loading) return;
            this.loading = true;
            this.refreshing = true;
            try {
                const res = await getRedeemCardHistory();
                this.recordList = (res.data && res.data.listArr) || [];
            } catch (err) {
                uni.showToast({
                    title: (err && err.msg) || err || '获取记录失败',
                    icon: 'none'
                });
            } finally {
                this.loading = false;
                this.refreshing = false;
            }
        },
        toDetail(item) {
            const serialized = encodeURIComponent(JSON.stringify(item));
            uni.navigateTo({
                url: `/pages/w/kami_hexiao_detail?id=${item.id || ''}&data=${serialized}`
            });
        }
    }
};
</script>

<style scoped>
.page-container {
    background-color: #f8f9fa;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.bg-white { background-color: #ffffff; }
.bg-gray { background-color: #F5F5F5; }

.p-30 { padding: 30rpx; }
.p-x-30 { padding-left: 30rpx; padding-right: 30rpx; }
.p-y-20 { padding-top: 20rpx; padding-bottom: 20rpx; }
.p-y-40 { padding-top: 40rpx; padding-bottom: 40rpx; }
.p-y-10 { padding-top: 10rpx; padding-bottom: 10rpx; }
.p-b-20 { padding-bottom: 20rpx; }

.m-l-10 { margin-left: 10rpx; }
.m-l-20 { margin-left: 20rpx; }
.m-r-10 { margin-right: 10rpx; }
.m-r-20 { margin-right: 20rpx; }
.m-t-10 { margin-top: 10rpx; }
.m-b-5 { margin-bottom: 5rpx; }
.m-b-20 { margin-bottom: 20rpx; }

.br-12 { border-radius: 12rpx; }
.br-20 { border-radius: 20rpx; }
.br-30 { border-radius: 30rpx; }
.r-30 { border-radius: 30rpx; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { align-items: center; justify-content: center; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.align-right { align-items: flex-end; }
.flex-1 { flex: 1; }

.f22 { font-size: 22rpx; }
.f24 { font-size: 24rpx; }
.f26 { font-size: 26rpx; }
.f28 { font-size: 28rpx; }

.fc-333 { color: #333333; }
.fc-666 { color: #666666; }
.fc-999 { color: #999999; }
.fc-green { color: #07C160; }
.fw-bold { font-weight: bold; }

.search-box {
    height: 64rpx;
}
.search-input {
    height: 100%;
}
.placeholder-text {
    color: #999999;
}

.tab-active {
    background-color: #1677FF;
    color: #ffffff;
    font-weight: bold;
}
.tab-normal {
    background-color: transparent;
    color: #666666;
}

.list-wrap {
    box-sizing: border-box;
    flex: 1;
    min-height: 0;
}

.product-img {
    width: 140rpx;
    height: 140rpx;
    background-color: #f0f0f0;
}

.product-info {
    height: 140rpx;
}

.bottom-border {
    border-bottom: 2rpx solid #F0F0F0;
}

.line2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>
