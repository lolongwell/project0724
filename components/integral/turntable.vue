<template>
	<div class="wrapper">
		<div class="box-lottery">
			<div ref="boxLottery" class="box" :style="{'transform' : rollging ? 'rotate('+ rotateAngle +'deg)' : 'rotate('+ randomAngle +'deg)', 'transition' : rollging ? 'all 5s' : 'none'}">
				<div v-for="(item, index) in list" :key="index" :style="{'transform' : 'rotate('+ ((360 / list.length * index) + (360 / list.length / 2)) + 'deg)'}">
					<span>{{ item.spmc }}</span>
					<!-- <img :src="></img> -->
				</div>
				<!-- <div></div>
	        <div style="transform:rotate(45deg)"></div>
	        <div style="transform:rotate(90deg)"></div>
	        <div style="transform:rotate(135deg)"></div>
	        <div style="transform:rotate(180deg)"></div>
	        <div style="transform:rotate(225deg)"></div>
	        <div style="transform:rotate(270deg)"></div>
	        <div style="transform:rotate(315deg)"></div> -->
			</div>
			<div class="lottery-btn" @click="rotate">
				<i></i>
			</div>
		</div>
		<div class="text">
			<span>*</span>
			每参与一次消耗100积分！
		</div>
		<div v-show="isGood" class="layer-box">
			请选择收货地址：
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker mode="selector" @change="addressChange" :value="index" :range="address" placeholder="请选择收货地址">
							<view class="uni-input">{{address[index]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<button @click="cancelHandle">取消</button>
			<button @click="commitHandle">确定</button>
		</div>
	</div>
</template>
<script>
	import productAPI from "@/api/product/product.js";
	import orderAPI from "@/api/order/order.js"
	import userAPI from "../../api/user/user";
	export default {
		components: {},
		props: {},
		data() {
			return {
				rotateAngle: 0, // 旋转的角度
				roundNum: 2, // 转的圈数
				randomAngle: 0, // 随机产生一个角度
				rollging: false,
				// integral: uni.getStorageSync('hyjf'),
				jf: 120,
				list: [

				],
				zjsp: '',
				zjspList: {},
				isGood: false,
				index: 0,
				address: ['请选择收货地址'],
				addressId:''
			}
		},
		computed: {
			integral() {

				return this.$store.state.integral
			}
		},
		watch: {},
		created() {},
		mounted() {
			this.getList()
			this.getAdress()
			this.$refs['boxLottery'].addEventListener('transitionend', () => {
				this.rollging = false
				this.$refs['boxLottery'].style.transform = 'rotate(' + this.randomAngle + 'deg)'
				this.lotteryEnd(this.randomAngle)
			})

		},
		activated() {},
		deactivated() {},
		updated() {},
		destroyed() {},
		methods: {
			getList() {
				let o = {
					jfspfl: 2
				}
				productAPI.integralList(o).then(res => {
					this.list = res.data.obj.results
				})
			},
			addressChange(e) {
				this.index = e.target.value;
				this.addressId = this.addressList[this.index - 1].id;
			},
			getAdress() {
				let id = uni.getStorageSync('userid');
				let o = {
					userId: id
				};
				orderAPI.getAddressList(o).then((res) => {
					this.addressList = res.data.obj.results;
					this.addressList.forEach((item) => {
						this.address.push(item.address + item.detail);
					});
					if(this.addressList.length === 0){
						uni.showToast({
							title: '请去我的管理地址中添加收货地址',
							duration: 4000
						});
					}
				});
			},
			// 旋转
			rotate() {
				// 判断分数是否够
				if (this.integral < 100) {
					uni.showToast({
						title: '您的积分不足',
						duration: 3000
					});
					return
				}
				// 1.如果在转，就不需要执行
				if (this.rollging) return
				this.rollging = true
				// 2.随机产生一个角度
				this.randomAngle = Math.floor(Math.random() * 360)
				// 3.需要转的角度
				this.rotateAngle = this.randomAngle + this.roundNum * 360
				// 4.更新积分
				// 更新积分
				let o = {
					userId: uni.getStorageSync('userid'),
				}
				userAPI.updateJfByUser(o).then((res) => {
					uni.setStorageSync('hyjf', res.data.data.hyjf)
					this.$store.commit('integralUpdate',res.data.data.hyjf)
					this.$emit('updateIntegral', res.data.data.hyjf)
				})
			},
			commitHandle() {
				
				if(this.addressId === ''){
				   uni.showToast({
				   	title: `请选择收货地址`,
				   	duration: 1000
				   })
				   return
				}
				// 提交
				let o = {
					userId: uni.getStorageSync('userid'),
					zpspfl: '1',
					jfspId: this.zjspList.id,
					zffs: 'cjdh',
					addressId: this.addressId
				}
				orderAPI.createZPOrder(o).then(res => {
					uni.showToast({
						title: `订单完成`,
						duration: 1000
					});
					this.isGood = false
				
			
			
				})
			},
			commitHandle() {
				
				if(this.addressId === ''){
				   uni.showToast({
				   	title: `请选择收货地址`,
				   	duration: 1000
				   })
				   return
				}
				// 提交
				let o = {
					userId: uni.getStorageSync('userid'),
					zpspfl: '1',
					jfspId: this.zjspList.id,
					zffs: 'cjdh',
					addressId: this.addressId
				}
				orderAPI.createZPOrder(o).then(res => {
					uni.showToast({
						title: `订单完成`,
						duration: 1000
					});
					this.isGood = false
				
			
			
				})
			},
			cancelHandle(){

			     this.isGood = false	
			},
			lotteryEnd(angle) {
				if (angle > 0 && angle < 45) {
					this.spmc = this.list[7].spmc
					this.zjspList = this.list[7]
				} else if (angle > 45 && angle <= 90) {
					this.spmc = this.list[6].spmc
					this.zjspList = this.list[6]
				} else if (angle > 90 && angle <= 135) {
					this.spmc = this.list[5].spmc
					this.zjspList = this.list[5]

				} else if (angle > 135 && angle <= 180) {
					this.spmc = this.list[4].spmc
					this.zjspList = this.list[4]

				} else if (angle > 180 && angle <= 225) {
					this.spmc = this.list[3].spmc
					this.zjspList = this.list[3]

				} else if (angle > 225 && angle <= 270) {
					this.spmc = this.list[2].spmc
					this.zjspList = this.list[2]

				} else if (angle > 270 && angle <= 315) {
					this.spmc = this.list[1].spmc
					this.zjspList = this.list[1]

				} else if (angle > 315 && angle <= 360) {
					this.spmc = this.list[0].spmc
					this.zjspList = this.list[0]
				}
				// 判断商品类型
				console.log('this.zjspList',this.zjspList)
				console.log('this.zjspList',this.zjspList.zpspfl)
				// 未中奖
				if (this.zjspList.zpspfl === '0') {
					// 提示
					uni.showToast({
						title: this.zjspList.spmc,
						duration: 1000
					});

				} else if (this.zjspList.zpspfl === '1') {
					uni.showToast({
						title: `恭喜您，喜中${this.zjspList.spmc}！`,
						duration: 1000
					});
				
						this.isGood = true
					
				


				} else {
					uni.showToast({
						title: `恭喜您，喜中${this.zjspList.spjf}积分！`,
						duration: 1000
					});
					// 更新积分
					let o = {
						userId: uni.getStorageSync('userid'),
						zpspfl: '2',
						jfspId: this.zjspList.id
					}
					userAPI.updateJfByUser(o).then((res) => {
						console.log('更新积分', res)
						uni.setStorageSync('hyjf', res.data.data.hyjf)
						this.$store.commit('integralUpdate',res.data.data.hyjf)
						this.$emit('updateIntegral', res.data.data.hyjf)
					})
				}

			}

		},
	
		filters: {}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		width: 500rpx;
		height: 500rpx;
		margin: 30rpx auto;

		.box-lottery {
			position: relative;
			width: 100%;
			height: 100%;

			.box {
				width: 100%;
				height: 100%;
				// background: #fb3;
				position: relative;
				border-radius: 50%;
				overflow: hidden;
				display: flex;
				justify-content: center;
				// background: url(../../../assets/img/bg_lottery_f.png) center no-repeat;
				background: url(../../static/images/bg_lottery_f.png) center no-repeat;
				background-size: cover;

				>div {
					box-sizing: border-box;
					position: absolute;
					top: 0;
					width: 200rpx;
					padding-top: 40rpx;
					height: 50%;
					// border: 1px solid red;
					transform-origin: center bottom;
					text-align: center;
					font-size: 20rpx;
					color: #000;
				}
			}

			.lottery-btn {
				width: 150rpx;
				height: 150rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				cursor: pointer;

				i {
					position: absolute;
					left: 50%;
					transform: translate(-50%, -90%);
					width: 25px;
					height: 25px;
					// background: url(../../../assets/img/icon_point.png) center no-repeat;
					background: url(../../static/images/icon_point.png) center no-repeat;
					background-size: cover;

				}

				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					// background: url(../../../assets/img/btn_lottery.png) center no-repeat;
					background: url(../../static/images/btn_lottery.png) center no-repeat;
					background-size: cover;
				}
			}
		}

		.text {
			text-align: center;
			margin-top: 20rpx;
			font-size: 20rpx;

			span {
				// font-size: $font-base - 15rpx;
				color: red;
			}
		}

		.layer-box {
			width: 80%;
			height: 20%;
			// border: 1px solid red;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;
			opacity: 1;
			font-size: $font-base + 10rpx;
             
			button {
				width: 20%;
                margin-top: 30rpx;
				display: inline-block;
			}
			
		}

		.mb-box {
			width: 100%;
			height: 100%;
			// background: #555555;
		}
	}
</style>
