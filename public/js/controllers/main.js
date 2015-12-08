var app = angular.module('tehillim');
app.controller('MainCtrl', ['$scope', 'events', 'auth', '$window', function($scope, events, auth, $window){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.events = events.events;

    $scope.order = '-upvotes';

    $scope.setOrder = function (order) {
        $scope.order = order;
    };

    $scope.add = function(){
        $window.location.href = '/#/add';
    };
    
    $scope.addPost = function(){
        if(!$scope.title || $scope.title === '') {
            return;
        }
        if(!$scope.name || $scope.name === '') {
            return;
        }
        events.create({
            title: $scope.title.trim(),
            name: $scope.name.trim(),
            description: $scope.description,
        });
        $scope.title = '';
        $scope.name = '';
        $scope.description = '';
    };
    /*
    $scope.incrementUpvotes = function(post) {
        if(!auth.isLoggedIn()) return;
        if(auth.currentUser() === post.author) return;
        posts.upvote(post).error(function(error){
            $scope.error = error;
        });
    };*/
}]);