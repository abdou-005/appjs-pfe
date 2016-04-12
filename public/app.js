/**
 * Created by abdo on 2016-02-11.
 */
'use strict';

var app = angular.module('myApp',['ngRoute','btford.socket-io','geolocation', 'ngFileUpload']);

app.run(function($rootScope, $http,$location) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	$rootScope.isAdmin = false;
	$rootScope.isClient = false;
	$rootScope.isArtisan = false;
	$rootScope.isProfil = false;
	$rootScope.token_current_user = '';
	$rootScope.listeUsers = [];

	$rootScope.signout = function () {
		$http.delete('auth/signout?token='+$rootScope.token_current_user).success(function (resp) {
			console.log(resp);
		});
		$rootScope.isAdmin = false;
		$rootScope.isClient = false;
		$rootScope.isArtisan = false;
		$rootScope.isProfil = false;
		$rootScope.authenticated = false;
		$rootScope.current_user = '';
		$rootScope.token_current_user = '';
		$rootScope.listeUsers = [];
		$location.path('/');
	};
});
