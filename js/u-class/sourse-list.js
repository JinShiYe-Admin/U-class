var sourceData = {
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
								'<img class="mui-media-object mui-pull-left" style="width: 40px;height: 40px;" :src="item.img_url">'+
								'<div class="mui-media-body">'+
									'{{item.name}}'+
									'<p style="font-size: 12px;">{{item.school_name}}</p>'+
								'</div>'+
								'<button :id="item.id" style="margin-top: -10px;"  onclick="download(this)" type="button" class="mui-btn mui-btn-warning mui-btn-outlined mui-pull-right">下载</button>'+
							'</a>'+
						'</li>'+
					'</ul>',
	data: function() {
		return sourceData
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