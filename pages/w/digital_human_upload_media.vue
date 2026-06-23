<template>
    <view class="page-container y">
        <!-- 导航栏 -->
        <l-nav title="2. 上传图片或视频" bg-color="#f8f9fa" @back="handleBack"></l-nav>

        <view class="content-wrap y flex-1">
            <view class="section-title">为你的视频添加素材</view>

            <!-- 状态一：未选择素材时 -->
            <view class="empty-state y" v-if="mediaList.length === 0">
                <view class="action-card x c-y jc-sb" @click="handleChooseMedia">
                    <view class="x c-y">
                        <uv-icon name="photo" color="#333" size="24"></uv-icon>
                        <text class="action-text m-l-20">从相册中选择</text>
                    </view>
                    <uv-icon name="arrow-right" color="#ccc" size="16"></uv-icon>
                </view>

                <view class="skip-btn-wrap c">
                    <view class="skip-btn x c-y" @click="handleSkip">
                        <text class="skip-text">不使用素材</text>
                        <uv-icon name="arrow-right" color="#999" size="12"></uv-icon>
                    </view>
                </view>
            </view>

            <!-- 状态二：已选择素材时 -->
            <view class="filled-state y" v-else>
                <view class="media-grid x flex-wrap">
                    <view 
                        class="media-item" 
                        v-for="(item, index) in mediaList" 
                        :key="index"
                    >
                        <image class="media-img" :src="item.url" mode="aspectFill" v-if="item.type === 'image'"></image>
                        <video class="media-video" :src="item.url" :controls="false" :show-center-play-btn="false" v-if="item.type === 'video'"></video>
                        <view class="delete-btn c" @click.stop="handleRemove(index)">
                            <uv-icon name="close" color="#fff" size="12"></uv-icon>
                        </view>
                    </view>
                    
                    <!-- 添加按钮 -->
                    <view class="add-btn c y" @click="handleChooseMedia" v-if="mediaList.length < maxMedia">
                        <uv-icon name="plus" color="#999" size="28"></uv-icon>
                    </view>
                </view>
            </view>
        </view>

        <!-- 底部下一步按钮 (仅在有素材时显示) -->
        <view class="bottom-bar c" v-if="mediaList.length > 0">
            <view class="next-btn x c-y" @click="handleNext">
                <view class="flex-1"></view>
                <text class="next-text">下一步</text>
                <view class="flex-1 x">
                    <view style="margin-left: auto; padding-right: 40rpx;">
                        <uv-icon name="arrow-right" color="#fff" size="16"></uv-icon>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import config from '@/config/app.js';

export default {
    data() {
        return {
            mediaList: [],
            maxMedia: 9,
            uploading: false,
            title: '',
            content: ''
        };
    },
    onLoad(options) {
        if (options.title) {
            this.title = decodeURIComponent(options.title);
        }
        if (options.content) {
            this.content = decodeURIComponent(options.content);
        }
    },
    methods: {
        handleBack() {
            uni.navigateBack();
        },
        handleChooseMedia() {
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
        handleRemove(index) {
            this.mediaList.splice(index, 1);
        },
        handleSkip() {
            uni.navigateTo({
                url: `/pages/w/digital_human_video_settings?step=3&title=${encodeURIComponent(this.title)}&content=${encodeURIComponent(this.content)}`
            });
        },
        handleNext() {
            if (this.uploading) {
                uni.showToast({ title: '文件正在上传中，请稍等', icon: 'none' });
                return;
            }
            const materials = this.mediaList.map(item => ({
                type: item.type === 'image' ? 'image' : 'video',
                fileUrl: item.url
            }));
            const materialsStr = encodeURIComponent(JSON.stringify(materials));
            uni.navigateTo({
                url: `/pages/w/digital_human_video_settings?step=3&title=${encodeURIComponent(this.title)}&content=${encodeURIComponent(this.content)}&materials=${materialsStr}`
            });
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
    min-height: 100vh;
}
.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { display: flex; align-items: center; justify-content: center; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.flex-1 { flex: 1; }
.flex-wrap { flex-wrap: wrap; }
.m-l-20 { margin-left: 20rpx; }

.content-wrap {
    padding: 40rpx;
    padding-bottom: calc(160rpx + env(safe-area-inset-bottom));
}

.section-title {
    font-size: 34rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 40rpx;
}

/* 空状态 */
.empty-state {
    gap: 30rpx;
}

.action-card {
    background: #fff;
    border-radius: 24rpx;
    padding: 40rpx 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.02);
}
.action-card:active {
    background: #f7f8fa;
}

.action-text {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
}

.skip-btn-wrap {
    margin-top: 60rpx;
}

.skip-btn {
    border: 2rpx solid #e0e0e0;
    border-radius: 100rpx;
    padding: 12rpx 32rpx;
}

.skip-text {
    font-size: 26rpx;
    color: #666;
    margin-right: 8rpx;
}

/* 填充状态 */
.media-grid {
    gap: 20rpx;
}

.media-item {
    position: relative;
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx;
    overflow: hidden;
    background: #e8e8e8;
}

.media-img, .media-video {
    width: 100%;
    height: 100%;
}

.delete-btn {
    position: absolute;
    top: 10rpx;
    right: 10rpx;
    width: 36rpx;
    height: 36rpx;
    background: rgba(0,0,0,0.4);
    border-radius: 50%;
    z-index: 10;
}

.add-btn {
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx;
    border: 2rpx dashed #ccc;
    background: transparent;
}
.add-btn:active {
    background: #f0f0f0;
}

/* 底部按钮 */
.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24rpx 40rpx;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    background: #f8f9fa;
    z-index: 100;
}

.next-btn {
    width: 100%;
    height: 96rpx;
    background: #1677FF;
    border-radius: 20rpx;
    box-shadow: 0 8rpx 20rpx rgba(22, 119, 255, 0.2);
}
.next-btn:active {
    opacity: 0.9;
}

.next-text {
    font-size: 32rpx;
    color: #fff;
    font-weight: bold;
}
</style>
