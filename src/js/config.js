app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'tpl/home.html',
            controller: 'homeCtrl'
        })
        .when('/schedule', {
            templateUrl: 'tpl/schedule.html',
            controller: 'scheduleCtrl'
        })
        .when('/show', {
            templateUrl: 'tpl/show.html',
            controller: 'showCtrl'
        })
    ;
    $locationProvider.html5Mode(true);
});