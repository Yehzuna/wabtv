app.directive('header', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'tpl/header.html',
        controller: function ($scope) {
            $scope.menu = false;
            $scope.open = function (status) {
                $scope.menu = status;
            }
        }
    }
});