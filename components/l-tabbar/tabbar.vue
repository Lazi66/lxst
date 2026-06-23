<template>
    <view class="fu-tabbar" :style="{ height: fuHeight, 'min-height': fuHeight }">
        <view class="y tabbar" id="tabbarId" :style="getTabbarStyle">
            <slot></slot>
            <view class="safe-bottom"></view>
        </view>
    </view>
</template>
<script>
export default {
    options: {
        virtualHost: true,
    },
    props: {
        bgColor: {
            type: String,
            default: '#fff'
        },
        // 生成等高元素占位
        placeholder: {
            type: Boolean,
            default: true
        },
    },
    computed: {
        getTabbarStyle() {
            return `
                background: ${this.bgColor};
            `
        }
    },
    mounted() {
        this.getHeight()
    },
    data() {
        return {
            fuHeight: 0
        }
    },
    methods: {
        getHeight() {
            if (!this.placeholder) {
                return
            }
            this.$nextTick(() => {
                const query = uni.createSelectorQuery().in(this);
                query
                    .select("#tabbarId")
                    .boundingClientRect((data) => {
                        this.fuHeight = data.height + 'px'
                    })
                    .exec();
            });
        },
    },
};
</script>
<style lang="less" scoped>
.fu-tabbar {
    width: 100vw;
    .tabbar {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9999;
        .safe-bottom {
            background: inherit;
            width: 100%;
            padding-bottom: constant(safe-area-inset-bottom);
            padding-bottom: env(safe-area-inset-bottom);
            position: relative;
            z-index: 9999;
        }
    }
}
</style>
