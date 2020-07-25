<<<<<<< HEAD
let h = require("../request").default;
let FileAPI = {
	getFileByName(n) {
		let o = {
		    scfile : {
				name: n
			},
		    dataGrid: {
		        "page": 1,
		        "rows": 1,
		        "order": "desc",
		        "sort": "createDate"
		    }
		}
		o = JSON.stringify(o);
		return h.postJson(`rest/yrgdata/scfile_datagrid`, o,false);
	},
}

=======
let h = require("../request").default;
let FileAPI = {
	getFileByName(n) {
		let o = {
		    scfile : {
				name: n
			},
		    dataGrid: {
		        "page": 1,
		        "rows": 1,
		        "order": "desc",
		        "sort": "createDate"
		    }
		}
		o = JSON.stringify(o);
		return h.postJson(`rest/yrgdata/scfile_datagrid`, o,false);
	},
}

>>>>>>> 05232aaefa7234ff056f9dfa7fb4717261c85e28
export default FileAPI;