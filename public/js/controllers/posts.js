var app = angular.module('tehillim');
app.controller('PostsCtrl', ['$scope', 'posts', 'post', 'auth', function($scope, posts, post, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    /*$scope.post = post;
    $scope.edit = false;
    $scope.updatedVersion = post.postBody;
    $scope.currentUser = auth.currentUser;

    $scope.order = '-upvotes';

    $scope.setOrder = function (order) {
        $scope.order = order;
    };

    $scope.toggleEdit = function(){
        $scope.edit = !$scope.edit;
    };

    $scope.save = function(){
        if($scope.updatedVersion !== $scope.post.postBody){
            posts.update(post._id, {
                postBody: $scope.updatedVersion
            }).success(function(data){
                $scope.post.postBody = data.postBody;
                $scope.updatedVersion = data.postBody;
                $scope.edit = false;
            });
        }
    };

    $scope.addComment = function(){
        if($scope.body === '' || !auth.isLoggedIn()) { 
            return;
        }
        posts.addComment(post._id, {
            body: $scope.body
        }).success(function(comment) {
            $scope.post.comments.push(comment);
        });
        $scope.body = '';
    };

    $scope.upvote = function(post){
        if(!auth.isLoggedIn()) return;
        if(auth.currentUser() === post.author) return;
        posts.upvote(post).error(function(error){
            $scope.error = error;
        });
    };

    $scope.incrementUpvotes = function(comment){
        if(auth.currentUser() === comment.author) return;
        posts.upvoteComment(post, comment).error(function(error){
            $scope.error = error;
        });
    };*/
}]);
