app.controller('progCtrl', function ($scope, $http, $location, api) {
    console.log('progCtrl');

    $scope.hours = [
        "14:00 - 20:00",
        "20:00 - 22:00",
        "22:00 - 00:00",
        "00:00 - 02:00"
    ];

    $scope.schedules = [];
    api.prog().then(function (response) {
        $scope.schedules = response.data;
        console.log($scope.schedules);
    });

});