<template>
	<view class="content">
		
		<view class="mix-list-cell" :class="border" @click="eventClick" hover-class="cell-hover"  :hover-stay-time="50">
			<text
				v-if="icon"
				:class="['cell-icon',iconFamily,icon]"
				:style="[{
					color: iconColor,
				}]"
			></text>
			<text class="cell-tit clamp">{{title}}</text>
			<text v-if="tips" class="cell-tip">{{tips}}</text>
			<text class="cell-more yticon"
				:class="typeList[navigateType]"
			></text>
		</view>

	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				typeList: {
					left: 'icon-zuo',
					right: 'icon-you',
					up: 'icon-shang',
					down: 'icon-xia'
				},
			}
		},
		props: {
			icon: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '标题'
			},
			tips: {
				type: String,
				default: ''
			},
			navigateType: {
				type: String,
				default: 'right'
			},
			border: {
				type: String,
				default: 'b-b'
			},
			hoverClass: {
				type: String,
				default: 'cell-hover'
			},
			iconColor: {
				type: String,
				default: '#333'
			},
			iconFamily: {
				type: String,
				default: 'yticon'
			}
		},
		methods: {
			eventClick(){
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>

	.icon .mix-list-cell.b-b:after{
		left: 90rpx;
	}
	.mix-list-cell{
		display:flex;
		align-items:baseline;
		padding: 20rpx $page-row-spacing;
		line-height:60rpx;
		position:relative;
		
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30rpx;
		}

		.cell-icon{
			align-self:center;
			width:56rpx;
			max-height:60rpx;
			font-size:38rpx;
		}
		.cell-more{
			align-self: center;
			font-size:30rpx;
			color:$font-color-base;
			margin-left:$uni-spacing-row-sm;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right:10rpx;
		}
		.cell-tip{
			font-size: $font-sm+2rpx;
			color: $font-color-light;
		}
	}
</style>
