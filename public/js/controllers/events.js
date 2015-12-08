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

    $scope.kapitels = function(){
        var arr = [];
        for (var i = 1; i < 151; i++) {
            arr.push({
                name: i,
                isFlipped: false
            });
        }
        for (var j = 0; j < $scope.event.assignments.length; j++) {
            var current = $scope.event.assignments[j].kapitel;
            if(arr[current]){
                arr[current].isFlipped = true;
                arr[current].takenBy = $scope.event.assignments[j].assignedTo;
            }
        }
        return arr;
    }();

    $scope.progress = 25;

    $scope.getProgress = function(){
        arr2 = $scope.kapitels.filter(function(obj){
            return obj.isFlipped === true;
        });

        $scope.progress = 150 / arr2.length;//fix percent math
    };


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
        if(!auth.isLoggedIn()) {
            return;
        }
        events.addAssignment(event._id, {
            kapitel: kapitel.name,
            event: event._id
        }).success(function(assignment) {
            $scope.event.assignments.push(assignment);
            kapitel.isFlipped = true;
            kapitel.takenBy = assignment.assignedTo;
            $scope.getProgress();
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
