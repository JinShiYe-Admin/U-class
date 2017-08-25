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
		'<img class="mui-media-object mui-pull-left" style="width: 40px;height: 40px;" :src="item.img_url">' +
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
						com.listData = com.listData.concat(response.data);
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
//	mui('#pullrefresh').pullRefresh().refresh(true);
	findsource.pageIndex = 1;
	setTimeout(function() {
//		getData(data);
		mui('#find-sourse').pullRefresh().endPulldown();

	}, 1000);
}
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {

	var pageIndex = findsource.comData.pageNumber++;
	if(pageIndex * 10 >= findsource.total) {
		setTimeout(function() {
			mui('#find-sourse').pullRefresh().endPullup(true); //参数为true代表没有更多数据了。

		}, 1000);
	} else {
		setTimeout(function() {
			data.listData = data.listData.concat(data.listData)
			mui('#find-sourse').pullRefresh().endPullup(false); //参数为true代表没有更多数据了。

		}, 1000);
	}

}