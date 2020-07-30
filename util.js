import RegisterAPI from "@/api/register/register";

export function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let url = window.location.href.split('#')[0]
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
  const appId = getApp().globalData.appId;
  const local = window.location.href;
  let code = getUrlParam("code");
  console.log("code", code);
  if (code === null || code === "") {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
  } else {
    console.log("code已存在", code);
    getWxInfo(code)
  }
}

export function getWxInfo(code) {
  return new Promise((resolve, reject) => {
    RegisterAPI.getOpenId(code).then((res) => {
      if (res.data.respCode == 0) {
        let session_key = res.data.data.session_key || ''
        uni.setStorageSync("openid", res.data.data.openid);
        uni.setStorageSync("avatarUrl", res.data.data.avatarUrl);
        uni.setStorageSync("city", res.data.data.citizenNo);
        uni.setStorageSync("province", res.data.data.province);
        uni.setStorageSync("country", res.data.data.country);
        uni.setStorageSync("nickName", res.data.data.nickName);
        uni.setStorageSync("unionid", res.data.data.unionid);
        uni.setStorageSync("sex", res.data.data.sex);
        if (session_key) {  // 注册流程
          console.log('要注册')
          uni.setStorageSync("session_key", res.data.data.session_key);
          reject()
        } else {    // 用户已注册，获取token及用户信息
          console.log('要登录')
          uni.setStorageSync("TOKEN", res.data.data.token);
          uni.setStorageSync("userid", res.data.data.id);
          resolve()
        }
      }
    });
  })
}