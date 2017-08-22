app.controller('gamerCtrl', function ($rootScope, $scope, $sce, api) {
    $rootScope.night = false;

    $scope.data = [];
    api.gamer().then(function (response) {
        var rows = [];
        angular.forEach(response.data, function (data) {
            data.txt = $sce.trustAsHtml(data.txt);
            data.ingredients = $sce.trustAsHtml(data.ingredients);

            if (data.active) {
                rows.push(data);
                if (rows.length == 2) {
                    $scope.data.push(rows);
                    rows = [];
                }
            }
        });

        if (rows.length > 0) {
            $scope.data.push(rows);
        }
    });
});