/**
 * Created by abdo on 2016-04-10.
 */

'use strict';
app
	.controller('recueExpressCtrl',function($scope,$rootScope,devisProvider,socketDevisFactory,contentProvider){
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
			console.log($scope.user);
			console.log('--------------------');
			console.log($scope.adresse);
			console.log('--------------------');
			socketDevisFactory.emit('new-devis',{
				devis : $scope.devis,
				user : $rootScope.current_user,
				adresse : $scope.adresse
			});
		};
		$scope.listeDevis = [{}];
		socketDevisFactory.on('new-devis',function(data){
			console.log('-----------');
			console.log(data);
			console.log('-----------');
			$scope.listeDevis.push(data);
		});
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



