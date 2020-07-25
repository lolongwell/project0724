import Vue from 'vue';
import Vuex from 'vuex';
import CartAPI from "../api/cart/cart";
import LoginAPI from "../api/login/login";
import req from "../api/request";

Vue.use(Vuex);

const state = {
	hasLogin: false,
	isEnterpriseUser: false,
	isEnterpriseAdmin: false,
	
	userInfo: {},
	orderObj: {},
	status: {
		session_key_state: false, 
		token_state: false,
		auth_code_state: false, 
	},

	cartData: [], 
	addressList: [],
	balance: '0.00'
};

const getters = {
	hasLogin: state => state.hasLogin,
	userInfo: state => state.userInfo,
	cartData: state => state.cartData
};

function addCart(good, cb) {
	CartAPI.addCart({
		goodsId: good.id,
		goodsMc: good.name,
		dj: good.price,
		sl: good.number,
		createBy: good.buyUser,
		gmfs: good.gmfs,
		createName: good.createName,
		createDate: new Date(),
		zfzt: 0 
	}).then(res => {
		uni.showToast({
			title: '添加成功'
		});
		if (typeof cb == 'function') cb();
	});
};

function updateCart(good, cb) {
	good.zj = good.dj * good.sl;
	delete good.createDate;
	delete good.checked;
	delete good.jssj;
	delete good.ddId;
	good = JSON.stringify(good);
	CartAPI.updateCart(good).then(res => {
		uni.showToast({
			title: '添加成功'
		});
		if (typeof cb == 'function') cb();
	});
}

function clearCart(cb) {
	let user = uni.getStorageSync('user').userName;
	CartAPI.clearCart({
		createdBy: user
	}).then(res => {
		if (typeof cb == 'function') cb();
	});
}


function getPicUrl(url) {
	return req.BASE_URL + url;
}

function updateUserKid(kid,cb) {
	let user = uni.getStorageSync('user');
	user.kid = kid;
	delete user.updateDate;
	delete user.createDate;
	LoginAPI.wxLogin(user).then(res => {
		console.info('更新kid', res.data);
		uni.removeStorageSync('user');
		uni.setStorageSync('user', res.data.data); 
		uni.removeStorage({
			key: 'share-kid'
		});
		if (typeof cb == 'function') cb();
	});
}

const mutations = {
	login(state, token) {
		state.hasLogin = true;
		uni.setStorage({ 
			key: 'TOKEN',
			data: token
		})
	},

	logout(state) {
		state.hasLogin = false;
		state.userInfo = {};
		state.cartData = [];
		state.addressList = [];
		state.isEnterpriseAdmin = false;
		state.isEnterpriseUser = false;
		state.orderObj = {};
		uni.removeStorage({
			key: 'userName'
		});
		uni.removeStorage({
			key: 'userData'
		});
		// token
		uni.removeStorage({
			key: 'TOKEN'
		});
		uni.removeStorage({
			key: 'auth-code'
		});
		uni.removeStorage({
			key: 'openid'
		});
		uni.removeStorage({
			key: 'unionid'
		});
		uni.removeStorage({
			key: 'user'
		});
		uni.removeTabBarBadge({
			index: 1
		});

	},

	getToken(state) {
		return uni.getStorageSync("TOKEN");
	},

	getCart(state, cb) {
		let user = uni.getStorageSync('user').userName;
		CartAPI.cartList({
			username: user
		}).then(res => {
			state.cartData = [];
			let cartData = res.data.obj.results;
			cartData.forEach(v => {
				v.checked = true;
				v.pic = getPicUrl(v.pic);
				state.cartData.push(v);
			});
			if (cartData.length) {
				uni.setTabBarBadge({
					index: 1,
					text: cartData.length.toString()
				})
			} else {
				uni.removeTabBarBadge({
					index: 1
				})
			}
			if (typeof cb == 'function') {
				cb();
			}
		});
	},

	addOrUpdateCart(state, newGood) {
		let flag = false;
		let good = {};
		state.cartData.forEach(v => {
			if (v.goodsId == newGood.id && v.gmfs == newGood.gmfs) {
				v.sl += newGood.number;
				good = v;
				flag = true;
			}
		})
		if (!flag) addCart(newGood, () => {
			this.commit('getCart');
		});
		else updateCart(good, () => {
			this.commit('getCart');
		});
	},

	initCart(state, cart) {
		if (cart) {
			state.cartData = [];
			cart.forEach(v => {
				state.cartData.push(v);
			});
		}
	},

	clearCart(state) {
		state.cartData = [];
		clearCart(() => {
			this.commit('getCart');
		});
	},

	changeGoodCount(state, option) {
		state.cartData.forEach(data => {
			let v = JSON.parse(JSON.stringify(data));
			if (v.id == option.good.id) {
				v.sl = option.sl;
				updateCart(v, () => {
					this.commit('getCart');
				});
			}
		})
	},
	statusChange(state, name, status) {
		state[name] = status;
		if(name == 'token_state' && status == false) this.commit('logout');
	},

	setOrderObj(state, obj) {
		state.orderObj = obj;
	},

	setAddressList(state, obj) {
		state.addressList = obj;
	},
	balanceUpdate(state, balance){
		state.balance = balance;
	},

	updateKid(state, id) {
		updateUserKid(id,()=>{
			state.isEnterpriseUser = true;
		});
	},
	
	updateIsEnterpriseUser(state, val) {
		state.isEnterpriseUser = val;
	},
	
	updateIsEnterpriseAdmin(state, val) {
		state.isEnterpriseAdmin = val;
	},
};
const actions = {
	getCart: ({
		commit
	}, cb) => {

		commit("getCart", cb);
	},
	addOrUpdateCart: ({
		commit
	}, good) => {
		commit("addOrUpdateCart", good);
	},

	initCart: ({
		commit
	}, cart) => {
		commit("initCart", cart);
	},

	clearCart: ({
		commit
	}) => {
		commit("clearCart", good);
	},

	changeGoodCount: ({
		commit
	}, option) => {
		commit("changeGoodCount", option);
	},
	statusChange: ({
		commit
	}, name, status) => {
		commit("statusChange", name, status);
	},
	setOrderObj: ({
		commit
	}, obj) => {
		commit("setOrderObj", obj);
	},
	setAddressList: ({
		commit
	}, obj) => {
		commit("setAddressList", obj);
	},
	updateKid: ({
		commit
	}, kid) => {
		commit("setAddressList", kid);
	},
	updateIsEnterpriseUser: ({
		commit
	}, val) => {
		commit("updateIsEnterpriseUser", val);
	},
	updateIsEnterpriseAdmin: ({
		commit
	}, val) => {
		commit("updateIsEnterpriseAdmin", val);
	},
};

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});
