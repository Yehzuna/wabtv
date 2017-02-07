app.directive('footer', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'tpl/footer.html',
        controller: function ($scope) {
            $scope.menu = false;
            $scope.open = function (status) {
                $scope.menu = status;
            }
        }
    }
});