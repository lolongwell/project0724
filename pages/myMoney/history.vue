<template>
  <view class="history-box">
    <uni-tab :dataSource="tabList" @handle='switchTab'></uni-tab>
    <view class="item" v-for="(item, index) in activeList" :key="index">
      <view class="left">
        <view class="title">
          {{ item.remark }}
        </view>
        <view class="timer">
          {{ item.clsj }}     
        </view>
      </view>
      <view class="right" :class="{ isMoreMoney: item.zjjjfs === '+' }">
       {{item.zjjjfs}}{{ item.clje }}
      </view>
    </view>
  </view>
</template>

<script>
import userAPI from "@/api/user/user.js";
import UniTab from '@/components/uni-tab/uni-tab.vue'
export default {
  data() {
    return {
      historyList: [[],[],[]],
      activeList: [],
      tabList: [{
          text: '商品'
        },
        {
          text: '充值'
        },
        {
          text: '提现'
        }
      ]
    };
  },
  onShow() {
    this.getList();
  },
  methods: {
    getList() {
			let userId = uni.getStorageSync('userid')
      userAPI.getMoneyList(userId).then((res) => {
        console.log('资金记录', res)
				if (res.data.success) {
					if (res.data.obj) {
            let data = res.data.obj.results
						this.activeList = data.filter(v => v.zjclfs != 1 && v.zjclfs != 2 )
						this.historyList[0] = data.filter(v => v.zjclfs != 1 && v.zjclfs != 2 )
						this.historyList[1] = data.filter(v => v.zjclfs == 1 )
						this.historyList[2] = data.filter(v => v.zjclfs == 2 )
					}
				}
			});
    },
    switchTab(val) {
      this.activeList = this.historyList[val.index]
    }
  },
};
</script>

<style lang="scss" scoped>
.history-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .item {
    display: flex;
    padding: 0 $page-row-spacing;
    margin: 10rpx;
    background-color: #fff;
    box-shadow: 0 0 10rpx 2rpx #999;

    &:nth-of-type(1) {
      margin-top: 20rpx;
    }

    .left {
      flex: 7;
      display: flex;
      flex-direction: column;

      .title {
        flex: 3;
        font-size: 30rpx;
        color: #000;
        flex-wrap: wrap;
      }

      .timer {
        flex: 1;
        color: #999;
        font-size: 20rpx;
      }
    }

    .right {
      flex: 2;
      color: green;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20rpx;
    }

    .isMoreMoney {
      color: red;
    }
  }
}
</style>
