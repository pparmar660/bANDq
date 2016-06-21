BandQModule.service("userConfig", function () {
 var self=this;
    this.getUserConfig = function () {
        webRequestObject.postRequestSync(self, "GET", constanObject.userInfo, "", constanObject.WebRequestType.UserInfo, false);



    };
    this.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            // alert(JSON.stringify(responseData.responseText));
            return;
        }
        switch (requestType) {
            case constanObject.WebRequestType.UserInfo:
               
                if (responseData.hasOwnProperty("data")) {
                    dataBaseObj.deleteTableData(TABLE_USER_INFO);
                    dataBaseObj.insertData(TABLE_USER_INFO, JSON_FIELD_ARRAY, responseData.data, true);
                }
                break;
        }
    };

});
