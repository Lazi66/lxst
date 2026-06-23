<template>
    <view class="page-container">
        <!-- 导航栏 -->
        <l-nav title="1. 输入文字" bg-color="#f8f9fa" @back="handleBack"></l-nav>

        <view class="content-wrap y">
            <view class="editor-area y">
                <input class="title-input" v-model="title" placeholder="标题" placeholder-class="ph-style" maxlength="50" />
                <view class="divider"></view>
                <view class="textarea-box y">
                    <scroll-view scroll-y class="text-scroll">
                        <textarea class="content-textarea" v-model="content" placeholder="请输入视频文案" placeholder-class="ph-style" maxlength="2400" :auto-height="true"></textarea>
                    </scroll-view>
                    
                    <view class="textarea-bottom x c-y jc-sb m-t-20">
                        <view class="clear-btn x c-y" v-if="content" @click="handleClear">
                            <uv-icon name="trash" color="#999" size="16"></uv-icon>
                            <text class="clear-text m-l-10">清空</text>
                        </view>
                        <view class="example-btn x c-y" v-else @click="fillExample">
                            <uv-icon name="file-text" color="#666" size="14"></uv-icon>
                            <text class="example-text m-l-10">示例文案</text>
                        </view>
                        <view class="char-count">{{ content.length }}/2400</view>
                    </view>
                </view>
            </view>

            <!-- 选中的素材区域 -->
            <view class="media-preview-area x flex-wrap" v-if="mediaList.length > 0">
                <view 
                    class="media-item" 
                    v-for="(item, index) in mediaList" 
                    :key="index"
                >
                    <image class="media-img" :src="item.url" mode="aspectFill" v-if="item.type === 'image'" @click="previewMedia(index)"></image>
                    <video class="media-video" :src="item.url" :controls="false" :show-center-play-btn="false" v-if="item.type === 'video'" @click="previewMedia(index)"></video>
                    <view class="delete-btn c" @click.stop="handleRemoveMedia(index)">
                        <uv-icon name="close" color="#fff" size="12"></uv-icon>
                    </view>
                </view>
            </view>
        </view>

        <!-- 底部栏 -->
        <view class="bottom-bar x c-y jc-sb">
            <view class="left-actions x c-y">
                <!-- 图片上传按钮 -->
                <view class="upload-btn c" @click="handleUploadClick">
                    <uv-icon name="photo" color="#1677FF" size="24"></uv-icon>
                </view>

                <!-- AI功能区 -->
                <view class="ai-action-wrap m-l-20">
                    <view class="ai-btn x c-y" @click="handleAiAction">
                        <uv-icon name="star-fill" color="#1677FF" size="16"></uv-icon>
                        <text class="ai-btn-text m-l-10">{{ content ? 'AI改写' : 'AI帮我写' }}</text>
                    </view>
                    
                    <!-- 弹出菜单 -->
                    <view class="ai-popover y" :class="{'show-popover': showAiMenu && content}">
                        <view class="popover-item x c-y" @click="rewrite('润色')">
                            <uv-icon name="star" color="#666" size="18"></uv-icon>
                            <text class="m-l-20 popover-text">润色</text>
                        </view>
                        <view class="popover-item x c-y" @click="rewrite('扩写')">
                            <uv-icon name="list" color="#666" size="18"></uv-icon>
                            <text class="m-l-20 popover-text">扩写</text>
                        </view>
                        <view class="popover-item x c-y" @click="rewrite('缩写')">
                            <uv-icon name="minus" color="#666" size="18"></uv-icon>
                            <text class="m-l-20 popover-text">缩写</text>
                        </view>
                    </view>
                </view>
            </view>

            <view class="next-btn c" :class="{'disabled-btn': !content}" @click="nextStep">下一步</view>
        </view>
        
        <!-- 点击别处关闭菜单蒙层 -->
        <view class="mask" v-if="showAiMenu" @click="showAiMenu = false"></view>

        <!-- AI 生成 Loading 弹窗 -->
        <ai-loading-dialog ref="aiLoading" @cancel="handleCancelGenerate" />
    </view>
</template>

<script>
import AiLoadingDialog from '@/components/ai-loading-dialog/ai-loading-dialog.vue';
import { generateVideoText, getIndustryTemplateDetail } from '@/api/digitalHuman.js';
import config from '@/config/app.js';

export default {
    components: {
        AiLoadingDialog
    },
    data() {
        return {
            title: '',
            content: '',
            showAiMenu: false,
            mediaList: [],
            maxMedia: 9,
            uploading: false
        };
    },
    onLoad(options) {
        uni.$on('updateDigitalHumanScript', this.handleUpdateScript);
        
        if (options && options.template_id) {
            this.loadTemplateData(options.template_id);
        }
    },
    onUnload() {
        uni.$off('updateDigitalHumanScript', this.handleUpdateScript);
    },
    methods: {
        async loadTemplateData(id) {
            uni.showLoading({ title: '加载模板中...' });
            try {
                const res = await getIndustryTemplateDetail(id);
                if (res.data) {
                    this.title = res.data.detail_title || '';
                    if (res.data.detail_content) {
                        // 将接口返回的真实的 "\n" 字符串替换成真正的换行符
                        this.content = res.data.detail_content.replace(/\\n/g, '\n');
                    }
                }
            } catch (e) {
                console.error('加载模板详情失败', e);
            }
            uni.hideLoading();
        },
        handleUpdateScript(data) {
            if (data && data.content) {
                this.content = data.content;
            }
        },
        handleBack() {
            const pages = getCurrentPages();
            if (pages.length > 1) {
                uni.navigateBack({ delta: 1 });
            } else {
                uni.switchTab({ url: '/pages/index_/index' });
            }
        },
        fillExample() {
            this.title = '如何生成自己的数字人';
            this.content = '如何做自己的AI数字人帮你批量做视频。\n\n用这个AI神器，上传30秒的视频，就能克隆你了。然后点击创作视频，选择自己的数字人和声音，输入文案，一键导出，一条视频就做好了。\n\n你看到的我也是数字人，你说有这样的AI数字人帮你打工，是不是效率很高！';
        },
        handleClear() {
            uni.showModal({
                title: '提示',
                content: '确定清空文案吗？',
                success: (res) => {
                    if (res.confirm) {
                        this.content = '';
                    }
                }
            });
        },
        handleUploadClick() {
            uni.chooseMedia({
                count: this.maxMedia - this.mediaList.length,
                mediaType: ['image', 'video'],
                sourceType: ['album'],
                success: (res) => {
                    const tempFiles = res.tempFiles;
                    this.uploading = true;
                    const uploadPromises = tempFiles.map(file => {
                        return this.uploadFile(file.tempFilePath, file.fileType).then(fileUrl => ({
                            url: fileUrl,
                            localUrl: file.tempFilePath,
                            type: file.fileType
                        }));
                    });
                    Promise.all(uploadPromises).then(uploadedItems => {
                        this.mediaList = [...this.mediaList, ...uploadedItems];
                        this.uploading = false;
                    }).catch(err => {
                        this.uploading = false;
                        console.error('上传失败', err);
                        uni.showToast({ title: '文件上传失败', icon: 'none' });
                    });
                }
            });
        },
        handleRemoveMedia(index) {
            this.mediaList.splice(index, 1);
        },
        previewMedia(index) {
            const item = this.mediaList[index];
            if (item.type === 'image') {
                const imageUrls = this.mediaList.filter(m => m.type === 'image').map(m => m.url);
                const currentUrl = item.url;
                uni.previewImage({
                    current: currentUrl,
                    urls: imageUrls
                });
            } else if (item.type === 'video') {
                // 如果需要预览视频，可以在这里做额外处理，例如全屏播放等
                uni.showToast({ title: '视频请在编辑器内点击播放', icon: 'none' });
            }
        },
        async handleAiAction() {
            if (!this.content) {
                if (!this.title) {
                    uni.showToast({ title: '请先填写标题', icon: 'none' });
                    return;
                }
                
                // 从缓存读取算力配置
                const config = uni.getStorageSync('compute_power_config') || {};
                const cost = config.compute_power_video_text || '?';
                
                // 弹出确认框
                const confirmResult = await new Promise(resolve => {
                    uni.showModal({
                        title: '算力消耗提示',
                        content: `生成视频文案将消耗 ${cost} 算力，是否确认？`,
                        confirmText: '确认生成',
                        cancelText: '取消',
                        success: (res) => resolve(res.confirm),
                        fail: () => resolve(false)
                    });
                });
                
                if (!confirmResult) return;
                
                // 打开 Loading 弹窗
                if (this.$refs.aiLoading) {
                    this.$refs.aiLoading.open();
                }
                
                try {
                    const res = await generateVideoText({ title: this.title, type: 1 });
                    
                    if (this.$refs.aiLoading) {
                        this.$refs.aiLoading.finish();
                    }
                    
                    setTimeout(() => {
                        if (res && res.status === 200 && res.data && res.data.text) {
                            const generatedContent = res.data.text;
                            uni.navigateTo({
                                url: `/pages/w/ai_write_script_result?title=${encodeURIComponent(this.title)}&content=${encodeURIComponent(generatedContent)}`
                            });
                        } else {
                            uni.showToast({ title: res.msg || '生成失败', icon: 'none' });
                        }
                    }, 500); // 配合弹窗 finish 动画
                } catch (e) {
                    if (this.$refs.aiLoading) {
                        this.$refs.aiLoading.close();
                    }
                    uni.showToast({ title: e, icon: 'none' });
                }
            } else {
                // 显示/隐藏改写菜单
                this.showAiMenu = !this.showAiMenu;
            }
        },
        handleCancelGenerate() {
            uni.showToast({ title: '已取消生成', icon: 'none' });
        },
        async rewrite(type) {
            this.showAiMenu = false;
            if (!this.content) return;
            
            // uni.navigateTo({
            //     url: `/pages/w/ai_rewrite?type=${encodeURIComponent(type)}&content=${encodeURIComponent(this.content)}`
            // });
            
            // type 映射：润色=2, 扩写=3, 缩写=4
            const typeMap = { '润色': 2, '扩写': 3, '缩写': 4 };
            const typeCode = typeMap[type] || 2;
            
            // 从缓存读取算力配置
            const config = uni.getStorageSync('compute_power_config') || {};
            const cost = config.compute_power_video_text || '?';
            
            // 弹出确认框
            const confirmResult = await new Promise(resolve => {
                uni.showModal({
                    title: '算力消耗提示',
                    content: `${type}文案将消耗 ${cost} 算力，是否确认？`,
                    confirmText: '确认',
                    cancelText: '取消',
                    success: (res) => resolve(res.confirm),
                    fail: () => resolve(false)
                });
            });
            
            if (!confirmResult) return;
            
            // 打开 Loading 弹窗
            if (this.$refs.aiLoading) {
                this.$refs.aiLoading.open();
            }
            
            try {
                const res = await generateVideoText({ title: this.title, type: typeCode, content: this.content });
                
                if (this.$refs.aiLoading) {
                    this.$refs.aiLoading.finish();
                }
                
                setTimeout(() => {
                    if (res && res.status === 200 && res.data && res.data.text) {
                        const generatedContent = res.data.text;
                        uni.navigateTo({
                            url: `/pages/w/ai_write_script_result?title=${encodeURIComponent(this.title)}&content=${encodeURIComponent(generatedContent)}`
                        });
                    } else {
                        uni.showToast({ title: res.msg || '生成失败', icon: 'none' });
                    }
                }, 500);
            } catch (e) {
                if (this.$refs.aiLoading) {
                    this.$refs.aiLoading.close();
                }
                uni.showToast({ title: e, icon: 'none' });
            }
        },
        nextStep() {
            if (!this.content) {
                uni.showToast({ title: '请输入视频文案', icon: 'none' });
                return;
            }
            if (this.uploading) {
                uni.showToast({ title: '文件正在上传中，请稍等', icon: 'none' });
                return;
            }
            // 构建 materials JSON
            const materials = this.mediaList.map(item => ({
                type: item.type === 'image' ? 'image' : 'video',
                fileUrl: item.url
            }));
            const materialsStr = encodeURIComponent(JSON.stringify(materials));
            if (this.mediaList.length > 0) {
                uni.navigateTo({
                    url: `/pages/w/digital_human_video_settings?step=2&title=${encodeURIComponent(this.title)}&content=${encodeURIComponent(this.content)}&materials=${materialsStr}`
                });
            } else {
                uni.navigateTo({
                    url: `/pages/w/digital_human_upload_media?title=${encodeURIComponent(this.title)}&content=${encodeURIComponent(this.content)}`
                });
            }
        },
        /**
         * 上传文件到 OSS
         */
        uploadFile(tempFilePath, fileType) {
            const token = uni.getStorageSync('LOGIN_STATUS_TOKEN') || '';
            return new Promise((resolve, reject) => {
                uni.request({
                    url: config.HTTP_REQUEST_URL + '/api/upload/oss_config',
                    method: 'POST',
                    header: { Authorization: 'Bearer ' + token },
                    success: (res) => {
                        if (res.data.status !== 200) {
                            reject(new Error(res.data.msg || '获取上传配置失败'));
                            return;
                        }
                        const ossConfig = res.data.data;
                        const timestamp = Date.now();
                        const randomStr = Math.random().toString(36).substr(2, 9);
                        const fileExt = fileType === 'video' ? '.mp4' : '.jpg';
                        const fileName = 'store/' + timestamp + '_' + randomStr + fileExt;
                        uni.uploadFile({
                            url: ossConfig.host,
                            filePath: tempFilePath,
                            name: 'file',
                            formData: {
                                key: fileName,
                                policy: ossConfig.policy,
                                OSSAccessKeyId: ossConfig.accessid,
                                signature: ossConfig.signature,
                                success_action_status: '200',
                                'x-oss-object-acl': 'public-read'
                            },
                            success: (uploadRes) => {
                                const fileUrl = ossConfig.host + '/' + fileName;
                                uni.request({
                                    url: config.HTTP_REQUEST_URL + '/api/upload/record_oss_file',
                                    method: 'POST',
                                    header: {
                                        Authorization: 'Bearer ' + token,
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
                                    fail: () => reject(new Error('文件记录失败'))
                                });
                            },
                            fail: () => reject(new Error('上传失败'))
                        });
                    },
                    fail: () => reject(new Error('获取配置失败'))
                });
            });
        }
    }
};
</script>

<style scoped>
.page-container {
    background-color: #f8f9fa;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { display: flex; align-items: center; justify-content: center; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.flex-1 { flex: 1; }
.m-l-10 { margin-left: 10rpx; }
.m-l-20 { margin-left: 20rpx; }

.content-wrap {
    padding: 30rpx;
    padding-bottom: calc(180rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    flex: 1;
    overflow: hidden;
    min-height: 0;
    display: flex;
    flex-direction: column;
}

.editor-area {
    background: #fff;
    border-radius: 24rpx;
    padding: 30rpx;
    box-sizing: border-box;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.02);
    flex-shrink: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
}

/* 素材抢先看区域 */
.media-preview-area {
    margin-top: 30rpx;
    background: #fff;
    border-radius: 24rpx;
    padding: 30rpx;
    gap: 20rpx;
    box-sizing: border-box;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.02);
    flex-shrink: 0;
}

.flex-wrap { flex-wrap: wrap; }

.media-item {
    position: relative;
    width: 140rpx;
    height: 140rpx;
    border-radius: 12rpx;
    overflow: hidden;
    background: #e8e8e8;
}

.media-img, .media-video {
    width: 100%;
    height: 100%;
}

.delete-btn {
    position: absolute;
    top: 6rpx;
    right: 6rpx;
    width: 30rpx;
    height: 30rpx;
    background: rgba(0,0,0,0.4);
    border-radius: 50%;
    z-index: 10;
}

.title-input {
    font-size: 34rpx;
    font-weight: 500;
    color: #333;
    height: 80rpx;
    flex-shrink: 0;
}

.ph-style {
    color: #999;
}

.divider {
    height: 1rpx;
    background: #f0f0f0;
    margin: 20rpx 0;
    flex-shrink: 0;
}

.textarea-box {
    position: relative;
    padding-top: 10rpx;
    flex-shrink: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
}

.content-textarea {
    width: 100%;
    min-height: 240rpx;
    font-size: 30rpx;
    color: #333;
    line-height: 1.6;
}

.text-scroll {
    width: 100%;
    flex-shrink: 1;
    min-height: 0;
}

.textarea-bottom {
    flex-shrink: 0;
    margin-top: 20rpx;
}

.char-count {
    font-size: 24rpx;
    color: #999;
}

.m-t-20 {
    margin-top: 20rpx;
}

.clear-text {
    font-size: 26rpx;
    color: #999;
}

.example-btn {
    background: #f0f2f5;
    border-radius: 12rpx;
    padding: 12rpx 24rpx;
    display: inline-flex;
}

.example-text {
    font-size: 26rpx;
    color: #666;
}

/* 底部操作栏 */
.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24rpx 40rpx;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    background: #fff;
    z-index: 100;
}

.left-actions {
    display: flex;
    align-items: center;
}

.upload-btn {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    background: #f0f6ff;
}

.ai-action-wrap {
    position: relative;
}

.ai-btn {
    background: #f0f6ff;
    height: 80rpx;
    padding: 0 40rpx;
    border-radius: 100rpx;
    display: inline-flex;
}

.ai-btn-text {
    font-size: 28rpx;
    color: #1677FF;
    font-weight: 500;
}

.next-btn {
    background: #1677FF;
    color: #fff;
    font-size: 30rpx;
    font-weight: bold;
    height: 80rpx;
    padding: 0 70rpx;
    border-radius: 100rpx;
    box-shadow: 0 8rpx 20rpx rgba(22, 119, 255, 0.2);
    transition: all 0.3s;
}

.next-btn.disabled-btn {
    background: #cdd1dd;
    box-shadow: none;
}

/* AI菜单气泡 */
.ai-popover {
    position: absolute;
    bottom: calc(100% + 24rpx);
    left: 0;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 16rpx 0;
    width: 240rpx;
    box-shadow: 0 10rpx 40rpx rgba(0,0,0,0.08);
    /* 默认隐藏并具有过渡动画 */
    opacity: 0;
    transform: translateY(20rpx);
    pointer-events: none;
    transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ai-popover.show-popover {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}

.popover-item {
    padding: 26rpx 40rpx;
    position: relative;
    /* 增加点击反馈 */
}
.popover-item:active {
    background-color: #f7f8fa;
}

.popover-text {
    color: #333;
    font-size: 30rpx;
    font-weight: 400;
}

.mask {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 99;
    background: transparent;
}
</style>
