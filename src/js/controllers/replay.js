app.controller('replayCtrl', function ($scope, $document, $filter, dailymotion) {

    $scope.data = [];
    $scope.nb = 0;
    $scope.page = 1;
    $scope.active = 0;
    $scope.more = false;
    $scope.message = false;
    $scope.title = false;

    $scope.getData = function (init) {
        dailymotion.replay($scope.page).then(function (response) {
            console.log(response.data);
            $scope.nb = response.data.total;
            $scope.more = response.data.has_more;

            angular.forEach(response.data.list, function (data, index) {
                if (index == 0 && init) {
                    $scope.loadDailymotion(data.id, data.title, false);
                }

                $scope.data.push({
                    id: data.id,
                    date: $filter('date')(data.updated_time*1000, 'dd/MM/yyyy'),
                    duration: $filter('duration')(data.duration * 1000),
                    title: data.title,
                    img: data.thumbnail_360_url
                })
            });
        }).catch(function () {
            $scope.message = "Pas de résultats disponible.";
        });
    };

    $scope.next = function () {
        $scope.page = $scope.page + 1;

        $scope.getData(false);
    };

    $scope.loadDailymotion = function (id, title, scroll) {
        $scope.active = id;
        $scope.title = title;

        DM.player(document.getElementById("player"), {
            video: id
        });

        if (scroll) {
            var element = angular.element(document.getElementById('player'));
            $document.scrollToElement(element, 10, 1000);
        }
    };

    // init
    $scope.getData(true);
});