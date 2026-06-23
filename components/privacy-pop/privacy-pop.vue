<template>
    <view class="privacy-mask" v-if="show">
        <view class="privacy-box y">
            <view class="privacy-title">隐私授权</view>
            <view class="privacy-desc">
                在使用录音功能之前，请阅读并同意
                <text class="privacy-link" @tap="openPrivacyContract">{{ privacyContractName }}</text>
                以继续使用。
            </view>
            <view class="privacy-btns x">
                <button class="p-btn p-reject" @tap="handleReject">拒绝</button>
                <button
                    id="agree-btn"
                    class="p-btn p-agree"
                    open-type="agreePrivacyAuthorization"
                    @agreeprivacyauthorization="handleAgree"
                >同意</button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'PrivacyPop',
    data() {
        return {
            show: false,
            privacyContractName: '《隐私保护指引》',
            _resolve: null
        };
    },
    methods: {
        /**
         * 检查是否需要弹出隐私协议
         * 返回 Promise<boolean>: true 表示已授权可继续，false 表示未授权
         */
        check() {
            return new Promise((resolve) => {
                // #ifdef MP-WEIXIN
                if (!wx.getPrivacySetting) {
                    resolve(true);
                    return;
                }
                wx.getPrivacySetting({
                    success: (res) => {
                        if (res.needAuthorization) {
                            this.privacyContractName = res.privacyContractName || '《隐私保护指引》';
                            this._resolve = resolve;
                            this.show = true;
                        } else {
                            resolve(true);
                        }
                    },
                    fail: () => {
                        resolve(true);
                    }
                });
                // #endif
                // #ifndef MP-WEIXIN
                resolve(true);
                // #endif
            });
        },
        openPrivacyContract() {
            uni.openPrivacyContract({
                fail: () => {
                    uni.showToast({ title: '打开失败', icon: 'none' });
                }
            });
        },
        handleAgree() {
            wx.requirePrivacyAuthorize({
                success: () => {
                    this.show = false;
                    if (this._resolve) {
                        this._resolve(true);
                        this._resolve = null;
                    }
                },
                fail: () => {
                    this.show = false;
                    if (this._resolve) {
                        this._resolve(false);
                        this._resolve = null;
                    }
                }
            });
        },
        handleReject() {
            this.show = false;
            if (this._resolve) {
                this._resolve(false);
                this._resolve = null;
            }
            uni.showToast({ title: '已拒绝，无法使用录音功能', icon: 'none' });
        }
    }
};
</script>

<style scoped>
.privacy-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
}
.privacy-box {
    width: 600rpx;
    padding: 48rpx;
    background: #fff;
    border-radius: 20rpx;
    box-sizing: border-box;
}
.privacy-title {
    text-align: center;
    font-size: 34rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
}
.privacy-desc {
    font-size: 26rpx;
    color: #666;
    line-height: 1.7;
    text-align: justify;
}
.privacy-link {
    color: #1677ff;
    text-decoration: underline;
}
.privacy-btns {
    margin-top: 48rpx;
    justify-content: space-between;
}
.p-btn {
    width: 240rpx;
    height: 80rpx;
    border-radius: 16rpx;
    font-size: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}
.p-reject {
    background: #f4f4f5;
    color: #909399;
}
.p-agree {
    background: #1677ff;
    color: #fff;
}
</style>
