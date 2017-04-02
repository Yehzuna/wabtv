app.config(function ($routeProvider, $locationProvider) {

    var title = "We Are Bob Television";
    var desc = "BobLeGob, Shoutcaster de Saveurs et Attiseur de Haine";

    $routeProvider
        .when('/', {
            templateUrl: 'tpl/home.html',
            controller: 'homeCtrl',
            data: {
                title: title,
                desc: desc,
                slug: "home"
            }
        })
        .when('/schedule', {
            templateUrl: 'tpl/schedule.html',
            controller: 'scheduleCtrl',
            data: {
                title: "Programme - " + title,
                desc: "Programme de la semaine de la WABTV",
                slug: "schedule"
            }
        })
        .when('/replay', {
            templateUrl: 'tpl/replay.html',
            controller: 'replayCtrl',
            data: {
                title: "Replay - " + title,
                desc: "Revoir les dernières emissions de la WABTV",
                slug: "replay"
            }
        })
        .when('/shop', {
            templateUrl: 'tpl/shop.html',
            controller: 'shopCtrl',
            data: {
                title: "Boutique - " + title,
                desc: "Boutique officiel de la WABTV",
                slug: "shop"
            }
        })
        .when('/gamer', {
            templateUrl: 'tpl/gamer.html',
            controller: 'gamerCtrl',
            data: {
                title: "Les Recettes du Gamer - " + title,
                desc: "Liste des recettes de l'emission Recette du Gamer",
                slug: "gamer"
            }
        })
        .when('/highlight', {
            templateUrl: 'tpl/highlight.html',
            controller: 'highlightCtrl',
            data: {
                title: "Highlight - " + title,
                desc: "Les meilleurs moments de la WABTV",
                slug: "highlight"
            }
        })
        .when('/login', {
            templateUrl: 'tpl/login.html',
            controller: 'loginCtrl',
            data: {
                title: "Admin - " + title,
                desc: desc,
                slug: "login"
            }
        })
        .when('/admin', {
            templateUrl: 'tpl/admin.html',
            controller: 'adminCtrl',
            data: {
                title: "Admin - " + title,
                desc: desc,
                slug: "admin"
            }
        })
        .otherwise({
            template:'<div class="notFound"><span>La page demandée n\'existe pas !</span><div class="character-highlight"> <div class="move"></div></div></div>'
        })
    ;

    $locationProvider.html5Mode(true);
});