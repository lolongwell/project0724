let h = require("../request").default;

let userAPI = {
	saveUserBill(d) {
		return h.postJson(`rest/userBillController`, d);
	},
	updateUserBill(d) {
		return h.postJson(`rest/userBillController/update`, d);
	},
	getUserBill(id) {
		return h.get(`rest/userBillController/${id}`);
	}
}

export default userAPI;
