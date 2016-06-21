BandQModule.controller('incidentDetailCnt', function ($scope, IncidentReport, $rootScope, TaskAndCheckList, checkInternetConnectionService) {
    var noOfPageMove;
    $scope.incident = null;
    $scope.addr = "";
    $scope.addr1add2add3 = "";
    $scope.countyPost = "";
    $scope.image = "images/offenders-pic/pic08.jpg";
    $scope.incident_details = {};
    $scope.incident_data = {};
    $scope.incidentImage = constanObject.INCIDENT_FILE_URL;
    $scope.offenderImage = constanObject.MainUrl + constanObject.VesionNo + 'getOffenderImage';
    $scope.victimImageUrl = constanObject.MainUrl + constanObject.VesionNo + 'getVictimsImage';
    $scope.witnessImageUrl = constanObject.MainUrl + constanObject.VesionNo + 'getWitnessImage';
    var map;
    var myCenter;


    $scope.linked_offenders = [];
    $scope.linked_vehicles = [];
    $scope.linked_witnesses = [];
    $scope.linked_victims = [];
    $scope.linked_incidents = [];
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
    var incident_id = 0;
    var moduleId = 213;
    $scope.commsNote = [];
    $scope.staffImage = "";

    $scope.isCommAllowed = false;
    $scope.isUploadSuccess = false;
    $scope.incidents = [];

    $scope.isNoInterStrip = false;
    $scope.staffImage = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";
    $scope.link = {};
    $scope.isNextRecord = false;
    $scope.isBackRecord = false;
    $scope.init = function () {

        if (localStorage.getItem("pushItemId")) {
            $scope.getIncidentDetail(localStorage.getItem("pushItemId"));
            localStorage.setItem("pushItemId", '');
            localStorage.setItem("moduleId", '')
        }
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
    // Breadcrum Page Redirection
    $scope.breadcrumbMenu = function (val) {
        if (val == "Security") {
            window.location.href = "dashboard.html#/security";
        } else if (val == "Incident Reports") {
            window.location.href = "dashboard.html#/incidentView";
        }
    };
    $scope.getIncidentDetail = function (incidentId) {
        console.log("incident : " + JSON.stringify(incidentId));
        window.scrollTo(0, 0);
//        $scope.$apply(function () {
//            $scope.incident = incident;
//        });
        $scope.incident_data = [];
        $rootScope.incidentDetail = true;
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = 'Incident Reports';
        $rootScope.subMenuTitle1 = 'Incident Details';
        var parent = $("#222").parents(".incident_report_wrapper");
        parent.removeClass("incident_report_wrapper");
        IncidentReport.getIncidentReportDetail(incidentId, function (status, data) {

            //incident_id = incident.inc_id;
            getCommsDetails(incidentId);
            TaskAndCheckList.getTaskList("Incident", incidentId, function (status, data) {
                $scope.taskAndCheckList = data;
                //console.log("$scope.taskAndCheckList : " + $scope.taskAndCheckList);
            });

            $scope.$apply(function () {
                $scope.link = data.link;
                $scope.isBackRecord = $scope.link.previous > 0 ? true : false;
                $scope.isNextRecord = $scope.link.next > 0 ? true : false;
                $scope.incident = data.incident_details;
                data.Civil_recovery_offenders.forEach(function (obj) {
                    var result = data.linked_offenders.filter(
                            function (obj1) {
                                return (obj1.ofndr_id == obj.ofndr_id);
                            }
                    );

                    // //console.log(JSON.stringify(result));

                    var offName = "";
                    if (result[0].firstname_usr.length > 0 && result[0].lastname_usr.length > 0) {
                        offName = result[0].firstname_usr + " " + result[0].lastname_usr;
                    } else if (result[0].firstname_usr.length > 0 && result[0].lastname_usr.length <= 0) {
                        offName = result[0].firstname_usr;
                    } else if (result[0].firstname_usr.length <= 0 && result[0].lastname_usr.length > 0) {
                        offName = result[0].lastname_usr;
                    }
                    obj.name = offName
                    obj.image = constanObject.offenderImageBaseUrl + obj.ofndr_id + "/1";
                });
                $scope.incident_data = data;

                // victim and witness

                for (var i = 0; i < $scope.incident_data.linked_witness.length; i++) {
                    $scope.incident_data.linked_witness[i].p_tel == "" ? "<b>Not Supplied</b>" : $scope.incident_data.linked_witness[i].p_tel;
                    $scope.incident_data.linked_witness[i].p_phone == "" ? "<b>Not Supplied</b>" : $scope.incident_data.linked_witness[i].p_phone;
                    $scope.incident_data.linked_witness[i].p_email == "" ? "<b>Not Supplied</b>" : $scope.incident_data.linked_witness[i].p_email;

                }

                for (var i = 0; i < $scope.incident_data.linked_victim.length; i++) {
                    $scope.incident_data.linked_victim[i].p_tel == "" ? "<b>Not Supplied</b>" : $scope.incident_data.linked_victim[i].p_tel;
                    $scope.incident_data.linked_victim[i].p_phone == "" ? "<b>Not Supplied</b>" : $scope.incident_data.linked_victim[i].p_phone;
                    $scope.incident_data.linked_victim[i].p_email == "" ? "<b>Not Supplied</b>" : $scope.incident_data.linked_victim[i].p_email;

                }

                for (var i = 0; i < $scope.incident_data.Civil_recovery_offenders.length; i++) {
                    $scope.incident_data.Civil_recovery_offenders[i].civil_recovery_number == "" ? "<b>Not Supplied</b>" : $scope.incident_data.Civil_recovery_offenders[i].civil_recovery_number;
                    $scope.incident_data.Civil_recovery_offenders[i].civil_recovery_note == "" ? "<b>Not Supplied</b>" : $scope.incident_data.Civil_recovery_offenders[i].civil_recovery_note;

                }

                //console.log($scope.incident_data);
                $scope.image = constanObject.INCIDENT_USER_IMAGE + $scope.incident_details.reporter + "/1";
                 $scope.incident_details = [];
                $scope.incident_details = data.incident_details;
                // //console.log("policeAuth" +JSON.stringify($scope.incident_details));
                var add1 = $scope.incident_details.venue == "<b>Not Supplied</b>" ? "" : $scope.incident_details.venue;
                var add2 = $scope.incident_details.address == "<b>Not Supplied</b>" ? "" : $scope.incident_details.address;
                var add3 = $scope.incident_details.address2 == "<b>Not Supplied</b>" ? "" : $scope.incident_details.address2;
                var add4 = $scope.incident_details.address3 == "<b>Not Supplied</b>" ? "" : $scope.incident_details.address3;
                var county = $scope.incident_details.county == "<b>Not Supplied</b>" ? "" : $scope.incident_details.county;
                var postCode = $scope.incident_details.postcode == "<b>Not Supplied</b>" ? "" : $scope.incident_details.postcode;
                var arr = [];
                if (add2 != "")
                    arr.push(add2);
                if (add3 != "")
                    arr.push(add3);
                if (add4 != "")
                    arr.push(add4);
                if (add1 != "")
                    $scope.addr = add1 + "";

                for (var i = 0; i < arr.length; i++) {
                    if (i == arr.length - 1)
                        $scope.addr1add2add3 = $scope.addr1add2add3 + arr[i];
                    else
                        $scope.addr1add2add3 = $scope.addr1add2add3 + arr[i] + ",";
                }
                $scope.countyPost = [];
                if (county != "" && postCode != "")
                    $scope.countyPost = $scope.countyPost + county + "," + postCode;
                else if (county == "" && postCode != "")
                    $scope.countyPost = $scope.countyPost + postCode;
                else if (county != "" && postCode == "")
                    $scope.countyPost = $scope.countyPost + county;
                else if (county == "" && postCode == "")
                    $scope.countyPost = "";

                // //console.log("Incident Data : "+JSON.stringify(data));

                $scope.linked_offenders = data.linked_offenders;
                $scope.linked_vehicles = data.linked_vehicles;
                $scope.linked_witnesses = data.linked_witness;
                $scope.linked_victims = data.linked_victim;
                $scope.linked_incidents = data.linked_incident;
//                for(var i=0; i<$scope.linked_offenders.length;i++){
//                    $scope.linked_offenders.push({image:constanObject.offenderImageBaseUrl + $scope.linked_offenders[i].ofndr_id}); 
//                }
                ////console.log("$scope.linked_offenders : "+JSON.stringify($scope.linked_offenders));
                handleNavigation($scope.incident_details.latitude, $scope.incident_details.longitude);

            });
            // //console.log(data);
        })
    };

    $scope.nextPrevDetail = function (id) {
        $scope.getIncidentDetail(id)
    };
    $scope.go_back = function () {
        $rootScope.incidentDetail = false;
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = 'Incident Reports';
        $rootScope.subMenuTitle1 = '';
    };

    var getCommsDetails = function (incident_id) {

        webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + incident_id,
                null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
    };
    $scope.addnote = {};
    $scope.showAddNotePopup = function () {
        //getCommsDetails(incident_id);
        //console.log("showAddNotePopup");
        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.notes.note_type_jnt = 0;
        var url = constanObject.CommsConfig + moduleId + "/" + incident_id;
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
        $scope.notes.id_jno_jnt = incident_id;
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
            if (responseData.responseJSON.error != "Comms Config Not Generated") {
                $rootScope.show = true;
                $rootScope.alertMsg = responseData.responseJSON.error;

            }
            else{
                $scope.$apply(function(){
                    $scope.commsNote = [];
                });
            }
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
                        getCommsDetails(incident_id);
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
                    getCommsDetails(incident_id);
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

    var loadData = function () {

        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            $scope.init();
        } else
            setTimeout(function () {
                $scope.$apply(function () {
                    loadData();
                })

            }, 150);
    }

    $scope.$on('checkInternetConnection', function (event, arg) {
        $scope.$apply(function () {
            if (!arg.network)
                $scope.networkNotAvailableIncidentList = true;
            else
                $scope.networkNotAvailableIncidentList = false;
        });
    });



    loadData();
    checkInternetConnectionService.setValueOfNetWorkConnection();
//    $scope.nextButtonClicked = function (callback) {
//        return callback(false, 0);
//    };
//
//    $scope.back = function (callback) {
//        if ($rootScope.incidentDetailStatus) {
//            $rootScope.incidentListShowStatus = true;
//            $rootScope.incidentDetailStatus = false;
//            return callback(false, 0);
//        }
//    };
//
//    $scope.saveButtonAction = function () {
//        //console.log("SAVE");
//    };
});
