import RegisterAPI from '@/api/register/register'
import payAPI from '@/api/pay/pay.js'
import orderAPI from '@/api/order/order.js'

export function getUrlParam(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	// let url = window.location.href.split('#')[0]
	let url = window.location.href
	let search = url.split('?')[1]
	if (search) {
		var r = search.substr(0).match(reg)
		if (r !== null) return unescape(r[2])
		return null
	} else {
		return null
	}
}

export function checkLogin() {
	const appId = getApp().globalData.appId
	const local = window.location.href
	let code = getUrlParam('code')
	let ghbm = getUrlParam('ghbm') // 扫码进入
	console.log('code', code)
	if (code === null || code === '') {
		window.location.href =
			`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
      local
    )}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
	} else {
		console.log('code已存在', code)
		getWxInfo(code).then(() => {
			// 已登录
		}).catch(() => {
			// 去注册
			if (ghbm) {
				let paramArr = ghbm.split(',')
				let yqm = paramArr[0],
					yqrId = paramArr[1]
				console.log(yqm, yqrId)
				uni.redirectTo({
					url: `/pages/register/register?yqm=${yqm}&yqrid=${yqrId}`
				});
			} else {
				uni.redirectTo({
					url: `/pages/register/register`
				});
			}
		})
	}
}

export function getWxInfo(code) {
	return new Promise((resolve, reject) => {
		RegisterAPI.getOpenId(code).then((res) => {
			if (res.data.respCode == 0) {
				let session_key = res.data.data.session_key || ''
				uni.setStorageSync('openid', res.data.data.openid)
				uni.setStorageSync('avatarUrl', res.data.data.avatarUrl)
				uni.setStorageSync('city', res.data.data.citizenNo)
				uni.setStorageSync('province', res.data.data.province)
				uni.setStorageSync('country', res.data.data.country)
				uni.setStorageSync('nickName', res.data.data.nickName)
				uni.setStorageSync('unionid', res.data.data.unionid)
				uni.setStorageSync('sex', res.data.data.sex)
				if (session_key) {
					// 注册流程
					console.log('要注册')
					uni.setStorageSync('session_key', res.data.data.session_key)
					reject()
				} else {
					// 用户已注册，获取token及用户信息
					console.log('要登录')
					uni.setStorageSync('TOKEN', res.data.data.token)
					uni.setStorageSync('userid', res.data.data.id)
					uni.setStorageSync('yue', res.data.data.yue)
					uni.setStorageSync('hyjf', res.data.data.hyjf)
					resolve()
				}
			}
		})
	})
}

// 获取支付openid
export function requestPayOpenid() {
	// let local = window.location.href
	let local = 'http://sjblake.cn/#/pages/order/detail' // 订单详情
	window.location.href =
		`https://api.yiyunjf.cn/v1/wechat/auth?app_id=pya7LZA0fnMupQH5Yp4C9wZtMDAwV1RP&sub_mch_id=1601407358&snsapi_userinfo=true&callback=${encodeURIComponent(
    local
  )}`
}

export function payment(openid, orderInfo) {
	let o = {
		userid: uni.getStorageSync('userid'),
		openid,
		czje: orderInfo.money,
		spmc: orderInfo.spmc
	}
	payAPI.payOrder(o).then((res) => {
		console.log('支付返回信息', res)
		if (res.data.data.code == 1000) {
			let data = res.data.data.data
			if (typeof WeixinJSBridge == 'undefined') {
				if (document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady.bind(null, data, orderInfo), false)
				} else if (document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', onBridgeReady.bind(null, data, orderInfo))
					document.attachEvent('onWeixinJSBridgeReady', onBridgeReady.bind(null, data, orderInfo))
				}
			} else {
				onBridgeReady(data, orderInfo)
			}
		} else {
			uni.showToast({
				title: '支付不成功',
				icon: 'none',
				duration: 2000
			});
			setTimeout(function() {
				uni.navigateTo({
					url:'/pages/my/my.vue'
				})
			}, 2000)

		}


	})
}

export function onBridgeReady(data, orderInfo) {
	WeixinJSBridge.invoke(
		'getBrandWCPayRequest', {
			appId: data.jsapi_app_id, //公众号名称，由商户传入
			timeStamp: data.jsapi_timeStamp, //时间戳，自1970年以来的秒数
			nonceStr: data.jsapi_nonceStr, //随机串
			package: data.jsapi_package,
			signType: 'MD5',
			paySign: data.jsapi_paySign, //微信签名
		},
		function(res) {
			console.log('支付成功了', res)
			if (res.err_msg == 'get_brand_wcpay_request:ok') {
				let orderSource = uni.getStorageSync('orderSource')
				console.log('111111111', orderSource)
				let orderDetail = JSON.parse(uni.getStorageSync('orderDetail'))
				console.log('==========orderDetail', orderDetail)
				if (orderSource == 1) {
					let o = {
						id: orderDetail.id,
						payid: orderDetail.payid
					}
					orderAPI.payAndUpdateOrder(o).then(res => {
						console.log('成功支付后的回调1', res)
						uni.switchTab({
							url: '/pages/order/order'
						});
					})
				} else if (orderSource == 2) {
					let o = {
						// "bank_type": "string",
						"totalFee": orderInfo.money, // 金额
						"transactionId": orderDetail.payid,
						"userId": uni.getStorageSync('userid'),
						"zfly": orderInfo.method, // 支付来源 wx、zfb
						"zfzl": "1" // 支付种类
					}
					payAPI.paySuccess(JSON.stringify(o)).then(res => {
						console.log('成功支付后的回调2', res)
						uni.switchTab({
							url: '/pages/my/my'
						});
					})
				}
			}
		}
	)
}
