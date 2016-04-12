/**
 * Created by abdo on 2016-04-11.
 */

'use strict';
app
	.controller('notificationCtrl',function($scope,$rootScope,devisProvider,socketDevisFactory,contentProvider,homeProvider){


		$scope.notificationNewDevis = [];
		$scope.nbrNewDevis = 0;
		$scope.notificationRecueDevis = [];
		$scope.nbrRecueDevis = 0;

			socketDevisFactory.on('new-devis',function(data){
				console.log(data.service.name);
				for(var spec in $rootScope.current_user.specialites){
					if($rootScope.current_user.specialites[spec].name==data.service.name){
						console.log($rootScope.current_user.specialites[spec].name);
						$scope.nbrNewDevis++;
						$scope.notificationNewDevis.push(data);
					}
				}
			});


	});




