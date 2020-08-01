let h = require("../request").default;

let payAPI = {
	getPayInfo(d) {
		return h.postJson(`rest/wxPayController/wxPayFunction?openid=${d.openid}`, d, false);
	},
	test1(){
		
	},
    // 支付
	payOrder(d) {
		return h.postJson(`/rest/yyjfPayController/wxczFunction?userId=${d.userid}&openid=${d.openid}&czje=${d.czje}&spmc=${d.spmc}`,{}, true);
	},
	// 支付-支付宝
	payOrderByZFB(d){
		return h.postJson(`/rest/yyjfPayController/zfbczFunction?userId=${d.userid}&openid=${d.openid}&czje=${d.czje}&spmc=${d.spmc}`,{}, true);
	},
	// payOrder(d) {
	// 	return h.postJson(`rest/wxPayController/wxPayByDdAndOpenid?ddId=${d.ddId}&openid=${d.openid}&ip=${d.ip}`);
	// },
	updateDdSuccess(d){
		return h.postJson(`rest/scDdController/updateDdSuccess?id=${d.id}&payid=${d.payid}`);
	},
	
	confirmReceived(id) {
		return h.postJson(`rest/scDdController/updateScDdsp`,{id:id});
	},

	paySuccess(d) {
		return h.postJson(`rest/yyjfPayController/updateZfcg`, d, true);
	}
}

export default payAPI;
