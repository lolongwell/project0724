import Vue from 'vue'
import store from './store'
import App from './App'

import Json from './Json'

let h = require("./api/request").default;

const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

// 全局组件
// import NavBar from "./components/nav/nav.vue";
// import HeaderLogo from "./components/common/HeaderLogo.vue";
// import HeaderTip from "./components/common/HeaderTip.vue";
// import HomeLinks from "./components/common/HomeLinks.vue";
// import FooterLogo from "./components/common/FooterLogo.vue";
// import Tips from "./components/common/Tips.vue";
// import Title from "./components/common/Title.vue";
// import ProductList from "./components/common/ProductList.vue";
// import ArticleList from "./components/common/ArticleList.vue";
import HeadPortrait from "./components/common/HeadPortrait.vue";
// import LinkBox from "./components/common/LinkBox.vue";
// import RecommendFruit from "./components/mix-com//RecommendFruit.vue";
// import TitleProductList from "./components/mix-com/TitleProductList.vue";
// import Links from "./components/common/Links.vue";
// import Contact from "./components/common/Contact.vue";
// Vue.component('NavBar', NavBar);
// Vue.component('HeaderLogo', HeaderLogo);
// Vue.component('HeaderTip', HeaderTip); 
// Vue.component('HomeLinks', HomeLinks); 
// Vue.component('FooterLogo', FooterLogo); 
// Vue.component('Tips', Tips); 
// Vue.component('TitleCommon', Title); 
// Vue.component('ProductList', ProductList);
// Vue.component('ArticleList', ArticleList);
// Vue.component('TitleProductList', TitleProductList); 
// Vue.component('RecommendFruit', RecommendFruit); 
// Vue.component('LinkBox', LinkBox); 
Vue.component('HeadPortrait', HeadPortrait);
// Vue.component('Links', Links); 
// Vue.component('Contact', Contact); 

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {
	msg,
	json,
	prePage
};
Vue.prototype.$_log = function() {
	let data = [...arguments];
	for (let i = 0; i < data.length; i++) {
		if (typeof data[i] == 'object') data[i] = JSON.parse(JSON.stringify(data[i]));
	}
	if (process.env.NODE_ENV == "development") console.info(...data);
}

Vue.prototype.$jsonClone = function(json) {
	return JSON.parse(JSON.stringify(json));
}

Vue.prototype.showTokenInvalidMsg = function() {
	uni.showModal({
		title: '提示',
		content: '登陆失效，是否跳转登录？',
		success: function(res) {
			if (res.confirm) {
				uni.switchTab({
					url: '/pages/userCenter/userCenter'
				});
			} else if (res.cancel) {
				return;
			}
		}
	});
}

// 通过字典类型获取字典数据
Vue.prototype.getDicData = function(type) {
	return h.postJson(`/rest/yplgdata/getTypeNameListByLxcode?typeLxCode=${type}`, {}, false);
}
// 根据
// Vue.prototype.getDicData = function(type) {
// 	return h.postJson(`/rest/yplgdata/getCacheTypeGroup?typegroupcode=${type}`, {});
// }

App.mpType = 'app'

import $http from "./api/request";
Vue.prototype.$request = $http;

Vue.prototype.$utils = {}

const app = new Vue({
	...App
})
app.$mount()
