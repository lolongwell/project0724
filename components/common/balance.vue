<template>
	<view class="balance-box" :style="{height:height,background:background}">
		<slot name="title" class="title"></slot>
		 <span class="balance">{{balance}}</span>
	</view>
</template>

<script>
	export default {
		components: {
		},	
		prop:{
			background:{
				type:String
			},
			height:{
				type:String
			}
		},
		computed:{	
			balance(){
				return this.$store.state.balance
			}
		},
		data() {
			return {
			
			};
		},
		methods: {
	
			
		}
	};
</script>

<style lang="scss" scoped>
		
	.balance-box{
		width: 100%;
		height: 130px;
		background-color: #fff;
		display: flex;
		margin-top: 40px;
        flex-direction: column;	
		justify-content: center;
		align-items: center;
		.balance{
			margin-top: 20px;
			color: red;
			font-size: 70rpx;
		}
	}
</style>
