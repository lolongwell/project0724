<<<<<<< HEAD
// 产品
let informationAPI = {
	// 产品列表
	informationList(d, p = {
		page: 1,
		size: 10
	}) {
		return this.$http.get(`rest/scNewsController/list/${p.page}/${p.size}`, d);
	}
}

=======
// 产品
let informationAPI = {
	// 产品列表
	informationList(d, p = {
		page: 1,
		size: 10
	}) {
		return this.$http.get(`rest/scNewsController/list/${p.page}/${p.size}`, d);
	}
}

>>>>>>> 05232aaefa7234ff056f9dfa7fb4717261c85e28
export default informationAPI;