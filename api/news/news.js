<<<<<<< HEAD
let h = require("../request").default;

let newsAPI = {
	newsList(d) {
		let o = {
		    news : {"xwfl":d.xwfl},
		    dataGrid: {
		        "field": "id,spfl,name",
		        "page": 1,
		        "rows": 1000,
		        "order": "desc",
		        "sort": "createDate"
		    }
		}
		o = JSON.stringify(o);
		return h.postJson(`rest/yrgdata/news_datagrid`, o, false);
    },
    
    articleDetail(id){
        return h.postJson(`rest/yrgdata/goNewsUpdate?id=${id}`, {}, false);
    }
}

=======
let h = require("../request").default;

let newsAPI = {
	newsList(d) {
		let o = {
		    news : {"xwfl":d.xwfl},
		    dataGrid: {
		        "field": "id,spfl,name",
		        "page": 1,
		        "rows": 1000,
		        "order": "desc",
		        "sort": "createDate"
		    }
		}
		o = JSON.stringify(o);
		return h.postJson(`rest/yrgdata/news_datagrid`, o, false);
    },
    
    articleDetail(id){
        return h.postJson(`rest/yrgdata/goNewsUpdate?id=${id}`, {}, false);
    }
}

>>>>>>> 05232aaefa7234ff056f9dfa7fb4717261c85e28
export default newsAPI;