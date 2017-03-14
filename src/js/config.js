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
        .when('/replay', {
            templateUrl: 'tpl/replay.html',
            controller: 'replayCtrl',
            data: {
                title: "Replay - " + title,
                slug: "replay"
            }
        })
        .when('/shop', {
            templateUrl: 'tpl/shop.html',
            controller: 'shopCtrl',
            data: {
                title: "Boutique - " + title,
                slug: "shop"
            }
        })
        .when('/gamer', {
            templateUrl: 'tpl/gamer.html',
            controller: 'gamerCtrl',
            data: {
                title: "Les Recettes du Gamer - " + title,
                slug: "gamer"
            }
        })
        .when('/highlight', {
            templateUrl: 'tpl/highlight.html',
            controller: 'highlightCtrl',
            data: {
                title: "Highlight - " + title,
                slug: "highlight"
            }
        })
    ;

    $locationProvider.html5Mode(true);
});