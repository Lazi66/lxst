<template>
    <view class="page pos-r">
        <!-- 顶部蓝色渐变背景 -->
        <view class="header-bg"></view>

        <l-topbar :is_minus="false" bgColor="transparent">
            <view class="x c f34 font-b fc-bai w-a">创业记录仪</view>
        </l-topbar>

        <view class="page-content">
            <!-- 日期选择 -->
            <view class="date-row x c-y p-x-30 p-t-10 p-b-20">
                <text class="date-text">{{ formattedToday }}</text>
                <view class="m-l-10"><uv-icon name="arrow-down-fill" color="#fff" size="12"></uv-icon></view>
            </view>

            <!-- 今日数据卡片 -->
            <view class="p-x-30">
                <view class="data-card">
                    <!-- 收入 / 成本 -->
                    <view class="x b-b p-b-30 m-b-30">
                        <view class="flex-1">
                            <view class="label-text m-b-10">今日收入</view>
                            <view class="amount-text blue">¥{{ todayData.income || '0' }}</view>
                        </view>
                        <view class="flex-1">
                            <view class="label-text m-b-10">今日成本</view>
                            <view class="amount-text dark">¥{{ todayData.cost || '0' }}</view>
                        </view>
                    </view>
                    <!-- 利润 + 环形图 -->
                    <view class="x c-y" style="padding-bottom: 16rpx;">
                        <view class="flex-1">
                            <view class="label-text" style="padding-bottom: 16rpx;">今日利润</view>
                            <view class="amount-text blue">¥{{ todayData.profit || '0' }}</view>
                            <view class="x c-y m-t-10">
                                <uv-icon
                                    :name="profitRateUp ? 'arrow-up-fill' : 'arrow-down-fill'"
                                    :color="profitRateUp ? '#49CD92' : '#F56C6C'"
                                    size="16"
                                ></uv-icon>
                                <text class="rate-text" :class="{ 'fc-green': profitRateUp, 'fc-red': !profitRateUp }">{{ todayData.profit_rate || '0' }}%</text>
                            </view>
                        </view>
                        <view class="huan-wrapper">
                            <view class="huan">
                                <qiun-data-charts
                                    ref="topChart"
                                    type="arcbar"
                                    canvas2d
                                    canvasId="topArcbarChart"
                                    :opts="{
                                        extra: {
                                            arcbar: {
                                                type: 'circle',
                                                width: 6,
                                                startAngle: 1.5,
                                            },
                                        },
                                        subtitle: {
                                            name: todayData.profit_rate + '%' || '0%',
                                            fontSize: '13',
                                            color: '#16181d',
                                        },
                                        title: {
                                            name: '',
                                        },
                                    }"
                                    :chartData="{
                                        series: [
                                            {
                                                data: parseFloat(todayData.profit_rate || '0') / 100,
                                                color: '#2769ED',
                                            },
                                        ],
                                    }"
                                />
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 记录今日数据按钮 -->
            <view class="p-x-30 m-t-30 m-b-20">
                <view class="record-btn x c" @click="show_jilu = true">
                    <uv-icon name="plus-circle-fill" color="#2769ED" size="20"></uv-icon>
                    <text class="record-btn-text m-l-10">记录今日数据</text>
                </view>
            </view>

            <!-- 本周利润趋势 -->
            <view class="section-header x c-y jc-sb p-x-30 p-b-30" style="padding-top: 40rpx;">
                <text class="section-title">{{ trendTypeText }}利润趋势</text>
                <view class="position-relative" @click="showTrendSelector = !showTrendSelector">
                    <view class="x c-y" style="align-items: center;">
                        <text class="section-link">查看详细分析</text>
                        <view class="m-l-5"><uv-icon :name="showTrendSelector ? 'arrow-up' : 'arrow-right'" color="#2769ED" size="12"></uv-icon></view>
                    </view>
                    <!-- 下拉选择框 -->
                    <view v-if="showTrendSelector" class="trend-selector">
                        <view @click.stop="switchTrendType('week'); showTrendSelector = false" :class="{ 'fc-lan': trendType === 'week' }" class="selector-item">本周</view>
                        <view @click.stop="switchTrendType('month'); showTrendSelector = false" :class="{ 'fc-lan': trendType === 'month' }" class="selector-item">本月</view>
                        <view @click.stop="switchTrendType('year'); showTrendSelector = false" :class="{ 'fc-lan': trendType === 'year' }" class="selector-item">本年</view>
                    </view>
                </view>
            </view>
            <view class="section-block">
                <view class="p-x-30 p-y-30">
                    <view class="chart-scroll-container">
                        <scroll-view scroll-x="true" class="chart-scroll-view">
                            <view :style="{ width: trendType === 'month' ? '1200rpx' : trendType === 'year' ? '1800rpx' : '100%' }">
                                <view class="chart-box" v-if="chartLoaded">
                                    <qiun-data-charts
                                        v-if="chartLoaded"
                                        :key="trendType"
                                        type="line"
                                        canvas2d
                                        canvasId="trendLineChart"
                                        :opts="{
                                            dataLabel: false,
                                            xAxis: {
                                                calibration: true,
                                                labelCount: 0,
                                                disableGrid: false,
                                                gridType: 'dash',
                                            },
                                            yAxis: {
                                                splitNumber: 3,
                                            },
                                            legend: {
                                                show: false,
                                            },
                                        }"
                                        :chartData="{
                                            categories: trendData.map(item => item.weekday || item.date || item.month || item.year),
                                            series: [
                                                {
                                                    name: '',
                                                    data: trendData.map(item => parseFloat(item.profit || '0')),
                                                },
                                            ],
                                        }"
                                    />
                                </view>
                            </view>
                        </scroll-view>
                    </view>
                </view>
            </view>

            <!-- 月度盈利挑战 -->
            <view class="section-header x c-y jc-sb p-x-30 p-b-30" style="padding-top: 50rpx;">
                <text class="section-title">月度盈利挑战</text>
                <view class="x c-y" @click="show_set = true" style="align-items: center;">
                    <text class="section-link-gray">设置目标</text>
                    <view class="m-l-5"><uv-icon name="arrow-right" color="#999" size="12"></uv-icon></view>
                </view>
            </view>
            <view class="section-block">
                <view class="p-x-30 p-y-30">
                    <view class="challenge-card x c-y">
                        <view class="b-huan-wrapper">
                            <view class="b-huan">
                                <qiun-data-charts
                                    ref="bottomChart"
                                    type="arcbar"
                                    canvas2d
                                    canvasId="bottomArcbarChart"
                                    :opts="{
                                        extra: {
                                            arcbar: {
                                                type: 'circle',
                                                width: 6,
                                                startAngle: 1.5,
                                            },
                                        },
                                        title: {
                                            name: monthTarget.completion_rate + '%' || '0%',
                                            fontSize: '12',
                                            color: '#1A1A1A',
                                        },
                                        subtitle: {
                                            name: '目标完成度',
                                            fontSize: '10',
                                            color: '#666666',
                                        },
                                    }"
                                    :chartData="{
                                        series: [
                                            {
                                                data: parseFloat(monthTarget.completion_rate || '0') / 100,
                                                color: '#2769ED',
                                            },
                                        ],
                                    }"
                                />
                            </view>
                        </view>
                        <view class="challenge-stat y c-x">
                            <text class="stat-label">月度目标</text>
                            <text class="stat-value">¥{{ monthTarget.monthly_target || '0' }}</text>
                        </view>
                        <view class="challenge-stat y c-x">
                            <text class="stat-label">当前完成</text>
                            <text class="stat-value">¥{{ monthTarget.current_profit || '0' }}</text>
                        </view>
                        <view class="challenge-stat y c-x">
                            <text class="stat-label">剩余天数</text>
                            <text class="stat-value">{{ monthTarget.remaining_days || '0' }}天</text>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 底部安全距离 -->
            <view style="height: 120rpx;"></view>
        </view>

        <view style="height: 100rpx;"></view>

        <!-- 设置月度目标弹窗 -->
        <view v-if="show_set" class="maskSet" @click="show_set = false">
            <view class="tan y" @click.stop>
                <view class="box fc-1a">
                    <view class="x c-y jc-sb m-b-30">
                        <view class="fw-500 f40">设置月度目标</view>
                        <uv-icon @click="show_set=false" name="close" color="#999999" size="28"></uv-icon>
                    </view>
                    <view class="f28 m-b-20">月度盈利目标(元)</view>
                    <view class="input-wrap">
                        <input v-model="monthlyTargetInput" class="f28 fc-1a search-input" type="number" placeholder="请输入" />
                    </view>
                    <view class="f24 fc50 m-b-20 m-t-10">建议设置合理的目标，保持挑战性</view>
                    <view class="x c-y jc-sb">
                        <view @click="show_set = false" class="quxiao x c btn">取消</view>
                        <view @click="saveMonthTarget" class="baocun x c btn">保存目标</view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 记录今日数据弹窗 -->
        <view v-if="show_jilu" class="maskSet" @click="show_jilu = false">
            <view class="tan y" @click.stop>
                <view class="box fc-1a">
                    <view class="x c-y jc-sb m-b-30">
                        <view class="fw-500 f40">记录今日数据</view>
                        <uv-icon @click="show_jilu=false" name="close" color="#999999" size="28"></uv-icon>
                    </view>
                    <view class="f28 m-b-20">今日收入(元)</view>
                    <view class="input-wrap m-b-20">
                        <input v-model="todayIncomeInput" class="f28 fc-1a search-input" type="number" placeholder="请输入" />
                    </view>
                    <view class="f28 m-b-20">今日成本</view>
                    <view class="input-wrap m-b-20">
                        <input v-model="todayCostInput" class="f28 fc-1a search-input" type="number" placeholder="请输入" />
                    </view>
                    <view class="x c-y jc-sb">
                        <view @click="show_jilu = false" class="quxiao x c btn">取消</view>
                        <view @click="saveTodayData" class="baocun x c btn">保存数据</view>
                    </view>
                </view>
            </view>
        </view>

		<pageFooter :style="colorStyle"></pageFooter>
    </view>
</template>
<script>
import {
    HTTP_REQUEST_URL
} from '@/config/app';
import MainMenu from "./menu.vue";
import { getStartupIndex, saveStartupToday, setStartupMonthTarget, getStartupTrend } from '@/api/api.js';
import pageFooter from '@/components/pageFooter/index.vue';
import { mapGetters } from 'vuex';
import { toLogin } from '@/libs/login.js';
import { getUserInfo } from '@/api/user.js';

export default {
    components: {
        MainMenu,
		pageFooter,
    },
    data() {
        return {
            imgHost: HTTP_REQUEST_URL,
            show_set: false,
            show_jilu: false,
            today: '',
            todayData: {
                income: '0',
                cost: '0',
                profit: '0',
                profit_rate: '0'
            },
            weekTrend: [
                { weekday: '周一', profit: '0' },
                { weekday: '周二', profit: '0' },
                { weekday: '周三', profit: '0' },
                { weekday: '周四', profit: '0' },
                { weekday: '周五', profit: '0' },
                { weekday: '周六', profit: '0' },
                { weekday: '周日', profit: '0' }
            ],
            trendType: 'week',
            trendData: [
                { weekday: '周一', profit: '0' },
                { weekday: '周二', profit: '0' },
                { weekday: '周三', profit: '0' },
                { weekday: '周四', profit: '0' },
                { weekday: '周五', profit: '0' },
                { weekday: '周六', profit: '0' },
                { weekday: '周日', profit: '0' }
            ],
            showTrendSelector: false,
            monthTarget: {
                monthly_target: '0',
                current_profit: '0',
                completion_rate: '0',
                remaining_days: 0
            },
            monthlyTargetInput: '',
            todayIncomeInput: '',
            todayCostInput: '',
            chartLoaded: false,
            noVip: false,
            userInfo: {},
        };
    },
    computed: {
        profitRateUp() {
            return !this.todayData.profit_rate.includes('-');
        },
        formattedToday() {
            if (!this.today) return '';
            // 将 2026-03-05 格式转为 2026年03月05日
            const parts = this.today.split('-');
            if (parts.length === 3) {
                return parts[0] + '年' + parts[1] + '月' + parts[2] + '日';
            }
            return this.today;
        },
        trendTypeText() {
            switch(this.trendType) {
                case 'week': return '本周';
                case 'month': return '本月';
                case 'year': return '本年';
                default: return '本周';
            }
        },
        ...mapGetters(['isLogin']),
    },
    mounted() {
    },
    onShow() {
        if(!this.isLogin){
            uni.showModal({
                title: '提示',
                content: '未登录，请先登录',
                showCancel: true,
                confirmText: '去登录',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                        toLogin();
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                },
                fail: function (res) {
                    console.log('showModal', res);
                }
            });
            return;
        }
        //获取个人用户信息
        this.getUserInfo();

    },
    methods: {
        /**
		 * 获取个人用户信息
		 */
		getUserInfo: function () {
			let that = this;
			getUserInfo().then((res) => {
				that.userInfo = res.data;
                if(that.userInfo.is_money_level > 0){
                    this.loadStartupData();
                }
			});
		},
        /**
         * 加载创业记录仪数据
         */
        loadStartupData(reloadTrend = true) {
            getStartupIndex().then(res => {
                if (res.status === 200 && res.data) {
                    this.today = res.data.today || '';
                    this.todayData = res.data.today_data || this.todayData;
                    this.weekTrend = res.data.week_trend || this.weekTrend;
                    this.monthTarget = res.data.month_target || this.monthTarget;
                }
                if(reloadTrend){
                    this.loadTrendData(this.trendType);
                }


            }).catch(err => {
                console.error('获取创业记录仪数据失败:', err);
            });
        },
        /**
         * 切换趋势类型
         * @param string type 趋势类型：week(本周)、month(本月)、year(本年)
         */
        switchTrendType(type) {
            this.trendType = type;
            this.loadTrendData(type);
        },
        /**
         * 加载趋势数据
         * @param string type 趋势类型：week(本周)、month(本月)、year(本年)
         */
        loadTrendData(type) {
            // 先设置为false，确保重新渲染
            this.chartLoaded = false;
            
            getStartupTrend(type).then(res => {
                console.log('获取趋势数据成功:', res);
                if (res.status === 200 && res.data) {
                    this.trendData = res.data || [];

                    // 数据加载完成后，在下一个事件循环中设置为true
                    setTimeout(() => {
                        this.chartLoaded = true;
                    }, 50);
                }else if (res.status == 400097) {
                    this.noVip = true;
                    uni.showModal({
                        title: '提示',
                        content: '您不是会员或会员已到期，无法查看趋势数据',
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
                }
            });
        },
        /**
         * 保存今日数据
         */
        saveTodayData() {
            const data = {
                income: this.todayIncomeInput,
                cost: this.todayCostInput
            };
            
            saveStartupToday(data).then(res => {
                if (res.status === 200) {
                    uni.showToast({
                        title: '保存成功',
                        icon: 'success'
                    });
                    this.show_jilu = false;
                    this.loadStartupData();
                }
            }).catch(err => {
                console.error('保存今日数据失败:', err);
                uni.showToast({
                    title: '保存失败',
                    icon: 'none'
                });
            });
        },
        /**
         * 保存月度目标
         */
        saveMonthTarget() {
            const data = {
                monthly_target: this.monthlyTargetInput
            };
            
            setStartupMonthTarget(data).then(res => {
                if (res.status === 200) {
                    uni.showToast({
                        title: '保存成功',
                        icon: 'success'
                    });
                    this.show_set = false;
                    this.loadStartupData(false);
                }
            }).catch(err => {
                console.error('设置月度目标失败:', err);
                uni.showToast({
                    title: '保存失败',
                    icon: 'none'
                });
            });
        }
    },
};
</script>
<style scoped lang="less">
/* ========== 页面基础 ========== */
.page {
    background-color: #f5f6fa;
    min-height: 100vh;
}

.page-scroll {
    height: 100vh;
    box-sizing: border-box;
}

/* ========== 顶部蓝色渐变背景 ========== */
.header-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 480rpx;
    background: linear-gradient(#3276ff 0%, #74a2ff 100%);
    z-index: 0;
}

/* ========== 日期行 ========== */
.date-row {
    position: relative;
    z-index: 1;
}

.date-text {
    font-size: 28rpx;
    color: #fff;
}

/* ========== 今日数据卡片 ========== */
.data-card {
    position: relative;
    z-index: 1;
    background: #fff;
    border-radius: 24rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(39, 105, 237, 0.08);
}

.label-text {
    font-size: 28rpx;
    color: #666;
}

.amount-text {
    font-size: 48rpx;
    font-weight: 700;
    line-height: 1.2;
}

.amount-text.blue {
    color: #2769ED;
}

.amount-text.dark {
    color: #16181d;
}

.rate-text {
    font-size: 26rpx;
    margin-left: 6rpx;
}

.fc-green {
    color: #49CD92;
}

.fc-red {
    color: #F56C6C;
}

.b-b {
    border-bottom: 2rpx solid #f0f0f2;
}

/* ========== 环形图 ========== */
.huan-wrapper,
.huan {
    width: 160rpx;
    height: 160rpx;
    position: relative;
}

.huan {
    overflow: hidden;
}

/* ========== 记录按钮 ========== */
.record-btn {
    position: relative;
    z-index: 1;
    background: #fff;
    padding: 24rpx 0;
}

.record-btn-text {
    font-size: 32rpx;
    color: #2769ED;
    font-weight: 500;
}

/* ========== 区块通用 ========== */
.section-block {
    background: #fff;
    border-radius: 24rpx;
    margin: 0 30rpx;
    overflow: hidden;
}

.section-title {
    font-size: 36rpx;
    font-weight: 700;
    color: #16181d;
}

.section-link {
    font-size: 26rpx;
    color: #2769ED;
}

.section-link-gray {
    font-size: 26rpx;
    color: #999;
}

/* ========== 趋势图 ========== */
.chart-scroll-container {
    width: 100%;
    overflow: hidden;
}

.chart-scroll-view {
    width: 100%;
    white-space: nowrap;
}

.chart-box {
    height: 420rpx;
}

.position-relative {
    position: relative;
}

.trend-selector {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 9999;
    min-width: 140rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
    margin-top: 10rpx;
    padding: 10rpx 0;
    background-color: #fff;
    border-radius: 16rpx;
}

.selector-item {
    padding: 16rpx 24rpx;
    font-size: 28rpx;
    color: #333;
}

.fc-lan {
    color: #2769ED;
}

/* ========== 月度盈利挑战 ========== */
.challenge-card {
    border-radius: 16rpx;
    padding: 30rpx 20rpx;
}

.b-huan-wrapper,
.b-huan {
    width: 160rpx;
    height: 160rpx;
    position: relative;
}

.b-huan {
    overflow: hidden;
}

.challenge-stat {
    flex: 1;
    text-align: center;
}

.stat-label {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 10rpx;
}

.stat-value {
    font-size: 28rpx;
    font-weight: 600;
    color: #16181d;
}

/* ========== 弹窗 ========== */
.maskSet {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(26, 26, 26, 0.3);
    z-index: 10000;
    .tan {
        position: fixed;
        top: 50%;
        transform: translate(0, -50%);
        width: 100%;
        padding: 0 30rpx;
        z-index: 10001;
        .box {
            border-radius: 24rpx;
            background-color: #fff;
            padding: 40rpx;
            position: relative;
            z-index: 10002;
        }
    }
}

.btn {
    width: 280rpx;
    height: 88rpx;
    border-radius: 20rpx;
    font-size: 32rpx;
}

.quxiao {
    color: #1A1A1A;
    border: 2rpx solid #E7E8E8;
    margin-right: 20rpx;
}

.baocun {
    color: #FFFFFF;
    background-color: #2769ED;
    font-weight: 500;
}

.input-wrap {
    border: 2rpx solid #e7e8e8;
    border-radius: 16rpx;
    height: 88rpx;
    padding: 0 30rpx;
}

.search-input {
    border: none;
    outline: none;
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
}

.fc50 {
    color: #50545d;
}

.fc-1a {
    color: #1a1a1a;
}
</style>
