/**
 * Created by abdo on 2016-04-09.
 */

'use strict';
app
	.controller('devisExpressCtrl',function($scope,$rootScope,devisProvider,socketDevisFactory,contentProvider,$http,homeProvider,notificationProvider,questionProvider){
		var refrech = function(){
			contentProvider.getDomaines(function(data){
				$scope.domaines = data;
			});
			console.log($rootScope.current_user);
			$scope.message = $scope.error_message = '';
			$scope.devis = $scope.adresse = $scope.message = $scope.user = '';
			$scope.domaine = '';
			$scope.service = '';
			$scope.showSpec = false;
			$scope.showPrestataire = false;
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

		$scope.setInformation = function(){
			console.log($scope.devis);
			console.log('--------------------');
			console.log($scope.service);
			console.log('--------------------');
			$scope.devis.state = 'waiting'; $scope.devis.type = 'emergency';
			$scope.devis.clientId = $rootScope.current_user._id;
			for(var adr in $rootScope.current_user.adresses ){
				if($rootScope.current_user.adresses[adr].isDefault){
					$scope.devis.adresseDevis = $rootScope.current_user.adresses[adr];
				}
			}
			console.log($rootScope.current_user);
			$rootScope.current_user.devisExpress = $scope.devis;
			$http({method: 'PUT', data: $rootScope.current_user, url: '/users/addDevisExpress', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
				console.log(resp);
				$rootScope.current_user = resp.user;
				socketDevisFactory.emit('new-devis',{
					devis : resp.devisExpress,
					service : $scope.service
				});
			});
		};
		// Refresh the map with new data
		$scope.refreshMap = function(){
			for(var d in $rootScope.current_user.devis){
			 console.log($rootScope.current_user.devis[d]._id);
			 var latlng = new google.maps.LatLng(39.500, -98.350);
			 var str = 'map'+$rootScope.current_user.devis[d]._id;
			 console.log(str);
			 var map = new google.maps.Map(document.getElementById(str),{
			 zoom : 10,
			 center :latlng
			 //mapTypeId : google.maps.mapTypeId.SATELLITE
			 });
			 console.log(map);
			 }
		};

		$scope.createQuestion = function(devi,offre){
			console.log(devi);
			console.log(offre);
			console.log(offre._id);
			console.log(offre.prestataireId);
			var str = '#quest'+offre._id;
			var question = {
				contents : $(str).val()
			};
			$(str).val('');
			console.log(question);
			var notification = {
				message : 'Question Recue'
			};
			homeProvider.editUser(offre.prestataireId,function(prestataire){
				console.log(prestataire);
					notificationProvider.createNotif(notification,function(notif){
						console.log(notif);
						prestataire.notifications.push(notif);
							homeProvider.updateUser(prestataire,function(data){
								console.log(data);
								socketDevisFactory.emit('new-notif', data);
								//refrech();
							});
					});
			});
			homeProvider.editUser($rootScope.current_user._id,function(user){
				console.log(user);
				questionProvider.createQuestion(question,function(question){
						console.log(question);
						for(var d in user.devis){
							if(user.devis[d]._id == devi._id){
								for(var o in user.devis[d].offres){
									if(user.devis[d].offres[o]._id == offre._id){
										user.devis[d].offres[o].questions.push(question);
										homeProvider.updateUser(user,function(data){
											console.log(data);
											$rootScope.current_user = data;
											socketDevisFactory.emit('new-devis-quest',{
												devis : user.devis[d],
												prestataireId: offre.prestataireId
											});
											//refrech();
										});
									}
								}
							}
						}
					});
			});

		};

		$scope.deleteDevis = function(d){
			console.log(d);
			for(var devi in $rootScope.current_user.devis){
				if($rootScope.current_user.devis[devi]._id == d._id){
					$rootScope.current_user.devis.splice(devi,1);
					homeProvider.updateUser($rootScope.current_user,function(data){
						$rootScope.current_user = data;
					});
				}
			}
		};
		$scope.getPrestataire = function(offre){
			console.log(offre);
			$scope.prestataire = '';
			$scope.showPrestataire = false;
			homeProvider.editUser(offre,function(data){
				$scope.showPrestataire = true;
				$scope.prestataire = data;
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
			$scope.service = '';
			$scope.messages = [];
			$scope.showSpec = false;
		};

	});



