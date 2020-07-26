<template>
	<view class="order-detail-box">
		<ul>
			<li>
				<span>商品名称</span>
				<span>{{name}}</span>
			</li>
			<li>
				<span>订单编号</span>
				<span>{{name}}</span>
			</li>
			<li>
				<span>商家名称</span>
				<span>{{name}}</span>
			</li>
			<li>
				<span>商品价格</span>
				<span>{{name}}</span>
			</li>
			<li>
				<span>还需支付</span>
				<span>{{name}}</span>
			</li>
		</ul>
		<view class="pay-method">
			<p>选择支付方式</p>
			<view class="pay-wechar" @click="payHandle">
				<view class="left">

				</view>
				<view class="center">
					<p>微信支付1</p>
					<p>微信支付，安全快捷(只能在微信内使用)</p>
				</view>
				<view class="right">
					<span class="cell-more yticon icon-you icon-uni"></span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moneyAPI from '@/api/money/money.js';
	export default {
		data() {
			return {
				name: '333333eeeeeeeeeeeeee33',
				form:{
					name:'33333333'
				}
			};
		},
		methods: {
			payHandle() {
            console.log('调用微信接口')
			 let data = JSON.parse(JSON.stringify(this.form));
			 // 提现-提交
			 moneyAPI.inMoney(data).then(res => {
			 	// this.$_log('提现：', res.data);
			 	uni.showToast({
			 		title: '提现成功!',
			 		icon: 'none'
			 	});
			 	uni.navigateBack();
			 });
			 console.log(this.form)
			   
			}




		}
	};
</script>

<style lang="scss" scoped>
	.order-detail-box {
		padding: $page-row-spacing 0;
		font-size: $font-base;

		ul {
			padding: 0;
			background: #fff;

			li {
				font-size: 30rpx;
				display: flex;
				justify-content: space-around;
				border-top: 1px solid #ddd;
				padding: $page-row-spacing 0;

				span {
					justify-content: space-around;

					&:nth-of-type(1) {
						text-align: left;
					}

					// &:nth-of-type(1){
					// 	flex: 1;
					// }
				}
			}
		}


		.pay-method {
			margin-top: 30rpx;

			.pay-wechar {
				margin-top: $page-row-spacing;
				background: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 30rpx;

				.left {
					flex: 1;
				}

				.center {
					flex: 6;
					display: flex;
					flex-direction: column;

					p {
						padding: 10rpx;

						&:nth-of-type(2) {
							color: #999;
						}
					}
				}

				.right {
					flex: 1;
					text-align: right;
				}
			}
		}
	}
</style>
