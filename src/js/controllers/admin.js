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

    loadJs("bower_components/cryptojslib/rollups/sha256.js");

    $scope.submit = function () {
        var hash = CryptoJS.SHA256(CryptoJS.SHA256($scope.login) + ':WabTvHash:' + CryptoJS.SHA256($scope.password));

        api.admin({
            hash: hash.toString(),
            action: 'login'
        }).then(function () {
            sessionStorage.setItem('WabTvHash', hash);
            $location.path('admin');
        }).catch(function () {
            $scope.message = "Unauthorized";
        });
    };
});

app.controller('adminCtrl', function ($rootScope, $scope, $location, api, twitch) {
    $rootScope.night = false;

    // common
    var hash = sessionStorage.getItem('WabTvHash');
    if (!hash) {
        $location.path('login');
        return false;
    }

    $scope.message = false;

    $scope.tab = "schedule";
    $scope.tabs = function (tab) {
        $scope.tab = tab;
    };

    $scope.logout = function () {
        sessionStorage.removeItem('WabTvHash');
        $location.path('login');
    };


    // config
    $scope.playerType = [
        "twitch",
        "youtube"
    ];
    $scope.config = {
        'players': []
    };
    $scope.configCopy = {
        'players': []
    };

    api.config().then(function (response) {
        $scope.config = response.data;

        angular.copy($scope.config, $scope.configCopy);
    }).catch(function () {
        $scope.message = "Unauthorized";
    });

    $scope.deletePlayer = function (player) {
        if (!confirm("Supprimer définitivement le player " + player.alias + " ?")) {
            return false;
        }

        angular.forEach($scope.config.players, function (data, index) {
            if (data.id === player.id && data.alias === player.alias) {
                $scope.config.players.splice(index, 1);
            }
        });
    };

    $scope.addPlayer = function () {
        $scope.config.players.push({
            "alias": "Lorem",
            "type": "twitch",
            "key": "",
            "id": false,
            "title": "",
            "active": false
        });
    };

    $scope.twitchVerify = function (player) {
        twitch.id(player.key).then(function (response) {
            if (response.data._total === 1) {
                player.id = response.data.users[0]._id;
            } else {
                $scope.message = "Le player twitch " + player.key + " n'est pas valide.";
            }
        }).catch(function () {
            $scope.message = "Le player twitch " + player.key + " n'est pas valide.";
        });
    };

    $scope.twitchReset = function (player) {
        if (player.type === 'twitch') {
            player.id = false;
        }
    };

    $scope.submitConfig = function () {
        var error = false;

        if ($scope.config.players.length === 0) {
            $scope.message = "Le site doit avoir au moins un player actif.";
            error = true;
        }

        var active = 0;
        angular.forEach($scope.config.players, function (player) {
            if (player.active) {
                active++;
            }

            if (player.type === 'twitch' && !player.id) {
                $scope.message = "Le player twitch " + player.key + " n'est pas valide.";
                error = true;

                return false;
            }
        });

        if (active !== 1) {
            $scope.message = "Le site doit avoir un player actif.";
            error = true;
        }

        if (!error) {
            api.admin({
                hash: hash,
                action: 'config',
                data: $scope.config
            }).then(function () {
                $scope.message = false;
                angular.copy($scope.config, $scope.configCopy);
            }).catch(function (data) {
                $scope.message = data.statusText;
            });
        }
    };


    // schedule
    $scope.shows = {
        'default': "Autre",
        'omega': "O'Mega Bob Show",
        'brico': "Bob le Bricoleur"
    };

    $scope.hours = [
        "-"
    ];
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

    $scope.submitSchedule = function () {
        api.admin({
            hash: hash,
            action: 'schedule',
            data: $scope.schedules
        }).then(function () {
            $scope.message = false;
            angular.copy($scope.schedules, $scope.schedulesCopy);
        }).catch(function (data) {
            $scope.message = data.statusText;
        });
    };

    $scope.addSlot = function () {
        if ($scope.currentSchedule.slots.length >= 5) {
            alert("5 créneaux maximum par jour");
            return false;
        }

        $scope.currentSchedule.slots.push({
            "show": "default",
            "title": "",
            "start": "-",
            "end": "-"
        });
    };

    $scope.removeSlot = function (index) {
        if ($scope.currentSchedule.slots.length <= 1) {
            alert("Un jour doit avoir au moins un créneau.");
            return false;
        }

        $scope.currentSchedule.slots.splice(index, 1);
    };

    $scope.offDay = function () {
        $scope.currentSchedule.slots = [{
            "show": "default",
            "title": "",
            "start": "-",
            "end": "-"
        }];
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
        action: 'images'
    }).then(function (response) {
        $scope.images = response.data;
    }).catch(function () {
        $scope.message = "Unauthorized";
    });

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
            data.title = data.title.replace(/<(?:.|\n)*?>/gm, '').trim();
        });

        api.admin({
            hash: hash,
            action: 'gamer',
            data: $scope.gamers
        }).then(function () {
            $scope.message = false;
            angular.copy($scope.gamers, $scope.gamersCopy);
        }).catch(function (data) {
            $scope.message = data.statusText;
        });
    };

    $scope.newGamer = function () {
        $scope.gamers.push({
            "id": Date.now(),
            "active": false,
            "title": "Lorem ipsum dolor sit amet",
            "img": "",
            "ingredients": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
            "txt": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
        });

        $scope.submitGamer();
    };

    $scope.deleteGamer = function () {
        if (!confirm("Supprimer définitivement la recette" + $scope.currentGamer.title + " ?")) {
            return false;
        }

        angular.forEach($scope.gamers, function (data, index) {
            if (data.id === $scope.currentGamer.id) {
                $scope.gamers.splice(index, 1);
            }
        });

        $scope.submitGamer();
    };

    $scope.setImage = function (img) {
        $scope.currentGamer.img = img;
    };

    $scope.addImage = function () {
        var file = document.getElementById('file');
        var reader = new FileReader();

        reader.onloadend = function (e) {
            api.admin({
                hash: hash,
                action: 'file',
                data: e.target.result
            }).then(function (response) {
                $scope.message = false;
                $scope.images = response.data;
                file.value = "";
            }).catch(function (data) {
                $scope.message = data.statusText;
                file.value = "";
            });
        };

        reader.readAsDataURL(file.files[0]);
    };

    $scope.removeImage = function (img) {
        if (!confirm("Supprimer définitivement l'image ?")) {
            return false;
        }

        api.admin({
            hash: hash,
            action: 'remove',
            data: img
        }).then(function (response) {
            $scope.message = false;
            $scope.images = response.data;
        }).catch(function (data) {
            $scope.message = data.statusText;
        });
    };

    // watcher
    $scope.$watch('schedules', function (newValue, oldValue, scope) {
        if (!angular.equals(scope.schedules, scope.schedulesCopy)) {
            scope.message = "Modification non sauvegardé.";
        } else {
            scope.message = false;
        }
    }, true);

    $scope.$watch('gamers', function (newValue, oldValue, scope) {
        if (!angular.equals(scope.gamers, scope.gamersCopy)) {
            scope.message = "Modification non sauvegardé.";
        } else {
            scope.message = false;
        }
    }, true);

    $scope.$watch('config', function (newValue, oldValue, scope) {
        if (!angular.equals(scope.config, scope.configCopy)) {
            scope.message = "Modification non sauvegardé.";
        } else {
            scope.message = false;
        }
    }, true);

    window.onbeforeunload = function () {
        if (!angular.equals($scope.schedules, $scope.schedulesCopy)) {
            return true;
        }
        if (!angular.equals($scope.gamers, $scope.gamersCopy)) {
            return true;
        }
        if (!angular.equals($scope.config, $scope.configCopy)) {
            return true;
        }
    };
});