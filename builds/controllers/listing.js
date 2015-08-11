myApp.controller('ListingController', function($scope, $rootScope, $firebaseObject, $firebaseArray) {

    var ref = new Firebase("https://humanitarna.firebaseio.com/cases");
    var query = ref.orderByChild("date").limitToLast(25);
    $scope.cases = $firebaseArray(query);

    console.log($scope.cases);

});
