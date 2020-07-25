<template>
	<swiper class="tips_swiper" :autoplay="true" :duration="350" :vertical="true">
		<swiper-item v-for="(tip,index) in tipsList" :key="index">
			<view class="__tips _swiper-item">
				<view class="text">{{tip}}</view>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
import NewsAPI from '../../api/news/news';
export default {
	name: 'Tips',
	props: {
        color: {
            type: String
        }
	},
	data() {
		return {
			tipsList: []
		};
	},
	mounted(){
		this.init();
	},
	methods: {
		init(){
			this.loadData();
		},
		loadData() {
			NewsAPI.newsList({ xwfl: '1' }).then(res => {
				let news = res.data.obj.results;
				this.tipsList = [];
				news.forEach(v=>{
					this.tipsList.push(v.summary);
				})
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.tips_swiper{
	width: 100%;
	height: 46rpx;
	._swiper-item{
		width: 100%;
		height: 46rpx;
	}
}
.__tips {
    font-size: $font-sm - 2rpx;
	padding: 5rpx 0;
    border-top: 1px dashed #ced0cc;
    border-bottom: 1px dashed #ced0cc;
	.text{
		display: inline-block;
		width: calc(100% - 40rpx) !important;
		word-break: keep-all;
		overflow: hidden;
		text-overflow: ellipsis;
		vertical-align: top;
	}
    &::before{
        content: "";
        display: inline-block;
        width: 22rpx;
        height: 22rpx;
        background-image: url("../../static/icon-tips.png");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 10rpx;
        position: relative;
		vertical-align: top;
        top: 5rpx;
    }
}
</style>
