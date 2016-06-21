BandQModule.service('createIncidentReport', ["sendFilesToServer", "globalService", "$rootScope", "$timeout", function (sendFilesToServer, globalService, $rootScope, $timeout) {
        var self = this;
        //var moveToDashboard = false;
        var currentPageScope;
        var currentIncidentId;
        this.incidentReportData = function (query, type, _moveToDashboard, currentIncId, scope) {
            currentPageScope = scope;
            currentIncidentId = currentIncId;
            dataBaseObj.getDatafromDataBase(query, function (result) {
                var incidentData = [];
                //  //console.log(JSON.stringify(result));
                for (var i = 0; i < result.length; i++) {
                    try {// //console.log(result[i].json_data);
                        incidentData.push(JSON.parse(result[i].json_data));
                    } catch (e) {
                        //console.log(e);
                    }
                }

                var data = {};
                data.data = incidentData;

                //console.log(JSON.stringify(data));
                webRequestObject.postRequest(self, "POST", constanObject.INSERT_INCIDENT_REPORT, data, type, true);

            }, false);


        };


        this.webRequestResponse = function (requestType, status, responseData) {
            if (status == constanObject.SUCCESS) {
                for (var i = 0; i < responseData.data.length; i++) {
                    var query = "UPDATE " + TABLE_CREATE_INCIDENT_REPORT_FILE + " SET orignalIncidentId = '" + responseData.data[i].inc_id.toString() +
                            "' WHERE incidentTempId ='" + responseData.data[i].tmp_id + "' ";

                    dataBaseObj.update(query);


                    if (responseData.data[i].tmp_id == currentIncidentId) {
                        globalService.setIncidentResData(responseData.data[i]);
                    }
                }
                ;
                switch (requestType) {
                    case constanObject.WebRequestType.INCIDENT_REPORT_SUBMIT:

                        dataBaseObj.deleteTableData(TABLE_CREATE_INCIDENT_REPORT);
                        sendFilesToServer.setCurrentScope(currentPageScope, constanObject.WebRequestType.INCIDENT_REPORT_SUBMIT);
                        sendFilesToServer.sendNextFile();
                        //console.log(responseData);
                        constanObject.CREATE_INCIDENT_ID = responseData.data[0].inc_id;
                        if (currentPageScope)
                        {
                            var thankyouPage = angular.element($("#225")).scope();
                            thankyouPage.init();
                            window.plugins.spinnerDialog.hide();

                            currentPageScope.$apply(function () {
                                currentPageScope.heidAndShowIndex(++currentPageScope.currentVisibleIndex);
                                currentPageScope.tabDataArray[currentPageScope.tabDataArray.length - 1].class = "complete"
                                currentPageScope.isBreadCrumIsActive = false;
                                currentPageScope.incidentSubmittedShowHide = true;
                                currentPageScope.breadCrumDropdownShowHide = false;
                            });

                        }
                        break;

                    case constanObject.WebRequestType.INCIDENT_REPORT_LOGIN:

                        dataBaseObj.deleteTableData(TABLE_CREATE_INCIDENT_REPORT);
                        sendFilesToServer.setCurrentScope(currentPageScope, constanObject.WebRequestType.INCIDENT_REPORT_LOGIN);
                        sendFilesToServer.sendNextFile();
                        window.plugins.spinnerDialog.hide();

                        break;
                    case constanObject.WebRequestType.INCIDENT_REPORT_SAVE:
                        $timeout(function () {
                            $rootScope.hideSavedPopup = false;
                        },
                                200);
                        dataBaseObj.deleteTableData(TABLE_CREATE_INCIDENT_REPORT);
                        constanObject.CREATE_INCIDENT_ID = responseData.data[0].inc_id;

                        sendFilesToServer.setCurrentScope(currentPageScope, constanObject.WebRequestType.INCIDENT_REPORT_SAVE);
                        sendFilesToServer.sendNextFile();
                        window.plugins.spinnerDialog.hide();

                        break;


                }
            } else {
                showErrorAlert(requestType, responseData);
            }
            //  if (moveToDashboard)
            //     window.location.href = "dashboard.html";
        }

    }]);