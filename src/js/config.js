app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'tpl/home.html',
            controller: 'homeCtrl'
        })
        .when('/prog', {
            templateUrl: 'tpl/prog.html',
            controller: 'progCtrl'
        })
        .when('/show', {
            templateUrl: 'tpl/show.html',
            controller: 'showCtrl'
        })
    ;
    $locationProvider.html5Mode(true);
});