BandQModule.controller('addStaffController', function ($scope, globalService, $rootScope, checkInternetConnectionService, WitnessService, VictimWitness, imageService, advanceFilter) {
//   alert("AddNew_VictimWitnessCtrl");
    $scope.modelData = {};
    $scope.formData = {};
//    $scope.isVictime = true;
    $scope.profile = null;
//    $scope.selectedCat = [];
    $scope.errorshow = false;
    $scope.isCameraOption = false;
    $scope.isFileUpload = false;
    $scope.staff_id = null;
    $scope.catagory = [];
    $scope.formData.image_users = ["images/profile_img.png"];
    $scope.title = "Add Staff";
    $scope.images = [];
    $scope.isVictim = null;
    $scope.title_usr = [];
    $scope.gender = [];
    $scope.country = [];
    $scope.states = [];
    $scope.cities = [];
    var imageflag = false;
    var i = 0;
    $scope.isNoInterStrip = true;
    $scope.showProfileCancel = false;
    var isProfileImage = false;
    $scope.closeNoInternetStrip = function () {
        $scope.isNoInterStrip = false;
    };
    $scope.show = false;
    $scope.btnActive = "";
    $scope.init = function () {
//        $("#link_1").removeClass("activate");
//        $("#link_2").removeClass("activate");
//        $("#link_3").removeClass("activate");
//        $("#link_4").removeClass("activate");
//        $("#link_5").addClass("activate");
        $scope.btnActive = "";
        $scope.show = false;
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        getFilterData();
        advanceFilter.getAdvanceSearchConfig(function (status, data) {
            $scope.$apply(function () {
                if (status) {
                    var milliseconds = new Date().getTime();
                    dataBaseObj.deleteTableData(ADVANCE_FILTER_DATA);
                    dataBaseObj.insertData(ADVANCE_FILTER_DATA, JSON_DATA_KEY, [JSON.stringify(data), milliseconds], null);
                    getFilterData();
                }
            });
        });
        $scope.isNoInterStrip = false;
        imageflag = false;
        $rootScope.show = true;
        $scope.formData = {};
        $scope.modelData = {};
        // if ($rootScope.isVictimWitnessAdd) {

        var profileImage = document.getElementById("staffProfileImage");
        profileImage.src = "images/profile_img.png";
        $scope.images = [];
        getCountryList(function (country) {
            $scope.$apply(function () {
                $scope.country = country;
            });
        });
        if ($rootScope.isEditProfile) {
            $rootScope.menuTitle = "Employment";
            $rootScope.subMenuTitle = "Staff Directory";
            $rootScope.subMenuTitle1 = "Edit Staff";
            $scope.isFileUpload = false;
            $scope.editInTitle = "Edit Staff: ";
            var data = $scope.profile[0];
            //console.log("Data : " + JSON.stringify(data));
            $scope.formData.id_usr = data.id_usr;
            $scope.formData.firstname_usr = data.firstname_usr;
            $scope.formData.lastname_usr = data.lastname_usr;
            $scope.formData.address_usr = data.address_usr;
            $scope.formData.address_2usr = data.address_2_usr;
            $scope.formData.address_3usr = data.address_3_usr;
            $scope.formData.p_tph_usr = data.p_tph_usr;
            $scope.formData.p_mob_usr = data.p_mob_usr;
            $scope.formData.email_usr = data.email_usr;
            $scope.formData.postcode_usr = data.postcode_usr;
            $scope.formData.job_usr = data.job_usr;
            $scope.formData.dob_usr = data.dob_usr;
            $scope.formData.niss_usr = data.niss_usr;
            $scope.formData.sec_email_usr = data.secondary_email;
            $scope.formData.telephone_usr = data.telephone_usr;
            $scope.formData.mobile_usr = data.mobile_usr;
            $scope.formData.work_ext_usr = data.work_ext_usr;
            $scope.formData.p_mail_usr = data.p_mail_usr;
            $scope.formData.work_ddi_usr = data.work_ddi_usr;


//            for (var i = 0; i < $scope.catagory.length; i++) {
//                for (var j = 0; j < data.categories.length; j++)
//                    if ($scope.catagory[i].id_uct == data.categories[j].id_uct) {
//                        $scope.modelData.category_usr.push($scope.catagory[i]);
//                    }
//            }

//            if (data.images > 0) {
//                var profileImage = document.getElementById("victimProfileImage");
//                $scope.images = [];
//                if ($scope.isVictim) {
//                    $scope.formData.image_users = constanObject.VICTIME_IMAGE + $scope.witnessVictim_id + "/1";
//                    profileImage.src = constanObject.VICTIME_IMAGE + $scope.witnessVictim_id + "/1";
//                } else {
//                    $scope.formData.image_users = constanObject.WITNESS_IMAGE + $scope.witnessVictim_id + "/1";
//                    profileImage.src = constanObject.WITNESS_IMAGE + $scope.witnessVictim_id + "/1";
//                }
//
//                for (var i = 1; i <= data.images; i++) {
//                    if ($scope.isVictim)
//                        $scope.images.push({name: '', url: constanObject.VICTIME_IMAGE + $scope.witnessVictim_id + "/" + i, id: i});
//                    else
//                        $scope.images.push({name: '', url: constanObject.WITNESS_IMAGE + $scope.witnessVictim_id + "/" + i, id: i});
//
//                }
//            }
            $scope.title_usr.forEach(function (obj) {
                if (obj.keys == data.title_usr) {
                    $scope.modelData.title_usr = obj;
                    $scope.formData.title_usr = obj.keys;
                }

            });
            if ((data.sex_usr != "Not Entered") || (data.sex_usr != "<b>Not Entered</b>")) {
                $scope.gender.forEach(function (obj) {
                    if (obj.keys == data.sex_usr) {
                        $scope.modelData.sex_usr = obj;
                        $scope.formData.sex_usr = obj.keys;
                    }

                });
            }

            getCountryList(function (country) {
                if ((data.country_usr != "Not Entered") || (data.country_usr != "<b>Not Entered</b>")) {
                    country.forEach(function (obj) {
                        if (obj.id_cnt == data.country_usr) {
                            $scope.$apply(function () {
                                $scope.modelData.country_usr = obj;
                                $scope.formData.country_usr = obj.id;
                            });
                        }

                    });
                }

            });
        } else {
//                var scope = angular.element('#List_VictimWitness').scope();
//                $scope.modelData.category_usr = scope.selectedCategory;
            $scope.editInTitle = null;
            getCatagory();
        }

        // }
        if("staffForm.$valid" == true){
            $scope.btnActive = "btn-green";
        }
        else{
            $scope.btnActive = "";
        }
    };
    $scope.init();
    $scope.$watch('staffForm.$valid', function (isValid) {
        // console.log("isValid : "+isValid);
        if (isValid) {
            $scope.btnActive = "btn-green";
        }
        else {
            $scope.btnActive = "";
        }

    });
    function getFilterData() {

        dataBaseObj.getDatafromDataBase("SELECT * FROM " + ADVANCE_FILTER_DATA, function (result) {
            if (result[0]) {
                var data = JSON.parse(result[0].json_data);
                $scope.$apply(function () {
                    $scope.title_usr = data.titles;
                    $scope.gender = data.gender;
                    //$scope.title_usr.unshift({keys: 0, val: "Please Select"});
                    //$scope.gender.unshift({keys: 0, val: "Please Select"});
                });
            }
        });
    }
    function getCatagory() {
        webRequestObject.postRequest(this, "GET", constanObject.GET_STAFF_CATEGORIES, null, 101, true);
        this.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(response.responseText).error);
            }
            switch (requestType) {
                case 101:
                {
                    $scope.$apply(function () {
                        $scope.catagory = [];
                        $scope.catagory = response;
                        console.log("$scope.catagory : " + JSON.stringify($scope.catagory));
                    });
                    break;
                }
            }
        }
    }
    function getCountryList(callback) {
        dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_COUNTRY_STATE_REGION_CITY, function (result) {
            if (result.length) {
                var data1 = JSON.parse(result[0].json_data);
                callback(data1.country);
            }
        });
    }
    $scope.removeProfileImage = function () {
        var profileImage = document.getElementById("staffProfileImage");
        profileImage.src = '';
        $scope.isCameraOption = false;
    };
    $scope.uploadImage = function () {
        $scope.extraImages = false;
        $scope.isCameraOption = true;
        isProfileImage = true;
    };
    $scope.uploadExtraImages = function () {
        $scope.extraImages = true;
        $scope.isCameraOption = true;
        isProfileImage = false;
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
        $scope.isImageAdd = true;
        if (isProfileImage) {
            $scope.$apply(function () {
                $scope.showProfileCancel = true;
                var profileImage = document.getElementById("staffProfileImage");
                profileImage.src = imageURI.src;
                $scope.profileImage = {name: imageURI.title, url: imageURI.src, id: imageURI.id, isProfileImage: isProfileImage};
            });
        } else {
            $scope.$apply(function () {
                $scope.images.push({name: imageURI.title, url: imageURI.src, id: imageURI.id, isProfileImage: isProfileImage});
            });
        }
    }
    $scope.deleteImage = function (image) {
        var index = $scope.images.indexOf(image);
        $scope.images.splice(index, 1);
    };
    $scope.catagoryChange = function (catagory) {
        $scope.formData.category_usr = [];
        catagory.forEach(function (obj) {
            $scope.formData.category_usr.push(obj.id_uct);
        });
    };
    $scope.titleChange = function (title) {
        $scope.formData.title_usr = title.keys;
    };
    $scope.genderChange = function (gend) {
        $scope.formData.sex_usr = gend.keys;
    };
    $scope.countryChange = function (country) {

        $scope.formData.country_usr = country.id_cnt;
    };
    $scope.stateChange = function (state) {

        $scope.formData.county_usr = state.id_sta;
    };
    $scope.cityChange = function (city) {
        //console.log("result:::::" + JSON.stringify(city));
        $scope.formData.town_usr = city.id_cit;
    };
    $scope.textFocus = function () {
        $rootScope.show = false;
        $("#lastnamerequires").hide();
    };
    $scope.go_back = function (callback) {
        $scope.show = false;
        $rootScope.menuTitle = "Employment";
        $rootScope.subMenuTitle = "Staff Directory";
        $rootScope.subMenuTitle1 = "";
        $rootScope.staffDirectorytemplate = true;
        $rootScope.isStaffDirectoryAdd = false;
        $rootScope.staffDetailtemplate = false;
//        if ($rootScope.isVictimWitnessAdd) {
//            $rootScope.show = false;
//            $("#lastnamerequires").hide();
//            setFirstTab();
//            $scope.modelData = {};
//            $scope.formData = {};
//            $scope.images = [];
//            $scope.catagory = null;
//            if ($rootScope.backStatus == "main") {
//                window.history.back();
//            } else {
//
//                if ($scope.witnessVictim_id) {
//                    $scope.modelData = {};
//                    $scope.formData = {};
//                    $scope.witnessVictim_id = null;
//                    $rootScope.isVictimWitnessDetail = true;
//                    $rootScope.isVictimWitnessAdd = false;
//                } else {
//                    $rootScope.isVictimWitnessList = true;
//                    $rootScope.isVictimWitnessAdd = false;
//                }
//            }
//            if (!checkInternetConnectionService.checkNetworkConnection()) {
//                return callback(true, 1);
//            } else {
//                //  return callback(false, 0);
//            }
//
//        }
    };
    $scope.getStaffProfile = function (staffId) {
        webRequestObject.postRequest(this, "GET", constanObject.GET_STAFF_PROFILE + staffId, null, constanObject.employmentWebRequestType.STAFF_DETAIL, true);
    };
    $scope.saveButtonAction = function () {
        if ($scope.staffForm.$valid) {
            console.log("Save Staff Details : " + JSON.stringify($scope.formData));
            if ($rootScope.isEditProfile) {

                webRequestObject.postRequest(this, "POST", constanObject.UPDATE_STAFF + $scope.profile[0].id_usr, $scope.formData, constanObject.employmentWebRequestType.UPDATE_STAFF, true);
            }
            else {
                webRequestObject.postRequest(this, "POST", constanObject.ADD_STAFF, $scope.formData, constanObject.employmentWebRequestType.ADD_STAFF, true);
            }
        }
        else {
            $("#lastnamerequires").show();
            $scope.show = true;
            window.scrollTo(0, 0);
            $scope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";

        }


    };
    var staffId = 0;
    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            showErrorAlert(requestType, responseData);
            return;
        }
        switch (requestType) {
            case constanObject.employmentWebRequestType.ADD_STAFF:
                console.log("ADD STAFF SUCCESS : " + JSON.stringify(responseData));
                staffId = responseData;
                if (staffId) {
                    if ($scope.images.length > 0) {
                        if ($scope.profileImage)
                            $scope.images.unshift($scope.profileImage);
                        for (var i = 0; i < $scope.images.length; i++) {
                            webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.UPLOAD_STAFF_IMAGE + staffId, "image_users", constanObject.FileUploadModuleId.STAFF, true);
                        }
                        imageflag = false;
                    }
                    else {
                        $rootScope.isEditProfile = false;
                        var staffDetailDirectory = angular.element('#staffDetail').scope();
                        staffDetailDirectory.getStaffDetails(staffId);
                    }
                }


                break;
            case constanObject.employmentWebRequestType.UPDATE_STAFF:

                console.log("UPDATE STAFF : " + JSON.stringify(responseData));
                var staffDetailDirectory = angular.element('#staffDetail').scope();
                staffDetailDirectory.init();
                staffDetailDirectory.getStaffDetails($scope.staff_id);
                // console.log("STAFF_DETAIL : " + JSON.stringify(responseData));
                break;
            case constanObject.FileUploadModuleId.STAFF:
                //console.log("ADD/UPDATE RESPONSE: " + JSON.stringify(responseData));
                $rootScope.isEditProfile = false;
                var staffDetailDirectory = angular.element('#staffDetail').scope();
                staffDetailDirectory.getStaffDetails(staffId);
                break;
        }
    };
    $scope.textFocus = function () {
        $scope.errorshow = false;
    };
//    closeMsg








});






function setFirstTab() {
    $("#Add_VictimWitness").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
    $("#Add_VictimWitness").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
    $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container h2:first-child").addClass("resp-tab-active");
    $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container h2:first-child").siblings().removeClass("resp-tab-active");
    $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container div.tab_content").first().addClass("resp-tab-content-active");
    $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container div.tab_content").first().css("display", "block");
    $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().css("display", "none");
    $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().removeClass("resp-tab-content-active");
    if ($(window).width() < 768) {
        $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
    } else {
        $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
    }
    $(window).resize(function () {
        if ($(window).width() < 768) {
            $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
        } else {
            $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
        }
    });
}

BandQModule.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});


