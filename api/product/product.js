let h = require("../request").default;

let productAPI = {
	productList(d) {
		let o = {
			goods: {
				"spfl": d.spfl,
				"sxj": '1' 
			},
			dataGrid: {
				"field": "id,spfl,name",
				"page": 1,
				"rows": 1000,
				"order": "desc",
				"sort": "createDate"
			}
		}
		o = JSON.stringify(o);
		return h.postJson(`rest/yrgdata/goods_datagrid`, o, false);
	},
	goodsDetail(id) {
		return h.postJson(`rest/yrgdata/goGoodsUpdate?id=${id}`, null, false);
	},
	goodComment(id) {
		let o = {
			goods_pj: {
				"spId": id
			},
			dataGrid: {
				"field": "id,spfl,name",
				"page": 1,
				"rows": 1000,
				"order": "desc",
				"sort": "createDate"
			}
		}
		o = JSON.stringify(o);
		return h.postJson(`rest/yrgdata/goods_pj_datagrid`, o, false);
	},
	commitComment(d) {
		return h.postJson(`rest/scGoodsPjController`, d);
	}
}

export default productAPI;
