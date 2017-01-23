app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'tpl/home.html',
            controller: 'homeCtrl'
        })
    ;
});