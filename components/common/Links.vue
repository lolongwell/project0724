<template>
	<ul class="links">
        <li v-for="l in lks" @click="tz(l.url)"><text>{{l.name}}</text></li> 
    </ul>
</template>

<script>
// 头部logo
export default {
	name: 'Links',
	props: {
	},
	data() {
		return {
            lks:[{
                name:"定制",
                url:""
            },{
                name:"29.9会员",
                url:"/pages/vipCard/vipCard"
            },{
                name:"试吃年卡",
                url:"/pages/yearlyCard/yearlyCard"
            },{
                name:"预售",
                url:"/pages/presell/presell"
            },{
                name:"优惠券",
                url:""
            },{
                name:"果园直播",
                url:"/pages/liveStreaming/liveStreaming"
            }]
        };
	},
	methods: {
        tz(s) {
            uni.navigateTo({
				url: s
			});
        }
	}
};
</script>

<style lang="scss" scoped>
.links {
    list-style: none;
    padding: 0 20rpx;
    margin: 0;
    display: flex;
    font-size: $font-sm;
    li{
        flex: 1;
        text-align: center;
        background-color: #5a961e;
        color: #fff;
        padding: 10rpx 0;
        margin-right: 10rpx;
        &:last-child{
            margin-right: 0;
        }
    }
}
</style>
