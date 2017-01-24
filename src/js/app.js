var app = angular.module('WabTv', ['ngRoute']);

app.run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function () {
        console.log($location.path());
    });
});