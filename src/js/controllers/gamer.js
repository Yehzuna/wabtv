app.controller('gamerCtrl', function ($rootScope, $scope, $sce, api) {
    $rootScope.night = false;

    $scope.articles = [];
    api.gamer().then(function (response) {

        var i = 0;
        var j = 0;
        angular.forEach(response.data, function(data) {
            data.txt = $sce.trustAsHtml(data.txt);

            if($scope.articles[j]) {
                $scope.articles.push({j: []});
            }
            $scope.articles[j].push(data);

            i++;
            if(i > 1) {
                i = 0;
                j++;
            }
        });

        console.log($scope.articles);

    });
});