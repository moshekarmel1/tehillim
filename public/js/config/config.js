var app = angular.module('tehillim');
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '/views/home.html',
        controller: 'MainCtrl',
        resolve: {
            postPromise: ['events', function(events){
                return events.getAll();
            }]
        }
    })
    .state('add', {
        url: '/add',
        templateUrl: '/views/add.html',
        controller: 'MainCtrl'
    })
    .state('browse', {
        url: '/browse/{id}',
        templateUrl: '/views/events.html',
        controller: 'EventsCtrl',
        resolve: {
            event: ['$stateParams', 'events', function($stateParams, events) {
                return events.get($stateParams.id);
            }]
        }
    })
    .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
            if(auth.isLoggedIn()){
                $state.go('add');
            }
        }]
    })
    .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
            if(auth.isLoggedIn()){
                $state.go('add');
            }
        }]
    });
    $urlRouterProvider.otherwise('home');
}]);
