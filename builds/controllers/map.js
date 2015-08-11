myApp.controller('MapController', function($scope, $firebaseArray, $http) {

    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(43.94, 17.0000)
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();
    var ref = new Firebase("https://humanitarna.firebaseio.com/cases");
    $scope.cases = $firebaseArray(ref);

    $scope.cases.$loaded()
        .then(function() {
            angular.forEach($scope.cases, function($case) {
                getCoordinates($case);
            })
        });

    var createMarker = function($case) {

        var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng($case.lat, $case.lng),
            title: $case.name + ' ' + $case.lastname + ' </br> ' + $case.phone
        });

        /* Add image to the infoview */
        var image = '';
        if (typeof $case.images !== 'undefined') {
            if (typeof $case.images[0] !== 'undefined') {
                var image = '<img class="img-responsive" src="' + $case.images[0] + '">';
            }
        }

        marker.content = '<div class="infoWindowContent">' + $case.description + image + '</div>';

        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent('<div class="infoWindowHolder"><h2>' + marker.title + '</h2>' + '<h3>' + $case.address + '</h3>' + marker.content + '</div>');
            infoWindow.open($scope.map, marker);
        });

        google.maps.event.addListener($scope.map, 'click', function() {
            infoWindow.close();
        });
        $scope.markers.push(marker);

    }

    $scope.openInfoWindow = function(e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

    function getCoordinates($case) {
        console.log('calling coordinates');
        var address = $case.address;
        $http.get('https://maps.google.com/maps/api/geocode/json?address=' + encodeURIComponent(address)).
        then(function(response) {

            if ((typeof response.data.results[0] !== 'undefined') && (typeof response.data.results[0].geometry !== 'undefined')) {
                $case.lat = response.data.results[0].geometry.location.lat;
                $case.lng = response.data.results[0].geometry.location.lng;
                createMarker($case);
            }
        }, function(error) {

        });
    }

});
