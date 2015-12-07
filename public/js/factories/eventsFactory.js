var app = angular.module('tehillim');
app.factory('events', ['$http', 'auth', '$window', function($http, auth, $window){
    var o = {
        events: []
    };

    o.getAll = function() {
        return $http.get('/events').success(function(data){
            angular.copy(data, o.events);
        });
    };

    o.create = function(event) {
        return $http.post('/events', event, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data){
            o.events.push(data);
            $window.location.href = '/#/home';
        });
    };

    o.update = function(id, event) {
        return $http.put('/events/' + id, events, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    };

    o.get = function(id) {
        return $http.get('/events/' + id).then(function(res){
            return res.data;
        });
    };


    return o;
}]);