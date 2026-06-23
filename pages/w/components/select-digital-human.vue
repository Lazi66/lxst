<template>
    <uv-popup ref="popup" mode="bottom" round="24" bg-color="transparent" :safeAreaInsetBottom="false" @close="handleClose">
        <view class="popup-container y">
            <!-- 顶部拖拽指示条 -->
            <view class="drag-bar c">
                <view class="bar-line"></view>
            </view>

            <!-- 标签栏 -->
            <view class="tab-bar x c">
                <view 
                    class="tab-item c" 
                    :class="{'active': activeTab === 'my'}" 
                    @click="switchTab(0)"
                >
                    <text class="tab-text">我的数字人</text>
                </view>
                <view 
                    class="tab-item c" 
                    :class="{'active': activeTab === 'public'}" 
                    @click="switchTab(1)"
                >
                    <text class="tab-text">公共数字人</text>
                </view>
            </view>

            <!-- 内容区域 -->
            <scroll-view scroll-y class="content-area">
                <!-- 我的数字人 -->
                <view class="grid-wrap" v-if="activeTab === 'my'">
                    <!-- 定制我的数字人 -->
                    <view class="grid-item add-item y c" @click="handleCreateDigitalHuman">
                        <uv-icon name="plus" color="#999" size="30"></uv-icon>
                        <text class="add-text">定制我的数字人</text>
                    </view>
                    <!-- 我的数字人列表 -->
                    <view 
                        class="grid-item y" 
                        v-for="(item, index) in myList" 
                        :key="'my-'+index"
                        :class="{'selected': selectedId === (item.virtualman_id || item.id)}"
                        :data-index="index"
                        data-type="0"
                        @click="onGridClick"
                    >
                        <image 
                            class="grid-img" 
                            :src="item.image_url" 
                            mode="aspectFill"
                            v-if="item.image_url"
                        ></image>
                        <view class="grid-img empty-img c" v-else>
                            <uv-icon name="account" color="#666" size="30"></uv-icon>
                        </view>
                        <view class="selected-mark c" v-if="selectedId === (item.virtualman_id || item.id)">
                            <uv-icon name="checkbox-mark" color="#fff" size="12"></uv-icon>
                        </view>
                    </view>
                </view>

                <!-- 公共数字人 -->
                <view class="grid-wrap" v-if="activeTab === 'public'">
                    <view 
                        class="grid-item y" 
                        v-for="(item, index) in publicList" 
                        :key="'pub-'+index"
                        :class="{'selected': selectedId === item.id}"
                        :data-index="index"
                        data-type="1"
                        @click="onGridClick"
                    >
                        <image class="grid-img" :src="item.coverUrl" mode="aspectFill"></image>
                        <text class="grid-name">{{ item.name }}</text>
                        <view class="selected-mark c" v-if="selectedId === item.id">
                            <uv-icon name="checkbox-mark" color="#fff" size="12"></uv-icon>
                        </view>
                    </view>
                </view>

                <!-- 加载状态 -->
                <view class="loading-box c" v-if="loading">
                    <text class="loading-text">加载中...</text>
                </view>
            </scroll-view>

            <!-- 底部确定按钮 -->
            <view class="bottom-bar">
                <view class="confirm-btn c" @click="handleConfirm">确定</view>
            </view>
        </view>
    </uv-popup>
</template>

<script>
import { getMyVirtualmanList, getPublicVirtualmanList } from '@/api/digitalHuman.js';

export default {
    name: 'SelectDigitalHuman',
    props: {
        // 当前已选中的数字人id
        currentId: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            activeTab: 'my',
            myList: [],
            publicList: [],
            selectedId: '',
            selectedItem: null,
            loading: false
        };
    },
    computed: {
        currentList() {
            return this.activeTab === 'my' ? this.myList : this.publicList;
        }
    },
    watch: {
        activeTab(val) {
            if (val === 'my' && this.myList.length === 0) {
                this.loadMyList();
            } else if (val === 'public' && this.publicList.length === 0) {
                this.loadPublicList();
            }
        }
    },
    methods: {
        async open() {
            try {
                this.selectedId = this.currentId || '';
                
                // 安全拷贝外部列表数据
                if (this.externalPublicList && Array.isArray(this.externalPublicList)) {
                    this.publicList = JSON.parse(JSON.stringify(this.externalPublicList));
                } else {
                    this.publicList = [];
                }

                // 确保先打开弹窗UI，再处理数据
                if (this.$refs.popup) {
                    this.$refs.popup.open();
                }

                if (!this.myList || this.myList.length === 0) {
                    await this.loadMyList();
                }

                // 回显逻辑：根据 currentId 找出它是哪个，并切换到对应的 tab
                if (this.selectedId) {
                    let foundInMy = Array.isArray(this.myList) ? this.myList.find(item => (item.virtualman_id || item.id) === this.selectedId) : null;
                    let foundInPublic = Array.isArray(this.publicList) ? this.publicList.find(item => item.id === this.selectedId) : null;
                    
                    if (foundInMy) {
                        this.selectedItem = { ...foundInMy, _type: 'my' };
                        this.activeTab = 'my';
                    } else if (foundInPublic) {
                        this.selectedItem = { ...foundInPublic, _type: 'public' };
                        this.activeTab = 'public';
                    } else {
                        this.activeTab = 'my';
                        this.selectedItem = null;
                    }
                } else {
                    this.activeTab = 'my';
                    this.selectedItem = null;
                }
            } catch (error) {
                console.error('打开数字人弹窗时发生错误:', error);
                // 发生错误时提供保底打开能力
                if (this.$refs.popup) {
                    this.$refs.popup.open();
                }
                this.activeTab = 'my';
            }
        },
        close() {
            if (this.$refs.popup) {
                this.$refs.popup.close();
            }
        },
        handleClose() {
            this.$emit('close');
        },
        switchTab(idx) {
            this.activeTab = idx === 0 ? 'my' : 'public';
        },
        async loadMyList() {
            this.loading = true;
            try {
                const res = await getMyVirtualmanList();
                if (res.data && res.data.list) {
                    this.myList = res.data.list;
                }
            } catch (e) {
                console.error('加载我的数字人失败', e);
            }
            this.loading = false;
        },
        async loadPublicList() {
            try {
                const res = await getPublicVirtualmanList();
                if (res.data && res.data.list) {
                    this.publicList = res.data.list;
                }
            } catch (e) {
                console.error('加载公共数字人失败', e);
            }
        },
        onGridClick(e) {
            const dataset = e.currentTarget.dataset;
            const typeIdx = parseInt(dataset.type);
            const index = parseInt(dataset.index);
            if (typeIdx === 0) {
                // 我的数字人
                const item = this.myList[index];
                this.selectedId = item.virtualman_id || item.id;
                this.selectedItem = { ...item, _type: 'my' };
            } else {
                // 公共数字人
                const item = this.publicList[index];
                this.selectedId = item.id;
                this.selectedItem = { ...item, _type: 'public' };
            }
        },
        handleConfirm() {
            if (!this.selectedId) {
                uni.showToast({ title: '请选择一个数字人', icon: 'none' });
                return;
            }
            this.$emit('confirm', this.selectedItem);
            this.close();
        },
        handleCreateDigitalHuman() {
            this.close();
            uni.navigateTo({
                url: '/pages/w/create_digital_human'
            });
        }
    }
};
</script>

<style scoped>
.popup-container {
    background: #fff;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
    height: 70vh;
    display: flex;
    flex-direction: column;
}
.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { display: flex; align-items: center; justify-content: center; }

/* 顶部拖拽条 */
.drag-bar {
    padding: 20rpx 0 10rpx;
    flex-shrink: 0;
}
.bar-line {
    width: 60rpx;
    height: 8rpx;
    background: #e0e0e0;
    border-radius: 4rpx;
}

/* 标签栏 */
.tab-bar {
    padding: 20rpx 0 30rpx;
    flex-shrink: 0;
}
.tab-item {
    padding: 0 40rpx;
    position: relative;
}
.tab-text {
    font-size: 30rpx;
    color: #999;
    font-weight: 500;
}
.tab-item.active .tab-text {
    color: #333;
    font-weight: bold;
}
.tab-item.active::after {
    content: '';
    position: absolute;
    bottom: -10rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 40rpx;
    height: 6rpx;
    background: #1677FF;
    border-radius: 3rpx;
}

/* 内容区域 */
.content-area {
    box-sizing: border-box;
    flex: 1;
    padding: 0 30rpx;
    min-height: 0;
}

.grid-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20rpx;
    padding-bottom: 30rpx;
}

.grid-item {
    width: calc((100% - 40rpx) / 3);
    border-radius: 16rpx;
    overflow: hidden;
    position: relative;
    background: #f5f5f5;
    border: 4rpx solid #fff;
}

.grid-img {
    width: 100%;
    height: 280rpx;
    border-radius: 16rpx;
}

.empty-img {
    background: #eee;
    border-radius: 16rpx;
}

.grid-name {
    font-size: 22rpx;
    color: #666;
    text-align: center;
    padding: 10rpx 6rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 添加按钮 */
.add-item {
    border: 2rpx dashed #ccc;
    background: transparent;
    height: 280rpx;
    justify-content: center;
}
.add-text {
    font-size: 22rpx;
    color: #999;
    margin-top: 16rpx;
}

/* 选中状态 */
.grid-item.selected {
    border-color: #1677FF;
}
.selected-mark {
    position: absolute;
    top: 8rpx;
    right: 8rpx;
    width: 36rpx;
    height: 36rpx;
    background: #1677FF;
    border-radius: 50%;
}

/* 加载状态 */
.loading-box {
    padding: 60rpx 0;
}
.loading-text {
    font-size: 26rpx;
    color: #888;
}

/* 底部按钮 */
.bottom-bar {
    padding: 20rpx 30rpx;
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
    flex-shrink: 0;
}
.confirm-btn {
    width: 100%;
    height: 96rpx;
    background: #1677FF;
    border-radius: 20rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
}
</style>
