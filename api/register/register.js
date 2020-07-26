let h = require("../request").default;

let RegisterAPI = {
	getPhoneCode(d) {
		return h.post(`/rest/tokens/${d}`, d, false);
	}
}

export default RegisterAPI;