BandQModule.service('sendFilesToServer', function ($rootScope) {
    var self = this;

    var fileId;
    var currentScope;
    var requestType;
    //
    // var currentFileId;
    this.sendFile = function (fileName, incidentId, options) {

        var webUrl = constanObject.UPLOAD_DO_YOU_HAVE_ANY_FILE_URL + incidentId;

        webRequestObject.fileUploadWithOption(self, fileName, webUrl, constanObject.WebRequestType.FILE_UPLOAD, options, false);


    };


    this.setCurrentScope = function (_currentScope, type) {
        currentScope = _currentScope;
        requestType = type;
    }
    this.sendNextFile = function () {
         dataBaseObj.checkRecordIsExist("Select Count(*) AS c from '" + TABLE_CREATE_INCIDENT_REPORT_FILE + "' ", function (noOfRecord) {

            if (noOfRecord > 0) {

                if (checkNetworkConnection()) {
                    var getUploadedFile = "SELECT *  from '" + TABLE_CREATE_INCIDENT_REPORT_FILE + "' LIMIT 1";
                    dataBaseObj.getDatafromDataBase(getUploadedFile, function (result) {
                        //console.log(JSON.stringify(result));
                        var options = {};
                        fileId = result[0].tempId;
                        options.moduleId = result[0].moduleId;
                        options.tempId = result[0].tempId;
                        options.type = result[0].fileType;
                        //console.log(JSON.stringify(options));

                        self.sendFile(result[0].filePath, result[0].orignalIncidentId, options);
                    });
                }


            } else {
              if (currentScope)
                {
                    if (requestType == constanObject.WebRequestType.INCIDENT_REPORT_SUBMIT) {
                        var thankyouPage = angular.element($("#225")).scope();
                        thankyouPage.init();

                        currentScope.$apply(function () {
                            //currentScope.heidAndShowIndex(++currentScope.currentVisibleIndex);
                            currentScope.tabDataArray[currentScope.tabDataArray.length - 1].class = "complete"
                            currentScope.isBreadCrumIsActive = false;
                        });
                    }
                  
                }
             else if(requestType == constanObject.WebRequestType.INCIDENT_REPORT_LOGIN){
                        window.location.href = "dashboard.html";
                    }

            }


        });


        //  

    };

    this.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.SUCCESS) {

            switch (requestType) {
                case constanObject.WebRequestType.FILE_UPLOAD:

                    // delete record of id is currentFileId
                    var query = "DELETE from " + TABLE_CREATE_INCIDENT_REPORT_FILE + " WHERE tempId = '" + fileId + "'";
                    dataBaseObj.deleteRecord(query);
                    self.sendNextFile();
                    break;
            }
        } else {
            showErrorAlert(requestType, responseData);
        }

    }

});