BandQModule.controller('MultiOffendersCntrl', function ($scope, showHidePageService, $rootScope, $http, globalService, imageService, checkInternetConnectionService, getUniqueId) {
    $scope.selectedOff = [];
    $scope.canclebtntitle = "Yes";
    $scope.alertMessage = "";
    $scope.alertshowstatus = false;
    $scope.images = [];
    $scope.banList = [];
    $scope.selecte = [];
    $scope.selectedBan = {};
    $scope.offenderStatus = [];
    $scope.selectesta = [];
    $scope.isCameraOption = false;
    $scope.offender = null;

    var noOfPageMove;
    $scope.init = function (_noOfPageMove) {
        $rootScope.show = false;
        noOfPageMove = _noOfPageMove;
        $scope.isCameraOption = false;
        $scope.selectedOff.forEach(function (obj) {

            obj.date = moment(Date()).format('DD-MM-YYYY');
            obj.dateShowStatus = 0;
            if (obj.images > 0) {
                obj.image = constanObject.offenderImageBaseUrl + obj.id_usr + "/" + "1";
            } else {
                obj.image = "images/offenders-pic/pic08.jpg";
            }
        });

        $scope.status = {id_it: -1, name_it: "Status"};
        $scope.selectedBan = {id: -1, val: "Please Select"};
        $scope.setStatus();


    };
    $scope.setStatus = function () {
        dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_INCIDENT_CONFIG, function (result) {
                var data = JSON.parse(result[0].json_data);
                var banArray=[];
                var statusArray=[];
                for(var ban in data.offender_ban_list){
                    banArray.push({id:ban,val:data.offender_ban_list[ban]});
                }
                for(var sta in data.offender_status){
                    statusArray.push(data.offender_status[sta]);
                }
               $scope.$apply(function () {

                $scope.banList = banArray;
                $scope.offenderStatus = statusArray;
                $scope.offenderStatus.unshift({id_it: -1, name_it: "Status"});
                $scope.status = {id_it: -1, name_it: "Status"};
            });
        });
    };
    $scope.removeOffenders = function (index) {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            
             $scope.alertShow("Are you sure you want to remove this offender?", function (status) {
                if (status) {
                  $scope.selectedOff.splice(index, 1);
                }
            });
        } else {
            $scope.alertShow("Are you sure you want to remove this offender?", function (status) {
                if (status) {
                    var scope = angular.element('#202').scope();
                    scope.removeOffender($scope.selectedOff[index]);
                }
            });
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

    $scope.uploadImage = function (obj) {
        $scope.offender = obj;
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
    function uploadPhoto(item) {
        webRequestObject.fileUpload($scope, item.src, constanObject.UPLOAD_OFFENDER_FILE_URL + $scope.offender.id_usr, "image_users", 100);

    }
    ;

    $scope.statusChange = function (status, index) {
        if (status.id_it != -1) {
            $scope.selectedOff[index].civil_recovery_it = status.civil_recovery_it;
            $scope.selectedOff[index].offenderStatus= status.id_it;
            $rootScope.alertMsg = "";
        }
        else{
            $scope.selectedOff[index].civil_recovery_it = null;
            $scope.selectedOff[index].offenderStatus= null; 
        }

    };
    $scope.banChange = function (ban, index) {
       
        $scope.banSelected = ban.id;
        if (ban.id == -1 || ban.id == 0) {
            $scope.selectedOff[index].ban_for = "";
            $scope.selectedOff[index].dateShowStatus = 0;
         
        } else {
            $scope.selectedOff[index].dateShowStatus = 1;
            $scope.selectedOff[index].ban_for = ban.valueOf();
        }
    };
    $scope.banFrom = function(val, index){
        
        $scope.selectedOff[index].ban_form =val;
    };
    $scope.back = function (callback) {
        //console.log("BACK");
        if ($rootScope.isOffenderInvolved) {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                // $rootScope.offenserAddShowStatus = true;
                // $rootScope.offenderDetailShowStatus = false;
                // $rootScope.offenderListShowStatus = false;
                return callback(true, 2);
            } else {
                $rootScope.offenserAddShowStatus = false;
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = true;
                return callback(true, noOfPageMove);
            }
        }
        
}
    $scope.nextButtonClicked = function (callback) {
        //console.log("NEXT");
        var result = $scope.selectedOff.filter(
                function (obj) {
                    var civil = obj.civil_recovery_it;
                    if (civil != null)
                        return (obj);
                }
        );
        if (result.length != $scope.selectedOff.length) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "Please provide the status of offender.";
            return callback(false, 0);
        } else {
            $scope.selectedOff.forEach(function (obj) {
                for (var i in obj) {
                    (obj[i] == "<b>Not Entered</b>") ? obj[i] = "" : obj[i] = obj[i];
                }
            });
            globalService.setOffender({'whyNot': '', 'offenderDetails': $scope.selectedOff, 'isOffenderInvolved': 'yes'});
               console.log(JSON.stringify($scope.selectedOff));
            $rootScope.show = false;
            return callback(true, 1);
        }
    };
    $scope.saveButtonAction = function () {
        //console.log("SAVE");
    };
    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            $scope.loginError = true;
            $scope.LoginErrorMessage = responseData.responseJSON.error;
            return;
        }
        switch (requestType) {

            case 100:
                //console.log(JSON.stringify(responseData));
                break;
        }
    };
    function toDay() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        var today = dd + '/' + mm + '/' + yyyy;
        return today;
    }
});
