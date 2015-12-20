var app = angular.module('tehillim');
app.controller('AuthCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth){
    $scope.user = {};

    $scope.register = function(){
        if(!$scope.user.username || $scope.user.username === '') {
            $scope.error = {
                class: 'warning',
                message: 'Please fill out a username...'
            };
            return;
        }
        if(!$scope.user.password || $scope.user.password === '') {
            $scope.error = {
                class: 'warning',
                message: 'Please fill out a password...'
            };
            return;
        }
        auth.register($scope.user).error(function(error){
            if(!error){
                $scope.error = {
                    class: 'danger',
                    message: 'This site does not work well with K9, sorry...'
                }
            }else{
                $scope.error = error;
                $scope.error.class = 'danger';
            }
        }).then(function(){
            $scope.error = {
                class: 'success',
                message: 'Success!'
            };
            window.history.back();
            //$state.go('home');
        });
    };

    $scope.logIn = function(){
        if(!$scope.user.username || $scope.user.username === '') {
            $scope.error = {
                class: 'warning',
                message: 'Please fill out a username...'
            };
            return;
        }
        if(!$scope.user.password || $scope.user.password === '') {
            $scope.error = {
                class: 'warning',
                message: 'Please fill out a password...'
            };
            return;
        }
        //the db stores everything lowercase anyway
        $scope.user.username = $scope.user.username.toLowerCase();
        auth.logIn($scope.user).error(function(error){
            if(!error){
                $scope.error = {
                    class: 'danger',
                    message: 'This site does not work well with K9, sorry...'
                }
            }else {
                $scope.error = error;
                $scope.error.class = 'danger';
            }
        }).then(function(){
            $scope.error = {
                class: 'success',
                message: 'Success!'
            };
            window.history.back();
            //$state.go('home');
        });
    };
}]);
