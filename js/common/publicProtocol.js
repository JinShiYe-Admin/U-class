//本地存储
document.write('<script src="../../js/libs/myStorage/myStorage.js"><\/script>');
document.write('<script src="../../js/storageKeyName.js"><\/script>');
//网络请求
document.write('<script src="../../js/common/postData.js"><\/script>');
document.write('<script src="../../js/libs/jquery.js"><\/script>');

//1、省份列表
//var commonData = {}
var postDataPro_provinceList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/province/list', commonData, callback);
}

//2、学段列表
//var commonData = {}
var postDataPro_periodList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/period/list', commonData, callback);
}

//3、科目列表
//var commonData = {
//	periodId:'',//学段id
//	areaId:''//省/市/区/县的id
//}
var postDataPro_subjectList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/subject/list', commonData, callback);
}

//4、年级列表
//var commonData = {
//	periodId:'',//学段id
//	areaId:'',//省/市/区/县的id
//	subjectId:''//科目的id
//}
var postDataPro_gradeList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/grade/list', commonData, callback);
}

//5、资源分类列表
//var commonData = {
//	areaId:''//省/市/区/县的id
//}
var postDataPro_rescatList = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/rescat/list', commonData, callback);
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
	postDataEncry(storageKeyName.MAINURL + 'api/res/list', commonData, callback);
}

//7、资源详情
//var commonData = {
//	packId:'',//包/系列id 
//	resourceId:''//资源id  (packId存在时可不传, 自动获取包/系列下面的 第一个资源)
//}
var postDataPro_resInfo = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/res/info', commonData, callback);
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
	postDataEncry(storageKeyName.MAINURL + 'api/teacher/list', commonData, callback);
}

//9、教师个人详情
//var commonData = {
//	teacherId:''//教师id
//}
var postDataPro_teacherInfo = function(commonData, callback) {
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'api/teacher/info', commonData, callback);
}