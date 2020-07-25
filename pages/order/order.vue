<template>
	<view>
		<uni-tab :dataSource="tabList" @handle="switchTab"></uni-tab>
		 <view class="content">
			 <order-list :goodsList="goodsList"  :orderStatus="orderStatus"></order-list>
		 </view>
	</view>
</template>

<script>
	import UniTab from '@/components/uni-tab/uni-tab.vue'
	import OrderList from '@/components/order-list/order-list.vue'
	export default {
		name: 'order',
		components: { UniTab,OrderList },
		data() {
			return {
				tabList: [
					{text: '拼团信息'},
					{text: '代付款'},
					{text: '待收货'},
					{text: '已完成'}
				],
				goodsList:[
					{
						url:'././',
						name:'商品名1商品名1商品名1商品名1商品名1商品名1商品名1商品名1',
						price:'8000.00',
						status:['拼团中'] , // 0代表
						orderCode:'00001',
						timer:'2020-2-2 10:30:30',
						count:1
						
					},
					{
						url:'././',
						name:'商品名1',
						price:'8000.00',
						status:['兑换积分','提货'] , // 0代表
						orderCode:'00001',
						timer:'2020-2-2 10:30:30'
						
					}
				],
				orderStatus:{
					text:'拼团信息',
					index:0
				}
			}
			
		},
		computed:{
		},
		methods:{
			switchTab(data){
				console.log(data)
				this.orderStatus = data
			}
		}
	}
</script>

<style lang="scss">

</style>
