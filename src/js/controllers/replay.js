app.controller('replayCtrl', function ($rootScope, $scope, $sce, dailymotion) {

    $scope.data = [];
    $scope.page = 1;

    dailymotion.replay($scope.page).then(function (response) {
        console.log(response.data);

        angular.forEach(response.data.list, function(data) {
            $scope.data.push({
                id: data.id,
                title: data.title,
                img: data.thumbnail_360_url
            })
        });
    });
});