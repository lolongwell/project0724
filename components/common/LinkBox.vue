<template>
  <view>
    <view class="l-b">
      <ul>
        <li :key="i.name" @click="gn(i)" v-for="i in navList">{{ i.name }}</li>
      </ul>
    </view>
  </view>
</template>

<script>
export default {
  name: "FooterLogo",
  props: {
    navList: {
      type: Array
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
      gn(i) {
			let id = i.title;
			uni.navigateTo({
				url: i.url
			});
		}
  }
};
</script>

<style lang="scss" scoped>
.l-b{
    >ul{
        margin: 0;
        padding: 0 30rpx;
        display: flex;
        list-style: none;
        justify-content: space-around;
        flex-wrap: wrap;
        >li{
            width: 220rpx;
            height: 130rpx;
            display: flex;
            align-items: center;
            justify-content:center;
            text-align: center;
            background-color: $font-color-base;
            color: white;
        }
    }
}
</style>
