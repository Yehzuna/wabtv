app.controller('replayCtrl', function ($rootScope, $scope, $document, $filter, dailymotion) {

    $scope.data = [];
    $scope.nb = 0;
    $scope.page = 1;
    $scope.active = 0;
    $scope.more = false;

    dailymotion.replay($scope.page).then(function (response) {
        console.log(response.data);
        $scope.nb = response.data.total;
        $scope.more = response.data.has_more;

        angular.forEach(response.data.list, function (data, index) {
            if (index == 0) {
                $scope.loadDailymotion(data.id, false);
            }

            $scope.data.push({
                id: data.id,
                date: $filter('date')(data.updated_time*1000, 'dd/MM/yyyy'),
                duration: data.duration,
                title: data.title,
                img: data.thumbnail_360_url
            })
        });
    });

    $scope.next = function () {
        $scope.page = $scope.page + 1;
        //console.log($scope.page);

        dailymotion.replay($scope.page, $scope.search).then(function (response) {
            $scope.nb = response.data.total;
            $scope.more = response.data.has_more;

            angular.forEach(response.data.list, function (data) {
                $scope.data.push({
                    id: data.id,
                    date: $filter('date')(data.updated_time*1000, 'dd/MM/yyyy'),
                    duration: data.duration,
                    title: data.title,
                    img: data.thumbnail_360_url
                })
            });
        });
    };

    $scope.loadDailymotion = function (id, scroll) {
        $scope.active = id;

        DM.player(document.getElementById("player"), {
            video: id
        });

        if (scroll) {
            var element = angular.element(document.getElementById('replay'));
            $document.scrollToElement(element, 10, 1000);
        }
    };
});