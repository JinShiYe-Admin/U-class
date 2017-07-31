//页面出错
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
	//	console.log("---ERROR---页面出现错误---start---");
	//	console.log("错误信息-0:" + JSON.stringify(errorMessage.detail));
	//	console.log("错误信息-1:" + errorMessage);
	//	console.log("出错文件:" + scriptURI);
	//	console.log("出错行号:" + lineNumber);
	//	console.log("出错列号:" + columnNumber);
	//	console.log("错误详情:" + errorObj);
	//	console.log("---ERROR---页面出现错误---end---");

	var webUrl = window.location.toString();
	var ids = webUrl.split("/");
	var webId = ids[ids.length - 1];
	var showAlert = false;
	switch(webId) {
		case "index.html": //主页
		case "u-home.html": //优课主页
		case "source-home.html": //资源主页
		case "ani-home.html": //动画课主页
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
//公共方法
var utils = (function(mod) {
	mod.showWebTime = 250; //打开页面的动画持续时间
	mod.openWeb = false; //是否是打开页面状态
	mod.openWebTime = 1000; //打开页面持续时间，默认1秒

	/**
	 * 打开新界面
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
	 * 触发页面的window监听
	 * @param {Object} webId 必填 页面id或者路径
	 * @param {Object} winListenId 必填 页面window监听的id
	 * @param {Object} data 选填 传递的数据
	 */
	mod.fireWebWinListen = function(webId, winListenId, data) {
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
	 * 获取url路径的id
	 * @param {String} weburl 页面路径
	 * @return {String} id 页面id
	 */
	mod.getWebUrlId = function(weburl) {
		var ids = weburl.split('/');
		return ids[ids.length - 1];
	}

	/**
	 * 默认webview的样式
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
		return styles;
	}

	/**
	 * 获取关闭的动画
	 * @author 莫尚霖
	 * @param {Object} num 类型，默认slide-out-right
	 */
	mod.getAniClose = function(num) {
		var aniClose = '';
		var type = num || 2; //默认2
		switch(type) {
			case 0:
				aniClose = 'auto';
				//自动选择显示窗口相对于的动画效果。
				break;
			case 1:
				aniClose = 'none';
				//立即关闭页面，无任何动画效果。 此效果忽略动画时间参数，立即关闭。
				break;
			case 2:
				aniClose = 'slide-out-right';
				//页面从屏幕中横向向右侧滑动到屏幕外关闭。
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 3:
				aniClose = 'slide-out-left';
				//页面从屏幕中横向向左侧滑动到屏幕外关闭。
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 4:
				aniClose = 'slide-out-top';
				//页页面从屏幕中竖向向上侧滑动到屏幕外关闭。
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 5:
				aniClose = 'slide-out-bottom';
				//页面从屏幕中竖向向下侧滑动到屏幕外关闭。
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 6:
				aniClose = 'fade-out';
				//页面从不透明到透明逐渐隐藏关闭。
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			case 7:
				aniClose = 'zoom-in';
				//页面逐渐向页面中心缩小关闭。
				//Android - 2.2+ (支持): 默认动画时间为100ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为100ms。
				break;
			case 8:
				aniClose = 'zoom-fade-in';
				//页面逐渐向页面中心缩小并且从不透明到透明逐渐隐藏关闭。
				//Android - 2.2+ (支持): 默认动画时间为100ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为100ms。
				break;
			case 9:
				aniClose = 'pop-out';
				//页面从屏幕右侧滑出消失，同时上一个页面带阴影效果从屏幕左侧滑入显示。
				//Android - 2.2+ (支持): 默认动画时间为200ms。
				//iOS - 5.1.1+ (支持): 默认动画时间为300ms。
				break;
			default:
				break;
		}
		return aniClose;
	}

	return mod;
})(window.utils || {});