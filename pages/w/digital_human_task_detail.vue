<template>
    <view class="page-container">
        <l-nav fanhui title="任务详情" bg-color="#ffffff"></l-nav>

        <view class="content-wrap p-30" v-if="!loading && detail">
            <!-- 状态卡片 -->
            <view class="status-card m-b-30" :class="statusCardClass">
                <view class="status-row x c-y jc-sb">
                    <view class="status-label">任务状态</view>
                    <view class="status-value">{{ statusText(detail.status) }}</view>
                </view>
                <view class="status-row x c-y jc-sb">
                    <view class="status-label">任务类型</view>
                    <view class="status-value">{{ typeLabel(detail.type) }}</view>
                </view>
                <view class="status-row x c-y jc-sb border-none">
                    <view class="status-label">创建时间</view>
                    <view class="status-value">{{ detail.create_time }}</view>
                </view>
                <view class="status-row x c-y jc-sb border-none" v-if="detail.status == 'completed'">
                    <view class="status-label">完成时间</view>
                    <view class="status-value">{{ detail.update_time }}</view>
                </view>
            </view>

            <!-- 失败原因 -->
            <view class="info-card m-b-30" v-if="detail.status === 'failed' && detail.error_message">
                <view class="info-title">失败原因</view>
                <view class="info-desc">{{ detail.error_message }}</view>
            </view>

            <!-- 素材预览 -->
            <view class="section-card m-b-30" v-if="detail.type == 'image'">
                <view class="section-title">素材</view>
                <view class="preview-row" v-if="detail.image_url">
                    <view class="preview-label">形象图</view>
                    <view class="preview-box" >
                        <image :src="detail.image_url" class="preview-img" mode="aspectFill" @click="previewImage(detail.image_url)"></image>
                    </view>
                </view>
                <view class="preview-row" v-if="detail.auth_video_url">
                    <view class="preview-label">授权视频</view>
                    <video
                        :src="detail.auth_video_url"
                        class="preview-video-el"
                        controls
                        show-center-play-btn
                    ></video>
                    <view class="m-t-20 x c-y" @click="downloadVideo(detail.auth_video_url)">
                        <uv-icon name="download" color="#3A5DFB" size="16"></uv-icon>
                        <text class="m-l-10 f24" style="color: #3A5DFB;">下载授权视频</text>
                    </view>
                </view>
            </view>
			
			<!-- 素材预览 -->
			<view class="section-card m-b-30" v-if="detail.type == 'voice'">
			    <view class="section-title">素材</view>
			    <view class="preview-row" v-if="detail.audio_url">
			        <view class="preview-label">源音频</view>
			        <view class="audio-play-wrap">
						<view class="audio-play-btn" @click="toggleAudio(detail.audio_url)">
							<text class="audio-play-icon">{{ isAudioPlaying(detail.audio_url) ? '暂停' : '播放' }}</text>
						</view>
			        </view>
			    </view>
			</view>

            <!-- 生成结果（已完成时展示） -->
             <view v-if="detail.type == 'image'">
                <view class="section-card" v-if="detail.status === 'completed' || detail.status === 'succeed'">
                    <view class="section-title">生成结果</view>
                    <view class="result-id" v-if="detail.virtualman_id">
                        <view class="preview-label">数字人ID</view>
                        <view class="preview-desc">{{ detail.virtualman_id }}</view>
                    </view>
                </view>
             </view>

             <view v-if="detail.type == 'voice'">
                <view class="section-card" v-if="(detail.status === 'completed' || detail.status === 'succeed') && (detail.demo_audio_url || detail.audio_url)">
                    <view class="section-title">生成结果</view>
                    <view class="preview-label" v-if="!detail.demo_audio_url" style="color:#fa8c16;font-size:24rpx;margin-bottom:16rpx;">声音克隆处理中，以下为您提交的原始录音</view>
                    <view class="audio-play-wrap">
					<view class="audio-play-btn" @click="toggleAudio(detail.demo_audio_url || detail.audio_url)">
						<text class="audio-play-icon">{{ isAudioPlaying(detail.demo_audio_url || detail.audio_url) ? '暂停' : '播放' }}</text>
					</view>
				</view>
                </view>
             </view>

                         <!-- 生成结果（已完成时展示） -->
            <view v-if="detail.type == 'broadcast_edit' || detail.type == 'broadcast'">
                <view class="section-card" v-if="detail.status === 'completed' || detail.status === 'succeed'">
                    <view class="section-title">生成结果</view>
                    <view class="result-cover m-b-20" v-if="detail.result_cover_url">
                        <image :src="detail.result_cover_url" class="result-cover-img" mode="aspectFill" @click="previewImage(detail.result_cover_url)"></image>
                    </view>
                    <view class="result-video m-b-20" v-if="detail.result_video_url">
                        <view class="preview-label">结果视频</view>
                        <video
                            :src="detail.result_video_url"
                            class="result-video-el"
                            controls
                            show-center-play-btn
                        ></video>
                        <view class="m-t-30 x c">
                            <view class="download-btn x c" @click="downloadVideo(detail.result_video_url)">
                                <uv-icon name="download" color="#fff" size="18"></uv-icon>
                                <text class="m-l-10">下载视频</text>
                            </view>
                        </view>
                    </view>
                </view>
             </view>

            <view class="p-b-safe"></view>
        </view>

        <view class="content-wrap p-30 c" v-else-if="loading">
            <view class="loading-text">加载中...</view>
        </view>
        <view class="content-wrap p-30 c" v-else-if="loadFail">
            <view class="load-fail-text">{{ loadFailMsg }}</view>
        </view>
    </view>
</template>

<script>
import { digitalHumanTaskDetail } from '@/api/public.js';

export default {
    data() {
        return {
            taskId: 0,
            detail: null,
            loading: true,
            loadFail: false,
            loadFailMsg: '',
            innerAudioContext: null,
            playingUrl: '',
            isPlaying: false
        };
    },
    onUnload() {
        if (this.innerAudioContext) {
            this.innerAudioContext.destroy();
            this.innerAudioContext = null;
        }
    },
    onLoad(options) {
        const id = options.id || options.taskId;
        if (id) {
            this.taskId = parseInt(id, 10);
            this.loadDetail();
        } else {
            this.loading = false;
            this.loadFail = true;
            this.loadFailMsg = '参数错误';
        }
        
        // #ifdef MP-WEIXIN || APP-PLUS
        // 确保在 iOS 静音模式下也能发声
        if (uni.setInnerAudioOption) {
            uni.setInnerAudioOption({ obeyMuteSwitch: false });
        }
        // #endif
    },
    computed: {
        statusCardClass() {
            if (!this.detail) return '';
            const s = this.detail.status;
            if (s === 'completed' || s === 'succeed') return 'status-done';
            if (s === 'failed') return 'status-fail';
            return 'status-ing';
        }
    },
    methods: {
        typeLabel(type) {
            const map = { image: '图生数字人', fast: '极速数字人' ,broadcast: '数字人口播',broadcast_edit : '数字人口播视频',voice: '声音克隆'};
            return map[type] || '数字人';
        },
        statusText(status) {
            const map = {
                pending: '待处理',
                processing: '生成中',
                completed: '已完成',
                succeed: '已完成',
                failed: '失败'
            };
            return map[status] || status || '未知';
        },
        async loadDetail() {
            this.loading = true;
            this.loadFail = false;
            try {
                const res = await digitalHumanTaskDetail(this.taskId);
                this.detail = res.data || null;
                if (!this.detail) {
                    this.loadFail = true;
                    this.loadFailMsg = '任务不存在或无权查看';
                }
            } catch (e) {
                this.loadFail = true;
                this.loadFailMsg = e.msg || e.message || '加载失败';
            } finally {
                this.loading = false;
            }
        },
        previewImage(url) {
            if (!url) return;
            uni.previewImage({
                urls: [url]
            });
        },
        isAudioPlaying(url) {
            return url && this.playingUrl === url && this.isPlaying;
        },
        toggleAudio(rawUrl) {
            if (!rawUrl) return;
            // 处理后端可能返回的转义斜杠 \/
            const url = rawUrl.replace(/\\\//g, '/').replace(/\\/g, '/');
            
            // 点击同一个音频，切换播放/暂停
            if (this.playingUrl === url && this.innerAudioContext) {
                if (this.isPlaying) {
                    this.innerAudioContext.pause();
                    this.isPlaying = false;
                } else {
                    this.innerAudioContext.play();
                    this.isPlaying = true;
                }
                return;
            }

            // 点击新音频或首次播放，销毁旧实例重建，防止实例复用导致 audioInstance is not set 错误
            if (this.innerAudioContext) {
                this.innerAudioContext.destroy();
                this.innerAudioContext = null;
            }

            this.innerAudioContext = uni.createInnerAudioContext();
            this.innerAudioContext.autoplay = true; // 设置自动播放
            
            this.innerAudioContext.onPlay(() => {
                this.isPlaying = true;
            });
            this.innerAudioContext.onEnded(() => {
                this.playingUrl = '';
                this.isPlaying = false;
            });
            this.innerAudioContext.onError((err) => {
                this.playingUrl = '';
                this.isPlaying = false;
                console.error('音频播放失败:', err);
                uni.showToast({ title: '音频播放失败: ' + (err.errMsg || ''), icon: 'none' });
            });
            this.innerAudioContext.onStop(() => {
                this.playingUrl = '';
                this.isPlaying = false;
            });

            this.playingUrl = url;
            this.isPlaying = true;
            // 赋值 src，由于 autoplay=true，会自动开始播放并触发 onPlay
            this.innerAudioContext.src = url;
        },
        downloadVideo(url) {
            if (!url) return;
            // #ifdef H5
            window.open(url);
            return;
            // #endif
            
            uni.showLoading({ title: '准备下载...', mask: true });
            uni.downloadFile({
                url: url,
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.saveVideoToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: () => {
                                uni.hideLoading();
                                uni.showToast({ title: '已保存到相册', icon: 'success' });
                            },
                            fail: (err) => {
                                uni.hideLoading();
                                console.error('保存视频失败', err);
                                if (err.errMsg.indexOf('auth deny') > -1 || err.errMsg.indexOf('auth denied') > -1) {
                                    uni.showModal({
                                        title: '提示',
                                        content: '请授权保存到相册权限以保存视频',
                                        success: (modalRes) => {
                                            if (modalRes.confirm) {
                                                uni.openSetting();
                                            }
                                        }
                                    });
                                } else {
                                    uni.showToast({ title: '保存失败，请检查相册权限', icon: 'none' });
                                }
                            }
                        });
                    } else {
                        uni.hideLoading();
                        uni.showToast({ title: '无法获取下载资源', icon: 'none' });
                    }
                },
                fail: (err) => {
                    uni.hideLoading();
                    uni.showToast({ title: '下载失败', icon: 'none' });
                    console.error('下载文件失败', err);
                }
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
.p-30 { padding: 30rpx; }
.m-b-20 { margin-bottom: 20rpx; }
.m-b-30 { margin-bottom: 30rpx; }
.p-b-safe { height: env(safe-area-inset-bottom); padding-bottom: 40rpx; }

.x { display: flex; flex-direction: row; }
.y { display: flex; flex-direction: column; }
.c { align-items: center; justify-content: center; }
.c-y { align-items: center; }
.jc-sb { justify-content: space-between; }

.status-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx 40rpx;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.02);
}
.status-card.status-done .status-value { color: #18D08D; }
.status-card.status-fail .status-value { color: #ff4d4f; }
.status-card.status-ing .status-value { color: #3A5DFB; }

.status-row {
    padding: 20rpx 0;
    border-bottom: 1px solid #f2f2f2;
}
.status-row.border-none { border-bottom: none; }
.status-label {
    font-size: 28rpx;
    color: #999;
}
.status-value {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
}

.info-card {
    background: #fff5f5;
    border-radius: 20rpx;
    padding: 24rpx 30rpx;
}
.info-title {
    font-size: 26rpx;
    color: #ff4d4f;
    margin-bottom: 12rpx;
}
.info-desc {
    font-size: 26rpx;
    color: #666;
}

.section-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx 40rpx;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.02);
}
.section-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 24rpx;
}

.preview-row {
    margin-bottom: 24rpx;
}
.preview-row:last-child { margin-bottom: 0; }
.preview-label {
    font-size: 26rpx;
    color: #999;
    margin-bottom: 12rpx;
}
.preview-box {
    width: 200rpx;
    height: 200rpx;
    border-radius: 12rpx;
    overflow: hidden;
    background: #f5f6f8;
}
.preview-img {
    width: 100%;
    height: 100%;
}
.preview-empty, .preview-desc {
    font-size: 28rpx;
    color: #666;
}

.result-cover {
    width: 100%;
    max-width: 400rpx;
    border-radius: 12rpx;
    overflow: hidden;
    background: #f5f6f8;
}
.result-cover-img {
    width: 100%;
    display: block;
}
.result-video-el {
    width: 100%;
    height: 360rpx;
    border-radius: 12rpx;
    background: #000;
}
/* 仅显示播放按钮 */
.audio-play-wrap {
    display: flex;
    align-items: center;
}
.audio-play-btn {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    background: #3A5DFB;
    display: flex;
    align-items: center;
    justify-content: center;
}
.audio-play-icon {
    font-size: 28rpx;
    color: #fff;
}
.result-id { margin-top: 20rpx; }
.m-t-30 { margin-top: 30rpx; }
.m-l-10 { margin-left: 10rpx; }
.download-btn {
    background: #3A5DFB;
    color: #fff;
    font-size: 28rpx;
    padding: 20rpx 60rpx;
    border-radius: 100rpx;
    font-weight: 500;
}
.download-btn:active {
    opacity: 0.8;
}

.loading-text, .load-fail-text {
    font-size: 28rpx;
    color: #999;
    padding: 60rpx 0;
}
.load-fail-text { color: #ff4d4f; }
</style>
