app.directive('header', function () {
    return {
        restrict: 'E',
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