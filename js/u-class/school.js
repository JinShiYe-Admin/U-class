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
		serviceType: '',
		schoolType: '',
		items: []
	},
	updated: function() {

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
		window.scrollTo(0, 0);
		var data = e.detail.data;
		console.log(JSON.stringify(data))
		vm.pageIndex = 1;
		data.schoolType = vm.schoolType;
		data.serviceType = vm.serviceType
		getData(data)

	})
	window.addEventListener("showPop", function(e) {
		var data = e.detail.data;
		if(data=='show'){
			mui('#topPopover').popover('show')
		}else{
			mui('#topPopover').popover('hide')
		}
		

	})

	var data = plus.webview.currentWebview().data;
	switch(data.serviceType) {
		case 0:
			{
				vm.bottom = '250px'
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
				getTeacher(model.schoolType);
			}
			break;
		case 1:
			{
				getCourse(model.schoolType);
			}
			break;
		case 2:
			{
				getSourse(model.schoolType);
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
			id: 3,
			name: '王春霞',
			school: '大营小学',
			type: '美术'
		}, {
			id: 4,
			name: '陈世新',
			school: '大营小学',
			type: '科学'
		},
		{
			id: 5,
			name: '李连军',
			school: '大营小学',
			type: '数学'
		},
		{
			id: 6,
			name: '王春霞',
			school: '大营小学',
			type: '美术'
		}, {
			id: 7,
			name: '陈世新',
			school: '大营小学',
			type: '科学'
		},
		{
			id: 8,
			name: '李连军',
			school: '大营小学',
			type: '数学'
		},
		{
			id: 9,
			name: '王春霞1',
			school: '大营小学',
			type: '美术'
		},
		{
			id: 10,
			name: '王春霞2',
			school: '大营小学',
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

mui('body').on('tap', '.mui-content', function() {
	var page = plus.webview.getWebviewById('u-home.html');
	//触发目标页面的listener事件
	mui.fire(page, 'toUHome', {
		data: ''
	});
	page = plus.webview.getWebviewById('source-home.html');
	//触发目标页面的listener事件
	mui.fire(page, 'toUHome', {
		data: ''
	});
});

function toTeaInfo(teaInfo) {
	utils.openNewWindowWithData('../u-class/teachSpace.html', teaInfo)
}

function download(btn) {
	utils.openNewWindowWithData('../utils/download.html', {

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

	mui.fire(page, 'hidePop', {
		data
	});
	mui('#topPopover').popover('toggle')

})
mui('body').on('shown', '.mui-popover', function(e) {
	//console.log('shown', e.detail.id);//detail为当前popover元素
});
mui('body').on('hidden', '.mui-popover', function(e) {
	var page = plus.webview.getWebviewById('source-home.html')
	mui.fire(page, 'hidePop', {});
});