'use strict';
app
	.controller('profilClientCtrl', [ 'Upload','$http', '$scope','$rootScope',  function( Upload, $http, $scope, $rootScope){
		$scope.message = "ceci mon profil page";
		console.log('my profil page');
		console.log($rootScope.current_user.email);
		

		/*$scope.upload = function (file) {
			var obj = {}
			obj.file = file;
			obj.email = $rootScope.current_user.email;
			console.log(obj)
			//var media = [];
			//media.push(file)
			//obj.file = media;
			//obj.email = '741@741.com';
			console.log(obj);
			var result = $http.post('/profil/upload', obj);
			result.success(function(data, status, headers, config) {
				console.log(data)
				});
			result.error(function(data, status, headers, config) {
				console.log(data);
			});	
			
};*/
 

	   $scope.$watch(function(){
	                    return $scope.file
	                }, function (){
	                   $scope.upload($scope.file); 
	                });
      $scope.upload = function (file) {
  			
                    if (file){
                        Upload.upload({
                            url: '/profil/upload/',
                            data: {userId:$rootScope.current_user._id, userEmail: $rootScope.current_user.email},
                            file: file
                        }).progress(function(evt){
                            console.log("firing");
                        }).success(function(data){
                            console.log(data);
                            var a = data.medias.length;
                            $rootScope.medias_profil = data.medias[a-1];
							
                        }).error(function(error){
                            console.log(error);
                        })
                    }

                };

        
	}]);
