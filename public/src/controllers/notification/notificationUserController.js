/**
 * Created by abdo on 2016-04-17.
 */
'use strict';
app
	.controller('notificationUserCtrl',function($scope,$rootScope,socketDevisFactory,notificationProvider,homeProvider){

		var refrech = function(){
			homeProvider.editUser($rootScope.current_user._id ,function(data){
				console.log(data);
				$rootScope.current_user = data;
			});
		};
		refrech();
		socketDevisFactory.on('new-notif',function(userNotif){
			console.log('notification pour ',userNotif);
			if($rootScope.current_user._id == userNotif._id){
				refrech();
			}

		});

		$scope.deleteNotification = function(notif){
			console.log(notif);
			homeProvider.editUser($rootScope.current_user._id ,function(data){
				console.log(data);
				for(var n in data.notifications){
					if(data.notifications[n]._id == notif._id){
						data.notifications.splice(n,1);
						homeProvider.updateUser(data ,function(user){
							console.log(user);
							$rootScope.current_user = user;
						});
					}
				}
				$rootScope.current_user = data;
			});
		};

	});

