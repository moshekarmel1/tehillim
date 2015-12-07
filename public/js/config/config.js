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
    .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/views/posts.html',
        controller: 'EventsCtrl',
        resolve: {
            post: ['$stateParams', 'events', function($stateParams, events) {
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
                $state.go('home');
            }
        }]
    })
    .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
            if(auth.isLoggedIn()){
                $state.go('home');
            }
        }]
    });
    $urlRouterProvider.otherwise('home');
}]);
