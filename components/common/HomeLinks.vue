<template>
    <view>
        <!-- <ul class="_lll">
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
        </ul> -->
		<ul class="_lll">
			<li v-for="link in links" :key="link.url" @click="Gl(link.url)">
				<image src="../../static/images/default.png" mode="aspectFit" class="img"></image>
				<view class="txt">{{link.title}}</view>
			</li>
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
            links:[
				{
					url: '/pages/productList/productList?type=10&title=小地家族',
					title: '小地家族'
				},
				{
					url: '/pages/productList/productList?type=9&title=小地单挑',
					title: '小地单挑'
				},
				{
					url: '/pages/detail/detail?id=2c93c2aa6eba5e30016ebc45bc61000f&source=1',
					title: '二十四鲜'
				},
				{
					url: '/pages/productList/productList?type=5&title=抢鲜',
					title: '抢鲜'
				},
				{
					url: '/pages/productList/productList?type=10&title=小地家族',
					title: '小地家族'
				},
				{
					url: '/pages/productList/productList?type=9&title=小地单挑',
					title: '小地单挑'
				},
				{
					url: '/pages/detail/detail?id=2c93c2aa6eba5e30016ebc45bc61000f&source=1',
					title: '二十四鲜'
				},
				{
					url: '/pages/productList/productList?type=5&title=抢鲜',
					title: '抢鲜'
				}
			]
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
	justify-content: center;
	align-items: center;
    font-size: $font-sm;
    li{
        width: calc(25% - 10rpx);
        box-sizing: border-box;
        text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 30rpx 0;
        .img {
			width: 80rpx;
			height: 80rpx;
		}
    }
}
._sss{
    margin-top: 10rpx;
}
</style>
