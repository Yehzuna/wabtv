app.controller('homeCtrl', function ($scope, $http, $location, api) {
    console.log('homeCtrl');

    $scope.prog = [];
    api.prog().then(function (response) {
        $scope.prog = response.data;
        console.log($scope.prog);
    }).catch(function () {
        $scope.prog = [];
    });
});