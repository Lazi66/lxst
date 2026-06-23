<template>
    <view class="page-container y">
        <!-- 导航栏 -->
        <l-nav :title="`${step}. 选择数字人和画面`" bg-color="#f8f9fa" @back="handleBack">
            <view slot="right" class="nav-right" @click="handleTemplate">
                <view class="template-btn x c-y">
                    <uv-icon name="grid" color="#666" size="14"></uv-icon>
                    <text class="template-text m-l-10">使用模板</text>
                </view>
            </view>
        </l-nav>

        <scroll-view scroll-y class="content-scroll flex-1">
            <view class="content-padding y">
                
                <!-- 选择数字人 -->
                <view class="section y">
                    <view class="section-header x c-y jc-sb" @click="openHumanSelect">
                        <text class="section-title">选择数字人</text>
                        <uv-icon name="arrow-right" color="#999" size="14"></uv-icon>
                    </view>
                    <scroll-view scroll-x class="h-scroll m-t-20 pt-10 pb-10">
                        <view class="h-scroll-content x">
                            <!-- 定制数字人 -->
                        <view class="custom-card y c" @click="handleCreateHuman">
                            <uv-icon name="plus" color="#666" size="24"></uv-icon>
                            <text class="custom-text m-t-10">定制我的数字人</text>
                        </view>
                        
                        <!-- 数字人列表 -->
                        <view 
                            class="card-item human-item y" 
                            v-for="(item, index) in humanList" 
                            :key="item.id" 
                            :class="{active: String(selectedHumanId) === String(item.id)}"
                            :data-index="index"
                            @click="selectHumanFromScroll"
                        >
                            <image class="human-img" :src="item.coverUrl || item.cover_url || item.cover" mode="aspectFill"></image>
                            <view class="human-name-tag c">{{ item.name }}</view>
                            <view class="check-icon c" v-if="String(selectedHumanId) === String(item.id)">
                                <uv-icon name="checkbox-mark" color="#fff" size="12"></uv-icon>
                            </view>
                        </view>
                        </view>
                    </scroll-view>
                </view>

                <!-- 选择声音 -->
                <view class="section y m-t-60">
                    <view class="section-header x c-y jc-sb" @click="openVoicePopup">
                        <text class="section-title">选择声音</text>
                        <uv-icon name="arrow-right" color="#999" size="14"></uv-icon>
                    </view>
                    <scroll-view scroll-x class="h-scroll m-t-20 pt-10 pb-10">
                        <view class="h-scroll-content x">
                            <!-- 定制配音 -->
                            <view class="custom-card small-card y c" @click="handleCustomVoice">
                                <uv-icon name="plus" color="#666" size="20"></uv-icon>
                                <text class="custom-text m-t-10">定制配音</text>
                            </view>
                            
                            <!-- 声音列表 -->
                            <view 
                                class="card-item small-card voice-item y c" 
                                v-for="item in voiceList" 
                                :key="item.id" 
                                :class="{active: curVoice === item.id}" 
                                @click="selectVoice(item)"
                            >
                                <image class="voice-avatar" :src="item.coverUrl" mode="aspectFill"></image>
                                <view class="voice-name-tag c" :class="{active: curVoice === item.id}">{{ item.name }}</view>
                                
                                <!-- 播放动画 -->
                                <view class="waveform-box c" v-if="curVoice === item.id && isVoicePlaying">
                                    <view class="waveform-bar bar1"></view>
                                    <view class="waveform-bar bar2"></view>
                                    <view class="waveform-bar bar3"></view>
                                </view>

                                <view class="check-icon c" v-if="curVoice === item.id">
                                    <uv-icon name="checkbox-mark" color="#fff" size="10"></uv-icon>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                    
                    <!-- 语速 -->
                    <!-- <view class="speed-row x c-y m-t-30">
                        <text class="speed-label">语速</text>
                        <slider class="flex-1 m-l-20 m-r-20" :value="speed" @change="speed=$event.detail.value" :min="0.5" :max="2" :step="0.1" activeColor="#1677FF" backgroundColor="#e8e8e8" block-size="16" />
                        <text class="speed-val">{{speed.toFixed(1)}}x</text>
                    </view> -->
                </view>

                <!-- 选择剪辑风格 -->
                <view class="section y m-t-60">
                    <view class="section-header x c-y jc-sb">
                        <text class="section-title">选择剪辑风格</text>
                        <uv-icon name="arrow-right" color="#999" size="14"></uv-icon>
                    </view>
                    <scroll-view scroll-x class="h-scroll m-t-20 pt-10 pb-10" @scrolltolower="loadClipStyles(true)">
                        <view class="h-scroll-content x">
                            <!-- 接口返回风格 -->
                            <view 
                                class="card-item style-card y" 
                                v-for="item in clipStyleList" 
                                :key="item.id" 
                                :class="{active: curStyle === item.id}" 
                                @click="curStyle = item.id"
                            >
                                <image class="style-img" :src="item.coverUrl || item.cover_url || item.cover" mode="aspectFill"></image>
                                <view class="style-name-tag c">{{ item.name }}</view>
                                <view class="preview-icon-btn c" @click.stop="previewStyleVideo(item)">
                                    <uv-icon name="play-right" color="#fff" size="14"></uv-icon>
                                </view>
                                <view class="check-icon c" v-if="curStyle === item.id">
                                    <uv-icon name="checkbox-mark" color="#fff" size="10"></uv-icon>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </view>

                <!-- <view class="more-settings-btn x c-y c m-t-60" @click="showMore = !showMore">
                    <text class="more-text">更多设置</text>
                    <uv-icon :name="showMore ? 'arrow-up' : 'arrow-down'" color="#666" size="12" class="m-l-10"></uv-icon>
                </view>

                <view class="more-settings-area y m-t-40" v-show="showMore">
                    
                    <view class="setting-row y">
                        <view class="x c-y jc-sb">
                            <text class="setting-title">自动划重点</text>
                            <switch :checked="autoHighlight" @change="autoHighlight = $event.detail.value" color="#1677FF" style="transform:scale(0.8)"/>
                        </view>
                        <text class="setting-desc m-t-10">自动为视频中的重点镜头添加特效</text>
                    </view>

                    <view class="setting-row y m-t-60">
                        <view class="x c-y jc-sb">
                            <text class="setting-title">显示标题</text>
                            <switch :checked="showTitle" @change="showTitle = $event.detail.value" color="#1677FF" style="transform:scale(0.8)"/>
                        </view>
                        
                        <view class="m-t-20 y" v-if="showTitle">
                            <view class="card-item small-style-card y c active">
                                <uv-icon name="star-fill" color="#1677FF" size="20"></uv-icon>
                                <text class="style-name active m-t-10">智能样式</text>
                                <view class="check-icon c">
                                    <uv-icon name="checkbox-mark" color="#fff" size="10"></uv-icon>
                                </view>
                            </view>
                            
                            <text class="setting-title m-t-40">标题显示时长</text>
                            <view class="duration-options x m-t-20">
                                <view class="duration-btn c" :class="{active: titleDuration === 0}" @click="titleDuration = 0">默认</view>
                                <view class="duration-btn c" :class="{active: titleDuration === 1}" @click="titleDuration = 1">一直显示</view>
                                <view class="duration-btn c" :class="{active: titleDuration === 2}" @click="titleDuration = 2">自定义</view>
                            </view>
                        </view>
                    </view>

                    <view class="setting-row y m-t-60">
                        <view class="x c-y jc-sb">
                            <text class="setting-title">显示字幕</text>
                            <switch :checked="showSubtitle" @change="showSubtitle = $event.detail.value" color="#1677FF" style="transform:scale(0.8)"/>
                        </view>
                        <view class="m-t-20" v-if="showSubtitle">
                            <view class="card-item small-style-card y c active">
                                <uv-icon name="star-fill" color="#1677FF" size="20"></uv-icon>
                                <text class="style-name active m-t-10">智能样式</text>
                                <view class="check-icon c">
                                    <uv-icon name="checkbox-mark" color="#fff" size="10"></uv-icon>
                                </view>
                            </view>
                        </view>
                    </view>

                    <view class="setting-row x c-y jc-sb m-t-60">
                        <text class="setting-title">显示个人名片</text>
                        <switch :checked="showCard" @change="showCard = $event.detail.value" color="#1677FF" style="transform:scale(0.8)"/>
                    </view>


                    <view class="section y m-t-60 m-b-40" style="padding: 0;">
                        <text class="setting-title">视频比例</text>
                        <view class="m-t-20">
                            <view class="card-item ratio-card y c active">
                                <text class="ratio-text active">9:16</text>
                                <view class="check-icon c">
                                    <uv-icon name="checkbox-mark" color="#fff" size="10"></uv-icon>
                                </view>
                            </view>
                        </view>
                    </view>

                </view> -->
                
                <!-- 底部留白 -->
                <view style="height: 120rpx;"></view>
            </view>
        </scroll-view>

        <!-- 底部功能栏 -->
        <view class="bottom-bar x c-y jc-sb">
            <view class="generate-btn x c-y c flex-1" @click="handleGenerate">
                <text class="gen-text">立即生成</text>
                <!-- <uv-icon name="integral" color="#fff" size="14" class="m-l-10"></uv-icon>
                <text class="cost-text m-l-10">{{ digitalHumanVideoCost }}</text> -->
            </view>
            
            <!-- <view class="preview-btn x c-y c m-l-20" @click="handlePreview">
                <text class="preview-text">画面预览</text>
                <uv-icon name="more-dot-fill" color="#333" size="16" customStyle="transform: rotate(90deg); margin-left: 10rpx;"></uv-icon>
            </view> -->
        </view>
        <!-- 选择数字人弹窗 -->
        <uv-popup ref="humanPopup" mode="bottom" round="24" bg-color="transparent" :safeAreaInsetBottom="false">
            <view class="popup-container y">
                <view class="drag-bar c">
                    <view class="bar-line"></view>
                </view>
                <view class="popup-tab-bar x c">
                    <view class="popup-tab-item c" :class="{'active': popupTab === 0}" @click="switchPopupTab(0)">
                        <text class="popup-tab-text">我的数字人</text>
                    </view>
                    <view class="popup-tab-item c" :class="{'active': popupTab === 1}" @click="switchPopupTab(1)">
                        <text class="popup-tab-text">公共数字人</text>
                    </view>
                </view>
                <scroll-view scroll-y class="popup-content-area">
                    <!-- 我的数字人 -->
                    <view class="popup-grid-wrap" v-if="popupTab === 0">
                        <view class="popup-grid-item popup-add-item y c" @click="handleCreateHuman">
                            <uv-icon name="plus" color="#999" size="30"></uv-icon>
                            <text class="popup-add-text">定制我的数字人</text>
                        </view>
                        <view 
                            class="popup-grid-item y" 
                            v-for="(item, index) in popupMyList" 
                            :key="index"
                            :class="{'selected': popupSelectedId === (item.virtualman_id || item.id)}"
                            @click="onPopupGridClick(item, 0)"
                        >
                            <image class="popup-grid-img" :src="item.image_url" mode="aspectFill" v-if="item.image_url"></image>
                            <view class="popup-grid-img popup-empty-img c" v-else>
                                <uv-icon name="account" color="#666" size="30"></uv-icon>
                            </view>
                            <view class="popup-selected-mark c" v-if="popupSelectedId === (item.virtualman_id || item.id)">
                                <uv-icon name="checkbox-mark" color="#fff" size="12"></uv-icon>
                            </view>
                        </view>
                    </view>
                    <!-- 公共数字人 -->
                    <view class="popup-grid-wrap" v-if="popupTab === 1">
                        <view 
                            class="popup-grid-item y" 
                            v-for="(item, index) in popupPublicList" 
                            :key="index"
                            :class="{'selected': popupSelectedId === item.id}"
                            @click="onPopupGridClick(item, 1)"
                        >
                            <image class="popup-grid-img" :src="item.coverUrl" mode="aspectFill"></image>
                            <text class="popup-grid-name">{{ item.name }}</text>
                            <view class="popup-selected-mark c" v-if="popupSelectedId === item.id">
                                <uv-icon name="checkbox-mark" color="#fff" size="12"></uv-icon>
                            </view>
                        </view>
                    </view>
                    <view class="popup-loading-box c" v-if="popupLoading">
                        <text class="popup-loading-text">加载中...</text>
                    </view>
                </scroll-view>
                <view class="popup-bottom-bar">
                    <view class="popup-confirm-btn c" @click="handlePopupConfirm">确定</view>
                </view>
            </view>
        </uv-popup>

        <!-- 剪辑风格视频预览弹窗 -->
        <uv-popup ref="styleVideoPopup" mode="bottom" round="24" :safeAreaInsetBottom="false" bg-color="transparent" @close="closeStyleVideoPopup">
            <view class="popup-container y" v-if="previewStyleItem" style="height: 70vh;">
                <view class="drag-bar c"><view class="bar-line"></view></view>
                
                <view class="preview-video-box c" style="margin: 40rpx auto 0;">
                    <video 
                        class="preview-video" 
                        :src="previewStyleItem.demoUrl" 
                        :poster="previewStyleItem.coverUrl || previewStyleItem.cover_url || previewStyleItem.cover"
                        autoplay 
                        loop 
                        :controls="false"
                        object-fit="cover"
                    ></video>
                </view>
                
                <view class="preview-name c m-t-40">{{ previewStyleItem.name || '模板风格' }}</view>
                
                <view class="popup-bottom-bar" style="padding-top: 20rpx;">
                    <view class="popup-confirm-btn c" @click="usePreviewStyle">使用</view>
                </view>
            </view>
        </uv-popup>

        <!-- 选择配音弹窗 -->
        <uv-popup ref="voicePopup" mode="bottom" round="24" bg-color="transparent" :safeAreaInsetBottom="false">
            <view class="popup-container y">
                <view class="drag-bar c">
                    <view class="bar-line"></view>
                </view>
                <view class="popup-tab-bar x c">
                    <view class="popup-tab-item c" :class="{'active': voicePopupTab === 0}" @click="switchVoiceTab(0)">
                        <text class="popup-tab-text">我的配音</text>
                    </view>
                    <view class="popup-tab-item c" :class="{'active': voicePopupTab === 1}" @click="switchVoiceTab(1)">
                        <text class="popup-tab-text">公共配音</text>
                    </view>
                </view>
                <scroll-view scroll-y class="popup-content-area">
                    <!-- 我的配音 -->
                    <view class="popup-grid-wrap" v-if="voicePopupTab === 0">
                        <view class="popup-grid-item popup-add-item y c" @click="handleCustomVoice">
                            <uv-icon name="plus" color="#999" size="30"></uv-icon>
                            <text class="popup-add-text">定制配音</text>
                        </view>
                        <view 
                            class="popup-grid-item voice-grid-item y c" 
                            v-for="(item, index) in voiceMyList" 
                            :key="index"
                            :class="{'selected': voicePopupSelectedId === (item.id || item.voice_id)}"
                            @click="onVoicePopupClick(item)"
                        >
                            <view class="popup-grid-img popup-voice-avatar c" style="background: rgba(22,119,255,0.1); position: relative;">
                                <view class="waveform-box c" v-if="voicePopupSelectedId === (item.id || item.voice_id) && isVoicePlaying">
                                    <view class="waveform-bar bar1" style="background: #1677FF;"></view>
                                    <view class="waveform-bar bar2" style="background: #1677FF;"></view>
                                    <view class="waveform-bar bar3" style="background: #1677FF;"></view>
                                </view>
                                <uv-icon v-else name="play-right-fill" color="#1677FF" size="30"></uv-icon>
                            </view>
                            
                            <view class="popup-selected-mark c" v-if="voicePopupSelectedId === (item.id || item.voice_id)">
                                <uv-icon name="checkbox-mark" color="#fff" size="12"></uv-icon>
                            </view>
                        </view>
                    </view>
                    <!-- 公共配音 -->
                    <view class="popup-grid-wrap" v-if="voicePopupTab === 1">
                        <view 
                            class="popup-grid-item voice-grid-item y c" 
                            v-for="(item, index) in voicePublicList" 
                            :key="index"
                            :class="{'selected': voicePopupSelectedId === item.id}"
                            @click="onVoicePopupClick(item)"
                        >
                            <image class="popup-grid-img" :src="item.coverUrl || item.cover_url || item.avatar" mode="aspectFill" v-if="item.coverUrl || item.cover_url || item.avatar"></image>
                            <view class="popup-grid-img popup-voice-avatar c" v-else>
                                <uv-icon name="mic" color="#1677FF" size="26"></uv-icon>
                            </view>
                            <text class="popup-grid-name">{{ item.name }}</text>
                            <!-- 播放波形动画 -->
                            <view class="waveform-box c" v-if="voicePopupSelectedId === item.id && isVoicePlaying">
                                <view class="waveform-bar bar1"></view>
                                <view class="waveform-bar bar2"></view>
                                <view class="waveform-bar bar3"></view>
                            </view>
                            <view class="popup-selected-mark c" v-if="voicePopupSelectedId === item.id">
                                <uv-icon name="checkbox-mark" color="#fff" size="12"></uv-icon>
                            </view>
                        </view>
                    </view>
                    <view class="popup-loading-box c" v-if="voicePopupLoading">
                        <text class="popup-loading-text">加载中...</text>
                    </view>
                </scroll-view>
                <view class="popup-bottom-bar">
                    <view class="popup-confirm-btn c" @click="confirmVoiceSelection">确定</view>
                </view>
            </view>
        </uv-popup>
    </view>
</template>

<script>
import { getPublicVirtualmanList, getClipTemplateList, generateVirtualmanBroadcast, getVoiceList, getMyVirtualmanList, getMyVoiceList } from '@/api/digitalHuman.js';

export default {
    components: {},
    data() {
        return {
            step: 3,
            curHuman: 1,
            curVoice: '',
            speed: 1,
            curStyle: '',
            showMore: false,
            autoHighlight: true,
            showTitle: true,
            titleDuration: 0,
            showSubtitle: true,
            showCard: false,
            selectedHumanId: '',
            selectedHuman: null,
            humanList: [],
            clipStyleList: [],
            clipStyleSid: '',
            loadingClipStyle: false,
            voiceList: [],
            // 从上一页传过来的参数
            videoTitle: '',
            videoContent: '',
            isVoicePlaying: false,
            audioContext: null,
            // 弹窗相关
            popupTab: 0,
            popupMyList: [],
            popupPublicList: [],
            popupSelectedId: '',
            popupSelectedItem: null,
            popupLoading: false,
            // 素材列表
            materials: [],
            
            // 预览相关
            previewStyleItem: null,
            
            // 配音弹窗相关
            voicePopupTab: 0,
            voiceMyList: [],
            voicePublicList: [],
            voicePopupSelectedId: '',
            voicePopupSelectedItem: null,
            voicePopupLoading: false
        };
    },
    computed: {
        digitalHumanVideoCost() {
            const config = uni.getStorageSync('compute_power_config') || {};
            return config.compute_power_digital_human_video || '?';
        }
    },
    onLoad(options) {
        if (options.step) {
            this.step = parseInt(options.step);
        }
        if (options.title) {
            this.videoTitle = decodeURIComponent(options.title);
        }
        if (options.content) {
            this.videoContent = decodeURIComponent(options.content);
        }
        if (options.materials) {
            try {
                this.materials = JSON.parse(decodeURIComponent(options.materials));
            } catch (e) {
                console.error('解析materials失败', e);
                this.materials = [];
            }
        }
        this.loadHumanList();
        this.loadClipStyles();
        this.loadVoiceList();
        this.initAudioContext();
    },
    onUnload() {
        if (this.audioContext) {
            this.audioContext.destroy();
        }
    },
    methods: {
        async loadVoiceList() {
            try {
                const res = await getVoiceList();
                if (res.data && res.data.list) {
                    this.voiceList = res.data.list;
                    if (this.voiceList.length > 0 && !this.curVoice) {
                        this.curVoice = this.voiceList[0].id;
                    }
                }
            } catch (e) {
                console.error('加载声音列表失败', e);
            }
        },

        // =========== 声音选择弹窗 ===========
        openVoicePopup() {
            this.$refs.voicePopup.open();
            // 每次打开弹窗时，将内部的选择状态同步为外部真正的 curVoice
            this.voicePopupSelectedId = this.curVoice;
            
            // 首次打开时加载数据
            if (this.voicePopupTab === 0 && this.voiceMyList.length === 0) {
                this.loadVoiceMyList();
            } else if (this.voicePopupTab === 1 && this.voicePublicList.length === 0) {
                this.loadVoicePublicList();
            }
        },
        async loadVoiceMyList() {
            this.voicePopupLoading = true;
            try {
                const res = await getMyVoiceList();
                const list = res.data?.list || res.data?.data || res.data || [];
                this.voiceMyList = Array.isArray(list) ? list : [];
            } catch (e) {
                console.error('加载我的声音列表失败', e);
            } finally {
                this.voicePopupLoading = false;
            }
        },
        async loadVoicePublicList() {
            this.voicePopupLoading = true;
            try {
                const res = await getVoiceList();
                const list = res.data?.list || res.data?.data || res.data || [];
                this.voicePublicList = Array.isArray(list) ? list : [];
            } catch (e) {
                console.error('加载公共声音列表失败', e);
            } finally {
                this.voicePopupLoading = false;
            }
        },
        switchVoiceTab(tab) {
            this.voicePopupTab = tab;
            if (tab === 0 && this.voiceMyList.length === 0) {
                this.loadVoiceMyList();
            } else if (tab === 1 && this.voicePublicList.length === 0) {
                this.loadVoicePublicList();
            }
        },
        onVoicePopupClick(item) {
            const id = item.id || item.voice_id;
            
            // 如果点击的就是当前选中且正在播放，则停止
            if (this.voicePopupSelectedId === id && this.isVoicePlaying && this.audioContext) {
                this.audioContext.pause();
                this.isVoicePlaying = false;
                return;
            }
            
            this.isVoicePlaying = false;
            this.voicePopupSelectedId = id;
            this.voicePopupSelectedItem = item;
            
            const demoUrl = item.demo_audio_url || item.demoUrl || item.demo_url || item.result_audio_url || item.audio_url || item.voice_url;
            if (demoUrl) {
                // 处理转义斜杠
                const cleanUrl = demoUrl.replace(/\\\//g, '/').replace(/\\/g, '/');

                if (this.audioContext) {
                    this.audioContext.destroy();
                    this.audioContext = null;
                }
                
                // #ifdef MP-WEIXIN
                this.audioContext = wx.createInnerAudioContext({ useWebAudioImplement: true });
                // #endif
                // #ifndef MP-WEIXIN
                this.audioContext = uni.createInnerAudioContext();
                // #endif

                this.audioContext.obeyMuteSwitch = false;
                this.audioContext.autoplay = true;

                this.audioContext.onPlay(() => {
                    this.isVoicePlaying = true;
                });
                this.audioContext.onEnded(() => {
                    this.isVoicePlaying = false;
                });
                this.audioContext.onError((res) => {
                    this.isVoicePlaying = false;
                    console.error('音频播放错误', res);
                    uni.showToast({ title: '音频播放失败', icon: 'none' });
                });

                this.audioContext.src = cleanUrl;
                this.isVoicePlaying = true;
            }
        },
        confirmVoiceSelection() {
            if (this.voicePopupSelectedItem) {
                const item = this.voicePopupSelectedItem;
                this.curVoice = item.id || item.voice_id;
            }
            this.$refs.voicePopup.close();
        },

        handleCustomVoice() {
            uni.navigateTo({ url: '/pages/w/create_custom_voice' });
        },
        initAudioContext() {
            // 全局设置：必须在创建实例之前调用
            try {
                uni.setInnerAudioOption({
                    obeyMuteSwitch: false,
                    mixWithOther: true
                });
            } catch (e) {
                console.warn('setInnerAudioOption 不支持', e);
            }
            
            // #ifdef MP-WEIXIN
            // 微信小程序中使用 wx.createInnerAudioContext 并开启 useWebAudioImplement
            // 这是 iOS 静音模式下能播放声音的关键
            this.audioContext = wx.createInnerAudioContext({
                useWebAudioImplement: true
            });
            // #endif
            
            // #ifndef MP-WEIXIN
            this.audioContext = uni.createInnerAudioContext();
            // #endif
            
            this.audioContext.obeyMuteSwitch = false;
            this.audioContext.autoplay = false;
            this.audioContext.volume = 1;
            
            this.audioContext.onPlay(() => {
                this.isVoicePlaying = true;
            });
            this.audioContext.onEnded(() => {
                this.isVoicePlaying = false;
            });
            this.audioContext.onStop(() => {
                this.isVoicePlaying = false;
            });
            this.audioContext.onPause(() => {
                this.isVoicePlaying = false;
            });
            this.audioContext.onError((res) => {
                this.isVoicePlaying = false;
                console.error('音频播放错误', res);
            });
        },
        selectVoice(item) {
            if (!this.audioContext) return;
            
            // 如果重复点击当前正在播放的，则停止
            if (this.curVoice === item.id && this.isVoicePlaying) {
                this.audioContext.stop();
                return;
            }
            
            // 切换时立刻先将播放状态设为 false，防止新卡片图标闪烁
            this.isVoicePlaying = false; 
            this.curVoice = item.id;
            
            if (item.demoUrl) {
                // 停止之前的
                this.audioContext.stop();
                // 确保地址编码正确
                this.audioContext.src = item.demoUrl;
                // 开始播报，当真正开始播报时，onPlay 会触发动画
                this.audioContext.play();
            }
        },
        handleBack() {
            uni.navigateBack();
        },
        handleTemplate() {
            uni.showToast({ title: '使用模板', icon: 'none' });
        },
        handleCreateHuman() {
            uni.navigateTo({ url: '/pages/w/create_digital_human' });
        },
        handleCustom(type) {
            uni.showToast({ title: `定制${type === 'human' ? '数字人' : '配音'}`, icon: 'none' });
        },
        async loadHumanList() {
            try {
                const res = await getPublicVirtualmanList();
                if (res.data && res.data.list) {
                    this.humanList = res.data.list;
                }
            } catch (e) {
                console.error('加载数字人列表失败', e);
            }
        },
        async loadClipStyles(loadMore = false) {
            if (this.loadingClipStyle) return;
            if (loadMore && !this.clipStyleSid) return;
            
            this.loadingClipStyle = true;
            try {
                const params = { pageSize: 10 };
                if (loadMore && this.clipStyleSid) {
                    params.sid = this.clipStyleSid;
                }
                const res = await getClipTemplateList(params);
                if (res.data) {
                    const list = res.data.list || [];
                    if (loadMore) {
                        this.clipStyleList = this.clipStyleList.concat(list);
                    } else {
                        this.clipStyleList = list;
                        if (list.length > 0 && !this.curStyle) {
                            this.curStyle = list[0].id; // 默认选中第一个必选项
                        }
                    }
                    this.clipStyleSid = res.data.sid || '';
                }
            } catch (e) {
                console.error('加载剪辑风格失败', e);
            }
            this.loadingClipStyle = false;
        },
        selectHumanFromScroll(e) {
            const index = parseInt(e.currentTarget.dataset.index);
            const item = this.humanList[index];
            this.selectedHumanId = item.id;
            this.selectedHuman = { ...item, _type: 'public' };
        },
        previewStyleVideo(item) {
            this.previewStyleItem = item;
            this.$refs.styleVideoPopup.open();
        },
        closeStyleVideoPopup() {
            this.previewStyleItem = null;
        },
        usePreviewStyle() {
            if (this.previewStyleItem) {
                this.curStyle = this.previewStyleItem.id;
                this.$refs.styleVideoPopup.close();
            }
        },
        async handleGenerate() {
            if (!this.selectedHumanId) {
                uni.showToast({ title: '请选择数字人', icon: 'none' });
                return;
            }
            if (!this.curStyle) {
                uni.showToast({ title: '请选择剪辑风格', icon: 'none' });
                return;
            }
            if (!this.curVoice) {
                uni.showToast({ title: '请选择声音', icon: 'none' });
                return;
            }
            if (!this.videoContent) {
                uni.showToast({ title: '视频文案为空，请返回上一步填写', icon: 'none' });
                return;
            }
            
            // 弹出算力确认框
            const config = uni.getStorageSync('compute_power_config') || {};
            const cost = config.compute_power_digital_human_video || '?';
            
            const confirmResult = await new Promise(resolve => {
                uni.showModal({
                    title: '算力消耗提示',
                    content: '每1秒视频消耗 ' + cost + ' 算力，是否确认生成？',
                    confirmText: '确认生成',
                    cancelText: '取消',
                    success: function(res) { resolve(res.confirm); },
                    fail: function() { resolve(false); }
                });
            });
            
            if (!confirmResult) return;
            
            uni.showLoading({ title: '提交中...', mask: true });
            try {
                // 如果是从“我的配音”中选择的，接口需要传 speaker_id
                let actualSpeakerId = this.curVoice;
                const myVoiceInfo = this.voiceMyList.find(v => (v.id || v.voice_id) === this.curVoice);
                if (myVoiceInfo && myVoiceInfo.speaker_id) {
                    actualSpeakerId = myVoiceInfo.speaker_id;
                }
                
                const params = {
                    styleId: this.curStyle,
                    virtualmanId: this.selectedHumanId,
                    speakerId: actualSpeakerId,
                    title: this.videoTitle,
                    content: this.videoContent,
                    speakerExtra: {
                        speedRatio: 1.0
                    }
                };
                if (this.materials && this.materials.length > 0) {
                    params.materials = this.materials;
                }
                const res = await generateVirtualmanBroadcast(params);
                
                uni.hideLoading();
                if (res.status === 200) {
                    uni.showToast({ title: '生成成功', icon: 'success' });
                    setTimeout(() => {
                        uni.redirectTo({
                            url: '/pages/w/digital_human_task_list'
                        });
                    }, 1000);
                } else {
                    uni.showToast({ title: res.msg || '提交失败', icon: 'none' });
                }
            } catch (e) {
                uni.hideLoading();
                uni.showToast({ title: e, icon: 'none' });
                console.error(e);
            }
        },
        handlePreview() {
            uni.showToast({ title: '预览画面', icon: 'none' });
        },
        openHumanSelect() {
            this.popupSelectedId = this.selectedHumanId || '';
            this.popupSelectedItem = null;
            if (this.$refs.humanPopup) {
                this.$refs.humanPopup.open();
            }
            if (this.popupMyList.length === 0) {
                this.loadPopupMyList();
            }
            if (this.popupPublicList.length === 0) {
                this.loadPopupPublicList();
            }
        },
        switchPopupTab(idx) {
            this.popupTab = idx;
        },
        async loadPopupMyList() {
            this.popupLoading = true;
            try {
                const res = await getMyVirtualmanList();
                if (res.data && res.data.list) {
                    this.popupMyList = res.data.list;
                }
            } catch (e) {
                console.error('加载我的数字人失败', e);
            }
            this.popupLoading = false;
        },
        async loadPopupPublicList() {
            try {
                const res = await getPublicVirtualmanList();
                if (res.data && res.data.list) {
                    this.popupPublicList = res.data.list;
                }
            } catch (e) {
                console.error('加载公共数字人失败', e);
            }
        },
        onPopupGridClick(item, type) {
            if (type === 0) {
                this.popupSelectedId = item.virtualman_id || item.id;
                this.popupSelectedItem = { ...item, _type: 'my' };
            } else {
                this.popupSelectedId = item.id;
                this.popupSelectedItem = { ...item, _type: 'public' };
            }
        },
        handlePopupConfirm() {
            if (!this.popupSelectedId) {
                uni.showToast({ title: '请选择一个数字人', icon: 'none' });
                return;
            }
            this.onHumanSelected(this.popupSelectedItem);
            if (this.$refs.humanPopup) {
                this.$refs.humanPopup.close();
            }
        },
        onHumanSelected(item) {
            this.selectedHuman = item;
            
            if (item._type === 'my') {
                this.selectedHumanId = String(item.virtualman_id || item.id);
            } else {
                this.selectedHumanId = String(item.id);
            }
            
            uni.showToast({ title: '已选择数字人', icon: 'success' });
        }
    }
};
</script>

<style scoped>
.page-container {
    background-color: #f8f9fa;
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { display: flex; align-items: center; justify-content: center; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.flex-1 { flex: 1; }
.m-l-10 { margin-left: 10rpx; }
.m-l-20 { margin-left: 20rpx; }
.m-r-20 { margin-right: 20rpx; }
.m-t-10 { margin-top: 10rpx; }
.m-t-20 { margin-top: 20rpx; }
.m-t-30 { margin-top: 30rpx; }
.m-t-40 { margin-top: 40rpx; }
.m-t-60 { margin-top: 60rpx; }
.m-b-40 { margin-bottom: 40rpx; }
.pt-10 { padding-top: 10rpx; }
.pb-10 { padding-bottom: 10rpx; }

.rotate-90 {
    transform: rotate(90deg);
}

.template-btn {
    background: transparent;
    padding: 8rpx 0rpx;
    border-radius: 100rpx;
}
.template-text {
    font-size: 26rpx;
    color: #666;
}

.content-scroll {
    width: 100%;
    min-height: 0;
}

.content-padding {
    padding: 40rpx 0 160rpx;
}

.section {
    padding: 0 40rpx;
}

.section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
}

.h-scroll {
    width: 100%;
}
.h-scroll-content {
    gap: 20rpx;
}

/* 卡片通用样式 */
.card-item {
    background: #fff;
    border-radius: 16rpx;
    box-sizing: border-box;
    position: relative;
    border: 2rpx solid transparent;
    flex-shrink: 0;
}
.card-item.active {
    border-color: #1677FF;
    background: rgba(22, 119, 255, 0.05);
}

.custom-card {
    background: rgba(0,0,0,0.03);
    border-radius: 16rpx;
    border: 2rpx dashed #ccc;
    flex-shrink: 0;
}
.custom-card:active {
    background: rgba(0,0,0,0.06);
}

.custom-text {
    font-size: 20rpx;
    color: #666;
}

/* 数字人尺寸 */
.custom-card.human-item, .card-item.human-item {
    width: 160rpx;
    height: 220rpx;
}
.custom-card {
    width: 160rpx;
    height: 220rpx;
}
.human-img {
    width: 100%;
    height: 100%;
    border-radius: 14rpx;
}
.human-name-tag {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 20rpx;
    padding: 6rpx 0;
    border-bottom-left-radius: 14rpx;
    border-bottom-right-radius: 14rpx;
}
.expand-icon {
    position: absolute;
    bottom: 50rpx;
    left: 10rpx;
    width: 32rpx;
    height: 32rpx;
    background: rgba(0,0,0,0.3);
    border-radius: 50%;
}
.fs-icon {
    width: 14rpx;
    height: 14rpx;
    border: 2rpx solid #fff;
}

/* 选中角标 */
.check-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 36rpx;
    height: 36rpx;
    background: #1677FF;
    border-top-left-radius: 12rpx;
    border-bottom-right-radius: 14rpx;
}

/* 配音尺寸 */
.custom-card.small-card, .card-item.small-card {
    width: 160rpx;
    height: 160rpx;
    position: relative;
    overflow: hidden;
}
.preview-icon-btn {
    position: absolute;
    top: 10rpx;
    right: 10rpx;
    width: 40rpx;
    height: 40rpx;
    background: rgba(0,0,0,0.4);
    border-radius: 8rpx;
    z-index: 10;
}
.voice-avatar {
    width: 100%;
    height: 100%;
    border-radius: 14rpx;
}
.voice-name-tag {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 20rpx;
    padding: 6rpx 0;
    text-align: center;
    border-bottom-left-radius: 14rpx;
    border-bottom-right-radius: 14rpx;
}
.voice-name-tag.active {
    color: #1677FF;
}

.waveform-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 6rpx;
    z-index: 10;
}
.waveform-bar {
    width: 6rpx;
    background: #fff;
    border-radius: 4rpx;
    animation: bounce 0.8s infinite ease-in-out;
}
.bar1 { height: 20rpx; animation-delay: 0.1s; }
.bar2 { height: 32rpx; animation-delay: 0.2s; }
.bar3 { height: 24rpx; animation-delay: 0.3s; }

@keyframes bounce {
    0%, 100% { height: 12rpx; }
    50% { height: 32rpx; }
}

.speed-label {
    font-size: 28rpx;
    color: #333;
}
.speed-val {
    font-size: 28rpx;
    color: #666;
    width: 60rpx;
}

/* 风格尺寸 */
.card-item.style-card {
    width: 180rpx;
    height: 240rpx;
    position: relative;
    overflow: hidden;
}
.style-name {
    font-size: 26rpx;
    color: #333;
}
.style-name.active {
    color: #1677FF;
    font-weight: bold;
}
.style-img {
    width: 100%;
    height: 100%;
    border-radius: 14rpx;
}
.style-name-tag {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 20rpx;
    padding: 6rpx 0;
    text-align: center;
    border-bottom-left-radius: 14rpx;
    border-bottom-right-radius: 14rpx;
}

/* 更多设置 */
.more-settings-btn {
    padding: 10rpx 0;
}
.more-text {
    font-size: 26rpx;
    color: #666;
}

.more-settings-area {
    padding: 0 40rpx;
    background: #fff;
    border-radius: 24rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.02);
    margin: 40rpx 40rpx 0;
    padding-top: 40rpx;
    padding-bottom: 40rpx;
}

/* 更多设置里的卡片默认灰色背景 */
.more-settings-area .card-item {
    background: #f8f9fa;
}
.more-settings-area .card-item.active {
    background: rgba(22, 119, 255, 0.05);
}

.setting-row {
    width: 100%;
}

.setting-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
}
.setting-desc {
    font-size: 24rpx;
    color: #999;
}
.setting-subtitle {
    font-size: 26rpx;
    color: #666;
}

.small-style-card {
    width: 200rpx;
    height: 120rpx;
}

.duration-options {
    gap: 20rpx;
}
.duration-btn {
    flex: 1;
    height: 72rpx;
    border-radius: 12rpx;
    background: #f8f9fa;
    font-size: 26rpx;
    color: #333;
    border: 2rpx solid transparent;
}
.duration-btn.active {
    background: rgba(22, 119, 255, 0.05);
    border-color: #1677FF;
    color: #1677FF;
    font-weight: bold;
}

/* 选择背景 */
.bg-card {
    width: 180rpx;
    height: 240rpx;
}
.bg-img {
    width: 100%;
    height: 100%;
    border-radius: 14rpx;
}

/* 比例 */
.ratio-card {
    width: 120rpx;
    height: 160rpx;
}
.ratio-text {
    font-size: 32rpx;
    color: #666;
}
.ratio-text.active {
    color: #1677FF;
    font-weight: bold;
}

/* 底部栏 */
.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24rpx 40rpx;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    background: #fff;
    z-index: 100;
    box-shadow: 0 -4rpx 16rpx rgba(0,0,0,0.03);
}

.generate-btn {
    height: 96rpx;
    background: #1677FF;
    border-radius: 20rpx;
    box-shadow: 0 8rpx 20rpx rgba(22, 119, 255, 0.2);
}
.generate-btn:active {
    opacity: 0.9;
}
.gen-text {
    font-size: 32rpx;
    color: #fff;
    font-weight: bold;
}
.cost-text {
    font-size: 30rpx;
    color: #fff;
    font-family: Arial;
}

.preview-btn {
    height: 96rpx;
    padding: 0 40rpx;
    background: #f0f2f5;
    border-radius: 20rpx;
}
.preview-btn:active {
    background: #e5e8ec;
}
.preview-text {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
}

/* 选择数字人弹窗 */
.popup-container {
    background: #fff;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
    height: 70vh;
    display: flex;
    flex-direction: column;
}
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
.popup-tab-bar {
    padding: 20rpx 0 30rpx;
    flex-shrink: 0;
}
.popup-tab-item {
    padding: 0 40rpx;
    position: relative;
}
.popup-tab-text {
    font-size: 30rpx;
    color: #999;
    font-weight: 500;
}
.popup-tab-item.active .popup-tab-text {
    color: #333;
    font-weight: bold;
}
.popup-tab-item.active::after {
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
.popup-content-area {
    box-sizing: border-box;
    flex: 1;
    padding: 0 30rpx;
    min-height: 0;
}
.popup-grid-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20rpx;
    padding-bottom: 30rpx;
}
.popup-grid-item {
    width: calc((100% - 40rpx) / 3);
    border-radius: 16rpx;
    overflow: hidden;
    position: relative;
    background: #f5f5f5;
    border: 4rpx solid #fff;
}
.popup-grid-img {
    width: 100%;
    height: 280rpx;
    border-radius: 16rpx;
}
.popup-empty-img {
    background: #eee;
    border-radius: 16rpx;
}
.popup-grid-name {
    font-size: 22rpx;
    color: #666;
    text-align: center;
    padding: 10rpx 6rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.popup-add-item {
    border: 2rpx dashed #ccc;
    background: transparent;
    height: 280rpx;
    justify-content: center;
}
.popup-add-text {
    font-size: 22rpx;
    color: #999;
    margin-top: 16rpx;
}
.popup-grid-item.selected {
    border-color: #1677FF;
}
.popup-selected-mark {
    position: absolute;
    top: 8rpx;
    right: 8rpx;
    width: 36rpx;
    height: 36rpx;
    background: #1677FF;
    border-radius: 50%;
}
.popup-loading-box {
    padding: 60rpx 0;
}
.popup-loading-text {
    font-size: 26rpx;
    color: #888;
}
.popup-bottom-bar {
    padding: 20rpx 30rpx;
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
    flex-shrink: 0;
}
.popup-confirm-btn {
    width: 100%;
    height: 96rpx;
    background: #1677FF;
    border-radius: 20rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
}
/* 视频预览弹窗保留自己的样式 */
.preview-video-box {
    width: 480rpx;
    height: 720rpx;
    border-radius: 20rpx;
    overflow: hidden;
    background: #000;
}
.preview-video {
    width: 100%;
    height: 100%;
}
.preview-name {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
}
/* 配音弹窗中无头像时的占位样式 */
.popup-voice-avatar {
    background: #EBF2FF;
    border-radius: 16rpx;
}
</style>
