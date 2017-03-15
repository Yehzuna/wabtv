app.controller('highlightCtrl', function ($scope, $document, $filter, twitch) {

    $scope.data = [];
    $scope.message = false;
    $scope.title = false;

    $scope.getData = function () {
        twitch.clip().then(function (response) {
            console.log(response.data);

            angular.forEach(response.data.clips, function (data, index) {
                 if (index == 0) {
                    $scope.loadTwitch(data.embed_url, data.title);
                 }

                 $scope.data.push({
                     url: data.embed_url,
                     date: $filter('date')(data.created_at, 'dd/MM/yyyy'),
                     duration: $filter('duration')(data.duration * 1000),
                     title: data.title,
                     img: data.thumbnails.medium
                 })
             });

        }).catch(function () {
            $scope.message = "Pas de résultats disponible.";
        });
    };

    $scope.loadTwitch = function (url, title) {
        $scope.title = title;

        document.getElementById('player').src = url;
    };

    // init
    $scope.getData(true);
});