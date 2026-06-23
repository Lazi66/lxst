<template>
    <view>
        <l-tabbar bgColor="#fff">
            <view class="menu-box">
                <view
                    class="y c flex-1 pos-r"
                    v-for="(v, k) in menu"
                    :key="k"
                    @click="toMenu(v)"
                >
                    <view class="icon">
                        <image class="img" :src="value === v.key ? v.fill : v.icon"></image>
                    </view>
                    <view
                        class="name"
                        :class="{ 'ac-name': value === v.key }"
                        >{{ v.name }}</view
                    >
                </view>
            </view>
        </l-tabbar>
    </view>
</template>

<script>
export default {
    options: {
        virtualHost: true,
    },
    props: {
        value: {
            type: String,
            default: "home",
        },
    },
    data() {
        // this.store = useUserStore();
        return {
            show: false,
            menu: [
                {
                    key: "home",
                    name: "首页",
                    icon: "/static/images/w/index.png",
                    fill: "/static/images/w/index_fill.png",
                    url: "/pages/index_/index",
                    is_login: false,
                },{
                    key: 'chuangye',
                    name: '创业记录',
                    icon: '/static/images/w/cy.png',
                    fill: '/static/images/w/cy_fill.png',
                    url: '/pages/index_/chuangye',
                    is_login: false,
                },{
                    key: 'fuwu',
                    name: '服务',
                    icon: '/static/images/w/fw.png',
                    fill: '/static/images/w/fw_fill.png',
                    url: '/pages/index_/fuwu',
                    is_login: false,
                },{
                    key: 'my',
                    name: '我的',
                    icon: '/static/images/w/my.png',
                    fill: '/static/images/w/my_fill.png',
                    url: '/pages/index_/my',
                    is_login: false,
                }
            ],
        };
    },
    methods: {
        async toMenu(v) {
            if (v.key === this.value) return;
            // if (v.is_login) {
            //     const is_login = await this.store.isLogin();
            //     if (!is_login) {
            //         return;
            //     }
            // }
            uni.switchTab({
                url: v.url,
            });
            // this.to(v.url, 'all')
        },
    },
};
</script>
<style lang="less" scoped>
.menu-box {
    display: flex;
    height: 50px;
    z-index: 200;
}
.icon {
    width: 22px;
    height: 22px;
    overflow: hidden;
}
.name {
    font-size: 12px;
    // line-height: 16.5px;
    color: #DAE1E9;
    padding-top: 0px;
    font-weight: 500;
}
.ac-name {
    color: #2769ED;
}
</style>
