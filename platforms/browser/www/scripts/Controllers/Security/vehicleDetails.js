var vehicle_id = 0;
var isSelection = false;
BandQModule.controller("ViewVechileSecurityById", ['$scope', '$rootScope', 'checkInternetConnectionService', 'imageService', 'TaskAndCheckList', '$timeout', function ($scope, $rootScope, checkInternetConnectionService, imageService, TaskAndCheckList, $timeout) {
//        var parent = $("#208").parents(".incident_report_wrapper");
//        parent.removeClass("incident_report_wrapper");

        $scope.vechileData = [];
        $scope.backPage = null;
        $scope.imageIndex = 0;
        $scope.images = [];
        $scope.isLargeImageView = false;
        $scope.edit = false;
        $scope.add = false;
        $scope.vehicle_id = null;
        $scope.data = {};
        $scope.taskAndCheckList = [];
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
        var vehicle_id = 0;
        var moduleId = 265;
        $scope.commsNote = [];
        $scope.staffImage = "";
        $scope.obj = {};

        $scope.isCommAllowed = false;
        $scope.isUploadSuccess = false;
        $scope.incidents = [];
        $scope.images = [
            {"id": 1, "src": "images/car_slider.jpg"}

        ];
        $scope.largeImage = {};
        $scope.isNoInterStrip = false;
        $scope.staffImage = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";
        $scope.isNextRecord = false;
        $scope.isBackRecord = false;
        $scope.link = {};
        $scope.locations = [];
        $scope.imageIndex = 0;
        $scope.closeNoInternetStrip = function () {
            $scope.isNoInterStrip = false;
        };
        $scope.init = function () {
            // $rootScope.index = 2;

            $scope.successShow = false;
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.isNoInterStrip = true;
                return;
            }
            $scope.isNoInterStrip = false;
            $scope.vechileDetail($scope.vehicle_id);

            window.plugins.spinnerDialog.hide();
            $scope.successShow = false;

            if ($rootScope.isVehicleDetails) {
                if ($scope.edit) {
                    $scope.successShow = true;
                    $scope.successMessage = "Vehicle details updated successfully.";
                }
                if ($scope.add) {
                    $scope.successShow = true;
                    $scope.successMessage = "Vehicle added successfully.";
                }
            }

//            webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails+moduleId+"/"+ vechileId,
//                    null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);

            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Vehicles";
            $rootScope.subMenuTitle1 = "Vehicle Details";

        };

        var getCommsDetails = function (vechileId) {

            webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + vechileId,
                    null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
        };
        $scope.addnote = {};
        $scope.showAddNotePopup = function () {
            //getCommsDetails(vehicle_id);
            $scope.ListStaff = new Array();
            $scope.addnote.selectedMethod = new Array();
            $scope.addnote.selectedStaff = new Array();
            $scope.notes.note_type_jnt = 0;
            //console.log("showAddNotePopup");
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
            $scope.notes = {};
            $scope.isNoteDesc = method.detail == 1 ? true : false;
            $scope.isDeadLine = method.deadline == 1 ? true : false;
            $scope.isRemind = method.remind_me == 1 ? true : false;
            $scope.isWith = method.opt_with == 1 ? true : false;
            $scope.isPhotoLibrary = method.attachments == 1 ? true : false;
            $scope.isDuration = method.duration == 1 ? true : false;
            $scope.notes.note_type_jnt = method.id_comms;


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

        $scope.vechileDetail = function (vechileId) {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.isNoInterStrip = true;
                return;
            }
            setFirstTab();
            $scope.imageIndex = 0;
            $scope.successShow = false;
            $scope.isNoInterStrip = false;
            vehicle_id = vechileId;
            $rootScope.isNewVehicle = false;
            $rootScope.isVehicleList = false;
            $rootScope.isVehicleDetails = true;
            TaskAndCheckList.getTaskList("Vehicle", vehicle_id, function (status, data) {
                $scope.taskAndCheckList = data;
                //console.log("$scope.taskAndCheckList : " + $scope.taskAndCheckList);
            });
            webRequestObject.postRequest($scope, "GET", constanObject.GetVehicleDetailsById + vechileId,
                    $scope.VechileDetails, constanObject.WebRequestType.VechileDetailsById, true);
        };

        $scope.imageLargeView = function (image) {
            var index = $scope.largeImage.indexOf(image);
            //console.log("Image Index : " + index);
            $scope.imageIndex = index;
            // $timeout(function () {
            $scope.isLargeImageView = true;
        };


        $scope.closeLargeImageView = function () {
            $scope.isLargeImageView = false;
        };

        $scope.slectedImage = function (image) {
            // if(image!=undefined){
            return image;//[$scope.imageIndex];  
            // }

        };
        $scope.back = function () {
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Vehicles";
            if ($rootScope.backStatus == "vehicleDetailsFromList") {
                $rootScope.isNewVehicle = false;
                $rootScope.isVehicleList = true;
                $rootScope.isVehicleDetails = false;
                $rootScope.subMenuTitle1 = "";
            } else if ($rootScope.backStatus == "addVehicleFromList") {
                $rootScope.isNewVehicle = false;
                $rootScope.isVehicleList = true;
                $rootScope.isVehicleDetails = false;
                $rootScope.subMenuTitle1 = "";
            } else if ($rootScope.backStatus == "editVehicleFromDetails") {
                $rootScope.isNewVehicle = false;
                $rootScope.isVehicleList = true;
                $rootScope.isVehicleDetails = false;
                $rootScope.subMenuTitle1 = "";
            } else {
                $rootScope.isNewVehicle = true;
                $rootScope.isVehicleList = false;
                $rootScope.isVehicleDetails = false;

                var addEditVehicleScope = angular.element("#newVehicle").scope();
                addEditVehicleScope.init();
            }
        };
        $scope.successClose = function () {
            $scope.successShow = false;
        };

        $scope.getImageSrc = function (data) {
            var img = [];
            var imgCount = 0;
            try {
                imgCount = data.images;
            } catch (e) {
            }
            if (imgCount > 0) {
                for (var i = 0; i < imgCount; i++) {

                    img.push({src: constanObject.getVechileImages + data.id_vtk + "/" + (i + 1), id: (i + 1)});

                }
            } else {
                img.push({src: "images/car_img.jpg", id: 1});

            }
            return img;
        };

        $scope.editVechile = function (vechileId) {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.isNoInterStrip = true;
                return;
            }
            $scope.isNoInterStrip = false;
            $rootScope.isAddVechile = false;
            $rootScope.isEditVechile = true;
            $rootScope.backStatus = "editVehicleFromDetails";
            var addEditVehicleScope = angular.element("#newVehicle").scope();
            addEditVehicleScope.setDataForEditing($scope.vechileData, $scope.images);

        };

        $scope.nextPrevDetail = function (page) {
            $scope.largeImage = [];
            $scope.images = [];
            $scope.vechileDetail(page);
        };
        function handleNavigation(dlt, dln) {
            var mapOptions = {
                zoom: 10,
                center: new google.maps.LatLng(dlt, dln),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };

            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            myCenter = new google.maps.LatLng(dlt, dln);
            var marker = new google.maps.Marker({
                position: myCenter,
                map: map,
                title: 'My Location'
            });
            marker.setMap(map);


        }

        function setFirstTab() {
            console.log("setFirstTab function called");
            $("#vehicleDetails").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
            $("#vehicleDetails").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
            $("#vehicleDetails").find(".parentHorizontalTab div.tab_container h2:first-child").addClass("resp-tab-active");
            $("#vehicleDetails").find(".parentHorizontalTab div.tab_container h2:first-child").siblings().removeClass("resp-tab-active");
            $("#vehicleDetails").find(".parentHorizontalTab div.tab_container div.tab_content").first().addClass("resp-tab-content-active");
            $("#vehicleDetails").find(".parentHorizontalTab div.tab_container div.tab_content").first().css("display", "block");
            $("#vehicleDetails").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().css("display", "none");
            $("#vehicleDetails").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().removeClass("resp-tab-content-active");
            if ($(window).width() < 768) {
                $("#vehicleDetails").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
            }
            else {
                $("#vehicleDetails").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
            }
            $(window).resize(function () {
                if ($(window).width() < 768) {
                    $("#vehicleDetails").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
                }
                else {
                    $("#vehicleDetails").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
                }
            });
        }

        $scope.webRequestResponse = function (requestType, status, responseData) {

            if (status == constanObject.ERROR) {
                if (responseData.responseJSON.error != "Comms Config Not Generated") {
                    $rootScope.show = true;
                    $rootScope.alertMsg = responseData.responseJSON.error;
                    //$scope.isCommAllowed = false;

                } else {
                    $scope.commsNote = [];
                }
                return;
            }

            switch (requestType) {
                case constanObject.WebRequestType.VechileDetailsById:
                    var data = responseData.data;

                    data.linked_offender.forEach(function (obj) {
                        obj.image = constanObject.offenderImageBaseUrl + obj.id + "/" + 1;
                        var name = "";
                        if (obj.firstname_usr != null || obj.firstname_usr != "")
                            name = obj.firstname_usr;
                        if (obj.lastname_usr != null || obj.lastname_usr != "")
                            name = name + " " + obj.lastname_usr;
                        if (name.length <= 0)
                            name = "Unknown";
                        obj.fullName = name;
                    });
                    $scope.data = data;
                    $scope.locations = data.location;
                    // handleNavigation($scope.locations[0], $scope.locations[0])
                    $scope.$apply(function () {
                        $scope.link = data.link;

                        $scope.incidents = [];
                        $scope.vechileData = new vechileDetailData(responseData.data.vehicle_detail[0]);
                        $scope.largeImage = responseData.data.linked_images;
                        $scope.images = responseData.data.linked_images;//$scope.getImageSrc(responseData.data.vehicle_detail[0]);
                        //   vehicleListScope.selectItem(responseData.data[0]);
                        $scope.incidents = responseData.data.incident;
                        if (responseData.data.vehicle_detail[0].add_comm == 1) {
                            $scope.isCommAllowed = true;
                            getCommsDetails(vehicle_id);
                        } else {
                            $scope.isCommAllowed = false;
                        }


                        $scope.isBackRecord = $scope.link.previous > 0 ? true : false;
                        $scope.isNextRecord = $scope.link.next > 0 ? true : false;


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
                            getCommsDetails(vehicle_id);
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
                        getCommsDetails(vehicle_id);
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
    }]);


function vechileDetailData(data) {

    this.id_vtk = data.id_vtk;
    this.has_task = data.has_task;
    if (data.licence_plate_vtk == null || data.licence_plate_vtk == "") {
        this.licence_plate_vtk = "Unknown";
    } else {
        this.licence_plate_vtk = data.licence_plate_vtk;
    }
    this.licence_plate_type = data.licence_plate_type;

    this.possible_false_plate = data.possible_false_plate;
    this.link_to_existing_incident = data.link_to_existing_incident;
    this.site_no = data.site_no;
    this.location = data.location;
    this.location_sel = data.location_sel;
    this.longitude = data.longitude;
    this.latitude = data.latitude;
    this.site_code = data.site_code;

    if (data.make_vtk == null) {

        this.make_vtk = "<b>Not Entered</b>";
    } else {
        this.make_vtk = data.make_vtk;
    }
    if (data.model_vtk == null) {

        this.model_vtk = "<b>Not Entered</b>";
    } else {
        this.model_vtk = data.model_vtk;
    }
    if (data.taxed_vtk == 0) {

        this.taxed_vtk = "<b>Not Entered</b>";
    } else {
        this.taxed_vtk = data.taxed_vtk;
    }

    this.six_month_rate_vtk = data.six_month_rate_vtk;
    this.twelve_month_rate_vtk = data.twelve_month_rate_vtk;
    this.date_of_first_registration_vtk = data.date_of_first_registration_vtk;


    this.cylinder_capacity_vtk = data.cylinder_capacity_vtk;
    this.co2_emissions_vtk = data.co2_emissions_vtk;
    this.fuel_type_vtk = data.fuel_type_vtk;

    if (data.colour_vtk == null) {

        this.colour_vtk = "<b>Not Entered</b>";
    } else {
        this.colour_vtk = data.colour_vtk;
    }
    this.type_approval_vtk = data.type_approval_vtk;
    this.wheel_plan_vtk = data.wheel_plan_vtk;
    this.revenue_weight_vtk = data.revenue_weight_vtk;
    if (data.tax_details_vtk == 0) {

        this.tax_details_vtk = "<b>Not Entered</b>";
    } else {
        this.tax_details_vtk = data.tax_details_vtk;
    }
    if (data.mot_details_vtk == null) {

        this.mot_details_vtk = "<b>Not Entered</b>";
    } else {
        this.mot_details_vtk = data.mot_details_vtk;
    }

    if (data.description_vtk == null) {

        this.description_vtk = "<b>Not Entered</b>";
    } else {
        this.description_vtk = data.description_vtk;
    }
    //console.log("updated_time : " + data.updated_time);
    //this.updated_time = dateFormat(data.updated_time);
    this.updated_time = data.updated_time;
    this.images = data.images;


}

function vechileDetailData1(data) {

    this.id_vtk = data.id_vtk;
    this.has_task = data.has_task;
    this.licence_plate_type = data.licence_plate_type;
    this.licence_plate_vtk = data.licence_plate_vtk;
    this.possible_false_plate = data.possible_false_plate;
    this.link_to_existing_incident = data.link_to_existing_incident;
    this.site_no = data.site_no;
    this.location = data.location;
    this.location_sel = data.location_sel;
    this.longitude = data.longitude;
    this.latitude = data.latitude;
    this.site_code = data.site_code;

    this.make_vtk = data.make_vtk;
    this.model_vtk = data.model_vtk;
    this.taxed_vtk = data.taxed_vtk;

    this.year_of_manufacture_vtk = data.year_of_manufacture_vtk;
    this.colour_vtk = data.colour_vtk;
    this.tax_details_vtk = data.tax_details_vtk;
    this.mot_details_vtk = data.mot_details_vtk;
    this.mot_vtk = data.mot_vtk;
    this.description_vtk = data.description_vtk;

    this.six_month_rate_vtk = data.six_month_rate_vtk;
    this.twelve_month_rate_vtk = data.twelve_month_rate_vtk;
    this.date_of_first_registration_vtk = data.date_of_first_registration_vtk;


    this.cylinder_capacity_vtk = data.cylinder_capacity_vtk;
    this.co2_emissions_vtk = data.co2_emissions_vtk;
    this.fuel_type_vtk = data.fuel_type_vtk;
    this.tax_status_vtk = data.tax_status_vtk;

    this.type_approval_vtk = data.type_approval_vtk;
    this.wheel_plan_vtk = data.wheel_plan_vtk;
    this.revenue_weight_vtk = data.revenue_weight_vtk;

    //console.log("updated_time : " + data.updated_time);
    //this.updated_time = dateFormat(data.updated_time);
    this.updated_time = data.updated_time;
    this.images = data.images;


}

function dateFormat(date) {
    return moment(date).format('Do MMM YYYY');
}



