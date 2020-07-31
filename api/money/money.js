let h = require("../request").default;

let moneyAPI = {
	
	
	// 充值
	inMoney(d){
		d = JSON.stringify(d);
		return h.postJson(`rest/userAddressController`, d);
	},
	
	// 提现
	outMoney(d){
		d = JSON.stringify(d);
		return h.postJson(`rest/tbTxglController`, d);
	},
	
	// 资金记录
	hostoryMoney(id){
		return h.get(`rest/tbHyzjjlController/${id}`);
	},
	moneyList(d) {
		let o = {
		    dd : d,
		    dataGrid: {
		        // "field": "id,spfl,name",
		        "page": 1,
		        "rows": 1000,
		        "money": "desc",
		        "sort": "createDate"
		    }
		}
		o = JSON.stringify(o);
		return h.postJson(`rest/scDdController/dd_datagrid`, o);
	},
	
	
	updateAddress(d){
		d = JSON.stringify(d);
		return h.postJson(`rest/userAddressController/update`, d);
	},
   
}

export default moneyAPI;