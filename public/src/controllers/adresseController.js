/**
 * Created by abdo on 2016-04-11.
 */

'use strict';
app
	.controller('adresseCtrl',function($scope,$http,geolocation){

		$scope.message = 'map adresse';
		//Initializes Variables
		// ----------------------------------------------------------------------------
		$scope.formData = {};
		var coords = {};
		var lat = 0;
		var long = 0;
		var data = [
			{
				username : 'fulem',
				gender: 'Female',
				age:25,
				favlamg:'javascript',
				location : [
					-95.56,
					29.735
				]
			},
			{
				username : 'dwwd',
				gender: 'male',
				age:25,
				favlamg:'PHP',
				location : [
					-98.35,
					39.5
				]
			}
		];
		// Set initial coordinates to the center of the US
		$scope.formData.latitude = 39.500;
		$scope.formData.longitude = -98.350;
		// Refresh the map with new data
		var latlng = new google.maps.LatLng($scope.formData.latitude, $scope.formData.longitude);
		var map = new google.maps.Map(document.getElementById('map'),{
			zoom : 10,
			center :latlng,
			//mapTypeId : google.maps.mapTypeId.SATELLITE
		});
		console.log(map);
		//gserviceFactory.refresh($scope.formData.latitude, $scope.formData.longitude);
		// Functions
		// ----------------------------------------------------------------------------
		// Creates a new user based on the form fields
		$scope.createUser = function() {

			// Grabs all of the text box fields
			var userData = {
				username: $scope.formData.username,
				gender: $scope.formData.gender,
				age: $scope.formData.age,
				favlang: $scope.formData.favlang,
				location: [$scope.formData.longitude, $scope.formData.latitude],
				htmlverified: $scope.formData.htmlverified
			};


			// Saves the user data to the db
			$http.post('/users', userData)
				.success(function (data) {

					// Once complete, clear the form (except location)
					$scope.formData.username = "";
					$scope.formData.gender = "";
					$scope.formData.age = "";
					$scope.formData.favlang = "";

				})
				.error(function (data) {
					console.log('Error: ' + data);
				});
		};

	});




