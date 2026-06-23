<template>
    <view class="page y pos-r">
        <l-nav fanhui :title="title"></l-nav>
		<goodsCate3 ref="classThree" :categoryId="category_id" :isNew="isNew" @jumpIndex="jumpIndex"></goodsCate3>

        <view
            class="cart x c"
            @click="toUrl('/pages/order_addcart/order_addcart')"
        >
            <uv-icon name="shopping-cart" color="#666666" size="34"></uv-icon>
            <view class="tishi x c">2</view>
        </view>
    </view>
</template>
<script>
import goodsCate3 from './goods_cate3.vue';

export default {
    components: {
        goodsCate3,
    },
    onLoad(options) {
        this.category_id = options.category_id;
        this.title = options.title;
    },
    data() {
        return {
			isNew: false,
            title: "",
            active: "食材供应链",
            list: ["食材供应链", "制作设备", "调料包"],
            category_id : 0,
        };
    },
    jumpIndex() {
			uni.reLaunch({
				url: '/pages/index_/index'
			})
    },
    methods: {
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
.fc-hong {
    color: #f42525;
}
.heng {
    text-decoration: line-through;
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
.page {
    background-color: #f8f9fa;
    .tab {
        width: 180rpx;
        background-color: #fff;
        .item {
            height: 110rpx;
            font-size: 28rpx;
            color: #767676;
            &.active {
                color: #000;
                background-color: #f8f9fa;
            }
        }
    }
    .shop {
        .img {
            width: 172rpx;
            height: 172rpx;
        }
    }
}
</style>
