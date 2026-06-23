<template>
    <view class="page-container">
        <!-- 导航栏 -->
        <l-nav fanhui title="充值算力" @back="handleBack" bg-color="#f8f9fa"></l-nav>

        <view class="content-wrap p-30">
            <!-- 充值金额区块 -->
            <view class="section-card">
                <view class="section-header y m-b-30">
                    <view class="section-title">选择充值金额</view>
                    <view class="section-subtitle">1元={{ computePowerRate }}算力，多充多送</view>
                </view>

                <view class="grid-wrap">
                    <view 
                        class="grid-item y c jc-c" 
                        :class="{ 'is-active': currentAmountIndex === index && !isCustomAmount }"
                        v-for="(item, index) in amountList" 
                        :key="index"
                        @click="selectAmount(index)"
                    >
                        <view class="item-price">{{ item.price }}元</view>
                        <view class="item-power x c-y">
                            <text>{{ item.num }}算力</text>
                            <text class="bonus-text" v-if="item.reward && item.reward > 0">送{{ item.reward }}</text>
                        </view>
                        <!-- 选中图标 -->
                        <view class="check-icon c" v-if="currentAmountIndex === index && !isCustomAmount">
                            <uv-icon name="checkbox-mark" color="#fff" size="14"></uv-icon>
                        </view>
                    </view>
                </view>

                <!-- 自定义金额 -->
                <view class="custom-amount-wrap y">
                    <view class="custom-title">自定义金额</view>
                    <view class="custom-input-box x c-y">
                        <text class="currency-symbol">￥</text>
                        <input 
                            class="custom-input flex-1" 
                            type="number" 
                            placeholder="请输入金额" 
                            placeholder-style="color:#999;font-size:32rpx;"
                            v-model="customAmount"
                            @input="handleCustomInput"
                            @focus="handleCustomFocus"
                        />
                    </view>
                    <view class="custom-tip">最低充值10元，最高5000元</view>
                </view>
            </view>

            <!-- 支付方式区块 -->
            <view class="section-card m-t-30">
                <view class="section-title m-b-40">选择支付方式</view>
                <view class="pay-method-item x c-y jc-sb is-active">
                    <view class="x c-y">
                        <image class="pay-icon" src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop" mode="aspectFill"></image>
                        <text class="pay-name">微信支付</text>
                    </view>
                    <view class="radio-checked c">
                        <view class="radio-inner"></view>
                    </view>
                </view>
            </view>

            <!-- 提示信息 -->
            <view class="info-banner x c-y m-t-30">
                <uv-icon name="info-circle" color="#3A5DFB" size="18" class="m-r-10"></uv-icon>
                <view class="info-text">
                    <view>充值后算力将实时到账，可在算力钱包中查看</view>
                    <view>如有问题，请联系客服：400-123-4567</view>
                </view>
            </view>

            <view class="p-b-safe"></view>
        </view>

        <!-- 底部确认按钮 -->
        <view class="bottom-fixed x c">
            <view class="btn-confirm c" @click="handleConfirm">确认充值 {{ currentPrice }}元</view>
            <view class="p-b-safe"></view>
        </view>
    </view>
</template>

<script>
import { getComputePowerRechargeConfig, getComputePowerConfig, createComputePowerRechargeOrder, getComputePowerRechargePayStatus } from '@/api/public.js';

export default {
    data() {
        return {
            amountList: [],
            currentAmountIndex: 1, // 默认选中第二个（如果有数据的话）
            isCustomAmount: false,
            customAmount: '',
            computePowerRate: 10, // 默认比例
            
            // 支付状态轮询
            paying: false,
            orderNo: '',
            pollingInterval: null,
            pollingCount: 0,
            maxPollingCount: 30,
        };
    },
    onShow() {
        this.fetchConfig();
    },
    onUnload() {
        this.stopPolling();
    },
    computed: {
        currentPrice() {
            if (this.isCustomAmount) {
                return this.customAmount || '0';
            }
            if (this.amountList.length > 0 && this.amountList[this.currentAmountIndex]) {
                return this.amountList[this.currentAmountIndex].price;
            }
            return '0';
        }
    },
    methods: {
        fetchConfig() {
            // 获取充值配置项
            getComputePowerRechargeConfig().then(res => {
                if (res.status === 200 && res.data) {
                    this.amountList = res.data;
                    // 如果拉取到的数据不如之前多，把 index 兜底
                    if (this.currentAmountIndex >= this.amountList.length) {
                        this.currentAmountIndex = 0;
                    }
                }
            }).catch(err => {
                console.error('获取算力充值配置失败:', err);
            });

            // 获取通用算力比例配置
            getComputePowerConfig().then(res => {
                if (res.status === 200 && res.data && res.data.compute_power_rate) {
                    this.computePowerRate = res.data.compute_power_rate;
                }
            }).catch(err => {
                console.error('获取基础算力配置失败:', err);
            });
        },
        handleBack() {
            const pages = getCurrentPages();
            if (pages.length > 1) {
                uni.navigateBack({ delta: 1 });
            } else {
                uni.switchTab({ url: '/pages/index_/index' });
            }
        },
        selectAmount(index) {
            this.currentAmountIndex = index;
            this.isCustomAmount = false;
            this.customAmount = ''; // 清空自定义输入
        },
        handleCustomFocus() {
            this.isCustomAmount = true;
            this.currentAmountIndex = -1; // 取消预设列表的选择
        },
        handleCustomInput(e) {
            // 可以加入数字校验逻辑等
            this.customAmount = e.detail.value;
        },
        handleConfirm() {
            let finalAmount = this.currentPrice;
            if (!finalAmount || Number(finalAmount) <= 0) {
                return uni.showToast({ title: '请输入正确的充值金额', icon: 'none' });
            }
            if (this.isCustomAmount && (Number(finalAmount) < 10 || Number(finalAmount) > 5000)) {
                return uni.showToast({ title: '充值金额必须在10-5000元之间', icon: 'none' });
            }
            
            let submitData = {
                pay_type: 'weixin'
            };
            
            // 判断是否选的预设选项
            if (this.isCustomAmount) {
                submitData.price = finalAmount;
            } else {
                if (this.amountList.length > 0 && this.amountList[this.currentAmountIndex]) {
                    submitData.id = this.amountList[this.currentAmountIndex].id;
                } else {
                    return uni.showToast({ title: '未选中任何套餐', icon: 'none' });
                }
            }

            uni.showLoading({ title: '拉起支付中...' });
            this.paying = true;
            createComputePowerRechargeOrder(submitData).then(res => {
                uni.hideLoading();
                if (res.status === 200 && res.data && res.data.pay_info) {
                    let jsConfig = res.data.pay_info;
                    this.orderNo = res.data.order_no; // 记录订单号用于轮询
                    
                    // #ifdef MP
                    let mp_pay_name = '';
                    if (uni.requestOrderPayment) {
                        mp_pay_name = 'requestOrderPayment';
                    } else {
                        mp_pay_name = 'requestPayment';
                    }
                    uni[mp_pay_name]({
                        timeStamp: jsConfig.timestamp,
                        nonceStr: jsConfig.nonceStr,
                        package: jsConfig.package,
                        signType: jsConfig.signType,
                        paySign: jsConfig.paySign,
                        success: (payRes) => {
                            // 依赖后端接口确认结果，这里前端暂时保持静默或处理简单提示
                        },
                        fail: (err) => {
                            uni.showToast({ title: '取消支付', icon: 'none' });
                            this.paying = false;
                        },
                        complete: () => {
                            // 无论前端抛出成功失败，都开始轮询订单状态，确保状态同步
                            this.startPolling();
                        }
                    });
                    // #endif
                    
                    // #ifndef MP
                    // 若有APP或者H5端可以参考 VIP页添加逻辑，当前基于提供的数据先支撑小程序
                    uni.showToast({ title: '支付环境暂不支持', icon: 'none' });
                    this.paying = false;
                    // #endif

                }else if (res.status == 400097) {
                    uni.showModal({
                        title: '提示',
                        content: '您不是会员，无法使用该功能',
                        showCancel: true,
                        confirmText: '去升级',
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定');
                                uni.navigateTo({ url: '/pages/annex/vip_paid/index' });
                            } else if (res.cancel) {
                                console.log('用户点击取消');
                            }
                        },
                        fail: function (res) {
                            console.log('showModal', res);
                        }
                    });
                    this.paying = false;
                    return;
                } else {
                    uni.showToast({ title: res.msg || '充值失败', icon: 'none' });
                    this.paying = false;
                }
            }).catch(err => {
                uni.hideLoading();
                uni.showToast({ title: err || '网络异常，请重试', icon: 'none' });
                console.error('提交充值订单失败:', err);
                this.paying = false;
            });
        },
        /**
         * 开始轮询订单状态
         */
        startPolling() {
            this.pollingCount = 0;
            this.checkOrderStatus();
            this.pollingInterval = setInterval(() => {
                this.checkOrderStatus();
            }, 2000); // 每2秒查询一次
        },
        /**
         * 检查订单状态
         */
        checkOrderStatus() {
            if (this.pollingCount >= this.maxPollingCount) {
                this.stopPolling();
                uni.showToast({ title: '支付状态查询超时', icon: 'none' });
                this.paying = false;
                return;
            }
            
            this.pollingCount++;
            
            getComputePowerRechargePayStatus(this.orderNo).then(res => {
                if (res.status === 200 && res.data) {
                    if (res.data.pay_status === 1) {
                        // 1表示支付成功
                        this.stopPolling();
                        uni.showToast({ title: '充值成功', icon: 'success' });
                        this.paying = false;
                        setTimeout(() => {
                            uni.navigateBack();
                        }, 1500);
                    }
                } else {
                    console.error('查询订单状态失败:', res);
                }
            }).catch(err => {
                console.error('查询订单状态异常:', err);
            });
        },
        /**
         * 停止轮询
         */
        stopPolling() {
            if (this.pollingInterval) {
                clearInterval(this.pollingInterval);
                this.pollingInterval = null;
            }
        }
    }
}
</script>

<style scoped>
.page-container {
    background-color: #f8f9fa;
    min-height: 100vh;
    padding-bottom: 140rpx; /* 留出底部按钮空间 */
}
.p-30 { padding: 30rpx; }
.m-b-30 { margin-bottom: 30rpx; }
.m-b-40 { margin-bottom: 40rpx; }
.m-t-30 { margin-top: 30rpx; }
.m-r-10 { margin-right: 10rpx; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c-y { align-items: center; }
.c { align-items: center; justify-content: center; display: flex; }
.jc-sb { justify-content: space-between; }
.jc-c { justify-content: center; }
.flex-1 { flex: 1; }
.p-b-safe { height: env(safe-area-inset-bottom); }

/* 通用区块 */
.section-card {
    background: #fff;
    border-radius: 24rpx;
    padding: 40rpx 30rpx;
}
.section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
}
.section-subtitle {
    font-size: 26rpx;
    color: #666;
}

/* 充值金额网格 */
.grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.grid-item {
    width: 31%;
    height: 140rpx;
    border: 2rpx solid #eee;
    border-radius: 16rpx;
    margin-bottom: 24rpx;
    box-sizing: border-box;
    position: relative;
    transition: all 0.2s;
}
.grid-item.is-active {
    border-color: #3A5DFB;
    background: #f5f7ff;
}
.item-price {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 8rpx;
}
.item-power {
    font-size: 24rpx;
    color: #666;
}
.bonus-text {
    color: #ff6b00;
}
.grid-item.is-active .item-price {
    color: #3A5DFB;
}
/* 选中角标 */
.check-icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 40rpx;
    height: 40rpx;
    background: #3A5DFB;
    border-radius: 0 14rpx 0 16rpx;
}

/* 自定义金额 */
.custom-amount-wrap {
    margin-top: 20rpx;
}
.custom-title {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 20rpx;
}
.custom-input-box {
    border: 2rpx solid #eee;
    border-radius: 16rpx;
    padding: 24rpx 30rpx;
}
.currency-symbol {
    font-size: 36rpx;
    color: #333;
    font-weight: bold;
    margin-right: 20rpx;
}
.custom-input {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
}
.custom-tip {
    font-size: 24rpx;
    color: #999;
    margin-top: 20rpx;
}

/* 支付方式 */
.pay-method-item {
    border: 2rpx solid #eee;
    border-radius: 16rpx;
    padding: 30rpx;
    transition: all 0.2s;
}
.pay-method-item.is-active {
    border-color: #3A5DFB;
    background: #f5f7ff;
}
.pay-icon {
    width: 56rpx;
    height: 56rpx;
    border-radius: 8rpx;
    margin-right: 20rpx;
}
.pay-name {
    font-size: 30rpx;
    color: #333;
}
.radio-checked {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    border: 4rpx solid #3A5DFB;
    background: #fff;
}
.radio-inner {
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
    background: #3A5DFB;
}

/* 提示信息 */
.info-banner {
    background: #f5f7ff;
    border-radius: 16rpx;
    padding: 24rpx;
    align-items: flex-start;
}
.info-text {
    font-size: 26rpx;
    color: #3A5DFB;
    line-height: 1.6;
}

/* 底部按钮 */
.bottom-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #f8f9fa;
    padding: 30rpx;
    box-sizing: border-box;
    z-index: 100;
}
.btn-confirm {
    width: 100%;
    height: 90rpx;
    background: #3A5DFB;
    border-radius: 16rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    box-shadow: 0 8rpx 20rpx rgba(58, 93, 251, 0.3);
}
</style>
