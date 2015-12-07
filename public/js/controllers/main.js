var app = angular.module('tehillim');
app.controller('MainCtrl', ['$scope', 'posts', 'auth', '$window', function($scope, posts, auth, $window){
    $scope.isLoggedIn = auth.isLoggedIn;
    /*$scope.posts = posts.posts;

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
        if(!$scope.postBody || $scope.postBody === '') {
            return;
        }
        posts.create({
            title: $scope.title,
            postBody: $scope.postBody,
        });
        $scope.title = '';
        $scope.postBody = '';
    };

    $scope.incrementUpvotes = function(post) {
        if(!auth.isLoggedIn()) return;
        if(auth.currentUser() === post.author) return;
        posts.upvote(post).error(function(error){
            $scope.error = error;
        });
    };*/
}]);