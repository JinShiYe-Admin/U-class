var data = {
	listData: [],
	totalPage: 0

}
/**
 * 资源列表組件
 */
Vue.component("source-list", {
	props: ['comdata'],
	template: '<ul class="mui-table-view mui-table-view-chevron">' +
		'<li class="mui-table-view-cell mui-media" v-for="item in listData">' +
		'<a href="javascript:;">' +
		'<img class="mui-media-object mui-pull-left" style="width: 40px;height: 40px;" src="../../images/utils/img-teacher-bg2.png">' +
		'<div class="mui-media-body">' +
		'{{item.name}}' +
		'<p style="font-size: 12px;">{{item.create_time}}</p>' +
		'</div>' +
		'<button :id="item.id" style="margin-top: -10px;"  onclick="download(this)" type="button" class="mui-btn mui-btn-warning mui-btn-outlined mui-pull-right">下载</button>' +
		'</a>' +
		'</li>' +
		'</ul>',
	data: function() {
		return data;
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
				console.log("获取的资源列表：" + JSON.stringify(response));
				if(response.code == 0) {
					if(com.comdata.pageNumber === 1) {
						com.listData = response.data.list;
						com.totalPage = response.data.totalPage
					} else {
						com.listData = com.listData.concat(response.data.list);
						console.log('列表条数：' + com.listData.length)
						com.totalPage = response.data.totalPage
					}
				} else {

				}
				com.$emit('requiredEnd', com.totalPage);
			});
		}

	}
})

window.addEventListener("showPop", function(e) {
	mui('#topPopover').popover('toggle')

})

function pulldownRefresh() {
	findsource.comData.pageNumber = 1;
	mui('#pullrefresh').pullRefresh().endPulldown();

}
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	findsource.comData.pageNumber++;
	this.endPullupToRefresh(false); //参数为true代表没有更多数据了。

}
window.addEventListener("filterChange", function(e) {
	window.scrollTo(0, 0);
	var data = e.detail.data;
	console.log(JSON.stringify(data))

})

function download(btn) {
	console.log(123)
	utils.showWebAndFireWinListen('../utils/download.html', 'addDownLoad', {
		url: "https://www.baidu.com/img/bd_logo.png",
		name: "bd_logo.png",
		size: "123456"

	})
}