var paraObj = {
	serviceType: '',
	top: ''

}
mui.init();
var main;
mui.plusReady(function() {
	var currentId = plus.webview.currentWebview().id;
	if(currentId == 'source-home.html') { //
		main = plus.webview.currentWebview();
		main.addEventListener('show', showWeb, false); //增加窗口显示的监听
	} else {
		setSubPage()
	}

});

function showWeb() {
	console.log('显示资源界面')
	var province = window.myStorage.getItem('province');
	var currProvince = document.getElementById("province")

	if(currProvince.innerHTML == '') {
		currProvince.innerHTML = province.name;
		//初始化界面
		setSubPage()

	} else if(province.name == currProvince.innerHTML) {
		return;
	} else {
		currProvince.innerHTML = province.name;
		//重新获取数据
		updateData();
	}

}

function setSubPage() {
	var province = window.myStorage.getItem('province');
	var currProvince = document.getElementById("province")
	var items = document.getElementsByClassName('mui-control-item')
	for(var i = 0; i < items.length; i++) {
		var item = items[i]
		item.setAttribute('data-province', province.name);
	}

	var currentId = plus.webview.currentWebview().id;
	switch(currentId) {
		case 'find-teacher.html':
			{
				paraObj.serviceType = 0;
				paraObj.top = '44px'
			}
			break;
		case 'find-course.html':
			{
				paraObj.serviceType = 1;
				paraObj.top = '44px'
			}
			break;
		case 'source-home.html':
			{
				paraObj.serviceType = 2;
				paraObj.top = '88px'
			}
			break;
		default:
			break;
	}
	var group = new webviewGroup(currentId, {
		items: [{
			id: "primary" + paraObj.serviceType + ".html",
			url: "../utils/school.html",
			extras: {
				data: {
					schoolType: 0,
					serviceType: paraObj.serviceType,
				}
			},
			styles: {
				top: paraObj.top
			}
		}, {
			id: "middle" + paraObj.serviceType + ".html",
			url: "../utils/school.html",
			extras: {
				data: {
					schoolType: 1,
					serviceType: paraObj.serviceType,
				}
			},
			styles: {
				top: paraObj.top
			}
		}, {
			id: "high" + paraObj.serviceType + ".html",
			url: "../utils/school.html",
			extras: {
				data: {
					schoolType: 2,
					serviceType: paraObj.serviceType,
				}
			},
			styles: {
				top: paraObj.top
			}
		}],
		onChange: function(obj) {
			var c = document.querySelector(".mui-control-item.mui-active");
			if(c) {
				c.classList.remove("mui-active");
			}
			document.querySelector(".mui-scroll .mui-control-item:nth-child(" + (parseInt(obj.index) + 1) + ")").classList.add("mui-active");
		}
	});
	mui(".mui-scroll").on("tap", ".mui-control-item", function(e) {
		var wid = this.getAttribute("data-wid");
		var currProvince = this.getAttribute("data-province");
		group.switchTab(wid);
		var province = window.myStorage.getItem('province');
		if(province.name == currProvince) {
			return;
		} else {
			//重新获取数据
			this.setAttribute('data-province', province.name)
			updateData();
		}
		var page = plus.webview.getWebviewById('u-home.html');
		//触发目标页面的listener事件
		mui.fire(page, 'toUHome', {
			data: wid
		});
		page = plus.webview.getWebviewById('source-home.html');
		//触发目标页面的listener事件
		mui.fire(page, 'toUHome', {
			data: wid
		});
	});
}

function toFilter() {
	var c = document.querySelector(".mui-control-item.mui-active");
	var id = c.getAttribute('data-wid');
	//	var currentId = plus.webview.currentWebview().id;
	var type;
	if(paraObj.serviceType == 1) {
		type = 0;
	} else {
		type = 1
	}
	utils.openNewWindowWithData('../utils/filter.html', {
		type: type,
		webId: id,
		winId: 'filterChange'
	})
}
mui('body').on('tap', '.mui-content', function() {
	var page = plus.webview.getWebviewById('u-home.html');
	//触发目标页面的listener事件
	mui.fire(page, 'toUHome', {
		data: ''
	});
});
var urlId = 'primary2.html';
//点击popover里cell
mui('.mui-popover').on('tap', 'li', function(e) {
	var page = plus.webview.getWebviewById(urlId)
	mui.fire(page, 'showPop', {
		data: 'hide'
	});
	var name = this.querySelector(".mui-media-body").innerHTML
	var province = document.getElementById("province")
	province.innerHTML = name;
	mui('#topPopover').popover('toggle')
	var data = {
		name: name,
	}
	window.myStorage.setItem('province', data);
	updateData();

})
window.addEventListener("toUHome", function(e) {
	mui('#topPopover').popover('hide')
	if(e.detail.data == '') {
		return;
	}
	urlId = e.detail.data;
})
window.addEventListener("hidePop", function(e) {
	mui('#topPopover').popover('hide')
	var province = window.myStorage.getItem('province');
	var name = province.name
	var currProvince = document.getElementById("province")
	currProvince.innerHTML = province.name;
	if(province.name == currProvince.innerHTML) {
		return;
	} else {
		//重新获取数据
		updateData();
	}

})

function updateData() {
	console.log('刷新数据')
	var data = window.myStorage.getItem('province')
	var page = plus.webview.getWebviewById(urlId)
	mui.fire(page, 'provinceChange', {
		data
	});
}

function showPop() {
	var page = plus.webview.getWebviewById(urlId)
	mui.fire(page, 'showPop', {
		data: 'show'
	});
	mui('#topPopover').popover('toggle')

}
mui('body').on('shown', '.mui-popover', function(e) {
	//console.log('shown', e.detail.id);//detail为当前popover元素
});
mui('body').on('hidden', '.mui-popover', function(e) {
	var page = plus.webview.getWebviewById(urlId)
	mui.fire(page, 'showPop', {
		data: 'hide'
	});
});

//mui.back = function() {
//	var _self = plus.webview.currentWebview();
//	_self.close("auto");
//}