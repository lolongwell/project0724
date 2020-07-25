<template>
	<view class="_h-t">{{ text }}</view>
</template>

<script>
export default {
	name: 'HeaderTip',
	props: {
		text: {
			type: String,
			default: '满足一天营养所需！为出色工作加油！'
		}
	},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
._h-t {
	height: 50rpx;
	line-height: 50rpx;
	// background-color: #8eb589;
	background-color: rgb(160,150,130);
	color: #fff;
	font-size: $font-sm;
	text-align: center;
}
</style>
