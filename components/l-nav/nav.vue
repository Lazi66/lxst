<template>
    <uv-navbar
        :title="title"
        :titleStyle="navTitleStyle"
        :leftIcon="fanhui ? 'arrow-left' : leftIcon ? leftIcon : ''"
        :leftIconColor="leftIconColor"
        :bgColor="bgColor"
        :placeholder="placeholder"
        :fixed="fixed"
        :autoBack="fanhui"
        titleWidth="500rpx"
        @leftClick="leftClick"></uv-navbar>
</template>
<script>
export default {
    options: {
        virtualHost: true,
    },
    props: {
        title: {
            type: String,
            default: "",
        },
        bgColor: {
            type: String,
            default: "#fff",
        },
        leftIcon: {
            type: String,
            default: "arrow-left",
        },
        fanhui: {
            type: Boolean,
            default: false,
        },
        // 是否浮动固定在顶部
        fixed: {
            type: Boolean,
            default: true
        },
        // 生成等高元素占位
        placeholder: {
            type: Boolean,
            default: true
        },
        // 左侧返回图标的颜色
        leftIconColor: {
            type: String,
            default: '#000'
        },
        // 标题的样式
        titleStyle: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        navTitleStyle() {
            return { ...this.titleStyle, fontSize: '34rpx', fontWeight: 'bold',color: '#000' }
        }
    },
    methods: {
        leftClick() {
            this.$emit("back");
        },
    },
};
</script>
<style lang="less" scoped></style>