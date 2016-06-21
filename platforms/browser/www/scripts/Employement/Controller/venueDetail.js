
BandQModule.controller('venueDeatil', ['$scope', '$rootScope', 'checkInternetConnectionService', 'globalService', function ($scope, $rootScope, checkInternetConnectionService, globalService) {
        var gLat = 0;
        var gLng = 0;
        $scope.venueId;
        // map_venue(gLat,gLng);
        $scope.init = function (glatP, glangP) {
            gLat = glatP;
            gLng = glangP;

            map_venue(gLat, gLng);
        };

        function map_venue(gLat, gLng) {
            var mapDiv = document.getElementById("venueDetailMap");
            // Creating a latLng for the center of the map
            var latlng = new google.maps.LatLng(gLat, gLng);
            // Creating an object literal containing the properties 
            // we want to pass to the map  
            var options = {
                center: latlng,
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            // Creating the map
            var map = new google.maps.Map(mapDiv, options);
            var marker = new google.maps.Marker({
                position: latlng,
                map: map

            });



            google.maps.event.addListenerOnce(map, 'idle', function () {
                google.maps.event.trigger(map, 'resize');
                marker.setPosition(new google.maps.LatLng(gLat, gLng));
                map.panTo(new google.maps.LatLng(gLat, gLng));
            });
        }

        $scope.gotoVenue = function () {
            //highlight aidepanel
            $rootScope.hometemplate = false;
            $rootScope.staffDetailtemplate = false;
            $rootScope.staffDirectorytemplate = false;
            $rootScope.venueDetailtemplate = false;
            $rootScope.menuTitle = 'Employment';
            $rootScope.subMenuTitle = 'Venue Directory';
            $rootScope.subMenuTitle1 = '';
            $rootScope.venueDirectorytemplate = true;
            $("#venueDetailId").addClass('resp-tab-active');
            $("#imageMediaVenueId").removeClass("resp-tab-active");
            $scope.venueDetailTab = true;

        }


        function mapLoaded(marker, map) {
            marker.setPosition(new google.maps.LatLng(0, 0));
            map.panTo(new google.maps.LatLng(0, 0));

        }
        ;

        /**-------------------------------------------------------------------**/
        $scope.incidentViewInVenue = function (type, id) {
            window.location.href = "dashboard.html#/incidentView";
            localStorage.setItem("incidentListType", type);
            localStorage.setItem("incidentListId", id);

        };
        $scope.incidentAddInVenue = function () {
            window.location.href = "dashboard.html#/createIncident";

        };
        $scope.showOffenderInVenue = function (val, type, id) {
            if (val == 'list') {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.offenderListShowStatus = false;
                    $rootScope.internetConnection = true;
                } else {
                    $rootScope.offenderListShowStatus = true;
                    $rootScope.internetConnection = false;
                }
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderAddShowStatus = false;
                $rootScope.subMenuTitle1 = '';
                globalService.setUserProfileTypeAndId({'type': type, 'userId': id});
            } else if (val == 'add') {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.offenderAddShowStatus = false;
                    $rootScope.internetConnection = true;
                } else {
                    $rootScope.offenderAddShowStatus = true;
                    $rootScope.internetConnection = false;
                }
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = false;
                $rootScope.subMenuTitle1 = 'Add New';

            }
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").addClass("active");
            $("#ftComms").removeClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Offenders & OCGs';
            $rootScope.dashboardLink = '#/dashboard';
            window.location.href = "dashboard.html#/offenderView";
        };

        $scope.showVehicleInVenue = function (val, type, id) {
            if (val == 'list') {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.isVehicleList = false;
                    $rootScope.internetConnection = true;
                } else {
                    $rootScope.isVehicleList = true;
                    $rootScope.internetConnection = false;
                    $rootScope.backStatus = "main";
                }
                $rootScope.isNewVehicle = false;
                $rootScope.isVehicleDetails = false;
                globalService.setUserProfileTypeAndId({'type': type, 'userId': id});
            } else if (val == 'add') {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.isNewVehicle = false;
                    $rootScope.internetConnection = true;
                } else {
                    $rootScope.isNewVehicle = true;
                    $rootScope.internetConnection = false;
                    $rootScope.backStatus = "main";
                }
                $rootScope.isVehicleList = false;
                $rootScope.isVehicleDetails = false;
            }
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").addClass("active");
            $("#ftComms").removeClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Vehicles";
            $rootScope.subMenuTitle1 = "Add New";
            window.location.href = "dashboard.html#/vehicle";
        };


        $scope.showVictimWitnessInVenue = function (val, type, id) {
            if (val == 'list') {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.isVictimWitnessList = false;
                    $rootScope.internetConnection = true;
                } else {
                    $rootScope.isVictimWitnessList = true;
                    $rootScope.internetConnection = false;
                    $rootScope.backStatus = "main";
                }
                $rootScope.subMenuTitle1 = "";
                $rootScope.isVictimWitnessDetail = false;
                $rootScope.isVictimWitnessAdd = false;
                globalService.setUserProfileTypeAndId({'type': type, 'userId': id});
            } else if (val == 'add') {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.isVictimWitnessAdd = false;
                    $rootScope.internetConnection = true;
                } else {
                    $rootScope.title = "Add New Victims & Witnesses";
                    $rootScope.isVictimWitnessAdd = true;
                    $rootScope.internetConnection = false;
                    $rootScope.backStatus = "main";
                }
                $rootScope.subMenuTitle1 = "Add New";
                $rootScope.isVictimWitnessList = false;
                $rootScope.isVictimWitnessDetail = false;


            }
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").addClass("active");
            $("#ftComms").removeClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Victims & Witnesses";
            window.location.href = "dashboard.html#/securityVictimwitness";
        };

        $scope.displayInboxList = function () {
            $rootScope.viewCommsAndTask = 'inbox';
            window.location.href = "dashboard.html#/inboxView";
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").removeClass("active");
            $("#ftComms").addClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
        };
        $scope.displayAlertList = function () {
            $rootScope.viewCommsAndTask = 'alert';
            window.location.href = "dashboard.html#/inboxView";
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").removeClass("active");
            $("#ftComms").addClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
        };
        $scope.displayTaskList = function () {
            window.location.href = "dashboard.html#/taskAndCheckList";
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").removeClass("active");
            $("#ftComms").addClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
        };






        $scope.imageMedia = function () {
            $("#venueDetailId").removeClass('resp-tab-active');
            $("#imageMediaVenueId").addClass("resp-tab-active");
            $scope.venueDetailTab = false;
            $scope.Venueimagemedias = true;
        }
        $scope.venueDetails = function () {
            $("#venueDetailId").addClass('resp-tab-active');
            $("#imageMediaVenueId").removeClass('resp-tab-active');
            $scope.venueDetailTab = true;
            $scope.Venueimagemedias = false;
        }

    }
]);
