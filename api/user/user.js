<<<<<<< HEAD
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
=======
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
>>>>>>> 05232aaefa7234ff056f9dfa7fb4717261c85e28
