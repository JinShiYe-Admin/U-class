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
		'<div class="mui-media-body"  style="white-space: pre;font-size:16px;color:#353535">' +
		'{{item.name}}' +
		'<p style="font-size: 12px;">{{item.create_time}}</p>' +
		'</div>' +
		'<button :id="item.id" style="margin-top: -10px;background-color:#edf9ff;color:#37b9fe;font-size:15px;border-color:#37b9fe"  @click="download(item)" type="button" class="mui-btn mui-btn-warning mui-btn-outlined mui-pull-right">下载</button>' +
		'</a>' +
		'</li>' +
		'</ul>',
	data: function() {
		return data;
	},
	created: function() {
		console.log("创建时的参数数据:" + JSON.stringify(this.comdata));
		this.getListData();
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
		},
		download: function(model) {
			utils.showWebAndFireWinListen('../utils/download.html', 'addDownLoad', {
				url: model.download_link,
				name: model.name,
				size: model.file_size

			})
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
	findsource.pageNumber = 1;
	for(var i = 0; i < data.length; i++) {
		var key = data[i].key;
		findsource.comData[key] = data[i].item.id
	}
	console.log(JSON.stringify(findsource.comData))

})