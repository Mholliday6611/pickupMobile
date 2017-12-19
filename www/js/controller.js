angular.module("pickupApp.controllers", ['ngCordova.plugins.nativeStorage','pickupApp.factory'])
	.controller("getPickUpLineCtrl", function($scope, $http, creds){
		$scope.getLine = function(){
			$http.get("http://localhost:8080/api/getLines")
				.then(function(response){
					console.log(response)
					console.log(creds)
					$scope.line = response.data
				})
			}
		$scope.favorite = function(){
			console.log(creds)
			$http.put("http://localhost:8080/api/favorite", {favorite: $scope.line.line}, {headers: {'Content-Type' : 'application/json', 'Authorization' : "bearer " + creds.token} } )
			.then(function(response){
				console.log("cool")
			}).catch(function(response){
				console.log(response)
			})
		}
		$scope.submitLine = function(){
			$http.post("http://localhost:8080/api/pickup", $scope.newLine, {headers: {'Content-Type' : 'application/json', 'Authorization' : "bearer " + creds.token} })
			.then(function(response){
				$scope.msg = response.data
				$scope.newLine.line = ""
			})
		}
		$scope.flag = function(){
			$http.put("http://localhost:8080/api/flag", {id:$scope.line._id}, {headers: {'Content-Type' : 'application/json', 'Authorization' : "bearer " + creds.token} } )
			.then(function(response){
				console.log(response.data)
			}).catch(function(response){
				console.log(response.data)
			})
		}
	})
	.controller("logregCtrl", function($scope, $state, $http, $cordovaNativeStorage){
		$scope.register = function(){
			$http.post("http://localhost:8080/api/signUp", $scope.newUser, {headers : { 'Content-Type' : 'application/json'} })
			.then(function(response){
				$scope.msg = "Sign Up Success!";
			}, function(response){
				$scope.msg = "Error signing up :("
			})
		}

		$scope.login = function(){
			$http.post("http://localhost:8080/api/login", $scope.log, {headers : { 'Content-Type' : 'application/json'} })
			.then(function(response){
				if(response.data.message == "ok"){
					console.log(response.data)
					$cordovaNativeStorage.setItem("session", {user: response.data.user, token: response.data.token})
					$state.go("index")
				}else{
					$scope.msg2 = response.data.msg
				}	
			}).catch(function(response){
				$scope.msg2 = "oops!"
			})
		}
	})
	.controller("faveCtrl", function($scope, $http, creds){
		$http.get("http://localhost:8080/api/getFavorites", {headers : {'Content-Type' : 'application/json', 'Authorization' : "bearer " + creds.token}})
		.then(function(response){
			$scope.faves = response.data.favorites
		}).catch(function(response){
			console.log("You suck")
		})
	})