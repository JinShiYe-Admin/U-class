/**
 * 老師列表組件
 */
Vue.component("tea-list", {
	props: ['comdata'],
	template: '<ul v-bind:class="[\'mui-table-view\']">' +
		'<li v-for="(item,index) of listData" v-bind:class="[\'mui-table-view-cell\']">' +
		'<a>' +
		'<img/>' +
		'<div></div>' +
		'<input v-bind:type="button"/>' +
		'</a>' +
		'</li>' +
		'</ul>',
	data: function() {
		return {
			listData: []
		}
	},
	created: function() {
		console.log("参数数据:" + JSON.stringify(this.comdata));
	},
	watch: {
		comData: function(newVal, oldVal) {
			console.log("获取的新值:" + JSON.stringify(newVal));
			console.log("获取的旧值:" + JSON.stringify(oldVal));
		}
	},
	computed: {

	},
	methods: {
		getListData: function() {
			var com = this;
			this.comData.pageSize = 10;
			postDataPro_teacherList(this.comData, function(data) {
				if(comData.pageNumber === 1) {
					com.listData = data.data
				} else {
					com.listData = com.listData.concat(data.data);
				}
				com.$emit('requiredEnd');
			});
		}

	}
})