<template>
    <view class="page">
        <l-nav fanhui title="我的课程"></l-nav>
        <scroll-view class="p-x-20 p-t-30" style="height: calc(100vh - 200rpx); box-sizing: border-box;" scroll-y="true"
            enable-back-to-top="true" @scrolltolower="loadMore">
            <view class="p-x-20 p-y-30 x bg-k m-b-20 pos-r" v-for="course in courses" :key="course.id"
                @click="toUrl('/pages/w/kclist?id=' + course.id)">
                <view class="ke-img br-16 o-h m-r-30 bg-2">
                    <image class="br-16" :src="course.cover_image" mode="aspectFill" style="width: 100%; height: 100%;">
                    </image>
                </view>
                <view class="y jc-sb flex-1 p-y-10">
                    <view class="f32 fw-500">{{ course.title }}</view>
                    <view class="bhh o-h f24 fc76">{{ course.description }}</view>
                    <view class="x">
                        <!-- <view class="x c f24 p-x-15 p-y-10 br-8 fc-lv bg-lv">共{{ course.chapter_count }}课时</view> -->
                        <view class="flex-1"></view>
                    </view>
                </view>
            </view>
            <view v-if="loading" class="loading x c p-y-40">
                <text>加载中...</text>
            </view>
            <view v-if="!loading && courses.length === 0" class="empty x c p-y-40">
                <text>暂无课程</text>
            </view>
            <view v-if="!loading && !hasMore && courses.length > 0" class="empty x c p-y-40">
                <text>没有更多课程了</text>
            </view>
        </scroll-view>
    </view>
</template>
<script>
import { getMyCourses } from '@/api/api.js';

export default {
    data() {
        return {
            courses: [],
            loading: false,
            page: 1,
            limit: 10,
            hasMore: true
        };
    },
    onLoad() {
        this.getCourses();
    },
    methods: {
        toUrl(url) {
            if (!url) return;
            uni.navigateTo({
                url,
            });
        },


        /**
         * 获取课程列表
         */
        getCourses() {
            if (this.loading || !this.hasMore) return;

            this.loading = true;

            const params = {
                category_id: this.activeCategory,
                page: this.page,
                limit: this.limit
            };

            getMyCourses(params)
                .then(res => {
                    if (res.status === 200 && res.data && res.data.list) {
                        if (this.page === 1) {
                            this.courses = res.data.list;
                        } else {
                            this.courses = [...this.courses, ...res.data.list];
                        }

                        if (res.data.list.length < this.limit) {
                            this.hasMore = false;
                        } else {
                            this.page++;
                        }
                    } else {
                        this.hasMore = false;
                    }
                })
                .catch(err => {
                    console.error('获取课程列表失败:', err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },



        /**
         * 加载更多课程
         */
        loadMore() {
            if (this.hasMore && !this.loading) {
                this.getCourses();
            }
        }
    },
};
</script>
<style scoped lang="less">
.p-x-48 {
    padding-left: 48rpx;
    padding-right: 48rpx;
}

.m-r-80 {
    margin-right: 80rpx;
}

.ke-img {
    width: 174rpx;
    height: 174rpx;
}

.fc-lv {
    color: #67c23a;
}

.bg-lv {
    background-color: rgba(103, 194, 58, 0.1);
}

.r-20 {
    right: 20rpx;
}

.t-20 {
    top: 20rpx;
}

.b-20 {
    bottom: 20rpx;
}

.lh-56 {
    line-height: 56rpx;
}

.fc-fd {
    color: #fd4d4d;
}
</style>
