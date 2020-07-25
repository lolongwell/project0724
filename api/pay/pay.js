let h = require("../request").default;

let payAPI = {
	getPayInfo(d) {
		return h.postJson(`rest/wxPayController/wxPayFunction?openid=${d.openid}`, d, false);
	},
	createOrder(d) {
		return h.postJson(`rest/wxPayController/wxPayFunction?openid=${d.openid}`, d, false);
	},
	
	payOrder(d) {
		return h.postJson(`rest/wxPayController/wxPayByDdAndOpenid?ddId=${d.ddId}&openid=${d.openid}&ip=${d.ip}`);
	},
	updateDdSuccess(d){
		return h.postJson(`rest/scDdController/updateDdSuccess?id=${d.id}&payid=${d.payid}`);
	},
	
	confirmReceived(id) {
		return h.postJson(`rest/scDdController/updateScDdsp`,{id:id});
	}
}

export default payAPI;
