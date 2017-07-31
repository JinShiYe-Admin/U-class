mui.init({
	swipeBack: false,
	keyEventBind: {
		backbutton: false //关闭back按键监听
	},
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style: 'circle',
			offset: '50px',
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
var vm = new Vue({
	el: '#school',
	data: {
		serviceType: '',
		items: []
	}
});
mui.plusReady(function() {
	var data = plus.webview.currentWebview().data;
	console.log(JSON.stringify(data));
	getData(data);
	vm.serviceType = data.serviceType;
})

function getData(model) {
	switch(model.serviceType) {
		case 0:
			{
				getTeacher(model.schoolType);
			}
			break;
		case 1:
			{
				getCourse(model.schoolType);
			}
			break;
		default:
			break;
	}
}

function getTeacher(schoolType) {
	var data = [{
			id: 1,
			name: '陈世新',
			school: '大营小学',
			type: '科学'
		},
		{
			id: 2,
			name: '李连军',
			school: '大营小学',
			type: '数学'
		},
		{
			id: 1,
			name: '王春霞',
			school: '大营小学',
			type: '美术'
		}
	]
	vm.items = data;
}

function getCourse(schoolType) {

}
var count = 0;

function pulldownRefresh() {
	console.log(123)
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPulldown();
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		for(var i = cells.length, len = i + 20; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.innerHTML = '<a class="mui-navigate-right">小学-Item ' + (i + 1) + '</a>';
			table.appendChild(li);
		}
	}, 1000);
}
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		for(var i = cells.length, len = i + 20; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.innerHTML = '<a class="mui-navigate-right">小学-Item ' + (i + 1) + '</a>';
			table.appendChild(li);
		}
	}, 1000);
}