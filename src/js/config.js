app.config(function ($routeProvider, $locationProvider) {

    var title = "We Are Bob Television";

    $routeProvider
        .when('/', {
            templateUrl: 'tpl/home.html',
            controller: 'homeCtrl',
            data: {
                title: title,
                slug: "home"
            }
        })
        .when('/schedule', {
            templateUrl: 'tpl/schedule.html',
            controller: 'scheduleCtrl',
            data: {
                title: "Programme - " + title,
                slug: "schedule"
            }
        })
        .when('/shows', {
            templateUrl: 'tpl/shows.html',
            controller: 'showsCtrl',
            data: {
                title: "Emissions - " + title,
                slug: "shows"
            }
        })
        .when('/partners', {
            templateUrl: 'tpl/partners.html',
            controller: 'partnersCtrl',
            data: {
                title: "Partenaires - " + title,
                slug: "partners"
            }
        })
        .when('/replay', {
            templateUrl: 'tpl/replay.html',
            controller: 'replayCtrl',
            data: {
                title: "Replay - " + title,
                slug: "replay"
            }
        })
    ;
    $locationProvider.html5Mode(true);
});