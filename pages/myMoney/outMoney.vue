<template>
	<view class="out-money-box">
		<!-- 余额组件 -->
		<balance>
			<p slot="title">我的余额（元）</p>
		</balance>
		<!-- 提现信息 -->
		<view class="uni-form-item uni-column out-money-info">
			<input class="uni-input input-item iconfont search" v-model="form.txje" type="digit" placeholder="请输入提现金额" />
			<input class="uni-input input-item" v-model="form.realname" placeholder="请输入持卡人姓名" />
			<view class="uni-list input-item" >
				<view class="uni-list-cell" >
					<view class="uni-list-cell-db" placeholder="请选择银行">
						<picker @change="bindPickerChange" :value="index" placeholder="请选择银行" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<input class="uni-input input-item" v-model="form.yhkh" type="digit" placeholder="请输入卡号" />
			<input class="uni-input input-item" v-model="form.khhmc" placeholder="请输入开户行" />
		</view>
		<view class="text-info">
			<p>*满200元即可提现，仅限工作日可提现，三个工作日左右到账，提现扣除手续费1%.</p>

		</view>
		<!-- 提交 -->
		<view class="submit-money-info" @click="submitMoney">
			<button type="default">立刻提现</button>
		</view>
	</view>
</template>

<script>
	import moneyAPI from '@/api/money/money.js';
	import Balance from '@/components/common/balance'
import informationAPI from '@/api/infomation/infomation.js'

	export default {
		components: {
			Balance
		},
		data() {
			return {
				form: {
					txje: '',
					realname: '',
					yhfl: '',
					yhkh: '',
					khhmc: ''
				},
				array: [ "请选择银行", "中国建设银行","中国工商银行","中国农业银行"],
				index: 0,
			};
		},
		onLoad() {
			// this.getBankdata()
		},
		onShow() {
			
		},
		methods: {
			getBankdata() {
				informationAPI.getBankList('yhfl').then(res => {
					this.array = res.data.data
					console.log(this.array)
				})
			},
			submitMoney() {
				if (!this.form.txje) {
					this.$api.msg('请输入提现金额');
					return;
				}
				if (!this.form.realname) {
					this.$api.msg('请输入持卡人姓名');
					return;
				}
				if (this.form.yhfl ==='请选择银行' ) {
					this.$api.msg('请选择银行');
					return;
				}
				// if (!this.form.yhkh) {
				// 	this.$api.msg('请输入银行卡号');
				// 	return;
				// }
				// if (!/^([1-9]{1})(\d{14}|\d{18})$/.test(this.form.yhkh)) {
				// 	this.$api.msg('请输入正确的银行卡号');
				// 	return;
				// }
				
				if (!this.form.khhmc) {
					this.$api.msg('请输入开户行');
					return;
				}
				let data = JSON.parse(JSON.stringify(this.form));
				// 提现-提交
				moneyAPI.outMoney(data).then(res => {
					uni.showToast({
						title: '提现成功!'
					});
					// uni.navigateBack();
				});
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
				this.form.yhfl = e.target.value
				// this.form.yhfl = this.array[this.index]
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