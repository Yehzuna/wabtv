app.controller('progCtrl', function ($scope, $http, $location, api) {
    console.log('progCtrl');

    $scope.prog = [];
    api.prog().then(function (response) {
        $scope.prog = response.data;
        console.log($scope.prog);
    }).catch(function () {
        $scope.prog = [];
    });

});