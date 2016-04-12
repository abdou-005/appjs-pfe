/**
 * Created by abdo on 2016-04-09.
 */

'use strict';
app
	.controller('devisExpressCtrl',function($scope,$rootScope,devisProvider,socketDevisFactory,contentProvider,homeProvider){
		var refrech = function(){
			contentProvider.getDomaines(function(data){
				$scope.domaines = data;
			});
			$scope.message = $scope.error_message = '';
			$scope.devis = $scope.adresse = $scope.message = $scope.user ='';
			$scope.domaine = '';
			$scope.showSpec = false;
			$scope.specialitesDom=$scope.messages = [];
		};
		refrech();
		$scope.getSpecialites = function(d){
			$scope.showSpec = true;
			contentProvider.editDomaine(d,function(data){
				$scope.domaine._id = data._id;
				$scope.specialitesDom = data.specialites;
			});
		};

		$scope.messages = [];
		socketDevisFactory.on('message',function(data){
			$scope.messages.push(data.message);
		});
		socketDevisFactory.emit('new-client',$rootScope.current_user);
		socketDevisFactory.on('new-client',function(userClient){
			console.log(userClient,'Connect');
			for(var user in $rootScope.listeUsers ){
				console.log($rootScope.listeUsers[user]._id);
				if($rootScope.listeUsers[user]._id == userClient._id){
					$rootScope.listeUsers.splice(user,1);
				}
			}
			$rootScope.listeUsers.push(userClient);
		});

		$scope.setInformation = function(){
			console.log($scope.devis);
			console.log('--------------------');
			console.log($scope.adresseDevis);
			console.log('--------------------');
			console.log($scope.specialites);
			console.log('--------------------');
			$rootScope.current_user.devisExpress = $scope.devis;
			$rootScope.current_user.adresseDevis = $scope.adresseDevis;
			console.log($rootScope.current_user);
			/*homeProvider.updateUser($rootScope.current_user,function(data){
				console.log(data);
				$rootScope.current_user = data;
			});*/
			socketDevisFactory.emit('new-devis',{
				user : $rootScope.current_user,
				service : $scope.service
			});
		};

		socketDevisFactory.on('client-deco',function(userClient){
			console.log(userClient,'Deconnect');
			for(var user in $rootScope.listeUsers ){
				console.log($rootScope.listeUsers[user]._id);
				if($rootScope.listeUsers[user]._id == userClient._id){
					$rootScope.listeUsers.splice(user,1);
				}
			}
		});

		$scope.deselect = function(){
			$scope.devis = $scope.adresse = $scope.message = $scope.user  =$scope.error_message = '';
			$scope.messages = [];
			$scope.showSpec = false;
		};

	});



