let h = require("../request").default;

let LoginAPI = {
	login(d) {
		return h.post("loginController.do?login", d);
	},
	checkuser(d) {
		return h.post("loginController.do?checkuser", d, false);
    },
	getPhoneNum(d) {
		return h.postJson(`rest/tokens/getPhoneNumber`, d, false);
	},
	wxLogin(d) {
		let o = JSON.stringify(d);
		return h.postJson(`rest/tokens/updateUserInfo`, o, false);
	}
}

export default LoginAPI;