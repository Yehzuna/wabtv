var app = angular.module('WabTv', ['ngRoute']);

app.run(function ($rootScope) {

    $rootScope.night = false;
    $rootScope.titlePage = "";
    $rootScope.cssPage = "";

    $rootScope.$on("$routeChangeStart", function (event, current, next) {
        if(current) {
            $rootScope.titlePage = current.$$route.data.title;
            $rootScope.cssPage = current.$$route.data.css;
        }
    });
});