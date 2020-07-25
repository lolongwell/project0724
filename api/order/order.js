let h = require("../request").default;

let orderAPI = {
	orderList(d) {
		let o = {
		    dd : d,
		    dataGrid: {
		        // "field": "id,spfl,name",
		        "page": 1,
		        "rows": 1000,
		        "order": "desc",
		        "sort": "createDate"
		    }
		}
		o = JSON.stringify(o);
		return h.postJson(`rest/scDdController/dd_datagrid`, o);
	},
	spList(d) {
		let o = {
		    ddsp: d,
		    dataGrid: {
		        // "field": "id,spfl,name",
		        "page": 1,
		        "rows": 1000,
		        "order": "desc",
		        "sort": "createDate"
		    }
		}
		o = JSON.stringify(o);
		return h.postJson(`rest/scDdController/ddsp_datagrid`, o);
	},
	createOrder(d){
		d = JSON.stringify(d);
		return h.postJson(`rest/scDdController`, d);
	},
	getAddressList(d){
		let o = {
		    address : {"userId":d.userId},
		    dataGrid: {
		        // "field": "id,spfl,name",
		        "page": 1,
		        "rows": 1000,
		        "order": "desc",
		        "sort": "createDate"
		    }
		}
		o = JSON.stringify(o);
		return h.postJson(`rest/userAddressController/address_datagrid`, o);
	},
	
	addAddress(d){
		d = JSON.stringify(d);
		return h.postJson(`rest/userAddressController`, d);
	},
	
	updateAddress(d){
		d = JSON.stringify(d);
		return h.postJson(`rest/userAddressController/update`, d);
	},
	cancelOrder(id){
		return h.postJson(`rest/scDdController/delete?id=${id}`,{});
	},
	delOrder(d){
		d = JSON.stringify(d);
		return h.postJson(`rest/userAddressController/update`, d);
    },
    
    orderDetail(id){
		return h.get(`rest/scDdController/${id}`);
    },
	
	getExpress(d) {
		return h.postJson(`rest/scDdController/getWlxxByKdgsBmAndKddh?kdgsbm=${d.kdgs}&phone=${d.phone}&kddh=${d.dh}`,{});
    },
    
	getInvoiceList(d){
		let o = {
		    userbill : {"userId":d.userId},
		    dataGrid: {
		        // "field": "id,spfl,name",
		        "page": 1,
		        "rows": 1000,
		        "order": "desc",
		        "sort": "createDate"
		    }
		}
		o = JSON.stringify(o);
		return h.postJson(`rest/userBillController/userbill_datagrid`, o);
	},
	
	updateOrderCommentState(d){
		return h.postJson(`rest/scDdController/updateScDdspPjwc`, d);
	},
	
	getDic(d){
		return h.postJson(`rest/yrgdata/getTypeNameListByLxcode?typeLxCode=${d}`, d,false);
	}
}

export default orderAPI;