/**
 * Created by abdo on 2016-02-12.
 */
'use strict';
app.config(
    function($routeProvider, $locationProvider){
        $routeProvider
            .when('/users',{
                controller:'homeCtrl',
                templateUrl:'views/home/home.html'
            })
            .when('/contents',{
                controller:'contentCtrl',
                templateUrl:'views/content/list.html'
            })
            .when('/domaine',{
                controller:'domianeListCtrl',
                templateUrl:'views/domaine/list.html'
            })
            .when('/createSpec',{
                controller:'domaineCreateCtrl',
                templateUrl:'views/domaine/create.html'
            })
            .when('/login',{
                controller:'loginCtrl',
                templateUrl:'views/login/login.html'
            })
            .when('/register',{
                controller:'loginCtrl',
                templateUrl:'views/login/register.html'
            })
            .when('/profilClient',{
                controller:'profilClientCtrl',
                templateUrl:'views/profil/profilClient.html'
            })
            .when('/profilArtisan',{
                controller:'profilArtisanCtrl',
                templateUrl:'views/profil/profilArtisan.html'
            })
            .when('/profilAdmin',{
                controller:'profilAdminCtrl',
                templateUrl:'views/profil/profilAdmin.html'
            })
            .when('/demandeDevis',{
                controller : 'demandeDevisCtrl',
                templateUrl : 'views/devis/create.html'
            })
            .when('/devisExpress',{
                  controller : 'devisExpressCtrl',
                  templateUrl : 'views/devis/createExpress.html'
            })
            .when('/recueExpress',{
                controller : 'recueExpressCtrl',
                templateUrl : 'views/devis/recuExpress.html'
            })
            .when('/createAdresse',{
                controller : 'adresseCtrl',
                templateUrl : 'views/adresse/create.html'
            })

            .otherwise({redirectTo:'/'});
        $locationProvider.html5Mode({enabled : true, requireBase:false });
    }
);
