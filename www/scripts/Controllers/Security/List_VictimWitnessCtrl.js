BandQModule.controller("List_VictimWitnessCtrl", function ($scope, VictimWitness, WitnessService, $rootScope, globalService, checkInternetConnectionService, imageService) {

    $scope.categoryList = null;
    $scope.prevShowStatus = null;
    $scope.nextShowStatus = null;
    $scope.searchText = "";
    $scope.nextURL = "";
    $scope.preURL = "";
    $scope.searchText = "";
    $scope.isWitness = true;
    $scope.country = null;
    $scope.region = null;
    $scope.zone = null;
    $scope.canclebtntitle = "Yes";
    $scope.alertMessage = "";
    $scope.alertshowstatus = false;
    $scope.venue = null;
    $scope.model = {};
    $scope.filterParam = {
        country: [],
        region: [],
        zone: [],
        venue: []
    };
    $scope.victimWitnessData = [];
    $scope.selectedWitness = [];
    $scope.ListWitnessCatagory = [];
    $scope.page = null;
    $scope.url_witnessList = constanObject.WITNESS_LIST;
    $scope.VictimData = [];
    $scope.WitnessData = [];
    $scope.selectedVictims = [];
    $scope.url_victimList = constanObject.VICTIME_LIST;
//    $scope.url_categoryData = constanObject.ListVictimsCategories;
    $scope.selectedCategory = [];
    $scope.allCountryList = [];
    $scope.allRegionList = [];
    $scope.allZoneList = [];
    $scope.allVenueList = [];
    $scope.selectedVictims = [];
    $scope.selectedCountry = [];
    $scope.selectedVenue = [];
    $scope.selectedZone = [];
    $scope.selectedRegion = [];
    $scope.page = null;

    $scope.victimCount = 0;
    $scope.witnessCount = 0;

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

    var successMsg = "";
    $scope.isSuccess = false;
    var victimWitness_id = 0;
    var isSelection = false;
    var moduleId = 257;
    $scope.commsNote = [];
    $scope.staffImage = "";
    $scope.isUploadSuccess = false;
    $scope.isCommAllowed = false;

    $scope.isNoInterStrip = true;

    $scope.isVictim = false;
    $scope.isWitness = false;
    
    
    
    $scope.closeNoInternetStrip = function () {
        $scope.isNoInterStrip = false;
    };
    $rootScope.filterViewVW = "Victim";
    $rootScope.onlyVictims = function (filterParam) {
        $scope.isVictim = true;
        $scope.isWitness = false;
        $('#onlyVictims').addClass("active");
        $('#onlyWitness').removeClass("active");
        initVictimCategory();
        $rootScope.filterViewVW = "Victim";

        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }

        var filterData = {search: filterParam};
        $scope.page = 1;
         if (globalService.getUserProfileTypeAndId().userId) {
            if (globalService.getUserProfileTypeAndId().type == 'staff'){
                $scope.url = $scope.url_victimList + '/' + globalService.getUserProfileTypeAndId().type + '/' + globalService.getUserProfileTypeAndId().userId;
            globalService.setUserProfileTypeAndId({'type': '', 'userId': ''});
        } 
        else if (globalService.getUserProfileTypeAndId().type == 'venue'){
                $scope.url = $scope.url_victimList + '/' + globalService.getUserProfileTypeAndId().type + '/' + globalService.getUserProfileTypeAndId().userId;
            globalService.setUserProfileTypeAndId({'type': '', 'userId': ''});
        }
        } else {
            $scope.url = $scope.url_victimList;
        }
        VictimWitness.getVictimeData($scope.page, $scope.url, filterData, function (status, data, next_page_url, prev_page_url) {
            //console.log("VictimWitnessList : " + JSON.stringify(data));
            if (status) {
                $scope.$apply(function () {
                    if (next_page_url != null)
                        $scope.page = next_page_url.split("=")[1];
                    $scope.infoShow1 = false;
                    //console.log("Victim Data" + JSON.stringify(data));
                    $scope.VictimWitnessData = data;
                    //console.log("Victim Data" + JSON.stringify($scope.VictimWitnessData));
                    if (next_page_url != null && prev_page_url != null) {
                        $scope.nextShowStatus = true;
                        $scope.prevShowStatus = true;
                        return;
                    }
                    if (next_page_url != null) {
                        $scope.nextShowStatus = true;
                        $scope.prevShowStatus = false;
                        return;
                    }
                    if (prev_page_url != null) {
                        $scope.nextShowStatus = false;
                        $scope.prevShowStatus = true;
                        return;
                    } else {
                        $scope.nextShowStatus = false;
                        $scope.prevShowStatus = false;
                    }
                });
            } else {
                $scope.$apply(function () {
                    $scope.VictimWitnessData = [];
                    $scope.infoShow1 = true;
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                });
            }
        });
    };

    $rootScope.onlyWitness = function () {
        $scope.isVictim = false;
        $scope.isWitness = true;
        $('#onlyWitness').addClass("active");
        $('#onlyVictims').removeClass("active");
        $rootScope.filterViewVW = "Witness";
        initWitnessCategory();
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        var filterData = {search: $scope.filterParam};
        $scope.page = 1;
        if ($rootScope.filterViewVW == "Witness") {
              if (globalService.getUserProfileTypeAndId().userId) {
            if (globalService.getUserProfileTypeAndId().type == 'staff'){
                $scope.url = $scope.url_witnessList + '/' + globalService.getUserProfileTypeAndId().type + '/' + globalService.getUserProfileTypeAndId().userId;
            globalService.setUserProfileTypeAndId({'type': '', 'userId': ''});
        }
        else if (globalService.getUserProfileTypeAndId().type == 'venue'){
                $scope.url = $scope.url_witnessList + '/' + globalService.getUserProfileTypeAndId().type + '/' + globalService.getUserProfileTypeAndId().userId;
            globalService.setUserProfileTypeAndId({'type': '', 'userId': ''});
        }
        } else {
            $scope.url = $scope.url_witnessList;
        }
            WitnessService.getWitnessData($scope.page, $scope.url, filterData, function (status, data, next_page_url, prev_page_url) {
                $scope.$apply(function () {
                    if (next_page_url != null)
                        $scope.page = next_page_url.split("=")[1];
                    $scope.infoShow1 = false;
                    //console.log("VictimWitnessData" + JSON.stringify(data));
                    if (data == "Witnesses Not Found") {
                        $scope.infoShow1 = true;
                        $scope.VictimWitnessData = null;
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = false;
                        return;
                    }
                    $scope.VictimWitnessData = data;
                    //console.log("witness Data" + JSON.stringify($scope.VictimWitnessData));

                    if (next_page_url == null) {
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = false;
                    } else {
                        if (prev_page_url != null) {
                            $scope.prevShowStatus = true;
                            $scope.nextShowStatus = true;
                        } else {
                            $scope.prevShowStatus = false;
                            $scope.nextShowStatus = true;
                        }
                    }
                });
            });
        }
    }
    $scope.init = function () {
        $("#link_1").removeClass("activate");
            $("#link_2").removeClass("activate");
            $("#link_3").removeClass("activate");
            $("#link_4").removeClass("activate");
            $("#link_5").addClass("activate");
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        $rootScope.show = false;
        $scope.infoShow1 = false;
        $scope.searchText = "";
        //console.log(JSON.stringify($scope.ListCatagory));
        getCatagory();
        if ($rootScope.isVictimWitnessList) {

            $scope.page = 1;
            $scope.prevShowStatus = false;
            $scope.nextShowStatus = true;
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.isVictimWitnessAdd = true;
                $rootScope.isVictimWitnessList = false;
                $rootScope.isVictimWitnessDetail = false;
            } else {
                dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_FILTER_PRESELECTION, function (result) {
                    if (result.length > 0) {
                        var data = JSON.parse(result[0].json_data);
                        ////console.log("Data" + JSON.stringify(data));

                        $scope.$apply(function () {
                            $scope.Countries = $scope.allCountryList = data.country;
                            $scope.Regions = $scope.allRegionList = data.regions;
                            $scope.Zones = $scope.allZoneList = data.zones;
                            $scope.Venues = $scope.allVenueList = data.venues.data;
                            $scope.city = data.city;
                            $scope.county = data.county;
                            var preData = data.location_selection;
                            for (var i = 0; i < $scope.Countries.length; i++) {
                                var obj = $scope.Countries[i];
                                //$scope.selectedCountry = new Array(0);
                                for (var j = 0; j < preData.length; j++) {
                                    if (obj.id_cnt == preData[j].country_vns) {
                                        $scope.selectedCountry.push(obj);
                                        break;
                                    }
                                }
                            }

                            for (var i = 0; i < $scope.Venues.length; i++) {
                                var obj = $scope.Venues[i];
                                // $scope.selectedVenue = new Array(0);
                                for (var j = 0; j < preData.length; j++) {
                                    if (obj.id == preData[j].id) {
                                        $scope.selectedVenue.push(obj);
                                        break;
                                    }
                                }
                            }

                            for (var i = 0; i < $scope.Zones.length; i++) {
                                var obj = $scope.Zones[i];
                                //$scope.selectedZone = new Array(0);
                                for (var j = 0; j < preData.length; j++) {
                                    if (obj.pk_zone == preData[j].zone_vns) {
                                        $scope.selectedZone.push(obj);
                                        break;
                                    }
                                }
                            }
                            for (var i = 0; i < $scope.Regions.length; i++) {
                                var obj = $scope.Regions[i];
                                //$scope.selectedRegion = new Array(0);
                                for (var j = 0; j < preData.length; j++) {
                                    if (obj.id_rgs == preData[j].region_vns) {
                                        $scope.selectedRegion.push(obj);
                                        break;
                                    }
                                }
                            }
                            for (var i = 0; i < preData.length; i++) {
                                $scope.filterParam.country.push(preData[i].country_vns);
                                $scope.filterParam.region.push(preData[i].region_vns);
                                $scope.filterParam.zone.push(preData[i].zone_vns);
                                $scope.filterParam.venue.push(preData[i].region_vns);
                            }

                            $scope.filterParam.category = $scope.selectedCategory;
                             $rootScope.onlyVictims($scope.filterParam);
                        });
                    }
                });
                dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_USER_INFO, function (result) {
                    if (result.length) {
                        var data = JSON.parse(result[0].json_data);
                        //console.log("GET_USER_CONFIG: " + JSON.stringify(data));
                    }
                });

               
                //  $scope.getVictimWitnessList();
            }
        }
    };
    $scope.init(1);
    function getCatagory() {
        webRequestObject.postRequest(this, "GET", constanObject.VICTIME_CATEGORY, null, 101, true);
        webRequestObject.postRequest(this, "GET", constanObject.VICTIME_CATEGORY, null, 102, true);
        this.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(response.responseText).error);
            }
            switch (requestType) {
                case 101:
                    {
                        response.data.forEach(function (obj) {
                            if (obj.title_uct == "Member of Public") {
                                obj.selected = true;
                                $scope.selectedCategory.push(obj);
                                $scope.filterParam.category = [];
                                $scope.filterParam.category.push($scope.selectedCategory[0].id_uct);
                                $scope.victimCount = obj.count;
                            } else {
                                obj.selected = false;
                            }


                        });
                        $scope.ListCatagory = response.data;

                        
                        //console.log("ListCatagory" + JSON.stringify($scope.ListCatagory));
                        // callback(true, response.data);
                    }
                    break;
                case 102:
                {
                    response.data.forEach(function (obj) {
                        if (obj.title_uct == "Member of Public") {
                            obj.selected = true;
                            $scope.selectedCategory.push(obj);
                            $scope.filterParam.category = [];
                            $scope.filterParam.category.push($scope.selectedCategory[0].id_uct);
                            $scope.witnessCount = obj.count;
                        } else {
                            obj.selected = false;
                        }
                        $scope.ListWitnessCatagory = response.data;

                    });
                }
            }
        };
    }
    $scope.searchwitnessAction = function () {
        $scope.filterParam.name = $scope.searchText;

        $scope.filterWitness();
    };

    $scope.searchFromLocation = function () {
//        $scope.filterParam.name = '';
        $scope.filterWitness();
    };

    $scope.showWitnessDetail = function (obj) {
        $rootScope.show = false;
        var scope = angular.element($('#Details_VictimWitness')).scope();
        //console.log("scope" + (scope));
        setFirstTab();
        scope.edit = null;
        scope.fromList = true;
        if ($rootScope.filterViewVW == "Witness") {
            $rootScope.subMenuTitle1 = "Witness Detail"
            scope.isVictim = false;
            //console.log("scope.witness_id" + scope.witness_id);
        } else
        if ($rootScope.filterViewVW == "Victim") {
            $rootScope.subMenuTitle1 = "Victim Detail";
            scope.isVictim = true;
            //console.log("scope.victim_id" + scope.victim_id);
        }
       // scope.witnessVictim_id = obj.id_usr;
        scope.catagory = angular.copy($scope.categoryList);
        $rootScope.isVictimWitnessList = false;
        $rootScope.isVictimWitnessDetail = true;
        scope.init(obj.id_usr);
    };
    $scope.editWitness = function (obj) {
        $rootScope.isVictimWitnessList = false;
        $rootScope.isVictimWitnessAdd = true;

//       
//        $rootScope.victimAddShowStatus = true;
//        $rootScope.victimListShowStatus = false;
//        var scope = angular.element('#214').scope();
//        scope.init(obj.id_usr);
    };
    $scope.selectWitness = function (obj) {
        $rootScope.multiSelection = true;
        $scope.addAndRemoveWitness(obj, true);
        //console.log($scope.selectedWitness);
    };
    $scope.alertShow = function (msg, callBack) {
        $scope.alertMessage = msg;
        $scope.alertshowstatus = true;
        $scope.yesAction = function () {
            $scope.alertshowstatus = false;
            callBack(true);
        };
        $scope.noAction = function () {
            $scope.alertshowstatus = false;
            callBack(false);
        };
    };
    $scope.getCountry = function (selectedCountry) {
        //console.log("selectedCountry : " + JSON.stringify(selectedCountry));
        $scope.filterParam.country = [];
        if (selectedCountry.length == 0) {
            $scope.filterParam.country = 0;
            $scope.filterParam.region = 0;
            $scope.filterParam.zone = 0;
            $scope.filterParam.venue = 0;
            $scope.selectedCountry = [];
            $scope.selectedVenue = [];
            $scope.selectedZone = [];
            $scope.selectedRegion = [];

        } else {
            selectedCountry.forEach(function (obj) {
                $scope.filterParam.country.push(obj.id_cnt);
            });
        }
    };
    $scope.regionChange = function (selectedRegion) {


        $scope.filterParam.region = [];
        if (selectedRegion.length == 0) {
            $scope.filterParam.region = 0;
            $scope.filterParam.zone = 0;
            $scope.filterParam.venue = 0;
            $scope.selectedVenue = [];
            $scope.selectedZone = [];
            $scope.selectedRegion = [];
        } else {
//            for (i = 0; i < selectedRegion.length - 1; i++) {
            selectedRegion.forEach(function (obj) {
                $scope.filterParam.region.push(obj.id_rgs);
            });
        }
    };
    $scope.zoneChange = function (selectedZone) {
        $scope.filterParam.zone = [];
        if (selectedZone.length == 0) {
            $scope.filterParam.zone = 0;
            $scope.filterParam.venue = 0;
            $scope.selectedVenue = [];
            $scope.selectedZone = [];

        } else {
//            for (i = 0; i < selectedZone.length-1; i++) {
            selectedZone.forEach(function (obj) {
                $scope.filterParam.zone.push(obj.pk_zone);
            });
        }
    };

    $scope.getVenue = function (selectedVenue) {
        //console.log("selectedVenue : " + JSON.stringify(selectedVenue));
        $scope.filterParam.venue = [];

        if (selectedVenue.length == 0) {
            $scope.filterParam.venue = 0;
            $scope.selectedVenue = [];
        } else {
//            for (i = 0; i < selectedVenue.length; i++) {
            selectedVenue.forEach(function (obj) {
                $scope.filterParam.venue.push(obj.id);
            });
        }
    };

    $scope.filterWitness = function () {

        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        var filterData = {search: $scope.filterParam};
        //$scope.page = 1;

        if ($rootScope.filterViewVW == "Witness") {
            if (globalService.getUserProfileTypeAndId().userId) {
            if (globalService.getUserProfileTypeAndId().type == 'staff'){
                $scope.url = $scope.url_witnessList + '/' + globalService.getUserProfileTypeAndId().type + '/' + globalService.getUserProfileTypeAndId().userId;
            globalService.setUserProfileTypeAndId({'type': '', 'userId': ''});
        }
        else if (globalService.getUserProfileTypeAndId().type == 'venue'){
                $scope.url = $scope.url_witnessList + '/' + globalService.getUserProfileTypeAndId().type + '/' + globalService.getUserProfileTypeAndId().userId;
            globalService.setUserProfileTypeAndId({'type': '', 'userId': ''});
        }
        } else {
            $scope.url = $scope.url_witnessList;
        }
            WitnessService.getWitnessData(null, $scope.url, filterData, function (status, data, next_page_url, prev_page_url) {
                $scope.$apply(function () {

                    $scope.infoShow1 = false;
                    //console.log("VictimWitnessData" + JSON.stringify(data));
                    if (data == "Witnesses Not Found") {
                        $scope.infoShow1 = true;
                        $scope.VictimWitnessData = null;
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = false;
                        return;
                    }
                    $scope.VictimWitnessData = data;
                    //console.log("witness Data" + JSON.stringify($scope.VictimWitnessData));

                    if (next_page_url == null) {
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = false;
                    } else {
                        if (prev_page_url != null) {
                            $scope.prevShowStatus = true;
                            $scope.nextShowStatus = true;
                        } else {
                            $scope.prevShowStatus = false;
                            $scope.nextShowStatus = true;
                        }
                    }
                });
            });
        } else {
            
             if (globalService.getUserProfileTypeAndId().userId) {
            if (globalService.getUserProfileTypeAndId().type == 'staff'){
                $scope.url = $scope.url_victimList + '/' + globalService.getUserProfileTypeAndId().type + '/' + globalService.getUserProfileTypeAndId().userId;
            globalService.setUserProfileTypeAndId({'type': '', 'userId': ''});
        }
        else if (globalService.getUserProfileTypeAndId().type == 'venue'){
                $scope.url = $scope.url_victimList + '/' + globalService.getUserProfileTypeAndId().type + '/' + globalService.getUserProfileTypeAndId().userId;
            globalService.setUserProfileTypeAndId({'type': '', 'userId': ''});
        }
        } else {
            $scope.url = $scope.url_victimList;
        }
            VictimWitness.getVictimeData(null, $scope.url, filterData, function (status, data, next_page_url, prev_page_url) {
                if (status) {
                    $scope.$apply(function () {
                        $scope.infoShow1 = false;
                        //console.log("Victim Data" + JSON.stringify(data));
                        $scope.VictimWitnessData = data;
                        //console.log("Victim Data" + JSON.stringify($scope.VictimWitnessData));

                        if (next_page_url != null && prev_page_url != null) {
                            $scope.nextShowStatus = true;
                            $scope.prevShowStatus = true;
                            return;
                        }
                        if (next_page_url != null) {
                            $scope.nextShowStatus = true;
                            $scope.prevShowStatus = false;
                            return;
                        }
                        if (prev_page_url != null) {
                            $scope.nextShowStatus = false;
                            $scope.prevShowStatus = true;
                            return;
                        } else {
                            $scope.nextShowStatus = false;
                            $scope.prevShowStatus = false;
                        }
                    });
                } else {
                    $scope.$apply(function () {
                        $scope.VictimWitnessData = [];
                        $scope.infoShow1 = true;
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = false;
                    });
                }
            });

        }

    };
    $scope.infoClose = function () {
        $scope.infoShow1 = false;
    };

//    $scope.addVictimWitness = function () {
//        //console.log("addVictimWitness");
//        
//        $rootScope.isVictimWitnessList = false;
//        $rootScope.isVictimWitnessDetail = false;
//        $rootScope.isVictimWitnessAdd = true;
//    };

    $scope.addWitnessAction = function () {
        // debugger
        var nextPageScope = angular.element($('#Add_VictimWitness')).scope();
        setFirstTab();
        nextPageScope.witnessVictim_id = null;
        nextPageScope.VictimWitnessData = null;
        nextPageScope.isVictimWitnessAdd = null;

        $rootScope.isVictimWitnessList = false;
        $rootScope.isVictimWitnessDetail = false;
        $rootScope.isVictimWitnessAdd = true;
        nextPageScope.init();
    };

    $scope.categoryChangeAction = function (index, catObj) {

        if ($scope.isVictim == true) {
            var count = 0;
            if ($scope.ListCatagory[index].selected == true) {
                //console.log("element doesn't exist");
                $scope.ListCatagory[index].selected = false;
                $scope.selectedCategory.splice(index, 1);
                var ind = $scope.selectedCategory.indexOf(catObj.id_uct);
                $scope.filterParam.category.splice(ind, 1);

            } else {

                //console.log("element found");
                $scope.ListCatagory[index].selected = true;
                $scope.filterParam.category.push(catObj.id_uct);
                $scope.selectedCategory.push(catObj);

            }


            //console.log("$scope.selectedCategory VICTIM : " + JSON.stringify($scope.ListCatagory));
            for (var i = 0; i < $scope.ListCatagory.length; i++) {
                if ($scope.ListCatagory[i].selected == true)
                    count = (parseInt(count) + parseInt($scope.ListCatagory[i].count));
            }
            $scope.victimCount = count;
        }
        if ($scope.isWitness == true) {
            var count = 0;

            $scope.ListCatagory = $scope.ListWitnessCatagory;
            if ($scope.ListCatagory[index].selected == true) {
                //console.log("element doesn't exist");
                $scope.ListCatagory[index].selected = false;
                $scope.selectedCategory.splice(index, 1);
                var ind = $scope.selectedCategory.indexOf(catObj.id_uct);
                $scope.filterParam.category.splice(ind, 1);

            } else {
                //console.log("element found");
                $scope.ListCatagory[index].selected = true;
                $scope.filterParam.category.push(catObj.id_uct);
                $scope.selectedCategory.push(catObj);

            }
            //console.log("$scope.selectedCategory WITNESS : " + JSON.stringify($scope.ListCatagory));
            for (var i = 0; i < $scope.ListCatagory.length; i++) {
                if ($scope.ListCatagory[i].selected == true)
                    count = (parseInt(count) + parseInt($scope.ListCatagory[i].count));
            }
            $scope.witnessCount = count;
        }

    };

    function initVictimCategory() {
        var count = 0;
        for (var i = 0; i < $scope.ListCatagory.length; i++) {
            if ($scope.ListCatagory[i].id_uct == 13)
                $scope.ListCatagory[i].selected = true;
            else
                $scope.ListCatagory[i].selected = false;
        }
        $scope.ListCatagory.forEach(function (obj) {
            if (obj.title_uct == "Member of Public") {
                obj.selected = true;
                $scope.selectedCategory.push(obj);
                $scope.filterParam.category = [];
                $scope.filterParam.category.push($scope.selectedCategory[0].id_uct);

            } else {
                obj.selected = false;
            }


        });

        //console.log("$scope.selectedCategory VICTIM : " + JSON.stringify($scope.ListCatagory));
        for (var i = 0; i < $scope.ListCatagory.length; i++) {
            if ($scope.ListCatagory[i].selected == true)
                count = (parseInt(count) + parseInt($scope.ListCatagory[i].count));
        }
        $scope.victimCount = count;
    }

    function initWitnessCategory() {
        var count = 0;

        $scope.ListCatagory = $scope.ListWitnessCatagory;
        for (var i = 0; i < $scope.ListCatagory.length; i++) {
            if ($scope.ListCatagory[i].id_uct == 13)
                $scope.ListCatagory[i].selected = true;
            else
                $scope.ListCatagory[i].selected = false;
        }


        $scope.ListCatagory.forEach(function (obj) {
            if (obj.title_uct == "Member of Public") {
                obj.selected = true;
                $scope.selectedCategory.push(obj);
                $scope.filterParam.category = [];
                $scope.filterParam.category.push($scope.selectedCategory[0].id_uct);

            } else {
                obj.selected = false;
            }


        });


        //console.log("$scope.selectedCategory WITNESS : " + JSON.stringify($scope.ListCatagory));
        for (var i = 0; i < $scope.ListCatagory.length; i++) {
            if ($scope.ListCatagory[i].selected == true)
                count = (parseInt(count) + parseInt($scope.ListCatagory[i].count));
        }
        $scope.witnessCount = count;
    }
    $scope.previousPageRequest = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        var filterData = {search: $scope.filterParam};
//        $scope.prevShowStatus = true;
//        $scope.nextShowStatus = true;
        if ($rootScope.filterViewVW == "Victim") {
           
            VictimWitness.getVictimeData($scope.page, $scope.url, filterData, function (status, data, next_page_url, prev_page_url) {
                if (prev_page_url != null)
                    $scope.page = prev_page_url.split("=")[1];
                else
                    ++$scope.page;
//                 = responce.prev_page_url;
                $scope.$apply(function () {
                    hilightWitcess();
                    $scope.infoShow1 = false;
                    $scope.VictimWitnessData = data;
                    if (next_page_url != null && prev_page_url != null) {
                        $scope.nextShowStatus = true;
                        $scope.prevShowStatus = true;
                        return;
                    }
                    if (next_page_url != null) {
                        $scope.nextShowStatus = true;
                        $scope.prevShowStatus = false;
                        return;
                    }
                    if (prev_page_url != null) {
                        $scope.nextShowStatus = false;
                        $scope.prevShowStatus = true;
                        return;
                    } else {
                        $scope.nextShowStatus = false;
                        $scope.prevShowStatus = false;
                    }

                });


            });
        } else {
             WitnessService.getWitnessData($scope.page, $scope.url, filterData, function (status, data, next_page_url, prev_page_url, responce) {
                if (prev_page_url != null)
                    $scope.page = prev_page_url.split("=")[1];
                else
                    ++$scope.page;
//                $scope.preURL = prev_page_url;
                $scope.$apply(function () {
                    $scope.VictimWitnessData = data;
                    hilightWitcess();
                    $scope.infoShow1 = false;
                    if (responce.next_page_url != null && responce.prev_page_url != null) {
                        $scope.nextShowStatus = true;
                        $scope.prevShowStatus = true;
                        return;
                    }
                    if (responce.next_page_url != null) {
                        $scope.nextShowStatus = true;
                        $scope.prevShowStatus = false;
                        return;
                    }
                    if (responce.prev_page_url != null) {
                        $scope.nextShowStatus = false;
                        $scope.prevShowStatus = true;
                        return;
                    } else {
                        $scope.nextShowStatus = false;
                        $scope.prevShowStatus = false;
                    }
                });

            });
        }
    };

    $scope.nextPageRequest = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        var filterData = {search: $scope.filterParam};
        // var url = "";
        if ($rootScope.filterViewVW == "Victim") {
//                        url = $scope.url_victimList;
 
            VictimWitness.getVictimeData($scope.page, $scope.url, filterData, function (status, data, next_page_url, prev_page_url) {
                if (next_page_url != null)
                    $scope.page = next_page_url.split("=")[1];
                else
                    --$scope.page;
//                $scope.nextURL = ;
                $scope.$apply(function () {
                    $scope.VictimWitnessData = data;
                    if (next_page_url != null && prev_page_url != null) {
                        $scope.nextShowStatus = true;
                        $scope.prevShowStatus = true;
                        return;
                    }
                    if (next_page_url != null) {
                        $scope.nextShowStatus = true;
                        $scope.prevShowStatus = false;
                        return;
                    }
                    if (prev_page_url != null) {
                        $scope.nextShowStatus = false;
                        $scope.prevShowStatus = true;
                        return;
                    } else {
                        $scope.nextShowStatus = false;
                        $scope.prevShowStatus = false;
                    }


                });

            });
        } else {
         
            WitnessService.getWitnessData($scope.page, $scope.url, filterData, function (status, data, next_page_url, prev_page_url) {
                $scope.$apply(function () {
                    if (next_page_url != null)
                        $scope.page = next_page_url.split("=")[1];
                    else
                        --$scope.page;
//                    $scope.nextURL = next_page_url;
                    $scope.VictimWitnessData = data;
                    hilightWitcess();
                    if (next_page_url != null && prev_page_url != null) {
                        $scope.nextShowStatus = true;
                        $scope.prevShowStatus = true;
                        return;
                    }
                    if (next_page_url != null) {
                        $scope.nextShowStatus = true;
                        $scope.prevShowStatus = false;
                        return;
                    }
                    if (prev_page_url != null) {
                        $scope.nextShowStatus = false;
                        $scope.prevShowStatus = true;
                        return;
                    } else {
                        $scope.nextShowStatus = false;
                        $scope.prevShowStatus = false;
                    }

                });
            });
        }


    };

    $scope.nextButtonClicked = function (callback) {
        if ($scope.isVictimWitnessList) {
            if ($scope.selectedWitness.length > 0) {
                var scope = angular.element('#220').scope();
                scope.catagory = $scope.categoryList;
                scope.witnessList = $scope.selectedWitness;
                //globalService.setWitness()
                $rootScope.show = false;
                $rootScope.alertMsg = "";
                return callback(true, 1);
            } else {
                $rootScope.show = true;
                window.scrollTo(0, 0);
                $rootScope.alertMsg = "Please add/select a witness.";
                return callback(false, 0);
            }

        }
//        return callback(false, 0);
    };

    $scope.back = function (callback) {
        if ($scope.isVictimWitnessList) {
            setFirstTab();
            $rootScope.show = false;
            return callback(true, noOfPageMove);
        }

    };

    $scope.saveButtonAction = function () {
        //console.log("SAVE");
    };

//    $scope.getVictimWitnessList = function () {
//        if (!checkInternetConnectionService.checkNetworkConnection()) {
//            $rootScope.show = true;
//            window.scrollTo(0, 0);
//            $rootScope.alertMsg = "No internet connection.";
//            return;
//        }
//        var preData = globalService.getVenueId();
//        var searchData = {search: {country: preData.country_vns, zone: preData.zone_vns, venue: preData.id, region: preData.region_vns, category: $scope.selectedCategory}};
//        WitnessService.getWitnessData($scope.page, $scope.url_witnessList, searchData, function (status, data, next_page_url, prev_page_url) {
//            $scope.$apply(function () {
//                //console.log(JSON.stringify(data));
//                if (data == "Witnesses Not Found") {
//                    $scope.infoShow1 = true;
//                    $scope.prevShowStatus = false;
//                    $scope.nextShowStatus = false;
//                    $scope.VictimWitnessData = [];
//                } else {
//                    $scope.VictimWitnessData = data;
//                    if (next_page_url == null) {
//                        $scope.prevShowStatus = false;
//                        $scope.nextShowStatus = false;
//                    } else {
//                        if (prev_page_url != null) {
//                            $scope.prevShowStatus = true;
//                            $scope.nextShowStatus = true;
//                        } else {
//                            $scope.prevShowStatus = false;
//                            $scope.nextShowStatus = true;
//                        }
//                    }
////                                for (var i = 0; i < $scope.VictimWitnessData.length; i++) {
////                                    $scope.VictimWitnessData[i].last_updated = moment($scope.witnessDatawitnessData[i].last_updated).format('DD MMM YYYY');
////                                }
//                    hilightWitcess();
//                }
//            });
//        });
//    };

    function hilightWitcess() {
        $scope.selectedWitness.forEach(function (obj) {
            $("div .witness-view ul li").children("#" + obj.id_usr).addClass("active");
        });
    }
    ;

    var getCommsDetails = function (victimWitness_id) {
        webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + victimWitness_id,
                null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
    };
    $scope.addnote = {};
    $scope.showAddNotePopup = function (victimWitness) {
        victimWitness_id = victimWitness.id_usr;
        //console.log("showAddNotePopup");
        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.notes.note_type_jnt = 0;
        var url = constanObject.CommsConfig + moduleId + "/" + victimWitness_id;
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

    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            $scope.$apply(function () {
                $rootScope.show = true;
                $rootScope.alertMsg = responseData.responseJSON.error;
            });
            return;
        }
        switch (requestType) {
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
                        //getCommsDetails(victimWitness_id);
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
                    //getCommsDetails(victimWitness_id);
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
    }
});