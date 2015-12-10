var app = angular.module('tehillim');
app.factory('events', ['$http', 'auth', '$window', function($http, auth, $window){
    var o = {
        events: []
    };

    o.getAll = function() {
        return $http.get('/browse').success(function(data){
            angular.copy(data, o.events);
        });
    };

    o.create = function(event) {
        return $http.post('/browse', event, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data){
            o.events.push(data);
            $window.location.href = '/#/browse/' + data._id;
        });
    };

    o.update = function(id, event) {
        return $http.put('/browse/' + id, event, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    };

    o.get = function(id) {
        return $http.get('/browse/' + id).then(function(res){
            return res.data;
        });
    };

    o.addAssignment = function(id, assignment){
        return $http.post('/browse/' + id + '/assignments', assignment, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    };

    o.deleteAssignment = function(id, assignment){
        return $http.delete('/browse/' + id + '/assignments/' + assignment._id, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        });
    };

    return o;
}]);