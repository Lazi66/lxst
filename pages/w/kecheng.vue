<template>
    <view class="page">
        <l-nav fanhui title="创业课程"></l-nav>
        <scroll-view scroll-x="true" class="tab-scroll bg-k" :show-scrollbar="false">
            <view class="tab-bar x c-y">
                <view class="tab-item" :class="{ active: activeCategory === '' }"
                    @click="selectCategory('')">
                    <text class="tab-text">全部</text>
                    <view class="tab-line" v-if="activeCategory === ''"></view>
                </view>
                <view class="tab-item" v-for="category in categories" :key="category.id"
                    :class="{ active: activeCategory === category.id }" @click="selectCategory(category.id)">
                    <text class="tab-text">{{ category.title }}</text>
                    <view class="tab-line" v-if="activeCategory === category.id"></view>
                </view>
            </view>
        </scroll-view>
        <scroll-view class="p-x-20 p-t-30" style="height: calc(100vh - 200rpx); box-sizing: border-box;" scroll-y="true"
            enable-back-to-top="true" @scrolltolower="loadMore">
            <view class="p-x-20 p-y-30 x bg-k m-b-20 pos-r" v-for="course in courses" :key="course.id"
                @click="toUrl('/pages/w/kclist?id=' + course.id)">
                <view class="ke-img br-16 m-r-30 bg-2" style="position: relative;">
                    <image class="br-16" :src="course.cover_image" mode="aspectFill" style="width: 100%; height: 100%;">
                    </image>
                    <image v-if="course.is_free === 0 && course.vip_free === 1" :src="`${imgHost}/static/images/w/vip_tip.png`" style="width: 88rpx; height: 34rpx; position: absolute; top: -2rpx; left: 0; z-index: 10;"></image>
                </view>
                <view class="y jc-sb flex-1 p-y-10">
                    <view class="f32 fw-500">{{ course.title }}</view>
                    <view class="bhh o-h f24 fc76">{{ course.description }}</view>
                    <view class="x">
                        <view class="x c f24 p-x-15 p-y-10 br-8 fc-lv bg-lv">共{{ course.chapter_count }}课时</view>
                        <view class="flex-1"></view>
                    </view>
                </view>
                <view v-if="course.is_free === 0" class="fw-700 f40 fc-fd pos-a lh-56 r-20 b-20"><span
                        class="m-r-5 f24">￥</span><span>{{ course.price }}</span></view>
<!--                <view v-if="course.is_free === 1" class="x c f24 fw-700 p-x-15 p-y-10 br-8 fc-lv bg-lv pos-a t-20 r-20">
                    免费</view> -->
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
import { getArticleCategoryList, getCourseList, getStartupCategoryList } from '@/api/api.js';
import { HTTP_REQUEST_URL } from '@/config/app';

export default {
    data() {
        return {
            imgHost: HTTP_REQUEST_URL,
            categories: [],
            courses: [],
            activeCategory: '',
            loading: false,
            page: 1,
            limit: 10,
            hasMore: true
        };
    },
    onLoad() {
        this.getCategories();
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
         * 获取课程分类
         */
        getCategories() {
            getStartupCategoryList(0)
                .then(res => {
                    if (res.status === 200 && res.data) {
                        this.categories = res.data;
                    }
                })
                .catch(err => {
                    console.error('获取分类失败:', err);
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

            getCourseList(params)
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
         * 选择分类
         */
        selectCategory(categoryId) {
            this.activeCategory = categoryId;
            this.page = 1;
            this.hasMore = true;
            this.courses = [];
            this.getCourses();
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
/* Tab 栏 */
.tab-scroll {
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
}

.tab-bar {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx 0;
    flex-wrap: nowrap;
}

.tab-item {
    position: relative;
    flex-shrink: 0;
    margin-right: 60rpx;
    padding-bottom: 24rpx;
}

.tab-text {
    font-size: 32rpx;
    color: #767676;
    line-height: 1.4;
}

.tab-item.active .tab-text {
    font-weight: 700;
    color: #1a1a1a;
}

.tab-line {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 6rpx;
    background-color: #1677FF;
    border-radius: 3rpx;
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
