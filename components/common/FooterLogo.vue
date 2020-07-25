<template>
	<view class="f-l">
        <img src="../../static/logo-button.png" alt="logo"/>
    </view>
</template>

<script>
export default {
	name: 'FooterLogo',
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
.f-l{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 30rpx 0;
    img{
        width: 145rpx;
        height: auto;
        /*  #ifdef  MP-WEIXIN  */
        height: 82rpx;
        margin-bottom: 30rpx;
        /*  #endif  */
    }
}
</style>
