<template>
	<view>
		<uni-tab :dataSource="tabList"></uni-tab>
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
						text: '待付款'
					},
					{
						text: '待收货'
					},
					{
						text: '已完成'
					}
				],
				goodsList: [
					// {
					// 	url: '../../static/images/default.png',
					// 	spmc: '商品名1商品名1商品名1商品名1商品名1商品名1商品名1商品名1',
					// 	spdj: '8000.00',
					// 	ddh: '00001',
					// 	fktime: '2020-2-2 10:30:30',
					// 	spsl: 1,
					// 	wczt: 0

					// },
					// {
					// 	url: '../../static/images/default.png',
					// 	spmc: '商品名1',
					// 	spdj: '8000.00',
					// 	ddh: '00001',
					// 	fktime: '2020-2-2 10:30:30',
					// 	wczt: 0
					// },
					// {
					// 	url: '../../static/images/default.png',
					// 	spmc: '商品名1',
					// 	spdj: '8000.00',
					// 	ddh: '00001',
					// 	fktime: '2020-2-2 10:30:30',
					// 	wczt: 0
					// }
				],
				goodsList1: [
					// {
					// 	url: '../../static/images/default.png',
					// 	spmc: '商品名1商品名1商品名1商品名1商品名1商品名1商品名1商品名1',
					// 	spdj: '8000.00',
					// 	ddh: '00001',
					// 	fktime: '2020-2-2 10:30:30',
					// 	spsl: 1,
					// 	wczt: 0

					// },
					// {
					// 	url: '../../static/images/default.png',
					// 	spmc: '商品名1',
					// 	spdj: '8000.00',
					// 	ddh: '00001',
					// 	fktime: '2020-2-2 10:30:30',
					// 	wczt: 0
					// },
					// {
					// 	url: '../../static/images/default.png',
					// 	spmc: '商品名1',
					// 	spdj: '8000.00',
					// 	ddh: '00001',
					// 	fktime: '2020-2-2 10:30:30',
					// 	wczt: 0
					// }
				],
				goodsList2: [],
				goodsList3: [
				// 	{
				// 	url: '../../static/images/default.png',
				// 	spmc: '商品名1',
				// 	spdj: '8000.00',
				// 	ddh: '00001',
				// 	fktime: '2020-2-2 10:30:30',
				// 	wczt: 2,

				// 	// zjzt: 1 // 1提货 2兑换积分
				// },
				],
				goodsList4: [
					// {
					// 	url: '../../static/images/default.png',
					// 	spmc: '商品名1商品名1商品名1商品名1商品名1商品名1商品名1商品名1',
					// 	spdj: '8000.00',
					// 	ddh: '00001',
					// 	fktime: '2020-2-2 10:30:30',
					// 	spsl: 1,
					// 	wczt: 3,
					// 	flmx: '',
					// 	thfs: 1,
					// 	zjzt: 1 // 1提货 2兑换积分

					// },
					// {
					// 	url: '../../static/images/default.png',
					// 	spmc: '商品名1',
					// 	spdj: '8000.00',
					// 	ddh: '00001',
					// 	fktime: '2020-2-2 10:30:30',
					// 	wczt: 3,
					// 	thfs: 2,
					// 	flmx: ''
					// },
					// {
					// 	url: '../../static/images/default.png',
					// 	spmc: '商品名1',
					// 	spdj: '8000.00',
					// 	ddh: '00001',
					// 	fktime: '2020-2-2 10:30:30',
					// 	wczt: 3,
					// 	flmx: '194 + 95.00'
					// }
				],
				cureentStatus: 0 // 默认订单状态为拼团信息
			}

		},
		onload() {


		},
		watch: {
			// 全局订单状态-状态改变了根据状态发送请求请求数据
			orderStatus(val) {
				console.log('订单状态改变了', val)
				// 根据状态请求数据
				if (this.orderStatus === 0) {
					this.goodsList = this.goodsList1
				} else if (this.orderStatus === 1) {
					this.goodsList = this.goodsList2
				} else if (this.orderStatus === 2) {
					this.goodsList = this.goodsList3
				} else {
					this.goodsList = this.goodsList4
				}
				this.cureentStatus = this.orderStatus.index
				this.getList()

			}
		},
		mounted() {


			this.getList()
			//测试
			this.$store.commit('orderListUpdate', this.goodsList)


		},
		computed: {
			orderStatus() {
				return this.$store.state.orderStatus
			}
		},
		methods: {



			getList() {
				// 1.判断是否登录，没有登录就跳进登录页面

				// 2.获取当前需要的订单入参
				let id = uni.getStorageSync('userid') // 拿到用户信息，从里面拿用户id
				let orderData = {
					userId: id, //用户id
					wczt: this.orderStatus // 点击的是哪一种状态
				}
				//3.发送请求
				orderAPI.orderList(orderData).then(res => {
					if (res.statusCode === 200) {
						this.goodsList = res.data.obj.results
						//4.更新全局orderList
						this.goodsList.sort(function(a,b){
							return a.wcsj < b.wcsj ? 1 : -1
						})
						this.$store.commit('orderListUpdate', this.goodsList)
					}
					// 积分订单
					if (this.orderStatus == 3) {
						let o = {
							userId: id,
							// zffs: 'jfdh',
							wczt: '3'
						}
						orderAPI.jfspOrderList(o).then(res => {
							if (res.statusCode == 200) {
								let jfList = res.data.obj.results
								this.goodsList = this.goodsList.concat(jfList)
								this.goodsList.sort(function(a,b){
									return a.wcsj < b.wcsj ? 1 : -1
								})
								this.$store.commit('orderListUpdate', this.goodsList)
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
