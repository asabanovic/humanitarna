myApp.controller('NavigationController', function($scope, $location, $rootScope, $firebaseAuth, $firebaseObject) {
    $scope.loginButtonStatus = false;
    $scope.toggle = function() {
        $scope.loginButtonStatus = !$scope.loginButtonStatus;
    }
    var ref = new Firebase("https://humanitarna.firebaseio.com");
    $scope.auth = $firebaseAuth(ref);

    $scope.userLogin = function() {
            console.log('Logging in ... ');
            $scope.auth.$authWithPassword({
                email: $scope.user.email,
                password: $scope.user.password
            }).then(function(authData) {
                console.log(authData);
                $rootScope.currentUser = authData.password.email;
                $location.path('/lista');
                $scope.loginButtonStatus = false;
             }).catch(function(error) {
                console.log(error);
                $scope.message = error.toString();
            });
        } //login

    $scope.userLogout = function() {
    	$scope.user.email = '';
    	$scope.user.password = '';
        $location.path('/home');
        $rootScope.currentUser = false;
        $scope.auth.$unauth();
        
     }
});
