mui.init({
	swipeBack: false,
	keyEventBind: {
		backbutton: false //关闭back按键监听
	},
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style: 'circle',
			offset: '0px',
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
var vm = new Vue({
	el: '#pullrefresh',
	data: {
		bottom: '250px',
		pageIndex: 1,
		total: 0,
		serviceType: 0,
		schoolType: 0,
		provinceInfo: {},
		items: []
	},
	updated: function() {
//		var div = document.getElementById("pullrefresh");
//		console.log('11111111'+div.innerHTML);
	}
});
mui.plusReady(function() {
	window.addEventListener("filterChange", function(e) {
		window.scrollTo(0, 0);
		var data = e.detail.data;
		console.log(JSON.stringify(data))
		vm.pageIndex = 1;
		data.schoolType = vm.schoolType;
		data.serviceType = vm.serviceType
		getData(data)

	})
	window.addEventListener("provinceChange", function(e) {
		console.log(11111)
		window.scrollTo(0, 0);
		var data = e.detail.data;
		console.log(JSON.stringify(data))
		vm.pageIndex = 1;
		data.schoolType = vm.schoolType;
		data.serviceType = vm.serviceType
		getData(vm)

	})
	window.addEventListener("showPop", function(e) {
		var data = e.detail.data;
		if(data == 'show') {
			mui('#topPopover').popover('show')
		} else {
			mui('#topPopover').popover('hide')
		}

	})

	var data = plus.webview.currentWebview().data;
	switch(data.serviceType) {
		case 0:
			{
				vm.bottom = '250px'
				mui('body').on('tap', '.mui-content', function() {
					var page = plus.webview.getWebviewById('u-home.html');
					//触发目标页面的listener事件
					mui.fire(page, 'toUHome', {
						data: ''
					});
				});
			}
			break;
		case 1:
			{
				vm.bottom = '80px'
			}
			break;
		case 2:
			{
				vm.bottom = '80px'
			}
			break;
		default:
			break;
	}
	getData(data);
	vm.serviceType = data.serviceType;
})

function getData(model) {
	switch(model.serviceType) {
		case 0:
			{
				getTeacher(model);
			}
			break;
		case 1:
			{
				getCourse(model);
			}
			break;
		case 2:
			{
				getSourse(model);
			}
			break;
		default:
			break;
	}
}

function getTeacher(model) {
	//8、分页获取教师列表
	var commonData = {
		pageNumber: 1, //当前页数
		pageSize: 20, //每页显示的记录数
		periodId: model.period, //学段id
		//		areaId: '', //省/市/区/县的id
		//		subjectId: '' //科目id
	}
	postDataPro_teacherList(commonData, function(data) {
		vm.total = data.totalRow;
		if(vm.pageIndex == 1) {
			vm.items = data.data.list;
		} else {
			vm.items = vm.items.concat(data);
		}

	})

}

function getCourse(schoolType) {
	var data = [{
			id: 1,
			image: 'https://pic.36krcnd.com/avatar/201707/31133433/lbdbrk0crfxofgf9.jpeg!feature',
			courseName: '识字1',
			teaName: '李旭真',
			teaImg: '../../images/utils/default_personalimage.png'
		},
		{
			id: 2,
			image: 'https://pic.36krcnd.com/avatar/201707/31133433/lbdbrk0crfxofgf9.jpeg!feature',
			courseName: '11-20个数的认识',
			teaName: '殷先梅',
			teaImg: '../../images/utils/default_personalimage.png'
		},
		{
			id: 3,
			image: 'https://pic.36krcnd.com/avatar/201707/31133433/lbdbrk0crfxofgf9.jpeg!feature',
			courseName: '丑小鸭',
			teaName: '黄雅慧',
			teaImg: '../../images/utils/default_personalimage.png'
		},
		{
			id: 1,
			image: 'https://pic.36krcnd.com/avatar/201707/31133433/lbdbrk0crfxofgf9.jpeg!feature',
			courseName: '识字1',
			teaName: '李旭真',
			teaImg: '../../images/utils/default_personalimage.png'
		},
		{
			id: 2,
			image: 'https://pic.36krcnd.com/avatar/201707/31133433/lbdbrk0crfxofgf9.jpeg!feature',
			courseName: '11-20个数的认识',
			teaName: '殷先梅',
			teaImg: '../../images/utils/default_personalimage.png'
		},
		{
			id: 3,
			image: 'https://pic.36krcnd.com/avatar/201707/31133433/lbdbrk0crfxofgf9.jpeg!feature',
			courseName: '丑小鸭',
			teaName: '黄雅慧',
			teaImg: '../../images/utils/default_personalimage.png'
		},
		{
			id: 1,
			image: 'https://pic.36krcnd.com/avatar/201707/31133433/lbdbrk0crfxofgf9.jpeg!feature',
			courseName: '识字1',
			teaName: '李旭真',
			teaImg: '../../images/utils/default_personalimage.png'
		},
		{
			id: 2,
			image: 'https://pic.36krcnd.com/avatar/201707/31133433/lbdbrk0crfxofgf9.jpeg!feature',
			courseName: '11-20个数的认识',
			teaName: '殷先梅',
			teaImg: '../../images/utils/default_personalimage.png'
		},
		{
			id: 3,
			image: 'https://pic.36krcnd.com/avatar/201707/31133433/lbdbrk0crfxofgf9.jpeg!feature',
			courseName: '丑小鸭',
			teaName: '黄雅慧',
			teaImg: '../../images/utils/default_personalimage.png'
		},
		{
			id: 1,
			image: 'https://pic.36krcnd.com/avatar/201707/31133433/lbdbrk0crfxofgf9.jpeg!feature',
			courseName: '识字1',
			teaName: '李旭真',
			teaImg: '../../images/utils/default_personalimage.png'
		}

	]
	vm.total = 55;
	if(vm.pageIndex == 1) {
		vm.items = data;
	} else {
		vm.items = vm.items.concat(data);
	}
}

function getSourse(schoolType) {
	var data = [{
			id: 1,
			name: '第十九课：在山的那一边',
			school: '上传时间:2017/06/07 下载:1076 格式:png',
			type: '科学'
		},
		{
			id: 2,
			name: '第十九课：在山的那一边',
			school: '上传时间:2017/06/07 下载:1076 格式:png',
			type: '数学'
		},
		{
			id: 1,
			name: '第十九课：在山的那一边',
			school: '上传时间:2017/06/07 下载:1076 格式:png',
			type: '美术'
		},
		{
			id: 1,
			name: '第十九课：在山的那一边',
			school: '上传时间:2017/06/07 下载:1076 格式:png',
			type: '科学'
		},
		{
			id: 2,
			name: '第十九课：在山的那一边',
			school: '上传时间:2017/06/07 下载:1076 格式:png',
			type: '数学'
		},
		{
			id: 1,
			name: '第十九课：在山的那一边',
			school: '上传时间:2017/06/07 下载:1076 格式:png',
			type: '美术'
		},
		{
			id: 1,
			name: '第十九课：在山的那一边',
			school: '上传时间:2017/06/07 下载:1076 格式:png',
			type: '科学'
		},
		{
			id: 2,
			name: '第十九课：在山的那一边',
			school: '上传时间:2017/06/07 下载:1076 格式:png',
			type: '数学'
		},
		{
			id: 1,
			name: '第十九课：在山的那一边',
			school: '上传时间:2017/06/07 下载:1076 格式:png',
			type: '美术'
		}, {
			id: 1,
			name: '第十九课：在山的那一边',
			school: '上传时间:2017/06/07 下载:1076 格式:png',
			type: '科学'
		},
		{
			id: 2,
			name: '第十九课：在山的那一边',
			school: '上传时间:2017/06/07 下载:1076 格式:png',
			type: '数学'
		},
		{
			id: 1,
			name: '第十九课：在山的那一边',
			school: '上传时间:2017/06/07 下载:1076 格式:png',
			type: '美术'
		}
	]
	vm.total = 55;
	if(vm.pageIndex == 1) {
		vm.items = data;
	} else {
		vm.items = vm.items.concat(data);
	}
}

function toTeaInfo(teaInfo) {
	utils.openNewWindowWithData('../u-class/teachSpace.html', teaInfo)
}

function download(btn) {
	console.log(123)
	utils.showWebAndFireWinListen('../utils/download.html', 'addDownLoad', {
		url: "https://www.baidu.com/img/bd_logo.png",
		name: "bd_logo.png",
		size: "123456"

	})
}
var count = 0;

function pulldownRefresh() {
	mui('#pullrefresh').pullRefresh().refresh(true);
	vm.pageIndex = 1;
	var data = {
		schoolType: vm.schoolType,
		serviceType: vm.serviceType
	}
	setTimeout(function() {
		getData(data);
		mui('#pullrefresh').pullRefresh().endPulldown();

	}, 1000);
}
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {

	vm.pageIndex++;
	console.log('pageIndex:' + vm.pageIndex)
	if(vm.pageIndex * 10 >= vm.total) {
		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().endPullup(true); //参数为true代表没有更多数据了。

		}, 1000);
	} else {
		var data = {
			schoolType: vm.schoolType,
			serviceType: vm.serviceType
		}

		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().endPullup(false); //参数为true代表没有更多数据了。
			getData(data);
		}, 1000);
	}

}
//点击popover里cell
mui('.mui-popover').on('tap', 'li', function(e) {
	var name = this.querySelector(".mui-media-body").innerHTML
	var id = this.getAttribute('id'); //省份id
	var data = {
		name: name,
		id: id
	}
	var page = plus.webview.getWebviewById('source-home.html')
	window.myStorage.setItem('province', data);

	mui.fire(page, 'hidePop', data);
	mui('#topPopover').popover('toggle')

})
mui('body').on('shown', '.mui-popover', function(e) {
	//console.log('shown', e.detail.id);//detail为当前popover元素
});
mui('body').on('hidden', '.mui-popover', function(e) {
	var page = plus.webview.getWebviewById('source-home.html')
	mui.fire(page, 'hidePop', {});
});
mui('body').on('tap', '.mui-popover', function(e) {
	console.log(1111111)
	var page = plus.webview.getWebviewById('source-home.html')
	mui.fire(page, 'hidePop', {});

});