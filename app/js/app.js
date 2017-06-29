'use strict';

var app=angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	
$routeProvider
    .when('/login', {templateUrl: 'partials/tpl/login.tpl.html',controller:'loginCtrl',title : 'Login'})
	.when('/home', {templateUrl: 'partials/home.html',controller:'homeCtrl',title : 'Register'})
	.when('/register', {templateUrl: 'partials/register.html',controller:'loginCtrl',title : 'Home'})
	.otherwise({redirectTo: '/login'});
}]);


app.run(function($rootScope,$route){
	$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
    //Change page title, based on Route information
    $rootScope.title = $route.current.title;
  });
});

/*
app.run(function($rootScope, $location, loginService){
	var routespermission=['/home'];
	$rootScope.$on('$routeChangeStart', function(){
		if(routespermission.indexOf($location.path()) !=-1 && !loginService.islogged())
		{
			$location.path('/login');
		}
	});	
	
	/*if(loginService.islogged()) 
		$location.path('/home');
	else
		$location.path('/login');

});
*/