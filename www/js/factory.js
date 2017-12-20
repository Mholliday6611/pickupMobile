angular.module("pickupApp.factory", ["ngStorage"])
.factory("creds", function($localStorage){
	var creds = function(){
		if($localStorage.session){
			return {
				username: $localStorage.session.user,
				token: $localStorage.session.token
			}
		}else{
			return null
		}
		
	};
	return creds
})