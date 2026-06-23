<template>
    <view class="page y pos-r">
        <l-nav fanhui :title="courseDetail ? courseDetail.title : '创业课程'"></l-nav>
        
        <!-- 加载状态 -->
        <view v-if="loading" class="loading x c p-y-40">
            <text>加载中...</text>
        </view>
        
        <!-- 错误提示 -->
        <view v-else-if="error" class="error x c p-y-40">
            <text>{{ error }}</text>
        </view>
        
        <!-- 课程内容 -->
        <view v-else-if="courseDetail" class="y flex-1">
            <!-- 视频播放器或课程封面 -->
            <view v-if="playing && videoUrl" class="y">
                <view class="current-chapter-info p-10 bg-black bg-opacity-50 text-white f24">
                    当前播放：{{ currentChapter.chapter_title }}
                </view>
                <view class="banner">
                    <video 
                        id="courseVideo"
                        :custom-cache="false"
                        :src="videoUrl" 
                        class="w-100 h-100" 
                        controls 
                        autoplay 
                        @ended="playing = false"
                    ></video>
                </view>
            </view>
            <view class="banner" v-else-if="courseDetail.banner_image" :style="{ 'background-image': 'url(' + courseDetail.banner_image + ')', 'background-size': 'cover', 'background-position': 'center' }"></view>
            <view class="banner" v-else></view>
            
            <!-- 课程基本信息 -->
            <view class="p-y-50 p-x-40 bg-f7 m-b-20">
                <view class="fc0 f32 fw-600">{{ courseDetail.title }}</view>
                <view class="m-y-20 fc76 f28">课程描述：{{ courseDetail.description }}</view>
                <view class="fc76 f28">课程节数：共{{ courseDetail.chapter_count }}节</view>
                <view v-if="courseDetail.is_free === 0" class="m-t-10 fc76 f28">课程价格：￥{{ courseDetail.price }}</view>
            </view>
            
            <!-- 课程详情和目录 -->
            <view class="flex-1 bg">
                <view class="x c m-b-50 fc3 p-t-20">
                    <view
                        class="y c-x jc-sb m-r-230"
                        :class="{ active: active === 0 }"
                        @click="active = 0"
                    >
                        <view class="m-b-20">课程介绍</view>
                        <view class="xian"></view>
                    </view>
                    <view
                        class="y c-x jc-sb"
                        :class="{ active: active === 1 }"
                        @click="active = 1"
                    >
                        <view class="m-b-20">课程目录</view>
                        <view class="xian"></view>
                    </view>
                </view>
                
                <!-- 课程介绍 -->
                <view v-if="active === 0" class="p-x-40 f24 f1a">
                    <view v-html="courseDetail.course_intro || '暂无课程介绍'"></view>
                </view>
                
                <!-- 课程目录 -->
                <view v-if="active === 1" class="p-x-40 f28 fc0">
                    <view
                        class="m-b-20 bg-f1 br-8 p-a-30 x c-y jc-sb"
                        v-for="chapter in chapters"
                        :key="chapter.id"
                        @click="playChapter(chapter)"
                    >
                        <view>{{ chapter.chapter_title }}</view>
                        <!-- <view v-if="chapter.duration" class="m-r-20 fc76 f24">{{ chapter.duration }}</view> -->
                        <view v-if="chapter.can_access === 1" class="fc-lv f24 fw-700">
                            <!-- 可观看 -->
                        </view>
                        <view v-else-if="chapter.is_trial === 1" class="fc-huang f24 fw-700">
                            可试听
                        </view>
                        <view v-else>
                            <uv-icon
                                name="lock"
                                color="#333333"
                                size="20"
                            ></uv-icon>
                        </view>
                    </view>
                    <view v-if="chapters.length === 0" class="empty x c p-y-40">
                        <text>暂无章节信息</text>
                    </view>
                </view>
            </view>
        </view>
        
        <!-- 支付弹窗 -->
        <view class="paymask" v-if="show_zf" @click="show_zf = false">
            <view class="foot" @click.stop>
                <view class="x c m-b-50 f1a f32 fw-700">解锁课程</view>
                <view class="p-x-20 p-y-30 x bg-k m-b-50">
                    <view class="ke-img br-16 o-h m-r-30 bg-2" v-if="courseDetail && courseDetail.cover_image">
                        <image :src="courseDetail.cover_image" mode="aspectFill" style="width: 100%; height: 100%;"></image>
                    </view>
                    <view class="ke-img br-16 o-h m-r-30 bg-2" v-else></view>
                    <view class="y jc-sb flex-1 p-y-10">
                        <view class="f32 fw-600">{{ courseDetail ? courseDetail.title : '餐饮创业辅助课程' }}</view>
                        <view class="bhh o-h f24 fc76">{{ courseDetail ? courseDetail.description : '描述餐饮创业过程中可能遇到的经营问题' }}</view>
                        <view class="x"><view class="x c f24 p-x-15 p-y-10 br-8 fc-lv bg-lv">共{{ courseDetail ? courseDetail.chapter_count : 24 }}课时</view><view class="flex-1"></view></view>
                    </view>
                </view>
                <view class="x c-y jc-sb p-x-40">
                    <view class="f1a f28">实付款：<span class="f22 fc0">￥</span><span class="f40 fc0 fw-500">{{ courseDetail ? courseDetail.price : 399.9 }}</span></view>
                    <view class="x c f30 fc-bai p-x-50 p-y-20 br-16 bg-lan" @click="handlePay">去支付</view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import { getCourseDetail, getCourseChapters, getChapterVideo, buyItem, getOrderPayStatus } from '@/api/api.js';

export default {
    data() {
        return {
            active: 0,
            courseId: '', // 从路由参数获取课程ID
            courseDetail: null,
            chapters: [],
            loading: false,
            error: '',
            show_zf: false,
            videoUrl: '', // 视频播放地址
            currentChapter: null, // 当前播放的章节
            playing: false, // 是否正在播放
            videoRequestId: 0, // 当前视频请求序号
            // 支付相关
            paying: false, // 是否正在支付中
            orderSn: '', // 订单号
            pollingInterval: null, // 轮询定时器
            pollingCount: 0, // 轮询次数
            maxPollingCount: 30, // 最大轮询次数
            pageActive: false, // 页面是否处于可见状态
        };
    },
    onLoad(options) {
        // 从路由参数获取课程ID
        this.courseId = options.id || '1'; // 默认值为1，实际使用时从路由参数获取
        // this.getCourseInfo();
    },
    onShow() {
        this.pageActive = true;
        this.getCourseInfo();
    },
    onHide() {
        this.pageActive = false;
        this.videoRequestId++;
        this.stopVideoPlayback();
    },
    methods: {
        /**
         * 获取课程详情和章节列表
         */
        getCourseInfo() {
            this.loading = true;
            this.error = '';
            
            // 获取课程详情
            getCourseDetail(this.courseId)
                .then(res => {
                    if (res.status === 200 && res.data) {
                        this.courseDetail = res.data;
                    } else {
                        this.error = '获取课程详情失败';
                    }
                })
                .catch(err => {
                    console.error('获取课程详情失败:', err);
                    this.error = '获取课程详情失败';
                })
                .finally(() => {
                    this.loading = false;
                });
            
            // 获取章节列表
            getCourseChapters(this.courseId)
                .then(res => {
                    if (res.status === 200 && res.data && res.data.list) {
                        this.chapters = res.data.list;
                    } else {
                        this.error = '获取章节列表失败';
                    }
                })
                .catch(err => {
                    console.error('获取章节列表失败:', err);
                    this.error = '获取章节列表失败';
                });
        },
        
        /**
         * 播放章节视频
         */
        playChapter(chapter) {
            // 检查是否有权限访问
            if (chapter.can_access !== 1 && chapter.is_trial !== 1) {
                this.show_zf = true;
                return;
            }

            const requestId = ++this.videoRequestId;
            this.stopVideoPlayback();
            
            // 获取章节视频地址
            getChapterVideo(chapter.id)
                .then(res => {
                    if (!this.pageActive || requestId !== this.videoRequestId) return;

                    if (res.status === 200 && res.data && res.data.video_url) {
                        this.videoUrl = res.data.video_url;
                        this.currentChapter = chapter;
                        this.playing = true;
                    } else {
                        uni.showToast({ title: '获取视频地址失败', icon: 'none' });
                    }
                })
                .catch(err => {
                    console.error('获取视频地址失败:', err);
                    uni.showToast({ title: '获取视频地址失败', icon: 'none' });
                });
        },

        /**
         * 停止并销毁当前视频，避免离开页面后继续请求资源
         */
        stopVideoPlayback() {
            if (this.videoUrl) {
                const videoContext = uni.createVideoContext('courseVideo', this);
                if (videoContext && videoContext.pause) videoContext.pause();
                if (videoContext && videoContext.stop) videoContext.stop();
            }

            this.playing = false;
            this.videoUrl = '';
            this.currentChapter = null;
        },
        
        /**
         * 显示支付弹窗
         */
        showzf(v) {
            this.show_zf = true;
        },
        
        /**
         * 跳转到指定URL
         */
        toUrl(url) {
            if(!url) return
            uni.navigateTo({
                url,
            });
        },
        
        /**
         * 处理支付
         */
        handlePay() {
            this.paying = true;
            this.show_zf = false;
            
            // 调用购买接口
            buyItem('course', this.courseId, 'weixin')
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
                                // 重新获取课程信息，更新购买状态
                                this.getCourseInfo();
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
                            // 重新获取课程信息，更新购买状态
                            this.getCourseInfo();
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
        this.pageActive = false;
        this.videoRequestId++;
        this.stopVideoPlayback();
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
.fc-huang {
    color: #ffd256;
}
.bg-f1 {
    background-color: #f1f1f1;
}
.m-r-230 {
    margin-right: 230rpx;
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
.bg-f7 {
    background-color: white;
}
.page {
    background-color: #f1f1f1;
    .current-chapter-info {
        padding: 10rpx 20rpx;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 24rpx;
    }
    .banner {
        width: 100%;
        height: 468rpx;
        background-color: bisque;
        position: relative;
        
        .w-100 {
            width: 100%;
        }
        
        .h-100 {
            height: 100%;
        }
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
    .paymask {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0,0,0,0.2);
        z-index: 9999;
        opacity: 1;
        .foot {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 50rpx 20rpx 20rpx 20rpx;
            background-color: #F7F9FF;
        }
    }
}
</style>
