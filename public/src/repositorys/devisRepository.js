'use strict';

app.service('devisRepository',function($http){

    this.getDevis = function(cb){
        $http.get('/devis/demande').success(function(resp){
            console.log('i got the data I request');
            console.log("resp = ",resp);
           return cb(resp);
         });
        return false;
    }

    this.createDevis = function(devis, cb){
        console.log(devis);
        $http.post('/devis/demande', devis).success(function(resp){
            console.log('Create devis');
            console.log(resp);
            return cb(resp);
        });
        return false;
    }

    this.removeDevis = function(id,cb){
        console.log(id);
        $http.delete('/devis/demande/' + id).success(function(resp){
            console.log('devis deleted = ',resp);
            console.log(resp);
            return cb(resp);

        });
        return false;
    }
    this.editDevis = function(id,cb){

        $http.get('/devis/demande/'+id).success(function(resp){
            console.log('resp = ',resp);
            return cb(resp);
        });
        return false;
    }

    this.updateDevis = function(id,cb){
        console.log('Id Object et Object = ',id);
        $http.put('/devis/demande',id).success(function(resp){
            console.log('resp = ',resp);
            return cb(resp);
        });
        return false;
    }

});
