var paraObj = {
	serviceType: '',
	pathPrefix: '',
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
	setSubPage();
	main.removeEventListener('show', showWeb); //移除窗口显示的监听

}

function setSubPage() {
	var currentId = plus.webview.currentWebview().id;
	console.log(currentId)
	switch(currentId) {
		case 'find-teacher.html':
			{
				paraObj.serviceType = 0;
				paraObj.pathPrefix = '';
				paraObj.top = '44px'
			}
			break;
		case 'find-course.html':
			{
				paraObj.serviceType = 1;
				paraObj.pathPrefix = '';
				paraObj.top = '44px'
			}
			break;
		case 'source-home.html':
			{
				paraObj.serviceType = 2;
				paraObj.pathPrefix = '../u-class/';
				paraObj.top = '88px'
			}
			break;
		default:
			break;
	}
	var group = new webviewGroup(currentId, {
		items: [{
			id: "primary" + paraObj.serviceType + ".html",
			url: paraObj.pathPrefix + "primary.html",
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
			url: paraObj.pathPrefix + "middle.html",
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
			url: paraObj.pathPrefix + "high.html",
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
		group.switchTab(wid);
	});

}
mui.back = function() {
	var _self = plus.webview.currentWebview();
	_self.close("auto");
}