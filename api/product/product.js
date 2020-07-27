let h = require("../request").default;

let productAPI = {
	// 拼团商品-列表
	productList(d) {
		let o = {
			ptsp: {
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
		return h.postJson(`/rest/yplgdata/ptsp_datagrid`, o, false);
	},
	// 拼团商品-详情
	goodsDetail(id) {
		// return h.postJson(`rest/yplgdata/getPtspById/${id}`);
		return h.postJson(`rest/yplgdata/getPtspById?id=${id}`, id, false);
	},
	//积分商品-列表
	integralList(d) {
		let o = {
			jfsp: {
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
	//积分商品-详情
	integralDetail(id) {
		// return h.postJson(`rest/yplgdata/getPtspById/${id}`);
		return h.postJson(`rest/yplgdata/getJfspById?id=${id}`, null, false);
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

export default productAPI;
