app.controller('replayCtrl', function ($rootScope, $scope, $document, $filter, youtube) {
    $rootScope.night = false;

    $scope.data = [];
    $scope.nb = 0;
    $scope.token = false;
    $scope.active = 0;
    $scope.more = false;
    $scope.message = false;
    $scope.title = false;
    $scope.loading = true;

    $scope.getData = function (init) {
        youtube.replay($scope.token).then(function (response) {
            $scope.nb = response.data.pageInfo.totalResults;

            if (response.data.nextPageToken) {
                $scope.more = true;
                $scope.token = response.data.nextPageToken;
            } else {
                $scope.more = false;
            }

            var ids = [];
            angular.forEach(response.data.items, function (data) {
                ids.push(data.contentDetails.videoId);
            });

            youtube.video(ids).then(function (response) {
                angular.forEach(response.data.items, function (data, index) {
                    if (index === 0 && init) {
                        $scope.loadYoutube(data.id, data.snippet.title, false);
                    }

                    $scope.data.push({
                        id: data.id,
                        title: data.snippet.title,
                        img: data.snippet.thumbnails.medium.url,
                        date: $filter('date')(data.snippet.publishedAt, 'dd/MM/yyyy'),
                        duration: $filter('duration')(data.contentDetails.duration)
                    });
                });
            });

            $scope.loading = false;
        }).catch(function () {
            $scope.message = "Pas de résultats disponible.";
            $scope.loading = false;
        });
    };

    $scope.next = function () {
        $scope.loading = true;

        ga('send', 'event', 'WabTV', 'Replay', 'Next page');

        $scope.getData(false);
    };

    $scope.loadYoutube = function (id, title, scroll) {
        $scope.active = id;
        $scope.title = title;

        document.getElementById('player_iframe').src = "https://www.youtube.com/embed/" + id + "?autoplay=1";

        if (scroll) {
            var element = angular.element(document.getElementById('player'));
            $document.scrollToElement(element, 10, 1000);
        }
    };

    // init
    $scope.getData(true);
});