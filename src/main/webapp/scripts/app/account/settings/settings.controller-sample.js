'use strict';

angular.module('lobbycalApp')
    .controller('SettingsController', function ($scope, Principal, Auth, Language, $translate) {
        $scope.success = null;
        $scope.error = null;
        Principal.identity(true).then(function(account) {
            console.log(account.id);
            console.log($scpoe.user.id);

            $scope.settingsAccount = account;
            $scope.pluginUrl = "https://yourhost/api/meetings/mep/"+account.id;
        });

        $scope.save = function () {
            Auth.updateAccount($scope.settingsAccount).then(function() {
                $scope.error = null;
                $scope.success = 'OK';
                Principal.identity().then(function(account) {
                    $scope.settingsAccount = account;
                });
                Language.getCurrent().then(function(current) {
                    if ($scope.settingsAccount.langKey !== current) {
                        $translate.use($scope.settingsAccount.langKey);
                    }
                });
            }).catch(function() {
                $scope.success = null;
                $scope.error = 'ERROR';
            });
        };
    });
