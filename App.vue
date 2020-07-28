<script>
	export default {
		// 全局变量
		globalData: {
			// BASE_URL: "http://47.110.253.31:8080/yplg/",
			BASE_URL: "http://sjblake.cn/yplg/",
			appId:'wx05de43db35c9393b'
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	body {
		background-color: $main-bg;
	}

	/*
			全局公共样式和字体图标
		*/
	@font-face {
		font-family: 'yticon';
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
	}

	@mixin clear() {
		&::after {
			content: '';
			display: block;
			clear: both;
		}
	}

	@font-face {
		font-family: 'wkicon';
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1504256_e04hhrjt0i.ttf') format('truetype');
	}

	li {
		list-style: none;
	}

	.wkicon {
		font-family: 'wkicon' !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-daishouhuo:before {
		content: '\e604';
	}

	.icon-daipingjia:before {
		content: '\e630';
	}

	.icon-daifahuo:before {
		content: '\e708';
	}

	.icon-yaoqing:before {
		content: '\e60d';
	}

	.icon-ad:before {
		content: '\e645';
	}

	.icon-dingzhi:before {
		content: '\e91b';
	}

	.icon-shouji:before {
		content: '\e605';
	}

	.icon-more:before {
		content: '\e86d';
	}

	.icon-zan:before {
		content: '\e606';
	}

	.icon-chaping:before {
		content: '\e701';
	}

	.icon-kefu:before {
		content: '\e621';
	}

	// uni-page-head {
	//   display: none;
	// }
	.__space {
		margin-top: 20rpx !important;
	}


	.yticon {
		font-family: 'yticon' !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-yiguoqi1:before {
		content: '\e700';
	}

	.icon-iconfontshanchu1:before {
		content: '\e619';
	}

	.icon-iconfontweixin:before {
		content: '\e611';
	}

	.icon-alipay:before {
		content: '\e636';
	}

	.icon-shang:before {
		content: '\e624';
	}

	.icon-shouye:before {
		content: '\e626';
	}

	.icon-shanchu4:before {
		content: '\e622';
	}

	.icon-xiaoxi:before {
		content: '\e618';
	}

	.icon-jiantour-copy:before {
		content: '\e600';
	}

	.icon-fenxiang2:before {
		content: '\e61e';
	}

	.icon-pingjia:before {
		content: '\e67b';
	}

	.icon-daifukuan:before {
		content: '\e68f';
	}

	.icon-pinglun-copy:before {
		content: '\e612';
	}

	.icon-dianhua-copy:before {
		content: '\e621';
	}

	.icon-shoucang:before {
		content: '\e645';
	}

	.icon-xuanzhong2:before {
		content: '\e62f';
	}

	.icon-gouwuche_:before {
		content: '\e630';
	}

	.icon-icon-test:before {
		content: '\e60c';
	}

	.icon-icon-test1:before {
		content: '\e632';
	}

	.icon-bianji:before {
		content: '\e646';
	}

	.icon-jiazailoading-A:before {
		content: '\e8fc';
	}

	.icon-zuoshang:before {
		content: '\e613';
	}

	.icon-jia2:before {
		content: '\e60a';
	}

	.icon-huifu:before {
		content: '\e68b';
	}

	.icon-sousuo:before {
		content: '\e7ce';
	}

	.icon-arrow-fine-up:before {
		content: '\e601';
	}

	.icon-hot:before {
		content: '\e60e';
	}

	.icon-lishijilu:before {
		content: '\e6b9';
	}

	.icon-zhengxinchaxun-zhifubaoceping-:before {
		content: '\e616';
	}

	.icon-naozhong:before {
		content: '\e64a';
	}

	.icon-xiatubiao--copy:before {
		content: '\e608';
	}

	.icon-shoucang_xuanzhongzhuangtai:before {
		content: '\e6a9';
	}

	.icon-jia1:before {
		content: '\e61c';
	}

	.icon-bangzhu1:before {
		content: '\e63d';
	}

	.icon-arrow-left-bottom:before {
		content: '\e602';
	}

	.icon-arrow-right-bottom:before {
		content: '\e603';
	}

	.icon-arrow-left-top:before {
		content: '\e604';
	}

	.icon-icon--:before {
		content: '\e744';
	}

	.icon-zuojiantou-up:before {
		content: '\e605';
	}

	.icon-xia:before {
		content: '\e62d';
	}

	.icon--jianhao:before {
		content: '\e60b';
	}

	.icon-weixinzhifu:before {
		content: '\e61a';
	}

	.icon-comment:before {
		content: '\e64f';
	}

	.icon-weixin:before {
		content: '\e61f';
	}

	.icon-fenlei1:before {
		content: '\e620';
	}

	.icon-erjiye-yucunkuan:before {
		content: '\e623';
	}

	.icon-Group-:before {
		content: '\e688';
	}

	.icon-you:before {
		content: '\e606';
	}

	.icon-forward:before {
		content: '\e607';
	}

	.icon-tuijian:before {
		content: '\e610';
	}

	.icon-bangzhu:before {
		content: '\e679';
	}

	.icon-share:before {
		content: '\e656';
	}

	.icon-yiguoqi:before {
		content: '\e997';
	}

	.icon-shezhi1:before {
		content: '\e61d';
	}

	.icon-fork:before {
		content: '\e61b';
	}

	.icon-kafei:before {
		content: '\e66a';
	}

	.icon-iLinkapp-:before {
		content: '\e654';
	}

	.icon-saomiao:before {
		content: '\e60d';
	}

	.icon-shezhi:before {
		content: '\e60f';
	}

	.icon-shouhoutuikuan:before {
		content: '\e631';
	}

	.icon-gouwuche:before {
		content: '\e609';
	}

	.icon-dizhi:before {
		content: '\e614';
	}

	.icon-fenlei:before {
		content: '\e706';
	}

	.icon-xingxing:before {
		content: '\e70b';
	}

	.icon-tuandui:before {
		content: '\e633';
	}

	.icon-zuanshi:before {
		content: '\e615';
	}

	.icon-zuo:before {
		content: '\e63c';
	}

	.icon-shoucang2:before {
		content: '\e62e';
	}

	.icon-shouhuodizhi:before {
		content: '\e712';
	}

	.icon-yishouhuo:before {
		content: '\e71a';
	}

	.icon-dianzan-ash:before {
		content: '\e617';
	}

	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}

	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20rpx 0;
		border-radius: 8rpx;
	}

	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;

		image {
			width: 100%;
			height: 100%;
			transition: 0.6s;
			opacity: 0;

			&.loaded {
				opacity: 1;
			}
		}
	}

	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.common-hover {
		background: #f5f5f5;
	}

	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(0.5);
		border-bottom: 1px solid $border-color-base;
	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}

	/* button样式改写 */
	uni-button,
	button {
		height: 80rpx;
		line-height: 80rpx;
		font-size: $font-lg + 2rpx;
		font-weight: normal;

		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}

	uni-button[type='default'],
	button[type='default'] {
		color: $font-color-dark;
	}

	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}

	.placeholder {
		color: #999999;
	}

	// 按钮
	.button {
		border-radius: 5rpx;
		height: 36rpx;
		line-height: 36rpx;
		padding: 0 25rpx;
		font-size: $font-sm;
		position: relative;
		display: inline-block;

		&::before {
			position: absolute;
			top: 5rpx;
			left: 5rpx;
			content: '';
			display: block;
			width: 10rpx;
			height: 10rpx;
			border: 1rpx solid;
			border-bottom: none;
			border-right: none;
		}

		&::after {
			position: absolute;
			right: 5rpx;
			bottom: 5rpx;
			content: '';
			display: block;
			width: 10rpx;
			height: 10rpx;
			border: 1rpx solid;
			border-left: none;
			border-top: none;
		}

		&.large {
			height: 50rpx;
			line-height: 50rpx;

			&::before {
				top: 5rpx;
				left: 5rpx;
				width: 15rpx;
				height: 15rpx;
			}

			&::after {
				right: 5rpx;
				bottom: 5rpx;
				width: 15rpx;
				height: 15rpx;
			}
		}

		&.orange {
			background-color: $base-orange;
			color: $base-yellow;

			&::before {
				border: 1rpx solid $base-yellow;
				border-bottom: none;
				border-right: none;
			}

			&::after {
				border: 1rpx solid $base-yellow;
				border-left: none;
				border-top: none;
			}
		}

		&.grey {
			background-color: $font-color-base;
			color: white;

			&::before {
				border: 1rpx solid white;
				border-bottom: none;
				border-right: none;
			}

			&::after {
				border: 1rpx solid white;
				border-left: none;
				border-top: none;
			}
		}
	}

	/* 列表 */
	.uni-list {
		background-color: #ffffff;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-cell-hover {
		background-color: #eee;
	}

	.uni-list-cell-pd {
		padding: 22upx 30upx;
	}

	.uni-list-cell-left {
		font-size: 28upx;
		padding: 0 30upx;
	}

	.uni-list-cell-db,
	.uni-list-cell-right {
		flex: 1;
	}

	.uni-list-cell::after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.uni-list .uni-list-cell:last-child::after {
		height: 0upx;
	}

	.uni-list-cell-last.uni-list-cell::after {
		height: 0upx;
	}

	.uni-list-cell-divider {
		position: relative;
		display: flex;
		color: #999;
		background-color: #f7f7f7;
		padding: 15upx 20upx;
	}

	.uni-list-cell-divider::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell-divider::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell-navigate {
		font-size: 30upx;
		padding: 22upx 30upx;
		line-height: 48upx;
		position: relative;
		display: flex;
		box-sizing: border-box;
		width: 100%;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-cell-navigate {
		padding-right: 36upx;
	}

	.uni-navigate-badge {
		padding-right: 50upx;
	}

	.uni-list-cell-navigate.uni-navigate-right:after {
		font-family: uniicons;
		content: '\e583';
		position: absolute;
		right: 24upx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.uni-list-cell-navigate.uni-navigate-bottom:after {
		font-family: uniicons;
		content: '\e581';
		position: absolute;
		right: 24upx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.uni-list-cell-navigate.uni-navigate-bottom.uni-active::after {
		font-family: uniicons;
		content: '\e580';
		position: absolute;
		right: 24upx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.uni-collapse.uni-list-cell {
		flex-direction: column;
	}

	.uni-list-cell-navigate.uni-active {
		background: #eee;
	}

	.uni-list.uni-collapse {
		box-sizing: border-box;
		height: 0;
		overflow: hidden;
	}

	.uni-collapse .uni-list-cell {
		padding-left: 20upx;
	}

	.uni-collapse .uni-list-cell::after {
		left: 52upx;
	}

	.uni-list.uni-active {
		height: auto;
	}
</style>
