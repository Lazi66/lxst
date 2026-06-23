<template>
    <view class="page pos-r fc-bai">
        <view class="bg">
            <image
                class="img"
                mode="widthFix"
                :src="`${imgHost}/static/images/w/组 126935@2x.png`"
            ></image>
        </view>
        <view class="com w-a">
            <l-nav
                :fixed="false"
                fanhui
                bgColor="transparent"
                leftIconColor="#fff"
            ></l-nav>
            <view class="p-t-104 p-l-48 font-b f80">邀请好友</view>
            <view class="p-l-48 f75 font-b">解锁VIP收益</view>
            <view class="p-l-48 f28 fw-500 m-b-20"
                >好友开通VIP会员 即可获得{{ campaignData.rate || '10' }}%邀请奖励</view
            >
            <view class="p-l-48 f24 fc-d3 m-b-48"
                >活动时间：{{ campaignData.start_time }}-{{ campaignData.end_time }}</view
            >
            <view class="m-t-30">
                <view class="p-x-20 w-a">
                    <view class="bg-white br-10 b-2 b-grey rule-box">
                        <view class="x c p-t-20 p-b-20">
                            <view class="heng"></view>
                            <view class="fw-700 f32 m-x-20">返现规则说明</view>
                            <view class="heng r180"></view>
                        </view>
                        <view class="p-x-40 p-b-40">
                            <view class="y">
                                <view class="x c-y m-b-30">
                                    <view class="w-10 h-10 rounded-full bg-lan m-r-20"></view>
                                    <view class="f32 fw-500" v-if="campaignData.type == 0">全部用户可参与</view>
                                    <view class="f32 fw-500" v-if="campaignData.type == 1">仅会员可参与</view>
                                </view>
                                <view class="x c-y m-b-30">
                                    <view class="w-10 h-10 rounded-full bg-lan m-r-20"></view>
                                    <view class="f32 fw-500">邀请好友注册并购买VIP会员</view>
                                </view>
                                <view class="x c-y m-b-30">
                                    <view class="w-10 h-10 rounded-full bg-lan m-r-20"></view>
                                    <view class="f32 fw-500">好友注册并购买VIP会员可获得{{ campaignData.rate || '0' }}%返现</view>
                                </view>
                                <view class="x c-y">
                                    <view class="w-10 h-10 rounded-full bg-lan m-r-20"></view>
                                    <view class="f32 fw-500">无上限，邀请越多福利越多</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="m-t-30">
                <view class="x c">
                    <view class="heng"></view>
                    <view class="fw-700 f32 m-x-20">我的邀请数据</view>
                    <view class="heng r180"></view>
                </view>
                <view class="x jc-sb">
                    <view class="y c-x pos-r t-item">
                        <image class="img" :src="`${imgHost}/static/images/w/组 126928@2x.png`"></image>
                        <view class="pos-a w-a h-a y c-x b">
                            <view class="fw-700 f72">{{ statisticsData.invite_count }}</view>
                            <view class="fw-500 f28 m-b-40">邀请人数</view>
                        </view>
                    </view>
                    <view class="y c-x pos-r t-item">
                        <image class="img" :src="`${imgHost}/static/images/w/组 126928@2x.png`"></image>
                        <view class="pos-a w-a h-a y c-x b">
                            <view class="fw-700 f72">{{ statisticsData.member_count }}</view>
                            <view class="fw-500 f28 m-b-40">VIP开通人数</view>
                        </view>
                    </view>
                    <view class="y c-x pos-r t-item">
                        <image class="img" :src="`${imgHost}/static/images/w/组 126928@2x.png`"></image>
                        <view class="pos-a w-a h-a y c-x b">
                            <view class="fw-700 f40 m-b-20">￥{{ (statisticsData.total_commission / 100).toFixed(2) }}</view>
                            <view class="fw-500 f28 m-b-40">获取返现<span class="f20">({{ campaignData.rate || '0' }}%)</span></view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="p-x-80 m-t-10 m-b-30">
                <view class="pos-r h90" @click="toUrl('/pages/users/user_spread_code/index')">
                    <image class="img" :src="`${imgHost}/static/images/w/组 126930@2x.png`"></image>
                    <view class="pos-a x c w-a h-a f32 fw-500 t0 m-t-10">立即邀请好友赚取收益</view>
                </view>
            </view>
            <view class="pos-r p-x-20 w-a h362">
                <image class="img" :src="`${imgHost}/static/images/w/组 126931@2x.png`"></image>
                <view class="pos-a b0 x jc-sb b-box">
                    <view class="y c-x pos-r b-item" @click="toUrl('/pages/users/user_spread_code/index')">
                        <image class="img r180" :src="`${imgHost}/static/images/w/组 126928@2x.png`"></image>
                        <view class="pos-a w-a h-a y c-x b">
                            <view class="icon m-b-10">
                                <image class="img" :src="`${imgHost}/static/images/w/qr-code-fill@2x.png`"></image>
                            </view>
                            <view class="fw-500 f28 m-b-40 p-b-5">邀请扫码</view>
                        </view>
                    </view>
                    <view class="y c-x pos-r b-item">
                        <image class="img r180" :src="`${imgHost}/static/images/w/组 126928@2x.png`"></image>
                        <view class="pos-a w-a h-a y c-x b">
                            <view class="icon m-b-10">
                                <image class="img" :src="`${imgHost}/static/images/w/links-fill@2x.png`"></image>
                            </view>
                            <button open-type="share" class="fw-500 f28 m-b-40 p-b-5" style="background-color: transparent;color: white;">分享链接</button>

                            <!-- <view class="fw-500 f28 m-b-40 p-b-5"></view> -->
                        </view>
                    </view>
                    
                    <view class="y c-x pos-r b-item">
                        <image class="img r180" :src="`${imgHost}/static/images/w/组 126928@2x.png`"></image>
                        <view class="pos-a w-a h-a y c-x b">
                            <view class="icon m-b-10">
                                <image class="img" :src="`${imgHost}/static/images/w/wechat-fill@2x.png`"></image>
                            </view>
                            <button open-type="share" class="fc3 f28 m-b-40 p-b-5" style="background-color: transparent;color: white;">分享到微信</button>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view v-if="show" @click="show = false" class="mask pos-a">
            <view class="tan" @click.stop>
                <view class="x r p-x-20 p-t-20 p-b-10">
                    <uv-icon @click="show = false" name="close" color="#606266" size="14"></uv-icon>
                </view>
                <view class="y c-x p-b-20">
                    <view class="fw-700 fc3 f26 p-b-20">练个摊儿</view>
                    <view class="fc9">来自：Mlaijiaoye的推荐</view>
                </view>
                <view class="p-x-20">
                    <view class="h345 br-t o-h bg-2"></view>
                </view>
                <view class="p-x-20 m-y-40">“不要问世界需要什么。问问自己什么让你活着，然后去做。因为世界需要的是鲜活的人。”</view>
                <view class="p-x-20 m-b-30 x jc-sb">
                    <view class="y jc-sb">
                        <view class="font-b fc3 f68 m-t-20">练个摊儿</view>
                        <view class="fc9 f20">这家店有好货，一起来瞧瞧吧</view>
                    </view>
                    <view class="qr p-a-10 br-19"><view class="bg-k h-a br-19"></view></view>
                </view>
                <view class="x c">
                    <view class="r90"><uv-icon name="play-left-fill" color="#999999" size="14"></uv-icon></view>
                </view>
                <view class="x c m-t-10">
                    <view class="f20 fc9">长按图片识别码</view>
                </view>
                <view class="x c-y jc-sb p-a-20" v-if="0">
                    <view @click="show = false" class="quxiao x c btn">保存图片</view>
                    <view @click="show = false" class="baocun x c btn">分享好友</view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import { getShare } from '@/api/public.js';
import { mapGetters, mapMutations } from 'vuex';
import { getRecruitmentCampaign, getInviteStatistics } from '@/api/api.js';
import {
    HTTP_REQUEST_URL
} from '@/config/app';
    export default {
        computed: {
            ...mapGetters(['isLogin', 'uid', 'cartNum'])
        },
        data() {
            return {
                show: false,
                imgHost: HTTP_REQUEST_URL,
                campaignData: {
                    member_brokerage: "0",
                    start_time: "",
                    end_time: "",
                    type: "0",
                    rate: "0",
                    image: "",
                    title: "",
                    subtitle: ""
                },
                statisticsData: {
                    invite_count: 0,
                    member_count: 0,
                    total_commission: 0
                },
                shareInfo: {
                    img: "",
                    title: "",
                    synopsis: ""
                }
            }
        },
        mounted() {
            this.loadCampaignData();
            this.loadStatisticsData();
            getShare().then((res) => {
                this.shareInfo = res.data;
            });
        },
        onLoad() {
            this.setOpenShare();
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
        methods: {
            toUrl(url) {
                uni.navigateTo({
                    url: url
                });
            },
            /**
             * 加载招募活动信息
             */
            loadCampaignData() {
                getRecruitmentCampaign().then(res => {
                    if (res.status === 200 && res.data) {
                        this.campaignData = res.data;
                    }
                }).catch(err => {
                    console.error('获取招募活动信息失败:', err);
                });
            },
            /**
             * 加载推广统计信息
             */
            loadStatisticsData() {
                getInviteStatistics().then(res => {
                    if (res.status === 200 && res.data) {
                        this.statisticsData = res.data;
                    }
                }).catch(err => {
                    console.error('获取推广统计信息失败:', err);
                });
            },
            // #ifdef H5
            // 微信分享；
            setOpenShare: function () {
                let that = this;
                let uid = this.uid ? this.uid : 0;
                if (that.$wechat.isWeixin()) {
                    getShare().then((res) => {
                        let data = res.data;
                        let configAppMessage = {
                            desc: data.synopsis,
                            title: data.title,
                            link: location.href + '?spid=' + uid,
                            imgUrl: data.img
                        };
                        that.$wechat.wechatEvevt(['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline'], configAppMessage);
                    });
                }
            }
            // #endif
        }
    }
</script>
<style scoped lang="less">
    .btn {
    width: 300rpx;
    height: 70rpx;
    border-radius: 20rpx;
}
.quxiao {
    color: #1A1A1A;
    font-size: 32rpx;
    border: 2rpx solid #E7E8E8;
    margin-right: 20rpx;
}
.baocun {
    color: #FFFFFF;
    background-color: #2769ED;
    font-weight: 500;
    font-size: 32rpx;
}
.m-b-60 {
    margin-bottom: 60rpx;
}
.r90 {
    transform: rotate(90deg);
}
.f68 {
    font-size: 68rpx;
}
.br-19 {
    border-radius: 19rpx;
}
.qr {
    width: 149rpx;
    height: 149rpx;
    background-color: #d8d8d8;
}
.mask{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(26, 26, 26, 0.3);
    .tan {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 568rpx;
        // height: 930rpx;
        background-color: #f3f2f7;
        font-size: 22rpx;
        color: #9e9e9e;
        .h345{
            height: 345rpx;
        }
        .br-t {
            border-radius: 15rpx 15rpx 0 0;
        }
    }
}
.icon {
    width: 80rpx;
    height: 80rpx;
}
.b-box {
    width: calc(100% - 40rpx);
}
.b0 {
    bottom: 76rpx;
}
.h362 {
    height: 362rpx;
}
.p-x-80 {
    padding: 0 80rpx;
}
.t0 {
    top: 0;
}
.h90 {
    height: 90rpx;
}
.f72{
    font-size: 72rpx;
}
.b-item{
    width: calc((100% - 40rpx) / 3);
    height: 210rpx;
}
.t-item {
    width: calc(100% / 3);
    height: 210rpx;
}
.p-t-104 {
    padding-top: 104rpx;
}
.r180 {
    transform: rotate(180deg);
}
.heng {
    width: 72rpx;
    height: 4rpx;
    background: linear-gradient(
        -90deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0) 100%
    );
    border-radius: 2rpx 2rpx 2rpx 2rpx;
}
.h360 {
    height: 360rpx;
}
.m-b-48 {
    margin-bottom: 48rpx;
}
.com {
    position: absolute;
}
.f80 {
    font-size: 80rpx;
}
.fc-d3 {
    color: #d3d3d3;
}
.f75 {
    font-size: 75rpx;
}
.p-l-48 {
    padding-left: 48rpx;
}
.bg {
    position: absolute;
    width: 100%;
    top: 0;
}

.w-10 {
    width: 10rpx;
}

.h-10 {
    height: 10rpx;
}

.rounded-full {
    border-radius: 50%;
}

.bg-lan {
    background-color: #2769ED;
}

.br-10 {
    border-radius: 10rpx;
}

.p-a-40 {
    padding: 40rpx;
}

.b-2 {
    border: 2rpx solid #e7e8e8;
}

.b-grey {
    border-color: #e7e8e8;
}

.rule-box {
    position: relative;
    overflow: visible;
    border-color: #9384d3;
}

.rule-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 10%;
    height: 2rpx;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
    box-shadow: 0 0 20rpx 2rpx rgba(255, 255, 255, 0.6);
    filter: blur(6rpx);
    z-index: 2;
}

.rule-box::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20%;
    height: 4rpx;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
    box-shadow: 0 0 16rpx 4rpx rgba(255, 255, 255, 0.6);
    filter: blur(6rpx);
    z-index: 2;
}

.p-t-40 {
    padding-top: 40rpx;
}

.p-b-20 {
    padding-bottom: 20rpx;
}

.p-x-40 {
    padding-left: 40rpx;
    padding-right: 40rpx;
}

.p-b-40 {
    padding-bottom: 40rpx;
}
</style>
