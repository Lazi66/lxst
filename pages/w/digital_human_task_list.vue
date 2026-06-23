<template>
    <view class="page-container">
        <l-nav fanhui title="我的任务" bg-color="#ffffff"></l-nav>

        <view class="content-wrap p-30">
            <!-- 任务列表 -->
            <view class="list-card">
                <view class="list-header x c-y jc-sb">
                    <text>任务列表</text>
                </view>

                <view class="task-list y" v-if="taskList.length">
                    <view
                        v-for="(item, index) in taskList"
                        :key="item.id"
                        class="task-item x jc-sb"
                        :class="{ 'border-none': index === taskList.length - 1 }"
                        @click="toDetail(item.id)"
                    >
                        <view class="x">
                            <view class="item-info y jc-c">
                                <view class="item-type">{{ typeLabel(item.type) }}</view>
                                <view class="item-time">{{ item.create_time }}</view>
                                <view class="item-status">{{ statusText(item.status) }}</view>
                            </view>
                        </view>
                        <view class="arrow-wrap c">
                            <text class="arrow-text">›</text>
                        </view>
                    </view>
                </view>
                <view v-else-if="loading && !taskList.length" class="list-loading c">加载中...</view>
                <view v-if="!taskList.length" class="list-empty c">暂无任务</view>

                <view v-if="!finished && taskList.length" class="load-more c" @click="loadMore">
                    {{ loadMoreLoading ? '加载中...' : '加载更多' }}
                </view>
            </view>
            <view class="p-b-safe"></view>
        </view>
    </view>
</template>

<script>
import { digitalHumanTaskList } from '@/api/public.js';

export default {
    data() {
        return {
            taskList: [],
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
        typeLabel(type) {
            const map = { image: '图生数字人', fast: '极速数字人' ,broadcast: '数字人口播',broadcast_edit : '数字人口播视频',voice: '声音克隆'};
            return map[type] || '数字人';
        },
        statusText(status) {
            const map = {
                pending: '待处理',
                processing: '生成中',
                completed: '已完成',
                succeed: '已完成',
                failed: '失败'
            };
            return map[status] || status || '未知';
        },
        statusClass(status) {
            if (status === 'completed' || status === 'succeed') return 'status-done';
            if (status === 'failed') return 'status-fail';
            return 'status-ing';
        },
        async loadList(reset = false) {
            if (reset) {
                this.page = 1;
                this.taskList = [];
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
                const res = await digitalHumanTaskList(params);
                const data = res && res.data ? res.data : res;
                const list = Array.isArray(data && data.list) ? data.list : [];
                const newList = reset ? list : this.taskList.concat(list);
                this.$set(this, 'taskList', newList);
                if (list.length < this.limit) {
                    this.finished = true;
                } else {
                    this.page += 1;
                }
            } catch (e) {
                if (reset) this.$set(this, 'taskList', []);
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
.m-b-30 { margin-bottom: 30rpx; }
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

.task-item {
    padding: 30rpx 0;
    border-bottom: 1px solid #f2f2f2;
}
.task-item.border-none { border-bottom: none; }

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
.arrow-text {
    font-size: 32rpx;
    color: #ccc;
    font-weight: bold;
}

.item-info {
    min-height: 120rpx;
}
.item-type {
    font-size: 30rpx;
    color: #333;
    margin-bottom: 8rpx;
}
.item-time {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 8rpx;
}
.item-status {
    font-size: 24rpx;
}
.status-done { color: #18D08D; }
.status-fail { color: #ff4d4f; }
.status-ing { color: #3A5DFB; }

.arrow-wrap {
    margin-left: 20rpx;
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
