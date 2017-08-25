/**
 * period組件
 */
Vue.component('period-view', {
	props: {
		moreSlect: {
			type: Boolean,
			default: false
		}
	},
	template: '<div v-bind:style="{background:\'white\',height:\'40px\'}"><div v-bind:class="[\'mui-segmented-control\',\'mui-segmented-control-inverted\']">' +
		'<template v-for="(period,index) of periodList">' +
		'<a v-bind:class="[\'mui-control-item\', {\'mui-active\':index==0}]"  v-on:tap="checkListener(period,$event)">' +
		'{{period.name}}</a>' +
		'</template>' +
		'</div>' +
		'<p v-if="moreSlect" v-on:tap="gotoSuperChoice()" v-bind:style="{float:\'right\'}">高级筛选>></p></div>',
	data: function() {
		return {
			periodList: []
		}
	},
	created: function() {
		this.getPeriods();
	},
	computed: {

	},
	methods: {
		/**
		 * 获取periods
		 */
		getPeriods: function() {
			var com = this;
			postDataPro_periodList({}, function(response) {
				if(response.code == 0) {
					com.periodList = response.data;
					com.$emit("periodchoice", com.periodList[0]);
				}
			})
		},
		/**
		 * 不同学段选择
		 */
		checkListener: function(period, event) {
			console.log("监听》》》》》")
			this.$emit("periodchoice", period);
		},
		/**
		 * 跳转到高级筛选界面
		 */
		gotoSuperChoice: function() {
			console.log("高级筛选")
			this.$emit("gotosuperchoice");
		}
	}
})