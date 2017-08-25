/**
 * 课程列表組件
 */
Vue.component("course-list", {
	props: ['comdata'],
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
window.addEventListener("showPop", function(e) {
	mui('#topPopover').popover('toggle')

})


