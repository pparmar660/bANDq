
BandQModule.controller('inboxCtrl', ['$scope', '$rootScope', '$timeout', '$filter', 'messageFilter', 'MessageView', 'checkInternetConnectionService', 'moduleAccessPermission', 'appMenuConfig', 'getLinkedStaffList', 'imageService', 'compossMail', function ($scope, $rootScope, $timeout, $filter, messageFilter, MessageView, checkInternetConnectionService, moduleAccessPermission, appMenuConfig, getLinkedStaffList, imageService, compossMail) {
        $scope.prevShowStatus = null;
        $scope.nextShowStatus = null;
        $scope.sortingOrder = '';
        $scope.items = [];
        $scope.reverse = null;
        $rootScope.menuTitle = 'Comms & Tasks';
        $rootScope.subMenuTitle = 'In-Mail';
        $rootScope.subMenuTitle1 = '';
        $rootScope.dashboardLink = '#/dashboard';
        $scope.currentPage = 0;
        $scope.deletedMessageCount = 0;
        $scope.messageCount = 0;
        $rootScope.showMessageview = false;
        $scope.messageNotExist = false;
        $scope.noInternetAvailable = false;
        $scope.composeMail = {};
        $scope.composeMail.ToStaffIds = [];
        var imageNum = 0;
        $scope.attachments = [];


        /* inbox functions -------------------------------------- */
        $scope.custom = false;
        // get data and init the filtered items
        $scope.toggleCC = function () {
            $scope.custom = $scope.custom === false ? true : false;
        };
        $scope.showUloadPopUp = function () {
            $scope.showUploadAction = true;

        };
        $scope.menu = {};
        $scope.modulePermission = {};
        var NEWS_MANAGER = 5,
                FAQ_MANAGER = 8,
                LINKS_MANAGER = 10,
                DOCUMENTS_LIBRARY = 11,
                VIDEO_GALLERIES_MANAGER = 17,
                VENUES_MANAGER = 33,
                ALERT_NOTIFICATION = 35,
                VICTIM_WITNESS = 257,
                OFFENDER = 258,
                STAFF = 145,
                STAFF_INMAIL = 203,
                TASK_CHECKLISTS = 204,
                INCIDENT_REPORTS = 213,
                COMMS = 249,
                VEHICLE_TRACKING = 265,
                MY_PROFILE = 272;
        moduleAccessPermission.setModuleAccess();

        $timeout(function () {
            var module_menus = appMenuConfig.getModuleMenus();
            $scope.menu = {};
            angular.forEach(module_menus, function (value, key) {

                if (key == VICTIM_WITNESS) {
                    $scope.menu.victimWitness = value;
                } else if (key == OFFENDER) {
                    $scope.menu.offender = value;
                } else if (key == INCIDENT_REPORTS) {
                    $scope.menu.incidentReport = value;
                } else if (key == VEHICLE_TRACKING) {
                    $scope.menu.vehicle = value;
                } else if (key == NEWS_MANAGER) {
                    $scope.menu.newsManager = value;
                } else if (key == FAQ_MANAGER) {
                    $scope.menu.faqManager = value;
                } else if (key == LINKS_MANAGER) {
                    $scope.menu.linksManager = value;
                } else if (key == DOCUMENTS_LIBRARY) {
                    $scope.menu.documentsLibrary = value;
                } else if (key == VIDEO_GALLERIES_MANAGER) {
                    $scope.menu.videoGalleryManager = value;
                } else if (key == VENUES_MANAGER) {
                    $scope.menu.venuesManager = value;
                } else if (key == ALERT_NOTIFICATION) {
                    $scope.menu.alertNotification = value;
                } else if (key == STAFF) {
                    $scope.menu.staff = value;
                } else if (key == STAFF_INMAIL) {
                    $scope.menu.inMail = value;
                } else if (key == TASK_CHECKLISTS) {
                    $scope.menu.taskCheckLists = value;
                } else if (key == COMMS) {
                    $scope.menu.comms = value;
                } else if (key == MY_PROFILE) {
                    $scope.menu.profile = value;
                }
            });
            $scope.modulePermission = moduleAccessPermission.getModulePermission();
            console.log("$scope.menu : " + JSON.stringify($scope.menu));
        }, 1000);
        $scope.init = function () {

            if (localStorage.getItem("headerMessageId") || localStorage.getItem("moduleId")) {
                $rootScope.showMessageview = true;

                if (localStorage.getItem("headerMessageType") == 'inbox') {
                    //  $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.INMAIL_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("headerMessageId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';
                            }
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "active";
                            $rootScope.alertAndNotificationClass = "";
                            $rootScope.commsClass = "";
                            $rootScope.taskAndCheckListClass = "";
                            localStorage.setItem("headerMessageType", "");
                            localStorage.setItem("headerMessageId", "");

                        });
                    });
                } else if (localStorage.getItem("headerMessageType") == 'notification') {
                    // $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.NOTIFICATION_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("headerMessageId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';

                            }
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "";
                            $rootScope.alertAndNotificationClass = "active";
                            $rootScope.commsClass = "";
                            $rootScope.taskAndCheckListClass = "";
                            localStorage.setItem("headerMessageType", "");
                            localStorage.setItem("headerMessageId", "");

                        });
                    });
                } else if (localStorage.getItem("headerMessageType") == 'alert') {
                    //  $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.ALERT_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("headerMessageId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';

                            }
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "";
                            $rootScope.alertAndNotificationClass = "active";
                            $rootScope.commsClass = "";
                            localStorage.setItem("headerMessageType", "");
                            localStorage.setItem("headerMessageId", "");

                        });
                    });
                } else if (localStorage.getItem("moduleId") == 203) {
                    //  $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.INMAIL_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("pushItemId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';
                            }
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "active";
                            $rootScope.alertAndNotificationClass = "";
                            $rootScope.commsClass = "";
                            $rootScope.taskAndCheckListClass = "";
                            localStorage.setItem("moduleId", "");
                            localStorage.setItem("pushItemId", "");

                        });
                    });
                } else if (localStorage.getItem("moduleId") == 35) {
                    // $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.ALERT_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("pushItemId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';

                            }
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "";
                            $rootScope.alertAndNotificationClass = "active";
                            $rootScope.commsClass = "";
                            localStorage.setItem("moduleId", "");
                            localStorage.setItem("pushItemId", "");
                        });
                    });
                } else if (localStorage.getItem("moduleId") == 36) {
                    //    $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.NOTIFICATION_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("pushItemId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';

                            }
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "";
                            $rootScope.alertAndNotificationClass = "active";
                            $rootScope.commsClass = "";
                            $rootScope.taskAndCheckListClass = "";
                            localStorage.setItem("moduleId", "");
                            localStorage.setItem("pushItemId", "");
                        });
                    });
                } else if (localStorage.getItem("moduleId") == 249) {
                    //   $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.COMMS_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("pushItemId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';

                            }
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "";
                            $rootScope.alertAndNotificationClass = "";
                            $rootScope.commsClass = "active";
                            $rootScope.taskAndCheckListClass = "";
                            localStorage.setItem("moduleId", "");
                            localStorage.setItem("pushItemId", "");
                        });
                    });
                }

            } else {

                // $scope.showMessageview = false;
                $scope.reverse = null;
                messageFilter.getUnreadMessageCount(constanObject.MESSAGE_UNREAD_COUNT, function (status, responseData) {
                    $scope.$apply(function () {
                        if (status == true) {
                            $scope.messageCount = responseData;
                            $scope.unreadMessageCount = $scope.messageCount.data.unread_inmail_count + $scope.messageCount.data.unread_notification_count + $scope.messageCount.data.unread_alert_count;

//                        switch ($rootScope.viewCommsAndTask)
//                        {
//                            case 'all':
//                                $scope.unreadMessageCount = $scope.messageCount.data.unread_inmail_count + $scope.messageCount.data.unread_notification_count + $scope.messageCount.data.unread_alert_count;
//                                break;
//                            case 'alert':
//                                $scope.unreadMessageCount = $scope.messageCount.data.unread_alert_count;
//                                break;
//                            case 'notification':
//                                $scope.unreadMessageCount = $scope.messageCount.data.unread_notification_count;
//                                break;
//                            case 'comms' :
//                                $scope.unreadMessageCount = '';
//                                break;
//                            default :
//                                $scope.unreadMessageCount = $scope.messageCount.data.unread_inmail_count + $scope.messageCount.data.unread_notification_count + $scope.messageCount.data.unread_alert_count;
//                                break;
//                        }
                        }

                    });
                });
                switch ($rootScope.viewCommsAndTask) {

                    case 'inbox':
                        //console.log(JSON.stringify($scope.messageCount));
                        $scope.btnFilter = 'inbox';
                        $scope.showCheckbox = true;
                        $scope.messageTitle = 'In-Mail';
                        $scope.messageTitleClass = 'd-icon5';
                        $rootScope.subMenuTitle = 'In-Mail';
                        $rootScope.homeClass = "";
                        $rootScope.inboxClass = "active";
                        $rootScope.alertAndNotificationClass = "";
                        $rootScope.commsClass = "";
                        $rootScope.taskAndCheckListClass = "";
                        $scope.btnAllFilter = 'inbox';
                        //  $rootScope.showCompose = false;
                        $scope.url = constanObject.COMMS_AND_TASK_INBOX;
                        break;
                    case 'alert':
                        $scope.messageTitle = 'Alerts';
                        $scope.showCheckbox = false;
                        $scope.btnFilter = 'alert';
                        $rootScope.subMenuTitle = 'Alerts & Notifications';
                        $scope.btnAllFilter = 'alert';
                        $scope.messageTitleClass = 'alert-on ';
                        $rootScope.homeClass = "";
                        $rootScope.inboxClass = "";
                        $rootScope.alertAndNotificationClass = "active";
                        $rootScope.commsClass = "";
                        $rootScope.taskAndCheckListClass = "";
                        $scope.url = constanObject.COMMS_AND_TASK_ALERT;
                        //   $rootScope.showCompose = false;
                        break;
                    case 'notification':
                        $scope.messageTitle = 'Notifications';
                        $scope.btnFilter = 'notification';
                        $scope.showCheckbox = false;
                        $rootScope.subMenuTitle = 'Alerts & Notifications';
                        $scope.btnAllFilter = 'notification';
                        $scope.messageTitleClass = 'notification-on ';
                        $rootScope.homeClass = "";
                        $rootScope.inboxClass = "";
                        $rootScope.alertAndNotificationClass = "active";
                        $rootScope.commsClass = "";
                        $rootScope.taskAndCheckListClass = "";
                        $scope.url = constanObject.COMMS_AND_TASK_NOTIFICATION;
                        //  $rootScope.showCompose = false;
                        break;
                    case 'comms':
                        $scope.messageTitle = 'Comms';
                        $scope.showCheckbox = false;
                        $scope.btnFilter = 'comms';
                        $scope.btnAllFilter = 'comms';
                        $rootScope.subMenuTitle = 'Comms';
                        $scope.messageTitleClass = 'comms-on';
                        $rootScope.homeClass = "";
                        $rootScope.inboxClass = "";
                        $rootScope.alertAndNotificationClass = "";
                        $rootScope.commsClass = "active";
                        $rootScope.taskAndCheckListClass = "";
                        $scope.url = constanObject.COMMS_AND_TASK_COMMS;
                        //   $rootScope.showCompose = false;
                        break;
                    default:
                        $scope.btnAllFilter = 'In-Mail';
                        $scope.showCheckbox = true;
                        $scope.btnFilter = 'inbox';
                        $scope.messageTitle = 'In-Mail';
                        $rootScope.subMenuTitle = 'In-Mail';
                        $scope.messageTitleClass = 'd-icon5';
                        $rootScope.homeClass = "";
                        $rootScope.inboxClass = "active";
                        $rootScope.alermessageCounttAndNotificationClass = "";
                        $rootScope.commsClass = "";
                        $rootScope.taskAndCheckListClass = "";
                        $scope.url = constanObject.COMMS_AND_TASK_INBOX;
                        //$rootScope.showCompose = false;
                        break;
                }
                $scope.page = 1;
                $scope.deletedMessageCount = 0;
                var searchData = null;
                messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                    //console.log("messaging" + JSON.stringify(responseData));
                    $scope.$apply(function () {
                        if (status == true) {
                            if (responseData.next_page_url != null) {
                                $scope.nextShowStatus = true;
                            } else {
                                $scope.nextShowStatus = false;
                            }
                            $scope.prevShowStatus = false;
                            $scope.filteredItems = responseData;
                            $scope.items = responseData.data;
                            $scope.messageNotExist = false;
                        } else {
                            $scope.items = [];
                            $scope.prevShowStatus = false;
                            $scope.nextShowStatus = false;
                            $scope.filteredItems = '';
                            $scope.messageNotExist = true;
                        }

                    });

                });
            }


        };


        /*--------------------Custom messageing filter---------------------*/

        //Apply selected class initially
        $scope.btnAllFilter = 'all';
        // Apply Filter on click
        $scope.myFilterFunc = function (event, type)
        {
            $scope.selectedAll = false;
            $rootScope.showMessageview = false;
            $scope.reverse = null;
            $rootScope.showCompose = false;
            switch (event.target.id) {
                case 'all':
                    $scope.msgType = '';
                    $scope.btnFilter = event.target.id;
                    $scope.showCheckbox = true;
                    $scope.deletedMessageCount = 0;
                    $scope.messageTitle = 'In-Mail';
                    $scope.messageTitleClass = 'd-icon5';
                    $rootScope.subMenuTitle = 'In-Mail';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "active";
                    $rootScope.alertAndNotificationClass = "";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.btnAllFilter = event.target.id;
                    $scope.url = constanObject.GET_ALL_MESSAGE;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });
                    break;
                case 'inbox':
                    //console.log(JSON.stringify($scope.messageCount));
                    $scope.btnAllFilter = 0;
                    $scope.showCheckbox = true;
                    $scope.deletedMessageCount = 0;
                    $scope.msgType = 'inbox';
                    $scope.messageTitle = 'In-Mail';
                    $rootScope.subMenuTitle = 'In-Mail';
                    $scope.messageTitleClass = 'd-icon5';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "active";
                    $rootScope.alertAndNotificationClass = "";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.btnFilter = event.target.id;
                    $scope.url = constanObject.COMMS_AND_TASK_INBOX;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                for (var i = 0; i < $scope.items.length; i++) {
                                    $scope.items[i].messageBox = 'inmail';
                                }
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }

                        });
                    });
                    break;
                case 'sent':
                    $scope.btnAllFilter = 0;
                    $scope.deletedMessageCount = 0;
                    $scope.showCheckbox = true;
                    $scope.msgType = 'sent';
                    $scope.messageTitle = 'Sent';
                    $rootScope.subMenuTitle = 'In-Mail';
                    $scope.messageTitleClass = 'd-icon5';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "active";
                    $rootScope.alertAndNotificationClass = "";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.items.messageBox = 'sent';
                    $scope.btnFilter = event.target.id;
                    $scope.url = constanObject.COMMS_AND_TASK_SENT;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                for (var i = 0; i < $scope.items.length; i++) {
                                    $scope.items[i].messageBox = 'sent';
                                }
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });


                    break;
                case 'drafts':
                    $scope.btnAllFilter = 0;
                    $scope.deletedMessageCount = 0;
                    $scope.showCheckbox = true;
                    $scope.msgType = 'drafts';
                    $scope.messageTitle = 'Drafts';
                    $rootScope.subMenuTitle = 'In-Mail';
                    $scope.messageTitleClass = 'd-icon5';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "active";
                    $rootScope.alertAndNotificationClass = "";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.items.messageBox = 'drafts';
                    $scope.btnFilter = event.target.id;
                    $scope.url = constanObject.COMMS_AND_TASK_DRAFT;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                for (var i = 0; i < $scope.items.length; i++) {
                                    $scope.items[i].messageBox = 'drafts';
                                }
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });


                    break;
                case 'trash':
                    $scope.btnAllFilter = 0;
                    $scope.deletedMessageCount = 0;
                    $scope.showCheckbox = true;
                    $scope.msgType = 'trash';
                    $scope.messageTitle = 'Trash';
                    $rootScope.subMenuTitle = 'In-Mail';
                    $scope.messageTitleClass = 'd-icon5';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "active";
                    $rootScope.alertAndNotificationClass = "";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.items.messageBox = 'trash';
                    $scope.btnFilter = event.target.id;
                    $scope.url = constanObject.COMMS_AND_TASK_TRASH;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                for (var i = 0; i < $scope.items.length; i++) {
                                    $scope.items[i].messageBox = 'trash';
                                }
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });


                    break;

                case 'alert':
                    $scope.btnAllFilter = 0;
                    $scope.deletedMessageCount = 0;
                    $scope.showCheckbox = false;
                    $scope.msgType = 'alert';
                    $scope.messageTitle = 'Alerts';
                    $rootScope.subMenuTitle = 'Alerts & Notifications';
                    $scope.messageTitleClass = 'alert-on';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "";
                    $rootScope.alertAndNotificationClass = "active";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.btnFilter = event.target.id;
                    $scope.url = constanObject.COMMS_AND_TASK_ALERT;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });
                    break;
                case 'notification':
                    $scope.btnAllFilter = 0;
                    $scope.deletedMessageCount = 0;
                    $scope.showCheckbox = false;
                    $scope.msgType = 'notification';
                    $scope.messageTitle = 'Notifications';
                    $rootScope.subMenuTitle = 'Alerts & Notifications';
                    $scope.messageTitleClass = 'notification-on';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "";
                    $rootScope.alertAndNotificationClass = "active";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.btnFilter = event.target.id;
                    $scope.url = constanObject.COMMS_AND_TASK_NOTIFICATION;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });
                    break;
                case 'comms':
                    $scope.btnAllFilter = 0;
                    $scope.deletedMessageCount = 0;
                    $scope.showCheckbox = false;
                    $scope.msgType = 'comms';
                    $scope.messageTitle = 'Comms';
                    $rootScope.subMenuTitle = 'Comms';
                    $scope.messageTitleClass = 'comms-on';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "";
                    $rootScope.alertAndNotificationClass = "";
                    $rootScope.commsClass = "active";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.btnFilter = event.target.id;
                    $scope.url = constanObject.COMMS_AND_TASK_COMMS;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });
                    break;
                default:
                    $scope.btnAllFilter = 'all';
                    break;

            }
        };
        /*--------------------End Custom messageing filter---------------------*/

        /*---------tab wise sorting ----------------*/

        $scope.sort = function (column) {
            if ($scope.sortingOrder === column) {
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.sortingOrder = column;
                $scope.reverse = true;
            }
        };


        /*--------------------------Pagination---------------------------*/

        $scope.nextPageRequest = function () {
            $scope.deletedMessageCount = 0;
            $scope.page++;
            var searchData = null;
            messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                $scope.$apply(function () {
                    if (status == true) {
                        $scope.prevShowStatus = true;
                        if (responseData.next_page_url != null) {
                            $scope.nextShowStatus = true;
                        } else {
                            $scope.nextShowStatus = false;
                        }
                        $scope.filteredItems = responseData;
                        $scope.items = responseData.data;
                        $scope.messageNotExist = false;
                    } else {
                        $scope.items = [];
                        $scope.filteredItems = '';
                        $scope.prevShowStatus = true;
                        $scope.nextShowStatus = false;
                        $scope.messageNotExist = true;
                    }

                });
            });

        }

        $scope.previousPageRequest = function () {
            $scope.deletedMessageCount = 0;
            if ($scope.page > 1) {
                $scope.prevShowStatus = true;
                $scope.nextShowStatus = true;
                var page = ($scope.page > 1 ? (--$scope.page) : 1);
                var searchData = null;
                messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                    $scope.$apply(function () {
                        $scope.filteredItems = responseData;
                        $scope.messageNotExist = false;
                        $scope.items = responseData.data;

                    });
                });
            } else {
                $scope.prevShowStatus = false;
                $scope.nextShowStatus = true;
            }
        };


        /*-----------Multiple checkbox-------------*/
        $scope.selectedAll = false;

        $scope.checkAll = function (value) {
            if (value) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }

            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].message_type == "inmail") {
                    $scope.items[i].Selected = $scope.selectedAll;
                }
            }

        };
        /*----------- delete message -------------*/

        $scope.deleteItem = function () {
            $scope.itemToDelete = [];
            $scope.messageId = [];
            $scope.deletedMessageCount = 0;
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].Selected) {
                    $scope.itemToDelete.push($scope.items[i]);
                    $scope.messageId.push($scope.items[i].message_id);
                }

            }
            var Id = {"id": $scope.messageId};
            webRequestObject.postRequest(this, "POST", constanObject.MESSAGES_DELETE, Id, constanObject.WebRequestType.DELETE_INMAIL_MESSAGE, true);

        };
        $scope.webRequestResponse = function (requestType, status, response) {
            if (status == "success") {
                for (var j = 0; j < $scope.itemToDelete.length; j++) {
                    if (j < $scope.itemToDelete.length) {
                        var removeToItem = $scope.itemToDelete[j];
                        var idxInItems = $scope.items.indexOf(removeToItem);
                        $scope.$apply(function () {
                            $scope.items.splice(idxInItems, 1);
                            $scope.deletedMessageCount++;
                        });

                    }
                }
            }
            ;
        };

        /*-------------------Search--------------------*/


        $scope.searchBtn = function () {
            $scope.page = 1;
            $scope.filterData = $scope.searchMailText;
            $scope.url = constanObject.GET_ALL_MESSAGE;
            $rootScope.showMessageview = false;
              $rootScope.showCompose = false;
            $scope.searchParameter = {search: $scope.filterData};
            var searchData = {search: $scope.filterData};
            messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                //console.log("messaging" + JSON.stringify(responseData));
                $scope.$apply(function () {
                    if (status == true) {
                        $scope.prevShowStatus = false;
                        if (responseData.next_page_url != null) {
                            $scope.nextShowStatus = true;
                        } else {
                            $scope.nextShowStatus = false;
                        }
                        $scope.filteredItems = responseData;
                        $scope.messageNotExist = false;
                        $scope.items = responseData.data;
                    } else {
                        $scope.items = [];
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = false;
                        $scope.filteredItems = '';
                        $scope.messageNotExist = true;
                    }

                });

            });
        };

        $scope.infoClose = function () {
            $scope.messageNotExist = false;
        }

        /*-------------------view message detail----------------*/
        $scope.viewMessageDetail = function (item) {
            //console.log("message_view" +JSON.stringify(item));

            switch (item.message_type) {
                case 'inmail':
                    if (item.messageBox == 'trash') {
                        $scope.messageUrl = constanObject.TRASH_VIEW;

                    } else if (item.messageBox == 'sent') {
                        $scope.messageUrl = constanObject.SENT_VIEW;

                    }
                    else if (item.messageBox == 'drafts') {
                        $scope.messageUrl = constanObject.DRAFTS_VIEW;
                    }
                    else {
                        $scope.messageUrl = constanObject.INMAIL_VIEW;
                    }
                    MessageView.getMessageDetail(item.message_id, $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $rootScope.showMessageview = true;
                                $scope.messageIconDisplay = 'inboxIco';
                            } else {
                                $rootScope.showMessageview = false;
                                $scope.messageData = '';
                            }
                        });
                    });
                    break;
                case 'alert':
                    $scope.messageUrl = constanObject.ALERT_VIEW;
                    MessageView.getMessageDetail(item.message_id, $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $rootScope.showMessageview = true;
                                $scope.messageIconDisplay = 'alertIco';

                            } else {
                                $rootScope.showMessageview = false;
                                $scope.messageData = '';
                            }
                        });
                    });
                    break;
                case 'notification':
                    $scope.messageUrl = constanObject.NOTIFICATION_VIEW;
                    MessageView.getMessageDetail(item.message_id, $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $rootScope.showMessageview = true;
                                $scope.messageIconDisplay = 'notifiIco';

                            } else {
                                $rootScope.showMessageview = false;
                                $scope.messageData = '';

                            }
                        });
                    });
                    break;
                case 'comms':
                    $scope.messageUrl = constanObject.COMMS_VIEW;
                    MessageView.getMessageDetail(item.message_id, $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $rootScope.showMessageview = true;
                                $scope.messageIconDisplay = 'commsIco';
                            } else {
                                $rootScope.showMessageview = false;
                                $scope.messageData = '';
                            }
                        });
                    });
                    break;
            }

        };

        $scope.backToMessageListingpage = function () {
            $rootScope.showMessageview = false;
              $rootScope.showCompose = false;
        };

        $scope.addNew = function ()
        {
            $rootScope.showCompose = true;
            $scope.mailTo = [];
            $scope.mailCc = [];
            $scope.mailBcc = [];
            $scope.composeMail = {};

        }
        $scope.cancelComposeMail = function () {

            $rootScope.showCompose = false;

        }

        $scope.emailContent = "Hi";
        $scope.sendMail = function () {
            if ($scope.composeMailForm.$valid) {
                $scope.mailTo = [];
                $scope.mailCc = [];
                $scope.mailBcc = [];

                $scope.composeMail.messageBody = angular.element($("#trixDemoId")).scope().trix;
                // console.log(JSON.stringify($scope.composeMail));
                for (var i = 0; i < $scope.composeMail.ToStaffIds.length; i++) {
                    $scope.mailTo.push($scope.composeMail.ToStaffIds[i].id_usr);
                }
                //console.log(JSON.stringify($scope.attachments));
                $scope.mailText = {type: 'new', id: 0, mail_to: $scope.mailTo, mail_cc: $scope.mailCc, mail_bcc: $scope.mailBcc, mail_subject: $scope.composeMail.emailSubject, mail_message: $scope.composeMail.messageBody, mail_id: 0, is_draft: 0};
                compossMail.compossMailData($scope.mailText, $scope.attachments, constanObject.WebRequestType.COMPOSS_MAIL, constanObject.COMPOSS_MAIL);
            }
        }
        $scope.submitForm = function (isValid)
        {

            if (isValid) {
                alert('valid');
            } else {
                alert('not valid')
            }


        };


        $scope.spliceItem = function (id, ev) {
            //        //console.log(ev.target.attributes);
            if (ev.target.attributes[0].nodeValue != "images/cross.png")
                return false;
            //        alert('in spliceItem and id is ' + id);
            for (var i = $scope.attachments.length - 1; i > -1; i--) {
                if ($scope.attachments[i].id == id) {
                    $scope.attachments.splice($scope.attachments.indexOf($scope.attachments[i]), 1);
                    db.transaction(function (ctx) {
                        var query = "DELETE FROM ";
                        query += TABLE_CREATE_INCIDENT_REPORT_FILE;
                        query += " WHERE ";
                        query += FIELD_JSON_DATA;
                        query += "=";
                        query += item.src;
                        ctx.executeSql(query);
                    }, function (dbError) {
                        //console.log(dbError);
                    });
                    //                    //                    dataBaseObj.insertQuery(TABLE_CREATE_INCIDENT_REPORT_FILE, FIELD_JSON_DATA, item.src);
                    imageNum--;
                }
            }
        }




        $scope.action = function (n) {

            switch (n) {
                case 1:
                    //gallary
                    showSpinner(true, true, SPINNER_MESSAGE);
                    imageNum++;

                    imageService.getMediaImage(function (item) {
                        $scope.$apply(function () {
                            $scope.showUploadAction = false;
                            item.id = imageNum;
                            $scope.attachments.push(item);

                        });
                        window.plugins.spinnerDialog.hide();
                    });
                    break;

                case 2:
                    // camera
                    showSpinner(true, true, SPINNER_MESSAGE);
                    imageNum++;
                    imageService.getCameraImage(function (item) {
                        $scope.$apply(function () {
                            $scope.showUploadAction = false;
                            //                        item.dSrc = item.dSrc.slice(6);
                            item.id = imageNum;
                            //                        //console.log(item);
                            $scope.attachments.push(item);
                        });
                        window.plugins.spinnerDialog.hide();
                    });

                    break;

                case 3:
                    // video
                    // start video capture
                    showSpinner(true, true, SPINNER_MESSAGE);
                    imageNum++;
                    $scope.showUploadAction = false;
                    imageService.getVideo(function (item) {
                        $timeout(function () {
                            imageService.createThumb(item, function (i2) {
                                $scope.$apply(function () {
                                    i2.id = imageNum;
                                    $scope.attachments.push(i2);

                                });
                                window.plugins.spinnerDialog.hide();
                            });
                            window.plugins.spinnerDialog.hide();
                        }, 3000);
                    });

                    break;

                case 4:
                    // close
                    $scope.showUploadAction = false;
                    window.plugins.spinnerDialog.hide();
                    break;

                default:
                    $scope.showUploadAction = false;
                    window.plugins.spinnerDialog.hide();
                    break;
            }
        }



        function loadStaffList() {

            var data = getLinkedStaffList.getData();
            if (!data) {
                setTimeout(function () {
                    loadStaffList();
                }, 50);
            } else {
                setTimeout(function () {

                    $scope.$apply(function () {
                        $scope.staffList = data;

                    })

                }, 10);
            }

        }
        loadStaffList();


        /*------------------------Add Mail----------------------*/


        $scope.$on('checkInternetConnection', function (event, arg) {
            $scope.$apply(function () {
                if (!arg.network)
                    $scope.noInternetAvailable = true;
                else {
                    $scope.noInternetAvailable = false;

                }
            });
        });

        $scope.$on('checkMessageCall', function (event, arg) {
            if (arg.headerMessageType && arg.headerMessageId)
                $scope.init();
        });

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



        loadData();
        checkInternetConnectionService.setValueOfNetWorkConnection();


    }]);
