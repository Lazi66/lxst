<template>
    <view class="page">
        <l-nav fanhui title="我的资料"></l-nav>
        
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
                    <view class="ke-img br-16 o-h m-r-30 bg-2" v-if="material.cover_image">
                        <image :src="material.cover_image" mode="aspectFill" style="width: 100%; height: 100%;"></image>
                    </view>
                    <view class="ke-img br-16 o-h m-r-30 bg-2" v-else></view>
                    <view class="y jc-sb flex-1 p-y-10">
                        <view class="f32 fw-500">{{ material.title }}</view>
                        <view class="bhh o-h f24 fc76"
                            >{{ material.description }}</view
                        >
                    </view>
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
import { getMyMaterials } from '@/api/api.js';

export default {
    data() {
        return {
            materials: [],
            loading: false,
            error: '',
        };
    },
    onLoad() {
        this.getMaterials();
    },
    methods: {
        /**
         * 获取资料列表
         */
        getMaterials() {
            this.loading = true;
            this.error = '';
            
            const params = {
                category_id: this.activeCategory === 0 ? '' : this.activeCategory,
            };
            
            getMyMaterials(params)
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
.overflow-x-auto {
    overflow-x: auto;
    white-space: nowrap;
}

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
