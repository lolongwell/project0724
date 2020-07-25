<template>
    <view>
        <ul class="_lll">
            <li @click="Gl('/pages/productList/productList?type=10&title=小地家族')" class="icon icon-1">小地家族</li> 
            <li @click="Gl('/pages/productList/productList?type=9&title=小地单挑')" class="icon icon-2">小地单挑</li> 
            <li @click="Gl('/pages/detail/detail?id=2c93c2aa6eba5e30016ebc45bc61000f&source=1')" class="icon icon-3">二十四鲜</li> 
            <li @click="Gl('/pages/productList/productList?type=5&title=抢鲜')" class="icon icon-4">抢鲜</li>
        </ul>
        <ul class="_lll _sss">
            <li @click="Gl('/pages/detail/detail?id=2c93c2aa6ebce3fc016ebcf14d5e0003&source=1')" class="icon icon-6">88折会员卡</li> 
            <li @click="Gl('/pages/productList/productList?type=14&title=超级年卡&source=1')" class="icon icon-5">超级年卡</li> 
            <li @click="Gl('/pages/productList/productList?type=16&title=精选农场')" class="icon icon-7">精选农场</li> 
            <li @click="Gl('/pages/articleDetail/articleDetail?id=2c93c2aa723fb92a01724b010c830019')" class="icon icon-8">品牌故事</li> 
        </ul>
    </view>
</template>

<script>
export default {
	name: 'HeaderLinks',
	props: {
	},
	data() {
		return {
            links:[]
        };
	},
	methods: {
        Gl(url) {
            uni.navigateTo({
				url: url
			});
        }
	}
};
</script>

<style lang="scss" scoped>
._lll {
    list-style: none;
    padding: 0 10rpx;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    font-size: $font-sm;
    li{
        width: calc(25% - 10rpx);
        box-sizing: border-box;
        text-align: right;
        // background: linear-gradient(#4ec61e,#007c36);
		background: rgb(130,140,110);
        color: #fff;
        padding: 10rpx 15rpx 10rpx 0;
        margin-right: 13.3rpx;
		border-radius: 8rpx;
        /*  #ifdef  MP-WEIXIN  */
        margin-right: 12rpx;
        /*  #endif  */
        &:last-child{
            margin-right: 0;
        }
        &.icon {
            position: relative;
            &::before{
                content: "";
                display: inline-block;
                position: absolute;
                height: 100%;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                left: 0;
                top: 0;
            }
            &.icon-1{
                &::before {
                    background-image: url("../../static/resource/icon-1.png");
                    width: 30rpx;
                }
            }
            &.icon-2{
                &::before {
                    background-image: url("../../static/resource/icon-2.png");
                    width: 45rpx;
                }
            }
            &.icon-3{
                &::before {
                    background-image: url("../../static/resource/icon-3.png");
                    width: 25rpx;
                }
            }
            &.icon-4{
                &::before {
                    background-image: url("../../static/resource/icon-4.png");
                    width: 50rpx;
                }
            }
            &.icon-5{
                &::before {
                    background-image: url("../../static/resource/icon-5.png");
                    width: 35rpx;
                }
            }
            &.icon-6{
                &::before {
                    background-image: url("../../static/resource/icon-6.png");
                    width: 25rpx;
                }
            }
            &.icon-7{
                &::before {
                    background-image: url("../../static/resource/icon-7.png");
                    width: 40rpx;
                }
            }
            &.icon-8{
                &::before {
                    background-image: url("../../static/resource/icon-8.png");
                    width: 25rpx;
                }
            }
        }
    }
}
._sss{
    margin-top: 10rpx;
}
</style>
