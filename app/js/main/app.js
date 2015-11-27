/**
 * Created by lixiang on 15-11-17.
 */
'use strict';
var ghtApp = angular.module('ngTubaApp',['ui.router', 'ngResource']);

ghtApp.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/index');

	$stateProvider
		.state('index',{
			url:'/index',
			controller: 'tubaController',
			templateUrl:'/templates/tuba.html'
		});

});