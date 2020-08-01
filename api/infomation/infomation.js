
let h = require('../request').default;

// 产品
let informationAPI = {
	// 产品列表
	informationList(d, p = {
		page: 1,
		size: 10
	}) {
		return this.$http.get(`rest/scNewsController/list/${p.page}/${p.size}`, d);
	},

	getBankList(d) {
		return h.postJson(`rest/yplgdata/getTypeNameListByLxcode?typeLxCode=${d}`, {}, false);
	}
}
export default informationAPI;