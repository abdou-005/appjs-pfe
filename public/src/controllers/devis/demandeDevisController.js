
'use strict';
app
	.controller('demandeDevisCtrl',function($scope ,devisProvider,socketDevisFactory){

        $scope.messages = [];

        socketDevisFactory.on('message',function(data){
           $scope.messages.push(data.message);
        });

		var refrechTous = function(){
            devisProvider.getDevis(function(data){
                $scope.devis = data;
                $scope.title = '';
                $scope.contents = '';
                $scope.state = '';
                $scope.type= '';
                $scope.specialite= '';
                $scope.offres= '';
                $scope.mission= '';
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
            console.log($scope.devis);
            console.log($scope.offres);
            $scope.devis.offres = $scope.offres;
            //$scope.domaine.specialites = $scope.specialites;
            console.log('--------------');
            console.log($scope.devis);
            console.log('--------------');
            devisProvider.createDevis($scope.devis,function(data){
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
                    $scope.devis = data;
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
            console.log('scope.c = ',$scope.devis);
            devisProvider.editDevis(id,function(data){
                console.log('data = ',data);
                $scope.devis = data;
            });

        };

        $scope.updateDevis = function(){
            if($scope.offres){
                for(var t in $scope.offres){
                    $scope.devis.offres.push($scope.offres[t]);
                }
                $scope.offres = '';
            }
            devisProvider.updateDevis($scope.devis,function(data){
                console.log('data = ',data);
                $scope.devis = data;
            });
            refrech();
        };

        $scope.deselect = function(){
            $scope.devis = '';
        }

	});


