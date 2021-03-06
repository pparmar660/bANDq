BandQModule.service('getLinkedStaffList', function () {

    this.data;
    var self = this;
    this.loadFromLocal = function () {

        if (dataBaseObj) {

            dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_LINKED_STAFF, function (result) {
                if (result.length > 0)
                    self.data = JSON.parse(result[0].json_data);
                else
                    self.download();
            });

        } else
            setTimeout(function () {
                self.loadFromLocal();
            }, 1000);


    }


    this.download = function () {


        if (webRequestObject && constanObject)
            webRequestObject.postRequest(self, "GET", constanObject.LinkedStaffMember, {}, constanObject.WebRequestType.LinkedStaffMember, false);
        else
            setTimeout(function () {
                self.download();
            }, 1000);
    }



    this.getData = function () {
        if (!self.data)
            self.loadFromLocal();

        return self.data;
    }

//
    this.webRequestResponse = function (requestType, status, response) {

        if (status == constanObject.ERROR) {

        } else {
            switch (requestType) {
                case constanObject.WebRequestType.LinkedStaffMember:
                    dataBaseObj.deleteTableData(TABLE_LINKED_STAFF);
                    dataBaseObj.insertData(TABLE_LINKED_STAFF, JSON_FIELD_ARRAY, response.data, true);

            }
        }

    }

    //this.download();




});
