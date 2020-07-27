let h = require("../request").default;

let RegisterAPI = {
	getPhoneCode(d) {
		return h.post(`/rest/tokens/${d}`, d, false);
	},
	submitRegister(d) {
		d = JSON.stringify(d);
		// return h.postJson(`rest/userAddressController`, d);
		return h.post(`/rest/tokens/updateUserInfo`, d);
	}
}

export default RegisterAPI;