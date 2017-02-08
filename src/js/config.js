app.config(function ($routeProvider, $locationProvider) {

    var title = "We Are Bob Television";

    $routeProvider
        .when('/', {
            templateUrl: 'tpl/home.html',
            controller: 'homeCtrl',
            data: {
                title: title,
                css: "home"
            }
        })
        .when('/schedule', {
            templateUrl: 'tpl/schedule.html',
            controller: 'scheduleCtrl',
            data: {
                title: "Programme - " + title,
                css: "schedule"
            }
        })
        .when('/shows', {
            templateUrl: 'tpl/shows.html',
            controller: 'showsCtrl',
            data: {
                title: "Emissions - " + title,
                css: "shows"
            }
        })
        .when('/partners', {
            templateUrl: 'tpl/partners.html',
            controller: 'partnersCtrl',
            data: {
                title: "Partenaires - " + title,
                css: "partners"
            }
        })
    ;
    $locationProvider.html5Mode(true);
});