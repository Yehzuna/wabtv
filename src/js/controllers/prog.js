app.controller('progCtrl', function ($scope, $http, $location, api) {
    console.log('progCtrl');

    $scope.hours = [
        "14:00 20:00",
        "20:00 22:00",
        "22:00 00:00",
        "00:00 02:00"
    ];

    $scope.schedule = [];
    api.prog().then(function (response) {
        $scope.schedule = response.data;
        console.log($scope.schedule);
    }).catch(function () {
        $scope.schedule = [];
    });

});