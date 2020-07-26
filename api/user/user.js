let h = require("../request").default;

let userAPI = {
	saveUserBill(d) {
		return h.postJson(`rest/userBillController`, d);
	},
	updateUserBill(d) {
		return h.postJson(`rest/userBillController/update`, d);
	},
	getUserInfo(id) {
		return h.get(`/rest/user/${id}`);
	}
}

export default userAPI;
