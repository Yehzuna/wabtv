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
        .when('/shows', {
            templateUrl: 'tpl/shows.html',
            controller: 'showsCtrl'
        })
    ;
    $locationProvider.html5Mode(true);
});