var serviceType;
mui.init();
mui.plusReady(function() {
	var currentId = plus.webview.currentWebview().id;
	console.log(currentId)
	switch(currentId) {
		case 'find-teacher.html':
			{
				serviceType = 0
			}
			break;
		case 'find-course.html':
			{
				serviceType = 1
			}
			break;
		case 'source-home.html':
			{
				serviceType = 2
			}
			break;
		default:
			break;
	}
	var group = new webviewGroup(currentId, {
		items: [{
			id: "primary"+serviceType+".html",
			url: "primary.html",
			extras: {
				data: {
					schoolType: 0,
					serviceType: serviceType,
				}
			},
			styles: {
				top: "44px"
			}
		}, {
			id: "middle"+serviceType+".html",
			url: "middle.html",
			extras: {
				data: {
					schoolType: 1,
					serviceType: serviceType,
				}
			},
			styles: {
				top: "44px"
			}
		}, {
			id: "high"+serviceType+".html",
			url: "high.html",
			extras: {
				data: {
					schoolType: 2,
					serviceType: serviceType,
				}
			},
			styles: {
				top: "44px"
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

});
mui.back = function() {
	var _self = plus.webview.currentWebview();
	_self.close("auto");
}