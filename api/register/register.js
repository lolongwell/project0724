let h = require("../request").default;

let RegisterAPI = {
	getPhoneCode(d) {
		return h.postJson(`/rest/tokens/getYzCodeByMobie/${d}`, d, false);
	},
	submitRegister(d) {
		d = JSON.stringify(d);
		return h.postJson(`/rest/tokens/updateUserInfo`, d, false);
	},
	getOpenId(d) {
		return h.postJson(`/rest/tokens/getOpenId?code=${d}`, {}, false)
	}
}

export default RegisterAPI;