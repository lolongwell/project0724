<template>
	<view>
		<uni-tab :dataSource="tabList" @handle="switchTab"></uni-tab>
		<view class="content">
			<order-list :goodsList="goodsList"></order-list>
		</view>
	</view>
</template>

<script>
	import UniTab from '@/components/uni-tab/uni-tab.vue'
	import orderAPI from '@/api/order/order.js'
	import OrderList from '@/components/order-list/order-list.vue'
	export default {
		spmc: 'order',
		components: {
			UniTab,
			OrderList
		},
		data() {
			return {
				tabList: [{
						text: '拼团信息'
					},
					{
						text: '代付款'
					},
					{
						text: '待收货'
					},
					{
						text: '已完成'
					}
				],
				goodsList: [{
						url: '../../static/images/default.png',
						spmc: '商品名1商品名1商品名1商品名1商品名1商品名1商品名1商品名1',
						spdj: '8000.00',
						ddh: '00001',
						fktime: '2020-2-2 10:30:30',
						spsl: 1,
						wczt: 0

					},
					{
						url: '../../static/images/default.png',
						spmc: '商品名1',
						spdj: '8000.00',
						ddh: '00001',
						fktime: '2020-2-2 10:30:30',
						wczt: 0
					},
					{
						url: '../../static/images/default.png',
						spmc: '商品名1',
						spdj: '8000.00',
						ddh: '00001',
						fktime: '2020-2-2 10:30:30',
						wczt: 0
					}
				],
				goodsList1: [{
						url: '../../static/images/default.png',
						spmc: '商品名1商品名1商品名1商品名1商品名1商品名1商品名1商品名1',
						spdj: '8000.00',
						ddh: '00001',
						fktime: '2020-2-2 10:30:30',
						spsl: 1,
						wczt: 0

					},
					{
						url: '../../static/images/default.png',
						spmc: '商品名1',
						spdj: '8000.00',
						ddh: '00001',
						fktime: '2020-2-2 10:30:30',
						wczt: 0
					},
					{
						url: '../../static/images/default.png',
						spmc: '商品名1',
						spdj: '8000.00',
						ddh: '00001',
						fktime: '2020-2-2 10:30:30',
						wczt: 0
					}
				],
				goodsList2: [

				],
				goodsList3: [{
					url: '../../static/images/default.png',
					spmc: '商品名1',
					spdj: '8000.00',
					ddh: '00001',
					fktime: '2020-2-2 10:30:30',
					wczt: 2,
					zjzt:1   // 1提货 2兑换积分
				}],
				goodsList4: [{
						url: '../../static/images/default.png',
						spmc: '商品名1商品名1商品名1商品名1商品名1商品名1商品名1商品名1',
						spdj: '8000.00',
						ddh: '00001',
						fktime: '2020-2-2 10:30:30',
						spsl: 1,
						wczt: 3,
						flmx:'￥194 + 93.00',
						zjzt:1   // 1提货 2兑换积分

					},
					{
						url: '../../static/images/default.png',
						spmc: '商品名1',
						spdj: '8000.00',
						ddh: '00001',
						fktime: '2020-2-2 10:30:30',
						wczt: 3,
						flmx:'￥194 + 93.00'
					}
				],
				cureentStatus:0
			}

		},
		onload() {


		},
		mounted() {
			this.getList()
		},
		computed: {},
		methods: {
			//在组件uni-tab传递的点击的订单状态信息
			switchTab(data) {
				// 根据状态请求数据
				if (data.index === 0) {
					this.goodsList = this.goodsList1
				} else if (data.index === 1) {
					this.goodsList = this.goodsList2
				} else if (data.index === 2) {
					this.goodsList = this.goodsList3
				} else {
					this.goodsList = this.goodsList4
				}
				
				this.cureentStatus = data.index

			},

			getList() {
				console.log(111)
				let id = uni.getStorageSync('user').userId // 拿到用户信息，从里面拿用户id
				let orderData = {
					userId: '2c93c2aa6eb0d56e016eb133a0be004f', //用户id
					wczt: this.cureentStatus // 点击的是哪一种状态
				}
				orderAPI.orderList(orderData).then(res => {
					console.log('y')
					// this.goodsList = res.list
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
