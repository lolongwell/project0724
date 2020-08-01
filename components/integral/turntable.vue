<template>
	<div class="wrapper">
		<div class="box-lottery">
			<div ref="boxLottery" class="box" :style="{'transform' : rollging ? 'rotate('+ rotateAngle +'deg)' : 'rotate('+ randomAngle +'deg)', 'transition' : rollging ? 'all 5s' : 'none'}">
				<div v-for="(item, index) in list" :key="index" :style="{'transform' : 'rotate('+ ((360 / list.length * index) + (360 / list.length / 2)) + 'deg)'}">
					<span>{{ item.name }}</span>
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
	</div>
</template>
<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				rotateAngle: 0, // 旋转的角度
				roundNum: 2, // 转的圈数
				randomAngle: 0, // 随机产生一个角度
				rollging: false,
				jp: '',
				list: [{
						name: 'iphone',
						id: 1

					},
					{
						name: 'ipad',
						id: 2
					},
					{
						name: '很遗憾，未中奖',
						id: 3
					},
					{
						name: '华为',
						id: 4
					},
					{
						name: '很遗憾，未中奖',
						id: 5
					},
					{
						name: '积分100',
						id: 6
					},
					{
						name: '再来一次',
						id: 7
					},
					{
						name: '积分10000',
						id: 8
					}
				]
			}
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {
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
			// 旋转
			rotate() {
				// 1.如果在转，就不需要执行
				if (this.rollging) return
				this.rollging = true
				// 2.随机产生一个角度
				this.randomAngle = Math.floor(Math.random() * 360)
				// 3.需要转的角度
				this.rotateAngle = this.randomAngle + this.roundNum * 360
			},
			lotteryEnd(angle) {
				if (angle > 0 && angle < 45) {
					console.log(this.list[7])
				
				} else if (angle > 45 && angle <= 90) {
					console.log(this.list[6])
					
				} else if (angle > 90 && angle <= 135) {
					console.log(this.list[5])
					
				} else if (angle > 135 && angle <= 180) {
					console.log(this.list[4])
					
				} else if (angle > 180 && angle <= 225) {
					console.log(this.list[3])
					
				} else if (angle > 225 && angle <= 270) {
					console.log(this.list[2])
					
				} else if (angle > 270 && angle <= 315) {
					console.log(this.list[1])
					
				} else if (angle > 315 && angle <= 360) {
					console.log(this.list[0])
				}
				
				
				uni.showToast({
					title:  '很遗憾，未中奖',
					duration: 3000
				});
			
			}
		},
		filters: {}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		width: 500rpx;
		height: 500rpx;
		margin: 10rpx auto;

		.box-lottery {
			position: relative;
			width: 100%;
			height: 100%;

			.box {
				width: 100%;
				height: 100%;
				background: #fb3;
				position: relative;
				border-radius: 50%;
				overflow: hidden;
				display: flex;
				justify-content: center;
				// background: url(../../../assets/img/bg_lottery_f.png) center no-repeat;
				background: url(../../static/images/bg_lottery_f.png) center no-repeat;

				>div {
					box-sizing: border-box;
					position: absolute;
					top: 0;
					width: 200rpx;
					padding-top: 20rpx;
					height: 50%;
					// border: 1px solid red;
					transform-origin: center bottom;
					text-align: center;
					font-size: 20rpx;
					color: #000;
				}
			}

			.lottery-btn {
				width: 161px;
				height: 161px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				cursor: pointer;

				i {
					position: absolute;
					left: 50%;
					transform: translate(-50%, -90%);
					width: 40px;
					height: 40px;
					// background: url(../../../assets/img/icon_point.png) center no-repeat;
					background: url(../../static/images/icon_point.png) center no-repeat;
					;
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
				}
			}
		}
	}
</style>
