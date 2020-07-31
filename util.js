import RegisterAPI from '@/api/register/register'
import payApi from '@/api/pay/pay.js'

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
  console.log('code', code)
  if (code === null || code === '') {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
      local
    )}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
  } else {
    console.log('code已存在', code)
    getWxInfo(code)
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
          resolve()
        }
      }
    })
  })
}

// 获取支付openid
export function requestPayOpenid() {
  let local = window.location.href
  window.location.href = `https://api.yiyunjf.cn/v1/wechat/auth?app_id=pya7LZA0fnMupQH5Yp4C9wZtMDAwV1RP&sub_mch_id=1601407358&snsapi_userinfo=true&callback=${encodeURIComponent(
    local
  )}`
}

export function payment(openid) {
  let o = {
    userid: uni.getStorageSync('userid'),
    openid,
    czje: '0.01',
  }
  payApi.payOrder(o).then((res) => {
    console.log('支付返回信息', res)
    if (res.data.data.code == 1000) {
      let data = res.data.data.data
      if (typeof WeixinJSBridge == 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady.bind(null,data), false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady.bind(null,data))
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady.bind(null,data))
        }
      } else {
        onBridgeReady(data)
      }
    }
  })
}

export function onBridgeReady(data) {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest',
    {
      appId: data.jsapi_app_id, //公众号名称，由商户传入
      timeStamp: data.jsapi_timeStamp, //时间戳，自1970年以来的秒数
      nonceStr:  data.jsapi_nonceStr, //随机串
      package: data.jsapi_package,
      signType: 'MD5',
      paySign: data.jsapi_paySign, //微信签名
    },
    function (res) {
      if (res.err_msg == 'get_brand_wcpay_request:ok') {
        alert('支付成功')
      }
    }
  )
}
