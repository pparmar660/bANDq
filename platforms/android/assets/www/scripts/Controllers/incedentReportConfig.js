BandQModule.controller('IncidentReportContrl12', ["$scope", "$http", "$timeout", "showHidePageService", "$rootScope",
    "globalService", "imageService", "breadCrum", "createIncidentReport", "loadDynamicQuestionAndIncidentConfig", "checkInternetConnectionService","manageDropDownFieldSet", function ($scope, $http, $timeout, showHidePageService, $rootScope,
            globalService, imageService, breadCrum, createIncidentReport, loadDynamicQuestionAndIncidentConfig, checkInternetConnectionService,manageDropDownFieldSet) {
        $scope.Hello = "hi";

        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = 'Incident Reports';
        $rootScope.subMenuTitle1 = 'Add New';
        $rootScope.dashboardLink = '#/dashboard';
        $scope.pageArray = [];
        $scope.NextIndexArray = [];
        $scope.BackIndexArray = [];
        $scope.visiblePagePosition = 1;
        $scope.isBreadCrumIsActive = true;
        $scope.showBackbutton = false;

        //----------------------------offender------------------------
        $rootScope.offenserAddShowStatus = false;
        $rootScope.offenderDetailShowStatus = false;
        $rootScope.offenderListShowStatus = true;
        $rootScope.isOffenderInvolved = null;
        $rootScope.multiSelection = false;
        $rootScope.currentVisibleIndex = 0;

//----------------------------------------------- vehicle---------------------

        $rootScope.vehicleAddShowStatus = false;
        $rootScope.vehicleDetailShowStatus = false;
        $rootScope.vehicleListShowStatus = false;
        $rootScope.isAddVechile = false;
        $rootScope.isEditVechile = false;
        $rootScope.isvehicleInvolved = false;
        $rootScope.isNewVechile = false;
        $rootScope.index = 0;
        $rootScope.prevIndex = 0;
        //----------------------------------------------- victim---------------------
        $rootScope.victimListShowStatus = true;
        $rootScope.victimAddShowStatus = false;
        $rootScope.victimDetailShowStatus = false;
        $rootScope.isVictimInvolved = null;
        //----------------------------------------------- WITNESS---------------------
        $rootScope.witnessListShowStatus = true;
        $rootScope.witnessAddShowStatus = false;
        $rootScope.witnessDetailShowStatus = false;
        $rootScope.iswitnessInvolved = null;
        $rootScope.venueLocation = -1;

        //-----------------------securityIncident--------------
        $rootScope.hasInformedPolice = true;
        $rootScope.civilRecovery = true;
        $rootScope.hideFieldSetArray = [];

        $scope.currentVisibleIdex = 0;
        $scope.incidentSubmittedShowHide = false;
        $scope.breadCrumDropdownShowHide = true;

        //--------------hide/show button--------------------
        $rootScope.hideButton = false;
        $rootScope.showHomeButton = false;
        $scope.dataSaved = false;
        $scope.fieldData = {};
        var HideFiledSetId = [];
        $scope.networkNotAvailable = false;
        $scope.hideFieldSetForBreadCrum = [];



        $scope.nextPage = function (page) {

            // Vaildate current page's fiels  

            var index = $scope.pageArray.indexOf(page);


            ;//= ["dy1", "st7"];//showHidePageService.getHideFieldSetArray();
            HideFiledSetId = [];

            var currentPageid;
            var currentPageScope;

            var currentPage = $scope.pageArray[index];
            var canMoveToNext = true;
            var noOfPageMove = 1;
            var noOfFieldSetMove = 1;
            var pageFieldSetArray = showHidePageService.getPageFieldSetArray();
            var tabFieldIdArray = showHidePageService.getTabFieldIdArray();



            //  //console.log("page set : " + JSON.stringify(showHidePageService.getPageFieldSetArray()));
            // //console.log("field set : " + JSON.stringify(showHidePageService.getFieldSetArray()));

            for (var j = 0; j < currentPage.fields.length; j++) {

                currentPageid = currentPage.fields[j];
                currentPageScope = angular.element($('#' + currentPageid)).scope();

                if (currentPageScope) {
                    try
                    {
                        currentPageScope.nextButtonClicked(function callBack(_canMoveToNext, _noOfPageMove) {
                            if (canMoveToNext) {
                                canMoveToNext = _canMoveToNext;
                                noOfPageMove = _noOfPageMove;
                            }

                        });
                    } catch (e) {
                    }
                }

            }



            if (!canMoveToNext) {
//                $(".alertvalidate").animate({
//                    scrollTop: 0
//                }, 600);

                window.scrollTo(0, 0);

                return;
            }
            //------------------------------------------------
            var HideFiledSetIdTemp = [];
            HideFiledSetIdTemp.length = 0;
            HideFiledSetIdTemp = angular.copy($rootScope.hideFieldSetArray);


            $scope.hideFieldSetForBreadCrum = HideFiledSetId = $scope.hideShowCivilRecovery(HideFiledSetIdTemp);

            // Hide field set form array---------------START------------
             manageDropDownFieldSet.setDropDownFieldSet($scope.hideFieldSetForBreadCrum);
                   
            //-----------------------------------------END--------------------------------------



            if ($.inArray(pageFieldSetArray[index + noOfPageMove], HideFiledSetId) > -1) { // check the next field set is allowed or not on the base of outcome and type

                var fieldSetId = pageFieldSetArray[index + noOfPageMove];


                for (var j = index + noOfPageMove; j < pageFieldSetArray.length; j++) {

                    if (pageFieldSetArray[j] == fieldSetId)
                        noOfFieldSetMove++;
                    else {
                        if ($.inArray(pageFieldSetArray[index + noOfFieldSetMove], HideFiledSetId) > -1)

                        {
                            fieldSetId = pageFieldSetArray[index + noOfFieldSetMove];
                            noOfFieldSetMove++;
                            continue;
                        } else
                            break;

                    }
                    ;
                }
            }



            // on the bse of outcoem and type hide fiels set
            if (noOfFieldSetMove > 1)
                noOfPageMove = noOfFieldSetMove;



            $rootScope.show = false;
            breadCrum.setBreadCrumOnNextClick(tabFieldIdArray[index], tabFieldIdArray[index + noOfPageMove]);

            //alert();

            // Call Next page's  init-----------------

            var nextPageid;
            var nextPageScope;
            var nextPage = $scope.pageArray[index + noOfPageMove];
            for (var j = 0; j < nextPage.fields.length; j++) {

                nextPageid = nextPage.fields[j];
                nextPageScope = angular.element($('#' + nextPageid)).scope();

                if (nextPageScope) {

                    try {
                        nextPageScope.init(noOfPageMove);
                    } catch (e) {

                    }
                }

            }

            //------------------------
            $scope.showBackbutton = true;
            $scope.heidAndShowIndex(index + noOfPageMove);


        }


        $scope.hideShowCivilRecovery = function (HideFiledSetId_) {
            // if offender and product is selected then hide civil recovery

            // if offender or product not selected then hide 

            if (HideFiledSetId_.indexOf("st7") > -1)
                return HideFiledSetId_;

            var isProducContain = true, isOffenderContain = true;
            if (HideFiledSetId_.indexOf("st6") > -1)
                isProducContain = false;

            if (HideFiledSetId_.indexOf("st3") > -1)
                isOffenderContain = false;

            var offenderArray = globalService.getOffender();

            if (offenderArray)
                if (offenderArray.isOffenderInvolved)
                    if (offenderArray.isOffenderInvolved == "no")
                        isOffenderContain = false;


            if (isProducContain) {
                if (globalService.getProductDetail().recProdect == 0)
                    isProducContain = false;
            }


            if (!isProducContain || !isOffenderContain)
            {
                HideFiledSetId_.push("st7");

            }
            return HideFiledSetId_;
        };

        $scope.addIncident = function () {
            window.location.href = "dashboard.html#/createIncident";
        };
        $scope.backPage = function (page) {

            var index = $scope.pageArray.indexOf(page);
            if (index <= 1) {
                $scope.showBackbutton = false;
            }

            var currentPageid;
            var currentPageScope;
            var currentPage = $scope.pageArray[index];
            var canMoveToNext = true;
            var noOfPageMove = 1;
            for (var j = 0; j < currentPage.fields.length; j++) {

                currentPageid = currentPage.fields[j];
                currentPageScope = angular.element($('#' + currentPageid)).scope();

                if (currentPageScope) {
                    try
                    {
                        currentPageScope.back(function callBack(_canMoveToNext, _noOfPageMove) {
                            if (canMoveToNext) {
                                canMoveToNext = _canMoveToNext;
                                noOfPageMove = _noOfPageMove;
                            }
                        }

                        );
                    } catch (e) {
                    }
                }

            }


            if (!canMoveToNext) {

                return;
            }
            window.scrollTo(0, 0);
            $rootScope.show = false;

            if ($scope.pageArray[index].showStatus)
                $scope.pageArray[index].showStatus = false;
            if ($scope.pageArray[index - noOfPageMove])
                $scope.pageArray[index - noOfPageMove].showStatus = true;
        }


        $scope.saveBtn = function (page) {

            $rootScope.showSavePopup = false;
            showSpinner(true, true, SPINNER_MESSAGE);


            var incidentFinalData = globalService.getCompGlobalData();
            incidentFinalData.incidentTempId = constanObject.CREATE_INCIDEN_TEMP_ID;
            incidentFinalData.timeOfIncidentCreatae = moment().format('YYYY-MM-DD HH:mm:ss');
            incidentFinalData.insertType = "save";
            incidentFinalData.incidentId = constanObject.CREATE_INCIDENT_ID;


            // //console.log(JSON.stringify(incidentFinalData));

            var value = [JSON.stringify(incidentFinalData), constanObject.CREATE_INCIDEN_TEMP_ID.toString(), "save"];


            dataBaseObj.checkRecordIsExist("Select Count(*) AS c from " + TABLE_CREATE_INCIDENT_REPORT + "  where temp_id = '"

                    //  dataBaseObj.checkRecordIsExist("SELECT * FROM " + TABLE_CREATE_INCIDENT_REPORT + " WHERE incidentTempId = '"

                    + constanObject.CREATE_INCIDEN_TEMP_ID.toString() + "' ", function (noOfRecord) {

                if (noOfRecord > 0) {
                    // update 

                    var query = "UPDATE " + TABLE_CREATE_INCIDENT_REPORT + " SET " + FIELD_JSON_DATA + " = '" + JSON.stringify(incidentFinalData) +
                            "' WHERE temp_id ='" + constanObject.CREATE_INCIDEN_TEMP_ID.toString() + "' ";

                    dataBaseObj.update(query);

                } else {
                    dataBaseObj.insertData(TABLE_CREATE_INCIDENT_REPORT, CREATE_INCIDENT_REPORT_KEY, value);

                }


                if (checkNetworkConnection()) {
                    var getIncidentReport = "SELECT " + FIELD_JSON_DATA + " from " + TABLE_CREATE_INCIDENT_REPORT;
                    createIncidentReport.incidentReportData(getIncidentReport, constanObject.WebRequestType.INCIDENT_REPORT_SAVE, false, constanObject.CREATE_INCIDEN_TEMP_ID);
                } else {
                    window.plugins.spinnerDialog.hide();
                    window.location.href = "dashboard.html#/security";
                }

            });


        };



        $scope.submitBtn = function (page) {
            showSpinner(true, true, SPINNER_MESSAGE);
            var currentPageId;
            var currentScope;
            for (var j = 0; j < page.fields.length; j++) {

                currentPageId = page.fields[j];
                if (currentPageId == 20) {

                    currentScope = angular.element($('#' + currentPageId)).scope();
                    if (currentScope) {
                        try
                        {
                            currentScope.submitBtnAction(function callBack(status) {
                                if (status == true) {
                                    var incidentFinalData = (globalService.getCompGlobalData());
                                    incidentFinalData.incidentTempId = constanObject.CREATE_INCIDEN_TEMP_ID;
                                    incidentFinalData.timeOfIncidentCreatae = moment().format('YYYY-MM-DD HH:mm:ss');
                                    incidentFinalData.insertType = "submit";
                                    incidentFinalData.incidentId = constanObject.CREATE_INCIDENT_ID;
                                    console.log(JSON.stringify(incidentFinalData));
                                    var value = [JSON.stringify(incidentFinalData), constanObject.CREATE_INCIDEN_TEMP_ID.toString(), "submit"];
                                    dataBaseObj.insertData(TABLE_CREATE_INCIDENT_REPORT, CREATE_INCIDENT_REPORT_KEY, value);
                                    if (checkNetworkConnection()) {
                                        var getIncidentReport = "SELECT " + FIELD_JSON_DATA + " from " + TABLE_CREATE_INCIDENT_REPORT;
                                        createIncidentReport.incidentReportData(getIncidentReport, constanObject.WebRequestType.INCIDENT_REPORT_SUBMIT, false, constanObject.CREATE_INCIDEN_TEMP_ID, $scope);
                                    } else {
                                        window.plugins.spinnerDialog.hide();
                                        $scope.dataSaved = true;
                                        // window.location.href = "securityMain.html";
                                    }

                                }

                            });

                        } catch (e) {
                        }
                    }

                }
            }
        };

        $scope.goToDashboard = function () {
            $scope.dataSaved = false;
            window.location.href = "dashboard.html#/security";
        };
        $scope.addOffenderParent = function () {

            $scope.offenserAddShowStatus = true;

            $scope.offenderListShowStatus = false;
        }



        $scope.showLinkedStaff = false;

        $scope.toggleLinkedStaff = function () {

        }
        $scope.moveFieldSetByBreadCrum = function (tabData) {


            $rootScope.hideButton = false;
            $rootScope.show = false;

            if (!$scope.isBreadCrumIsActive)
                return;



            var index = -1;

            if (tabData.class == "deactive" || tabData.class == "current")
            {
                var tabFieldIdArray = showHidePageService.getTabFieldIdArray();
                for (var i = 0; i < tabFieldIdArray.length; i++)
                {
                    if (tabFieldIdArray[i] == tabData.pk_incident_report_tabs)
                    {
                        index = i;
                        $scope.breadCrumDropDownFielsSet = angular.copy(tabData.fieldSet);


                        // set dron down of bread crum -----------------START-------------------
                          manageDropDownFieldSet.setDropDownFieldSet($scope.hideFieldSetForBreadCrum);
                        
                        //----------------------------------------------END------------------------------------


                        break;
                    }
                }
                if (index != -1) {
                    $scope.heidAndShowIndex(index);
                    $rootScope.show = false;

                    for (var i = 0; i < $scope.tabDataArray.length; i++)
                    {
                        if (i == tabData.index)
                            $scope.tabDataArray[i].BoldClass = "txt_bold";
                        else
                            $scope.tabDataArray[i].BoldClass = "";
                    }



                }
            }

        }
        $scope.chagefieldsByDropDown = function (data) {

            if (!$scope.isBreadCrumIsActive)
                return;

            $rootScope.show = false;
            var index = -1;
            var tabId = -1;
            var canMove = false;


            for (var i = 0; i < HideFiledSetId.length; i++) {
                if (HideFiledSetId[i] == data.pk_incident_report_fieldset) {
                    return;
                }
            }


            var pageFieldSetArray = showHidePageService.getPageFieldSetArray();
            var tabFieldIdArray = showHidePageService.getTabFieldIdArray();

            for (var i = 0; i < pageFieldSetArray.length; i++)
            {
                if (pageFieldSetArray[i] == data.pk_incident_report_fieldset)
                {
                    index = i;
                    tabId = tabFieldIdArray[i];
                    break;
                }
            }


            for (var i = 0; i < $scope.tabDataArray.length; i++) {

                if ($scope.tabDataArray[i].pk_incident_report_tabs == tabId)
                {
                    if ($scope.tabDataArray[i].class == "deactive")
                        canMove = true;

                }
            }


            if (index != -1) {
                if (canMove)
                    $scope.heidAndShowIndex(index);
                else {
                    $rootScope.show = true;
                    $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;

                }


            }

        }


        $scope.heidAndShowIndex = function (index) {

            for (var i = 0; i < $scope.pageArray.length; i++) {
                if (i == index)
                    $scope.pageArray[i].showStatus = true;
                else
                    $scope.pageArray[i].showStatus = false;
            }
            $rootScope.currentVisibleIndex = index;
        }

        $scope.getIndexFromFieldsId = function () {



        };

        $scope.savePopup = function (value) {
            $rootScope.showSavePopup = value;
        };
        $rootScope.savedPopup = function () {
            $rootScope.hideSavedPopup = true;
        };
        $scope.openDashboard = function () {
            window.location.href = "dashboard.html#/security";
            $rootScope.hideSavedPopup = true;
        };



        $scope.setIncidentConfig = function () {


            var getQuestionQuery = "SELECT * from " + TABLE_INCIDENT_CONFIG;
//            dataBaseObj.getDatafromDataBase(getQuestionQuery, function (result) {
            $http.get('Json_Data/jsonData.json').success(function (data) {
//                if (result.length < 1)
//                    return;

                //      $scope.$apply(function () {
                //   var data = JSON.parse(result[0].json_data);
                var obj = data.incident_tabs.incident_report_tabs_sequence;

                $scope.reports = data.incident_tabs;
                showHidePageService.setOutcomeTypeLink(data.outcome_type_link);
                showHidePageService.setVenuRadious(data.venue_radius);

                $scope.fieldData = {};
                $scope.menuIds = obj;
                var fieldSetArray = {};
                var pageFieldSetArray = [];
                $scope.tabDataArray = [];
                $scope.breadCrumDropDownFielsSet = [];
                var tabFieldArray = [];

                for (var i = 0; i < obj.length; i++) { // for tab
                    var tab_id = obj[i];
                    //debugger;

                    var obj_tab = data.incident_tabs[tab_id];
//                  //console.log("Log of field set sequesce: "+obj_tab);

                    var tabData = obj_tab.config;
                    if (i == 0) {
                        tabData.class = "current"
                        tabData.BoldClass = "txt_bold";
                    } else {
                        tabData.class = "";
                        tabData.BoldClass = "";
                    }
                    tabData.index = i;


                    var fieldSetData = [];
//                $scope.$apply(function(){
//                 });
//                  
                    //   //console.log("Look 1: "+ obj_tab);
                    if (obj_tab.hasOwnProperty("fieldset_sequence")) {
                        for (var j = 0; j < obj_tab.fieldset_sequence.length; j++) { // no of field set in a tab

                            var fieldSet_id = obj_tab.fieldset_sequence[j]; // one field set
                            // now break a fields array  on the base of splitter in multiple
                            var fieldsIdArray = obj_tab.fieldset[fieldSet_id].field_sequence;


                            fieldSetData.push(obj_tab.fieldset[fieldSet_id].config);
                            fieldSetArray[fieldSet_id] = fieldsIdArray;
                            var splitterArray = [];
                            var map = [];
                            if (obj_tab.fieldset[fieldSet_id].hasOwnProperty("field_sequence")) {
                                for (var k = 0; k < obj_tab.fieldset[fieldSet_id].field_sequence.length; k++) {

                                    var fieldId = obj_tab.fieldset[fieldSet_id].field_sequence[k];
                                    $scope.fieldData[fieldId] = obj_tab.fieldset[fieldSet_id].fields[fieldId];
                                    if (fieldId == 0) {
                                        //   debugger;
                                        splitterArray.push(map);
                                        map = [];
                                        continue;
                                    }
                                    map.push(fieldId);
                                    //  //console.log("Map: "+JSON.stringify(map));

                                }
                                //debugger;
                                if (map.length > 0) {
                                    splitterArray.push(map);
                                }

                                for (var q = 0; q < splitterArray.length; q++) {
                                    var spliteField = splitterArray[q];
                                    // create a div and load the field in it
                                    ////console.log(spliteField);

                                    $scope.pageArray.push({"fields": splitterArray[q], "showStatus": false});
                                    $scope.NextIndexArray.push(1);
                                    $scope.BackIndexArray.push(1);
                                    pageFieldSetArray.push(fieldSet_id);
                                    tabFieldArray.push(tab_id);
                                }
                                //   //console.log('splitter'); 

                            }
                        }
                    }

                    tabData.fieldSet = fieldSetData;
                    $scope.tabDataArray.push(tabData);
                    if (i == 0) {
                        $scope.breadCrumDropDownFielsSet = angular.copy(fieldSetData);
                        //console.log(JSON.stringify($scope.breadCrumDropDownFielsSet));
                    }

                }
                showHidePageService.setPageArray($scope.pageArray);
                showHidePageService.setFieldSetArray(fieldSetArray);
                showHidePageService.setPageFieldSetArray(pageFieldSetArray);
                showHidePageService.setTabArray($scope.tabDataArray);
                showHidePageService.setTabFieldIdArray(tabFieldArray);
                $scope.pageArray = angular.copy(showHidePageService.showPage(0));

                //    });
            });
        }



        $scope.loadIncidentConfigData = function () {

            if (dataBaseObj) {

                dataBaseObj.countNoOfRow(TABLE_INCIDENT_CONFIG, function (noOfRow) {
                    if (noOfRow <= 0) {
                        loadDynamicQuestionAndIncidentConfig.loadAndSetConfig($scope.setIncidentConfig());
                    } else {
                        $scope.setIncidentConfig();


                    }
                });
            } else {
                setTimeout(function () {
                    $scope.loadIncidentConfigData();
                }, 1000);
            }
        }




        $scope.$on('checkInternetConnection', function (event, arg) {
            if (!arg.network)
                $scope.networkNotAvailable = true;
            else {

                $scope.networkNotAvailable = false;
            }

        });

        $(window).on('beforeunload', function () {
            $rootScope.showSavePopup = true;

            return;
        });

        //  $scope.loadIncidentConfigData();
        $scope.setIncidentConfig();

    }]);
