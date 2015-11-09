/**
 * Created by Lutreer on 15-10-20.
 */
'use strict';
;var doweApp = angular.module('doweApp',['ui-router']);

doweApp.config(function($stateProvider,$urlRouteProvider){

	$urlRouteProvider.otherwise('/index');

	$stateProvider
		.state('index',{
			url:'/index',
			template:'index  index   index'

		})
		.state('xxx',{
			url:'/index',
			template:'xxx xxx xxx xxx'
		})

});