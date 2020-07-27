<template>
	<view class="intergral-exchange-list">
		<view class="list" v-for="(item,index) in intergralList">
			<view class="img">
				<image :src="item.url" mode=""></image>
			</view>
			<view class="good-name">
				{{item.name}}
			</view>
			<view class="good-integral">
				<span>{{item.integral}}</span>
				积分
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		props: {
			intergralList: {

			}
		},
		data() {
			return {

			};
		},
		computed: {

		},
		methods: {


		}
	};
</script>

<style lang="scss" scoped>
	.intergral-exchange-list {
		display: flex;
		flex-wrap: wrap;
		font-size: $font-base;
		padding: 0 $page-row-spacing;
		background: #fff;
		padding: 20rpx;

		.list {
			width: calc((100% - 40rpx)/2);
			margin: 10rpx;
			 font-size: 22rpx;
			 border-radius: 16rpx;
			.img {
				width: 100%;
				
				height: 138px;
				
				uni-image{
					height: 100%;
				}
				image: {
					height: 100%;
					width: 100%;
					margin-right: 10rpx;
					
				}

				;
			}

			.good-name {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-top: 15px;
			}

			.good-integral {
				margin-top: 15rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				span {
					color: red;
					font-weight: bolder;
					margin-right: 10rpx;

				}
			}
		}

	}
	
	uni-image {
		width: 100%;
	}
</style>
