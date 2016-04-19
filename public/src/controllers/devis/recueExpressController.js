/**
 * Created by abdo on 2016-04-10.
 */

'use strict';
app
	.controller('recueExpressCtrl',function($scope,$rootScope,devisProvider,socketDevisFactory,homeProvider,offreProvider,notificationProvider,questionProvider){
		var refrech = function(){
			$scope.message = $scope.error_message ='';
			$scope.showFormOffre = false;
		};
		refrech();

		$scope.messages = [];
		socketDevisFactory.on('message',function(data){
			$scope.messages.push(data.message);
		});
		socketDevisFactory.emit('new-client',$rootScope.current_user);

		$scope.createOffre = function(n){
			console.log(n);
			console.log(n.offre);
			console.log($rootScope.current_user._id);
			var offre = {
				title : n.offre.title,
				desc : n.offre.desc,
				prestataireId : $rootScope.current_user._id
			};
			var notification = {
				message : 'Offre recu'
			};
			delete n.offre;
			console.log(n);
			console.log(offre);
			homeProvider.editUser(n.user._id,function(user){
				console.log(user);
				n.user = user;
					notificationProvider.createNotif(notification,function(notif){
						console.log(notif);
						user.notifications.push(notif);
							offreProvider.createOffre(offre,function(offre){
								console.log(offre);
									for(var d in user.devis){
										if(user.devis[d]._id == n.devis._id){
											user.devis[d].offres.push(offre);
											n.devis = user.devis[d];
											console.log(user);
											homeProvider.updateUser(user,function(data){
												console.log(data);
												socketDevisFactory.emit('new-notif', data);
												refrech();
											});
										}
									}
							});
					});
			});

		};

		$scope.createQuestion = function(n,offre){
			console.log(n.devis);
			console.log(offre);
			console.log(offre._id);
			console.log(offre.prestataireId);
			var str = '#quest'+ offre._id;
			var question = {
				contents : $(str).val()
			};
			$(str).val('');
			console.log(question);
			var notification = {
				message : 'Question Recue'
			};
			console.log(notification);
			/*homeProvider.editUser(n.devis.clientId,function(client){
				console.log(client);
				notificationProvider.createNotif(notification,function(notif){
					console.log(notif);
					client.notifications.push(notif);
					homeProvider.updateUser(client,function(data){
						console.log(data);
						socketDevisFactory.emit('new-notif', data);
						//refrech();
					});
				});
			});*/
			homeProvider.editUser(n.devis.clientId,function(user){
				console.log(user);
				questionProvider.createQuestion(question,function(question){
					console.log(question);
					for(var d in user.devis){
						if(user.devis[d]._id == n.devis._id){
							for(var o in user.devis[d].offres){
								if(user.devis[d].offres[o]._id == offre._id){
									user.devis[d].offres[o].questions.push(question);
									n.devis = user.devis[d];
										notificationProvider.createNotif(notification,function(notif){
											console.log(notif);
											user.notifications.push(notif);
												homeProvider.updateUser(user,function(data){
													console.log(data);
													socketDevisFactory.emit('new-notif', data);
													//refrech();
												});
										});
								}
							}
						}
					}
				});
			});

		};

		$scope.deselect = function(){
			$scope.messages = [];
		};

	});



