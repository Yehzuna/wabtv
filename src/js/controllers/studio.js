app.controller('studioCtrl', function ($rootScope, $scope) {
    $rootScope.night = false;

    $scope.gallery = [];
    for(var i = 1; i < 13; i++) {
        $scope.gallery.push(i);
    }

    $scope.large = [10, 11];
});