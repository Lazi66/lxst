<template>
    <view class="custom-voice-page y p-30">
        <!-- 导航栏 -->
        <view class="nav-bar x c-y jc-sb" :style="{ paddingTop: statusBarHeight + 'px', height: (statusBarHeight + navBarHeight) + 'px' }">
            <view class="nav-left c" @click="handleBack">
                <uv-icon name="arrow-left" color="#333" size="20"></uv-icon>
            </view>
            <view class="nav-title">克隆声音</view>
            <view class="nav-right"></view>
        </view>

        <!-- 撑开导航栏高度 -->
        <view :style="{ height: (statusBarHeight + navBarHeight) + 'px' }"></view>

        <view class="content-area y flex-1 pt-30 pb-30">
            <!-- 朗读文案卡片 -->
            <view class="script-card y">
                <view class="card-header x c-y jc-sb m-b-30">
                    <view class="x c-y">
                        <uv-icon name="mic" color="#666" size="18"></uv-icon>
                        <text class="header-text m-l-10">请朗读以下内容</text>
                    </view>
                    <view class="x c-y btn-change" @click="changeScript">
                        <uv-icon name="reload" color="#666" size="16"></uv-icon>
                        <text class="m-l-10">更换文案</text>
                    </view>
                </view>
                <view class="script-content">
                    <text class="script-text">{{ currentScript }}</text>
                </view>
                <view class="x jc-sb m-t-40 p-t-30" style="border-top: 1px solid #f5f5f5;">
                    <view></view> <!-- 占位撑开 -->
                    <view class="tutorial-link x c-y" @click="openTutorial">
                        <uv-icon name="question-circle" color="#1677FF" size="16"></uv-icon>
                        <text class="tutorial-link-text m-l-6">查看教程</text>
                    </view>
                </view>
            </view>

            <!-- 温馨提示 -->
            <view class="tips-area y m-t-40">
                <view class="tips-title">温馨提示</view>
                <view class="tips-desc m-t-20">
                    <view class="m-b-10">1.录制过程中，请保持环境安静</view>
                    <view>2.录制的语气也会被克隆，请按照期望的语气进行朗读</view>
                </view>
            </view>

            <view class="flex-1"></view> <!-- 占位符 -->

            <!-- 录音交互区 -->
            <view class="interaction-area y c">
                
                <!-- 波形动画区域 -->
                <view class="waveform-box x c" :style="{ opacity: status === 'recording' ? 1 : 0 }">
                    <view 
                        class="bar" 
                        v-for="(h, i) in barHeights" 
                        :key="i" 
                        :style="{ height: h + '%', transition: 'height 0.1s ease' }"
                    ></view>
                </view>

                <!-- 时间显示区 或 录音后试听卡片 -->
                <view class="status-panel c m-t-40 m-b-40 w-100">
                    <template v-if="status === 'recording'">
                        <view style="width: 100%; display: flex; justify-content: center;">
                            <text class="time-text">{{ formatTime(recordTenths) }}</text>
                        </view>
                    </template>
                    <template v-else-if="status === 'finished'">
                        <view class="playback-card x c-y jc-sb">
                            <view class="x c-y" @click="togglePlay">
                                <uv-icon :name="isPlaying ? 'pause-circle-fill' : 'play-circle-fill'" color="#1677FF" size="24"></uv-icon>
                                <text class="playback-text m-l-20">我的录音</text>
                            </view>
                            <view class="re-record-text" @click="reRecord">重新录制</view>
                        </view>
                    </template>
                    <!-- 空闲状态 -->
                    <template v-else>
                        <view style="height: 60rpx;"></view>
                    </template>
                </view>

                <!-- 底部操作按钮 -->
                <view class="action-btn-area x c">
                    <!-- 录音完成后的提交按钮 -->
                    <template v-if="status === 'finished'">
                        <view class="submit-btn c" @click="submitVoice">提交声音</view>
                    </template>

                    <!-- 未录音 / 正在录音按钮 -->
                    <template v-else>
                        <view class="record-btn-wrapper c" @click="toggleRecord">
                            <!-- 正在录音则是正方形停止按钮 -->
                            <view v-if="status === 'recording'" class="stop-btn c"></view>
                            <!-- 空闲则是大圆筒麦克风 -->
                            <view v-else class="mic-btn c">
                                <uv-icon name="mic" color="#fff" size="32"></uv-icon>
                            </view>
                        </view>
                    </template>
                </view>
                
                <view class="status-hint c m-t-50 m-b-40">
                    <text class="hint-text" v-if="status === 'idle'">点击开始录音</text>
                    <text class="hint-text" v-else-if="status === 'recording'">点击停止录制</text>
                    <text class="hint-text small text-999" v-else-if="status === 'finished'">我已阅读并同意《定制声音协议》</text>
                </view>
            </view>
        </view>

        <!-- 录制教程弹窗 -->
        <uv-popup ref="tutorialPopup" mode="bottom" round="24" closeable @close="closeTutorial">
            <view class="tutorial-popup y p-30">
                <view class="t-header c p-t-20 p-b-30">
                    <text class="t-title">录制教程</text>
                </view>
                <scroll-view scroll-y class="t-scroll">
                    <view class="t-section y m-t-30">
                        <view class="t-subtitle">录音环境小贴士：</view>
                        <view class="t-item x m-t-20">
                            <uv-icon name="bell" color="#666" size="18"></uv-icon>
                            <text class="t-desc m-l-10">找一个安静的地方，没有杂音、噪音、回声和混响</text>
                        </view>
                    </view>

                    <view class="t-section y m-t-40">
                        <view class="t-subtitle">录音小要求：</view>
                        <view class="t-item x m-t-20">
                            <uv-icon name="phone" color="#666" size="18"></uv-icon>
                            <text class="t-desc m-l-10">请用手机在线录制一段你单人说话的音频，录制时手机要离嘴巴大约 10 厘米的距离</text>
                        </view>
                        <view class="t-item x m-t-20">
                            <uv-icon name="heart" color="#666" size="18"></uv-icon>
                            <text class="t-desc m-l-10">录音时，要保持情绪稳定，语速均匀，就像平时聊天一样自然就好啦</text>
                        </view>
                        <view class="t-item x m-t-20">
                            <uv-icon name="mic" color="#666" size="18"></uv-icon>
                            <text class="t-desc m-l-10">录音需要用普通话，尽量不要有方言、英文或字母哦</text>
                        </view>
                        <view class="t-item x m-t-20">
                            <uv-icon name="clock" color="#666" size="18"></uv-icon>
                            <text class="t-desc m-l-10">还有还有，音频时长可不能少于 5 秒哟</text>
                        </view>
                    </view>
                </scroll-view>
                <view class="t-bottom m-t-40 p-b-20">
                    <view class="t-know-btn c" @click="closeTutorial">我知道了，这很简单</view>
                </view>
            </view>
        </uv-popup>
        <!-- 隐私授权弹窗 -->
        <privacy-pop ref="privacyPop"></privacy-pop>
    </view>
</template>

<script>
import config from '@/config/app.js';
import PrivacyPop from '@/components/privacy-pop/privacy-pop.vue';
import { createVoiceTrain } from '@/api/digitalHuman.js';
export default {
    components: { PrivacyPop },
    data() {
        return {
            statusBarHeight: 0,
            navBarHeight: 44,
            
            showTutorial: false,
            
            // idle | recording | finished
            status: 'idle',
            recordSeconds: 0,
            timer: null,
            
            recordFilePath: '',   // 录音完成后的文件路径
            isPlaying: false,
            recordTenths: 0,     // 录音时长（以0.1秒为单位）
            
            // 波形栏高度数组（20栏）
            barHeights: Array(20).fill(15),
            
            scripts: [
                "我正在定制我的声音，录音 10 秒左右就可以了。现在周围很安静，我说话很放松，表达很流畅，录音时情绪风格比较统一。之后只需要打字，就可以生成我说话的视频了，真的很简单！",
                "如果可以的话，我希望能够用最自然的声音来表达这段话的内容。录音的环境我已经布置好了，周围没有多余的杂音，我现在的状态也很不错，随时可以开始录制。",
                "声音定制是一项非常有意思的技术，通过简短的录音，系统就能学习到我独特的音色和语气连贯性。现在我正在做这个准备工作，按照要求清晰地朗读。"
            ],
            currentScriptIndex: 0
        };
    },
    computed: {
        currentScript() {
            return this.scripts[this.currentScriptIndex];
        }
    },
    onLoad() {
        // #ifdef MP-WEIXIN || APP-PLUS
        const sysInfo = uni.getSystemInfoSync();
        this.statusBarHeight = sysInfo.statusBarHeight || 0;
        // #endif
    },
    onHide() {
        // 切后台或按返回键时，立即释放麦克风
        this._stopRecorderSafe();
        this._destroyAudio();
    },
    watch: {
    },
    methods: {
        handleBack() {
            // 退出前清理录音和播放
            this._stopRecorderSafe();
            this._destroyAudio();
            uni.navigateBack();
        },
        openTutorial() {
            this.$refs.tutorialPopup.open();
        },
        closeTutorial() {
            this.$refs.tutorialPopup.close();
        },
        changeScript() {
            this.currentScriptIndex = (this.currentScriptIndex + 1) % this.scripts.length;
        },
        formatTime(cs) {
            const totalSec = Math.floor(cs / 100);
            const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
            const s = (totalSec % 60).toString().padStart(2, '0');
            const c = (cs % 100).toString().padStart(2, '0');
            return `${m}:${s}.${c}`;
        },

        // ============ 录音相关 ============
        _initRecorder() {
            if (this._recorder) return;
            const recorder = uni.getRecorderManager();
            this._recorder = recorder;

            recorder.onStart(() => {
                this.status = 'recording';
                this.recordTenths = 0;
                this.timer = setInterval(() => { 
                    this.recordTenths++; 
                    // 录音最多120秒 (120 * 100 = 12000 个 10ms 也就是 120秒)
                    if (this.recordTenths >= 12000) {
                        this._stopRecorderSafe();
                        uni.showToast({ title: '录音已达最大时长(120秒)', icon: 'none' });
                    }
                }, 10);
            });

            // 利用 onFrameRecorded 事件来获取当前帧鼠标动态数据，并驱动波形
            recorder.onFrameRecorded(({ frameBuffer }) => {
                if (this.status !== 'recording') return;
                // 计算此帧的平均绝对値（简体音量)
                const data = new Int16Array(frameBuffer);
                let sum = 0;
                for (let i = 0; i < data.length; i++) {
                    sum += Math.abs(data[i]);
                }
                const avg = sum / data.length; // 0 ~ 32768
                const volume = Math.min(avg / 32768, 1); // 归一化到 0~1
                this._applyVolume(volume);
            });

            recorder.onStop(({ tempFilePath }) => {
                clearInterval(this.timer);
                this.recordFilePath = tempFilePath;
                this.status = 'finished';
                this._resetBars();
            });

            recorder.onError((err) => {
                clearInterval(this.timer);
                this.status = 'idle';
                this._resetBars();
                uni.showToast({ title: err.errMsg || '录音失败', icon: 'none' });
            });
        },

        _stopRecorderSafe() {
            if (this._recorder && this.status === 'recording') {
                this._recorder.stop();
            }
            clearInterval(this.timer);
        },

        // 波形算法：根据音量随机生成每一栏的高度
        _applyVolume(volume) {
            const minH = 10;
            const maxH = 90;
            this.barHeights = this.barHeights.map(() => {
                // 在音量范围内带随机波动
                const jitter = (Math.random() - 0.5) * 0.4;
                const v = Math.max(0, Math.min(1, volume + jitter));
                return Math.round(minH + v * (maxH - minH));
            });
        },

        _resetBars() {
            this.barHeights = Array(20).fill(15);
        },

        toggleRecord() {
            if (this.status === 'idle') {
                this.startRecord();
            } else if (this.status === 'recording') {
                this.stopRecord();
            } else if (this.status === 'finished') {
                // 重新录制
                this.recordFilePath = '';
                this.status = 'idle';
                this.startRecord();
            }
        },

        async startRecord() {
            try {
                this._initRecorder();
                this._doStartRecord();
            } catch (e) {
                console.error('startRecord error:', e);
                uni.showToast({ title: e.message || '启动录音失败', icon: 'none', duration: 2000 });
            }
        },

        _doStartRecord() {
            this._recorder.start({
                duration: 600000,
                sampleRate: 44100,
                numberOfChannels: 1,
                encodeBitRate: 128000,
                format: 'mp3',
                frameSize: 5,
            });
        },

        stopRecord() {
            // recordTenths 每 10ms +1，500 = 5 秒
            if (this.recordTenths < 500) {
                uni.showToast({ title: '录音时长不能少于5秒', icon: 'none', duration: 2000 });
                return;
            }
            this._stopRecorderSafe();
        },

        reRecord() {
            this._destroyAudio();
            this.recordFilePath = '';
            this.status = 'idle';
            this.recordSeconds = 0;
            this._resetBars();
        },

        // ============ 播放相关 ============
        _initAudio() {
            if (this._audio) return;
            this._audio = uni.createInnerAudioContext();
            this._audio.src = this.recordFilePath;
            this._audio.onEnded(() => { this.isPlaying = false; });
            this._audio.onError(() => {
                this.isPlaying = false;
                uni.showToast({ title: '播放失败', icon: 'none' });
            });
        },

        _destroyAudio() {
            if (this._audio) {
                this._audio.stop();
                this._audio.destroy();
                this._audio = null;
                this.isPlaying = false;
            }
        },

        togglePlay() {
            if (!this.recordFilePath) return;
            if (this.isPlaying) {
                this._audio && this._audio.pause();
                this.isPlaying = false;
            } else {
                this._initAudio();
                this._audio.play();
                this.isPlaying = true;
            }
        },

        // ============ 提交 ============
        async submitVoice() {
            if (!this.recordFilePath) {
                uni.showToast({ title: '请先录制声音', icon: 'none' });
                return;
            }
            try {
                uni.showLoading({ title: '上传中...' });
                const audioUrl = await this._uploadAudioFile(this.recordFilePath);
                uni.showLoading({ title: '提交中...' });
                const res = await createVoiceTrain({ audio_url: audioUrl });
                uni.hideLoading();
                if (res.data && res.status === 200) {
                    uni.showToast({ title: '提交成功！', icon: 'success', duration: 2000 });
                    setTimeout(() => { 
                        uni.redirectTo({ url: '/pages/w/digital_human_task_list' }); 
                    }, 2000);
                } else {
                    uni.showToast({ title: res.data?.msg || '提交失败', icon: 'none' });
                }
            } catch (e) {
                uni.hideLoading();
                console.error('submitVoice error:', e);
                uni.showToast({ title: e || '提交失败，请重试', icon: 'none' });
            }
        },

        /**
         * 上传音频文件到 OSS
         * 参考 create_digital_human.vue 的 uploadFile 方法
         */
        _uploadAudioFile(tempFilePath) {
            const token = uni.getStorageSync('LOGIN_STATUS_TOKEN') || '';
            const HTTP_REQUEST_URL = config.HTTP_REQUEST_URL;
            return new Promise((resolve, reject) => {
                uni.request({
                    url: HTTP_REQUEST_URL + '/api/upload/oss_config',
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
                        const fileName = 'store/' + timestamp + '_' + randomStr + '.mp3';
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
                            success: () => {
                                const fileUrl = ossConfig.host + '/' + fileName;
                                uni.request({
                                    url: HTTP_REQUEST_URL + '/api/upload/record_oss_file',
                                    method: 'POST',
                                    header: {
                                        Authorization: 'Bearer ' + token,
                                        'Content-Type': 'application/json'
                                    },
                                    data: JSON.stringify({ url: fileUrl, filename: fileName, file_type: 'audio' }),
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
                            fail: () => reject(new Error('音频上传失败'))
                        });
                    },
                    fail: () => reject(new Error('获取上传配置失败'))
                });
            });
        }
    },
    onUnload() {
        this._stopRecorderSafe();
        this._destroyAudio();
        if (this.timer) clearInterval(this.timer);
    }
};
</script>

<style scoped>
.custom-voice-page {
    min-height: 100vh;
    background: #f8f9fa;
    color: #333;
    box-sizing: border-box;
    padding: 30rpx !important;
}

/* 导航栏 */
.nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0 30rpx;
    background: #f8f9fa;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.nav-left {
    width: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nav-title {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 34rpx;
    font-weight: bold;
    color: #333;
    pointer-events: none;
}
.nav-right {
    width: 60rpx;
    font-size: 28rpx;
    color: #666;
}

/* 文案卡片 */
.script-card {
    background: #fff;
    border-radius: 24rpx;
    padding: 30rpx;
    border: 1px solid #eee;
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.02);
}
.card-header {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 30rpx;
}
.header-text {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
}
.btn-change {
    font-size: 26rpx;
    color: #666;
}
.script-content {
    min-height: 240rpx;
}
.script-text {
    font-size: 34rpx;
    line-height: 1.6;
    color: #333;
}

/* 温馨提示 */
.tips-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
}
.tips-desc {
    font-size: 26rpx;
    line-height: 1.8;
    color: #666;
    white-space: pre-wrap;
}

/* 底部交互区 */
.waveform-box {
    height: 80rpx;
    width: 100%;
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
}
.bar {
    width: 6rpx;
    min-height: 10%;
    max-height: 90%;
    background: #1677ff;
    margin: 0 8rpx;
    border-radius: 4rpx;
    /* 无 CSS 动画，完全由 JS 驱动 height 变化 */
}
@keyframes bounce {
    0% { height: 30%; }
    100% { height: 100%; }
}

.status-panel {
    min-height: 80rpx;
    width: 100%;
}
.time-text {
    font-size: 36rpx;
    font-weight: bold;
    font-family: Arial;
    color: #333;
    text-align: center;
}

/* 试听卡片 */
.playback-card {
    width: 100%;
    background: #fff;
    border: 1px solid #1677FF;
    border-radius: 16rpx;
    padding: 24rpx 40rpx;
    box-sizing: border-box;
}
.playback-text {
    font-size: 30rpx;
    color: #1677FF;
    font-weight: bold;
}
.re-record-text {
    font-size: 28rpx;
    color: #666;
}

/* 操作按钮 */
.action-btn-area {
    width: 100%;
    min-height: 180rpx;
    display: flex;
    justify-content: center;
}
.submit-btn {
    width: 100%;
    height: 96rpx;
    background: #1677ff;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    border-radius: 48rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.record-btn-wrapper {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background: rgba(22, 119, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
}
.record-btn-wrapper .stop-btn {
    width: 50rpx;
    height: 50rpx;
    border-radius: 12rpx;
    background: #1677ff;
}
.record-btn-wrapper .mic-btn {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    background: #1677ff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.status-hint {
    height: 80rpx;
}
.hint-text {
    font-size: 28rpx;
    color: #333;
}
.hint-text.small {
    font-size: 24rpx;
}
.text-999 {
    color: #999 !important;
}

/* 教程弹窗 */
.tutorial-popup {
    padding: 0 24rpx;
    background: #fff;
    border-radius: 24rpx 24rpx 0 0;
    color: #333;
    max-height: 80vh;
}
.t-title {
    font-size: 34rpx;
    font-weight: bold;
    text-align: center;
    display: block;
    width: 100%;
}
.t-scroll {
    max-height: 50vh;
}
.t-subtitle {
    font-size: 30rpx;
    font-weight: bold;
}
.t-desc {
    font-size: 28rpx;
    color: #666;
    line-height: 1.5;
}
.t-know-btn {
    width: 100%;
    height: 96rpx;
    background: #1677ff;
    color: #fff;
    border-radius: 20rpx;
    font-size: 32rpx;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 查看教程入口按钮 */
.tutorial-link {
    padding: 10rpx 20rpx;
    border-radius: 30rpx;
    background: rgba(22, 119, 255, 0.06);
}
.tutorial-link-text {
    font-size: 26rpx;
    color: #1677FF;
}
</style>
