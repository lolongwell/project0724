<template>
	<view class="wallet-box">
		<ul>
			<li>余额</li>
			<li>{{balance}}</li>
		</ul>
	</view>
</template>

<script>
	export default {
		name: '',
		props: {
			kmc: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				userMsg: {},
				phone: '',
				enterName: '',
				authCode: ''
			};
		},

		mounted() {

		},
		computed: {
			balance() {
				return this.$store.state.balance
			}
		},
		methods: {}

	};
</script>

<style lang="scss" scoped>
	.wallet-box {
		width: 100%;
		height: 400rpx;
		background: $my-color;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: $font-base + 10rpx;

		ul {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			li {
				&:nth-last-of-type(1) {
					font-size: $font-base + 30rpx;
				}
			}
		}
	}
</style>
