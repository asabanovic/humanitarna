myApp.controller('EntryController', function($scope, $rootScope, $firebaseObject, $firebaseArray, $http) {

    var ref = new Firebase("https://humanitarna.firebaseio.com/cases");
    var cases = $firebaseArray(ref);

    $scope.caseAdded = false;

    $scope.addCase = function() {
            data = {
                name: $scope.case.name,
                lastname: $scope.case.lastname,
                area: $scope.case.area,
                address: $scope.case.address,
                phone: $scope.case.phone,
                family: $scope.case.family,
                description: $scope.case.description,
                images: $scope.imageStrings,
                date: Firebase.ServerValue.TIMESTAMP
            }
            cases.$add(data).then(function(ref) {
                $scope.caseAdded = true;
                $scope.entry.$setPristine();
                $scope.imageStrings = [];
                var id = ref.key();
                console.log("added record with id " + id);
             }, function(error) {
                console.log("Error:", error);
            });

            $scope.case = ""; // Reset value
        } //addMeeting


    $scope.imageStrings = [];
    $scope.processFiles = function(files) {
         $scope.totalUploaded = files.length;
         angular.forEach(files, function(flowFile, i) {
            var fileReader = new FileReader();
             fileReader.onload = function(event) {
                var uri = event.target.result;
                 callAjax(uri);
            };
            fileReader.readAsDataURL(flowFile.file);
        });

    };

    function callAjax(url) {
        console.log('calling ajax');
         var request = $http({
            method: "post",
            url: "http://localhost/humanitarna/builds/upload.php",
            data: {
                image: url
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        /* Check whether the HTTP Request is successful or not. */
        request.success(function(data) {
            $scope.imageStrings.push(data);
        });
     }

     function getCoordinates($case) {
        var address = $case.address;
        $http.get('https://maps.google.com/maps/api/geocode/json?address=' + encodeURIComponent(address)).
        then(function(response) {
            console.log(response);
            //createMarker($case, address);
        }, function(error) {

        });
    }
});
