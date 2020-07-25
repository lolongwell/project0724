<template>
    <view>
        <view class="_title">
            <view class="_text">
                <text class="_letter" :style="{ color: color }" v-for="d in arr">{{ d }}</text>
            </view>
            <text class="_more" v-if="more" @click="lk">更多</text>
        </view>
        <view v-if="subTitle != ''" class="_sub-title">
            <text>{{subTitle}}</text>
        </view>
    </view>
	
</template>

<script>
// 头部logo
export default {
	name: 'TitleCommon',
	props: {
		title: {
			type: String,
			default: ''
        },
        subTitle:{
            type: String,
            default: ''
        },
		color: {
			type: String,
			default: '#5a961e'
		},
		url: {
			type: String
        },
        more: {
            type: Boolean,
            default: false
        }
	},
	data() {
		return {};
	},
	computed: {
		arr() {
			let ta = this.title.split('');
			return ta;
		}
	},
	methods: {
        lk(){
            uni.navigateTo({
				url: this.url
			});
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin titleLine() {
	content: '';
	width: 70rpx;
	height: 1px;
	display: inline-block;
	background-color: $fz-color-base;
	position: relative;
	top: -16rpx;
}
@mixin titleCircle() {
	content: '';
	width: 14rpx;
	height: 14rpx;
	display: inline-block;
	box-sizing: border-box;
	border-radius: 50%;
	border: 1px solid $fz-color-base;
	position: relative;
	top: 20rpx;
}
._title {
	font-size: $font-title;
	font-weight: normal;
	display: flex;
    justify-content: center;
    position: relative;
	&::before {
		@include titleCircle();
	}
	&::after {
		@include titleCircle();
	}
	> ._text {
		> ._letter {
			border-left: 1px solid $fz-color-base;
			padding: 0 20rpx;
			&:last-child {
				border-right: 1px solid $fz-color-base;
			}
		}
		&::before {
			@include titleLine();
		}
		&::after {
			@include titleLine();
		}
    }
    ._more{
        font-size: $font-sm - 2;
        position: absolute;
        right: 20rpx;
        top: 10rpx;
        color: $fz-color-base;
        &::after{
            content:">>";
            color: $fz-color-base;
        }
    }
}
._sub-title{
    text-align: center;
    font-size: $font-sm;
    color: #505050;
}

</style>
