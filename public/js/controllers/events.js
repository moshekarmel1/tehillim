var app = angular.module('tehillim');
app.controller('EventsCtrl', ['$scope', 'events', 'event', 'auth', function($scope, events, event, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.event = event;
    $scope.currentUser = auth.currentUser;
    $scope.actualCurrentUser = auth.currentUser();

    $scope.listOfOptions = ['Show all', 'Only show available', 'Lowest to Highest', 'Highest to Lowest'];

    $scope.order = 'name';

    $scope.hidden = false;

    $scope.selectedItemChanged = function(){
        switch($scope.selectedItem){
            case 'Only show available':
                $scope.hidden = true;
                break;
            case 'Show all':
                $scope.hidden = false;
                break;
            case 'Lowest to Highest':
                $scope.order = 'name';
                break;
            case 'Highest to Lowest':
                $scope.order = '-name';
                break;
            default:
                break;
        }
    };

    $scope.setOrder = function (order) {
        $scope.order = order;
    };

    $scope.kapitels = [];

    $scope.getKapitels = function(){
        var arr = [];
        for (var i = 1; i < $scope.event.max + 1; i++) {
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

    $scope.addAssignment = function(kapitel){
        if(!auth.isLoggedIn()) {
            $scope.error = {
                class: 'warning',
                message: 'You have to register or log in before you can make a selection...'
            };
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

    $scope.deleteAssignment = function(kapitel){
        var assign;
        for (var i = 0; i < $scope.event.assignments.length; i++) {
            if($scope.event.assignments[i].kapitel === kapitel.name){
                assign = $scope.event.assignments[i];
                break;
            }
        }
        if(!assign) return;
        if(assign.assignedTo !== $scope.currentUser()){
            $scope.error = {
                class: 'warning',
                message: 'You can\'t delete assignments that aren\'t yours...'
            };
            return;
        }else{
            events.deleteAssignment(event._id, assign).success(function(data) {
                $scope.event = data;
                kapitel.isFlipped = false;
                kapitel.takenBy = null;
            });
        }
    };

    $scope.sendEmail = function(event) {
        var subject = (event.max === 150) ? escape("Can you help say some tehillim?") : escape("Are you making challah this week?");
        var link = "mailto:"
                 + "?subject=" + subject
                 + "&body=" + escape(window.location); 

        window.location.href = link;
     };
}]);
