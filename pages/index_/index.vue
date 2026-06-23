<template>
    <view class="page" @scrolltolower="onLoadMore" style="background-color: #f6f6f6;">
        <l-topbar :is_minus="false" bgColor="#fff">
            <view class="x c f34 font-b fc0 w-a">官方服务</view>
        </l-topbar>
        
        <!-- 轮播图 -->
        <view class="p-a-20" v-if="bannerList.length > 0">
            <swiper class="br-12 o-h h272" autoplay indicator-dots circular>
                <swiper-item v-for="(item, index) in bannerList" :key="index">
                    <view class="br-12 o-h h272" :style="{ backgroundImage: 'url(' + item.img + ')', backgroundSize: 'cover', backgroundPosition: 'center' }" @click="toUrl(item.link)"></view>
                </swiper-item>
            </swiper>
        </view>
        <view class="p-a-20" v-else>
            <view class="br-12 o-h h272"></view>
        </view>
        
        <!-- 公告 -->
        <view class="p-x-20" v-if="noticeList.length > 0">
            <view class="x c-y p-a-20 f28 bg-k" @click="toUrl(currentNotice.link)">
                <view class="w32 h32">
                    <image class="img" :src="`${imgHost}/static/images/w/容器@2x.jpg`"></image>
                </view>
                <view class="flex-1 overflow-hidden" style="height: 40rpx;margin-left: 10rpx;">
                    <view class="notice-content">
                        <view class="notice-item x c-y" v-for="(item, index) in noticeList" :key="index" :class="{ 'active': index === currentNoticeIndex, 'leave': index === leaveNoticeIndex }">
                            <view class="flex-1 overflow-hidden">
                                <view class="ellipsis">{{ item.title }}</view>
                            </view>
                            <view class="flex-1"></view>
                            <view class="fc76">{{ formatTime(item.time) }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="p-x-20" v-else>
            <view class="x c-y p-a-20 f28 bg-k">
                <view class="w32 h32">
                    <uv-icon name="map" color="#000" size="24"></uv-icon>
                </view>
                <view>练个摊官方教育课程售卖中</view>
                <view class="flex-1"></view>
                <view class="fc76">刚刚</view>
            </view>
        </view>
        
        <view class="p-a-20">
            <view class="x jc-sb">
                <view class="w2 h394 bg-k p-l-40 p-t-40 y" @click="toUrl('/pages/w/kecheng')">
                    <view class="m-b-15 f32 fw-700">创业课程</view>
                    <view class="m-b-20 f24 fc76">创业精品课程学习</view>
                    <view class="w-70 flex-1 bg-2">
                        <image class="img" :src="`${imgHost}/static/images/w/Frame@2x.jpg`"></image>
                    </view>
                </view>
                <view class="w2 y jc-sb">
                    <view class="h187 bg-k y c" @click="toUrl('/pages/w/lookzl')">
                        <view class="x c-y m-b-15">
                            <view class="bg-lan icon m-r-10"><image class="img" :src="`${imgHost}/static/images/w/容器@2x(2).jpg`"></image></view>
                            <view class="f32 fw-700">创业资源库</view>
                        </view>
                        <view class="f24 fc76">精选创业指导资料</view>
                    </view>
                    <view class="h187 bg-k y c" @click="toUrl('/pages/w/qudao')">
                        <view class="x c-y m-b-15">
                            <view class="bg-lan icon m-r-10"><image class="img" :src="`${imgHost}/static/images/w/容器@2x(1).jpg`"></image></view>
                            <view class="f32 fw-700">全渠道供应链</view>
                        </view>
                        <view class="f24 fc76">为您提供优质货品</view>
                    </view>
                </view>
            </view>
        </view>
        
        <view class="p-x-20" style="margin: 20rpx 0;">
            <view class="h88 x c bg-lan br-12 o-h" @click="toUrl('/pages/w/ai_index')">
                <view class="icon m-r-20"><image class="img" :src="`${imgHost}/static/images/w/robot.png`"></image></view>
                <view class="f32 fc-bai">AI数字人</view>
            </view>
        </view>
        
        <view class="p-a-20 x c-y">
            <view class="biaoji bg-lan m-r-20"></view>
            <view class="f32 fw-700">推荐课程</view>
        </view>
        
        <!-- 课程列表 -->
        <view class="p-x-20" style="padding-bottom: calc(50rpx + env(safe-area-inset-bottom) + 100rpx);">
            <!-- <view class="p-x-20 p-y-30 x bg-k m-b-20" v-for="(course, index) in courseList" :key="course.id" @click="toUrl('/pages/w/kclist?id=' + course.id)">
                <view class="ke-img br-16 o-h m-r-30 bg-2" v-if="course.cover_image" :style="{ backgroundImage: 'url(' + course.cover_image + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"></view>
                <view class="ke-img br-16 o-h m-r-30 bg-2" v-else></view>
                <view class="y jc-sb flex-1 p-y-10">
                    <view class="f32 fw-500">{{ course.title }}</view>
                    <view class="bhh o-h f24 fc76">{{ course.description }}</view>
                    <view class="x"><view class="x c f24 p-x-15 p-y-10 br-8 fc-lv bg-lv">共{{ course.chapter_count }}课时</view><view class="flex-1"></view></view>
                </view>
            </view> -->

            <view class="p-x-20 p-y-30 x bg-k m-b-20 pos-r" v-for="course in courseList" :key="course.id"
                @click="toUrl('/pages/w/kclist?id=' + course.id)">
                <view class="ke-img br-16 m-r-30 bg-2" style="position: relative;">
                    <image class="br-16" :src="course.cover_image" mode="aspectFill" style="width: 100%; height: 100%;">
                    </image>
                    <image v-if="course.is_free === 0 && course.vip_free === 1" :src="`${imgHost}/static/images/w/vip_tip.png`" style="width: 88rpx; height: 34rpx; position: absolute; top: -2rpx; left: 0; z-index: 10;"></image>
                </view>
                <view class="y jc-sb flex-1 p-y-10">
                    <view class="f32 fw-500">{{ course.title }}</view>
                    <view class="bhh o-h f24 fc76">{{ course.description }}</view>
                    <view class="x">
                        <view class="x c f24 p-x-15 p-y-10 br-8 fc-lv bg-lv">共{{ course.chapter_count }}课时</view>
                        <view class="flex-1"></view>
                    </view>
                </view>
                <view v-if="course.is_free === 0" class="fw-700 f40 fc-fd pos-a lh-56 r-20 b-20"><span
                        class="m-r-5 f24">￥</span><span>{{ course.price }}</span></view>
<!--                <view v-if="course.is_free === 1" class="x c f24 fw-700 p-x-15 p-y-10 br-8 fc-lv bg-lv pos-a t-20 r-20">
                    免费</view> -->
            </view>
            
            <!-- 加载状态 -->
            <view class="p-x-20 p-y-30 x bg-k m-b-20" v-if="courseList.length === 0 && !loading">
                <view class="flex-1 x c y c">
                    <view class="f32 fc76">暂无推荐课程</view>
                </view>
            </view>
            
            <!-- 加载更多 -->
            <view class="p-x-20 p-y-30 x c" v-if="loading">
                <view class="f28 fc76">加载中...</view>
            </view>
            
            <!-- 没有更多数据 -->
            <view class="p-x-20 p-y-30 x c" v-if="!hasMore && courseList.length > 0">
                <view class="f28 fc76">没有更多数据了</view>
            </view>
        </view>
        
        <!-- <MainMenu value="home"></MainMenu> -->
		<pageFooter :style="colorStyle"></pageFooter>

    </view>
</template>
<script>
import MainMenu from "./menu.vue";
import { getHomeData, getCourseList } from '@/api/api.js';
import pageFooter from '@/components/pageFooter/index.vue';
import Cache from '@/utils/cache';
import { mapGetters, mapMutations } from 'vuex';

import {
    HTTP_REQUEST_URL
} from '@/config/app';
export default {
    components: {
		pageFooter,
        MainMenu,
    },
    computed: {
        ...mapGetters(['isLogin', 'uid', 'cartNum'])
    },
    data() {
        return {
            imgHost: HTTP_REQUEST_URL,
            bannerList: [],
            noticeList: [],
            courseList: [],
            currentNoticeIndex: 0,
            leaveNoticeIndex: -1,
            currentNotice: {},
            noticeTimer: null,
            page: 1,
            pageSize: 10,
            hasMore: true,
            loading: false,
            refreshing: false,
            configData: Cache.get('BASIC_CONFIG') || {}
        };
    },
    onLoad() {
        console.log('review_mode', this.configData.review_mode);
        try {
            if (this.configData.review_mode == 1) {
                uni.reLaunch({
                    url: '/pages/index/index',
                    error: (err) => {
                        console.error('跳转失败:', err);
                    }
                });
            }
        } catch (error) {
            console.error('跳转失败:', error);
        }
    },
    mounted() {

        this.loadHomeData();
        this.loadCourseList();
    },
    onPullDownRefresh() {
        this.onRefresh();
        uni.stopPullDownRefresh();
    },
    watch: {
        noticeList: {
            handler(newVal) {
                if (newVal && newVal.length > 0) {
                    this.currentNoticeIndex = 0;
                    this.currentNotice = newVal[0];
                    this.startNoticeRolling();
                }
            },
            deep: true
        }
    },
    beforeUnmount() {
        if (this.noticeTimer) {
            clearInterval(this.noticeTimer);
        }
    },
    methods: {
        toUrl(link) {
            if(!link) return;
            uni.navigateTo({
                url: link,
                fail: (err) => {
                    console.error('跳转失败:', err);
                }
            });
        },
        loadHomeData() {
            getHomeData().then(res => {
                if (res.status === 200 && res.data) {
                    this.bannerList = res.data.index_banner || [];
                    this.noticeList = res.data.index_announcement || [];
                }
            }).catch(err => {
                console.error('获取首页数据失败:', err);
            });
        },
        loadCourseList(isRefresh = false) {
            if (this.loading || (!this.hasMore && !isRefresh)) return;
            
            this.loading = true;
            
            const params = {
                page: isRefresh ? 1 : this.page,
                limit: this.pageSize
            };
            
            getCourseList(params).then(res => {
                if (res.status === 200 && res.data) {
                    if (isRefresh) {
                        this.courseList = res.data.list || [];
                        this.page = 2;
                    } else {
                        this.courseList = [...this.courseList, ...(res.data.list || [])];
                        this.page++;
                    }
                    
                    this.hasMore = (res.data.list || []).length >= this.pageSize;
                } else {
                    this.hasMore = false;
                }
            }).catch(err => {
                console.error('获取课程列表失败:', err);
                this.hasMore = false;
            }).finally(() => {
                this.loading = false;
                this.refreshing = false;
            });
        },
        onRefresh() {
            this.refreshing = true;
            this.hasMore = true;
            this.loadCourseList(true);
            this.loadHomeData();
        },
        onLoadMore() {
            if (!this.loading && this.hasMore) {
                this.loadCourseList();
            }
        },
        startNoticeRolling() {
            if (this.noticeTimer) {
                clearInterval(this.noticeTimer);
            }
            
            if (this.noticeList.length > 1) {
                this.leaveNoticeIndex = -1;
                this.noticeTimer = setInterval(() => {
                    this.leaveNoticeIndex = this.currentNoticeIndex;
                    this.currentNoticeIndex = (this.currentNoticeIndex + 1) % this.noticeList.length;
                    this.currentNotice = this.noticeList[this.currentNoticeIndex];
                }, 3000);
            }
        },
        formatTime(time) {
            if (!time) return '刚刚';
            
            const now = new Date();
            const noticeTime = new Date(time);
            const diff = now - noticeTime;
            
            const minutes = Math.floor(diff / (1000 * 60));
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            
            if (minutes < 1) {
                return '刚刚';
            } else if (minutes < 60) {
                return `${minutes}分钟前`;
            } else if (hours < 24) {
                return `${hours}小时前`;
            } else{
                return `${days}天前`;
            }
        },
    },
        //#ifdef MP
    onShareAppMessage() {
        let uid = this.uid ? this.uid : 0;
        if (this.shareInfo.img) {
            return {
                title: this.shareInfo.title,
                path: '/pages/index_/index?spid=' + uid,
                imageUrl: this.shareInfo.img,
                desc: this.shareInfo.synopsis
            };
        } else {
            return {
                title: this.shareInfo.title,
                path: '/pages/index_/index?spid=' + uid
                // imageUrl: this.shareInfo.img,
                // desc: this.shareInfo.synopsis
            };
        }
    },
    //分享到朋友圈
    onShareTimeline: function () {
        return {
            title: this.shareInfo.title,
            path: '/pages/index_/index',
            imageUrl: this.shareInfo.img,
            desc: this.shareInfo.synopsis
        };
    },
    //#endif
};
</script>
<style scoped lang="less">
.biaoji {
    width: 6rpx;
    height: 26rpx;
    border-radius: 200rpx;
}
.kuang {
    border: 1rpx dashed #767676;
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
.p-t-40 {
    padding-top: 40rpx;
}
.p-b-50 {
    padding-bottom: 50rpx;
}
.p-l-40 {
    padding-left: 40rpx;
}
.p-x-50 {
    padding-left: 50rpx;
    padding-right: 50rpx;
}
.h88 {
    height: 88rpx;
}
.icon {
    width: 48rpx;
    height: 48rpx;
}
.w-70 {
    width: 70%;
}
.h272 {
    height: 272rpx;
}
.h394 {
    height: 394rpx;
}
.h187 {
    height: 187rpx;
}
.w2 {
    width: calc((100% - 20rpx) / 2);
}

.img {
    width: 100%;
    height: 100%;
}

.w32 {
    width: 32rpx;
}

.h32 {
    height: 32rpx;
}
.fc-fd {
    color: #fd4d4d;
}

.notice-content {
    position: relative;
    height: 40rpx;
    overflow: hidden;
}

.notice-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40rpx;
    line-height: 40rpx;
    opacity: 0;
    transform: translateY(100%); /* 初始状态在下方 */
    transition: all 0.5s ease;
}

.notice-item.active {
    opacity: 1;
    transform: translateY(0);
    z-index: 2;
}

/* 离开状态（向上滚出可视区）*/
.notice-item.leave {
    opacity: 0;
    transform: translateY(-100%);
    z-index: 1;
}

.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
