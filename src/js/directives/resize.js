app.directive('resize', function ($window) {
    return {
        restrict: 'A',
        link: function (scope) {
            scope.width = $window.innerWidth;

            function throttle(callback, wait) {
                var timer;
                var go = true;

                return function () {
                    if (go) {
                        go = false;
                        timer = setTimeout(function () {
                            timer = null;
                            go = true;
                            callback.call();
                        }, wait);
                    }
                };
            }

            function onResize(){
                scope.width = $window.innerWidth;
                scope.$digest();
            }


            $window.addEventListener('resize', throttle(onResize, 250));
        }
    }
});