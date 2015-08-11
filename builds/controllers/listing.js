myApp.controller('ListingController', function($scope, $rootScope, $firebaseObject, $firebaseArray) {

    var ref = new Firebase("https://humanitarna.firebaseio.com/cases");
    var query = ref.orderByChild("date");
    $scope.cases = $firebaseArray(query);

    $scope.sortByName = function(){
     	$scope.customOrder = 'name';
    }

    $scope.sortByLastname = function(){
		$scope.customOrder = 'lastname';
    }

    $scope.sortByArea = function(){
    	$scope.customOrder = 'area';
    }

});
