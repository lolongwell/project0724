<template>
	<view>
		<uni-tab :dataSource="tabList" @handle="switchTab"></uni-tab>
	</view>
</template>

<script>
	import UniTab from '@/components/uni-tab/uni-tab.vue'
	export default {
		name: 'order',
		components: { UniTab },
		data() {
			return {
				tabList: [
					{text: '拼团信息'},
					{text: '代付款'},
					{text: '待收货'},
					{text: '已完成'}
				]
			};
		}
	}
</script>

<style lang="scss">

</style>
