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
	},
	getMoneyList(d) {
		let o = {
			hyzjjl : {"userId":d},
			dataGrid: {
					// "field": "id,spfl,name",
					"page": 1,
					"rows": 100,
					"order": "desc",
					"sort": "clsj"
			}
	}
	o = JSON.stringify(o);
		return h.postJson(`rest/tbHyzjjlController/hyzjjl_datagrid`, o);
	}
}
export default userAPI;
