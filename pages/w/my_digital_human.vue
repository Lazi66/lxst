<template>
    <view class="page-container">
        <l-nav fanhui title="我的数字人" bg-color="#ffffff"></l-nav>

        <view class="content-wrap p-30">
            <view class="list-card">
                <view class="list-header x c-y jc-sb">
                    <text>已生成的数字人</text>
                </view>

                <view class="dh-list y" v-if="!loading && list.length">
                    <view
                        v-for="(item, index) in list"
                        :key="item.id"
                        class="dh-item x jc-sb"
                        :class="{ 'border-none': index === list.length - 1 }"
                        @click="toDetail(item.id)"
                    >
                        <view class="x">
                            <view class="thumb-wrap">
                                <image
                                    v-if="isValidImageUrl(item.image_url)"
                                    :src="item.image_url"
                                    class="thumb-img"
                                    mode="aspectFill"
                                ></image>
                                <view v-else class="thumb-placeholder c">
                                    <text class="placeholder-icon">👤</text>
                                </view>
                            </view>
                            <view class="item-info y jc-c">
                                <view class="item-time">{{ item.create_time }}</view>
                                <view class="item-id" v-if="item.virtualman_id">ID: {{ item.virtualman_id }}</view>
                            </view>
                        </view>
                        <view class="arrow-wrap c">
                            <text class="arrow-text">›</text>
                        </view>
                    </view>
                </view>
                <view v-else-if="loading && !list.length" class="list-loading c">加载中...</view>
                <view v-else-if="!list.length" class="list-empty c">暂无数字人，快去创建吧</view>

                <view v-if="!finished && list.length" class="load-more c" @click="loadMore">
                    {{ loadMoreLoading ? '加载中...' : '加载更多' }}
                </view>
            </view>
            <view class="p-b-safe"></view>
        </view>
    </view>
</template>

<script>
import { digitalHumanMyVirtualmanList } from '@/api/public.js';

export default {
    data() {
        return {
            list: [],
            loading: false,
            loadMoreLoading: false,
            page: 1,
            limit: 20,
            finished: false
        };
    },
    onShow() {
        this.loadList(true);
    },
    methods: {
        isValidImageUrl(url) {
            return url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
        },
        async loadList(reset = false) {
            if (reset) {
                this.page = 1;
                this.list = [];
                this.finished = false;
            }
            if (this.finished) return;
            if (reset) {
                this.loading = true;
            } else {
                this.loadMoreLoading = true;
            }
            try {
                const params = { page: this.page, limit: this.limit };
                const res = await digitalHumanMyVirtualmanList(params);
                const data = res && res.data ? res.data : res;
                const arr = Array.isArray(data && data.list) ? data.list : [];
                const newList = reset ? arr : this.list.concat(arr);
                this.$set(this, 'list', newList);
                if (arr.length < this.limit) {
                    this.finished = true;
                } else {
                    this.page += 1;
                }
            } catch (e) {
                if (reset) this.$set(this, 'list', []);
                this.finished = true;
            } finally {
                this.loading = false;
                this.loadMoreLoading = false;
            }
        },
        loadMore() {
            if (this.loadMoreLoading || this.finished) return;
            this.loadList(false);
        },
        toDetail(id) {
            uni.navigateTo({
                url: '/pages/w/digital_human_task_detail?id=' + id
            });
        }
    }
};
</script>

<style scoped>
.page-container {
    background-color: #f8f9fa;
    min-height: 100vh;
}
.p-30 { padding: 30rpx; }
.p-b-safe { height: env(safe-area-inset-bottom); padding-bottom: 40rpx; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { align-items: center; justify-content: center; display: flex; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.jc-c { justify-content: center; }

.list-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx 30rpx 10rpx 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.02);
}
.list-header {
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
}

.dh-item {
    padding: 30rpx 0;
    border-bottom: 1px solid #f2f2f2;
}
.dh-item.border-none { border-bottom: none; }

.thumb-wrap {
    width: 120rpx;
    height: 120rpx;
    border-radius: 16rpx;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 24rpx;
}
.thumb-img {
    width: 100%;
    height: 100%;
}
.thumb-placeholder {
    width: 100%;
    height: 100%;
    background: #f5f6f8;
}
.placeholder-icon {
    font-size: 36rpx;
}

.item-info {
    min-height: 120rpx;
}
.item-time {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 8rpx;
}
.item-id {
    font-size: 24rpx;
    color: #999;
}

.arrow-wrap {
    margin-left: 20rpx;
}
.arrow-text {
    font-size: 32rpx;
    color: #ccc;
    font-weight: bold;
}

.list-loading,
.list-empty {
    padding: 60rpx 0;
    font-size: 28rpx;
    color: #999;
}
.load-more {
    padding: 24rpx 0;
    font-size: 26rpx;
    color: #3A5DFB;
}
</style>
