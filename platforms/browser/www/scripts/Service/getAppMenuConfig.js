BandQModule.service("appMenuConfig", function () {
 var self=this;
    this.getAppMenuConfig = function () {
        webRequestObject.postRequestSync(self, "GET", constanObject.APP_MENU, "", constanObject.WebRequestType.appMenu, false);
    };
    
    this.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            // alert(JSON.stringify(responseData.responseText));
            return;
        }
        switch (requestType) {
            
            case constanObject.WebRequestType.appMenu:
                 //console.log("App Menu Config : "+JSON.stringify(responseData));
                if (responseData.hasOwnProperty("data")) {
                    dataBaseObj.deleteTableData(TABLE_APP_MENU_CONFIG);
                    dataBaseObj.insertData(TABLE_APP_MENU_CONFIG, JSON_FIELD_ARRAY, responseData.data, true);
                }
                break;
        }
    };

});
