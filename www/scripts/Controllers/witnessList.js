BandQModule.controller('winessCnt', function ($scope, WitnessService, $rootScope, globalService, checkInternetConnectionService) {
    $scope.categoryList = null;
    $scope.prevShowStatus = null;
    $scope.nextShowStatus = null;
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
    $scope.filterParam = {};
    $scope.witnessData = [];
    $scope.selectedWitness = [];
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
    $scope.url = constanObject.WITNESS_LIST;
    var parent = $("#218").parents(".incident_report_wrapper");
    parent.removeClass("incident_report_wrapper");
    var noOfPageMove;

    $scope.init = function (_noOfPageMove) {
        noOfPageMove = _noOfPageMove;
        $rootScope.show = false;
        $scope.infoShow1 = false;
        $scope.searchText = "";
        $scope.categoryList = angular.copy(WitnessService.getWitnessCategory());
        $scope.selectedCategory = WitnessService.getSelectedVitnessCategory();
        if ($rootScope.witnessListShowStatus) {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.witnessAddShowStatus = true;
                $rootScope.witnessListShowStatus = false;
                $rootScope.witnessDetailShowStatus = false;
                var scopeAddWitness = angular.element($('#217')).scope();
                scopeAddWitness.init();
                // return;

            } else {
                $scope.page = 1;
                $scope.prevShowStatus = false;
                $scope.nextShowStatus = true;
                dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_COUNTRY_STATE_REGION_CITY, function (result) {
                    var data = JSON.parse(result[0].json_data);

                    $scope.$apply(function () {
                        $scope.Countries = $scope.allCountryList = data.country;
                        $scope.Regions = $scope.allRegionList = data.regions;
                        $scope.Zones = $scope.allZoneList = data.zones;
                        $scope.Venues = $scope.allVenueList = data.venues.data;
                        $scope.city = data.city;
                        $scope.county = data.county;
                        var preData = globalService.getVenueId();
                        for (var i = 0; i < $scope.Countries.length; i++) {
                            var obj = $scope.Countries[i];
                            $scope.selectedCountry = new Array(0);
                            if (obj.id_cnt == preData.country_vns) {
                                $scope.selectedCountry.push(obj);
                                break;
                            }
                        }

                        for (var i = 0; i < $scope.Venues.length; i++) {
                            var obj = $scope.Venues[i];
                            $scope.selectedVenue = new Array(0);
                            if (obj.id == preData.id) {
                                $scope.selectedVenue.push(obj);
                                break;
                            }
                        }

                        for (var i = 0; i < $scope.Zones.length; i++) {
                            var obj = $scope.Zones[i];
                            $scope.selectedZone = new Array(0);
                            if (obj.pk_zone == preData.zone_vns) {
                                $scope.selectedZone.push(obj);
                                break;
                            }
                        }
                        for (var i = 0; i < $scope.Regions.length; i++) {
                            var obj = $scope.Regions[i];
                            $scope.selectedRegion = new Array(0);
                            if (obj.id_rgs == preData.region_vns) {
                                $scope.selectedRegion.push(obj);
                                break;
                            }
                        }
                        $scope.filterParam.country = preData.country_vns;
                        $scope.filterParam.region = preData.region_vns;
                        $scope.filterParam.zone = preData.zone_vns;
                        $scope.filterParam.venue = preData.id;
                        $scope.filterParam.category = $scope.selectedCategory;

                    });
                });
                dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_USER_INFO, function (result) {
                    var data = JSON.parse(result[0].json_data);
                    //console.log("GET_USER_CONFIG: " + JSON.stringify(data));
                });
                window.scrollTo(0, 0);

                $scope.getVictimWitnessList();
            }
        }
    };

    $scope.searchwitnessAction = function () {
        $scope.filterParam.name = $scope.searchText;
        $scope.filterWitness();
    };

    $scope.searchFromLocation = function () {
        $scope.filterParam.name = '';
        $scope.filterWitness();
    }

    $scope.showWitnessDetail = function (obj) {
        $rootScope.show = false;
        var scope = angular.element($('#219')).scope();
        setFirstTab();
        scope.edit = null;

        scope.witness_id = obj.id_usr;
        scope.catagory = angular.copy($scope.categoryList);
        $rootScope.witnessListShowStatus = false;
        $rootScope.witnessDetailShowStatus = true;
        scope.init();
    };
    $scope.editWitness = function (obj) {
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

    $scope.addAndRemoveWitness = function (obj, status) {

        var result = $scope.selectedWitness.filter(
                function (obj1) {
                    return (obj1.id_usr == obj.id_usr);
                }
        );
        if (result.length > 0) {
            if (status) {
                $scope.alertShow("Are you sure you want to remove this witness?", function (status) {
                    if (status) {
                        $scope.removeWitness(obj);
                    }
                });


            }
        } else {
            if (status) {
                $scope.alertShow("Are you sure you want to add this witness?", function (status1) {
                    if (status1) {
                        $scope.addWitness(obj);
                    }
                });
            } else {
                $scope.addWitness(obj);
            }
        }
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

    $scope.addWitness = function (obj) {
        $("div .witness-view ul li").children("#" + obj.id_usr).addClass("active");
        $scope.selectedWitness.push(obj);
    };
    $scope.removeWitness = function (obj) {
        $("div .witness-view ul li").children("#" + obj.id_usr).removeClass("active");
        var index = $scope.selectedWitness.indexOf(obj);
        $scope.selectedWitness.splice(index, 1);

    };
    $scope.getCountry = function (selectedCountry) {
        //console.log("selectedCountry : " + JSON.stringify(selectedCountry));
        // set region, zone and venue
        $scope.Regions = new Array(0);
        $scope.Zones = new Array(0);
        $scope.Venues = new Array(0);

        $scope.filterParam.country = [];
        if (selectedCountry.length == 0) {
            $scope.filterParam.country = 0;
            $scope.filterParam.region = 0;
            $scope.filterParam.zone = 0;
            $scope.filterParam.venue = 0;
            $scope.selectedCountry = new Array(0);
            $scope.selectedRegion = new Array(0);
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);

        } else {
            for (i = 0; i < selectedCountry.length; i++) {
                //console.log("Selected countries are " + selectedCountry[i].id_cnt);
                $scope.filterParam.country.push(selectedCountry[i].id_cnt);
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

    };
    $scope.regionChange = function (selectedRegion) {

        $scope.filterParam.region = [];
        if (selectedRegion.length == 0) {
            $scope.filterParam.region = 0;
            $scope.filterParam.zone = 0;
            $scope.filterParam.venue = 0;
            $scope.selectedRegion = new Array(0);
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);
        } else {
            for (i = 0; i < selectedRegion.length; i++) {
                //console.log("Selected regions are " + selectedRegion[i].id_rgs);
                $scope.filterParam.region.push(selectedRegion[i].id_rgs);
            }

        }

        // set  zone and venue
        $scope.Zones = new Array(0);
        $scope.Venues = new Array(0);
        for (var i = 0; i < $scope.allZoneList.length; i++) {

            for (var j = 0; j < selectedRegion.length; j++) {

                for (var k = 0; k < $scope.allZoneList[i].region.length; k++) {

                    if ($scope.allZoneList[i].region[k].fk_region == selectedRegion[j].id_rgs)
                        if ($.inArray($scope.allZoneList[i], $scope.Zones) < 0)
                            $scope.Zones.push($scope.allZoneList[i]);
                }
            }
        }

    };
    $scope.zoneChange = function (selectedZone) {
        $scope.filterParam.zone = [];
        if (selectedZone.length == 0) {
            $scope.filterParam.zone = 0;
            $scope.filterParam.venue = 0;
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);
        } else {
            for (i = 0; i < selectedZone.length; i++) {
                //console.log("Selected regions are " + selectedZone[i].pk_zone);
                $scope.filterParam.zone.push(selectedZone[i].pk_zone);
            }

        }
        $scope.Venues = new Array(0);
        for (var i = 0; i < $scope.allVenueList.length; i++) {
            for (var j = 0; j < selectedZone.length; j++) {
                if ($scope.allVenueList[i].zone_vns == selectedZone[j].pk_zone)
                    if ($.inArray($scope.allVenueList[i], $scope.Venues) < 0)
                        $scope.Venues.push($scope.allVenueList[i]);

            }
        }
    };
    $scope.getVenue = function (selectedVenue) {
        //console.log("selectedVenue : " + JSON.stringify(selectedVenue));
        $scope.filterParam.venue = [];

        if (selectedVenue.length == 0) {
            $scope.filterParam.venue = 0;
        } else {
            for (i = 0; i < selectedVenue.length; i++) {
                //console.log("Selected venue are " + selectedVenue[i].id);

                $scope.filterParam.venue.push(selectedVenue[i].id);
            }


        }


    };

    $scope.filterWitness = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        $scope.filterParam.category = $scope.selectedCategory;
        //console.log(JSON.stringify($scope.filterParam));
        var filterData = {search: $scope.filterParam};
        $scope.page = null;
        WitnessService.getWitnessData($scope.page, $scope.url, filterData, function (status, data, next_page_url, prev_page_url) {
            $scope.$apply(function () {
                $scope.infoShow1 = false;
                //console.log(JSON.stringify(data));
                if (data == "Witnesses Not Found") {
                    $scope.infoShow1 = true;
                    $scope.witnessData = null;
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                    return;
                }
                $scope.witnessData = data;
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


                for (var i = 0; i < $scope.witnessData.length; i++) {
                    $scope.witnessData[i].last_updated = dateFormat($scope.witnessData[i].last_updated);
                }
            });
            hilightWitcess();
        });
    };
    $scope.infoClose = function () {
        $scope.infoShow1 = false;
    };
    $scope.addWitnessAction = function () {
        var nextPageScope = angular.element($('#217')).scope();
        setFirstTab();
        nextPageScope.witness_id = null;
        nextPageScope.witnessData = null;
        nextPageScope.catagory = angular.copy($scope.categoryList);
        $rootScope.witnessListShowStatus = false;
        $rootScope.witnessAddShowStatus = true;
        nextPageScope.init();
    };

    $scope.categoryChangeAction = function (index, catObj) {
        //console.log("Index : " + index + ">>>catObj : " + catObj);
//        if($scope.selectedCategory.length==0){
//            $scope.selectedCategory.push(catObj.id_uct);
//        }
        ($scope.categoryList[index].selected == true) ? ($scope.categoryList[index].selected = false) : ($scope.categoryList[index].selected = true);
        if ($scope.selectedCategory.indexOf(catObj.id_uct) == -1) {
            //console.log("element doesn't exist");
            $scope.selectedCategory.push(catObj.id_uct);
        } else {
            //console.log("element found");
            var index = $scope.selectedCategory.indexOf(catObj.id_uct);
            $scope.selectedCategory.splice(index, 1);
        }




        //console.log("$scope.selectedCategory : " + JSON.stringify($scope.selectedCategory));
    };

    $scope.previousPageRequest = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        if ($scope.page > 1) {
            $scope.prevShowStatus = true;
            $scope.nextShowStatus = true;
            var page = ($scope.page > 1 ? (--$scope.page) : 1);
            window.scrollTo(0, 0);
            WitnessService.getWitnessData(page, $scope.url, null, function (status, data, next_page_url, prev_page_url) {
                $scope.$apply(function () {
                    if (page == 1) {
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = true;
                    }
                    $scope.witnessData = data;
                    for (var i = 0; i < $scope.witnessData.length; i++) {
                        $scope.witnessData[i].last_updated = dateFormat($scope.witnessData[i].last_updated);
                    }
                });
                hilightWitcess();
                $scope.infoShow1 = false;
            });
        } else {
            $scope.prevShowStatus = false;
            $scope.nextShowStatus = true;
        }
    };

    $scope.nextPageRequest = function () {
        window.scrollTo(0, 0);
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;

            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        WitnessService.getWitnessData(++$scope.page, $scope.url, null, function (status, data, next_page_url, prev_page_url) {
            $scope.$apply(function () {
                if (status) {
                    $scope.prevShowStatus = true;
                    $scope.nextShowStatus = true;
                    $scope.witnessData = data;
                    for (var i = 0; i < $scope.witnessData.length; i++) {
                        $scope.witnessData[i].last_updated = dateFormat($scope.witnessData[i].last_updated);
                    }
                } else {
                    $scope.prevShowStatus = true;
                    $scope.nextShowStatus = false;
                    --$scope.page;
                }
            });
            hilightWitcess()
        });
    };

    $scope.nextButtonClicked = function (callback) {
        if ($rootScope.witnessListShowStatus) {
            window.scrollTo(0, 0);
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
        if ($rootScope.witnessListShowStatus) {
            window.scrollTo(0, 0);
            setFirstTab();
            $rootScope.show = false;
            return callback(true, noOfPageMove);
        }

    };

    $scope.saveButtonAction = function () {
        //console.log("SAVE");
    };

    $scope.getVictimWitnessList = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        var preData = globalService.getVenueId();
        var searchData = {search: {country: preData.country_vns, zone: preData.zone_vns, venue: preData.id, region: preData.region_vns, category: $scope.selectedCategory}};
        WitnessService.getWitnessData($scope.page, $scope.url, searchData, function (status, data, next_page_url, prev_page_url) {
            $scope.$apply(function () {
                //console.log(JSON.stringify(data));
                if (data == "Witnesses Not Found") {
                    $scope.infoShow1 = true;
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                    $scope.witnessData = [];
                } else {
                    $scope.witnessData = data;
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
                    for (var i = 0; i < $scope.witnessData.length; i++) {
                        $scope.witnessData[i].last_updated = dateFormat($scope.witnessData[i].last_updated);
                    }
                    hilightWitcess();
                }
            });
        });
    };
    function hilightWitcess() {
        $scope.selectedWitness.forEach(function (obj) {
            $("div .witness-view ul li").children("#" + obj.id_usr).addClass("active");
        });
    }
    ;
//    var getCommsDetails = function (vechileId) {
//        webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + vechileId,
//                null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
//    };
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

            } else {
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
        $scope.notes.id_jno_jnt = victimWitness_id;
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