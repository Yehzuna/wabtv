app.directive('header', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'tpl/header.html',
        controller: function ($scope) {
            // Your behaviour goes here :)
            console.log("test");
            $scope.menu = false;

            $scope.open = function (status) {
                console.log(status);
                $scope.menu = status;
            }
        }
    }
});

