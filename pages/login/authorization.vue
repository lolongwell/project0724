<template>
	<view class="authorization">
		<view class="logo"><img class="login _logo" src="../../static/login-logo.png" alt="" /></view>
		<view class="footer"><img class="_footer" src="../../static/login-footer.png" alt="" /></view>
		
		<view class="auth-remind">
			<view class="remind">
			      <p>当前未登录</p>
			      <p>登录后查看更多功能与信息</p>
			    </view>
			<view class="buttons"><a class="orange button large">请授权</a></view>
		</view>

		<view class="apply">
			<view class="title">
				<img src="/static/temp/goods/goods-1.jpg" alt />
				<font>申请</font>
			</view>
			<p>获取您的昵称、头像、地区及性别等微信信息</p>
			<view class="photo">
				<img src="/static/temp/goods/goods-1.jpg" alt />
				<p>昵称</p>
			</view>
			<view class="buttons">
				<a class="grey button large">取消</a>
				<a class="orange button large">允许</a>
			</view>
		</view>

	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.authorization {
	.userType {
		.buttons {
			position: absolute;
			left: 380rpx;
			top: 200rpx;
			view {
				margin: 0 20rpx;
			}
		}
		.footerLogo {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
	.logo {
		overflow: hidden;
		height: 670rpx;
	}
	.login {
		position: absolute;
		&._logo {
			width: 170rpx;
			left: 150rpx;
			top: 100rpx;
			height: auto;
		}
	}
	.footer {
		text-align: center;
		._footer {
			width: 315rpx;
			height: auto;
			margin: 0 auto;
		}
	}
	.logo-text {
		text-align: center;
		font-size: $font-title-lg;
		color: $base-green;
		padding: 15rpx 0;
		margin-top: 40rpx;
	}
	.auth-remind{
		position: absolute;
		left: 360rpx;
		top: 200rpx;
		> .remind {
			text-align: left;
			color: $font-color-base;
			font-size: $font-sm;
            p:first-child{
                font-size: $font-lg;
            }
		}
		> .buttons {
			> a {
				margin: 20rpx 0 0;
			}
		}
	}
	
	> .apply {
		background-color: white;
		margin-top: 34rpx;
		padding: 30rpx 0;
		> .title {
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			> * {
				display: inline-block;
				vertical-align: middle;
			}
			> img {
				width: 55rpx;
				height: 40rpx;
				margin-right: 15rpx;
			}
			> font {
				font-size: $font-lg;
			}
		}
		> p {
			text-align: center;
			font-size: $font-lg;
			color: $font-color-base;
			margin: 30rpx 0;
		}
		> .photo {
			text-align: center;
			font-size: $font-base;
			color: $font-color-base;
			> img {
				width: 110rpx;
				height: 110rpx;
			}
		}
		> .buttons {
			text-align: center;
			> a {
				margin: 0 20rpx;
				margin-top: 30rpx;
			}
		}
	}
}
</style>
