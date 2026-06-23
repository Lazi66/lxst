<template>
    <view class="page">
        <l-nav fanhui title="ai对话" bgColor="transparent" @back="handleBack"></l-nav>
        
        <!-- 对话列表 -->
        <scroll-view class="chat-list" scroll-y="true" :scroll-top="scrollTop" @scrolltoupper="loadMore" @scroll="onScroll" enable-back-to-top="true">
            <!-- 加载更多提示 -->
            <view v-if="loadingMore" class="loading-more">
                <text>加载中...</text>
            </view>
            <!-- 没有更多数据提示 -->
<!--            <view v-else-if="!hasMore && messages.length > 0" class="no-more">
                <text>没有更多消息了</text>
            </view> -->
            <!-- 系统消息 -->
<!--            <view class="system-message" v-if="!messages.length > 0">
                <view class="x c p-t-68 p-b-20">
                    <view class="pic o-h bg-2">
                        <image class="img" :src="`${imgHost}/static/images/w/126898.jpg`"></image>
                    </view>
                </view>
                <view class="p-x-60">初次见面，我是你的个人AI助手！可以回答你的各种问题，想找人聊天的话我也随时都在。咱们现在还不太熟呢，要不互相了解一下吧～</view>
            </view> -->
            
            <!-- AI猜你想问卡片 -->
            <view class="ai-suggestion-container" v-if="!roleId">
                <view class="ai-robot-header x c-y"
                :style="'background-image: url(' + imgHost + '/static/images/w/bg.png' + ');background-size: 100% 100%;'">
                     <image class="robot-avatar" :src="`${imgHost}/static/images/w/robot (2).png`" mode="aspectFit"></image>
                     <text class="robot-greeting">Hi~我是小助理，很高兴为您服务！</text>
                 </view>
                 
                 <view class="suggestion-card">
                     <view class="card-title-row x jc-sb c-y">
                         <view class="title-left x c-y">
                             <uv-icon name="question-circle-fill" color="#2769ED" size="18"></uv-icon>
                             <text class="card-title-text font-b">猜您想问</text>
                         </view>
                         <view class="refresh-btn x c-y" @click="getAiQuestion">
                             <uv-icon name="reload" color="#2769ED" size="18"></uv-icon>
                             <text class="refresh-text">换一批</text>
                         </view>
                     </view>
                     
                     <view class="question-list">
                         <view v-for="(item, index) in aiQuestion" :key="index" class="question-item" @click="fastSendMessage(item.question)">
                            <text class="question-text">{{ item.question }}</text>
                         </view>
                     </view>
                 </view>
                 
                 <!-- AI内容提示 -->
                 <view class="ai-disclaimer">
                     <text>内容由AI生成，仅供参考</text>
                 </view>
            </view>
            
            <!-- 针对具体数字员工的信息卡片 (如有id才显示) -->
            <view class="role-detail-card y jc-c" v-if="roleId && roleDetail">
                 <view class="x c-y">
                     <image v-if="roleDetail.avatar" class="role-avatar shadow-sm flex-none" :src="roleDetail.avatar" mode="aspectFill"></image>
                     <image v-else class="role-avatar shadow-sm flex-none" :src="`${imgHost}/static/images/w/robot (2).png`" mode="aspectFit"></image>
                     <view class="y ml-24 flex-1">
                         <view class="role-name font-b f32">{{roleDetail.name}}</view>
                         <view class="role-desc f26 fc-50 m-t-10 line-clamp-2">{{roleDetail.description || '暂无详细描述...'}}</view>
                     </view>
                 </view>
                 <view class="ai-disclaimer m-0 m-t-30">
                     <text>内容由AI生成，仅供参考</text>
                 </view>
            </view>
            
            <!-- 消息列表 -->
            <view v-for="(msg, index) in messages" :key="index" class="message-item" :class="msg.role">
                <view v-if="msg.role == 'user'" class="user-message x jc-e">
                    <!-- <view class="user-avatar ml-12">
                        <view class="w-32 h-32 rounded-full bg-3"></view>
                    </view> -->
                    <view class="user-message-content">
                        <view v-if="msg.question_type == 0" class="message-bubble bg-lan fc-bai br-30 p-20 p-x-24 p-y-16" @click="copyText(msg.content)">
                            {{ msg.content }}
                        </view>
                        <view v-if="msg.question_type == 1">
                            <view class="image-list mb-12">
                                <view v-for="(item1, index1) in msg.content_url" :key="index1" class="image-item mb-8">
                                    <image 
                                        :src="item1" 
                                        class="fixed-image" 
                                        mode="aspectFill"
                                        @click="previewImage(item1)"
                                        @error="loadError(msg)"
                                    ></image>
                                </view>
                            </view>
                            <view v-if="msg.content" class="message-bubble bg-lan fc-bai br-30 p-20 p-x-24 p-y-16" @click="copyText(msg.content)">
                                {{ msg.content }}
                            </view>
                        </view>
                        <view v-if="msg.question_type == 2">
                            <view class="video-container mb-12">
                                <video 
                                    :src="msg.content_url" 
                                    class="max-w-full max-h-400 br-8" 
                                    controls
                                    @error="loadError(msg)"
                                ></video>
                            </view>
                            <view v-if="msg.content" class="message-bubble bg-lan fc-bai br-30 p-20 p-x-24 p-y-16" @click="copyText(msg.content)">
                                {{ msg.content }}
                            </view>
                        </view>
                    </view>
                </view>
                <view v-if="msg.role == 'assistant'" class="ai-message x">
                    <!-- <view class="ai-avatar mr-12">
                        <view class="w-32 h-32 rounded-full bg-2"></view>
                    </view> -->
                    <view v-if="msg.type == 'conversation'">
                        <view v-if="msg.reasoning_content" class="reasoning-container">
                            <view class="reasoning-header x jc-sb c-y mb-8">
                                <view class="x c-y">
                                    <image :src="`${imgHost}/static/images/w/sikao.png`" class="sikao-icon m-r-10"></image>
                                    <view class="reasoning-label">深度思考</view>
                                    <text v-if="!msg.content" class="loading-icon m-l-10">●●●</text>
                                </view>
                                <view class="reasoning-toggle" @click="toggleReasoning(msg)">
                                    {{ msg.reasoning_expanded ? '收起' : '展开' }}
                                </view>
                            </view>
                            <view v-if="msg.reasoning_expanded" class="reasoning-content bg-e br-16 p-x-24 p-y-16 max-w-80" @click="copyText(msg.reasoning_content)">
                                <view v-html="formatText(msg.reasoning_content)"></view>
                            </view>
                        </view>
                        <view v-if="msg.content" class="message-content bg-k br-16 p-x-24 p-y-16 max-w-80" @click="copyText(msg.content)">
                            <view v-html="formatText(msg.content)" style="color: #000;"></view>
                        </view>
                    </view>
                    <view v-if="msg.type == 'image'">
                        <view class="message-content br-16 p-12" v-if="msg.content_url">
                            <view class="relative">
                                <image 
                                    :src="msg.content_url" 
                                    class="max-w-full max-h-400 br-8" 
                                    mode="aspectFit"
                                    @click="previewImage(msg.content_url)"
                                    @error="loadError(msg)"
                                ></image>
                                <view v-if="msg.loadError" class="absolute inset-0 bg-k x c y c br-8">
                                    <text class="fc76">资源已失效</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view v-if="msg.type == 'video'">
                        <view class="message-content br-16 p-12" v-if="msg.content_url">
                            <view class="relative">
                                <video 
                                    :src="msg.content_url" 
                                    class="max-w-full max-h-400 br-8" 
                                    controls
                                    @error="loadError(msg)"
                                ></video>
                                <view v-if="msg.loadError" class="absolute inset-0 bg-k x c y c br-8">
                                    <text class="fc76">资源已失效</text>
                                </view>
                            </view>
                            <view class="x mt-10">
                                <view class="download-btn x c bg-lan fc-bai br-10 p-x-15 p-y-5" @click="downloadVideo(msg.content_url)" style="padding: 10rpx;">
                                    <uv-icon name="download" color="#fff" size="14"></uv-icon>
                                    <text class="ml-5">下载视频</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            
            
            <!-- 加载中 -->
            <view v-if="loading" class="loading-message x c p-t-20 p-b-20">
                <text class="loading-icon">●●●</text>
            </view>
        </scroll-view>
        
        <!-- 新输入区域 -->
        <view class="new-input-area">
            <!-- 上传文件列表 -->
            <view v-if="activeFunction === 'chat' && (uploadedImages.length > 0 || uploadedVideo || uploading)" class="uploaded-files p-b-10">
                <view class="file-list x">
                    <view v-for="(image, index) in uploadedImages" :key="index" class="file-item m-r-10">
                        <image :src="image" class="file-img" mode="aspectFill" @click="previewImage(image)"></image>
                        <view class="file-delete" @click="deleteFile('image', index)">×</view>
                    </view>
                    <view v-if="uploadedVideo" class="file-item m-r-10">
                        <video :src="uploadedVideo" class="file-img" controls @click="playVideo(uploadedVideo)"></video>
                        <view class="file-delete" @click="deleteFile('video')">×</view>
                    </view>
                    <view v-if="uploading" class="file-item m-r-10 uploading-item">
                        <view class="uploading-overlay x c y">
                            <view class="uploading-spinner"></view>
                            <text class="uploading-text">上传中...</text>
                        </view>
                    </view>
                </view>
            </view>
            
            <view class="new-input-box">
                <!-- 第一行：多模态输入 + 文本框 + 发送按钮 -->
                <view class="x c-y p-t-10 p-b-20 bottom-border-light">
                    <!-- 选择文件/图片 (仅对话模式下) -->
                    <view class="icon-btn x c m-r-10" @click="chooseFile" v-if="activeFunction === 'chat'">
                        <image :src="`${imgHost}/static/images/w/sl-image.png`" class="icon-img"></image>
                    </view>
                    <view class="v-divider" v-if="activeFunction === 'chat'"></view>
                    <!-- 输入框 -->
                    <input 
                        v-model="inputMessage" 
                        type="text"
                        class="f28 flex-1 m-l-20" 
                        :placeholder="getPlaceholder()" 
                        @keyup.enter="sendMessage"
                        style="color: #333;"
                        placeholder-style="color:#999;"
                        maxlength="800"
                    />
                    <!-- 发送按钮 -->
                    <view class="send-btn x c m-l-20" @click="sendMessage">
                        <image :src="`${imgHost}/static/images/w/send.png`" class="send-icon"></image>
                    </view>
                </view>

                <!-- 第二行：功能切换按钮 + 模型展示 -->
                <view class="x c-y p-t-20 bottom-tools">
                    <view class="tool-btn x c-y c-x" :class="{ 'active': activeFunction === 'image' }" @click="switchFunction('image')">
                        <text>图片生成</text>
                    </view>
                    <view class="tool-btn x c-y c-x m-l-20" :class="{ 'active': activeFunction === 'video' }" @click="switchFunction('video')">
                        <text>视频生成</text>
                    </view>
                    <view class="model-btn x c-y m-l-20" :class="{ 'active': activeFunction === 'chat' }" @click="switchFunction('chat')">
                        <image :src="`${imgHost}/static/images/w/model_sl.png`" class="model-icon" v-if="activeFunction === 'chat'"></image>
                        <image :src="`${imgHost}/static/images/w/model.png`" class="model-icon" v-else></image>
                        <text>{{ aiModelName }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import {aiGetHistory, aiChat,aiChatStream, aiGenerateImageSync, aiGenerateImage, aiGetImageResult, aiGenerateVideo, aiGetVideoResult, getAiQuestion, getComputePowerConfig} from '@/api/api.js';
import config from '@/config/app.js';
import { mapGetters } from 'vuex';
import { toLogin } from '@/libs/login.js';
import { getUserInfo } from '@/api/user.js';
import { getAiRoleDetail } from '@/api/public.js';

import {
    HTTP_REQUEST_URL
} from '@/config/app';

export default {
    computed: {
        ...mapGetters(['isLogin']),
    },
    data() {
        return {
            imgHost: HTTP_REQUEST_URL,
            active: 0,
            messages: [],
            inputMessage: '',
            loading: false,
            scrollTop: 0,
            isAtBottom: true, // 是否在底部
            scrollViewHeight: 0, // 滚动区域高度
            sessionId: '',
            activeFunction: 'chat', // chat, image, video
            // 分页相关
            page: 1,
            limit: 10,
            hasMore: true,
            loadingMore: false,
            aiQuestion: '',
            // 文件上传相关
            uploadedImages: [], // 上传的图片URL数组
            uploadedVideo: '', // 上传的视频URL
            uploading: false, // 上传中状态
            isChoosingFile: false, // 是否正在选择文件（用于避免onShow重复加载）
            // 个人用户信息
            userInfo: {},
            roleId: '', // 传递进来的AI员工ID
            roleDetail: null, // AI员工详情
            aiModelName: 'qwen3.5-plus', // 当前选择的模型名称
        };
    },
    onLoad(options) {
        // 生成会话ID
        this.sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        console.log('sessionId',this.sessionId);

        //AI员工
        if (options && options.id) {
            this.roleId = options.id;
            // 获取员工详情
            getAiRoleDetail(this.roleId, this.sessionId).then(res => {
                if (res.status === 200 && res.data) {
                    this.roleDetail = res.data;
                    this.page = 1;
                    this.hasMore = true;
                    this.messages = [];
                    this.getHistoryMessages();
                }
            }).catch(err => {
                console.error('获取AI员工详情数据失败', err);
            });
        }

        // 初始化时添加系统消息
        this.page = 1;
        this.hasMore = true;
        this.getAiQuestion();
        
        // 获取算力配置（包含模型信息）
        this.loadComputePowerConfig();
    },
    onReady() {
        // 获取滚动区域高度
        const query = uni.createSelectorQuery().in(this);
        query.select('.chat-list').boundingClientRect(data => {
            if (data) {
                this.scrollViewHeight = data.height;
            }
        }).exec();
    },
    onPullDownRefresh() {
        // 下拉刷新，重新加载第一页
        this.page = 1;
        this.hasMore = true;
        this.messages = [];
        this.getHistoryMessages();
        uni.stopPullDownRefresh();
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

        // 如果正在选择文件，不重新加载历史消息
        if (this.isChoosingFile) {
            this.isChoosingFile = false;
            return;
        }

        //获取个人用户信息
        this.getUserInfo();
        this.getHistoryMessages();
    },
    methods: {
        /**
		 * 获取个人用户信息
		 */
		getUserInfo: function () {
			let that = this;
			getUserInfo().then((res) => {
				that.userInfo = res.data;
                if(that.userInfo.is_money_level == 0){
                    uni.showModal({
                        title: '提示',
                        content: '您不是会员，无法使用该功能',
                        showCancel: true,
                        confirmText: '去升级',
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定');
                                uni.navigateTo({ url: '/pages/annex/vip_paid/index' });
                            } else if (res.cancel) {
                                console.log('用户点击取消');
								uni.reLaunch({
									url:'/pages/index_/index'
								})
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
         * 获取算力配置
         */
        loadComputePowerConfig() {
            getComputePowerConfig().then(res => {
                if (res.status === 200 && res.data && res.data.ai_text_model) {
                    this.aiModelName = res.data.ai_text_model;
                }
            }).catch(err => {
                console.error('获取算力配置失败', err);
            });
        },
        /**
         * 处理返回按钮点击
         */
        handleBack() {
            // 获取当前页面栈
            const pages = getCurrentPages();
            
            // 如果页面栈大于1，说明有上一页，可以正常返回
            if (pages.length > 1) {
                uni.navigateBack({
                    delta: 1
                });
            } else {
                // 如果页面栈只有1页，说明是从tabbar跳转过来的，返回到首页
                uni.switchTab({
                    url: '/pages/index_/index'
                });
            }
        },
        
        // 添加文本格式化方法
        formatText(text) {
            if (!text) return '';
            // 将换行符转换为 HTML 换行标签
            return text.replace(/\n/g, '<br>');
        },
        // 复制文字
        copyText(text) {
            uni.setClipboardData({
                data: text,
                success: () => {
                    uni.showToast({
                        title: '复制成功',
                        icon: 'success'
                    });
                },
                fail: (err) => {
                    console.log(err);
                    uni.showToast({
                        title: '复制失败',
                        icon: 'none'
                    });
                }
            });
        },
        getAiQuestion() {
            getAiQuestion().then(res => {
                if (res.status === 200 && res.data) {
                    this.aiQuestion = res.data;
                    console.log(this.aiQuestion);
                }
            });
        },
        loadError: function(msg) {
            // 使用Vue.set或this.$set来确保响应式更新
            this.$set(msg, 'loadError', true);
        },
        getHistoryMessages() {
            if (this.loadingMore || !this.hasMore) return;
            
            this.loadingMore = true;
            
            // 调用获取历史消息接口
            aiGetHistory(this.page, this.limit,this.sessionId)
                .then(res => {
                    if (res.status === 200 && res.data) {
                        // 处理历史消息，添加 reasoning_expanded 属性
                        let historyMessages = res.data.map(msg => {
                            if (msg.question_type == 1) {
                                msg.content_url = msg.content_url.split(',');
                            }
                            msg.reasoning_expanded = false;
                            return msg;
                        });
                        historyMessages = historyMessages.reverse();
                        console.log('historyMessages',historyMessages);
                        // 如果是第一页，直接替换消息列表
                        if (this.page === 1) {
                            //反转一下historyMessages
                            this.messages = historyMessages;
                            this.scrollToBottom();
                        } else {
                            // 否则，将新消息添加到列表前面
                            this.messages = [...historyMessages, ...this.messages];
                        }
                        
                        // 判断是否还有更多数据
                        if (res.data.length < this.limit) {
                            this.hasMore = false;
                        } else {
                            this.page++;
                        }
                    } else {
                        this.hasMore = false;
                    }
                })
                .finally(() => {
                    this.loadingMore = false;
                });
        },
        /**
         * 获取输入框占位符
         */
        getPlaceholder() {
            switch (this.activeFunction) {
                case 'chat':
                    return '给AI智能体发送消息';
                case 'image':
                    return '描述你想要生成的图像';
                case 'video':
                    return '描述你想要生成的视频';
                default:
                    return '给AI智能体发送消息';
            }
        },

        /**
         * 切换功能模式
         * @param string functionType 功能类型（chat/image/video）
         */
        switchFunction(functionType) {
            if (this.activeFunction === functionType) return;
            
            // 切换功能时清空已上传的文件
            this.uploadedImages = [];
            this.uploadedVideo = '';
            this.uploading = false;
            
            // 切换功能
            this.activeFunction = functionType;
        },

        fastSendMessage(question) {
            this.inputMessage = question;
            this.sendMessage();
        },
        
        /**
         * 选择文件
         */
        chooseFile() {
            uni.showActionSheet({
                itemList: ['选择图片', '选择视频'],
                success: (res) => {
                    if (res.tapIndex === 0) {
                        this.chooseImage();
                    } else if (res.tapIndex === 1) {
                        this.chooseVideo();
                    }
                }
            });
        },
        
        /**
         * 选择图片
         */
        chooseImage() {
            if (this.uploadedVideo) {
                uni.showToast({ title: '已选择视频，无法同时选择图片', icon: 'none' });
                return;
            }
            this.isChoosingFile = true;
            uni.chooseImage({
                count: 9 - this.uploadedImages.length,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    this.uploading = true;
                    const tempFiles = res.tempFilePaths;
                    const uploadPromises = tempFiles.map(tempFile => {
                        return this.uploadFile(tempFile, 'image');
                    });
                    Promise.all(uploadPromises).then(uploadedUrls => {
                        this.uploading = false;
                        this.uploadedImages = [...this.uploadedImages, ...uploadedUrls];
                    }).catch(err => {
                        this.uploading = false;
                        uni.showToast({ title: '图片上传失败', icon: 'none' });
                    });
                },
                complete: () => {
                    this.isChoosingFile = false;
                }
            });
        },
        
        /**
         * 选择视频
         */
        chooseVideo() {
            if (this.uploadedImages.length > 0) {
                uni.showToast({ title: '已选择图片，无法同时选择视频', icon: 'none' });
                return;
            }
            this.isChoosingFile = true;
            uni.chooseVideo({
                sourceType: ['album', 'camera'],
                maxDuration: 60,
                success: (res) => {
                    this.uploading = true;
                    this.uploadFile(res.tempFilePath, 'video').then(url => {
                        this.uploading = false;
                        this.uploadedVideo = url;
                    }).catch(err => {
                        this.uploading = false;
                        uni.showToast({ title: '视频上传失败', icon: 'none' });
                    });
                },
                complete: () => {
                    this.isChoosingFile = false;
                },
            });
        },
        
        /**
         * 上传文件到OSS（直传）
         */
        uploadFile(tempFilePath, fileType) {
            const token = uni.getStorageSync('LOGIN_STATUS_TOKEN') || '';
            
            return new Promise((resolve, reject) => {
                // 先获取OSS配置
                uni.request({
                    url: config.HTTP_REQUEST_URL + '/api/upload/oss_config',
                    method: 'POST',
                    header: {
                        'Authorization': 'Bearer ' + token
                    },
                    success: (res) => {
                        if (res.data.status !== 200) {
                            reject(new Error(res.data.msg || '获取OSS配置失败'));
                            return;
                        }
                        
                        const ossConfig = res.data.data;
                        
                        // 生成文件名（包含时间戳和随机字符串）
                        const timestamp = Date.now();
                        const randomStr = Math.random().toString(36).substr(2, 9);
                        const fileExt = fileType === 'video' ? '.mp4' : '.jpg';
                        const fileName = 'store/' + timestamp + '_' + randomStr + fileExt;
                        
                        // 构建OSS上传URL
                        const ossUploadUrl = ossConfig.host;
                        
                        // 直传到OSS
                        uni.uploadFile({
                            url: ossUploadUrl,
                            filePath: tempFilePath,
                            name: 'file',
                            formData: {
                                'key': fileName,
                                'policy': ossConfig.policy,
                                'OSSAccessKeyId': ossConfig.accessid,
                                'signature': ossConfig.signature,
                                'success_action_status': '200',
                                'x-oss-object-acl': 'public-read'
                            },
                            success: (uploadRes) => {
                                // 上传成功，获取文件URL
                                const fileUrl = ossConfig.host + '/' + fileName;
                                
                                // 通知服务器记录文件
                                uni.request({
                                    url: config.HTTP_REQUEST_URL + '/api/upload/record_oss_file',
                                    method: 'POST',
                                    header: {
                                        'Authorization': 'Bearer ' + token,
                                        'Content-Type': 'application/json'
                                    },
                                    data: JSON.stringify({
                                        url: fileUrl,
                                        filename: fileName,
                                        file_type: fileType
                                    }),
                                    success: (notifyRes) => {
                                        if (notifyRes.data.status === 200) {
                                            resolve(fileUrl);
                                        } else {
                                            reject(new Error(notifyRes.data.msg || '文件记录失败'));
                                        }
                                    },
                                    fail: (err) => {
                                        reject(new Error('文件记录失败'));
                                    }
                                });
                            },
                            fail: (err) => {
                                reject(new Error('上传失败: ' + JSON.stringify(err)));
                            }
                        });
                    },
                    fail: (err) => {
                        reject(new Error('获取配置失败'));
                    }
                });
            });
        },
        
        /**
         * 删除已上传的文件
         */
        deleteFile(type, index) {
            if (type === 'image') {
                this.uploadedImages.splice(index, 1);
            } else if (type === 'video') {
                this.uploadedVideo = '';
            }
        },
        
        /**
         * 发送消息
         */
        sendMessage() {
            if (!this.inputMessage.trim()) return;
            if(this.loading){
                uni.showToast({
                    title: '任务处理中',
                    icon: 'loading',
                    duration: 2000
                });
                return;
            }
            
            let message = this.inputMessage.trim();
            // 添加用户消息
            let userMessage = { 
                role: 'user', 
                content: message ,
                question_type: 0,
            };
            if (this.uploadedImages.length > 0) {
                userMessage.images = this.uploadedImages;
                userMessage.question_type = 1;
                userMessage.content_url = this.uploadedImages;
            }
            if (this.uploadedVideo) {
                userMessage.video = this.uploadedVideo;
                userMessage.question_type = 2;
                userMessage.content_url = this.uploadedVideo;
            }
            this.messages.push(userMessage);
            this.inputMessage = '';
            this.scrollToBottom(true);
            
            this.loading = true;
            
            // 根据当前激活的功能类型调用相应的API
            if (this.activeFunction === 'chat') {
                this.sendChatMessage(message);
            } else if (this.activeFunction === 'image') {
                // this.generateImage(message);
                this.generateImageSync(message);
            } else if (this.activeFunction === 'video') {
                this.generateVideo(message);
            }
            
            // 清空已上传的文件
            this.uploadedImages = [];
            this.uploadedVideo = '';
        },
        
        /**
         * 发送聊天消息
         */
        sendChatMessage(message) {
            // 调用AI对话接口
            // aiChat({ message, session_id: this.sessionId })
            //     .then(res => {
            //         if (res.status === 200 && res.data) {
            //             // 添加AI回复
            //             this.messages.push({ role: 'assistant', type: 'conversation', content: res.data.message || '抱歉，我没有理解你的问题，请再试一次。' });
            //         } else {
            //             this.messages.push({ role: 'assistant', type: 'conversation', content: '抱歉，我暂时无法回答你的问题，请稍后再试。' });
            //         }
            //     })
            //     .catch(err => {
            //         console.error('AI对话失败:', err);
            //         this.messages.push({ role: 'assistant', type: 'conversation', content: '抱歉，服务器暂时无法响应，请稍后再试。' });
            //     })
            //     .finally(() => {
            //         this.loading = false;
            //         this.scrollToBottom();
            //     });


            this.inputMessage = '';
            this.scrollToBottom(true);
            
            this.loading = true;
            
            // 调用流式响应API
            // this.sendChatStream(message);
			
			this.sendChatStreamThink(message, this.uploadedImages, this.uploadedVideo);
        },

        /**
         * 发送流式聊天消息
         */
        sendChatStream(message) {
            try{
                // 创建AI回复消息对象，用于实时更新
                const aiMessageIndex = this.messages.length;
                this.messages.push({ 
                    role: 'assistant', 
                    type: 'conversation', 
                    content: '' 
                });
                
                // 构建请求参数对象
                const params = {
                    message: message,
                    session_id: this.sessionId,
                    role_id: this.roleId
                };
                
                // 获取token
                const token = uni.getStorageSync('LOGIN_STATUS_TOKEN') || '';
                
                // 保存this引用
                const that = this;


                // 构建API请求URL
                const baseUrl = config.HTTP_REQUEST_URL;
                const apiUrl = `${baseUrl}/api/ai/chat_stream`;

                const requestTask = uni.request({
                    url: apiUrl,
                    timeout: 120000,
                    responseType: 'text',
                    method: 'POST',
                    enableChunked: true,  //配置这里
                    data: JSON.stringify(params),
                    header: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    success: response => {
                        console.log(response)
                        if(response.statusCode === 500){
                            uni.showToast({
                                title: '服务器频繁，请稍后再试。',
                                icon: 'none',
                                duration: 2000
                            });
                            return;
                        }
                        if(response.statusCode === 503){
                            uni.showToast({
                                title: '请求频繁，请稍后再试。',
                                icon: 'none',
                                duration: 2000
                            });
                            return;
                        }
                    },
                    fail: error => {}
                })
                requestTask.onHeadersReceived(function(res) {
                    // console.log('onHeadersReceived',res.header);
                });
                // 这里监听消息
                // requestTask.onChunkReceived(function(res) {
                //     let decoder = new TextDecoder('utf-8');
                //     let text = decoder.decode(new Uint8Array(res.data));
                //     console.log(text)
                // })
                let buffer = '';

                requestTask.onChunkReceived(function(res) {
                    that.loading = false;
                    const uint8Array = new Uint8Array(res.data);
                    let text = String.fromCharCode.apply(null, uint8Array);
                    text = decodeURIComponent(escape(text));
                    // console.log('onChunkReceived',text);

                    // 解码数据
                    buffer += text;
                    // 处理数据行
                    const lines = buffer.split('\n');
                    buffer = lines.pop(); // 保留最后不完整的行
                    
                    lines.forEach(line => {
                        line = line.trim();
                        if (line.startsWith('data:')) {
                            // 提取data部分
                            const dataPart = line.substring(5);
                            const data = JSON.parse(dataPart);
                            console.log('onChunkReceiveddata',data);
                            if (data.output && data.output.choices && data.output.choices[0] && data.output.choices[0].message && data.output.choices[0].message.content) {
                                const content = data.output.choices[0].message.content;
                                // 更新AI回复内容
                                that.messages[aiMessageIndex].content += content;
                                that.scrollToBottom();
                            }
                        }
                    });
                });
            }catch(e){
                console.error('AI对话失败:', e);
                this.messages.push({ role: 'assistant', type: 'conversation', content: '抱歉，服务器暂时无法响应，请稍后再试。' });
            }
        },
        
		/**
		 * 发送流式聊天消息（思考模式）
		 */
		sendChatStreamThink(message, images = [], video = '') {
		    try{
		        // 创建AI回复消息对象，用于实时更新
                const aiMessageIndex = this.messages.length;
                this.messages.push({ 
                    role: 'assistant', 
                    type: 'conversation', 
                    content: '',
                    reasoning_content: '',
                    reasoning_expanded: true 
                });
		        
		        // 构建请求参数对象
		        const params = {
		            message: message,
		            session_id: this.sessionId,
                    role_id: this.roleId
		        };
		        
		        // 添加图片参数
		        if (images && images.length > 0) {
		            params.image_url = images;
                    
		        }
		        
		        // 添加视频参数
		        if (video) {
		            params.video_url = video;
		        }
		        
		        // 获取token
		        const token = uni.getStorageSync('LOGIN_STATUS_TOKEN') || '';
		        
		        // 保存this引用
		        const that = this;
		
		
		        // 构建API请求URL
		        const baseUrl = config.HTTP_REQUEST_URL;
		        const apiUrl = `${baseUrl}/api/ai/chat_stream_think`;
		
		        const requestTask = uni.request({
		            url: apiUrl,
		            timeout: 120000,
		            responseType: 'text',
		            method: 'POST',
		            enableChunked: true,  //配置这里
		            data: JSON.stringify(params),
		            header: {
		                'Content-Type': 'application/json',
		                'Authorization': 'Bearer ' + token,
		            },
		            success: response => {
                        console.log('sendChatStreamThink',response)
                        that.loading = false;
                        if(response.statusCode === 500){
                            uni.showToast({
                                title: '服务器繁忙，请稍后再试。',
                                icon: 'none',
                                duration: 2000
                            });
                            return;
                        }
                        if(response.statusCode === 503){
                            uni.showToast({
                                title: '请求频繁，请稍后再试。',
                                icon: 'none',
                                duration: 2000
                            });
                            return;
                        }

                        if(response.statusCode === 504){
                            uni.showModal({
                                title: '提示',
                                content: '算力不足，请充值',
                                showCancel: true,
                                confirmText: '去充值',
                                success: function (res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定');
                                        uni.navigateTo({ url: '/pages/w/computing_power_recharge' });
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

                        if(response.statusCode === 403){
                            uni.showModal({
                                title: '提示',
                                content: '您不是会员，无法使用该功能',
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
                            return;
                        }
            },
		            fail: error => {}
		        })
		        requestTask.onHeadersReceived(function(res) {
		            // console.log('onHeadersReceived',res.header);
		        });
		        // 这里监听消息
		        // requestTask.onChunkReceived(function(res) {
		        //     let decoder = new TextDecoder('utf-8');
		        //     let text = decoder.decode(new Uint8Array(res.data));
		        //     console.log(text)
		        // })
		        let buffer = '';
		
		        requestTask.onChunkReceived(function(res) {
		            that.loading = false;
		            const uint8Array = new Uint8Array(res.data);
		            let text = String.fromCharCode.apply(null, uint8Array);
		            text = decodeURIComponent(escape(text));
		            // console.log('onChunkReceived',text);
		
		            // 解码数据
		            buffer += text;
		            // 处理数据行
		            const lines = buffer.split('\n');
		            buffer = lines.pop(); // 保留最后不完整的行
		            
		            lines.forEach(line => {
		                line = line.trim();
		                if (line.startsWith('data:')) {
		                    // 提取data部分
		                    const dataPart = line.substring(5);
		                    const data = JSON.parse(dataPart);
		                    // console.log('onChunkReceiveddata',data);
                            // 思考过程
                            if (data.choices && data.choices[0] && data.choices[0].delta && data.choices[0].delta.reasoning_content) {
                                const reasoning_content = data.choices[0].delta.reasoning_content;
                                // 更新AI思考过程
                                that.messages[aiMessageIndex].reasoning_content += reasoning_content;
                                that.scrollToBottom();
                            }
                            // 流式回复内容
                            if (data.choices && data.choices[0] && data.choices[0].delta && data.choices[0].delta.content) {
                                // 流式数据结束后，5秒自动收起思考过程
                                that.autoCollapseReasoning(aiMessageIndex);
                                const content = data.choices[0].delta.content;
                                // 更新AI回复内容
                                that.messages[aiMessageIndex].content += content;
                                that.scrollToBottom();
                            }
		                }
		            });
		        });
		    }catch(e){
		        console.error('AI对话失败:', e);
		        this.messages.push({ role: 'assistant', type: 'conversation', content: '抱歉，服务器暂时无法响应，请稍后再试。' });
		    }
		},
		
        /**
         * 发送流式聊天消息
         */
        sendChatStream1(message) {
            try{
                // 构建API请求URL
                const baseUrl = config.HTTP_REQUEST_URL;
                const apiUrl = `${baseUrl}/api/ai/chat_stream`;

                
                // 创建AI回复消息对象，用于实时更新
                const aiMessageIndex = this.messages.length;
                this.messages.push({ 
                    role: 'assistant', 
                    type: 'conversation', 
                    content: '' 
                });
                
                // 构建请求参数对象
                const params = {
                    message: message,
                    session_id: this.sessionId
                };
                
                // 获取token
                const token = uni.getStorageSync('LOGIN_STATUS_TOKEN') || '';
                
                // 保存this引用
                const that = this;
                
                // 发送流式请求
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'Form-type': 'h5'
                    },
                    body: JSON.stringify(params)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('网络响应错误');
                    }
                    
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let buffer = '';
                    
                    // 处理流式数据
                    const processStream = () => {
                        return reader.read().then(({ done, value }) => {
                            if (done) {
                                that.loading = false;
                                that.scrollToBottom(true);
                                return;
                            }
                            
                            // 解码数据
                            buffer += decoder.decode(value, { stream: true });
                            // 处理数据行
                            const lines = buffer.split('\n');
                            buffer = lines.pop(); // 保留最后不完整的行
                            
                            // 临时存储当前消息的data部分
                            let currentData = '';
                            
                            lines.forEach(line => {
                                line = line.trim();
                                if (line.startsWith('data:')) {
                                    // 提取data部分
                                    const dataPart = line.substring(5);
                                    const data = JSON.parse(dataPart);
                                    if (data.output && data.output.choices && data.output.choices[0] && data.output.choices[0].message && data.output.choices[0].message.content) {
                                        const content = data.output.choices[0].message.content;
                                        // 更新AI回复内容
                                        that.messages[aiMessageIndex].content += content;
                                        that.scrollToBottom(true);
                                    }
                                }
                                // if (!line) {
                                //     // 空行表示一条消息的结束，处理当前消息
                                //     if (currentData) {
                                //         try {
                                //             const data = JSON.parse(currentData);
                                //             console.log('解析到的数据:', data);
                                //             // 从标准SSE格式的数据中提取content
                                //             if (data.output && data.output.choices && data.output.choices[0] && data.output.choices[0].message && data.output.choices[0].message.content) {
                                //                 const content = data.output.choices[0].message.content;
                                //                 // 更新AI回复内容
                                //                 that.messages[aiMessageIndex].content += content;
                                //                 that.scrollToBottom();
                                //             }
                                //         } catch (e) {
                                //             console.error('解析流式数据失败:', e);
                                //         }
                                //         // 重置currentData
                                //         currentData = '';
                                //     }
                                //     return;
                                // }
                                
                                // // 处理data字段
                                // if (line.startsWith('data: ')) {
                                //     // 提取data部分
                                //     const dataPart = line.substring(6);
                                //     currentData += dataPart;
                                // }
                            });
                            
                            return processStream();
                        });
                    };
                    
                    return processStream();
                })
                .catch(err => {
                    console.error('AI对话失败:', err);
                    that.messages[aiMessageIndex].content = '抱歉，服务器暂时无法响应，请稍后再试。';
                    that.loading = false;
                    that.scrollToBottom(true);
                });

            }catch(e){
                console.error('AI对话失败:', e);
                this.messages.push({ role: 'assistant', type: 'conversation', content: '抱歉，服务器暂时无法响应，请稍后再试。' });
            }
        },

        //同步生成图像
        generateImageSync(prompt) {
            if (!prompt.trim()) {
                uni.showToast({ title: '请输入图像描述', icon: 'none' });
                return;
            }
            
            // 调用同步图像生成接口
            aiGenerateImageSync({ prompt, session_id: this.sessionId })
                .then(res => {
                    if (res.status === 200 && res.data) {
                        // 添加图像消息
                        this.messages.push({ role: 'assistant', type: 'image', content_url: res.data.url });
                        this.loading = false;
                        this.scrollToBottom(true);
                    }else if (res.status == 400097) {
                        this.loading = false;
                        uni.showModal({
                            title: '提示',
                            content: '您不是会员，无法使用该功能',
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
                    }else if (res.status == 100105) {
                        this.loading = false;
                        uni.showModal({
                            title: '提示',
                            content: '算力不足，请充值',
                            showCancel: true,
                            confirmText: '去充值',
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定');
                                    uni.navigateTo({ url: '/pages/w/computing_power_recharge' });
                                } else if (res.cancel) {
                                    console.log('用户点击取消');
                                }
                            },
                            fail: function (res) {
                                console.log('showModal', res);
                            }
                        });
                    }
                })
                .catch(err => {
                    console.error('图像生成失败:', err);
                    uni.showToast({ title: err || '服务器暂时无法响应', icon: 'none' });
                }).finally(() => {
                });
        },
        
        /**
         * 生成图像
         */
        generateImage(prompt) {
            if (!prompt.trim()) {
                uni.showToast({ title: '请输入图像描述', icon: 'none' });
                return;
            }
            
            // 调用图像生成接口
            aiGenerateImage({ prompt, session_id: this.sessionId })
                .then(res => {
                    if (res.status === 200 && res.data && res.data.task_id) {
                        // 轮询获取图像结果
                        this.pollImageResult(res.data.task_id);
                    }else if (res.status == 400097) {
                        this.loading = false;
                        uni.showModal({
                            title: '提示',
                            content: '您不是会员，无法使用该功能',
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
                    }else if (res.status == 100105) {
                        this.loading = false;
                        uni.showModal({
                            title: '提示',
                            content: '算力不足，请充值',
                            showCancel: true,
                            confirmText: '去充值',
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定');
                                    uni.navigateTo({ url: '/pages/w/computing_power_recharge' });
                                } else if (res.cancel) {
                                    console.log('用户点击取消');
                                }
                            },
                            fail: function (res) {
                                console.log('showModal', res);
                            }
                        });
                    }
                })
                .catch(err => {
                    console.error('图像生成失败:', err);
                    uni.showToast({ title: err || '服务器暂时无法响应', icon: 'none' });
                }).finally(() => {
                });
        },
        
        /**
         * 轮询获取图像结果
         */
        pollImageResult(taskId) {
            let attempts = 0;
            const maxAttempts = 50;
            const interval = 2000;
            
            const poll = () => {
                if (attempts >= maxAttempts) {
                    this.loading = false;
                    uni.showToast({ title: '图像生成超时', icon: 'none' });
                    return;
                }
                
                aiGetImageResult(taskId)
                    .then(res => {
                        if (res.status === 200 && res.data) {
                            if (res.data.status === 'SUCCEEDED' && res.data.url) {
                                // 添加图像消息
                                this.messages.push({ role: 'assistant', type: 'image', content_url: res.data.url });
                                this.loading = false;
                                this.scrollToBottom(true);
                            } else if (res.data.status === 'FAILED') {
                                this.loading = false;
                                uni.showToast({ title: '图像生成失败', icon: 'none' });
                            } else {
                                // 继续轮询
                                attempts++;
                                setTimeout(poll, interval);
                            }
                        } else {
                            attempts++;
                            setTimeout(poll, interval);
                        }
                    })
                    .catch(err => {
                        console.error('获取图像结果失败:', err);
                        attempts++;
                        setTimeout(poll, interval);
                    });
            };
            
            poll();
        },
        
        /**
         * 生成视频
         */
        generateVideo(prompt) {
            if (!prompt.trim()) {
                uni.showToast({ title: '请输入视频描述', icon: 'none' });
                return;
            }
            
            // 调用视频生成接口
            aiGenerateVideo({ prompt, session_id: this.sessionId })
                .then(res => {
                    if (res.status === 200 && res.data && res.data.task_id) {
                        // 轮询获取视频结果
                        this.pollVideoResult(res.data.task_id);
                    }else if (res.status == 400097) {
                        this.loading = false;
                        uni.showModal({
                            title: '提示',
                            content: '您不是会员，无法使用该功能',
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
                    }else if (res.status == 100105) {
                        this.loading = false;
                        uni.showModal({
                            title: '提示',
                            content: '算力不足，请充值',
                            showCancel: true,
                            confirmText: '去充值',
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定');
                                    uni.navigateTo({ url: '/pages/w/computing_power_recharge' });
                                } else if (res.cancel) {
                                    console.log('用户点击取消');
                                }
                            },
                            fail: function (res) {
                                console.log('showModal', res);
                            }
                        });
                    }
                })
                .catch(err => {
                    console.error('视频生成失败:', err);
                    uni.showToast({ title: err || '服务器暂时无法响应', icon: 'none' });
                }).finally(() => {
                });
        },
        
        /**
         * 轮询获取视频结果
         */
        pollVideoResult(taskId) {
            let attempts = 0;
            const maxAttempts = 60;
            const interval = 3000;
            
            const poll = () => {
                if (attempts >= maxAttempts) {
                    this.loading = false;
                    uni.showToast({ title: '视频生成超时', icon: 'none' });
                    return;
                }
                
                aiGetVideoResult(taskId)
                    .then(res => {
                        if (res.status === 200 && res.data) {
                            if (res.data.status === 'SUCCEEDED' && res.data.url) {
                                // 添加视频消息
                                this.messages.push({ role: 'assistant', type: 'video', content_url: res.data.url });
                                this.loading = false;
                                this.scrollToBottom(true);
                            } else if (res.data.status === 'FAILED') {
                                this.loading = false;
                                uni.showToast({ title: '视频生成失败', icon: 'none' });
                            } else {
                                // 继续轮询
                                attempts++;
                                setTimeout(poll, interval);
                            }
                        } else {
                            attempts++;
                            setTimeout(poll, interval);
                        }
                    })
                    .catch(err => {
                        console.error('获取视频结果失败:', err);
                        attempts++;
                        setTimeout(poll, interval);
                    });
            };
            
            poll();
        },
        
        /**
         * 监听滚动
         */
        onScroll(e) {
            const { scrollTop, scrollHeight } = e.detail;
            if (this.scrollViewHeight > 0) {
                this.isAtBottom = scrollTop + this.scrollViewHeight >= scrollHeight - 100;
            } else {
                // 如果还没获取到高度，兜底逻辑
                this.isAtBottom = true;
            }
        },
        
        scrollToBottom(force = false) {
            if (force || this.isAtBottom) {
                this.scrollTop = this.scrollTop + 1;
                this.$nextTick(() => {
                    this.scrollTop = 9999999;
                });
            }
        },
        
        /**
         * 加载更多历史消息
         */
        loadMore() {
            //TODO 需修复加载问题
            if (!this.loadingMore && this.hasMore) {
                this.getHistoryMessages();
            }
        },
        
        /**
         * 预览图片并提供下载功能
         * @param string imageUrl 图片URL
         */
        previewImage(imageUrl) {
            // 使用uni-app的图片预览API
            uni.previewImage({
                urls: [imageUrl],
                current: imageUrl,
                success: function(res) {
                    console.log('预览图片成功');
                },
                fail: function(err) {
                    console.error('预览图片失败:', err);
                }
            });
        },

        /**
         * 播放视频
         * @param string videoUrl 视频URL
         */
        playVideo(videoUrl) {
            uni.navigateTo({
                url: `/pages/video/video?url=${encodeURIComponent(videoUrl)}`,
                fail: function(err) {
                    console.error('跳转视频播放页面失败:', err);
                    uni.showToast({
                        title: '视频播放失败',
                        icon: 'none'
                    });
                }
            });
        },

        /**
         * 下载视频并保存到相册
         * @param string videoUrl 视频URL
         */
        downloadVideo(videoUrl) {
            uni.showLoading({ title: '下载中...' });
            
            // 下载视频文件
            uni.downloadFile({
                url: videoUrl,
                success: (res) => {
                    if (res.statusCode === 200) {
                        // 保存视频到相册
                        uni.saveVideoToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: () => {
                                uni.hideLoading();
                                uni.showToast({ title: '视频已保存到相册', icon: 'success' });
                            },
                            fail: (err) => {
                                uni.hideLoading();
                                console.error('保存视频失败:', err);
                                uni.showToast({ title: '保存视频失败', icon: 'none' });
                            }
                        });
                    } else {
                        uni.hideLoading();
                        uni.showToast({ title: '下载视频失败', icon: 'none' });
                    }
                },
                fail: (err) => {
                    uni.hideLoading();
                    console.error('下载视频失败:', err);
                    uni.showToast({ title: '下载视频失败', icon: 'none' });
                }
            });
        },
        
        /**
         * 切换思考过程展开/收起状态
         */
        toggleReasoning(msg) {
            console.log(msg);
            if (!msg.reasoning_expanded) {
                msg.reasoning_expanded = true;
            }else{
                msg.reasoning_expanded = false;
            }
        },
        
        /**
         * 自动收起思考过程
         */
        autoCollapseReasoning(index) {
            setTimeout(() => {
                if (this.messages[index]) {
                    this.messages[index].reasoning_expanded = false;
                }
            }, 2000); // 2秒后自动收起
        }
    },
};
</script>
<style scoped lang="less">
.search-input {
    border: none;
    outline: none;
    width: 100%;
    height: 96rpx;
    line-height: 96rpx;
}
.maike {
    width: 40rpx;
    height: 40rpx;
}
.feiji {
    width: 60rpx;
    height: 60rpx;
    background-color: #C4D8FF;
    display: flex;
    align-items: center;
    justify-content: center;
}
.fc27 {
    color: #2769ed;
}
.p-x-24 {
    padding-left: 24rpx;
    padding-right: 24rpx;
}
.p-y-18 {
    padding-top: 18rpx;
    padding-bottom: 18rpx;
}
.h96 {
    height: 96rpx;
}
.b-2 {
    border: 2rpx solid #E8E8E8;
}
.b-2-h {
    border: 2rpx solid #333;
}
.bg-lan {
    background-color: #2769ED;
}
.b-r-lan {
    border: 2rpx solid #2769ed;
}
.icon {
    width: 48rpx;
    height: 48rpx;
}
.page {
    background: 
        radial-gradient(at 0% 0%, #bed1fa 0%, transparent 50%), 
        radial-gradient(at 100% 0%, #ffffff 0%, transparent 50%), 
        radial-gradient(at 0% 50%, #e6d7f9 0%, transparent 50%), 
        radial-gradient(at 50% 100%, #f1f5f9 0%, transparent 50%), 
        #f8fafc;
    position: relative;
    font-size: 28rpx;
    color: #999;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .pic {
        width: 202rpx;
        height: 205rpx;
        border-radius: 46rpx;
    }
}
.p-x-60 {
    padding-left: 60rpx;
    padding-right: 60rpx;
}
.p-t-68 {
    padding-top: 68rpx;
}

/* 对话列表样式 */
.chat-list {
    flex: 1;
    padding: 20rpx;
    padding-bottom: 20rpx;
    height: 0;
    box-sizing: border-box;
}

.system-message {
    text-align: center;
    margin-bottom: 30rpx;
}

.message-item {
    margin-bottom: 40rpx;
    padding: 0 20rpx;
}

.user-message {
    justify-content: flex-end;
}

.ai-message {
    align-items: flex-start;
}

.ai-avatar {
    margin-top: 4rpx;
}

.message-content {
    max-width: 86%;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    overflow: hidden;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
}

.user-avatar {
    margin-top: 4rpx;
}

.user-message-content {
    max-width: 86%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.message-bubble {
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    line-height: 1.6;
}

.image-list {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16rpx;
}

.image-item {
    width: 200rpx;
    height: 200rpx;
    border-radius: 8rpx;
    overflow: hidden;
    flex-shrink: 0;
}

.fixed-image {
    width: 100%;
    height: 100%;
    border-radius: 8rpx;
    background-color: #f5f5f5;
}

.video-container {
    width: 100%;
    border-radius: 8rpx;
    overflow: hidden;
}

.text-content {
    margin-top: 16rpx;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: anywhere;
    line-height: 1.6;
}

.max-w-80 {
    max-width: 86%;
}

.loading-message {
    padding: 20rpx 0;
}

.loading-icon {
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
}

/* 功能按钮样式 */
.function-buttons {
    margin-bottom: 15rpx;
}

/* 输入区域样式 */
/* 输入区域样式 */
.input-area {
    padding: 20rpx;
    background-color: #f6f6f6;
    border-top: 1rpx solid #e0e0e0;
    z-index: 1000;
}

/* 辅助样式 */
.w-32 {
    width: 32rpx;
}

.h-32 {
    height: 32rpx;
}

/* 加载更多样式 */
.loading-more {
    text-align: center;
    padding: 20rpx;
    font-size: 24rpx;
    color: #999;
}

/* 思考过程样式 */
.reasoning-container {
    margin-bottom: 12rpx;
}

.reasoning-header {
    font-size: 20rpx;
}

.reasoning-label {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
}

.sikao-icon {
    width: 32rpx;
    height: 32rpx;
}

.reasoning-toggle {
    color: #2769ED;
    font-size: 18rpx;
    cursor: pointer;
}

.reasoning-content {
    line-height: 36rpx;
    color: #666;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    overflow: hidden;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
}

.message-content view,
.message-content text,
.reasoning-content view,
.reasoning-content text {
    max-width: 100%;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
}

.mb-8 {
    margin-bottom: 8rpx;
}

.bg-e {
    background-color: #f0f0f0;
}

.no-more {
    text-align: center;
    padding: 20rpx;
    font-size: 24rpx;
    color: #999;
}

.rounded-full {
    border-radius: 50%;
}

.bg-2 {
    background-color: #f0f0f0;
}

.mr-12 {
    margin-right: 12rpx;
}

.p-12 {
    padding: 12rpx;
}

.max-h-400 {
    max-height: 400rpx;
}

.br-8 {
    border-radius: 8rpx;
}

.fc-bai {
    color: #fff;
}

.fc-1a {
    color: #1a1a1a;
}

.br-16 {
    border-radius: 16rpx;
}

.p-x-20 {
    padding-left: 20rpx;
    padding-right: 20rpx;
}

.p-y-10 {
    padding-top: 10rpx;
    padding-bottom: 10rpx;
}

.m-b-20 {
    margin-bottom: 20rpx;
}

/* 输入区域顶部提示样式 */
.top-tip {
    display: flex;
    justify-content: center;
    margin-bottom: 15rpx;
}

.input-ai-tip {
    font-size: 18rpx;
    color: #666;
    background-color: rgba(240, 240, 240, 0.8);
    padding: 6rpx 16rpx;
    border-radius: 16rpx;
    box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8rpx);
    text-align: center;
}

.m-r-20 {
    margin-right: 20rpx;
}

.m-t-32 {
    margin-top: 32rpx;
}

.x {
    display: flex;
    flex-direction: row;
}

.y {
    display: flex;
    flex-direction: column;
}

.c {
    align-items: center;
    justify-content: center;
}

.c-y {
    align-items: center;
}

.jc-sb {
    justify-content: space-between;
}

.jc-e {
    justify-content: flex-end;
}

.flex-1 {
    flex: 1;
}

.font-b {
    font-weight: bold;
}

.f32 {
    font-size: 32rpx;
}

.f28 {
    font-size: 28rpx;
}

.m-b-16 {
    margin-bottom: 16rpx;
}

.img {
    width: 100%;
    height: 100%;
}

/* AI推荐卡片样式 */
.ai-suggestion-container {
    padding: 40rpx 20rpx 0;
    margin-bottom: 20rpx;
    margin-top: 30rpx;
}
.ai-robot-header {
    height: 160rpx;
}
.robot-avatar {
    width: 180rpx;
    height: 180rpx;
    margin-right: 20rpx;
    margin-top: -60rpx;
}
.ai-robot-header text {
    margin-bottom: 60rpx;
}

.robot-greeting {
    font-size: 30rpx;
    font-weight: bold;
    color: #2769ED;
    background: linear-gradient(90deg, #2769ED 0%, #2979ff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.suggestion-card {
    position: relative;
    z-index: 1;
    background: linear-gradient(180deg, #e0f9e2 0%, #fef7f8 100%);
    box-sizing: border-box;
    padding: 24rpx;
    border-radius: 24rpx;
    min-height: 300rpx;
    margin-top: -60rpx;
    box-sizing: border-box;
    border: 4rpx solid #fff;
    padding-bottom: 40rpx;
}

.card-title-row {
    margin-bottom: 24rpx;
    padding-bottom: 16rpx;
}

.card-title-text {
    font-size: 30rpx;
    color: #2769ED;
    margin-left: 10rpx;
}

.refresh-text {
    font-size: 26rpx;
    color: #2769ED;
    margin-left: 6rpx;
}

.question-list {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}

.question-item {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20rpx 36rpx;
    border-radius: 40rpx;
    transition: all 0.3s;
}

.question-item:active {
    background-color: #f0f0f0;
    transform: scale(0.99);
}

.question-text {
    font-size: 28rpx;
    color: #333;
    line-height: 1.4;
}

.ai-disclaimer {
    display: flex;
    justify-content: center;
    margin-top: 30rpx;
    opacity: 0.6;
}

.ai-disclaimer text {
    font-size: 24rpx;
    color: #999;
}

/* 上传文件列表样式 */
.uploaded-files {
    padding: 20rpx;
    background-color: #f6f6f6;
    border-radius: 16rpx;
    margin-bottom: 16rpx;
}

.file-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
}

.file-item {
    position: relative;
    width: 160rpx;
    height: 160rpx;
    border-radius: 8rpx;
    overflow: hidden;
    background-color: #f5f5f5;
    flex-shrink: 0;
}

.file-img {
    width: 100%;
    height: 100%;
    border-radius: 8rpx;
}

.file-delete {
    position: absolute;
    top: 4rpx;
    right: 4rpx;
    width: 40rpx;
    height: 40rpx;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    line-height: 1;
    cursor: pointer;
    z-index: 10;
}

.file-delete:active {
    background-color: rgba(0, 0, 0, 0.8);
}

/* 上传中样式 */
.uploading-item {
    background-color: #e0e0e0;
    border: 2rpx dashed #999;
}

.uploading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 8rpx;
    flex-direction: column;
}

.uploading-spinner {
    width: 40rpx;
    height: 40rpx;
    border: 4rpx solid #f3f3f3;
    border-top: 4rpx solid #2769ED;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.uploading-text {
    margin-top: 12rpx;
    font-size: 24rpx;
    color: #2769ED;
}

/* 角色信息卡片样式 */
.role-detail-card {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx 40rpx;
    margin: 20rpx 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}
.role-avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    border: 2rpx solid #fff;
}
.role-name {
    color: #333;
}
.role-desc {
    line-height: 1.5;
}
.shadow-sm {
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.1);
}
.text-center {
    text-align: center;
}
.flex-none {
    flex: none;
}
.ml-24 {
    margin-left: 24rpx;
}
.line-clamp-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
}

.new-input-area {
    padding: 0 20rpx 40rpx;
    background: transparent;
    z-index: 1000;
}
.new-input-box {
    background: #fff;
    border-radius: 36rpx;
    padding: 20rpx 30rpx 40rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);
}
.icon-btn {
    width: 44rpx;
    height: 44rpx;
}
.icon-img {
    width: 44rpx;
    height: 44rpx;
}
.v-divider {
    width: 2rpx;
    height: 36rpx;
    background: #EEEEEE;
    margin: 0 10rpx;
}
.send-btn {
    width: 68rpx;
    height: 68rpx;
}
.send-icon {
    width: 100%;
    height: 100%;
    display: block;
}
.bottom-border-light {
    // border-bottom: 2rpx solid #F5F6F8;
    padding-bottom: 10rpx !important;
}
.bottom-tools {
    display: flex;
    flex-wrap: wrap;
}
.tool-btn {
    height: 64rpx;
    padding: 0 30rpx;
    border-radius: 26rpx;
    border: 2rpx solid #E5E5E5;
    font-size: 26rpx;
    color: #333;
    transition: all 0.2s;
}
.tool-btn.active {
    border-color: #2769ED;
    color: #2769ED;
    background: #F0F5FF;
}
.model-btn {
    height: 64rpx;
    padding: 0 24rpx;
    border-radius: 32rpx;
    border: 2rpx solid #E5E5E5;
    font-size: 26rpx;
    color: #333;
    transition: all 0.2s;
}
.model-btn.active {
    border-color: #2769ED;
    color: #2769ED;
    background: #F0F5FF;
}
.model-icon {
    width: 48rpx;
    height: 48rpx;
}
</style>
