<template>
	<view class="h-l">
        <view class="_l">
            <img src="../../static/logo.png" alt="logo"/>
        </view>
        <view>
            <text class="_l-t">定时、定量、不重样</text>
        </view>
    </view>
</template>

<script>
export default {
	name: 'HeaderLogo',
	props: {
		navList: {
			type: Array
		}
	},
	data() {
		return {};
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.h-l{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    > ._l{
        width: 150rpx;
        height: 95rpx;
        background: $base-green;
        position: relative;
        border-radius: 0 0 4rpx 4rpx;
        img{
            width: 140rpx;
            height: 50rpx;
            position: absolute;
            bottom: 5rpx;
            left: 5rpx;
        }
    }
    ._l-t{
        /*  #ifdef  MP-WEIXIN  */
        position: relative;
        top: -20rpx;
        /*  #endif  */
        color: $base-green;
        font-size: $font-sm - 6;
    }
}
</style>
