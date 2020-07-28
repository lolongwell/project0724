<template>
    <view>
		<ul class="_lll">
			<li v-for="item in dataList" :key="item.id" @click="Gl(item.id)">
				<!-- <image :src="item.pic"  mode="aspectFit" class="img"></image> -->
				<img :src="item.pic" class="img"></img>
				<view class="txt">{{item.spfl2}}</view>
			</li>
		</ul>
    </view>
</template>

<script>
export default {
	name: 'HeaderLinks',
	props: {
		dataList: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {
             imgUrl:[]
        };
	},
	onShow() {
	},
	onLoad(){
	},
	mounted(){
     
	},
	methods: {
		Gl(url) {
			let params = url.split('?')[1].split('&')
			params.forEach(v => {
				if (v.indexOf('type') != -1) {
					let type = v.split('=')[1]
					uni.setStorageSync('type', type)
				}
			})
				uni.switchTab({
					url: url
				})
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
		flex: 1;
        width: calc(25% - 10rpx);
        box-sizing: border-box;
        text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 30rpx 0;
		padding: 10rpx;
        .img {
			width: 80rpx;
			width: 100%;
			height: 80rpx;
			height: 100%;
		}
    }
}
._sss{
    margin-top: 10rpx;
}
</style>
