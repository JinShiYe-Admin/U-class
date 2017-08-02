/**
 * 文件相关操作的公共方法
 * 1.打开某个文件
 * 2.安卓打开某个应用
 * 3.返回 MIMEType
 * 4.转换文件大小的格式
 */
var fileutil = (function(mod) {

	/**
	 * 1.打开某个文件
	 * @param {Object} fpath 文件路径
	 * @param {Object} errorCallback 失败的回调
	 */
	mod.openFile = function(fpath, errorCallback) {
		plus.runtime.openFile(fpath, '', function(e) {
			//console.log('打开文件失败:' + JSON.stringify(error));
			if(plus.os.name == 'Android') {
				mod.openFileAndroid(fpath, function(data) {
					errorCallback(data);
				});
			} else {
				errorCallback({
					code: e.code,
					message: "打开文件失败:" + e.message
				});
			}
		});
	}

	/**
	 * 2.安卓打开某个应用
	 * @param {Object} fpath 文件路径
	 * @param {Object} errorCallback 失败的回调
	 */
	mod.openFileAndroid = function(fpath, errorCallback) {
		var Intent = plus.android.importClass("android.content.Intent");
		var Uri = plus.android.importClass("android.net.Uri");
		var activity = plus.android.runtimeMainActivity();
		var intent = new Intent(Intent.ACTION_VIEW);
		var uri = Uri.parse(fpath);
		var type = mod.MIMETypeAndroid(fpath);
		intent.setDataAndType(uri, type);
		try {
			activity.startActivity(intent);
		} catch(e) {
			errorCallback({
				code: e.code,
				message: "打开文件失败:" + e.message
			});
		}
	}

	/**
	 * 3.返回 MIMEType
	 * @param {Object} fpath
	 */
	mod.MIMETypeAndroid = function(fpath) {
		var MIMEType = '*/*';
		var nameList = fpath.split(".");
		var type = nameList[nameList.length - 1];
		type = type.toLowerCase(); //转换为小写
		switch(type) {
			case 'avi': //视频类型
			case 'mp4':
			case 'flv':
			case 'swf':
			case '3gp':
			case 'rm':
			case 'wma':
			case 'asf':
			case 'wmv':
			case 'rmvb':
				MIMEType = 'video/*';
				break;
			case 'psd': //图片类型
			case 'jpeg':
			case 'jpg':
			case 'png':
			case 'gif':
			case 'webp':
			case 'tiff':
			case 'bmp':
			case 'cod':
			case 'cal':
			case 'dcx':
			case 'eri':
			case 'jpe':
			case 'jpz':
				MIMEType = 'image/*';
				break;
			case 'cda': //音频类型
			case 'wav':
			case 'cda':
			case 'aif':
			case 'aiff':
			case 'au':
			case 'mp1':
			case 'mp2':
			case 'mp3':
			case 'ra':
			case 'rm':
			case 'ram':
			case 'mid':
			case 'Rmi':
				MIMEType = 'audio/*';
				break;
			default:
				//console.log('MIME-Type 不匹配');
				break;
		}
		return MIMEType;
	}

	/**
	 * 4.转换文件大小的格式
	 * @param {Number} size
	 */
	mod.convertFileSize = function(size) {
		var fileSizeString;
		if(size == 0) {
			fileSizeString = "0B";
		} else if(size < 1024) {
			fileSizeString = size + "B";
		} else if(size < (1024 * 1024)) {
			fileSizeString = (size / (1024)).toFixed(2) + "KB";
		} else if(size < (1024 * 1024 * 1024)) {
			fileSizeString = (size / (1024 * 1024)).toFixed(2) + "MB";
		} else {
			fileSizeString = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
		}
		return fileSizeString;
	}
	return mod;
})(window.fileutil || {});