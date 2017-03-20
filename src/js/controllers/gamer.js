app.controller('gamerCtrl', function ($rootScope, $scope, $sce, api) {
    $rootScope.night = false;

    $scope.data = [];
    api.gamer().then(function (response) {

        var row = [];
        angular.forEach(response.data, function(data) {
            data.txt = $sce.trustAsHtml(data.txt);

            row.push(data);
            if(row.length == 2) {
                $scope.data.push(row);
                row = [];
            }
        });

        if(row.length > 0) {
            $scope.data.push(row);
        }

        console.log($scope.data);

    });
});