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
        .when('/login', {
            templateUrl: 'tpl/login.html',
            controller: 'loginCtrl',
            data: {
                title: "Admin - " + title,
                slug: "login"
            }
        })
        .when('/admin', {
            templateUrl: 'tpl/admin.html',
            controller: 'adminCtrl',
            data: {
                title: "Admin - " + title,
                slug: "admin"
            }
        })
        .otherwise({
            template:'<div class="notFound"><span>La page demandée n\'existe pas !</span><div class="character-highlight"> <div class="move"></div></div></div>'
        })
    ;

    $locationProvider.html5Mode(true);
});