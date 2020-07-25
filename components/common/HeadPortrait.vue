<template>
	<view class="_hd">
		<button v-if="!hasLogin" open-type="getUserInfo" class="_p" lang="zh_CN" @getuserinfo="getUserInfo">
			<view class="image"><image class="img" src="../../static/missing-face.png" mode=""></image></view>
			<p>点击登录</p>
		</button>

		<view v-if="hasLogin" class="_p _ent">
			<view class="_i-en"><open-data class="_hd" type="userAvatarUrl"></open-data></view>
			<view class="_r">
				<p class="_e-n"><open-data type="userNickName"></open-data></p>
				<p class="_u-ppp">
					<span class="wkicon icon-shouji"></span>
					{{ phone }}
				</p>
				<p v-if="isEnterpriseUser" class="_e-nnn">
					<span v-if="isEnterpriseAdmin" class="yticon icon-tuandui"></span>
					企业名称：{{ enterName || kmc }}
				</p>
				<view v-if="isEnterpriseAdmin" @click="invite" class="_qqq">
					<span class="wkicon icon-yaoqing"></span>
					邀请
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import AuthAPI from '../../api/auth/auth';
export default {
	name: '',
	props: {
		kmc: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			userMsg: {},
			phone: '',
			enterName: '',
			authCode: '' 
		};
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			console.log(res.target);
		}
		let user = uni.getStorageSync('user');
		console.log(user.kid);
		return {
			title: '果小地',
			path: `/pages/userCenter/userCenter?kid=${user.kid}`
		};
	},
	mounted() {
		this.getUM();
		let user = uni.getStorageSync('user');
		this.phone = user.mobilePhone;
		if (user.kid != null) {
			// this.isEnterpriseUser = true;
			this.$store.commit('updateIsEnterpriseUser', true);
			this.enterName = user.kmc; 
			this.phone = user.mobilePhone;
		}
		if (user.kid != null && !!user.iskmain) {
			this.$store.commit('updateIsEnterpriseAdmin', true);
			// this.isEnterpriseAdmin = true;
		}
	},
	computed: {
		...mapState(['hasLogin', 'isEnterpriseUser', 'isEnterpriseAdmin'])
	},
	methods: {
		getUserInfo(e) {
			this.$_log('1.授权返回值: ', e);
			if (this.hasLogin) return;
			if (e.detail.userInfo) {
				uni.showLoading({
					title: '授权中...',
					mask: true
				});
				uni.setStorageSync('userData', e.detail || null);
				uni.login({
					success: res => {
						if (res.code) {
							this.authCode = res.code;
							uni.setStorageSync('auth-code', res.code);
							this.$store.commit('statusChange', 'auth_code_state', true);
							this.$_log('2.wx.login返回值: ', res.code);
							uni.hideLoading();
							this.getSessionKey();
						} else {
							console.log('登录失败！' + res.errMsg);
						}
					}
				});
			} else {
				uni.showModal({
					title: '警告',
					content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
					showCancel: false,
					confirmText: '返回授权',
					success: res => {}
				});
			}
		},
		getSessionKey(data) {
			AuthAPI.getOpenId({ code: this.authCode }).then(res => {
				console.info(res.data.data);
				if (res.data.data.session_key) {
					// if (false) {
					this.$_log('3.session_key: ', res.data.data.session_key);
					this.$_log('3.session_key-other: ', res.data.data);
					let sessionKey = res.data.data.session_key;
					let openid = res.data.data.openid;
					let unionid = res.data.data.unionid;
					uni.setStorageSync('session_key', sessionKey);
					uni.setStorageSync('openid', openid);
					uni.setStorageSync('unionid', unionid);
					this.$store.commit('statusChange', 'session_key_state', true);
				} else {
					let openid = res.data.data.openid;
					let unionid = res.data.data.unionid;
					let token = res.data.data.token;
					uni.setStorageSync('openid', openid);
					uni.setStorageSync('unionid', unionid);
					uni.setStorageSync('TOKEN', token);
					uni.setStorageSync('user', res.data.data);
					let share_kid = uni.getStorageSync('share-kid');
					if (share_kid) {
						this.$store.commit('updateKid', share_kid);
					}

					if (res.data.data.kid != null) {
						// this.isEnterpriseUser = true;
						this.$store.commit('updateIsEnterpriseUser', true);
						this.enterName = res.data.data.kmc; 
						this.phone = res.data.data.mobilePhone;
					}
					if (res.data.data.kid != null && !!res.data.data.iskmain) {
						this.$store.commit('updateIsEnterpriseAdmin', true);
					}

					uni.showToast({
						title: '登录成功！',
						icon: 'none'
					});
					this.$store.commit('login', token);
					this.$store.commit('statusChange', 'token_state', true);
					let redirect = uni.getStorageSync('redirect');
					if (redirect) {
						uni.navigateTo({
							url: redirect
						});
						uni.switchTab({
							url: redirect
						})
					}
					uni.removeStorage({
						key: 'redirect'
					});
					return;
				}

				uni.navigateTo({
					url: '/pages/loginWX/loginWX'
				});
			});
		},
		getUM() {
			let n = uni.getStorageSync('userName');
			this.userMsg = {
				imgUrl: '/static/temp/goods/goods-1.jpg',
				name: n
			};
		},
		goLogin() {},
		invite() {
			AuthAPI.getAccessToken().then(res => {
				uni.navigateTo({
					url: `/pages/shareQR/shareQR?token=${res.data.data.access_token}`
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
._hd {
	margin-top: 10rpx;
	padding: 100rpx 0;
	border-radius: 10rpx;
	box-shadow: 0 3px 3px -3px #ccc;
}
.enter-mode {
	padding-left: 30rpx !important;
}
._p {
	text-align: center;
	padding: 0;
	height: auto;
	border: none;
	background-color: rgba(0, 0, 0, 0);
	position: relative;
	margin-top: 10rpx;
	display: flex;
	.header-info{
		height: 100%;
		display: flex;
		flex-direction: column;	
			color: #fff;
		item{
			flex: 1;
		}
	}
	&._ent {
		text-align: left;
		padding-left: 25rpx;
		display: flex;
	}
	._r {
		flex: 1;
	}
	._e-n {
		padding-left: 35rpx;
	}
	._e-nnn,
	._u-ppp {
		padding-left: 35rpx;
		font-size: $font-sm;
		margin-top: 10rpx;
	}
	&::after {
		border: none;
	}
	> .image {
		text-align: center;
		margin: 0 auto;
		width: 155rpx;
		height: 155rpx;
		border-radius: 50%;
		border: 1px solid $base-green;
		// padding: 10rpx;
		overflow: hidden;
		._hd {
			width: 100%;
			height: 100%;
		}
		.img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: 1px solid white;
			box-sizing: border-box;
		}
	}

	> p {
		font-size: $font-base;
		margin-top: 10rpx;
	}

	._i-en {
		width: 155rpx;
		height: 155rpx;
		overflow: hidden;
		border: 1px solid $base-green;
		border-radius: 50%;
		._hd {
			border-radius: 50%;
		}
		.img {
			border-radius: 50%;
			border: 1px solid white;
			box-sizing: border-box;
		}
	}

	// 邀请
	._qqq {
		text-align: center;
		position: absolute;
		width: 170rpx;
		height: 70rpx;
		line-height: 70rpx;
		border: 1px solid $border-color-dark;
		border-right: none;
		border-radius: 40rpx 0 0 40rpx;
		font-size: $font-base;
		right: 0;
		bottom: 0;
		&::after {
			border: none;
		}
		.wkicon {
			margin-right: 10rpx;
		}
	}
}
</style>
