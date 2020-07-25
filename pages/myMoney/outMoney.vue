<template>
	<view class="out-money-box">
		<!-- 余额组件 -->
		<balance :height="height" :background="background">
			<p slot="title">我的余额（元）</p>
		</balance>
		<!-- 提现信息 -->
		<view class="uni-form-item uni-column out-money-info">
			<input class="uni-input input-item iconfont search" v-model="form.money" type="digit" placeholder="请输入提现金额" />
			<input class="uni-input input-item" v-model="form.name" placeholder="请输入持卡人姓名" />
			<view class="uni-list input-item" >
				<view class="uni-list-cell" >
					<view class="uni-list-cell-db" placeholder="请选择银行">
						<picker @change="bindPickerChange" :value="index" v-model="form.bank"  placeholder="请选择银行" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<input class="uni-input input-item" v-model="form.card" type="digit" placeholder="请输入卡号" />
			<input class="uni-input input-item" v-model="form.openBank" placeholder="请输入开户行" />
		</view>
		<view class="text-info">
			<p>*满200元即可提现，仅限工作日可提现，三个工作日左右到账，提现扣除手续费1%.</p>

		</view>
		<!-- 提交 -->
		<view class="submit-money-info" @click="submitMoneyInfo">
			<button type="default">立刻提现</button>
		</view>
	</view>
</template>

<script>
	import Balance from '@/components/common/balance'
	export default {
		components: {
			Balance
		},
		data() {
			return {
				height: '300rpx',
				background: 'red',
				form: {
					money: '',
					name: '',
					bank: '',
					card: '',
					openBank: ''
				},
				array: ['请选择银行','中国', '美国', '巴西', '日本'],
				index: 0,
			};
		},
		methods: {
			submitMoneyInfo() {
				console.log(this.form)
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e)
				this.index = e.target.value
				
				this.form.bank = this.array[this.index]
				console.log(this.form.bank)
			},

		}
	};
</script>

<style lang="scss" scoped>
	.out-money-box {
		height: 300rpx;
		margin-top: 30rpx;
		width: 100%;
		padding: 10rpx 30rpx;

		.out-money-info {
			margin-top: 40rpx;
			background: #fff;
			width: 100%;
			padding: 10rpx 30rpx;

			.input-item {
				height: 100rpx;
				border-bottom: 1px solid #999;
				font-size: 35rpx;
				padding-left: 20rpx;

				&:nth-of-type(5) {
					border: 0;
				}
			}
		}

		.text-info {
			padding: 30rpx;

			p {
				font-size: 20rpx;
			}

		}

		.submit-money-info {
			margin-top: 10rpx;

			button {
				background: $my-color;
				color: #fff;
				font-size: $font-base + 10rpx;
				width: 80%;
			}
		}
	}
</style>
<style lang="scss">
		
	.uni-list-cell{
		height: 100%;
		
	}
	.uni-input{
		width: 100%;
		height: 100%;
		color: #999;
	}
	</style>