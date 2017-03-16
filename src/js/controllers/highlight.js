app.controller('highlightCtrl', function ($scope, $document, $filter, twitch) {

    $scope.data = [];
    $scope.message = false;
    $scope.title = false;
    $scope.active = false;

    $scope.period = "week";
    $scope.periods = {
        week: 'les clips de la semaine',
        month: 'les clips du mois',
        all: 'tous les clips'
    };

    $scope.getData = function () {
        twitch.clip($scope.period).then(function (response) {
            console.log(response.data);

            angular.forEach(response.data.clips, function (data, index) {
                 if (index == 0) {
                    $scope.loadTwitch(data.embed_url, data.title, false);
                 }

                 $scope.data.push({
                     url: data.embed_url,
                     date: $filter('date')(data.created_at, 'dd/MM/yyyy hh:mm'),
                     duration: $filter('duration')(data.duration * 1000),
                     title: data.title,
                     img: data.thumbnails.medium
                 })
             });

        }).catch(function () {
            $scope.message = "Pas de résultats disponible.";
        });
    };

    $scope.setPeriod = function (period) {
        $scope.period = period;
        $scope.data = [];

        $scope.getData();
    };

    $scope.loadTwitch = function (url, title, scroll) {
        $scope.title = title;
        $scope.active = url;

        document.getElementById('player').src = url;

        if (scroll) {
            var element = angular.element(document.getElementById('player'));
            $document.scrollToElement(element, 10, 1000);
        }
    };

    // init
    $scope.getData();
});