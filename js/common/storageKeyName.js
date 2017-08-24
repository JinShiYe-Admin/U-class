//此js用于保存本地存储时，用到的key值

var storageKeyName = (function(mod) {

	mod.key = 0; //0,开发;1,测试--教宝云;2,测试--微视学堂 3外网--微视学堂 4外网--教宝云
	var exLog = console.log;
	console.log = function(hint, object) {
		if(mod.key === 0) {
			var argus = hint;
			if(object) {
				argus = hint + JSON.stringify(object);
			}
			exLog.apply(this, [argus]);
		}
	}
	switch(mod.key) {
		case 0: //开发
			//---开发---start---
			mod.MAINURL = 'http://114.215.26.9:8080/ziyuanpt/'; //主url
			//---开发---end---
			//---七牛空间和接口---开发---start---
			mod.QNPB = 'http://qn-kfpb.jiaobaowang.net/'; //公开空间域名
			mod.QNGETUPLOADTOKEN = 'http://114.215.222.186:8004/Api/QiNiu/GetUpLoadToKen';
			mod.QNGETUPTOKENHEADIMGE = 'http://114.215.222.186:8004/Api/QiNiu/GetUpLoadToKen'; //获取上传个人头像，群头像，资料头像到七牛的token的url
			mod.QNGETUPTOKENFILE = 'http://114.215.222.186:8004/Api/QiNiu/GetUpLoadToKen'; //获取上传文件（云存储）到七牛的token的url
			mod.QNGETDOWNTOKENFILE = 'http://114.215.222.186:8004/Api/QiNiu/GetAccess'; //获取下载文件（云存储）的token的url，url+七牛文件url
			mod.QNGETTOKENDELETE = 'http://114.215.222.186:8004/Api/QiNiu/Delete'; //获取批量（或者一个）删除七牛文件的token的url
			//	---七牛空间和接口---开发---end---
			break;
		case 1: //测试--教宝云
			//---测试---start---
			mod.MAINEDU = 'http://192.168.1.178:8511/'; //科教图片url
			mod.MAINURL = 'http://192.168.1.178:8511/api/CloudApi/'; //主url
			mod.MAINJIAOXIAOURL = 'http://192.168.1.178:8080/JiaoBaoCloudService/'; //家校圈url
			mod.MAINHOMEWORKURL = 'http://192.168.1.178:8088/'; //作业主url
			mod.MAINQIUZHI = 'http://192.168.1.178:8080/JiaoBaoCloudService/'; //求知主url
			mod.MAINMICROCLASS = 'http://192.168.1.178:8080//JiaoBaoCloudService/'; //微课主url
			//---测试---end---

			//---七牛空间和接口---测试---start---
			mod.QNPB = 'http://qn-cspb.jiaobaowang.net/'; //公开空间域名
			mod.QNGETUPLOADTOKEN = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen';
			mod.QNGETUPTOKENHEADIMGE = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen'; //获取上传个人头像，群头像，资料头像到七牛的token的url
			mod.QNGETUPTOKENFILE = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen'; //获取上传文件（云存储）到七牛的token的url
			mod.QNGETDOWNTOKENFILE = 'http://114.215.222.186:8005/Api/QiNiu/GetAccess'; //获取下载文件（云存储）的token的url，url+七牛文件url
			mod.QNGETTOKENDELETE = 'http://114.215.222.186:8005/Api/QiNiu/Delete'; //获取批量（或者一个）删除七牛文件的token的url
			//---七牛空间和接口---测试---end---
			break;
			
		case 2: //测试--微视学堂
			//---移动版---start---
			mod.MAINEDU = 'http://192.168.1.178:8020/'; //科教图片url
			mod.MAINURL = 'http://192.168.1.178:8020/api/CloudApi/'; //主url
			mod.MAINJIAOXIAOURL = 'http://192.168.1.178:8080/JiaoBaoCloudService/'; //家校圈url
			mod.MAINHOMEWORKURL = 'http://192.168.1.178:8021/'; //作业主url
			mod.MAINQIUZHI = 'http://192.168.1.178:8080/JiaoBaoCloudService/'; //求知主url
			mod.MAINMICROCLASS = 'http://192.168.1.178:8080/JiaoBaoCloudService/'; //微课主url
			//---内网---end---

			//---七牛空间和接口---测试---start---
			mod.QNPB = 'http://qn-cspb.jiaobaowang.net/'; //公开空间域名
			mod.QNGETUPLOADTOKEN = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen';
			mod.QNGETUPTOKENHEADIMGE = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen'; //获取上传个人头像，群头像，资料头像到七牛的token的url
			mod.QNGETUPTOKENFILE = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen'; //获取上传文件（云存储）到七牛的token的url
			mod.QNGETDOWNTOKENFILE = 'http://114.215.222.186:8005/Api/QiNiu/GetAccess'; //获取下载文件（云存储）的token的url，url+七牛文件url
			mod.QNGETTOKENDELETE = 'http://114.215.222.186:8005/Api/QiNiu/Delete'; //获取批量（或者一个）删除七牛文件的token的url
			break;

		case 3: //外网--微视学堂
			//---移动版---start---
			mod.MAINEDU = 'http://114.215.222.186:8009/'; //科教图片url
			mod.MAINURL = 'http://114.215.222.186:8009/api/CloudApi/'; //主url
			mod.MAINJIAOXIAOURL = 'http://114.215.222.194:8088/JiaoBaoCloudService/'; //家校圈url
			mod.MAINHOMEWORKURL = 'http://114.215.222.186:8008/'; //作业主url
			mod.MAINQIUZHI = 'http://114.215.222.194:8088/JiaoBaoCloudService/'; //求知主url
			mod.MAINMICROCLASS = 'http://114.215.222.194:8088/JiaoBaoCloudService/'; //微课主url
			//---外网---end---

			//---七牛空间和接口---测试---start---
			mod.QNPB = 'http://qn-cspb.jiaobaowang.net/'; //公开空间域名
			mod.QNGETUPLOADTOKEN = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen';
			mod.QNGETUPTOKENHEADIMGE = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen'; //获取上传个人头像，群头像，资料头像到七牛的token的url
			mod.QNGETUPTOKENFILE = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen'; //获取上传文件（云存储）到七牛的token的url
			mod.QNGETDOWNTOKENFILE = 'http://114.215.222.186:8005/Api/QiNiu/GetAccess'; //获取下载文件（云存储）的token的url，url+七牛文件url
			mod.QNGETTOKENDELETE = 'http://114.215.222.186:8005/Api/QiNiu/Delete'; //获取批量（或者一个）删除七牛文件的token的url
			break;
		case 4: //外网--教宝云
			//---外网---start---
			mod.MAINEDU = 'http://114.215.222.186:8002/'; //科教图片url
			mod.MAINURL = 'http://114.215.222.186:8002/api/CloudApi/'; //主url
			mod.MAINJIAOXIAOURL = 'http://114.215.222.194:8080/JiaoBaoCloudService/'; //家校圈url
			mod.MAINHOMEWORKURL = 'http://114.215.222.186:8001/'; //作业主url
			mod.MAINQIUZHI = 'http://114.215.222.194:8080/JiaoBaoCloudService/'; //求知主url
			mod.MAINMICROCLASS = 'http://114.215.222.194:8080/JiaoBaoCloudService/'; //微课主url
			//---外网---end---

			//---七牛空间和接口---测试---start---
			mod.QNPB = 'http://qn-cspb.jiaobaowang.net/'; //公开空间域名
			mod.QNGETUPLOADTOKEN = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen';
			mod.QNGETUPTOKENHEADIMGE = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen'; //获取上传个人头像，群头像，资料头像到七牛的token的url
			mod.QNGETUPTOKENFILE = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen'; //获取上传文件（云存储）到七牛的token的url
			mod.QNGETDOWNTOKENFILE = 'http://114.215.222.186:8005/Api/QiNiu/GetAccess'; //获取下载文件（云存储）的token的url，url+七牛文件url
			mod.QNGETTOKENDELETE = 'http://114.215.222.186:8005/Api/QiNiu/Delete'; //获取批量（或者一个）删除七牛文件的token的url
			//---七牛空间和接口---测试---end---
			break;
		default:
			break;
	}
	
	mod.TOKEN = 'token';//优课协议获取到的token
	mod.RESOURCELIST = 'resourceList';//第5个协议获取到的资源列表，包含优课、资源、动画课
	mod.PERSONALINFO = 'personalInfo1111'; //个人信息，登录成功后返回值
	mod.SHAKEHAND = 'ShakeHand'; //公钥，登录时，返回的握手信息，
	mod.AUTOLOGIN = 'autoLogin'; //登录信息
	mod.DOCUMENTSPATH = 'DOCUMENTSPATH'; //记录document的地址
	mod.WAITING = '加载中...'; //
	mod.UPLOADING = '上传中...';
	mod.SIGNKEY = 'jsy309'; //签名密钥

	return mod;

})(storageKeyName || {});