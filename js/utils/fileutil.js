/**
 * 文件相关操作的公共方法
 * 1.打开某个文件
 * 2.安卓打开某个应用
 * 3.返回 MIMEType
 * 4.转换文件大小的格式
 * 5.删除一个本地文件
 * 6.批量删除文件
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

	/**
	 * 5.删除一个本地文件
	 * @param {Object} data 必填 传入的数据
	 * @param {Object.fpath} data.fpath 必填 文件路径
	 * @param {Object} callback 执行完成的回调
	 */
	mod.deleteLocalFile = function(data, callback) {
		////console.log("deleteLocalFile:" + JSON.stringify(data))
		plus.io.resolveLocalFileSystemURL(data.fpath, function(succesCB) {
			////console.log("获取删除本地文件的文件系统成功: " + succesCB.name);
			succesCB.remove(function(succesCB2) {
				////console.log("删除本地文件成功: " + JSON.stringify(succesCB2));
				callback({
					code: 1,
					data: data,
					message: "删除成功"
				});
			}, function(errorCB2) {
				//console.log("删除本地文件失败: " + JSON.stringify(succesCB2));
				callback({
					code: 0,
					data: data,
					ecode: errorCB.code,
					message: "删除失败:" + errorCB2.message
				});
			});
		}, function(errorCB) {
			//console.log("获取删除本地文件的文件系统失败: " + JSON.stringify(errorCB));
			callback({
				code: 0,
				data: data,
				ecode: errorCB.code,
				message: "删除失败:" + errorCB.message
			});
		});
	}

	/**
	 * 6.批量删除文件
	 * @param {Object} delFileArray 文件列表
	 * @param {Object} deleteItem 删除一个文件后的回调
	 * @param {Object} delenteEnd 删除所有的文件之后的回调
	 */
	mod.deleteFileArray = function(delFileArray, deleteItem, delenteEnd) {
		for(var i in delFileArray) {
			//console.log("delFileArray:" + i + " " + JSON.stringify(delFileArray[i]));
			if(delFileArray[i].code === undefined) {
				mod.deleteLocalFile(delFileArray[i], function(data) {
					//console.log("deleteLocalFile:" + JSON.stringify(data));
					delFileArray[i].code = data.code;
					delFileArray[i].ecode = data.ecode;
					delFileArray[i].message = data.message;
					deleteItem(delFileArray[i]);
					if(i == (delFileArray.length - 1)) {
						delenteEnd();
					} else {
						mod.deleteFileArray(delFileArray, deleteItem, delenteEnd);
					}
				});
				break;
			}
		}
	}

	/**
	 * 创建下载任务
	 * @param {Object} url 文件路径
	 * @param {Object} filename 下载到本地的路径
	 * @param {Object} uploadCompletedCallBack 下载完成时的回调
	 * @param {Object} onStateChangedCallBack 下载任务状态监听的回调
	 * @param {Object} successCallBack 下载任务创建成功的回调
	 */
	mod.addDownloadTask = function(url, filename, downloadCompletedCallback, onStateChangedCallBack, successCallBack) {
		//console.log('download ' + url);
		//console.log('filename ' + filename);
		var dtask = plus.downloader.createDownload(url, {
				filename: filename //下载文件保存的路径
			},
			/**
			 * 下载完成时的回调
			 * @param {Object} download 下载任务对象
			 * @param {Object} status 下载结果状态码
			 */
			function(download, status) {
				// 下载完成
				downloadCompletedCallback(download, status);
			}
		);
		//下载状态变化的监听
		dtask.addEventListener("statechanged",
			/**
			 * 下载状态变化的监听
			 * @param {Object} download 下载任务对象
			 */
			function(download) {
				onStateChangedCallBack(download);
			}
		);
		successCallBack(dtask);
		//dtask.start();
	}
	return mod;
})(window.fileutil || {});