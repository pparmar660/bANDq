BandQModule.controller('OffenderListCtrl', function ($scope, advanceFilter, OffenderService, $rootScope, checkInternetConnectionService, imageService, globalService) {
    $scope.Time = 0;
    $rootScope.show = false;
    $scope.canclebtntitle = "Yes";
    $scope.prevShowStatus = null;
    $scope.nextShowStatus = null;
    $scope.nextPageURL = null;
    $scope.infoShow1 = false;
    $scope.page = 1;
    $scope.prevPageURL = null;
    $scope.country = [{id_cnt: 0, name_cnt: "Select Country"}];
    $scope.region = null;
    $scope.zone = null;
    $scope.venue = null;
    $scope.relation = null;
    $scope.advanceFilterResultShow = false;
//    $scope.selectedcountry = null;
//    $scope.selectedregion = null;
//    $scope.selectedzone = null;
//    $scope.responseData = null;
//    $scope.selectedvenue = null;
//    $scope.relation = null;
    $scope.offendersVal = [];
    $scope.allCountryList = [];
    $scope.allRegionList = [];
    $scope.allZoneList = [];
    $scope.allVenueList = [];

    $scope.countrySelect = new Array(0);
    $scope.selectedregion = new Array(0);
    $scope.selectedzone = new Array(0);
    $scope.selectedvanue = new Array(0);
    $scope.searchText = "";
    $scope.selectedOffenders = [];
    $scope.gender = [];
    $scope.ethnicity = [];
    $scope.eyecolour = [];
    $scope.facialhair = [];
    $scope.haircolour = [];
    $scope.severity = [];
    $scope.category = [];
    $scope.build = [];
    $scope.height = [];
    $scope.piercings = [];
    $scope.position = [];
    $scope.Offender_List_Advance_filter = {};
    $scope.filterData = {
        country: [],
        region: [],
        zone: [],
        venue: []
    };

    $scope.advanceFilterData = {};
    $scope.searchParameter = null;
    $scope.isNotePopUp = false;
    $scope.comms = [];
    $scope.ListStaff = [];
    $scope.isNoteDesc = false;
    $scope.isDeadLine = false;
    $scope.isRemind = false;
    $scope.isWith = false;
    $scope.isPhotoLibrary = false;
    $scope.isDuration = false;
    $scope.isMethod = false;
    $scope.isCameraOption = false;
    $scope.notes = {};
    $scope.CommsImages = [];
    var row_id = 0;
    var successMsg = "";
    $scope.isSuccess = false;
    var offenderId = 0;
    var isSelection = false;
    var moduleId = 258;
    $scope.commsNote = [];
    $scope.staffImage = "";
    $scope.isUploadSuccess = false;
    $scope.isCommAllowed = false;

    $scope.noInternetConnectionOnList = false;
    $scope.categoryTitle = {};
    var parent = $("#listOffender_202").parents(".incident_report_wrapper");
    parent.removeClass("incident_report_wrapper");


    var addActiveCalss = function () {

        setTimeout(function () {
            if (!angular.element('#securitySidePanelController').scope()) {
                addActiveCalss();
            } else {
                $scope.$apply(function () {
                    var scopeOfSidePannel = angular.element('#securitySidePanelController').scope();
                    scopeOfSidePannel.offender();
                });
            }


        }
        , 1000);
    }

    $scope.init = function () {
         if (localStorage.getItem("pushItemId")) {
             $rootScope.offenderDetailShowStatus = true;
                $rootScope.offenderListShowStatus = false;
                $rootScope.offenderAddShowStatus = false;
           
        } else {
             $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = true;
                $rootScope.offenderAddShowStatus = false;
        }
    addActiveCalss();

        $rootScope.show = false;
        $scope.Offender_List_Advance_filter.countrySelect = {name_cnt: "Country"};
        $scope.Offender_List_Advance_filter.selectedregion = {id_rgs: 0, name_rgs: "Region"};
        $scope.Offender_List_Advance_filter.selectedzone = {pk_zone: 0, zone_name: "Zone"};
        $scope.Offender_List_Advance_filter.selectedvanue = {id: 0, venue_name: "Venue"};
        $scope.incidentListStaff = globalService.getUserProfileTypeAndId();
        
        if (globalService.getUserProfileTypeAndId().userId) {
            if (globalService.getUserProfileTypeAndId().type == 'staff'){
                $scope.staffParameter = '/' + globalService.getUserProfileTypeAndId().type + '/' + globalService.getUserProfileTypeAndId().userId;
                $scope.url = constanObject.OFFENDERS_LIST_URL + $scope.staffParameter;
            globalService.setUserProfileTypeAndId({'type': '', 'userId': ''});
        }
        else if(globalService.getUserProfileTypeAndId().type == 'venue'){
             $scope.staffParameter  = '/' + globalService.getUserProfileTypeAndId().type + '/' + globalService.getUserProfileTypeAndId().userId;
                $scope.url = constanObject.OFFENDERS_LIST_URL + $scope.staffParameter;
            globalService.setUserProfileTypeAndId({'type': '', 'userId': ''});
        }
        } else {
             $scope.staffParameter ='';
            $scope.url = constanObject.OFFENDERS_LIST_URL;
        }


//             case constanObject.WebRequestType.FilterData:
//                $scope.$apply(function () {
////                    $scope.country = responseData.country;
////                    $scope.region = responseData.regions;
////                    $scope.zone = responseData.zones;
////                    $scope.venue = responseData.venues.data;
////                    $scope.country.unshift({id_cnt: 0, name_cnt: "Country"});
////                    $scope.region.unshift({id_rgs: 0, name_rgs: "Region"});
////                    $scope.zone.unshift({pk_zone: 0, zone_name: "Zone"});
////                    $scope.venue.unshift({id: 0, venue_name: "Venue"});
//
//                    $scope.country = $scope.allCountryList = responseData.country;
//                    $scope.region = $scope.allRegionList = responseData.regions;
//                    $scope.zone = $scope.allZoneList = responseData.zones;
//                    $scope.venue = $scope.allVenueList = responseData.venues.data;
//
//                });
//                break;
        // webRequestObject.postRequest($scope, "GET", constanObject.FILTER_DATA, "", constanObject.WebRequestType.FilterData, true);

        dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_FILTER_PRESELECTION, function (result) {
            var data = result;
            preData = data.location_selection;
            //console.log("PreSelection Data : " + JSON.stringify(preData));
            $scope.$apply(function () {
                $scope.country = $scope.allCountryList = data.country;
                $scope.region = $scope.allRegionList = data.regions;
                $scope.zone = $scope.allZoneList = data.zones;
                $scope.venue = $scope.allVenueList = data.venues.data;

                for (var i = 0; i < $scope.country.length; i++) {
                    var obj = $scope.country[i];
                    // $scope.selectedCountry = new Array(0);
                    for (var j = 0; j < preData.length; j++) {
                        if (obj.id_cnt == preData[j].country_vns) {
                            $scope.countrySelect.push(obj);
                            break;
                        }
                    }

                }

                for (var i = 0; i < $scope.venue.length; i++) {
                    var obj = $scope.venue[i];
                    //$scope.selectedVenue = new Array(0);
                    for (var j = 0; j < preData.length; j++) {
                        if (obj.id == preData[j].id) {
                            $scope.selectedvanue.push(obj);
                            break;
                        }
                    }
                }

                for (var i = 0; i < $scope.zone.length; i++) {
                    var obj = $scope.zone[i];
                    // $scope.selectedZone = new Array(0);
                    for (var j = 0; j < preData.length; j++) {
                        if (obj.pk_zone == preData[j].zone_vns) {
                            $scope.selectedzone.push(obj);
                            break;
                        }
                    }
                }


                for (var i = 0; i < $scope.region.length; i++) {
                    var obj = $scope.region[i];
                    // $scope.selectedRegion = new Array(0);
                    for (var j = 0; j < preData.length; j++) {
                        if (obj.id_rgs == preData[j].region_vns) {
                            $scope.selectedregion.push(obj);
                            break;
                        }
                    }
                }

                for (var i = 0; i < preData.length; i++) {
                    $scope.filterData.country.push(preData[i].country_vns);
                    $scope.filterData.region.push(preData[i].region_vns);
                    $scope.filterData.zone.push(preData[i].zone_vns);
                    $scope.filterData.venue.push(preData[i].id);
                }

                //console.log("PRE SELECTED DATA : " + JSON.stringify($scope.search));
                //var searchData = {search: $scope.filterData};

                window.plugins.spinnerDialog.hide();
            });


        }, true);

        webRequestObject.postRequest($scope, "GET", constanObject.ListOffenderCategories, "", constanObject.WebRequestType.ListOffenderCategory, true);

        $scope.searchParameter = {search: {lat: localStorage.getItem("lat"), lng: localStorage.getItem("lng")}};
        var searchData = {search: {lat: localStorage.getItem("lat"), lng: localStorage.getItem("lng")}};
        OffenderService.getOffenderList($scope.page, $scope.url, searchData, function (status, responseData, data) {

            $scope.$apply(function () {
                if (responseData == "Offenders Not Found") {
                    $scope.infoShow1 = true;
                    $scope.offendersVal = [];
                    $scope.offenderCount = {total: 0, known_count: 0, unknown_count: 0};
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                } else {
                    $scope.allOfenderCount = responseData.total;
                    $scope.offenderCount = responseData;
                    $scope.infoShow1 = false;
                    $scope.offendersVal = data;
                    setVehicleCommsStatus($scope.offendersVal);
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    $scope.prevShowStatus = false;
                }
            });
        });

        //getFilterData();
        advanceFilter.getAdvanceSearchConfig(function (status, data) {
            $scope.$apply(function () {
                $scope.gender = data.gender;
                $scope.ethnicity = data.ethnicity;
                $scope.eyecolour = data.eyecolour;
                $scope.facialhair = data.facialhair;
                $scope.haircolour = data.haircolour;
                $scope.build = data.build;
                $scope.height = data.height;
                $scope.piercings = data.piercings;
                $scope.position = data.position;
                $scope.category = data.category;
                $scope.severity = data.severity;
                $scope.severitycount = $scope.severity.length;
            });

        });
    }


    $scope.init();

    $scope.addNewOffenders = function ($event, type) {
        var scope = angular.element('#addOffender_204').scope();
        scope.isEditOffender = false;
        $rootScope.moveToSecurityDashboard = false;
        $rootScope.show = false;
        $rootScope.offenderDetailShowStatus = false;
        $rootScope.offenderListShowStatus = false;
        $rootScope.offenderAddShowStatus = true;
        $rootScope.title = "Add New Offender";
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = 'Offenders & OCGs';
        $rootScope.subMenuTitle1 = 'Add New';
        $rootScope.dashboardLink = '#/dashboard';
        scope.init();
    };
    $scope.allOffender = function (category,index) {
        if (index == 0) {
            $("div ul.offenderTab li:first-child a").addClass("active");
            $("div ul.offenderTab li:nth-child(2) a").removeClass("active");
            $("div ul.offenderTab li:nth-child(3) a").removeClass("active");
            $("div ul.offenderTab li:last-child a").removeClass("active");
        }
        else if (index == 1) {
            $("div ul.offenderTab li:first-child a").removeClass("active");
            $("div ul.offenderTab li:nth-child(2) a").addClass("active");
            $("div ul.offenderTab li:nth-child(3) a").removeClass("active");
            $("div ul.offenderTab li:last-child a").removeClass("active");
        }
        else if (index == 2) {
            $("div ul.offenderTab li:first-child a").removeClass("active");
            $("div ul.offenderTab li:nth-child(2) a").removeClass("active");
            $("div ul.offenderTab li:nth-child(3) a").addClass("active");
            $("div ul.offenderTab li:last-child a").removeClass("active");
        }
        else {
            $("div ul.offenderTab li:first-child a").removeClass("active");
            $("div ul.offenderTab li:nth-child(2) a").removeClass("active");
            $("div ul.offenderTab li:nth-child(3) a").removeClass("active");
            $("div ul.offenderTab li:last-child a").addClass("active");
        }

        $scope.url = constanObject.OFFENDER + category.id_uct;
        var searchData = {search: $scope.filterData};
        OffenderService.getOffenderList($scope.page, $scope.url, searchData, function (status, responseData, data) {
            $scope.$apply(function () {
                if (status) {
                    $scope.allOfenderCount = responseData.total;
                    $scope.offenderCount = responseData;
                    $scope.infoShow1 = false;
                    $rootScope.show = false;
                    $scope.offendersVal = data;
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    $scope.prevShowStatus = false;

                } else {
                    $scope.infoShow1 = true;
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                    $scope.offendersVal = [];
                    $scope.offenderCount = {total: 0, known_count: 0, unknown_count: 0};
                }
            });
        });
    };

    $scope.knownOffender = function () {
        $("div ul.offenderTab li:first-child a").removeClass("active");
        $("div ul.offenderTab li:nth-child(2) a").addClass("active");
        $("div ul.offenderTab li:last-child a").removeClass("active");
        //$scope.url = constanObject.KNOWN_OFFENDER;
        $scope.url = constanObject.OFFENDERS_LIST_URL + $scope.staffParameter + constanObject.KNOWN_OFFENDER_PARAMETERS;
        $scope.page = 1;
        $scope.searchParameter = {search: {lat: localStorage.getItem("lat"), lng: localStorage.getItem("lng")}};
        //   var searchData = {search: {lat: localStorage.getItem("lat"), lng: localStorage.getItem("lng")}};
        var searchData = {search: $scope.filterData};

        OffenderService.getOffenderTypeList($scope.page, $scope.url, searchData, function (status, responseData, data) {
            $scope.$apply(function () {
                if (status) {
                    $scope.infoShow1 = false;
                    $rootScope.show = false;
                    $scope.offendersVal = data;
                    $scope.offenderCount = responseData;
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    $scope.prevShowStatus = false;

                } else {
                    $scope.infoShow1 = true;
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                    $scope.offendersVal = [];
                    $scope.offenderCount = {total: 0, known_count: 0, unknown_count: 0};
                }
            });
            //   hilightoffender();
        });
    };
    $scope.unknownOffender = function () {
        $("div ul.offenderTab li:first-child a").removeClass("active");
        $("div ul.offenderTab li:nth-child(2) a").removeClass("active");
        $("div ul.offenderTab li:last-child a").addClass("active");
      //  $scope.url = constanObject.UNKNOWN_OFFENDER;
         $scope.url = constanObject.OFFENDERS_LIST_URL + $scope.staffParameter + constanObject.UNKNOWN_OFFENDER_PARAMETERS;
        $scope.page = 1;
        $scope.searchParameter = {search: {lat: localStorage.getItem("lat"), lng: localStorage.getItem("lng")}};
        //  var searchData = {search: {lat: localStorage.getItem("lat"), lng: localStorage.getItem("lng")}};
        var searchData = {search: $scope.filterData};

        OffenderService.getOffenderTypeList($scope.page, $scope.url, searchData, function (status, responseData, data) {
            $scope.$apply(function () {
                if (status) {
                    $scope.infoShow1 = false;
                    $scope.offendersVal = data;
                    $scope.offenderCount = responseData;
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    $scope.prevShowStatus = false;

                } else {
                    $scope.infoShow1 = true;
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                    $scope.offendersVal = [];
                    $scope.offenderCount = {total: 0, known_count: 0, unknown_count: 0};
                }
            });
            //     hilightoffender();
        });
    };

    $scope.searchBtnAction = function (searchName) {
//        $scope.filterData = {}
        $scope.page = 1;
        $scope.filterData.name = searchName;

        $scope.filteroffender();
    };
    $scope.clickOffender = function (obj) {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.offenderListShowStatus = true;
            $rootScope.offenderDetailShowStatus = false;
            $rootScope.offenderAddShowStatus = false;


        } else {
            $rootScope.offenderListShowStatus = false;
            $rootScope.offenderDetailShowStatus = true;
            $rootScope.offenderAddShowStatus = false;

            var scope = angular.element('#offenderDetail_203').scope();
            scope.last_updated = obj.last_updated;
            scope.offender = obj;
            $rootScope.show = false;
            scope.edit = null;
            scope.getOffenderDetail(obj.id_usr);

        }
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = 'Offenders & OCGs';
        $rootScope.subMenuTitle1 = 'Offender Details';
        $rootScope.dashboardLink = '#/dashboard';

    };

    $scope.$on('checkInternetConnection', function (event, arg) {
        $scope.$apply(function () {
            if (!arg.network)
                $scope.noInternetConnectionOnList = true;
            else {
                $scope.noInternetConnectionOnList = false;

            }
        });
    });

    $scope.editOffender = function (obj, type) {
        var scope = angular.element('#addOffender_204').scope();
        scope.isEditOffender = true;
        $rootScope.moveToSecurityDashboard = false;
        $rootScope.offenderListShowStatus = false;
        $rootScope.offenderDetailShowStatus = false;
        $rootScope.offenderAddShowStatus = true;
        scope.init();
        scope.updateOffender = obj;
        scope.getOffenderData(obj.id_usr);

    };


    $scope.nextPageRequest = function () {
        $scope.page++;
        OffenderService.getOffenderList($scope.page, $scope.url, $scope.searchParameter, function (status, responseData, data) {
            $scope.$apply(function () {
                if (status) {
                    $rootScope.show = false;
                    $scope.infoShow1 = false;
                    $scope.prevShowStatus = true;
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    $scope.offendersVal = data;
                    $scope.offenderCount = responseData;
                } else {
                    $scope.prevShowStatus = true;
                    $scope.nextShowStatus = false;
                    $scope.page--;
                }
            });
        });

    }

    $scope.previousPageRequest = function () {
        if ($scope.page > 1) {
            $scope.prevShowStatus = true;
            $scope.nextShowStatus = true;
            var page = ($scope.page > 1 ? (--$scope.page) : 1);

            OffenderService.getOffenderList(page, $scope.url, $scope.searchParameter, function (status, responseData, data) {
                $scope.$apply(function () {
                    $scope.offendersVal = data;
                    $scope.offenderCount = responseData;
                });
                $rootScope.show = false;
                //    hilightoffender();
                $scope.infoShow1 = false;
            });
        } else {
            $scope.prevShowStatus = false;
            $scope.nextShowStatus = true;
        }
    };


    $scope.filteroffender = function () {

        var searchData = {search: $scope.filterData};

        OffenderService.getOffenderList($scope.page, $scope.url, searchData, function (status, responseData, data) {
            if (status) {
                $scope.$apply(function () {
                    $scope.allOfenderCount = responseData.total;
                    $scope.infoShow1 = false;
                    $rootScope.show = false;

                    if (responseData.prev_page_url != null) {
                        $scope.prevShowStatus = true;
                    } else {
                        $scope.prevShowStatus = false;
                    }
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    $scope.offendersVal = data;
                    $scope.offenderCount = responseData;
                });

            } else {
                $scope.$apply(function () {
                    $scope.infoShow1 = true;
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                    $scope.offendersVal = [];
                    $scope.offenderCount = {total: 0, known_count: 0, unknown_count: 0};
                });

            }
        });
    };

    $scope.adavanceFilterOffender = function () {
        $scope.searchParameter = {adavancesearch: $scope.advanceFilterData};
        var searchData = {adavancesearch: $scope.advanceFilterData};
        OffenderService.getOffenderList($scope.page, $scope.url, searchData, function (status, responseData) {
            if (status) {
                $scope.advanceFilterResultShow = true;
                $scope.responseData = responseData;
                $scope.$apply(function () {
                    $scope.infoShow1 = false;
                    $rootScope.show = false;
                    $scope.offendersVal = responseData.data;
                    $scope.offenderCount = responseData;
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    $scope.prevShowStatus = false;


                });

                //      hilightoffender();
            } else {
                $scope.advanceFilterResultShow = false;
                $rootScope.infoShow1 = true;
                $scope.$apply(function () {
                    $scope.infoShow1 = true;
                    $scope.offendersVal = [];
                    $scope.offenderCount = {total: 0, known_count: 0, unknown_count: 0};
                });
            }
        });
    };
    $scope.closeInfo = function () {
        $scope.advanceFilterResultShow = false;
    }
    $scope.severityChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.severity = arr;
        }
    };

    $scope.categoryChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.category = arr;
        }
    };
    $scope.ethnicityChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.ethnicity = arr;
        }
    };
    $scope.genderChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.gender = arr;
        }
    };
    $scope.heightChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.height = arr;
        }
    };
    $scope.buildChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.build = arr;
        }
    };
    $scope.haircolorChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.hair_color = arr;
        }
    };
    $scope.tatoosChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.tatoos = arr;
        }
    };
    $scope.facialhairChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.facial_hair = arr;

        }
    };
    $scope.piercingChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.piercings = arr;
        }
    };
    $scope.scarificationChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.scarification = arr;
        }
    };



    $scope.infoClose = function () {
        $scope.infoShow1 = false;
    }

    $scope.getCountry = function (selectedCountry) {


        // set region, zone and venue
        $scope.Regions = new Array(0);
        $scope.Zones = new Array(0);
        $scope.Venues = new Array(0);

        if (!$scope.filterData)
            $scope.filterData = {};
        $scope.filterData.country = [];
        if (selectedCountry.length == 0) {
            $scope.filterData.country = 0;
            $scope.filterData.region = 0;
            $scope.filterData.zone = 0;
            $scope.filterData.venue = 0;

            $scope.selectedCountry = new Array(0);
            $scope.selectedRegion = new Array(0);
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);


        } else {
            for (i = 0; i < selectedCountry.length; i++) {
                $scope.filterData.country.push(selectedCountry[i].id_cnt);
            }

        }


        for (var i = 0; i < $scope.allRegionList.length; i++) {

            for (var j = 0; j < selectedCountry.length; j++) {

                for (var k = 0; k < $scope.allRegionList[i].country.length; k++) {

                    if ($scope.allRegionList[i].country[k].id_cnt == selectedCountry[j].id_cnt)
                        if ($.inArray($scope.allRegionList[i], $scope.Regions) < 0)
                            $scope.Regions.push($scope.allRegionList[i]);
                }
            }
        }
        $scope.filteroffender($scope.filterData);

    };

    $scope.regionChange = function (selectedRegion) {

        // set  zone and venue
        $scope.Zones = new Array(0);
        $scope.Venues = new Array(0);

        if (!$scope.filterData)
            $scope.filterData = {};
        $scope.filterData.region = [];
        if (selectedRegion.length == 0) {
            $scope.filterData.region = 0;
            $scope.filterData.zone = 0;
            $scope.filterData.venue = 0;
            $scope.selectedRegion = new Array(0);
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);
        } else {
            for (i = 0; i < selectedRegion.length; i++) {
                $scope.filterData.region.push(selectedRegion[i].id_rgs);
            }

        }


        for (var i = 0; i < $scope.allZoneList.length; i++) {

            for (var j = 0; j < selectedRegion.length; j++) {

                for (var k = 0; k < $scope.allZoneList[i].region.length; k++) {

                    if ($scope.allZoneList[i].region[k].fk_region == selectedRegion[j].id_rgs)
                        if ($.inArray($scope.allZoneList[i], $scope.Zones) < 0)
                            $scope.Zones.push($scope.allZoneList[i]);

                }
            }
        }
        $scope.filteroffender($scope.filterData);

    };

    $scope.zoneChange = function (selectedZone) {
        $scope.Venues = new Array(0);

        if (!$scope.filterData)
            $scope.filterData = {};
        $scope.filterData.zone = [];
        if (selectedZone.length == 0) {
            $scope.filterData.zone = 0;
            $scope.filterData.venue = 0;
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);
        } else {
            for (i = 0; i < selectedZone.length; i++) {

                $scope.filterData.zone.push(selectedZone[i].pk_zone);
            }

        }

        for (var i = 0; i < $scope.allVenueList.length; i++) {
            for (var j = 0; j < selectedZone.length; j++) {
                if ($scope.allVenueList[i].zone_vns == selectedZone[j].pk_zone)
                    if ($.inArray($scope.allVenueList[i], $scope.Venues) < 0)
                        $scope.Venues.push($scope.allVenueList[i]);

            }
        }
        $scope.filteroffender($scope.filterData);
    };

    $scope.vanueChange = function (selectedVenue) {
        if (!$scope.filterData)
            $scope.filterData = {};
        $scope.filterData.venue = [];

        if (selectedVenue.length == 0) {
            $scope.filterData.venue = 0;
        } else {
            for (i = 0; i < selectedVenue.length; i++) {
                $scope.filterData.venue.push(selectedVenue[i].id);
            }


        }
        $scope.filteroffender($scope.filterData);

    };

    $scope.showAdvanceFilter = false;
    $scope.myFunc = function () {
        $scope.showAdvanceFilter = !$scope.showAdvanceFilter;
    };

    var getCommsDetails = function (vechileId) {
        webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + vechileId,
                null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
    };
    $scope.addnote = {};
    $scope.showAddNotePopup = function (offenderID) {
        offenderId = offenderID;
        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.notes.note_type_jnt = 0;
        var url = constanObject.CommsConfig + moduleId + "/" + vehicle_id;
        //function(classObject,type,webUrl,parameters,requestType,showProgress)
        webRequestObject.postRequest($scope, "GET", constanObject.ListStaff, null, constanObject.CommsAndTaskWebRequestType.ListStaff, true);
        webRequestObject.postRequest($scope, "GET", url, null, constanObject.CommsAndTaskWebRequestType.CommsConfigType, true);

        //$scope.isNotePopUp = true;
    };

    $scope.hideAddNotePopup = function () {
        $scope.isNotePopUp = false;
    };



    $scope.methodChange = function (method) {
        //console.log("Method : " + JSON.stringify(method));
        $scope.$apply(function () {
            $scope.notes = {};
            $scope.isNoteDesc = method.detail == 1 ? true : false;
            $scope.isDeadLine = method.deadline == 1 ? true : false;
            $scope.isRemind = method.remind_me == 1 ? true : false;
            $scope.isWith = method.opt_with == 1 ? true : false;
            $scope.isPhotoLibrary = method.attachments == 1 ? true : false;
            $scope.isDuration = method.duration == 1 ? true : false;
            $scope.notes.note_type_jnt = method.id_comms;
        });



    };

    $scope.staffChange = function (staff) {

        $scope.notes.tagged_user = [];
        $scope.$apply(function () {
            if (staff.length > 1) {
                for (var i = 0; i < staff.length; i++) {

                    $scope.notes.tagged_user.push(staff[i].id_usr);

                }

            }
            else {
                $scope.notes.tagged_user.push(staff[0].id_usr);
            }
        });

        //console.log("Selected Staff : " + JSON.stringify(staff));


    };

    $scope.uploadImage = function () {
        $scope.CommsImages = [];
        $scope.isCameraOption = true;
    };


    $scope.openCamera = function () {

        imageService.getCameraImage(function (item) {
            uploadPhoto(item);
        });
        $scope.isCameraOption = false;
    };

    $scope.openGallery = function () {

        imageService.getMediaImage(function (item) {
            uploadPhoto(item);
        });
        $scope.isCameraOption = false;
    };
    $scope.closeCameraOption = function () {
        $scope.isCameraOption = false;
    };
    function uploadPhoto(imageURI) {
        //console.log("imageURI : " + imageURI);
        $scope.isUploadSuccess = true;
        var arr = imageURI.src.split("/");
        var name = arr[arr.length - 1];
        $scope.$apply(function () {
            $scope.CommsImages.push({name: name, url: imageURI.src});
        });
        hideUploadSuccessMsg();
    }
    function hideUploadSuccessMsg() {
        $timeout(function () {
            $scope.isUploadSuccess = false;
        }, 5000);
    }

    $scope.AddNote = function () {
        $scope.notes.module_id = moduleId;
        $scope.notes.id_jno_jnt = vehicle_id;
        $scope.notes.id_usr_jnt = localStorage.getItem("userId");
        $scope.notes.note_by = localStorage.getItem("userId");
        $scope.notes.latitude = CURRENT_LATITUDE;
        $scope.notes.longitude = CURRENT_LONGITUDE;
        //console.log("Add Note Data : " + JSON.stringify($scope.notes));
        webRequestObject.postRequestJSON($scope, "POST", constanObject.InsertComms, JSON.stringify($scope.notes), constanObject.CommsAndTaskWebRequestType.AddComms, true);
    };

    $scope.closeSuccess = function () {
        $scope.isSuccess = false;
    };

    function setVehicleCommsStatus(data) {

        for (var i = 0; i < data.length; i++) {
            if (data[i].add_comm == 1) {
                $scope.offendersVal[i].isAddComm = true;
            }
            else {
                $scope.offendersVal[i].isAddComm = false;
            }
        }

        //console.log("$scope.offendersVal : " + JSON.stringify($scope.offendersVal));
    }
//    
    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {


            return;
        }
        switch (requestType) {
            case constanObject.WebRequestType.ListOffenderCategory:
                $scope.$apply(function () {
                    $scope.categoryTitle = responseData.data;
//                    $scope.knownOffenderCount = responseData.data[1].count;
//
//                    $scope.unknownOffenderCount = responseData.data[0].count;


                });
                break;
            case constanObject.CommsAndTaskWebRequestType.CommsConfigType:
                //console.log("responseData : " + JSON.stringify(responseData));
                //console.log("responseData.data.comms.comm_row_title : " + responseData.data.comm_row_title);
                $scope.$apply(function () {
                    $scope.commsTitle = responseData.data.comm_row_title;
                    $scope.comms = responseData.data.comms;
                    if ($scope.comms.length < 2)
                        $scope.isMethod = false;
                    else
                        $scope.isMethod = true;

                    //console.log(" $scope.isMethod : " + $scope.isMethod);
                    $scope.isNotePopUp = true;
                });
                $scope.selectedMethod = responseData.data.comms[0];
                $scope.methodChange($scope.selectedMethod);
                break;
            case constanObject.CommsAndTaskWebRequestType.ListStaff:

                $scope.$apply(function () {
                    $scope.ListStaff = responseData.data;
                });
                //console.log("$scope.ListStaff : " + JSON.stringify($scope.ListStaff));

                break;
            case constanObject.CommsAndTaskWebRequestType.AddComms:

                //console.log("AddComms : " + JSON.stringify(responseData));
                //{"data":{"note_id":400,"message":" Comms Inserted Successfully"}}
                var note_id = responseData.data.note_id;
                successMsg = responseData.data.message;
                if ($scope.CommsImages.length > 0) {
                    for (var i = 0; i < $scope.CommsImages.length; i++) {

                        webRequestObject.fileUpload($scope, $scope.CommsImages[i].url, constanObject.UploadCommsFile + note_id, constanObject.COMMS_IMAGE_KEY, constanObject.CommsAndTaskWebRequestType.UploadCommsFile, true);
                    }
                } else {
                    $scope.$apply(function () {
                        $scope.isSuccess = true;
                        $scope.successMsg = successMsg;
                        $scope.isNotePopUp = false;
                        getCommsDetails(offenderId);
                    });

                }
                break;
            case constanObject.CommsAndTaskWebRequestType.UploadCommsFile:
                //console.log(JSON.stringify(responseData));
                $scope.$apply(function () {
                    $scope.CommsImages = [];
                    $scope.isSuccess = true;
                    $scope.successMsg = successMsg;
                    $scope.isNotePopUp = false;
                    getCommsDetails(offenderId);
                });

                break;
            case constanObject.CommsAndTaskWebRequestType.CommsDetails:
                //console.log("Comms Details : " + JSON.stringify(responseData));
                $scope.$apply(function () {

                    $scope.commsNote = responseData.data.list_data;

//                    for(var i=0;i<$scope.commsNote.length;i++){
//                        $scope.staffImage.push({src:constanObject.GetStaffImage+$scope.commsNote[i].id_usr+"/1"})
//                    }
                });
                //console.log("$scope.commsNote : " + JSON.stringify($scope.commsNote));
                break;
        }
    };



});


BandQModule.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

