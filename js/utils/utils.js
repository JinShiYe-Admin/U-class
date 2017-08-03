//页面出错的处理
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
	console.log("---ERROR---页面出现错误---start---");
	console.log("错误信息-0:" + JSON.stringify(errorMessage.detail));
	console.log("错误信息-1:" + errorMessage);
	console.log("出错文件:" + scriptURI);
	console.log("出错行号:" + lineNumber);
	console.log("出错列号:" + columnNumber);
	console.log("错误详情:" + errorObj);
	console.log("---ERROR---页面出现错误---end---");

	var webUrl = window.location.toString();
	var ids = webUrl.split("/");
	var webId = ids[ids.length - 1];
	var showAlert = false;
	switch(webId) {
		case "index.html": //主页
		case "u-home.html": //优课主页
		case "source-home.html": //资源主页
		case "ani-home.html": //动画课主页
		case "download.html": //下载列表
			break;
		default:
			showAlert = true;
			break;
	}

	if(window.plus) {
		if(showAlert) {
			plus.nativeUI.alert('当前界面加载出现错误', function() {
				plus.webview.close(webId, utils.getAniClose());
			}, 'ERROR', '确定');
		} else {
			plus.nativeUI.toast('当前界面加载出现错误');
		}
	} else {
		window.alert("当前界面加载出现错误");
	}

}

/**
 * 使用频繁的公共方法
 * 1.打开新界面
 * 2.触发页面的window监听
 * 3.触发页面的window监听并显示页面
 * 4.预加载页面
 * 5.获取url路径的id
 * 6.默认webview的样式(tips:安卓中video标签播放视频需要开启硬件加速)
 * 7.获取关闭的动画
 * 8.获取显示的动画
 * 9.初始化mui的scrollY
 * 10.返回一个安卓手机返回键无法关闭的等待框
 * 11.关闭一个或所有的等待框
 */
var utils = (function(mod) {
	mod.showWebTime = 250; //打开页面的动画持续时间
	mod.openWeb = false; //是否是打开页面状态
	mod.openWebTime = 1000; //打开页面持续时间，默认1秒

	/**
	 * 1.打开新界面
	 * @param {String} targetPage 必填 新页面路径
	 * @param {Object} data 选填 传递的数据
	 */
	mod.openNewWindowWithData = function(tarPagePath, data) {
		if(mod.openWeb) {
			return false;
		}
		mod.openWeb = true;
		setTimeout(function() {
			mod.openWeb = false;
		}, mod.openWebTime);

		var tarPageId = mod.getWebUrlId(tarPagePath);
		var targetPage = plus.webview.getWebviewById(tarPageId);
		if(targetPage) {
			targetPage.show('slide-in-right', mod.showWebTime);
		} else {
			mui.openWindow({
				url: tarPagePath,
				id: tarPageId,
				extras: {
					data: data
				},
				show: {
					anishow: 'slide-in-right',
					duration: mod.showWebTime
				},
				waiting: {
					title: '正在加载...'
				},
				styles: mod.getWebStyle(tarPagePath)
			})
		}
	}

	/**
	 * 2.触发页面的window监听
	 * @param {Object} webId 必填 页面id或者路径
	 * @param {Object} winListenId 必填 页面window监听的id
	 * @param {Object} data 选填 传递的数据
	 */
	mod.fireWinListen = function(webId, winListenId, data) {
		var pageId = mod.getWebUrlId(webId);
		var page = plus.webview.getWebviewById(pageId);
		if(page) {
			//触发目标页面的listener事件
			mui.fire(page, winListenId, {
				data: data
			});
		}
	}

	/**
	 * 3.显示页面并触发页面的window监听
	 * @param {Object} webId 必填 页面id或者路径
	 * @param {Object} winListenId 选填 页面window监听的id
	 * @param {Object} data 选填 触发监听时传递的数据
	 */
	mod.showWebAndFireWinListen = function(webId, winListenId, data) {
		var pageId = mod.getWebUrlId(webId);
		var page = plus.webview.getWebviewById(pageId);
		if(page) {
			page.show('slide-in-right', 250);
			//触发目标页面的listener事件
			if(winListenId !== undefined && winListenId !== null && winListenId !== "") {
				mui.fire(page, winListenId, {
					data: data
				});
			}
		}
	}

	/**
	 * 4.预加载页面
	 * @param {Object} tarPagePath 必填 预加载 页面路径
	 * @param {Object} data 选填 页面路径
	 */
	mod.preloadWebWithData = function(tarPagePath, data) {
		var tarPageId = mod.getWebUrlId(tarPagePath);
		var targetPage = plus.webview.getWebviewById(tarPageId);
		if(!targetPage) {
			targetPage = mui.preload({
				url: tarPagePath,
				id: tarPageId,
				extras: {
					data: data
				},
				styles: mod.getWebStyle(tarPagePath)
			});
		}
		return targetPage;
	}

	/**
	 * 5.获取url路径的id
	 * @param {String} weburl 页面路径
	 * @return {String} id 页面id
	 */
	mod.getWebUrlId = function(weburl) {
		var ids = weburl.split('/');
		return ids[ids.length - 1];
	}

	/**
	 * 6.默认webview的样式
	 * @param {Object} path  webView的id或者路径
	 */
	mod.getWebStyle = function(path) {
		var styles = {
			top: '0px',
			bottom: '0px',
			softinputMode: "adjustResize",
			hardwareAccelerated: false //是否开启硬件加速
		};
		//安卓中video标签播放视频需要开启硬件加速
		var id = mod.getWebUrlId(path);
		switch(id) {
			case "classPlaying.html":
				styles.hardwareAccelerated = true;
				break;
		}
		return styles;
	}

	/**
	 * 7.获取关闭的动画
	 * @param {Object} num 类型，默认slide-out-right
	 */
	mod.getAniClose = function(num) {
		var ani = '';
		switch(num) {
			case 0:
				ani = 'auto';
				//自动选择显示窗口相对于的动画效果。
				break;
			case 1:
				ani = 'none';
				//立即关闭页面，无任何动画效果。 此效果忽略动画时间参数，立即关闭。
				break;
			case 2:
			default:
				ani = 'slide-out-right';
				//页面从屏幕中横向向右侧滑动到屏幕外关闭。
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 3:
				ani = 'slide-out-left';
				//页面从屏幕中横向向左侧滑动到屏幕外关闭。
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 4:
				ani = 'slide-out-top';
				//页页面从屏幕中竖向向上侧滑动到屏幕外关闭。
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 5:
				ani = 'slide-out-bottom';
				//页面从屏幕中竖向向下侧滑动到屏幕外关闭。
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 6:
				ani = 'fade-out';
				//页面从不透明到透明逐渐隐藏关闭。
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 7:
				ani = 'zoom-in';
				//页面逐渐向页面中心缩小关闭。
				//Android - 2.2+ (支持): 默认动画时间为100ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为100ms。
				break;
			case 8:
				ani = 'zoom-fade-in';
				//页面逐渐向页面中心缩小并且从不透明到透明逐渐隐藏关闭。
				//Android - 2.2+ (支持): 默认动画时间为100ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为100ms。
				break;
			case 9:
				ani = 'pop-out';
				//页面从屏幕右侧滑出消失，同时上一个页面带阴影效果从屏幕左侧滑入显示。
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
		}
		return ani;
	}

	/**
	 * 8.获取显示的动画
	 * @param {Object} num 类型，默认slide-in-right
	 */
	mod.getAniShow = function(num) {
		var ani = '';
		switch(num) {
			case 0:
				ani = "auto"
				//自动选择动画效果，使用上次显示窗口设置的动画效果，如果是第一次显示则默认动画效果“none”。
				break;
			case 1:
				ani = "none"
				//立即显示页面，无任何动画效果，页面显示默认的动画效果。 此效果忽略动画时间参数，立即显示
				break;
			case 2:
			default:
				ani = "slide-in-right"
				//页面从屏幕右侧外向内横向滑动显示
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 3:
				ani = "slide-in-left"
				//页面从屏幕左侧向右横向滑动显示
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 4:
				ani = "slide-in-top"
				//页面从屏幕上侧向下竖向滑动显示
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 5:
				ani = "slide-in-bottom"
				//页面从屏幕下侧向上竖向滑动显示
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 6:
				ani = "fade-in"
				//页面从完全透明到不透明逐渐显示
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 7:
				ani = "zoom-out"
				//页面在屏幕中间从小到大逐渐放大显示
				//Android - 2.2+ (支持): 默认动画时间为100ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为100ms。
				break;
			case 8:
				ani = "zoom-fade-out"
				//页面在屏幕中间从小到大逐渐放大并且从透明到不透明逐渐显示
				//Android - 2.2+ (支持): 默认动画时间为100ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为100ms。
				break;
			case 9:
				ani = "pop-in"
				//页面从屏幕右侧滑入显示，同时上一个页面带阴影效果从屏幕左侧滑出隐藏
				//Android - 2.2+ (支持): 默认动画时间为100ms。
				//此动画是新开窗口侧滑挤压当前屏幕窗口特效，必须是两个Webview窗口的组合动画，
				//如果当前屏幕已显示多个Webview窗口，则显示新窗口不支持此动画类型，自动转成“slide-in-right”。
				//iOS - 5.1.1+ (支持): 默认动画时间为100ms。
				break;
		}
		return ani;
	}

	/**
	 * 9.初始化mui的scrollY
	 * @param {Object} muiString
	 */
	mod.muiInitScrollY = function(muiString) {
		muiString = muiString || ".mui-scroll-wrapper";
		var deceleration = mui.os.ios ? 0.003 : 0.0009;
		mui(muiString).scroll({
			scrollY: true, //是否竖向滚动
			scrollX: false, //是否横向滚动
			indicators: true, //是否显示滚动条
			deceleration: deceleration, //阻尼系数,系数越小滑动越灵敏
			bounce: true, //是否启用回弹
		});
	}

	/**
	 * 10.返回一个安卓手机返回键无法关闭的等待框
	 * @param {Object} string 等待框显示的文字，默认'加载中...'
	 */
	mod.showWaiting = function(string) {
		var title = '加载中...';
		if(string !== undefined && string !== null) {
			title = string;
		}
		var showWaiting = plus.nativeUI.showWaiting(title, {
			back: 'none'
		});
		return showWaiting;
	}

	/**
	 * 11.关闭一个或所有的等待框
	 * @param {Object} waiting 等待框对象
	 */
	mod.closeWaiting = function(waiting) {
		if(waiting) {
			waiting.close();
		} else {
			plus.nativeUI.closeWaiting();
		}
	}

	return mod;
})(window.utils || {});