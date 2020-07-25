<template>
	<view class="_dd-i">
		<view class="_mz-i">
			<!-- <text class="shop-name">{{ data.shopName }}</text> -->
			<text class="_or-n" v-if="data.ddh">订单编号：{{ data.ddh }}</text>
		</view>
		<view class="_sp-b">
			<view v-for="(item, index) in data.sdSpList" :key="index" class="good-item">
				<view class="tttp"><img :src="pk(item.pic)" alt="item.pic" /></view>
				<view class="_spxxx">
					<view>
						<text class="name">
							<text>{{ item.spname }}</text>
							×
							<text>{{ item.spsl }}</text>
						</text>
						<text class="fk" v-if="data.ddzt == 1 || data.ddzt == 3 || data.ddzt == 4">
							已付款：
							<text class="amount">{{ jr(data.ddje) }}</text>
						</text>
						<text class="fk" v-else-if="data.ddzt == 0">
							待付款：
							<text class="amount">{{ jr(data.ddje) }}</text>
						</text>
                        <text class="fk" v-else-if="data.ddzt == 0">
							 价格：
							<text class="amount">{{ jr(data.ddje) }}</text>
						</text>
					</view>
					<view class="btns" v-if="data.ddzt == 7">
						<a class="grey button">已取消</a>
						<a class="orange button">再次购买</a>
					</view>
					<view class="btns" v-else-if="data.ddzt == 1">
						<a class="orange button">查看物流</a>
						<a class="orange button">再次购买</a>
					</view>
					<view class="btns" v-else-if="data.ddzt == 3">
						<a class="orange button" @click="pj">评价</a>
						<a class="orange button">再次购买</a>
					</view>
					<view class="btns" v-else-if="data.ddzt == 4">
						<a class="orange button">查看物流</a>
						<a class="orange button">查看发票</a>
						<a class="orange button">再次购买</a>
					</view>
				</view>
			</view>
            <!-- 待付款 -->
            <view class="btns unpay" v-if="data.ddzt == 0">
                <p class="total">商品金额：<text class="amount _or">{{data.ddje}}</text></p>
                <p class="total">优惠金额：<text class="amount _or">{{data.yhje || 0}}</text></p>
                <p class="total">合计：<text class="amount _or">{{data.ddje - data.yhje || 0}}</text></p>
                <a class="grey button">待付款</a>
                <a class="orange button" @click="co">取消</a>
                <a class="orange button" @click="po">付款</a>
            </view>
		</view>
		<uni-popup v-if="data.ddzt == 3" :show="show" type="center" :custom="true" :mask-click="false" @change="change">
			<view class="uni-tip">
				<view class="uni-tip-title">
					我们是
					<text class="_or">唯一一家只让发差评</text>
					的电商
				</view>
				<view class="uni-tip-content"><textarea v-model="evaluateText" /></view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="can">取消</view>
					<view class="uni-tip-button" @click="can">确定</view>
				</view>
			</view>
		</uni-popup>

        <uni-popup v-if="data.ddzt == 0" :show="show" type="center" :custom="true" :mask-click="false" @change="change">
			<view class="uni-tip">
				<view class="uni-tip-title">提示</view>
				<view class="uni-tip-content">
                    还未付款！<text class="_or">果果好伤心！</text>确定要取消吗？
                </view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="can">残忍取消</view>
					<view class="uni-tip-button" @click="can">考虑下下</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '../uni-popup/uni-popup';
import uniIcon from '@/components/uni-icon/uni-icon.vue';
// 头部logo
export default {
	name: 'OrderItem',
	components: { uniPopup, uniIcon },
	props: {
		data: {
			type: Object
		}
	},
	computed: {
		jr() {
			return function(num) {
				return num.toFixed(2);
			};
        }
	},
	data() {
		return {
			show: false,
			evaluateText: ''
		};
	},
	created() {
		this.$_log('订单数据:',this.data);
	},
	methods: {
		change() {},
		can() {
			this.show = false;
		},
		pj() {
			this.show = true;
        },
		pk(url) {
			return this.$request.BASE_URL + url;
		},
        co() {
            this.show = true;
        },
        po() {
            this.gl("/pages/money/pay");
        },
        gl(url) {
             uni.navigateTo({
				url: url
			});
        }
	}
};
</script>

<style lang="scss" scoped>
._dd-i {
	background: #fff;
	padding: 20rpx;
	box-shadow: 2rpx 0 10rpx 2rpx #ccc;
	._mz-i {
		&::after{
			content: "";
			display: block;
			overflow: hidden;
			clear: both;
		}
		._or-n {
			float: right;
			right: 0;
			font-size: $font-base;
		}
	}
	._sp-b {
		.good-item {
			display: flex;
			.tttp {
				img {
					width: 170rpx;
					height: 90rpx;
					border: 2rpx solid #eee;
					border-radius: 5rpx;
				}
			}
			._spxxx {
				font-size: $font-sm;
				flex: 1;
				text-align: right;
				.name {
					margin-right: 50rpx;
				}
				.amount {
					&::before {
						content: '￥';
					}
				}
			}
		}
        .btns {
            &.unpay {
                float: right;
                .total{
                    text-align: right;
                    margin-bottom: 15rpx;
                }
                .amount {
                    font: $font-base;
					&::before {
						content: '￥';
					}
				}
            }
            font-size: $font-sm;
            margin-top: 10rpx;
            .button {
                margin-right: 5rpx;
                font-size: $font-sm;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
        &::after{
            content:"";
            display: block;
            clear: both;
        }
	}
}
._or {
	color: orange;
}

/* 提示窗口 */
.uni-tip {
	padding: 15px;
	width: 300px;
	background: #fff;
	box-sizing: border-box;
	border-radius: 10px;
}

.uni-tip-title {
	text-align: center;
	font-weight: bold;
	font-size: 16px;
	color: #333;
}

.uni-tip-content {
	padding: 15px;
	font-size: 14px;
	color: #666;
}

.uni-tip-group-button {
	margin-top: 10px;
	display: flex;
}

.uni-tip-button {
	width: 100%;
	text-align: center;
	font-size: 14px;
	color: #3b4144;
}
</style>
