var app = angular.module('tehillim');
app.controller('MainCtrl', ['$scope', 'events', 'auth', '$window', function($scope, events, auth, $window){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.events = events.events;

    $scope.listOfOptions = ['Finish Sefer Tehillim', 'Take Challah with a bracha'];

    $scope.order = 'event.created';

    $scope.setOrder = function (order) {
        $scope.order = order;
    };

    $scope.add = function(){
        $window.location.href = '/#/add';
    };
    
    $scope.addPost = function(){
        if(!$scope.title || $scope.title === '') {
            $scope.error = {
                class: 'warning',
                message: 'Please fill out a title...'
            };
            return;
        }
        if(!$scope.name || $scope.name === '') {
            $scope.error = {
                class: 'warning',
                message: 'Please enter a hebrew name...'
            };
            return;
        }
        var max;
        switch($scope.selectedItem) {
            case 'Finish Sefer Tehillim':
                max = 150;
                break;
            case 'Take Challah with a bracha':
                max = 40;
                break;
            default:
                max = 150;
                break;
        }
        events.create({
            title: $scope.title.trim(),
            name: $scope.name.trim(),
            max: max,
            description: $scope.description
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