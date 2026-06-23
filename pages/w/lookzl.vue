<template>
    <view class="page">
        <l-nav fanhui title="创业资料"></l-nav>
        
        <!-- 分类导航 - 始终显示 -->
        <scroll-view scroll-x="true" class="tab-scroll bg-k" :show-scrollbar="false">
            <view class="tab-bar x c-y">
                <view class="tab-item" :class="{ active: activeCategory === 0 }"
                    @click="switchCategory(0)">
                    <text class="tab-text">全部</text>
                    <view class="tab-line" v-if="activeCategory === 0"></view>
                </view>
                <view class="tab-item" v-for="category in categories" :key="category.id"
                    :class="{ active: activeCategory === category.id }" @click="switchCategory(category.id)">
                    <text class="tab-text">{{ category.title }}</text>
                    <view class="tab-line" v-if="activeCategory === category.id"></view>
                </view>
            </view>
        </scroll-view>

        <!-- 加载状态 -->
        <view v-if="loading" class="loading x c p-y-40">
            <text>加载中...</text>
        </view>
        
        <!-- 错误提示 -->
        <view v-else-if="error" class="error x c p-y-40">
            <text>{{ error }}</text>
        </view>
        
        <view v-else>
            
            <!-- 资料列表 -->
            <view class="p-x-20 p-t-30">
                <view
                    class="p-x-20 p-y-30 x bg-k m-b-20 pos-r"
                    v-for="material in materials"
                    :key="material.id"
                    @click="toUrl('/pages/w/zlshow?id=' + material.id)"
                >
                    <view class="y jc-sb flex-1 p-y-10">
                        <view class="x c-y p-b-20">
                            <view class="f32 fw-600">{{ material.title }}</view>
                            <image v-if="material.is_free === 0 && material.vip_free === 1" :src="`${imgHost}/static/images/w/vip_tip.png`" style="width: 88rpx; height: 34rpx; margin-left: 10rpx; flex-shrink: 0;"></image>
                        </view>
                        <view class="bhh o-h f24 fc76"
                            >{{ material.description }}</view
                        >
                        <view class="x m-t-20"
                            ><view class="x c f24 p-x-15 p-y-10 br-8 fc-lv bg-lv"
                                >下载</view
                            ><view class="flex-1"></view
                        ></view>
                    </view>
                    <view
                        v-if="material.is_free === 0"
                        class="fw-700 f40 fc-fd pos-a lh-56 r-20 b-20"
                        ><span class="m-r-5 f24">￥</span><span>{{ material.price }}</span></view
                    >
<!--                   <view
                        v-if="material.is_free === 1"
                        class="x c f24 fw-700 p-x-15 p-y-10 br-8 fc-lv bg-lv pos-a t-20 r-20"
                        >免费</view
                    > -->
                </view>
                
                <!-- 空状态 -->
                <view v-if="materials.length === 0" class="empty x c p-y-40">
                    <text>暂无资料</text>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import { getStartupCategoryList, getMaterialList } from '@/api/api.js';
import { HTTP_REQUEST_URL } from '@/config/app';

export default {
    data() {
        return {
            imgHost: HTTP_REQUEST_URL,
            categories: [],
            materials: [],
            activeCategory: 0,
            loading: false,
            error: '',
        };
    },
    onLoad() {
        this.getCategories();
        this.getMaterials();
    },
    methods: {
        /**
         * 获取资料分类
         */
        getCategories() {
            getStartupCategoryList(1) // 1表示资料类型
                .then(res => {
                    if (res.status === 200 && res.data && res.data) {
                        this.categories = res.data;
                    }
                })
                .catch(err => {
                    console.error('获取资料分类失败:', err);
                });
        },
        
        /**
         * 获取资料列表
         */
        getMaterials() {
            this.loading = true;
            this.error = '';
            
            const params = {
                category_id: this.activeCategory === 0 ? '' : this.activeCategory,
            };
            
            getMaterialList(params)
                .then(res => {
                    if (res.status === 200 && res.data && res.data.list) {
                        this.materials = res.data.list;
                    } else {
                        this.error = '获取资料列表失败';
                    }
                })
                .catch(err => {
                    console.error('获取资料列表失败:', err);
                    this.error = '获取资料列表失败';
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        
        /**
         * 切换分类
         */
        switchCategory(categoryId) {
            this.activeCategory = categoryId;
            this.getMaterials();
        },
        
        /**
         * 跳转到指定URL
         */
        toUrl(url) {
            if (!url) return;
            uni.navigateTo({
                url,
            });
        },
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
