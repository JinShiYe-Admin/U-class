var courseData = {
		items: [],
		pageIndex: 1,
		totalPage: 0
}
/**
 * 老師列表組件
 */
Vue.component("course-list", {
	template: '<ul class="mui-table-view mui-table-view-chevron">'+
						'<li class="mui-table-view-cell mui-media" v-for="item in items">'+
							'<a href="javascript:;">'+
								'<img class=" mui-pull-left" style="width: 100px;height: 60px;" :src="item.image">'+
								'<div class="mui-media-body" style="white-space: pre;">'+
								'{{item.courseName}}<p class="mui-ellipsis" style="margin-top: 5px;margin-left: 5px;">'+
								'<img style="width: 20px;height: 20px;vertical-align: text-bottom;" src="../../images/utils/default_personalimage.png" alt="" />'+
								'{{item.teaName}}</p>'+
								'</div>'+
							'</a>'+
						'</li>'+
					'</ul>',
	data: function() {
		return courseData
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