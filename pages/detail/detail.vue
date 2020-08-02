<template>
	<view class="detail">
		<!-- banner -->
		<!-- <view class="swp-container">
			<swiper class="_swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(img, index) in picList" :key="index">
					<view class="_swiper-item"><img :src="img" @click="bannerLink(banner)" :alt="img" /></view>
				</swiper-item>
			</swiper>

		</view> -->
		<img class="img" :src="img" mode="" />
		<view class="intro">
			<view class="item">
				{{product.spmc}}
			</view>
			<view class="item">
				拼团价：
				<!-- <span>{{ q(product.ptjg, 'price') }}</span> -->
				<span>￥ {{ product.ptjg }}</span>
			</view>
			<view class="item">
				运费：{{product.yf}}
			</view>
			<view class="item">
				拼团条件： 参与人数达到{{product.ptlx}}人
			</view>
		</view>

		<view class="big-tit">
			—— 商品介绍 ——
		</view>
		<view class="images" :class="{ 'pd-content': !hasImg }">
			<rich-text :nodes="article">{{product.spjs}}</rich-text>
		</view>


		<view class="purchase" v-if="userid">
			<view class="left">账户余额：{{yue}}</view>
			<view class="right" @click="purchase">立即购买</view>
		</view>

		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="product-intro">
					<view class="left">
						<!-- <image :src="product.sppic" mode=""></image> -->
						<img :src="img"></img>
					</view>
					<view class="right">
						<view class="r-name item">
							{{product.spmc}}

						</view>
						<view class="r-price item">
							￥{{product.ptjg}}
						</view>
						<view class="r-type item">
							<span>团购类型：</span>
							<span>{{product.ptlx}}人团</span>
						</view>
					</view>
				</view>
				<view class="product-form">
					<view class="item">
						<view class="left">
							<view class="">
								规格
							</view>
						</view>
						<view class="right ">
							<span class="select-btn" :class="{'type-active':i === typeIndex}" v-for="(item,i) in product.spJgList" :key="i"
							 @click="typeChange(item.spgg,item.id,item.jg,i)">{{item.spgg}}</span>
						</view>
					</view>

					<view class="item">
						<view class="left">
							<view class="">
								购买数量
							</view>
						</view>
						<view class="right num-set">
							<uni-number-box class="step" :min="1" :max="99" :value="number > 99 ? 99 : number" :isMax="number >= 99 ? true : false"
							 :isMin="number === 1" @eventChange="numberChange"></uni-number-box>
						</view>
					</view>

					<view class="item">
						<view class="left">
							<view class="">
								支付方式
							</view>
						</view>
						<view class="right">
							<span class="select-btn" :class="{'method-active':j === methodIndex}" v-for="(item,j) in method" :key="j" @click="payChange(item.name,item.value,j)">{{item.name}}</span>
						</view>
					</view>
					<view class="item">
						<view class="left">
							<view class="">
								收货地址
							</view>
						</view>
						<view class="right">
							<view class="uni-list">
								<view class="uni-list-cell">
									<view class="uni-list-cell-db">
										<picker mode="selector" @change="addressChange" :value="index" :range="address" placeholder="请选择收货地址">
											<view class="uni-input">{{address[index]}}</view>
										</picker>
									</view>
								</view>
							</view>
							<view  else  class="address-input">
								<input type="text" :value="addressValue"  v-model="addressValue"    />
							</view>
						</view>
						
					</view>

					<button @click="payHandle" class="pay-money">立即支付</button>
				</view>
				<!-- <view v-if="specList.length" class="pick-size" @click="toggleSpec"> -->

			</view>

		</view>
	</view>

	</view>
</template>

<script>
import ProductAPI from "../../api/product/product";
import payAPI from "../../api/pay/pay";
import orderAPI from "../../api/order/order";
import CartAPI from "../../api/cart/cart";
import uniNumberBox from "@/components/uni-number-box.vue";
import { mapState } from "vuex";
import userAPI from '@/api/user/user.js'

export default {
  data() {
    return {
			// indicatorDots: true,
			userid: uni.getStorageSync('userid'),
			yue:  uni.getStorageSync('yue'),
      autoplay: true,
      interval: 5000,
      duration: 200,

      hideSource: false,
      bannerList: [],
      specSelected: null,
      specList: [],
      goodID: "",
      number: 1,
      specClass: "none",
      pj: {
        num: 0,
        rate: 0,
      },
      article: "",
      imageProp: {
        mode: "aspectFill",
        padding: "0",
        lazyLoad: true,
      },
      beforeChangeAction: "",
      shareList: [],
      picList: [],
      commentList: [],
      product: {},
      img: "",
      paydetail: {
        guige: [
          {
            name: "喜字",
            id: 1,
          },
          {
            name: "喜字",
            id: 2,
          },
          {
            name: "喜字",
            id: 3,
          },
        ],
      },
      address: ['请选择收货地址'],
      // 支付方式
      method: [
        {
          name: "微信",
          value: "wxzf",
        },
        {
          name: "余额支付",
          value: "yezf",
        },
      ],
      index: 0,
      typeIndex: -1, // 规格初始索引
      methodIndex: -1, // 支付方式初始索引
      // 提交给后台的支付入参
      form: {
        // spmc: '',
        // spgg: '',
        // ptjg: '',
        // ptjg: '',
        // number: 1,
        // zffs: '',
        // addressId: '',

        addressId: "", // 地址
        ddje: 0, // 订单金额
        realname: "", //用户名
        spId: "", //商品id
        spdj: 0, // 单价
        spgg: "", // 规格
        spmc: "", // 名称
        spsl: 1, // 数量
        userId: uni.getStorageSync('userid'), //用户id
        zffs: "", // 支付方式
        zjzt: "0", //
      },
      addressList: [],
    };
  },
  components: {
    uniNumberBox,
  },
  onLoad(option) {
    this.goodID = option.id;
    this.form.spId = option.id;
    if (option.source) this.hideSource = true;
  },
  onShow(option) {
		this.getUserInfo()
    this.loadData(this.goodID);
    this.specSelected = null;
  },
  computed: {
    ...mapState(["status", "hasLogin", "cartData"]),
    // q() {
    // 	return function(obj, attr) {
    // 		console.log(obj)
    // 		if (!obj) return '0.00';
    // 		console.log(obj[attr].toFixed(2))
    // 		// if (obj[attr]) return obj[attr].toFixed(2);
    // 		// else return '0.00';
    // 	};
    // },
    hide() {
      return function (num) {
        let _4num = num.substring(num.length - 4);
        return "*******" + _4num;
      };
    },
    gmfsFilter() {
      return function (type, attr) {
        if (!type) return "";
        switch (type[attr]) {
          case "1":
            return "单次购买";
          case "2":
            return "购买三天";
          case "3":
            return "购买一周";
          case "4":
            return "购买两周";
        }
      };
    },
    indicatorDots() {
      if (this.picList.length > 1) return true;
      else return false;
    },
    hasImg() {
      if (this.article.indexOf("img") > -1) return true;
      else return false;
    },
  },
  methods: {
		getUserInfo() {
				let userid = uni.getStorageSync('userid')
				userAPI.getUserInfo(userid).then(res => {
					this.$store.commit('balanceUpdate', res.data.yue?res.data.yue:0)
					uni.setStorageSync('yue', res.data.yue?res.data.yue:0)
					uni.setStorageSync('czje', res.data.czje?res.data.czje:0)
					uni.setStorageSync('hyjf', res.data.hyjf?res.data.hyjf:0)
					uni.setStorageSync('hyxfe', res.data.hyxfe?res.data.hyxfe:0)
				})
			},
    // 获取地址
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
        // this.form.addressId = this.addressList[0].id;
        console.log("收货地址", res.data.obj.results);
      });
    },
    loadData(id) {
      // 获得商品详情
      const app = getApp();
      ProductAPI.goodsDetail(id).then((res) => {
        this.$_log("商品详www情：", res.data.obj);
        this.product = res.data.obj;
        this.img = '/yplg/' + this.product.sppic;
        console.log(this.img);
				this.article = this.product.spjs;
				this.form.spdj = res.data.obj.ptjg
				this.form.spmc = res.data.obj.spmc
      });

      // 获取支付方式字典数据
      // this.getDicData("zffs").then((res) => {
      //   console.log("res支付方hi", res);
      //   this.method = res.data.data.map((item) => {
      //     return {
      //       name: item.typename,
      //       value: item.typecode,
      //     };
      //   });
      // });
    },

    // 抽屉
    toggleSpec() {
      if (this.specClass === "show") {
        this.specClass = "hide";
        setTimeout(() => {
          this.specClass = "none";
        }, 250);
      } else if (this.specClass === "none") {
        this.specClass = "show";
      }
    },
    //立即支付
    payHandle() {
      // 验证表单
      // if (!this.form.spgg) {
      // 	uni.showToast({
      // 		title: '请选择商品规格!',
      // 		icon: 'none'
      // 	});
      // }
      // if (!this.form.zffs) {
      // 	uni.showToast({
      // 		title: '请选择支付方式!',
      // 		icon: 'none'
      // 	});
      // }

      // 获得入参
			console.log(this.form)
      orderAPI.createOrder(this.form).then((res) => {
        if (res.data.respCode === "0") {
          console.log("支付创建订单", res);
          console.log("支付创建订单", res.data.data.id);
					this.$store.commit("orderDetailsUpdate", res.data.data);
					uni.setStorageSync('orderSource', '1')  // 1：商品订单；2：充值订单
          uni.setStorageSync("orderDetail", JSON.stringify(res.data.data));
          // 进入创建订单页面
          if (this.form.zffs == 'wxzf') {
            uni.navigateTo({
              url: "../order/detail",
            });
          } else {
            if (res.data.data.wczt == 0) {
              uni.showToast({
                title: '拼团成功！',
                duration: 1500
              });
              setTimeout(() => {
                uni.navigateBack();
              }, 1500)
            }
          }
        }
      });

      // 请求前查看余额是否充足

      // 发送请求
      //
    },
    // 选择商品规格
    typeChange(val, id, jg, index) {
      this.typeIndex = index;
      this.product.ptjg = jg;
      this.form.spgg = val;
      console.log("this.typeIndex", this.typeIndex);
      console.log("规格", val);
      console.log("规格id", id);
    },
    // 选择支付方式
    payChange(val, id, index) {
      this.methodIndex = index;
      this.form.zffs = id;
      console.log("规格", val);
      console.log("规格id", id);
    },
    //选择数量
    numberChange(e) {
      this.form.spsl = e.number;
    },
    // 选择地址
    addressChange(e) {
      this.index = e.target.value;
      this.form.addressId = this.addressList[this.index - 1].id;
    },
    changeGMFS() {
      if (this.specSelected) this.product.price = this.specSelected.jg;

      switch (this.beforeChangeAction) {
        case "buy":
          this.purchase();
          break;
        case "cart":
          this.addToCart();
          break;
        default:
          break;
      }

      this.toggleSpec();
    },

    selectSpec(item) {
      this.specList.forEach((v) => {
        v.selected = false;
      });
      item.selected = true;
      this.specSelected = item;
      this.product.price = this.specSelected.jg;
    },
    addToCart() {
      if (!this.hasLogin) {
        this.showTokenInvalidMsg();
        return;
      }
      if (!this.specSelected && this.specList.length) {
        this.toggleSpec();
        this.beforeChangeAction = "cart";
        return;
      }
      let user = uni.getStorageSync("user").userName;
      let userName = uni.getStorageSync("user").realName;
      let product = this.$jsonClone(this.product);
      product.number = this.number;
      product.buyUser = user;
      product.createName = userName;
      if (this.specSelected) product.gmfs = this.specSelected.gmfs;
      this.$store.commit("addOrUpdateCart", product);
    },
    formatRichText(html) {
      let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
        match = match
          .replace(/style="[^"]+"/gi, "")
          .replace(/style='[^']+'/gi, "");
        match = match
          .replace(/width="[^"]+"/gi, "")
          .replace(/width='[^']+'/gi, "");
        match = match
          .replace(/height="[^"]+"/gi, "")
          .replace(/height='[^']+'/gi, "");
        return match;
      });
      newContent = newContent.replace(/style="[^"]+"/gi, function (
        match,
        capture
      ) {
        match = match
          .replace(/width:[^;]+;/gi, "max-width:100%;")
          .replace(/width:[^;]+;/gi, "max-width:100%;");
        return match;
      });
      newContent = newContent.replace(/<br[^>]*\/>/gi, "");
      newContent = newContent.replace(
        /\<img/gi,
        '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"'
      );
      return newContent;
    },
    // todo立即购买
    purchase() {
      // if (!this.hasLogin) {
      // 	this.showTokenInvalidMsg();
      // 	return;
      // }
			this.toggleSpec();
      this.getAdress();
			
    },
    showTokenInvalidMsg() {
      let pages = getCurrentPages();
      let page = pages[pages.length - 1];
      uni.showModal({
        title: "提示",
        content: "登陆失效或还未登录，是否跳转登录？",
        success: function (res) {
          if (res.confirm) {
            console.info("地址", page);
            uni.setStorageSync(
              "redirect",
              "/" + page.route + "?id=" + page.options.id
            );
            uni.switchTab({
              url: "/pages/my/my",
            });
          } else if (res.cancel) {
            return;
          }
        },
      });
    },
    pl(url) {
      return this.$request.BASE_URL + url;
    },
    t(link) {
      uni.switchTab({
        url: `/pages/${link}/${link}`,
      });
    },
    bannerLink(obj) {
      return;
      uni.navigateTo({
        url: obj.url,
      });
    },
    share() {},

    stopPrevent() {},
  },
};
</script>

<style lang="scss" scoped>
.swp-container {
  display: flex;
  justify-content: center;
  background: red;
}

.product-name {
  padding: 0 20rpx;
}

._swiper {
  height: 550rpx;
  width: 100%;
}

._swiper-item {
  display: block;
  height: 550rpx;
  line-height: 550rpx;
  text-align: center;

  img {
    width: 100%;
    height: 100%;
  }
}

.share-btn {
  padding: 0;
  height: 95rpx;
  line-height: 50rpx;
  font-size: $font-base;
  background-color: rgba(#000, 0);
  background-image: url("../../static/share.png");
  background-repeat: no-repeat;
  background-position: center 10rpx;
  background-size: 50rpx;

  &::after {
    color: $font-color-base;
    content: "分享";
    font-size: $font-sm;
    position: relative;
    top: 50rpx;
    border: none;
  }

  // border: none;
}

.detail {
  font-size: $font-sm;
  color: $font-color-base;
  padding-bottom: 90rpx;
  position: relative;

  .img {
    position: relative;
    z-index: -1;
    width: 100%;
    height: 450rpx;
    overflow: hidden;
    transform: scale(1.2);
  }

  .intro {
    background-color: white;
    width: 95%;
    margin: 0 auto;
    box-shadow: 0 3px 3px -3px #ccc;
    border-radius: 10rpx;
    margin-top: -60rpx;
    display: flex;
    flex-direction: column;
    padding: 30rpx;

    .item {
      flex: 1;
      margin: 5px;

      &:nth-of-type(2) {
        span {
          color: $base-red;
        }
      }
    }

    .spmc-name {
      color: #000;
    }

    // .pname {
    // 	font-size: $font-lg;
    // 	font-weight: 600;
    // 	color: $font-color-dark;
    // 	height: 60rpx;
    // 	line-height: 60rpx;
    // }

    .gs {
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: $font-sm;
      flood-color: $font-color-light;
      word-break: keep-all;
    }

    .right {
      width: 100rpx;
      text-align: center;
    }

    .price {
      padding: 5rpx 20rpx;
      overflow: hidden;
      border-left: none;
      border-right: none;

      .left {
        .p-price {
          color: #333;

          span {
            font-size: $font-title;
            color: $base-red;
            font-weight: bold;
            margin: 0 10rpx;
          }
        }
      }

      .num-set {
        margin-top: 6rpx;
      }
    }

    > .pick-size {
      padding: 0 20rpx;
      height: 80rpx;
      line-height: 80rpx;
      font-size: $font-base;
      position: relative;
      border-top: 1px solid #f1f1f1;

      .pick-title {
        color: $font-color-light;
      }

      .selected-text {
        position: absolute;
        right: 30rpx;

        .icon-pos {
          margin-left: 20rpx;
        }
      }
    }

    > .description {
      padding: 15rpx 20rpx;
      line-height: 34rpx;
    }
  }

  > .source {
    background-color: white;
    margin: 20rpx auto;
    box-shadow: 0 3px 3px -3px #ccc;

    .dj {
      overflow: hidden;
      display: inline-block;
    }

    > p {
      text-align: center;
      font-size: $font-lg;

      height: 60rpx;
      line-height: 60rpx;
    }

    > ul {
      list-style: none;
      padding: 20rpx;
      margin: 0;
      padding-top: 0;

      > li {
        height: 48rpx;
        line-height: 48rpx;
        overflow: hidden;

        &:nth-child(4) > text:nth-child(1) {
          width: 280rpx;
          display: inline-block;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

  > .evaluate {
    background-color: white;
    margin: 0 auto;
    margin-top: 20rpx;
    padding-bottom: 20rpx;
    box-shadow: 0 3px 3px -3px #ccc;

    > p {
      font-size: $font-lg;
      text-align: center;
      padding: 15rpx 0;
    }

    > view {
      overflow: hidden;
      padding: 0 20rpx;
    }

    .no-comment {
      background: #fff;
      text-align: center;
      align-items: center;
      height: 60rpx;
      line-height: 60rpx;
    }

    > ul {
      margin: 0;
      padding: 0 20rpx;
      list-style: none;

      > li {
        border: 1px solid $border-color-base;
        margin-top: 20rpx;
        padding: 5rpx 20rpx;
        padding-left: 10rpx;

        > .name {
          overflow: hidden;

          > .left {
            > * {
              float: left;
            }

            > img {
              width: 40rpx;
              height: 40rpx;
            }

            > p {
              height: 40rpx;
              line-height: 40rpx;
            }
          }

          > .right {
            height: 40rpx;
            line-height: 40rpx;
          }
        }

        > .content {
          padding-left: 40rpx;
        }
      }
    }
  }

  > .images {
    background-color: white;
    margin: 0 auto;
    margin-top: 20rpx;
    box-shadow: 0 3px 3px -3px #ccc;

    img {
      width: 100%;
    }

    &.pd-content {
      padding: 30rpx;
    }
  }

  > .purchase {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 90rpx;
    line-height: 90rpx;

    .left {
      flex: 3;
      background: #ffaa00;
      color: #ffffff;
      text-align: center;
      font-size: $font-lg;
    }

    .right {
      flex: 2;
      background: #ff5500;
      color: #ffffff;
      text-align: center;
      font-size: $font-lg;
    }

    // 功能按钮
    .function-icon {
      display: inline-block;
      width: 220rpx;
      background: #fff;
      display: flex;
      padding: 0 20rpx;

      .li {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;

        .icon {
          display: inline-block;
          width: 40rpx;
          height: 40rpx;
          position: relative;
          top: -10rpx;

          &.icon-cart {
            background-image: url("../../static/tab-cart-current.png");
            background-size: 100% 100%;
            backgrount-repeat: no-repeat;
          }

          &.icon-home {
            background-image: url("../../static/tab-home-current.png");
            background-size: 100% 100%;
            backgrount-repeat: no-repeat;
          }

          > .number {
            display: inline-block;
            width: 30rpx;
            heigth: 30rpx;
            border-radius: 50%;
            position: absolute;
            top: -15rpx;
            right: -15rpx;
            color: #fff;
            background: $base-red;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        ._name {
          position: absolute;
          font-size: $font-sm - 2;
          bottom: 8rpx;
        }
      }
    }

    .buy {
      display: inline-block;
      flex: 1;
      height: 90rpx;
      padding: 0;
      margin: 0;
      overflow: hidden;
      list-style: none;

      > li {
        text-align: center;
        color: white;
        font-size: $font-lg;
        width: 50%;
        height: 90rpx;
        float: left;
        line-height: 90rpx;

        &:nth-child(1) {
          background-color: $bgColor-green;
        }

        &:nth-child(2) {
          background-color: $bgColor-blue;
        }
      }
    }
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .orange {
    color: $base-orange;
  }

  /* 规格选择弹窗 */
  .attr-content {
    padding: 0 20rpx;

    .product-intro {
      display: flex;

      .left {
        flex: 1;
        padding: 20rpx;

        // uni-image {
        // 	width: 200rpx;
        // 	height: 200rpx;
        // }

        img {
          width: 50rpx;
          width: 100%;
          height: 100%;
          // height: 50rpx;
        }
      }

      .right {
        flex: 5;
        display: flex;
        padding: 20rpx;
        flex-direction: column;

        .item {
          flex: 1;
          margin: 5rpx;

          &:nth-of-type(1) {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &:nth-of-type(2) {
            color: $base-red;
            font-size: 40rpx;
          }

          &:nth-of-type(3) {
            display: flex;

            span {
              flex: 1;

              &:nth-of-type(2) {
                text-align: right;
              }
            }
          }
        }
      }
    }

    .product-form {
      display: flex;
      flex-direction: column;

      .item {
        flex: 1;
        display: flex;
        margin: 20rpx;
        justify-content: center;
        align-items: center;

        .left {
          flex: 2;
        }

        .right {
          flex: 8;
          text-align: right;
          position: relative;

          .select-btn {
            border: 1px solid #333;
            display: inline-block;
            padding: 5rpx 20rpx;
            margin: 5rpx;
          }

          .type-active,
          .method-active {
            border: 1px solid $base-red;
          }

          uni-picker {
            border: 1px solid #333;
            text-align: left;
          }
        }

        .num-set {
          margin-right: 30rpx;

          .uni-numbox {
            // right: 0;
            width: 100px;
            position: absolute;
            // right: 0;
            left: 200px;
            top: -20rpx;
          }
        }
      }
    }

    .pay-money {
      height: 50rpx;
      line-height: 50rpx;
      font-size: $font-base;
      margin-right: 20rpx;
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      background: $my-color;
      color: #fff;
    }
  }

  /*  弹出层 */
  .popup {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;

    &.show {
      display: block;

      .mask {
        animation: showPopup 0.2s linear both;
      }

      .layer {
        animation: showLayer 0.2s linear both;
      }
    }

    &.hide {
      .mask {
        animation: hidePopup 0.2s linear both;
      }

      .layer {
        animation: hideLayer 0.2s linear both;
      }
    }

    &.none {
      display: none;
    }

    .mask {
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .layer {
      position: fixed;
      z-index: 99;
      bottom: 0;
      width: 100%;
      min-height: 40vh;
      border-radius: 10rpx 10rpx 0 0;
      background-color: #fff;

      .btn {
        height: 66rpx;
        line-height: 66rpx;
        border-radius: 100rpx;
        background: $uni-color-primary;
        font-size: $font-base + 2rpx;
        color: #fff;
        margin: 30rpx auto 20rpx;
      }
    }

    @keyframes showPopup {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    @keyframes hidePopup {
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    }

    @keyframes showLayer {
      0% {
        transform: translateY(120%);
      }

      100% {
        transform: translateY(0%);
      }
    }

    @keyframes hideLayer {
      0% {
        transform: translateY(0);
      }

      100% {
        transform: translateY(120%);
      }
    }
  }
}

.big-tit {
  margin: 30rpx auto;
  font-size: 30rpx;
  text-align: center;
  color: #333333;
}

.payway {
  display: flex;
  justify-content: space-around;

  .item {
    display: inline-block;
    padding: 3rpx 10rpx;
    border: 1rpx solid #c0c0c0;
    border-radius: 4rpx;
    margin-right: 10rpx;
  }
}
</style>
