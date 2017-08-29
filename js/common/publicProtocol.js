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

//1、获取省份列表
//var commonData = {
//	resourceCategoryId:''//资源分类Id(默认优课)
//}
var postDataPro_provinceList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/province/list', commonData, 1, callback);
}

//2、获取学段列表
//var commonData = {
//	resourceCategoryId:''//资源分类Id
//}
var postDataPro_periodList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/period/list', commonData, 1, callback);
}

//3、获取科目列表
//var commonData = {
//	resourceCategoryId:'',//资源分类Id
//	periodId:'',//学段id
//	areaId:''//省/市/区/县的id
//}
var postDataPro_subjectList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/subject/list', commonData, 1, callback);
}

//4、获取教版列表
//var commonData = {
//	resourceCategoryId:'',//资源分类Id
//	periodId:'',//学段id
//	subjectId:''//科目id
//}
var postDataPro_bookVersionList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/bookVersion/list', commonData, 1, callback);
}

//5、获取年级列表
//var commonData = {
//	resourceCategoryId:'',//资源分类Id
//	periodId:'',//学段id
//	areaId:'',//省/市/区/县的id
//	subjectId:''//科目的id
//}
var postDataPro_gradeList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/grade/list', commonData, 1, callback);
}

//5.1、年级列表(含上下册信息)
//var commonData = {
//	resourceCategoryId:'',//资源分类Id
//	periodId:'',//学段id
//	areaId:'',//省/市/区/县的id
//	subjectId:'',//科目的id
//	bookVersionId:''//教版id
//}
var postDataPro_gradeistWithBookType = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/grade/listWithBookType', commonData, 1, callback);
}

//6、获取资源的分类及子分类
//var commonData = {}
var postDataPro_rescatList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/rescat/list', commonData, 1, callback);
}

//7、分页获取资源列表
//var commonData = {
//	pageNumber:'',//当前页数
//	pageSize:'',//每页显示的记录数
//  resourceCategoryId:'',//资源分类Id
//	periodId:'',//学段id
//	areaId:'',//省/市/区/县的id
//	schoolId:'',//学校id
//	bookVersionId:'',//教版id
//	bookTypeId:'',//上下册id
//	subjectId:'',//科目id
//	gradeId:'',//年级id
//	teacherId:'',//教师id
//	orderType:'',//排序:1-按最新排,2-按最热排
//}
var postDataPro_resList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/res/list', commonData, 1, callback);
}

//8、获取需要播放的资源
//var commonData = {
//	resourceId:''//资源id
//}
var postDataPro_resInfo = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/res/info', commonData, 1, callback);
}

//9、分页获取教师列表
//var commonData = {
//	pageNumber:'',//当前页数
//	pageSize:'',//每页显示的记录数
//	periodId:'',//学段id
//	areaId:'',//省/市/区/县的id
//	schoolId:''//学校id
//}
var postDataPro_teacherList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/teacher/list', commonData, 1, callback);
}

//10、获取某个教师的信息
//var commonData = {
//	teacherId:''//教师id
//}
var postDataPro_teacherInfo = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/teacher/info', commonData, 1, callback);
}