app.controller('replayCtrl', function ($rootScope, $scope, $sce, dailymotion) {

    $scope.data = [];
    $scope.page = 1;

    dailymotion.replay($scope.page).then(function (response) {
        console.log(response.data);

        $scope.data.push({
            id: response.data.id,
            title: response.data.title,
            img: response.data.thumbnail_120_url
        })
    });
});