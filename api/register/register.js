let h = require("../request").default;

let RegisterAPI = {
	getPhoneCode(d) {
		return h.post(`/rest/tokens/${d}`, d, false);
	},
	submitRegister(d) {
		d = JSON.stringify(d);
		return h.post(`/rest/tokens/updateUserInfo`, d, false);
	},
	getOpenId(d) {
		return h.post(`/rest/tokens/getOpenId?code=${d}`, d, false)
	}
}

export default RegisterAPI;