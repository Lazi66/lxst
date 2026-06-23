<template>
	<view class="record-container">
		<!-- 摄像头预览 -->
		<camera 
			device-position="front" 
			flash="off" 
			@error="handleCameraError" 
			style="width: 100vw; height: 100vh;"
		>
			<cover-view class="overlay-container">
				<!-- 导航栏返回 -->
				<cover-view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
					<cover-view class="back-btn" @click="handleBack">
						<cover-view class="back-icon-custom"></cover-view>
					</cover-view>
					<cover-view class="nav-title">录制授权视频</cover-view>
				</cover-view>

				<!-- 提词器区域 -->
				<cover-view class="teleprompter-box">
					<cover-view class="teleprompter-header">请照着下方文字朗读并拍摄</cover-view>
					<cover-view class="teleprompter-content">
						{{ authText }}
					</cover-view>
				</cover-view>

				<!-- 底部控制区域 -->
				<cover-view class="controls-area">
					<cover-view class="timer-text" v-if="isRecording">{{ formatTime(recordSeconds) }}</cover-view>
					
					<cover-view class="record-btn-wrap">
						<cover-view 
							class="record-btn" 
							:class="{ 'is-recording': isRecording }" 
							@click="toggleRecord"
						>
							<cover-view class="record-inner" :class="{ 'is-recording': isRecording }"></cover-view>
						</cover-view>
					</cover-view>
					
					<cover-view class="status-hint">
						{{ isRecording ? '点击停止拍摄' : '点击开始拍摄' }}
					</cover-view>
				</cover-view>
			</cover-view>
		</camera>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0,
			authText: '',
			isRecording: false,
			recordSeconds: 0,
			timer: null,
			cameraContext: null,
		};
	},
	onLoad(options) {
		const sysInfo = uni.getSystemInfoSync();
		this.statusBarHeight = sysInfo.statusBarHeight || 0;
		
		if (options.authText) {
			this.authText = decodeURIComponent(options.authText);
		}
		
		this.cameraContext = uni.createCameraContext();
	},
	methods: {
		handleBack() {
			if (this.isRecording) {
				uni.showModal({
					title: '提示',
					content: '正在录制中，确定要退出吗？',
					success: (res) => {
						if (res.confirm) {
							this.stopRecord(true);
						}
					}
				});
				return;
			}
			uni.navigateBack();
		},
		handleCameraError(e) {
			console.error('Camera error:', e);
			uni.showModal({
				title: '权限提示',
				content: '请授权摄像头权限',
				showCancel: false,
				success: () => {
					uni.navigateBack();
				}
			});
		},
		toggleRecord() {
			if (this.isRecording) {
				this.stopRecord();
			} else {
				this.startRecord();
			}
		},
		startRecord() {
			this.cameraContext.startRecord({
				success: () => {
					this.isRecording = true;
					this.recordSeconds = 0;
					this.startTimer();
				},
				fail: (err) => {
					console.error('Start record failed:', err);
					uni.showToast({ title: '启动录制失败', icon: 'none' });
				}
			});
		},
		stopRecord(isCancel = false) {
			this.cameraContext.stopRecord({
				success: (res) => {
					this.isRecording = false;
					this.stopTimer();
					
					if (isCancel) {
						uni.navigateBack();
						return;
					}

					if (this.recordSeconds < 3) {
						uni.showToast({ title: '录制时长过短', icon: 'none' });
						return;
					}

					// 返回录制好的视频
					const eventChannel = this.getOpenerEventChannel();
					if (eventChannel && eventChannel.emit) {
						eventChannel.emit('recordFinished', {
							tempFilePath: res.tempVideoPath,
							tempThumbPath: res.tempThumbPath
						});
					}
					uni.navigateBack();
				},
				fail: (err) => {
					this.isRecording = false;
					this.stopTimer();
					console.error('Stop record failed:', err);
				}
			});
		},
		startTimer() {
			this.timer = setInterval(() => {
				this.recordSeconds++;
				if (this.recordSeconds >= 60) {
					this.stopRecord();
				}
			}, 1000);
		},
		stopTimer() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		formatTime(s) {
			const m = Math.floor(s / 60).toString().padStart(2, '0');
			const sec = (s % 60).toString().padStart(2, '0');
			return `${m}:${sec}`;
		}
	},
	onUnload() {
		this.stopTimer();
	}
};
</script>

<style scoped>
.record-container {
	width: 100vw;
	height: 100vh;
	background-color: #000;
}
.overlay-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	pointer-events: none;
}
.overlay-container * {
	pointer-events: auto;
}

.nav-bar {
	padding: 20rpx 30rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	z-index: 10;
}
.back-btn {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.back-icon-custom {
	width: 24rpx;
	height: 24rpx;
	border-left: 4rpx solid #fff;
	border-bottom: 4rpx solid #fff;
	transform: rotate(45deg);
}
.nav-title {
	flex: 1;
	text-align: center;
	color: #fff;
	font-size: 34rpx;
	font-weight: bold;
	margin-right: 80rpx;
}

.teleprompter-box {
	margin: 60rpx 40rpx;
	padding: 30rpx;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 16rpx;
	border: 1rpx solid rgba(255, 255, 255, 0.2);
}
.teleprompter-header {
	color: #1677FF;
	font-size: 24rpx;
	margin-bottom: 20rpx;
	text-align: center;
	font-weight: bold;
}
.teleprompter-content {
	color: #fff;
	font-size: 32rpx;
	line-height: 1.6;
	text-align: left;
	white-space: pre-wrap;
}

.controls-area {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 60rpx 0 100rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
}
.timer-text {
	color: #fff;
	font-size: 36rpx;
	font-family: Arial;
	margin-bottom: 40rpx;
	background: rgba(255, 0, 0, 0.6);
	padding: 6rpx 30rpx;
	border-radius: 8rpx;
	min-width: 140rpx;
	text-align: center;
}
.record-btn-wrap {
	width: 160rpx;
	height: 160rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20rpx;
}
.record-btn {
	width: 130rpx;
	height: 130rpx;
	border-radius: 50%;
	border: 6rpx solid #fff;
	position: relative;
}
.record-inner {
	position: absolute;
	top: 10rpx;
	left: 10rpx;
	width: 110rpx;
	height: 110rpx;
	background: #ff4d4f;
	border-radius: 50%;
	transition: all 0.2s;
}
.record-inner.is-recording {
	top: 40rpx;
	left: 40rpx;
	width: 50rpx;
	height: 50rpx;
	border-radius: 8rpx;
}
.status-hint {
	color: #fff;
	font-size: 26rpx;
	opacity: 0.8;
}
</style>
