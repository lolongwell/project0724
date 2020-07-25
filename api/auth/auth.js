let h = require("../request").default;

let authAPI = {
	checkToken() {
		return h.post(`rest/user`);
	},
	getOpenId(d) {
		return h.postJson(`rest/tokens/getOpenId?code=${d.code}`,null, false);
	},
	getAccessToken(){
		return h.postJson(`rest/tokens/getAccessToken`,{});
	},
	getQrCode(d) {
		return h.postJson(`rest/tokens/getMiniqrQr2?sceneStr=${d.sceneStr}&accessToken=${d.accessToken}&path=${d.path}`,{});
	}
}

export default authAPI;
