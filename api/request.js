// let BASE_URL = "http://m.myxiaodi.com:8080/yrg/";
// let BASE_URL = "https://m.myxiaodi.com/yrg/";
let BASE_URL = "http://amghgdm.cn/yplg/";

let debug = process.env.NODE_ENV === "development";
import store from '../store/index';
const getURL = function(url) {
	//#ifndef MP-WEIXIN
	if (!debug) url = BASE_URL + url;
	else url = "api/" + url;
	//#endif

	//#ifdef MP-WEIXIN
	url = BASE_URL + url;
	//#endif
	return url;
}


function post(url, d = {}, TK = true, jp = true) {
	let h = {
		'content-type': 'application/x-www-form-urlencoded', 
		'X-Requested-With': 'XMLHttpRequest'
	};
	return rb(url, d, 'POST', h, TK, jp);
}


function postJson(url, d = {}, TK = true, jp = true) {
	let h = {
		'X-Requested-With': 'XMLHttpRequest'
	};
	return rb(url, d, 'POST', h, TK, jp);
}


function get(url, TK = true, jp = true) {
	let h = {
		'X-Requested-With': 'application/x-www-form-urlencoded'
	};
	return rb(url, null, 'GET', h, TK, jp);
}

function put(url, d, TK = true, jp = true) {
	let h = {};
	return rb(url, d, 'PUT', h, TK, jp);
}

function del(url, d, TK = true, jp = true) {
	let h = {};
	return rb(url, d, 'DELETE', h, TK, jp);
}

function rb(url, d, mt, h = {}, TK = true, jp = true) {
	if (TK) {
        let token = uni.getStorageSync('TOKEN'); 
		if (!token) m();
		h['X-AUTH-TOKEN'] = token; 
	}
	return new Promise(function(resolve, reject) {
		let option = {
			url: getURL(url),
			header: h,
			data: d,
			method: mt
		};
		if (mt == "DELETE") option._method = "delete";
		if (mt == "GET") delete option.data;
		uni.request(option).then(d => {
			let [err, res] = d;
			if (res.statusCode == 200) resolve(res);
			else {
				reject(res.statusCode);
				console.info('401', store)
				store.commit('logout');
				if (jp) m();
			}
		})
	})
}

function m() {
	let ps = getCurrentPages();
	let p = ps[ps.length - 1];
	uni.showModal({
		title: '提示',
		content: '登陆失效，是否跳转登录？',
		success: function(res) {
			if (res.confirm) {
				uni.setStorageSync('redirect', '/' + p.route);
				uni.switchTab({
					url: '/pages/userCenter/userCenter'
				});
			} else if (res.cancel) {
				return;
			}
		}
	});
}

export default {
	get,
	post,
	postJson,
	put,
	del,
	BASE_URL
}
