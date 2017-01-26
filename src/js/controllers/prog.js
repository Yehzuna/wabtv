app.controller('progCtrl', function ($scope, $http, $location, api) {
    console.log('progCtrl');

    $scope.schedules = [];
    api.prog().then(function (response) {
        $scope.schedules = response.data;
        console.log($scope.schedules);
    });

});