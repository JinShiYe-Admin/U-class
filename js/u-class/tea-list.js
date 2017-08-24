/**
 * 老師列表組件
 */
Vue.component("tea-list", {
	props: ['pageIndex', 'totalPage'],
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
			listData: [],
			periodId: this.$route.params.periodId,
			areaId: this.$route.params.areaId
		}
	},
	created: function() {
		console.log("当前数据的periodId" + this.$route.params.periodId);
		console.log("当前老师列表的areaId" + this.$route.params.areaId);
	},
	watch: {
		'$route' (to, from) {
			console.log("当前数据的periodId" + this.$route.params.periodId);
			console.log("当前老师列表的areaId" + this.$route.params.areaId);
		}
	},
	computed: {

	},
	methods: {
		getListData: function() {
			var com = this;
			var comData = {
				pageNumber: com.pageIndex, //当前页数
				pageSize: 10, //每页显示的记录数
				periodId: com.periodId, //学段id
				areaId: com.areaId, //省/市/区/县的id
				subjectId: '' //科目id
			}
			postDataPro_teacherList(comData, function(data) {
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