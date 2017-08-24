/**
 * 老師列表組件
 */
Vue.component("tea-list", {
	template: '<ul v-bind:class="[\'mui-table-view\']">' +
		'<li v-for="(item,index) of listData" v-bind:class="[\'mui-table-view-cell\']">' +
		'<a>' +
		'<img/>' +
		'<div></div>' +
		'<input v-bind:type="button"/>'
	'</a>' +
	'</li>' +
	'</ul>',
	data: function() {
		return {
			listData: [],
			pageIndex: 1,
			totalPage: 0
		}
	},
	created: function() {

	},
	watch: {
		'$route' (to, from) {

		}
	},
	computed: {
		getListData: function() {
			this.listData = data;
		}
	},
	methods: {

	}
})