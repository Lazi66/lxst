<template>
    <view class="page">
        <l-topbar :is_minus="false" bgColor="#fff">
            <view class="x c f34 font-b fc0 w-a">官方服务</view>
        </l-topbar>
<!--        <view class="y c p-y-40">
            <view class="fw-500 fc-1a f40 m-b-10">创业服务</view>
            <view>专业指导，助你成功</view>
        </view> -->
        <view class="p-x-20">
            <view class="y c p-y-40 bg-k br-20">
                <view class="icon"><image class="img" :src="`${imgHost}/static/images/w/erji.png`"></image></view>
                <view class="fc-1a f36 fw-500 m-y-20">创业服务</view>
                <view class="f24 fc-50">长按识别二维码添加企业微信，获取专业指导</view>
                <view class="qr-box" @click="previewQrCode">
                    <view class="img bg-k br-12">
                        <image class="img" :src="configData.customer_qrcode" :show-menu-by-longpress="true"></image>
                    </view>
                </view>
                <!-- <view class="x c fc-bai f28 fw-500 br-12 bg-lan p-x-20 p-y-15" @click="toCustomerService">立即咨询</view> -->
                <!-- <button class="x c fc-bai f28 fw-500 br-12 bg-lan p-x-20 p-y-15" open-type='contact'>立即咨询</button> -->
            </view>
        </view>
        <view class="p-a-20 x c-y" v-if="isLogin && configDataOpen.review_mode == 0">
            <view class="biaoji tishi m-r-20"></view>
            <view class="f32 fw-700">AI员工</view>
        </view>
        <view class="p-x-20" v-if="isLogin && configDataOpen.review_mode == 0">
            <view class="ai-employees x flex-wrap p-x-10 m-b-20">
                <view class="ai-item y c jc-c" v-for="(item, index) in aiEmployees" :key="index" @click="handleAiClick(item)">
                    <view class="icon-wrap c c-y jc-c">
                        <image v-if="item.logo" :src="item.logo" class="role-icon-img" mode="aspectFill"></image>
                        <uv-icon v-else :name="item.icon || 'star'" color="#3A5DFB" size="28"></uv-icon>
                    </view>
                    <view class="ai-name fc-1a">{{item.name}}</view>
                </view>
            </view>
        </view>
        <view class="p-a-20 x c-y">
            <view class="biaoji tishi m-r-20"></view>
            <view class="f32 fw-700">招募活动</view>
        </view>
        <view class="p-b-20 p-x-20">
            <view class="bg-k p-x-20 p-y-30 x" @click="toRecruitmentCampaign">
                <view class="img-box m-r-20 o-h br-16 bg-2">
                    <image class="img" :src="recruitmentCampaignData.image"></image>
                </view>
                <view class="y jc-sb">
                    <view>
                        <view class="fc0 f32 fw-500 m-b-20">{{recruitmentCampaignData.title}}</view>
                        <view class="fc76 f24">{{recruitmentCampaignData.subtitle}}</view>
                    </view>
                    <view class="fc76 f24" v-if="recruitmentCampaignData.member_brokerage == 1">{{recruitmentCampaignData.start_time}}-{{recruitmentCampaignData.end_time}}</view>
                    <view class="fc76 f24" v-else>敬请期待</view>
                </view>
            </view>
        </view>
        <view style="height: 200rpx;"></view>
        <!-- <MainMenu value="fuwu"></MainMenu> -->
		<pageFooter :style="colorStyle"></pageFooter>
    </view>
</template>
<script>
import {
    HTTP_REQUEST_URL
} from '@/config/app';
import MainMenu from "./menu.vue";
import { siteConfig } from '@/api/api';
import { recruitmentCampaign, getAiRoleList } from '@/api/public';
import pageFooter from '@/components/pageFooter/index.vue';
import {
    getCustomer
} from '@/utils/index.js'
import { mapGetters } from 'vuex';
import Cache from '@/utils/cache';


export default {
    components: {
        MainMenu,
		pageFooter,
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    watch: {
        isLogin: {
            handler: function (newV) {
                if (newV) {
                    this.fetchAiRoles();
                }
            },
            immediate: true
        }
    },
    mounted() {
        siteConfig().then(res => {
            this.configData = res.data;
            console.log(this.configData);
        });
        recruitmentCampaign().then(res => {
            this.recruitmentCampaignData = res.data;
        });
    },
    data() {
        return {
            imgHost: HTTP_REQUEST_URL,
            configData: {},
            recruitmentCampaignData: {},
            aiEmployees: [],
            configDataOpen: Cache.get('BASIC_CONFIG') || {}
        }
    },
    methods: {
        fetchAiRoles() {
            getAiRoleList().then(res => {
                if (res.data && res.data.list) {
                    let roles = res.data.list;
                    // 手动添加数字管家和算力钱包到最后
                    roles.push({ name: '数字管家', icon: 'account' });
                    roles.push({ name: '算力钱包', icon: 'red-packet' });
                    this.aiEmployees = roles;
                }
            }).catch(err => {
                console.error('获取AI员工列表失败:', err);
            });
        },
        handleAiClick(item) {
            if (item.name === '算力钱包') {
                this.toUrl('/pages/w/computing_power_wallet');
            } else if (item.name === '数字管家') {
                this.toUrl('/pages/w/digital_human_task_list');
            } else {
                this.toUrl(`/pages/w/ai${item.id ? '?id=' + item.id : ''}`);
            }
        },
        toUrl(url) {
            if(!url) return
            uni.navigateTo({
                url,
            });
        },
        toRecruitmentCampaign() {
            if(this.recruitmentCampaignData.member_brokerage == 0) {
                uni.showToast({
                    title: '活动未开启',
                    icon: 'none'
                });
                return;
            }
            this.toUrl('/pages/w/yaoqing');
        },
        toCustomerService() {
            getCustomer(`/pages/extension/customer_list/chat`)
        },
        previewQrCode() {
            if (!this.configData.customer_qrcode) return;
            uni.previewImage({
                current: this.configData.customer_qrcode,
                urls: [this.configData.customer_qrcode],
                showmenu: true // 允许长按保存或识别二维码
            });
        }
    },
};
</script>
<style scoped lang="less">
.page {
    background-color: #f6f6f6;
    .img-box {
        width: 174rpx;
        height: 174rpx;
    }
}
.fc-1a {
    color: #1a1a1a;
}
.fc-50 {
    color: #50545d;
}
.tishi {
    background-color: #1677FF;
    width: 6rpx;
    height: 26rpx;
    border-radius: 200rpx;
}
.bg-lan{
    background-color: #2769ed;
}
.icon {
    width: 68rpx;
    height: 68rpx;
}
.qr-box {
    margin: 20rpx 0;
    width: 400rpx;
    height: 400rpx;
    border-radius: 12rpx;
    background-color: #d8d8d8;
    padding: 12rpx;
}
.ai-employees {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    border-radius: 16rpx;
    padding-top: 30rpx;
    padding-bottom: 20rpx;
}
.ai-item {
    width: 33.33%;
    margin-bottom: 30rpx;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
}
.icon-wrap {
    width: 96rpx;
    height: 96rpx;
    background-color: #eef3ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16rpx;
    overflow: hidden;
}
.role-icon-img {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
}
.ai-name {
    font-size: 26rpx;
    color: #333;
}
</style>