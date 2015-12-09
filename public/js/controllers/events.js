var app = angular.module('tehillim');
app.controller('EventsCtrl', ['$scope', 'events', 'event', 'auth', function($scope, events, event, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.event = event;
    $scope.currentUser = auth.currentUser;

    $scope.order = '-upvotes';

    $scope.setOrder = function (order) {
        $scope.order = order;
    };

    $scope.toggleEdit = function(){
        $scope.edit = !$scope.edit;
    };

    $scope.kapitels = [];

    $scope.getKapitels = function(){
        var arr = [];
        for (var i = 1; i < 151; i++) {
            arr.push({
                name: i,
                isFlipped: false
            });
        }
        for (var j = 0; j < $scope.event.assignments.length; j++) {
            var current = $scope.event.assignments[j].kapitel - 1;
            if(arr[current]){
                arr[current].isFlipped = true;
                arr[current].takenBy = $scope.event.assignments[j].assignedTo;
            }
        }
        $scope.kapitels = arr;
        return arr;
    }();

    /*
    $scope.save = function(){
        events.update(event._id, {
            postBody: $scope.updatedVersion
        }).success(function(data){
            $scope.post.postBody = data.postBody;
            $scope.updatedVersion = data.postBody;
            $scope.edit = false;
        });
    };
    */

    $scope.addAssignment = function(kapitel){
        console.log(kapitel);
        if(!auth.isLoggedIn()) {
            return;
        }
        events.addAssignment(event._id, {
            kapitel: kapitel.name,
            event: event._id
        }).success(function(data) {
            $scope.event.assignments.push(data.assignment);
            $scope.event = data.event;
            kapitel.isFlipped = true;
            kapitel.takenBy = data.assignment.assignedTo;
        });
    };
    /*
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
