<template>
    <view class="page pos-r">
        <l-nav fanhui title="全渠道供应链"></l-nav>
        
        <!-- 加载状态 -->
        <view v-if="loading" class="loading x c p-y-40">
            <text>加载中...</text>
        </view>
        
        <!-- 错误提示 -->
        <view v-else-if="error" class="error x c p-y-40">
            <text>{{ error }}</text>
        </view>
        
        <!-- 分类列表 -->
        <view v-else class="box x hh">
            <view
                v-for="(v, i) in categories"
                :key="v.id"
                class="item"
                :class="{ last: i % 3 === 2 }"
                @click="toUrl(`/pages/w/fenlei?category_id=${v.id}&title=${v.cate_name}`)"
            >
                <view class="box">
                    <view class="icon" v-if="v.pic" :style="{ 'background-image': 'url(' + v.pic + ')', 'background-size': 'cover', 'background-position': 'center' }"></view>
                    <view class="icon" v-else></view>
                </view>
                <view class="name-box x c">
                    <view class="name">{{ v.cate_name }}</view>
                </view>
            </view>
        </view>
        
        <view class="cart x c" @click="toUrl('/pages/order_addcart/order_addcart')">
            <uv-icon name="shopping-cart" color="#666666" size="34"></uv-icon>
            <!-- <view class="tishi x c"></view> -->
        </view>
    </view>
</template>
<script>
import { category } from '@/api/api.js';

export default {
    data() {
        return {
            categories: [],
            loading: false,
            error: '',
        };
    },
    onLoad() {
        this.getCategories();
    },
    methods: {
        /**
         * 获取商品分类列表
         */
        getCategories() {
            this.loading = true;
            this.error = '';
            
            category()
                .then(res => {
                    if (res.status === 200 && res.data) {
                        this.categories = res.data;
                    } else {
                        this.error = '获取分类失败';
                    }
                })
                .catch(err => {
                    console.error('获取分类失败:', err);
                    this.error = '获取分类失败';
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        toUrl(url) {
            if(!url) return
            uni.navigateTo({
                url,
            });
        },
    },
};
</script>
<style scoped lang="less">
.page {
    background-color: #f8f9fa;
    .box {
        padding: 48rpx 28rpx;
        .item {
            width: calc((100% - 44rpx) / 3);
            height: 248rpx;
            padding-bottom: 32rpx;
            position: relative;
            margin-right: 22rpx;
            margin-bottom: 48rpx;
            &.last {
                margin-right: 0;
            }
            .box {
                width: 100%;
                height: 100%;
                border-radius: 20rpx;
                overflow: hidden;
                padding: 8rpx;
                .icon {
                    width: 100%;
                    height: 100%;
                    border-radius: 20rpx;
                    overflow: hidden;
                }
            }
            .name-box {
                position: absolute;
                bottom: 0;
                height: 48rpx;
                width: 100%;
            }
            .name {
                line-height: 48rpx;
                text-align: center;
                padding: 0 26rpx;
                border-radius: 8rpx;
                background-color: #333;
                color: #fff;
                font-size: 28rpx;
            }
        }
    }
    .cart {
        position: fixed;
        right: 20rpx;
        bottom: 200rpx;
        width: 92rpx;
        height: 92rpx;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(51, 51, 51, 0.1);
        border: 2rpx solid #f6f6f6;
        .tishi {
            width: 24rpx;
            height: 24rpx;
            background-color: #f55726;
            border-radius: 50%;
            overflow: hidden;
            color: #fff;
            font-size: 16rpx;
            position: absolute;
            top: 26rpx;
            right: 20rpx;
        }
    }
}
</style>
