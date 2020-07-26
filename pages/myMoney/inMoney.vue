<template>
	<view class="in-money-box">
		<view class="in-moneys">
			<uni-list class='change-moneys'>
				<uni-list-item title="" class="item" :class="{'active':index === activeIndex}" @click="changMoney(item,index)" note=""
				 v-for="(item,index) in moneys">{{item}}</uni-list-item>
			</uni-list>
		</view>
		<view class="pay-moneys">
			<uni-list class='pay-money'>
				<uni-list-item title=""  :class="{'method-active':index === methodIndex}" v-for="(item,index) in methods" class="item" @click="changMethod(item,index)" note="">{{item}}</uni-list-item>
			</uni-list>
		</view>
		<view class="submit">
			<button type="default" @click="submit('submit',{})">立即充值</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moneys: ['999元', '1997元', '4998元', '9988元', '19888元', '其他'],
				methods: ['支付宝', '微信'],
				activeIndex: '',
				methodIndex:'',
				money:'',
				method:''
			};
		},
		methods: {

			changMoney(val, i) {
				this.activeIndex = i
				console.log(i)
				console.log(val)
				this.money=val
				console.log('this.money',this.money)
			},
				
			changMethod(val,i){
				this.methodIndex = i
				this.method = val
				console.log('this.method',this.method)
			},
				
			submit(){
				 //发送请求
				 // uni.navigateTo({
				 // 	url: `/pages/oreder/detail`
				 // });
				 if(this.money && this.method &&this.method === '微信'){
					 uni.navigateTo({
					 	url: `/pages/oreder/detail`
					 });
				 }
				
			}
		}
	};
</script>

<style lang="scss" scoped>
	.in-money-box {
		height: 100%;

		.in-moneys {
			height: 100px;
			width: 100%;
			background: red;

			.change-moneys {
				height: 100%;
				width: 100%;
				padding: 5rpx 10rpx;
				background: pink;
				display: flex;
				flex-wrap: wrap;
				display: flex;
				justify-content: center;
				align-items: center;

				.active {
					background: red !important;
				}

				.item {
					// flex: 1;
					width: 25%;
					height: 30px;
					background: #ccc;
					margin: 0 20rpx;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 4px;
				}
			}
		}
	    .pay-money{
			width: 100%;
			height: 200rpx;
			margin-top: $page-row-spacing;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 10rpx;
				
			.method-active{
				border: 1px solid red;
			}
			.item{
				flex: 1;
				width: 20%;
				height: 100rpx;
				margin: 0 30rpx ;
				background: pink;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
			
		.submit{
			margin-top: 40rpx;
				
			button{
				background: $my-color;
				color: #fff;
				width: 80%;
			}		
		}
		
	}
</style>
