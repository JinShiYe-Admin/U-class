/**
 * period組件
 */
Vue.component('period-view', {
	template: '<div>' +
		'<template v-for="(period,index) of periodList">' +
		'<input type="radio" name="periods" v-bind:id="period.id" v-bind:checked="index===0" v-on:change="checkListener(period,$event)"/>' +
		'<label v-bind:for="period.id"><span>{{period.name}}</span></label>' +
		'</template>' +
		'<p v-if="" v-bind:style="{float:\'right\',display:\'inline-block\'}">高级筛选>></p>' +
		'</div>',
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
			if(event.target.checked) {
				this.$emit("periodchoice", period);
			}
		},
		/**
		 * 跳转到高级筛选界面
		 */
		gotoSuperChoice: function() {

		}
	}
})