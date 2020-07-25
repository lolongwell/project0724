<template>
	<view class="_product-list" v-if="goodsList.length"><title-product-list class="product-list" title="好果推荐" url :data="goodsList"></title-product-list></view>
</template>

<script>
import ProductAPI from '../../api/product/product';
export default {
	name: 'RecommendFruit',
	props: {
		title: {
			type: String,
			default: ''
		},
		subTitle: {
			type: String,
			default: ''
		},
		color: {
			type: String,
			default: '#5a961e'
		},
		url: {
			type: String
		},
		more: {
			type: Boolean,
			default: false
		},
		data: {
			type: Array
		}
	},
	data() {
		return {
			goodsList: []
		};
	},
	onShow() {
		this.lD();
	},
	methods: {
		lD() {
			ProductAPI.productList({ spfl: 8 }).then(res => {
                let data = res.data.obj.results;
				console.info('好果推荐', data);
				data.forEach(v => {
					let o = Object.assign(v,{id: v.id,
						title: v.name,
						price: v.price,
						label: v.gs,
						pic: this.pL(v.pic),
						unit: '',
						describe: v.gs});
					this.goodsList.push(o);
				});
			});
        },
        pL(url) {
            return this.$request.BASE_URL + url;
        }
	}
};
</script>

<style lang="scss" scoped></style>
