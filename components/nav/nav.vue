<template>
    <view><wuc-tab :tab-list="navList" :tabCur.sync="cr" @change="tChange" :text-flex="true"></wuc-tab></view>
	<!-- <ul class="nav">
		<li :key="item.name" @click="Nv(item)" v-for="item in navList">{{ item.name }}</li>
	</ul> -->
</template>

<script>
import WucTab from '../wuc-tab/wuc-tab';
export default {
    name: 'NavBar',
    components: {WucTab},
	data() {
		return {
            cr: -1,
			navList: [
				{
					name: '精品果',
					url: '/pages/fineFruit/fineFruit'
				},
				{
					name: '特级果',
					url: '/pages/superFruit/superFruit'
				},
				{
					name: '定制',
					url: ''
				},
				{
					name: '29.9会员',
					url: '/pages/vipCard/vipCard'
				},
				{
					name: '预售',
					url: '/pages/presell/presell'
				},
				{
					name: '试吃年卡',
					url: '/pages/yearlyCard/yearlyCard'
				},
				{
					name: '果园直播',
					url: '/pages/liveStreaming/liveStreaming'
				},
				{
					name: '经营资质',
					url: '/pages/qualification/qualification'
				}
			]
		};
	},
	created() {
		// this.getNavList();
	},
	methods: {
		async getNavList() {
			this.navList = await this.$api.json('navList');
        },
        tChange(e){
            let url = this.navList[e].url;
            this.cr = -1;
            this.Nv(url);
        },
		Nv(url) {
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="scss">
@mixin nav-split() {
	display: inline-block;
	content: '';
	width: 1px;
	height: $font-sm;
	background-color: $black-color;
	margin: 0 5rpx;
	position: relative;
	top: 5rpx;
}
@mixin nav-start-end() {
	display: inline-block;
	content: '';
	width: 15rpx;
	height: 1px;
	background-color: $black-color;
	// margin: 0 5rpx;
	position: relative;
	top: -8rpx;
}
.nav {
	list-style: none;
	margin: 0;
	padding: 0;
	font-size: $font-sm - 2;
	text-align: center;
	&::before {
		@include nav-start-end();
	}
	&::after {
		@include nav-start-end();
	}
	li {
		display: inline-block;
		padding: 20rpx 0;
		&:first-child {
			&::before {
				@include nav-split();
			}
		}
		&::after {
			@include nav-split();
		}
	}
}
</style>
