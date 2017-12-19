angular.module("pickupApp.factory", ['ngCordova.plugins.nativeStorage'])
.factory("creds", function($cordovaNativeStorage){
	var creds = {};
	$cordovaNativeStorage.getItem('session').then(function(value){
		creds.username = value.user;
		creds.token = value.token
	})
	return creds
})