<template>
	<view class="_p-l">
        <view class="_p-i" @click="goDetail(o)" v-for="(o,$index) in dataList" :key="$index">
			<view class="_concc">
				<view class="_pic">
				    <image :src="o.pic" mode="aspectFill" :alt="o.describe">
				</view>
				<view class="_fi">
				    <view class="title">{{o.title}}</view>
				    <view class="describe">{{o.describe || o.title}}</view>
				    <view class="price">
				        <text class="num">{{o.price}}</text><text class="unit">{{o.unit}}</text><text class="sell-num">{{ totalXl(o) }}人付款</text>
				        <span :key="index" class="label" v-for="(l,index) in label(o)">{{l}}</span>
				    </view>
					<span class="more wkicon icon-more"></span>
				</view>
			</view>
        </view>
    </view>
</template>

<script>
import ProductAPI from '../../api/product/product';
// 头部logo
export default {
	name: 'ProductList',
	props: {
		data: {
			type: Array
        },
        typeId: {
            type: String
        },
		max: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
            listData: []
        };
    },
    computed: {
        label(){
            return function(data){
                let labels = [];
                if(data){
                    if(data.labels)
                        labels = data.label.split(",");
                    else labels = []; 
                }
                if(labels.length > 2){
                    labels.splice(2);
                }
                return labels;
            }
        },
		dataList(){
			if(this.max == 0) return this.listData;
			else {
				let arr = this.listData.slice(0,this.max);
				return arr;
			}
        },
        totalXl(){
            return function(o){
                let xl=0,xssl = 0;
                if(o.xl) xl = o.xl;
                if(o.xssl) xssl = o.xssl; 
                return parseInt(xl) + parseInt(xssl);
            }
        }
    },
    watch: {
        data: {
			handler: function(val) {
                console.log(val)
				if (val.length) {
					this.listData = val;
				}
            },
            deep:true
		}
    },
    mounted() {
        if(this.data.length) {
            this.listData = this.data;
        }else {
            if(this.typeId) this.sj();
        }
    },
	methods: {
        goDetail(o) {
			let url = `/pages/detail/detail?id=${o.id}`;
			if(o.hideSource) url+='&source=1';
            uni.navigateTo({
				url: url
			});
        },
        sj() {
            ProductAPI.productList({ spfl: this.typeId }).then(res => {
                let data = res.data.obj.results;
                this.$emit('showOrHide',data)
				this.setD(data, 'listData');
			});
        },
		setD(data, listName) {
			data.forEach(v => {
				let o = Object.assign(v, {
					id: v.id,
					title: v.name,
					price: v.price,
					label: v.gs,
					pic: this.gP(v.pic),
					unit: '',
					describe: v.gs
				});
				this[listName].push(o);
			});
        },
		gP(url) {
			if (url.indexOf('http') > -1) return url;
			return this.$request.BASE_URL + url;
		}
    }
};
</script>

<style lang="scss" scoped>
._p-l {
    text-align: left;
    width: 100%;
    overflow: hidden;
	padding: 0 10rpx;
	._p-i {
        float: left;
		width: 50%;
		height: 280rpx;
		padding: 0 10rpx;
		margin-bottom: 20rpx;
        ._concc {
			background: #fff;
			width: 100%;
			overflow: hidden;
			border-radius: 15rpx;
			padding-bottom: 10rpx;
			box-shadow: 0 3px 3px -3px #ccc;
			> ._pic {
			    margin: 0 auto;
			    width: 100%;
			    height: 170rpx;
				overflow: hidden;
			    image {
			        width: 100%;
			        height: 100%;
			    }
			}
			
			> ._fi{
			    box-sizing: border-box;
				position: relative;
			    padding: 0 20rpx;
			    .title{
					width: 100%;
			        font-size: $font-base;
			        color: $black-color;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
			    }
			    .describe{
			        font-size: $font-sm;
			        color: $black-color;
			        text-overflow: ellipsis;
			        overflow: hidden;				
					white-space: nowrap;
					color: $font-color-light;
			    }
			    .price{
			        font-size: $font-sm;
			        &::before{
			            content: "￥";
			            font-size: $font-sm;
						color: $base-red;
			        }
			        .num{
			            color: $base-red;
			            font-size: $font-sm;
			            font-weight: bold;
			            margin: 0 5rpx;
			        }
			        .label{
			            background-color: #5a961e;
			            color: #fff;
			            padding: 2rpx 10rpx;
			            border-radius: 4rpx;
			            margin-right: 2rpx;
			        }
			    }
                .sell-num {
                    margin-left: 20rpx;
                    color: #909399;
                }
				
				.more{
					position: absolute;
					bottom: 0;
					right: 20rpx;
					color: $font-color-light;
					font-size: $font-sm;
				}
			}
		}
	}
}
</style>
