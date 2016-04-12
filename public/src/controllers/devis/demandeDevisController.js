
'use strict';

app.controller('demandeDevisCtrl', ['Upload', '$scope', 'devisProvider', function(Upload, $scope,devisProvider){


        var refrechTous = function(){
            devisProvider.getDevis(function(data){
                $scope.devis = data;
                $scope.devi = '';
                $scope.title = '';
                $scope.contents = '';
                $scope.state= '';
                $scope.type= '';
                $scope.offres = '';
                $scope.image = '';
            });

         };
        var refrech = function(){
            devisProvider.getDevis(function(data){
                $scope.devis = data;
            });

        };
        refrechTous();

        $scope.createOffre = function(){
            if($scope.offres)
            {
                $scope.offres.push($scope.offre);
            }else{
                var offres = [];
                $scope.offres = offres;
                $scope.offres.push($scope.offre);
            }
            $scope.offre= '';
            console.log($scope.offres);
        };

        
        $scope.removeOffre = function(t){
            console.log(t);
            for(var offre in $scope.offres){
                if($scope.offres[offre] == t){
                    $scope.offres.splice(offre,1);
                }
            }
        };

        
       
        $scope.createDevis = function(){
            console.log($scope.devi);
            console.log($scope.offres);
            $scope.devi.offres = $scope.offres;
           console.log('--------------');
            console.log($scope.devi);
            console.log('--------------');
            devisProvider.createDevis($scope.devi,function(data){
                console.log('data =',data);
            });
            refrechTous();
        };

        $scope.removeOffreDevis = function(t,d){
            devisProvider.editDevis(d._id,function(data){
                console.log('data = ',data);
                for(var offre in data.offres ){
                    console.log(data.offres[offre]._id);
                    if(data.offres[offre]._id == t._id){
                        data.offres.splice(offre,1);
                    }
                }
                devisProvider.updateDevis(data,function(data){
                    console.log('data = ',data);
                    $scope.devi = data;
                });
                refrech();
            });

        };

        
        $scope.removeDevis = function(id){
            devisProvider.removeDevis(id,function(data){
                console.log('data = ',data);
            });
            refrechTous();
        };

        $scope.editDevis = function(id){
            console.log('Object ID = ',id);
            console.log('scope.c = ',$scope.devi);
            devisProvider.editDevis(id,function(data){
                console.log('data = ',data);
                $scope.devi = data;
            });

        };

        $scope.updateDevis = function(){
            if($scope.offres){
                for(var t in $scope.offres){
                    $scope.devi.offres.push($scope.offres[t]);
                }
                $scope.offres = '';
            }
            
            devisProvider.updateDevis($scope.devi,function(data){
                console.log('data = ',data);
                $scope.devi = data;
            });
            refrech();
        };

        $scope.deselect = function(){
            $scope.devi = '';
        }

        $scope.cancel = function(){
            $scope.offre = '';
        }

        $scope.upload = function (file) {
            Upload.upload({
                url: 'upload/',
                data: {file: file}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

        
         $scope.uploadFiles = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    Upload.upload({
                        url: 'upload/',
                        data: {file: files[i]}
                    }).then(function (resp) {
                        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    }); 
                }
            }
        };
    }]);
