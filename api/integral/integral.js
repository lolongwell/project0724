let h = require("../request").default;

let integralAPI = {
	integralList(d) {
		let o = {
			ptsp: {
				"jfspfl": d.jfspfl,
				"sxj": '1' 
			},
			dataGrid: {
				"field": "id,jfspfl,name",
				"page": 1,
				"rows": 1000,
				"order": "desc",
				"sort": "createDate"
			}
		}
		o = JSON.stringify(o);
		return h.postJson(`rest/yplgdata/jfsp_datagrid`, o, false);
	},
	//商品详情
	goodsDetail(id) {
		// return h.postJson(`rest/yplgdata/getPtspById/${id}`);
		return h.postJson(`rest/yplgdata/getPtspById?id=${id}`, null, false);
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
		return h.postJson(`rest/yplgdata/goods_pj_datagrid`, o, false);
	},
	commitComment(d) {
		return h.postJson(`rest/scGoodsPjController`, d);
	}
}

export default integralAPI;
