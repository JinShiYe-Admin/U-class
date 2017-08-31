/**
 * 老師列表組件
 */
Vue.component("tea-list", {
	props: ['comdata'],
	template: '<ul v-bind:class="[\'mui-table-view\']">' +
		'<li v-on:tap="clickcell(item)" v-for="(item,index) of listData" v-bind:class="[\'mui-table-view-cell\',\'cell-container\']">' +
		'<img v-bind:class="[\'tea-headImg\']" v-bind:src="item.img_url"/>' +
		'<div v-bind:class="[\'tea-info\']">' +
		'<p  style="white-space: pre;font-size:16px;color:#000000">  {{item.name}}</p>' +
		'<p  style="white-space: pre;font-size:14px;color:#a6a6a6">  {{item.school_name}}</p>' +
		'</div>' +
		'<input  style="white-space: pre;font-size:16px;color:#ff8a11;border-color:#ff8a11" v-bind:class="[\'tea-suject\']" type="button" v-bind:value="item.subjectList[0].name"/>' +
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
	updated: function() {
		console.log(JSON.stringify(this.listData))
		var div = document.getElementById("find-tea")
		console.log(div.innerHTML);
	},
	methods: {
		getListData: function() {
			var com = this;
			postDataPro_teacherList(this.comdata, function(response) {
				console.log("获取的老师列表：" + JSON.stringify(response));
				if(response.code == 0) {

					if(com.comdata.pageNumber === 1) {
						com.listData = response.data.list;
						com.totalPage = response.data.totalPage
					} else {
						com.listData = com.listData.concat(response.data.list);
						com.totalPage = response.data.totalPage
						pullRefresh.endPullUpToRefresh();

					}
				} else {

				}
				com.$emit('requiredEnd', com.totalPage);
			});
		},
		clickcell: function(model) {
			utils.openNewWindowWithData('teachSpace.html', model)
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
				setTimeout(function() {
					findTea.comData.pageNumber = 0;
					findTea.comData.pageNumber = 1
					pullRefresh.endPullDownToRefresh(); //结束下拉刷新
				}, 1000);
			}
		},
		up: {
			callback: function() {
				console.log('up');
				findTea.comData.pageNumber++
			}
		}
	});
}

window.addEventListener("showPop", function(e) {
	mui('#topPopover').popover('toggle')

})