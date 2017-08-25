//签名
document.write('<script src="../../js/libs/crypto-js/require.js"><\/script>');
document.write('<script src="../../js/utils/signHmacSHA1.js"><\/script>');
//本地存储
document.write('<script src="../../js/libs/myStorage/myStorage.js"><\/script>');
document.write('<script src="../../js/common/storageKeyName.js"><\/script>');
document.write('<script src="../../js/libs/jquery.js"><\/script>');

//url,
//encryData,需要加密的字段
//commonData,不需要加密的对象
//flag,0表示不需要合并共用数据，1为添加uuid、utid、token、appid普通参数，2为uuid、appid、token
//waitingDialog,等待框
//callback,返回值
//function postDataEncry2(url, encryData, commonData, flag, callback) {
//	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
//		var data = {
//			RspCode: '404',
//			RspData: '',
//			RspTxt: '网络异常，请检查网络设置！'
//		}
//		callback(data);
//		return;
//	}
//	//拼接登录需要的签名
//	var signTemp = postDataEncry1(encryData, commonData, flag);
//
//	//生成签名，返回值sign则为签名
//	signHmacSHA1.sign(signTemp, storageKeyName.SIGNKEY, function(sign) {
//		//组装发送握手协议需要的data
//		//合并对象
//		var tempData = $.extend(encryData, commonData);
//		//添加签名
//		tempData.sign = sign;
//		// 等待的对话框
//		var urlArr = url.split('/');
//		console.log('传递的参数' + urlArr[urlArr.length - 1] + ':', tempData);
//		var tepTime = tempTime();
//		//发送协议
//		mui.ajax(url, {
//			data: JSON.stringify(tempData),
//			dataType: 'json',
//			type: 'post',
//			contentType: "application/json",
//			timeout: tepTime,
//			success: function(data) {
//				console.log(urlArr[urlArr.length - 1] + "接口获取的值:", data);
//				callback(data);
//			},
//			error: function(xhr, type, errorThrown) {
//				console.log("网络连接失败" + url + ":" + type + "," + errorThrown + ":", xhr);
//				var data = {
//					RspCode: '404',
//					RspData: '',
//					RspTxt: '网络连接失败，请重新尝试一下'
//				}
//				callback(data);
//			}
//		});
//	});
//}

function tempTime() {
	switch(plus.os.name) {
		case "Android":
			return 30000;
			break;
		case "iOS":
			return 300000;
			break;
		default:
			// 其它平台
			break;
	}
}

//
function postDataEncry(url, commonData, flag, callback) {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		var data = {
			RspCode: '404',
			RspData: '',
			RspTxt: '网络异常，请检查网络设置！'
		}
		callback(data);
		return;
	}
	var tepTime = tempTime();
	//添加token参数
	if(flag == 1) {
		commonData.token = window.myStorage.getItem(window.storageKeyName.TOKEN);
	}
	console.log('commonData:'+JSON.stringify(commonData));
	//发送协议
	mui.ajax(url, {
		data: commonData,
		dataType: 'json',
		type: 'post',
		//		contentType: "application/json",
		timeout: tepTime,
		success: function(data) {
			console.log(url + "接口获取的值:" + JSON.stringify(data));
			if(data.code == 6) {
				renewToken(url, commonData, flag, callback);
			} else {
				callback(data);
			}
		},
		error: function(xhr, type, errorThrown) {
			console.log("网络连接失败" + url + ":" + type + "," + errorThrown + ":" + xhr);
			var data = {
				RspCode: '404',
				RspData: '',
				RspTxt: '网络连接失败，请重新尝试一下'
			}
			callback(data);
		}
	});
	//$.ajax({
	//	url: url,
	//	type: 'post',
	//	data: commonData,
	//	dataType: "json",
	//	timeout: 5000,
	//	contentType: 'application/json',
	//	success: function(data){
	//		console.log(JSON.stringify(data))
	//	}
	//})
}

//拼接参数
//function postDataEncry1(encryData, commonData, flag) {
//	//循环
//	var tempStr = '';
//	for(var tempData in encryData) {
//		//对value进行加密
//		var encryptStr = RSAEncrypt.enctype(encryData[tempData]);
//		//修改值
//		encryData[tempData] = encryptStr;
//	}
//	//判断是否需要添加共用数据
//	if(flag == 1) {
//		//获取个人信息
//
//	} else if(flag == 2) {
//		//获取个人信息
//		var personalToken = window.myStorage.getItem(window.storageKeyName.PERSONALINFO).token;
//		var comData = {
//			uuid: plus.device.uuid,
//			token: personalToken,
//			appid: plus.runtime.appid
//		};
//		commonData = $.extend(commonData, comData);
//	} else if(flag == 3) {
//		//获取个人信息
//		var personalToken = window.myStorage.getItem(window.storageKeyName.PERSONALINFO).token;
//		var comData = {
//			token: personalToken
//		};
//		commonData = $.extend(commonData, comData);
//	}
//	//将对象转为数组
//	var arr0 = [];
//	for(var item in encryData) {
//		arr0.push(item + '=' + encryData[item]);
//	};
//	var arr1 = [];
//	for(var item in commonData) {
//		arr1.push(item + '=' + commonData[item]);
//	};
//	//合并数组
//	var signArr = arr0.concat(arr1);
//	//拼接登录需要的签名
//	var signTemp = signArr.sort().join('&');
//	return signTemp;
//}