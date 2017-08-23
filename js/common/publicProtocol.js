//本地存储
document.write('<script src="../../js/libs/myStorage/myStorage.js"><\/script>');
document.write('<script src="../../js/storageKeyName.js"><\/script>');
//网络请求
document.write('<script src="../../js/common/postData.js"><\/script>');
document.write('<script src="../../js/libs/jquery.js"><\/script>');


//如果token失效，重新获取，并且发送对应的协议
var renewToken = function(url, commonData,flag,callback) {
	var comData = {
		username: 'jsy',
		password: 'jsy217'
	};
	postDataPro_getToken(comData, function(data) {
		if(data.code == 0) {
			//存储到本地
			window.myStorage.setItem(window.storageKeyName.TOKEN, data.token);
			postDataEncry(url, commonData, 1, callback);
		} else {
			mui.toast(data.RspTxt);
		}
	});
}

//获取token
//var commonData = {
//	username:'jsy',
//	password:'jsy217'
//}
var postDataPro_getToken = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/getToken', commonData, 0, callback);
}

//1、省份列表
//var commonData = {}
var postDataPro_provinceList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/province/list', commonData, 1, callback);
}

//2、学段列表
//var commonData = {}
var postDataPro_periodList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/period/list', commonData, 1, callback);
}

//3、科目列表
//var commonData = {
//	periodId:'',//学段id
//	areaId:''//省/市/区/县的id
//}
var postDataPro_subjectList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/subject/list', commonData, 1, callback);
}

//4、年级列表
//var commonData = {
//	periodId:'',//学段id
//	areaId:'',//省/市/区/县的id
//	subjectId:''//科目的id
//}
var postDataPro_gradeList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/grade/list', commonData, 1, callback);
}

//5、资源分类列表
//var commonData = {
//	areaId:''//省/市/区/县的id
//}
var postDataPro_rescatList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/rescat/list', commonData, 1, callback);
}

//6、分页获取资源
//var commonData = {
//	pageNumber:'',//当前页数
//	pageSize:'',//每页显示的记录数
//	periodId:'',//学段id
//	areaId:'',//省/市/区/县的id
//	subjectId:'',//科目id
//	gradeId:'',//年级id
//	teacherId:'',//教师id
//	orderType:'',//排序:1-按最新排,2-按最热排
//	limit:'',//限制获取的资源数
//	downloadFlag:''//资源是否可以下载，默认false
//}
var postDataPro_resList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/res/list', commonData, 1, callback);
}

//7、资源详情
//var commonData = {
//	packId:'',//包/系列id 
//	resourceId:''//资源id  (packId存在时可不传, 自动获取包/系列下面的 第一个资源)
//}
var postDataPro_resInfo = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/res/info', commonData, 1, callback);
}

//8、分页获取 教师列表
//var commonData = {
//	pageNumber:'',//当前页数
//	pageSize:'',//每页显示的记录数
//	periodId:'',//学段id
//	areaId:'',//省/市/区/县的id
//	subjectId:''//科目id
//}
var postDataPro_teacherList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/teacher/list', commonData, 1, callback);
}

//9、教师个人详情
//var commonData = {
//	teacherId:''//教师id
//}
var postDataPro_teacherInfo = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/teacher/info', commonData, 1, callback);
}