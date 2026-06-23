<template>
    <view class="page y pos-r">
        <l-nav fanhui :title="materialDetail ? materialDetail.title : '资料详情'">
        </l-nav>
        
        <!-- 加载状态 -->
        <view v-if="loading" class="loading x c p-y-40">
            <text>加载中...</text>
        </view>
        
        <!-- 错误提示 -->
        <view v-else-if="error" class="error x c p-y-40">
            <text>{{ error }}</text>
        </view>
        
        <!-- 资料内容 -->
        <view v-else-if="materialDetail" class="y flex-1">
            <!-- 资料封面 -->
            <view class="banner" v-if="materialDetail.cover_image" :style="{ 'background-image': 'url(' + materialDetail.cover_image + ')', 'background-size': 'cover', 'background-position': 'center' }"></view>
            <view class="banner" v-else></view>
            
            <!-- 资料基本信息 -->
            <view class="p-y-50 p-x-40 bg-f7 fc76 f24 m-b-20">
                <view class="fc0 f32 fw-600">{{ materialDetail.title }}</view>
                <view class="m-y-20">
                    资料描述：{{ materialDetail.description }}
                </view>
                <!-- <view>文件类型：{{ materialDetail.file_type }}</view>
                <view class="m-t-10">文件大小：{{ materialDetail.file_size }}</view>
                <view class="m-t-10">下载次数：{{ materialDetail.download_count }}次</view> -->
                <!-- <view v-if="materialDetail.is_free === 0" class="m-t-10">资料价格：￥{{ materialDetail.price }}</view> -->
                <!-- <view v-else class="m-t-10 fc-lv">免费</view> -->
                <!-- <view v-if="materialDetail.vip_free === 1 && materialDetail.is_free === 0" class="m-t-10 fc-lv">VIP免费</view> -->
            </view>
            
            <!-- 资料详情 -->
            <view class="flex-1 bg">
                <view class="x c m-b-50 fc3 p-t-20">
                    <view
                        class="y c-x jc-sb"
                        :class="{ active: active === 0 }"
                        @click="active = 0"
                    >
                        <view class="m-b-20">资料介绍</view>
                        <view class="xian"></view>
                    </view>
                </view>
                
                <!-- 资料介绍 -->
                <view v-if="active === 0" class="p-x-40 f24 f1a">
                    <view v-html="materialDetail.material_intro || '暂无资料介绍'">
                    </view>
                </view>
            </view>
        </view>
        
        <!-- 底部操作栏 -->
        <view v-if="materialDetail" class="bottom-bar x c-y jc-sb p-x-40 p-y-30 bg-f7">
            <view class="f1a f28" v-if="materialDetail.is_free === 0">
                价格：<span class="f22 fc0">￥</span>
                <span class="f40 fc0 fw-500">{{ materialDetail.price }}</span>
            </view>
            <view class="f1a f28 fc-lv" v-else>
                免费资料
            </view>
            <view 
                class="x c f30 fc-bai p-x-50 p-y-20 br-16 bg-lan"
                @click="downloadMaterial"
                v-if="materialDetail.can_access == 1"
            >
                下载并打开
            </view>
            <view 
                class="x c f30 fc-bai p-x-50 p-y-20 br-16 bg-lan"
                @click="buyMaterial"
                v-else
            >
                购买
            </view>
        </view>
    </view>
</template>
<script>
import { getMaterialDetail, downloadMaterial, buyItem, getOrderPayStatus } from '@/api/api.js';

export default {
    data() {
        return {
            active: 0,
            materialId: '', // 从路由参数获取资料ID
            materialDetail: null,
            loading: false,
            error: '',
            show_zf: false,
            // 支付相关
            paying: false, // 是否正在支付中
            orderSn: '', // 订单号
            pollingInterval: null, // 轮询定时器
            pollingCount: 0, // 轮询次数
            maxPollingCount: 30, // 最大轮询次数
            downloadUrl: '',
            downloading: false,
            downloadProgress: 0,
            downloadSuccess: false,
            downloadError: null,
            downloadedFilePath: ''
        };
    },
    onLoad(options) {
        // 从路由参数获取资料ID
        this.materialId = options.id || '1'; // 默认值为1，实际使用时从路由参数获取
        this.getMaterialInfo();
    },
    methods: {
        /**
         * 获取资料详情
         */
        getMaterialInfo() {
            this.loading = true;
            this.error = '';
            
            // 获取资料详情
            getMaterialDetail(this.materialId)
                .then(res => {
                    if (res.status === 200 && res.data) {
                        this.materialDetail = res.data;
                    } else {
                        this.error = '获取资料详情失败';
                    }
                })
                .catch(err => {
                    console.error('获取资料详情失败:', err);
                    this.error = '获取资料详情失败';
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        
        /**
         * 下载资料
         */
        downloadMaterial() {
            // // 下载资料
            // downloadMaterial(this.materialId)
            //     .then(res => {
            //         if (res.status === 200) {
            //             uni.downloadFile({
            //                 url: res.data.url,
            //                 success: (res) => {
            //                     if (res.statusCode === 200) {
            //                         uni.saveFile({
            //                             tempFilePath: res.tempFilePath,
            //                             success: (res) => {
            //                                 uni.showToast({ title: '下载成功', icon: 'success' });
            //                             },
            //                             fail: (err) => {
            //                                 uni.showToast({ title: '保存文件失败', icon: 'none' });
            //                             }
            //                         });
            //                     } else {
            //                         uni.showToast({ title: '下载失败', icon: 'none' });
            //                     }
            //                 },
            //                 fail: (err) => {
            //                     uni.showToast({ title: '下载失败', icon: 'none' });
            //                 }
            //             });
            //         } else {
            //             uni.showToast({ title: '下载失败', icon: 'none' });
            //         }
            //     })
            //     .catch(err => {
            //         console.error('下载资料失败:', err);
            //         uni.showToast({ title: '下载失败', icon: 'none' });
            //     });

            downloadMaterial(this.materialId)
            .then(res => {
                if (res.status === 200) {
                    this.downloadUrl = res.data.file_url;
                    this.startDownload();
                } else {
                    uni.showToast({ title: '下载失败', icon: 'none' });
                }
            })
            .catch(err => {
                console.error('下载资料失败:', err);
                uni.showToast({ title: '下载失败', icon: 'none' });
            });
        },
        
        // 开始下载文件
        startDownload() {
        if (!this.downloadUrl) return;
        
        this.downloading = true;
        this.downloadProgress = 0;
        this.downloadSuccess = false;
        this.downloadError = null;
        
        try {
            // const downloadTask = downloadApi(
            // this.downloadUrl,
            // (progress) => {
            //     this.downloadProgress = progress;
            // }
            // );

            const downloadTask = uni.downloadFile({
                url: this.downloadUrl,
                success: (res) => {
                    if (res.statusCode === 200) {
                        this.downloadedFilePath = res.tempFilePath;
                        this.openDownloadedFile();
                        console.log('下载成功', this.downloadedFilePath);
                    }
                }
            });

            // downloadTask.onProgressUpdate((res) => {
            //     this.downloadProgress = res.progress;
            //     if (res.progress === 100) {
            //         this.downloadSuccess = true;
            //     }
            //     console.log('下载进度' + res.progress);
            //     console.log('已经下载的数据长度' + res.totalBytesWritten);
            //     console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);

            // });
            
            // downloadTask.then((tempFilePath) => {
            // this.downloading = false;
            // this.downloadSuccess = true;
            // this.downloadedFilePath = tempFilePath;
            // uni.showToast({
            //     title: '下载成功',
            //     icon: 'success'
            // });
            // this.openDownloadedFile();
            // }).catch((err) => {
            // this.downloading = false;
            // this.downloadError = err.message;
            // uni.showToast({
            //     title: '下载失败',
            //     icon: 'none'
            // });
            // });
        } catch (err) {
            this.downloading = false;
            this.downloadError = err.message;
            uni.showToast({
            title: '下载失败',
            icon: 'none'
            });
        }
        },
        
        // 打开下载的文件
        openDownloadedFile() {
        if (!this.downloadedFilePath) return;
        
        uni.openDocument({
            filePath: this.downloadedFilePath,
            success: () => {
            console.log('文件打开成功');
            },
            fail: (err) => {
            uni.showToast({
                title: '打开文件失败',
                icon: 'none'
            });
            console.error('打开文件失败:', err);
            }
        });
        },

        /**
         * 购买资料
         */
        buyMaterial() {
            // 检查是否有权限购买
            if (this.materialDetail.is_purchased || this.materialDetail.is_free === 1) {
                uni.showToast({ title: '您已购买或免费', icon: 'none' });
                return;
            }
            
            this.paying = true;
            
            // 调用购买接口
            buyItem('material', this.materialId, 'weixin')
                .then(res => {
                    if (res.status === 200 && res.data) {
                        this.orderSn = res.data.order_no;
                        const payInfo = res.data.pay_info;
                        
                        // 调用uni-app支付API
                        uni.requestPayment({
                            provider: 'wxpay',
                            timeStamp: payInfo.timestamp,
                            nonceStr: payInfo.nonceStr,
                            package: payInfo.package,
                            signType: payInfo.signType,
                            paySign: payInfo.paySign,
                            success: (res) => {
                                uni.showToast({ title: '支付成功', icon: 'success' });
                                this.paying = false;
                                // 重新获取资料信息，更新购买状态
                                this.getMaterialInfo();
                            },
                            fail: (err) => {
                                uni.showToast({ title: '支付失败', icon: 'none' });
                                this.paying = false;
                                console.error('支付失败:', err);
                            },
                            complete: () => {
                                // 无论成功失败，都开始轮询订单状态，确保状态同步
                                this.startPolling();
                            }
                        });
                    } else {
                        uni.showToast({ title: '发起支付失败', icon: 'none' });
                        this.paying = false;
                    }
                })
                .catch(err => {
                    console.error('发起支付失败:', err);
                    uni.showToast({ title: '发起支付失败', icon: 'none' });
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
                uni.showToast({ title: '支付超时，请重新尝试', icon: 'none' });
                this.paying = false;
                return;
            }
            
            this.pollingCount++;
            
            getOrderPayStatus(this.orderSn)
                .then(res => {
                    if (res.status === 200 && res.data) {
                        // 根据后端返回的实际状态判断支付是否成功
                        // 假设后端返回的data中包含pay_status字段，1表示支付成功
                        if (res.data.pay_status === 1) {
                            this.stopPolling();
                            uni.showToast({ title: '支付成功', icon: 'success' });
                            this.paying = false;
                            // 重新获取资料信息，更新购买状态
                            this.getMaterialInfo();
                        }
                    } else {
                        console.error('查询订单状态失败:', res);
                    }
                })
                .catch(err => {
                    console.error('查询订单状态失败:', err);
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
        },
    },
    
    /**
     * 页面卸载时清理
     */
    onUnload() {
        this.stopPolling();
    },
};
</script>
<style scoped lang="less">
.p-x-40 {
    padding-right: 40rpx;
    padding-left: 40rpx;
}
.p-x-50 {
    padding-left: 50rpx;
    padding-right: 50rpx;
}
.bg-lan {
    background-color: #2769ED;
}
.ke-img {
    width: 174rpx;
    height: 174rpx;
}
.fc-lv {
    color: #67C23A;
}
.bg-lv {
    background-color: rgba(103, 194, 58, 0.10);
}
.f1a {
    color: #1a1a1a;
}
.bg-f1 {
    background-color: #f1f1f1;
}
.bg {
    background-color: white;
}
.p-y-50 {
    padding-top: 50rpx;
    padding-bottom: 50rpx;
}
.m-b-50 {
    margin-bottom: 50rpx;
}
.m-b-20 {
    margin-bottom: 20rpx;
}
.m-y-20 {
    margin-top: 20rpx;
    margin-bottom: 20rpx;
}
.m-t-10 {
    margin-top: 10rpx;
}
.bg-f7 {
    background-color: white;
}
.page {
    background-color: #f1f1f1;
    .banner {
        width: 100%;
        height: 468rpx;
        background-color: bisque;
        position: relative;
    }
    .active {
        color: #000;
        .xian {
            background-color: #0256ff;
        }
    }
    .xian {
        width: 88rpx;
        height: 4rpx;
    }
    .mask {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0,0,0,0.2);
        z-index: 9999;
        .foot {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 50rpx 20rpx 20rpx 20rpx;
            background-color: #F7F9FF;
        }
    }
    .bottom-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: 1rpx solid #e5e5e5;
    }
}
</style>