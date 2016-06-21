//var webRequestObject = new WebRequestApi();
BandQModule.controller("headerCntrl", function ($scope, $rootScope, $interval, checkInternetConnectionService, $timeout, appMenuConfig, moduleAccessPermission) {
    var isLoading = false;
    $scope.inComimgMsg = {};
    $scope.emails = [];
    $scope.tasks = [];
    $scope.alerts = [];
    $scope.profileImg = null;
    $scope.notificationOverlay = [];
    $scope.localNotification = [];
    $scope.alertsOverlay = [];
    $scope.localAlerts = [];
    $scope.isAlertPopUp = false;
    $scope.showProfileImage = false;

    var ALERT_NOTIFICATION = 35,
            STAFF_INMAIL = 203,
            TASK_CHECKLISTS = 204,
            COMMS = 249;






    $scope.init = function () {
        //console.log("Init Called");

        var module_menus = appMenuConfig.getModuleMenus();
        $scope.header = {};
        $scope.modulePermission = moduleAccessPermission.getModulePermission();
        angular.forEach(module_menus, function (value, key) {


            if (key == ALERT_NOTIFICATION) {
                $scope.header.alertNotification = value;
            } else if (key == STAFF_INMAIL) {
                $scope.header.inMail = value;
            } else if (key == TASK_CHECKLISTS) {
                $scope.header.taskCheckLists = value;
            } else if (key == COMMS) {
                $scope.header.comms = value;
            }

        });

       if(checkInternetConnectionService.checkNetworkConnection())
        $scope.profileImg = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";
        //if (showNotification) {

            if ($scope.modulePermission.alertNotification == "Full Access" || $scope.modulePermission.alertNotification == "Read Only") {
                $scope.getNotificationOverlay();
                $scope.getAppAlerts();
                $interval(function () {
                    $scope.getNotificationOverlay();
                }, 300000);
            }
            $scope.getNotificationCount();
            $interval(function () {
                $scope.getNotificationCount();
            }, 600000);


       // }
        //console.log("$scope.modulePermission : " + JSON.stringify($scope.modulePermission));
        // console.log("$scope.header : " + JSON.stringify($scope.header));
    };

    $scope.getNotificationCount = function () {
        webRequestObject.postRequest($scope, "GET", constanObject.getNotificationCount, null, constanObject.CommsAndTaskWebRequestType.NotificationCount, isLoading);
    };

    $scope.getNotificationTask = function () {
        webRequestObject.postRequest($scope, "GET", constanObject.getListNotificationTask, null, constanObject.CommsAndTaskWebRequestType.ListNotificationTask, isLoading);
    };
    $scope.getAppAlerts = function () {
        webRequestObject.postRequest($scope, "GET", constanObject.getListAppAlerts, null, constanObject.CommsAndTaskWebRequestType.ListAppAlerts, isLoading);
    };
    $scope.getNotificationOverlay = function () {
        webRequestObject.postRequest($scope, "GET", constanObject.getListNotificationOverlay, null, constanObject.CommsAndTaskWebRequestType.ListNotificationOverlay, isLoading);
    };
    $scope.getNotificationEmails = function () {
        webRequestObject.postRequest($scope, "GET", constanObject.getListNotificationEmails, null, constanObject.CommsAndTaskWebRequestType.ListNotificationEmails, isLoading);
    };
    $scope.getNotificationAlert = function () {
        webRequestObject.postRequest($scope, "GET", constanObject.getListNotificationAlerts, null, constanObject.CommsAndTaskWebRequestType.ListNotificationAlerts, isLoading);
    };
    $timeout(function () {
        $scope.init();
    }, 1000);


    function getTaskIcon(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].type == "overdue") {
                $scope.tasks[i].icon = "images/icons/top-bar-task-overdue.png";
            } else if (data[i].type == "pending") {
                $scope.tasks[i].icon = "images/icons/top-bar-task-pending.png";
            } else if (data[i].type == "confirmed") {
                $scope.tasks[i].icon = "images/icons/top-bar-task-completed.png";
            } else if (data[i].type == "In Progress") {
                $scope.tasks[i].icon = "images/icons/top-bar-task-complete.png";
            } else {
                $scope.tasks[i].icon = null;
            }
        }
    }
    function getAlertIcon(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].title == "Notification") {
                $scope.alerts[i].icon = "images/icons/top-bar-notififcation.png";
            } else if (data[i].title == "Alert") {
                $scope.alerts[i].icon = "images/icons/top-bar-alert.png";
            } else {
                $scope.alerts[i].icon = null;
            }
        }

    }
    function getUserIcon(data) {
        for (var i = 0; i < data.length; i++) {
            $scope.emails[i].icon = constanObject.GetStaffImage + data[i].user_id + "/1";
        }

    }
    function getnotificationIcon(data) {
        var notificationLenght = data.length;
        var incr = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].type == "error") {
                $scope.notificationOverlay[i].iconClass = "error-icon";
                $scope.notificationOverlay[i].class = "error";
            } else if (data[i].type == "success") {
                $scope.notificationOverlay[i].iconClass = "success-icon";
                $scope.notificationOverlay[i].class = "success";
            } else if (data[i].type == "information") {
                $scope.notificationOverlay[i].iconClass = "info-icon";
                $scope.notificationOverlay[i].class = "info";
            } else if (data[i].type == "warning") {
                $scope.notificationOverlay[i].iconClass = "warning-icon";
                $scope.notificationOverlay[i].class = "warning";
            } else if (data[i].type == "alert") {
                $scope.notificationOverlay[i].iconClass = "alert-icon";
                $scope.notificationOverlay[i].class = "alert";
            } else {
                $scope.notificationOverlay[i].iconClass = null;
                $scope.notificationOverlay[i].class = null;
            }


        }
        $scope.localNotification.push($scope.notificationOverlay[incr]);
        incr = incr + 1;
        notificationLenght = notificationLenght - 1;

        $interval(function () {
            if (notificationLenght > 0)
                $scope.localNotification.push($scope.notificationOverlay[incr]);
            incr = incr + 1;
            ////console.log("notificationLenght : " + notificationLenght);
            notificationLenght = notificationLenght - 1;
        }, 5000);

    }

    $scope.closeNotification = function (index) {
        $scope.localNotification.splice(index, 1);
    };

    function showAlertOverlays(data) {
        var alertsLength = data.length;
        var incr = 0;
        $interval(function () {
            if ($scope.isAlertPopUp) {
                $scope.isAlertPopUp = false;
                $scope.localAlerts.splice(0, 1);
            }

            if (alertsLength > 0) {
                $scope.localAlerts.push($scope.alertsOverlay[incr]);
                incr = incr + 1;
                ////console.log("alertsLength : " + alertsLength);

                $scope.isAlertPopUp = true;

                alertsLength = alertsLength - 1;
            }

        }, 30000);
    }

    $scope.alertPopUpClose = function (index) {
        $scope.localAlerts.splice(index, 1);
        $scope.isAlertPopUp = false;
    };

    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            //console.log("Vehicle Search : " + JSON.stringify(responseData));

            return;
        }
        switch (requestType) {
            case constanObject.CommsAndTaskWebRequestType.NotificationCount:
//                {"data":{"email_count":5,"alert_count":27,"task_count":0,"notification_count":0}}
                //console.log("Notification Count : " + JSON.stringify(responseData));
                $scope.$apply(function () {
                    $scope.inComimgMsg = responseData.data;
                });
                break;
            case constanObject.CommsAndTaskWebRequestType.ListNotificationTask:
                ////console.log("ListNotificationTask  : " + JSON.stringify(responseData))

                $scope.tasks = [];
                $scope.$apply(function () {
                    $scope.tasks = responseData.data;
                    getTaskIcon($scope.tasks);
                });
                break;
            case constanObject.CommsAndTaskWebRequestType.ListAppAlerts:
                // //console.log("ListNotificationTask  : "+JSON.stringify(responseData));
                $scope.alertsOverlay = [];
                $scope.localAlerts = [];
                $scope.$apply(function () {
                    $scope.alertsOverlay = responseData.data;
                    showAlertOverlays($scope.alertsOverlay);
                });

                break;
            case constanObject.CommsAndTaskWebRequestType.ListNotificationOverlay:
                //console.log("ListNotification Overlay  : " + JSON.stringify(responseData));
                $scope.notificationOverlay = [];
                $scope.localNotification = [];
                $scope.$apply(function () {
                    $scope.notificationOverlay = responseData.data;
                    getnotificationIcon($scope.notificationOverlay);
                });

                break;
            case constanObject.CommsAndTaskWebRequestType.ListNotificationEmails:
                //console.log("ListNotification Emails  : " + JSON.stringify(responseData));
                $scope.emails = [];
                $scope.$apply(function () {
                    $scope.emails = responseData.data;
                    getUserIcon($scope.emails);
                });
                break;
            case constanObject.CommsAndTaskWebRequestType.ListNotificationAlerts:
                //console.log("ListNotificationTask  : " + JSON.stringify(responseData));
                $scope.alerts = [];
                $scope.$apply(function () {
                    $scope.alerts = responseData.data;
                    getAlertIcon($scope.alerts);
                });
                break;

        }
    };

    $scope.messagingData = function (data) {
        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            localStorage.setItem("headerMessageType", "inbox");
            localStorage.setItem("headerMessageId", data.unique_id);
            window.location.href = "dashboard.html#/inboxView";
            $('.message-notification').hide();
            $rootScope.$broadcast('checkMessageCall', {headerMessageType: "inbox", headerMessageId: data.unique_id});
        }

    };
    $scope.alertData = function (data) {
        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            if (data.title == 'Notification') {
                localStorage.setItem("headerMessageType", "notification");
                localStorage.setItem("headerMessageId", data.unique_id);
                 $rootScope.$broadcast('checkMessageCall', {headerMessageType: "notification", headerMessageId: data.unique_id});
            } else {
                localStorage.setItem("headerMessageType", "alert");
                localStorage.setItem("headerMessageId", data.unique_id);
                 $rootScope.$broadcast('checkMessageCall', {headerMessageType: "alert", headerMessageId: data.unique_id});
            }
            window.location.href = "dashboard.html#/inboxView";
            $('.message-notification').hide();
        }
    };

    $scope.checkListData = function (data) {
        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            localStorage.setItem("headerMessageType", "tasks");
            localStorage.setItem("headerMessageId", data[0].unique_id);
            window.location.href = "dashboard.html#/taskAndCheckList";
            $rootScope.$broadcast('checkMessageCall', {headerMessageType: "tasks", headerMessageId: data[0].unique_id});
            $('.message-notification').hide();
        }

    };

    $scope.viewStaffProfile = function () {

        window.location.href = "dashboard.html#/employmentMain";
        localStorage.setItem("showProfileDetail", "1");

        if (angular.element($("#employmentMainScope")).scope())
            angular.element($("#employmentMainScope")).scope().init();


    }

    $scope.goBack = function () {
        window.history.back();
//        var data = {};
//        data.uid = "832";
//        data.message = "Message from Mobile";
//        data.title = "Title from Mobile";
//        webRequestObject.postRequestSync(this, "POST", constanObject.SendPushNotification, data, constanObject.WebRequestType.logOut, false);
//        this.webRequestResponse = function (requestType, status, responseData) {
//            if (status == constanObject.ERROR) {
//                // alert(JSON.stringify(responseData.responseText));
//                return;
//            }
//            switch (requestType) {
//
//                case constanObject.WebRequestType.logOut:
//                    // alert(responseData);
//                    break;
//            }
//        };
    }

    var checkNetAvailable = function () {

        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            var netWorkAvailbla_ = checkInternetConnectionService.checkNetworkConnection();
            $rootScope.$broadcast('checkInternetConnection', {network: netWorkAvailbla_});
        }

        setTimeout(function () {
            checkNetAvailable();
        }, 1000);

    }

    $scope.$on('checkInternetConnection', function (event, arg) {

        $scope.$apply(function () {

            if (!arg.network) {
                $scope.showProfileImage = false;
                
                //$scope.profileImg = null;
            } else {
                $scope.showProfileImage = true;
                $scope.profileImg = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";
            }

        });

    });


    checkNetAvailable();
    checkInternetConnectionService.setValueOfNetWorkConnection();


});

