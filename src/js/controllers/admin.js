function loadJs(src) {
    var script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}

function loadCss(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

app.controller('loginCtrl', function ($rootScope, $scope, $location, api) {
    $rootScope.night = false;
    $scope.message = false;

    loadJs("bower_components/cryptojslib/rollups/md5.js");

    $scope.submit = function () {
        var hash = CryptoJS.MD5(CryptoJS.MD5($scope.login) + ':WabTvHash:' + CryptoJS.MD5($scope.password));

        api.admin({
            hash: hash.toString(),
            login: true
        }).then(function () {
            sessionStorage.setItem('WabTvHash', hash);
            $location.path('admin');
        }).catch(function () {
            $scope.message = "Unauthorized";
        });
    };
});

app.controller('adminCtrl', function ($rootScope, $scope, $location, api) {
    $rootScope.night = false;

    // common
    var hash = sessionStorage.getItem('WabTvHash');
    if (!hash) {
        $location.path('login');
        return false;
    }

    $scope.message = false;

    $scope.tab = "gamer";
    $scope.tabs = function (tab) {
        $scope.tab = tab;
    };

    $scope.logout = function () {
        sessionStorage.removeItem('WabTvHash');
        $location.path('login');
    };


    // schedule
    $scope.shows = {
        'default': "Autre",
        'omega': "Omega",
        'brico': "Bob le Bricoleur"
    };
    $scope.hours = [];
    for (var h = 0; h < 24; h++) {
        if (h < 10) {
            h = "0" + h;
        }
        $scope.hours.push(h + ":00");
    }

    $scope.currentSchedule = [];
    $scope.schedulesCopy = [];
    $scope.schedules = [];
    api.schedule().then(function (response) {
        angular.forEach(response.data, function (data) {

            data.date = new Date(data.date);

            if ($scope.currentSchedule.length == 0) {
                $scope.currentSchedule = data;
            }

            $scope.schedules.push(data);
        });
        angular.copy($scope.schedules, $scope.schedulesCopy);
    }).catch(function () {
        $scope.message = "Unauthorized";
    });

    $scope.$watch('schedules', function (newValue, oldValue, scope) {
        if (!angular.equals(scope.schedules, scope.schedulesCopy)) {
            scope.message = "Modification non sauvegardé.";
        } else {
            scope.message = false;
        }
    }, true);

    window.onbeforeunload = function () {
        if (!angular.equals($scope.schedules, $scope.schedulesCopy)) {
            return true;
        }
    };

    $scope.submitSchedule = function () {
        api.admin({
            hash: hash,
            schedule: $scope.schedules
        }).then(function () {
            $scope.message = false;
            angular.copy($scope.schedules, $scope.schedulesCopy);
        }).catch(function (data) {
            $scope.message = data.statusText;
        });
    };

    $scope.slot = function () {
        $scope.currentSchedule.slots = [];

        var nb = 1;
        if (!$scope.currentSchedule.allDay) {
            nb = 4;
        }

        var hours = ["14:00", "20:00", "22:00", "00:00"]
        for (var i = 0; i < nb; i++) {
            $scope.currentSchedule.slots.push({
                "streamer": "",
                "show": "default",
                "title": "",
                "hour": hours[i]
            });
        }
    };

    $scope.export = function () {
        var div = document.getElementById('schedule').cloneNode(true);
        div.classList.add('export');

        document.body.appendChild(div);

        domtoimage.toJpeg(div, {quality: 0.95})
            .then(function (dataUrl) {
                window.open(dataUrl);
                div.remove();
            });
    };


    // gamer
    $scope.currentGamer = [];
    $scope.gamersCopy = [];
    $scope.gamers = [];
    api.gamer().then(function (response) {
        angular.forEach(response.data, function (data) {
            if ($scope.currentGamer.length == 0) {
                $scope.currentGamer = data;
            }

            $scope.gamers.push(data);
        });
        angular.copy($scope.gamers, $scope.gamersCopy);
    }).catch(function () {
        $scope.message = "Unauthorized";
    });

    $scope.images = [];
    api.admin({
        hash: hash,
        images: true
    }).then(function (response) {
        $scope.images = response.data;
    }).catch(function () {
        $scope.message = "Unauthorized";
    });

    $scope.select = function () {
        console.log($scope.currentGamer);
    };

    $scope.bold = function () {
        document.execCommand('bold');

        var element = document.getSelection().anchorNode;
        while (element.parentNode) {
            element = element.parentNode;
            if (element.classList.contains('editor')) {
                element.focus();
                return false;
            }
        }
    };

    $scope.submitGamer = function () {
        angular.forEach($scope.gamers, function (data) {
            data.title = data.title.replace(/<(?:.|\n)*?>/gm, '');
        });

        api.admin({
            hash: hash,
            gamer: $scope.gamers
        }).then(function () {
            $scope.message = false;
            angular.copy($scope.gamers, $scope.gamersCopy);
        }).catch(function (data) {
            $scope.message = data.statusText;
        });
    };

    $scope.new = function () {
        $scope.gamers.push({
            "title": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
            "img": "",
            "ingredients": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
            "txt": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
        });
        $scope.submitGamer();
    };

    $scope.delete = function () {
        $scope.gamers.push({
            "title": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
            "img": "",
            "ingredients": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
            "txt": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
        });
        $scope.submitGamer();
    };

    $scope.addImage = function (img) {
        $scope.currentGamer.img = img;
    };

    $scope.add = function () {
        var file = document.getElementById('file').files[0];
        var reader = new FileReader();
        reader.onloadend = function (e) {
            api.admin({
                hash: hash,
                file: e.target.result
            }).then(function (response) {
                $scope.message = false;
                $scope.images = response.data;
            }).catch(function (data) {
                $scope.message = data.statusText;
            });
        };
        reader.readAsDataURL(file);
    }
});