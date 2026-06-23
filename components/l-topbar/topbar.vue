<template>
    <view>
        <view class="nav o-h" :style="navStyle">
            <view class="tool" :style="toolStyle">
                <slot></slot>
            </view>
        </view>
        <view class="place" :style="placeStyle" v-if="placeholder && fixed"></view>
    </view>
</template>

<script>
export default {
    options: {
        virtualHost: true,
    },
    props: {
        // 是否生成等高元素
        placeholder: {
            type: Boolean,
            default: true,
        },
        bgColor: {
            type: String,
            default: 'rgba(0, 0, 0, 0)',
        },
        bg: {
            type: String,
            default: ''
        },
        isAutoH: {
            type: Boolean,
            default: false,
        },
        // 是否浮动固定在顶部
        fixed: {
            type: Boolean,
            default: true
        },
        is_minus: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            titleHeight: 44, //状态栏和导航栏的总高度
            statusBarHeight: 0, //状态栏高度
            naviBarHeight: 0, //导航栏高度
            fuHeight: 0, // 真实高度
        }
    },
    created() {
        const res = uni.getSystemInfoSync()
        const system = res.platform
        this.statusBarHeight = res.statusBarHeight
        if (system === 'android') {
            this.titleHeight = 48
        } else if (system === 'ios') {
            this.titleHeight = 44
        }
        this.naviBarHeight = this.titleHeight + this.statusBarHeight
    },
    computed: {
        navStyle() {
            //
            return `
                height: ${this.isAutoH ? this.fuHeight : this.naviBarHeight}px;
                padding-top: ${this.statusBarHeight}px;
                background-color: ${this.bgColor};
                position: ${this.fixed ? 'fixed' : 'relative'};
                ${this.bg ? 'background: ' + this.bg : ''}
			`
        },
        placeStyle() {
            return `
                height: ${this.isAutoH ? this.fuHeight : this.naviBarHeight}px;
                padding-top: ${this.statusBarHeight}px;
                background-color: ${this.bgColor};
			`
        },
        toolStyle() {
            let w = '100vw'
            // #ifdef MP-WEIXIN
            const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
            // console.log('\u{1F680}', '???', menuButtonInfo);
            if (this.is_minus) {
                w = menuButtonInfo.left + 'px'
            }
            // #endif
            return `
                width: ${w};
                height: ${this.isAutoH ? 'fit-content' : 44}px
            `
        },
    },
    mounted() {
        this.getHeight()
    },
    methods: {
        getHeight() {
            this.$nextTick(() => {
                const query = uni.createSelectorQuery().in(this)
                query
                    .select('.tool')
                    .boundingClientRect(data => {
                        this.fuHeight = data.height + this.statusBarHeight
                    })
                    .exec()
            })
        },
        getTopbarH() {
            return this.fuHeight
        }
    },
}
</script>

<style lang="less">
@nav-height: 44px;
@border-color: #e2e2e2;
@font-color: #000000;
.nav {
    // position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .tool {
        position: absolute;
        display: flex;
        left: 0;
        align-items: center;
    }
}
</style>
