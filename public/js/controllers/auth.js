var app = angular.module('tehillim');
app.controller('AuthCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth){
    $scope.user = {};

    $scope.register = function(){
        auth.register($scope.user).error(function(error){
            console.log(error);
            $scope.error = error;
            $scope.error.class = 'danger';
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
        //the db stores everything lowercase anyway
        $scope.user.username = $scope.user.username.toLowerCase();
        auth.logIn($scope.user).error(function(error){
            $scope.error = error;
            $scope.error.class = 'danger';
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
