BandQModule.controller('offenderDetail', function ($scope, OffenderService, $rootScope, TaskAndCheckList) {
    $scope.offender = null;
    $scope.isLargImage = false;
    $scope.edit = null;
    $scope.images = [];
    $scope.data = {};
    $scope.offenderDetail = {};
    $scope.last_updated = null;
    $scope.offenderStatus = null;
    var noOfPageMove;
    var eyecolor = [{id: 0, val: "Please Select"}, {id: 1, val: "Blue"}, {id: 2, val: "Brown"}, {id: 3, val: "Green"}, {id: 4, val: "Hazel"}];
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
    var row_id = 0;
    var moduleId = 258;
    $scope.commsNote = [];
    $scope.staffImage = "";
    $scope.isCommAllowed = false;
    $scope.imageIndex = 0;
    $scope.isLargeImageView = false;
    $scope.init = function (_noOfPageMove) {
        noOfPageMove = _noOfPageMove;
       window.scrollTo(0, 0);
        $scope.staffImage = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1"; //http://api247.org/v1/getStaffImage/832/1
        setFirstTab();
    };
    $scope.getOffenderDetail = function (offender_id) {
        window.scrollTo(0, 0);
        row_id = offender_id;
        $scope.imageIndex = 0;
        getCommsDetails(row_id);
        setFirstTab();
        TaskAndCheckList.getTaskList("Offender", offender_id, function (status, data) {
            $scope.taskAndCheckList = data;
            //console.log("");
        });
        OffenderService.getOffenderDetail(offender_id, function (status, offenderData, data) {
            $scope.images = data.linked_images;
            data.linked_offender.forEach(function (obj) {
                obj.image = constanObject.offenderImageBaseUrl + obj.id + "/" + 1;
                var name = "";
                if (obj.firstname_usr != null || obj.firstname_usr != "")
                    name = obj.firstname_usr;
                if (obj.lastname_usr != null || obj.lastname_usr != "")
                    name = name + " " + obj.lastname_usr;
                if (name.length <= 0)
                    name = "";
                obj.fullName = name;
            });
            data.vehicle.forEach(function (obj) {
                obj.model_vtk == null ? obj.model_vtk = "" : obj.model_vtk = obj.model_vtk;
                obj.make_vtk == null ? obj.make_vtk = "" : obj.make_vtk = obj.make_vtk;
                var colorName = "";
                try {
                    colorName = obj.colour ? obj.colour : "";
                } catch (e) {
                    colorName = "";
                }
                if (obj.make_vtk.length > 0) {
                    if (colorName.length > 0)
                        colorName = colorName + ", " + obj.make_vtk;
                    else
                        colorName = obj.make_vtk;
                }
                if (obj.model_vtk.length > 0) {

                    if (colorName.length > 0)
                        colorName = colorName + ", " + obj.model_vtk;
                    else
                        colorName = obj.model_vtk;
                }
                if (colorName.length <= 0)
                    colorName = "";
                obj.name = colorName;
//                obj.model_vtk==null?obj.model_vtk="":obj.model_vtk=obj.model_vtk;
            });
            $scope.data = data;
            dataBaseObj.getDatafromDataBase("SELECT * FROM " + ADVANCE_FILTER_DATA, function (result) {
                if (result[0]) {
                    /*
                     * form_identity_other: ""
                     form_identity_refernce: "test123"
                     form_identity_usr: 1
                     * 
                     */

                    var Jsondata = JSON.parse(result[0].json_data);
                    Jsondata.form_identity_usr.forEach(function (obj) {
                        data.form_identity.forEach(function (formData) {
                            if (formData.form_identity_usr == obj.keys) {
                                formData.idDis = obj.val;
                            }
                        });
                    });

                    $scope.$apply(function () {
                        $scope.offenderDetail = data;
                        $scope.incidents = $scope.offenderDetail.incident;
                        //console.log("$scope.offenderDetail : " + JSON.stringify($scope.offenderDetail));
                        $scope.offenderLastUpdate = $scope.offender.last_updated;

                        if (moment($scope.offender.dob_usr, 'YYYY/MM/DD').format('DD/MM/YYYY') != "Invalid date") {
                            $scope.offender.dob_usr = moment($scope.offender.dob_usr, 'YYYY/MM/DD').format('DD/MM/YYYY');
                        } else {
                            $scope.offender.dob_usr = "<b>Not Entered</b>"
                        }



                        if ($scope.offender.eye_color_usr == "<b>Not Entered</b>" || $scope.offender.eye_color_usr == "0") {
                            $scope.offender.eye_color_title = "<b>Not Entered</b>";
                        } else {
                            eyecolor.forEach(function (obj) {
                                if (obj.id == $scope.offender.eye_color_usr)
                                    $scope.offender.eye_color_title = obj.val;

                            });
                        }
//                        if ($scope.offender.images > 0) {
//                            for (var i = 1; i <= $scope.offender.images; i++)
//                                $scope.images.push({id: i, img: constanObject.offenderImageBaseUrl + $scope.offender.id_usr + "/" + i});
//                        } else {
//                            $scope.images.push({id: 0, img: "images/offenders-pic/pic08.jpg"});
//                        }
                        if ($scope.offender.lastname_usr == "Unknown" && $scope.offender.firstname_usr == "Unknown") {
                            $scope.offender.lastname_usr = "";
                            $scope.offender.firstname_usr = "Unknown";
                        } else if ($scope.offender.lastname_usr == "" && $scope.offender.firstname_usr == "") {
                            $scope.offender.lastname_usr = "";
                            $scope.offender.firstname_usr = "Unknown";
                        }
                        if ($scope.offender.offender_category == null) {
                            $scope.offenderStatus = "(Unknown Offender)";
                        } else {
                            $scope.offenderStatus = "(" + $scope.offender.offender_category + ")";
                        }
                    });
                }
            });



            if ($scope.edit == true) {
                var scope = angular.element('#202').scope();
                scope.offendersVal.forEach(function (obj) {
                    if (obj.id_usr == offender_id) {
                        obj.email_usr = offenderData.email_usr;
                        obj.file_name = offenderData.file_name;
                        obj.firstname_usr = offenderData.firstname_usr == "Not Entered" ? "" : offenderData.firstname_usr;
                        obj.images = offenderData.images;
                        obj.lastname_usr = offenderData.lastname_usr;
                        obj.last_updated = offenderData.last_updated;
                    }
                });
            }


            if ($scope.edit == true) {
                $rootScope.successShow = true;
                $rootScope.successMessage = "Offender details updated successfully.";
            } else if ($scope.edit == false) {
                $rootScope.successShow = true;
                $rootScope.successMessage = "Offender added successfully.";
            }
            $scope.$apply(function () {
                $scope.offender = offenderData;
                if (offenderData.add_comm == 1) {
                    $scope.isCommAllowed = true;
                } else {
                    $scope.isCommAllowed = false;
                }

//                $scope.images = [];
//                if ($scope.offender.images > 0) {
//                    for (var i = 1; i <= $scope.offender.images; i++)
//                        $scope.images.push({id: i, img: constanObject.offenderImageBaseUrl + $scope.offender.id_usr + "/" + i});
//                } else {
//                    $scope.images.push({id: 0, img: "images/offenders-pic/pic08.jpg"});
//                }
                if ($scope.offender.lastname_usr == "Unknown" && $scope.offender.firstname_usr == "Unknown") {
                    $scope.offender.lastname_usr = "";
                } else if ($scope.offender.lastname_usr == "Unknown") {
                    $scope.offender.lastname_usr = "";
                } else if ($scope.offender.firstname_usr == "Unknown") {
                    $scope.offender.firstname_usr = "";
                }
            });

        });
    };
    $scope.imageLargeView = function (image) {
        var index = $scope.images.indexOf(image);
        //console.log("Image Index : " + index);
        $scope.imageIndex = index;
        // $timeout(function () {
        $scope.isLargeImageView = true;
    };


    $scope.closeLargeImageView = function () {
        $scope.isLargeImageView = false;
    };
    $scope.editOffender = function () {
        var scope = angular.element($('#204')).scope();
        scope.editOffender = true;
        $rootScope.offenserAddShowStatus = true;
        $rootScope.offenderDetailShowStatus = false;
        $rootScope.successShow = false;
        scope.updateOffender = $scope.offender;
        scope.refrenceIds = $scope.offenderDetail.form_identity;
        scope.offData = $scope.offenderDetail;
        scope.init();
        scope.getOffenderData($scope.offender.id_usr);

        if ($scope.offender.lastname_usr == "Unknown") {
            $scope.offender.lastname_usr = "";

        }
        if ($scope.offender.firstname_usr == "Unknown") {
            $scope.offender.firstname_usr = "";
        }


//        $scope.offender = {};
    };

    $scope.nextButtonClicked = function (callback) {
        if ($rootScope.offenderDetailShowStatus) {
            var scope1 = angular.element('#205').scope();
            $rootScope.offenderDetailShowStatus = false;
            $rootScope.successShow = false;
            $rootScope.offenserAddShowStatus = false;
            var scope = angular.element('#202').scope();
            setFirstTab();
            if ($scope.offender) {
                var result = scope.selectedOffenders.filter(
                        function (obj) {
                            return (obj.id_usr == $scope.offender.id_usr);
                        }
                );
                if (result.length <= 0)
                    scope.selectedOffenders.push($scope.offender);
                scope1.selectedOff = scope.selectedOffenders;
            }
            callback(true, 1);
        }

    };

    $scope.back = function (callback) {
        if ($rootScope.offenderDetailShowStatus) {
              window.scrollTo(0, 0);
            $rootScope.offenderDetailShowStatus = false;
            $rootScope.offenderListShowStatus = true;
            $rootScope.offenserAddShowStatus = false;
            $rootScope.successShow = false;
            setFirstTab();
            callback(false, 0);
        }
    };

    $scope.saveButtonAction = function () {
        //console.log("SAVE");
    };


    var getCommsDetails = function (rowId) {

        webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + rowId,
                null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
    };
    $scope.addnote = {};
    $scope.showAddNotePopup = function () {
        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.notes.note_type_jnt = 0;
        var url = constanObject.CommsConfig + moduleId + "/" + row_id;
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
        var arr = imageURI.src.split("/");
        var name = arr[arr.length - 1];
        $scope.$apply(function () {
            $scope.CommsImages.push({name: name, url: imageURI.src});
        });

    }

    $scope.AddNote = function () {
        $scope.notes.module_id = moduleId;
        $scope.notes.id_jno_jnt = row_id;
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

    function setFirstTab() {
        $("#203").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
        $("#203").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
        $("#203").find(".parentHorizontalTab div.tab_container h2:first-child").addClass("resp-tab-active");
        $("#203").find(".parentHorizontalTab div.tab_container h2:first-child").siblings().removeClass("resp-tab-active");
        $("#203").find(".parentHorizontalTab div.tab_container div.tab_content").first().addClass("resp-tab-content-active");
        $("#203").find(".parentHorizontalTab div.tab_container div.tab_content").first().css("display", "block");
        $("#203").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().css("display", "none");
        $("#203").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().removeClass("resp-tab-content-active");
        if ($(window).width() < 768) {
            $("#203").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
        } else {
            $("#203").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
        }
        $(window).resize(function () {
            if ($(window).width() < 768) {
                $("#203").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
            } else {
                $("#203").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
            }
        });
    }
    ;

    $scope.webRequestResponse = function (requestType, status, responseData) {

        if (status == constanObject.ERROR) {
            if (responseData.responseJSON.error != "Comms Config Not Generated") {
                $rootScope.show = true;
                $rootScope.alertMsg = responseData.responseJSON.error;
            }

            else {
                $scope.commsNote = [];
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
                        getCommsDetails(row_id);
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

                });
                //console.log("$scope.commsNote : " + JSON.stringify($scope.commsNote));
                break;
        }
    };
});

