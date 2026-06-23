<template>
    <view class="page-container">
        <!-- 导航栏 -->
        <l-nav fanhui title="行业模板"></l-nav>

        <view class="content-wrap p-30">
            <!-- 搜索框 -->
            <view class="search-box x c-y">
                <uv-icon name="search" size="20" color="#999"></uv-icon>
                <input class="search-input flex-1 m-l-10" placeholder="搜索行业或模板名称" placeholder-style="color:#999;font-size:26rpx;" v-model="keyword" @confirm="onSearch" />
            </view>

            <!-- 分类 Tab -->
            <scroll-view scroll-x="true" class="tab-scroll" :show-scrollbar="false">
                <view class="tab-wrap x">
                    <view class="tab-item" :class="{ active: currentTab === index }" v-for="(item, index) in tabList" :key="index" @click="switchTab(index)">{{ item.name }}</view>
                </view>
            </scroll-view>

            <!-- 筛选栏 -->
            <view class="filter-bar x c-y">
                <view class="filter-item x c-y" :class="{ active: sortBy === 'time' }" @click="toggleSort('time')">
                    <text class="filter-text">时间</text>
                    <view class="sort-arrows y">
                        <uv-icon name="arrow-up-fill" :size="8" :color="sortBy === 'time' && sortOrder === 'asc' ? '#1677FF' : '#ccc'"></uv-icon>
                        <uv-icon name="arrow-down-fill" :size="8" :color="sortBy === 'time' && sortOrder === 'desc' ? '#1677FF' : '#ccc'"></uv-icon>
                    </view>
                </view>
                <view class="filter-item x c-y" :class="{ active: sortBy === 'views' }" @click="toggleSort('views')">
                    <text class="filter-text">浏览</text>
                    <view class="sort-arrows y">
                        <uv-icon name="arrow-up-fill" :size="8" :color="sortBy === 'views' && sortOrder === 'asc' ? '#1677FF' : '#ccc'"></uv-icon>
                        <uv-icon name="arrow-down-fill" :size="8" :color="sortBy === 'views' && sortOrder === 'desc' ? '#1677FF' : '#ccc'"></uv-icon>
                    </view>
                </view>
                <view class="filter-item x c-y" :class="{ active: sortBy === 'score' }" @click="toggleSort('score')">
                    <text class="filter-text">评分</text>
                    <view class="sort-arrows y">
                        <uv-icon name="arrow-up-fill" :size="8" :color="sortBy === 'score' && sortOrder === 'asc' ? '#1677FF' : '#ccc'"></uv-icon>
                        <uv-icon name="arrow-down-fill" :size="8" :color="sortBy === 'score' && sortOrder === 'desc' ? '#1677FF' : '#ccc'"></uv-icon>
                    </view>
                </view>
            </view>

            <!-- 瀑布流列表 -->
            <view class="waterfall-container" v-if="templateList.length > 0">
                <view class="waterfall-item" v-for="(item, index) in templateList" :key="item.id || index" :data-id="item.id" @click="toDetail">
                    <view class="img-box p-10">
                        <image class="item-img br-12" :src="item.cover" mode="widthFix" v-if="item.cover"></image>
                        <view class="item-placeholder c br-12" v-else>
                            <uv-icon name="photo" size="40" color="#ccc"></uv-icon>
                        </view>
                    </view>
                    <view class="item-info">
                        <view class="item-title">{{ item.name || item.title }}</view>
                        <view class="item-meta x c-y jc-sb" v-if="item.view_count !== undefined || item.score !== undefined">
                            <text class="meta-text" v-if="item.view_count !== undefined">{{ item.view_count }}次浏览</text>
                            <text class="meta-text" v-if="item.score !== undefined">{{ item.score }}分</text>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 空状态 -->
            <view class="empty-box y c" v-if="!loading && templateList.length === 0">
                <uv-icon name="list" size="60" color="#ddd"></uv-icon>
                <text class="empty-text">暂无模板数据</text>
            </view>

            <!-- 加载状态 -->
            <view class="loading-box c" v-if="loading">
                <text class="loading-text">加载中...</text>
            </view>
        </view>
        <view class="p-b-safe"></view>
    </view>
</template>

<script>
import { getIndustryTemplateCategoryList, getIndustryTemplateList } from '@/api/digitalHuman.js';

export default {
    data() {
        return {
            currentTab: 0,
            tabList: [{ id: '', name: '全部' }],
            templateList: [],
            keyword: '',
            sortBy: '',
            sortOrder: 'desc',
            loading: false
        };
    },
    onLoad() {
        this.loadCategories();
        this.loadTemplates();
    },
    methods: {
        async loadCategories() {
            try {
                const res = await getIndustryTemplateCategoryList();
                if (res.data && res.data.list) {
                    this.tabList = [{ id: '', name: '全部' }, ...res.data.list];
                }
            } catch (e) {
                console.error('加载分类失败', e);
            }
        },
        async loadTemplates() {
            this.loading = true;
            try {
                const params = {};
                const currentCategory = this.tabList[this.currentTab];
                if (currentCategory && currentCategory.id) {
                    params.category_id = currentCategory.id;
                }
                if (this.keyword) {
                    params.keyword = this.keyword;
                }
                if (this.sortBy) {
                    params.sort_by = this.sortBy;
                    params.sort_order = this.sortOrder;
                }
                const res = await getIndustryTemplateList(params);
                if (res.data && res.data.list) {
                    this.templateList = res.data.list;
                } else {
                    this.templateList = [];
                }
            } catch (e) {
                console.error('加载模板列表失败', e);
                this.templateList = [];
            }
            this.loading = false;
        },
        switchTab(index) {
            this.currentTab = index;
            this.loadTemplates();
        },
        onSearch() {
            this.loadTemplates();
        },
        toggleSort(field) {
            if (this.sortBy === field) {
                // 切换排序方向，或者取消排序
                if (this.sortOrder === 'desc') {
                    this.sortOrder = 'asc';
                } else {
                    // 再点一次取消排序
                    this.sortBy = '';
                    this.sortOrder = 'desc';
                }
            } else {
                this.sortBy = field;
                this.sortOrder = 'desc';
            }
            this.loadTemplates();
        },
        toDetail(e) {
            const id = e.currentTarget && e.currentTarget.dataset ? e.currentTarget.dataset.id : null;
            if (id) {
                uni.navigateTo({ url: `/pages/w/digital_human_video?template_id=${id}` });
            } else {
                console.warn('未获取到模板ID', e);
            }
        }
    }
}
</script>

<style scoped>
.page-container {
    background-color: #f5f6f8;
    min-height: 100vh;
}
.p-30 {
    padding: 30rpx;
}
.p-b-safe {
    height: env(safe-area-inset-bottom);
    padding-bottom: 40rpx;
}

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { display: flex; align-items: center; justify-content: center; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.flex-1 { flex: 1; }
.m-l-10 { margin-left: 10rpx; }

/* 搜索框 */
.search-box {
    background: #fff;
    border-radius: 100rpx;
    padding: 16rpx 30rpx;
    margin-bottom: 30rpx;
}
.search-input {
    font-size: 26rpx;
    color: #333;
    border: none;
    outline: none;
    background: transparent;
}

/* 分类 Tab */
.tab-scroll {
    width: 100%;
    white-space: nowrap;
    margin-bottom: 20rpx;
}
.tab-wrap {
    display: inline-block;
}
.tab-item {
    display: inline-block;
    padding: 12rpx 36rpx;
    margin-right: 20rpx;
    font-size: 26rpx;
    color: #666;
    background: #fff;
    border-radius: 100rpx;
    transition: all 0.2s;
}
.tab-item.active {
    color: #fff;
    background: #1677FF;
    font-weight: bold;
}

/* 筛选栏 */
.filter-bar {
    margin-bottom: 20rpx;
    gap: 30rpx;
}
.filter-item {
    padding: 8rpx 0;
    gap: 6rpx;
    position: relative;
}
.filter-text {
    font-size: 26rpx;
    color: #999;
}
.filter-item.active .filter-text {
    color: #1677FF;
    font-weight: bold;
}
.sort-arrows {
    gap: 0;
    margin-top: -2rpx;
}

/* 瀑布流布局 */
.waterfall-container {
    column-count: 2;
    column-gap: 20rpx;
    width: 100%;
}
.waterfall-item {
    background: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    margin-bottom: 20rpx;
    break-inside: avoid;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
}
.img-box {
    width: 100%;
    box-sizing: border-box;
}
.p-10 {
    padding: 10rpx;
}
.br-12 {
    border-radius: 12rpx;
}
.item-img {
    width: 100%;
    display: block;
}
.item-placeholder {
    width: 100%;
    height: 300rpx;
    background: #f5f5f5;
}
.item-info {
    padding: 0 20rpx 20rpx;
}

.item-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    line-height: 1.4;
}
.item-meta {
    margin-top: 12rpx;
}
.meta-text {
    font-size: 22rpx;
    color: #999;
}

/* 空状态 & 加载 */
.empty-box {
    padding: 120rpx 0;
    gap: 20rpx;
}
.empty-text {
    font-size: 26rpx;
    color: #999;
}
.loading-box {
    padding: 60rpx 0;
}
.loading-text {
    font-size: 26rpx;
    color: #888;
}
</style>
