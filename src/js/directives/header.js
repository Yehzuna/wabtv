app.directive('header', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'tpl/partials/header.html',
        controller: function ($rootScope, $scope) {
            $scope.menu = false;
            $scope.open = function (status) {
                $scope.menu = status;
            };
        }
    }
});