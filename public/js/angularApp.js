var app = angular.module('tehillim', ['ui.router', 'angularMoment']);

/*app.factory('posts', ['$http', 'auth', function($http, auth){
    var o = {
        posts: []
    };

    o.getAll = function() {
        return $http.get('/posts').success(function(data){
            angular.copy(data, o.posts);
        });
    };

    o.create = function(post) {
        return $http.post('/posts', post, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data){
            o.posts.push(data);
        });
    };

    o.update = function(id, post) {
        return $http.put('/posts/' + id, post, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    };

    o.upvote = function(post) {
        return $http.put('/posts/' + post._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        })
        .success(function(data){
            post.upvotes += 1;
        });
    };

    o.get = function(id) {
        return $http.get('/posts/' + id).then(function(res){
            return res.data;
        });
    };

    o.addComment = function(id, comment) {
        return $http.post('/posts/' + id + '/comments', comment, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    };

    o.upvoteComment = function(post, comment) {
        return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        })
        .success(function(data){
            comment.upvotes += 1;
        });
    };

    return o;
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '/views/home.html',
        controller: 'MainCtrl',
        resolve: {
            postPromise: ['posts', function(posts){
                return posts.getAll();
            }]
        }
    })
    .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/views/posts.html',
        controller: 'PostsCtrl',
        resolve: {
            post: ['$stateParams', 'posts', function($stateParams, posts) {
                return posts.get($stateParams.id);
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
}])

.factory('auth', ['$http', '$window', function($http, $window){
    var auth = {};
    //save jwt token in local storage
    auth.saveToken = function (token){
        $window.localStorage['parnassah-token'] = token;
    };
    //get jwt token from local storage
    auth.getToken = function (){
        return $window.localStorage['parnassah-token'];
    }
    //is the user logged in?
    auth.isLoggedIn = function(){
        var token = auth.getToken();
        if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };
    //get current user
    auth.currentUser = function(){
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.username;
        }
    };
    //register route
    auth.register = function(user){
        return $http.post('/register', user).success(function(data){
            auth.saveToken(data.token);
        });
    };
    //login route
    auth.logIn = function(user){
        return $http.post('/login', user).success(function(data){
            auth.saveToken(data.token);
        });
    };

    auth.logOut = function(){
        $window.localStorage.removeItem('parnassah-token');
    };

    return auth;
}]);

app.controller('MainCtrl', ['$scope', 'posts', 'auth', function($scope, posts, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.posts = posts.posts;

    $scope.order = '-upvotes';

    $scope.setOrder = function (order) {
        $scope.order = order;
    };

    $scope.addPost = function(){
        if(!$scope.title || $scope.title === '') {
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
        posts.upvote(post).error(function(error){
            $scope.error = error;
        });
    };
}]);

app.controller('PostsCtrl', ['$scope', 'posts', 'post', 'auth', function($scope, posts, post, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.post = post;
    $scope.edit = false;
    $scope.updatedVersion = post.postBody;
    $scope.currentUser = auth.currentUser;


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
        if($scope.body === '' || !isLoggedIn()) { 
            return; 
        }
        posts.addComment(post._id, {
            body: $scope.body
        }).success(function(comment) {
            $scope.post.comments.push(comment);
        });
        $scope.body = '';
    };

    $scope.incrementUpvotes = function(comment){
        posts.upvoteComment(post, comment).error(function(error){
            $scope.error = error;
        });
    };
}]);

app.controller('AuthCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth){
    $scope.user = {};

    $scope.register = function(){
        auth.register($scope.user).error(function(error){
            $scope.error = error;
        }).then(function(){
            $state.go('home');
        });
    };

    $scope.logIn = function(){
        auth.logIn($scope.user).error(function(error){
            $scope.error = error;
        }).then(function(){
            $state.go('home');
        });
    };
}]);

app.controller('NavCtrl', ['$scope', 'auth', function($scope, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;
}]);
*/