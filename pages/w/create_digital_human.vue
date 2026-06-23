<template>
    <view class="page-container">
        <l-nav fanhui title="图生数字人">
            <view slot="right" class="nav-right" @click="toTaskList">我的任务</view>
        </l-nav>

        <view class="content-wrap p-30">
            <!-- 步骤条：仅当前步骤为蓝色，已完成为 active-blue，未到为 disabled -->
            <view class="steps-wrap x c-y jc-sa">
                <view class="step-item y c-y" :class="currentStep === 1 ? 'active' : currentStep > 1 ? 'active-blue' : 'disabled'">
                    <view class="step-circle">1</view>
                    <view class="step-text">上传照片</view>
                </view>
                <view class="step-line" :class="{ disabled: currentStep < 2 }"></view>
                <view class="step-item y c-y" :class="currentStep === 2 ? 'active' : currentStep > 2 ? 'active-blue' : 'disabled'">
                    <view class="step-circle">2</view>
                    <view class="step-text">授权视频</view>
                </view>
                <view class="step-line" :class="{ disabled: currentStep < 3 }"></view>
                <view class="step-item y c-y" :class="currentStep === 3 ? 'active' : 'disabled'">
                    <view class="step-circle">3</view>
                    <view class="step-text">生成数字人</view>
                </view>
            </view>

            <!-- 第一步：上传图片 -->
            <view v-show="currentStep === 1" class="card-wrap m-b-40">
                <view class="card-title">第一步：上传正面清晰人脸照片</view>
                <view class="card-subtitle">请上传光线充足、正面清晰的人脸照片，背景简单</view>

                <!-- 照片模板：默认只展示按钮，点击全屏预览 -->
                <view class="template-section m-b-30" v-if="digitalHumanConfig.shanjian_digital_human_image">
                    <view class="template-btn" @click="previewTemplateImage">
                        <uv-icon name="photo" color="#3a5dfb" size="20"></uv-icon>
                        <text>查看照片模板</text>
                    </view>
                </view>

                <!-- 上传区域 -->
                <view class="upload-section">
                    <view v-if="!imageUrl" class="upload-area y c-y jc-c" @click="chooseImage">
                        <view v-if="uploadingImage" class="uploading-wrap y c-y jc-c">
                            <view class="uploading-spinner"></view>
                            <text class="uploading-text">上传中...</text>
                        </view>
                        <template v-else>
                            <view class="upload-icon-box m-b-20">
                                <uv-icon name="camera" color="#555BFD" size="32"></uv-icon>
                            </view>
                            <view class="upload-title m-b-10">点击上传图片</view>
                            <view class="upload-desc m-b-30">支持 JPG、PNG，大小不超过 5MB</view>
                            <view class="btn-primary">选择图片</view>
                        </template>
                    </view>
                    <view v-else class="preview-wrap y">
                        <image :src="imageUrl" class="preview-img" mode="aspectFill"></image>
                        <view class="preview-actions x c-y jc-sb">
                            <view class="action-btn x c-y" @click.stop="chooseImage">
                                <uv-icon name="reload" color="#3a5dfb" size="16"></uv-icon>
                                <text class="action-text reupload-text">重新上传图片</text>
                            </view>
                            <view class="action-btn x c-y" @click.stop="imageUrl = ''">
                                <uv-icon name="trash" color="#ff4d4f" size="16"></uv-icon>
                                <text class="action-text del-text">删除</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="card-tip x c-y m-t-20">
                    <uv-icon name="info-circle" color="#FB9E3A" size="14"></uv-icon>
                    <text class="tip-text">示例：清晰的正面人像，光线均匀，无遮挡</text>
                </view>
                <view class="step-actions x jc-fe m-t-30">
                    <view class="btn-next" :class="{ disabled: !imageUrl }" @click="goStep(2)">下一步</view>
                </view>
            </view>

            <!-- 第二步：拍摄或上传授权视频 -->
            <view v-show="currentStep === 2" class="card-wrap m-b-40">
                <view class="card-title">第二步：拍摄或上传授权视频</view>
                <view class="card-subtitle">请按授权文案朗读并录制视频，或上传已录制好的授权视频</view>
                <view class="card-subtitle">授权文案：我是xxx(真实姓名),我授权【{{digitalHumanConfig.shanjian_auth_text}}】使用视频中的肖像、声音,为我生成定制数字人及声音,并在本人【{{digitalHumanConfig.shanjian_auth_text}}】账号中创作使用。</view>
                <!-- 视频模板：默认只展示按钮，点击全屏播放 -->
                <view class="template-section m-b-30" v-if="digitalHumanConfig.shanjian_digital_human_auth_video">
                    <view class="template-btn" @click="showTemplateVideo = true">
                        <uv-icon name="play-circle" color="#3a5dfb" size="20"></uv-icon>
                        <text>查看视频模板</text>
                    </view>
                </view>

                <view class="upload-section">
                    <view v-if="!authVideoUrl" class="upload-area y c-y jc-c" @click="chooseAuthVideo">
                        <view v-if="uploadingVideo" class="uploading-wrap y c-y jc-c">
                            <view class="uploading-spinner"></view>
                            <text class="uploading-text">上传中...</text>
                        </view>
                        <template v-else>
                            <view class="upload-icon-box m-b-20">
                                <uv-icon name="play-right" color="#555BFD" size="32"></uv-icon>
                            </view>
                            <view class="upload-title m-b-10">拍摄或上传授权视频</view>
                            <view class="upload-desc m-b-30">支持 MP4，时长2分钟以内，大小不超过100M</view>
                            <view class="btn-primary">选择视频</view>
                        </template>
                    </view>
                    <view v-else class="preview-wrap y">
                        <video :src="authVideoUrl" class="preview-video" controls></video>
                        <view class="preview-actions x c-y jc-sb">
                            <view class="action-btn x c-y" @click.stop="chooseAuthVideo">
                                <uv-icon name="reload" color="#3a5dfb" size="16"></uv-icon>
                                <text class="action-text reupload-text">重新拍摄 / 上传</text>
                            </view>
                            <view class="action-btn x c-y" @click.stop="authVideoUrl = ''">
                                <uv-icon name="trash" color="#ff4d4f" size="16"></uv-icon>
                                <text class="action-text del-text">删除</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="step-actions x jc-sb m-t-30">
                    <view class="btn-prev" @click="goStep(1)">上一步</view>
                    <view class="btn-next" :class="{ disabled: !authVideoUrl }" @click="goStep(3)">下一步</view>
                </view>
            </view>

            <!-- 第三步：生成数字人 -->
            <view v-show="currentStep === 3" class="card-wrap m-b-40">
                <view class="card-title">第三步：生成数字人</view>
                <view class="card-subtitle">确认您的形象图与授权视频后，点击生成</view>

                <view class="summary-wrap m-b-30">
                    <view class="summary-item x c-y">
                        <text class="summary-label">形象图</text>
                        <image v-if="imageUrl" :src="imageUrl" class="summary-thumb" mode="aspectFill"></image>
                        <text v-else class="summary-empty">未上传</text>
                    </view>
                    <view class="summary-item x c-y">
                        <text class="summary-label">授权视频</text>
                        <text class="summary-text">{{ authVideoUrl ? '已上传' : '未上传' }}</text>
                    </view>
                </view>

                <view class="notice-wrap x m-b-30">
                    <uv-icon name="info-circle" color="#FB9E3A" size="20" class="m-r-16 mt-4"></uv-icon>
                    <view class="notice-content">
                        <view class="notice-title">生成约需 10 分钟</view>
                        <view class="notice-desc">我们将处理您的照片与授权视频，生成完成后您可以前往我的数字人列表查看</view>
                    </view>
                </view>

                <view class="step-actions x jc-sb m-t-30">
                    <view class="btn-prev" @click="goStep(2)">上一步</view>
                    <view
                        class="btn-submit"
                        :class="{ disabled: submitting }"
                        @click="handleGenerate"
                    >
                        {{ submitting ? '提交中...' : '生成数字人' }}
                    </view>
                </view>
            </view>

            <view class="p-b-safe"></view>
        </view>

        <!-- 全屏视频模板弹层 -->
        <view class="template-video-fullscreen" v-if="showTemplateVideo" @click="showTemplateVideo = false">
            <view class="template-video-wrap" @click.stop>
                <video
                    v-if="digitalHumanConfig.shanjian_digital_human_auth_video"
                    :src="digitalHumanConfig.shanjian_digital_human_auth_video"
                    class="template-video-full"
                    controls
                    autoplay
                ></video>
                <view class="template-video-close" @click="showTemplateVideo = false">关闭</view>
            </view>
        </view>
    </view>
</template>

<script>
import config from '@/config/app.js';
import { digitalHumanImageTrain } from '@/api/public.js';
import { getComputePowerConfig } from '@/api/public.js';

export default {
    data() {
        return {
            currentStep: 1,
            templateImageUrl: '',   // 预留：模板图片 URL，可由后台配置
            templateVideoUrl: '',  // 预留：授权模板视频 URL
            imageUrl: '',
            authVideoUrl: '',
            uploadingImage: false,
            uploadingVideo: false,
            submitting: false,
            digitalHumanConfig: {},
            showTemplateVideo: false,
        };
    },
    onLoad() {
        this.fetchConfig();
    },
    methods: {
        previewTemplateImage() {
            const url = this.digitalHumanConfig.shanjian_digital_human_image;
            if (!url) return;
            uni.previewImage({
                current: url,
                urls: [url],
            });
        },
        fetchConfig() {
            // 获取配置
            getComputePowerConfig().then(res => {
                if (res.status === 200 && res.data) {
                    this.digitalHumanConfig = res.data;
                }
            }).catch(err => {
                console.error('获取配置失败:', err);
            });
        },
        toTaskList() {
            uni.navigateTo({ url: '/pages/w/digital_human_task_list' });
        },
        goStep(step) {
            if (step === 2 && !this.imageUrl) return;
            if (step === 3 && !this.authVideoUrl) return;
            this.currentStep = step;
        },
        chooseImage() {
            if (this.uploadingImage) return;
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    const tempPath = res.tempFilePaths[0];
                    this.uploadingImage = true;
                    this.uploadFile(tempPath, 'image')
                        .then((url) => {
                            this.imageUrl = url;
                            uni.showToast({ title: '上传成功', icon: 'success' });
                        })
                        .catch(() => {
                            uni.showToast({ title: '图片上传失败', icon: 'none' });
                        })
                        .finally(() => {
                            this.uploadingImage = false;
                        });
                }
            });
        },
        chooseAuthVideo() {
            if (this.uploadingVideo) return;
            uni.showActionSheet({
                itemList: ['录制视频 (带提词器)', '从相册选择'],
                success: (res) => {
                    if (res.tapIndex === 0) {
                        const authText = `我是xxx(真实姓名),我授权【${this.digitalHumanConfig.shanjian_auth_text}】使用视频中的肖像、声音,为我生成定制数字人及声音,并在本人【${this.digitalHumanConfig.shanjian_auth_text}】账号中创作使用。`;
                        uni.navigateTo({
                            url: `/pages/w/auth_video_record?authText=${encodeURIComponent(authText)}`,
                            events: {
                                recordFinished: (data) => {
                                    this.handleRecordFinished(data);
                                }
                            }
                        });
                    } else if (res.tapIndex === 1) {
                        uni.chooseVideo({
                            sourceType: ['album'],
                            maxDuration: 120,
                            success: (res) => {
                                this.processVideoFile(res.tempFilePath);
                            }
                        });
                    }
                }
            });
        },
        handleRecordFinished(data) {
            if (data.tempFilePath) {
                this.processVideoFile(data.tempFilePath);
            }
        },
        processVideoFile(tempPath) {
            this.uploadingVideo = true;
            this.uploadFile(tempPath, 'video')
                .then((url) => {
                    this.authVideoUrl = url;
                    uni.showToast({ title: '上传成功', icon: 'success' });
                })
                .catch((err) => {
                    console.error('Upload video error:', err);
                    uni.showToast({ title: '视频上传失败', icon: 'none' });
                })
                .finally(() => {
                    this.uploadingVideo = false;
                });
        },
        /**
         * 直传云存储（与 ai.vue 一致）
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
                        const ossUploadUrl = ossConfig.host;
                        uni.uploadFile({
                            url: ossUploadUrl,
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
                            fail: (err) => reject(new Error('上传失败'))
                        });
                    },
                    fail: () => reject(new Error('获取配置失败'))
                });
            });
        },
        handleGenerate() {
            if (this.submitting) return;
            if (!this.imageUrl || !this.authVideoUrl) {
                uni.showToast({ title: '请先完成第一步和第二步', icon: 'none' });
                return;
            }
            this.submitting = true;
            digitalHumanImageTrain({
                imageUrl: this.imageUrl,
                authVideoUrl: this.authVideoUrl
            })
                .then((res) => {
                    uni.showToast({ title: res.msg || '提交成功，请等待生成', icon: 'success', duration: 2500 });
                    const taskId = (res.data && res.data.task_id) || '';
                    setTimeout(() => {
                        //跳转到任务列表页面
                        uni.navigateTo({ url: '/pages/w/digital_human_task_list' });
                    }, 2000);
                })
                .catch((err) => {
                    uni.showToast({ title: err || '提交失败，请稍后再试', icon: 'none' });
                })
                .finally(() => {
                    this.submitting = false;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.page-container {
    background-color: #f8f9fa;
    min-height: 100vh;
}
.p-30 { padding: 30rpx; }
.m-b-30 { margin-bottom: 30rpx; }
.m-b-40 { margin-bottom: 40rpx; }
.m-b-20 { margin-bottom: 20rpx; }
.m-t-20 { margin-top: 20rpx; }
.m-t-30 { margin-top: 30rpx; }
.m-r-16 { margin-right: 16rpx; }
.mt-4 { margin-top: 4rpx; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }
.jc-fe { justify-content: flex-end; }
.jc-sa { justify-content: space-around; }
.jc-c { justify-content: center; }
.p-b-safe { height: env(safe-area-inset-bottom); padding-bottom: 40rpx; }

.steps-wrap {
    background: #fff;
    padding: 30rpx 0;
    margin: -30rpx -30rpx 30rpx -30rpx;
    border-bottom: 1px solid #f0f0f0;
}
.step-item {
    position: relative;
    width: 140rpx;
}
.step-circle {
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 16rpx;
    transition: all 0.3s;
}
.step-text {
    font-size: 24rpx;
    color: #333;
}
.step-item.active .step-circle {
    background: #3a5dfb;
    color: #fff;
}
.step-item.active-blue .step-circle {
    background: #3a5dfb;
    color: #fff;
}
.step-item.active-blue .step-text {
    color: #666;
}
.step-item.disabled .step-circle {
    background: #e6e6e6;
    color: #999;
}
.step-item.disabled .step-text {
    color: #999;
}
.step-line {
    flex: 1;
    height: 4rpx;
    background: #cfe2ff;
    margin: 0 10rpx;
    position: relative;
    top: -24rpx;
}
.step-line.disabled {
    background: #e6e6e6;
}

.card-wrap {
    background: #fff;
    border-radius: 24rpx;
    padding: 40rpx 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.02);
}
.card-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 12rpx;
}
.card-subtitle {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 40rpx;
}

.template-section .template-label {
    font-size: 26rpx;
    color: #666;
    margin-bottom: 12rpx;
}
.template-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    padding: 20rpx 36rpx;
    border: 1rpx solid #3a5dfb;
    border-radius: 12rpx;
    font-size: 28rpx;
    color: #3a5dfb;
}
.template-box {
    border-radius: 16rpx;
    overflow: hidden;
    background: #f5f5f5;
}
.template-img-box, .template-video-box {
    width: 100%;
    height: 280rpx;
}
.template-img { width: 100%; height: 100%; }
.template-video { width: 100%; height: 100%; }
.template-placeholder {
    width: 100%;
    height: 100%;
}
.placeholder-text { font-size: 24rpx; color: #999; margin-top: 12rpx; }

.upload-section { margin-bottom: 20rpx; }
.upload-area {
    border: 2rpx solid #e0e5ff;
    border-radius: 20rpx;
    padding: 60rpx 0;
    margin-bottom: 30rpx;
    background: #fafbff;
    position: relative;
}
.uploading-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255,255,255,0.9);
}
.uploading-spinner {
    width: 48rpx;
    height: 48rpx;
    border: 4rpx solid #e6e6e6;
    border-top-color: #3a5dfb;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
.uploading-text { font-size: 24rpx; color: #666; margin-top: 16rpx; }
@keyframes spin { to { transform: rotate(360deg); } }

.upload-icon-box {
    width: 96rpx;
    height: 96rpx;
    background: #eef1ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.upload-title { font-size: 28rpx; font-weight: bold; color: #333; }
.upload-desc { font-size: 24rpx; color: #999; }
.btn-primary {
    background: #3a5dfb;
    color: #fff;
    font-size: 28rpx;
    font-weight: bold;
    padding: 16rpx 60rpx;
    border-radius: 12rpx;
}

.preview-wrap {
    width: 100%;
    border-radius: 20rpx;
    overflow: hidden;
    border: 2rpx solid #e0e5ff;
    background: #fff;
}
.preview-img { width: 100%; height: 400rpx; display: block; background: #f5f5f5; }
.preview-video { width: 100%; height: 400rpx; display: block; background: #f5f5f5; }
.preview-actions {
    padding: 24rpx 36rpx;
    background: #fafbff;
}
.action-btn {
    padding: 10rpx 20rpx;
    border-radius: 12rpx;
    transition: all 0.2s;
}
.action-btn:active {
    background: rgba(0,0,0,0.05);
}
.action-text {
    font-size: 28rpx;
    margin-left: 12rpx;
    font-weight: 500;
}
.reupload-text {
    color: #3a5dfb;
}
.del-text {
    color: #ff4d4f;
}

.card-tip { font-size: 24rpx; color: #666; }
.tip-text { margin-left: 10rpx; }

.step-actions { gap: 24rpx; }
.btn-prev {
    flex: 1;
    background: #f0f2f5;
    color: #666;
    font-size: 28rpx;
    text-align: center;
    padding: 24rpx 0;
    border-radius: 16rpx;
    font-weight: 500;
}
.btn-next {
    flex: 1;
    background: #3a5dfb;
    color: #fff;
    font-size: 28rpx;
    text-align: center;
    padding: 24rpx 0;
    border-radius: 16rpx;
    font-weight: bold;
}
.btn-next.disabled { opacity: 0.5; }
.btn-submit {
    flex: 2;
    background: #18D08D;
    color: #fff;
    font-size: 30rpx;
    text-align: center;
    padding: 24rpx 0;
    border-radius: 16rpx;
    font-weight: bold;
}
.btn-submit.disabled { opacity: 0.7; }

.summary-wrap { background: #f8f9fa; border-radius: 16rpx; padding: 24rpx; }
.summary-item { margin-bottom: 20rpx; }
.summary-item:last-child { margin-bottom: 0; }
.summary-label { font-size: 26rpx; color: #666; width: 140rpx; }
.summary-thumb { width: 120rpx; height: 120rpx; border-radius: 12rpx; }
.summary-text, .summary-empty { font-size: 26rpx; color: #333; }

.notice-wrap {
    background: #fff8e6;
    border-radius: 16rpx;
    padding: 30rpx;
    align-items: flex-start;
}
.notice-title { font-size: 28rpx; font-weight: bold; color: #8c5a20; margin-bottom: 8rpx; }
.notice-desc { font-size: 24rpx; color: #b07e3a; line-height: 1.5; }

/* 全屏视频模板弹层 */
.template-video-fullscreen {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
}
.template-video-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80rpx 30rpx 120rpx;
    box-sizing: border-box;
}
.template-video-full {
    width: 100%;
    height: 100%;
    max-height: 80vh;
}
.template-video-close {
    position: absolute;
    bottom: 60rpx;
    left: 50%;
    transform: translateX(-50%);
    padding: 20rpx 60rpx;
    background: #3a5dfb;
    color: #fff;
    font-size: 28rpx;
    border-radius: 12rpx;
}
</style>
