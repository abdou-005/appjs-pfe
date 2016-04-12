/**
 * Created by abdo on 2016-03-08.
 */
'use strict';
app
	.controller('homeCtrl',function($scope,homeProvider){


		var refrech = function(){
			homeProvider.getUsers(function(data){
				$scope.users = data;
				$scope.user= '';
			});

		};

		refrech();

		$scope.createUser = function(){
			if($scope.user == '' || !$scope.user.email || !$scope.user.password){
				console.log('user null or email  password null');
				return false;
			}else{
					$scope.user.statut = 'actif';
					homeProvider.createUser($scope.user,function(data){
					console.log(data);
					});
				console.log($scope.user);
				console.log('user not null');

			}
			console.log('autre chose');
			refrech();
		};

		$scope.removeUser = function(id){
			console.log(id);
			homeProvider.removeUser(id,function(data){
				console.log(data);
			});
			refrech();

		};

		$scope.editUser = function(id){
			console.log(id);
			homeProvider.editUser(id,function(data){
				console.log(data);
				$scope.user = data;
			});
		};
		$scope.updateUser = function(){
			if($scope.user == ''){
				console.log('user null');
			}else{
				homeProvider.updateUser($scope.user,function(data){
					console.log(data);
					refrech();
					$scope.user = data;

				});
			}

		};
		$scope.deselect = function(){
			$scope.user = '';
		};

	});
