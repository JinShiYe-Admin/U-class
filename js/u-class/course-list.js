/**
 * 课程列表組件
 */
Vue.component("course-list", {
	props: ['comdata'],
	template: '<ul class="mui-table-view mui-table-view-chevron">' +
		'<li  v-on:tap="clickcell(item)"  class="mui-table-view-cell mui-media" v-for="item in listData">' +
		'<a href="javascript:;">' +
		'<img class=" mui-pull-left" style="width: 106px;height: 60px;" :src="item.img_url">' +
		'<div class="mui-media-body" style="white-space: pre;font-size:12px;padding-right: 15px;color:#333333">' +
		'  {{item.name}}<p class="mui-ellipsis" style="margin-top: 5px;margin-left: 5px;font-size:10px;color:#999999">' +
		'<img style="width: 20px;height: 20px;vertical-align: middle;border-radius: 50%;" :src="item.teacher_img_url" alt="" />' +
		' {{item.teacher_name}}</p>' +
		'</div>' +
		'</a>' +
		'</li>' +
		'</ul>',
	data: function() {
		return {
			listData: [],
			totalPage: 0
		}
	},
	created: function() {
		console.log("创建时的参数数据:" + JSON.stringify(this.comdata));
	},
	watch: {
		'$props': {
			handler: function(val, oldVal) {
				console.log("改变后的参数数据：" + JSON.stringify(val));
				this.getListData();
			},
			deep: true
		}
	},
	computed: {

	},
	methods: {
		getListData: function() {
			var com = this;
			postDataPro_resList(this.comdata, function(response) {
				console.log("获取的课程列表：" + JSON.stringify(response));
				if(response.code == 0) {
					if(com.comdata.pageNumber === 1) {
						com.listData = response.data.list;
						com.totalPage = response.data.totalPage
// 						if(findCourse.flag == 1) {
// 							pullRefresh.endPullDownToRefresh(); //结束下拉刷新
// 						}
					} else {
// 						if(response.data.list.length == 0) {
// 							pullRefresh.endPullUpToRefresh(true);
// 							return;
// 						}
						com.listData = com.listData.concat(response.data.list);
						com.totalPage = response.data.totalPage
						// pullRefresh.endPullUpToRefresh();
					}
				} else {
// 					if(com.comdata.pageNumber === 1) {
// 						if(findCourse.flag == 1) {
// 							pullRefresh.endPullDownToRefresh(); //结束下拉刷新
// 						}
// 					} else {
// 						pullRefresh.endPullUpToRefresh();
// 					}

					mui.toast('请检查网络')

				}
				com.$emit('requiredEnd', com.totalPage);
			});
		},
		clickcell: function(model) {
			var tempModel = {
				img_url: model.teacher_img_url,
				currentModel: model,
				subjectList: []
			}
			utils.openNewWindowWithData('../../html/animation-class/classPlaying.html', tempModel)
		}

	}
})
var pullRefresh

function addpullRefresh() {
	var deceleration = mui.os.ios ? 0.0009 : 0.0009;
	mui('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration: deceleration
	});
	pullRefresh = mui('.mui-scroll-wrapper .mui-scroll').pullToRefresh({
		down: {
			callback: function() {
				console.log('down');
					findCourse.comData.pageNumber = 0;
					findCourse.comData.pageNumber = 1;
					findCourse.flag = 1;
					pullRefresh.endPullDownToRefresh(); //结束下拉刷新
			}
		},
		up: {
			callback: function() {
				console.log('up');
				findCourse.comData.pageNumber++;
				pullRefresh.endPullUpToRefresh();
			}
		}
	});
}

function pulldownRefresh() {
	//		this.endPullDownToRefresh();
	findCourse.comData.pageNumber = 1;

}
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	findCourse.comData.pageNumber++
		this.endPullupToRefresh(false); //参数为true代表没有更多数据了。

}

window.addEventListener("showPop", function(e) {
	mui('#topPopover').popover('toggle')

})
window.addEventListener("filterChange", function(e) {
	window.scrollTo(0, 0);
	var data = e.detail.data;
	findCourse.pageNumber = 1;
	findCourse.flag = 0;
	if(data.length==0){
		findCourse.comData.subjectId=""//科目id
		findCourse.comData.gradeId="" //年级id
	}
	for(var i = 0; i < data.length; i++) {
		var key = data[i].key;
		findCourse.comData[key] = data[i].item.id
	}
	console.log(JSON.stringify(findCourse.comData))

})
mui('body').on('hidden', '.mui-popover', function(e) {
	var page = plus.webview.getWebviewById("u-home.html")
	mui.fire(page, 'showPop', {
		data: -1
	});
});
window.addEventListener("changePro", function(e) {
	console.log('改变省份')
	var index = e.detail.data;
	findCourse.comData.areaId = findCourse.provinces[index].id
	provinceInfo.currentPro = findCourse.provinces[index];

})