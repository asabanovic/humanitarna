var myApp =  angular.module('myApp',['ngRoute','ngAnimate','firebase','uiGmapgoogle-maps','flow']);

myApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/home',{
		templateUrl: 'views/map.html',
		controller: 'MapController'
	})
	.when('/lista', {
		templateUrl: 'views/listing.html',
		controller: 'ListingController'
	})
	.when('/unos',{
		templateUrl: 'views/entry.html',
		controller: 'EntryController'
	})
	.otherwise({
		redirectTo: '/home'
	});
}])