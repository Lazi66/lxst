<template>
    <view class="page y pos-r">
        <l-nav fanhui :title="title"></l-nav>
        <view class="flex-1 x">
            <view class="y tab">
                <view
                    class="item x c"
                    v-for="v in list"
                    :key="v"
                    :class="{ active: active === v }"
                    @click="active = v"
                    >{{ v }}</view
                >
            </view>
            <view class="y flex-1 p-a-30">
                <view
                    class="m-b-30 bg-k br-8 p-a-20 shop x"
                    v-for="v in 4"
                    :key="v"
                >
                    <view class="img m-r-20 bg-2 o-h br-8"></view>
                    <view class="flex-1 y jc-sb">
                        <view class="dhh m-t-10 f28 fc3"
                            >链开衫卫衣男设计感小众oversize大码...</view
                        >
                        <view class="m-b-10 x c-y fc76 f24">
                            <span class="fc-hong">￥</span>
                            <span class="f32 fc-hong m-r-10">99</span>
                            <span class="heng">￥189</span>
                            <view class="flex-1"></view>
                            <view>已售209件</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
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
export default {
    data() {
        return {
            title: "",
            active: "食材供应链",
            list: ["食材供应链", "制作设备", "调料包"],
        };
    },
    onLoad(options) {
        this.title = options.title;
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
