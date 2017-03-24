var app = angular.module('WabTv', ['ngRoute', 'duScroll']);

app.run(function ($rootScope) {

    $rootScope.night = false;
    $rootScope.theater = false;
    $rootScope.titlePage = "";
    $rootScope.slugPage = "";

    $rootScope.$on("$routeChangeStart", function (event, current, next) {
        if(current.$$route) {
            $rootScope.titlePage = current.$$route.data.title;
            $rootScope.slugPage = current.$$route.data.slug;
        } else {
            $rootScope.titlePage = "We Are Bob Television";
        }
    });
});