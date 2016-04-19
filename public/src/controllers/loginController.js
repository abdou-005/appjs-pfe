'use strict';
app
	.controller('loginCtrl',function($scope,$http,$rootScope,$location,contentProvider,homeProvider,socketDevisFactory){

		var refrech = function(){
			contentProvider.getDomaines(function(data){
				$scope.domaines = data;
				$scope.user = $scope.token = $scope.message = $scope.error_message ='';
				$scope.showPrest = $scope.showSpec = $scope.showClient = false;
			});
		};
		$scope.getSpecialites = function(d){
			$scope.showSpec = true;
				contentProvider.editDomaine(d,function(data){
					$scope.domaine._id = data._id;
				 	$scope.specialitesDom = data.specialites;
				});
		};
		refrech();
		$scope.registerUser = function(){
			if($scope.user == '' || !$scope.user.email || !$scope.user.password || !$scope.user.typeUser){
				$scope.error_message = 'user null ?';
				return false;
			}else{
				if($scope.user.typeUser == 'artisan'){
					if(!$scope.user.specialites){
						$scope.error_message = 'prestataire Specialite ?';
						return false;
					}
					var specArray = $scope.user.specialites;
					console.log(specArray);
					var newUser = {
						email : $scope.user.email,
						password :$scope.user.password,
						typeUser : $scope.user.typeUser,
						specialites : []
						};
					console.log(newUser);
					for(var i =0 ; i<specArray.length; i++){
						console.log(specArray[i]);
						newUser.specialites.push({name:specArray[i]});
					}
					console.log(newUser);
					homeProvider.registerUser(newUser,function(data){
						console.log(data);
						$scope.message = data;
					});
				}else{
					console.log('ok client');
					if($scope.user.specialites){
						delete $scope.user.specialites;
						$scope.error_message = 'Client Specialite ?';
						return false;
					}
					console.log($scope.user);
					homeProvider.registerUser($scope.user,function(data){
						console.log(data);
						//refrech();
						$scope.message = data;
					});
				}
			}
		};
		$scope.getToken = function(){
			console.log($rootScope.token_current_user);
			var id = 'Strig Id';
			$http({method: 'GET', url: '/auth/token/'+id, headers: {'x-access-token': $rootScope.token_current_user}})
				.then(function(data){
					console.log(data);
					$scope.message = data;
			});
		};
		$scope.loginUser = function(){
			$http.post('/users/authenticate',$scope.user).success(function(resp){
				if(resp.success){
					$rootScope.authenticated = true;
					$rootScope.current_user = resp.user;
					$rootScope.token_current_user = resp.token;
					console.log(resp.user.typeUser[0]);
					// client socket connect
					socketDevisFactory.emit('new-client',$rootScope.current_user);

					switch (resp.user.typeUser[0]) {
						case 'client':
							$rootScope.isClient = true;
							$location.path('/profilClient');
							break;
						case 'artisan':
							$rootScope.isArtisan = true;
							$location.path('/profilArtisan');
							break;
						case 'admin':
							$rootScope.isAdmin = true;
							$location.path('/profilAdmin');
							break;
						default:
							$scope.message = resp.user.email;
					}
					console.log('profil');
				}
				else{
					$scope.error_message = resp.message;
				}
			});
		};
		$scope.deselect = function(){
			$scope.user = $scope.token = $scope.message = $scope.error_message ='' ;
		};
	});
