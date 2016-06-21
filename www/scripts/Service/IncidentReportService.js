BandQModule.service('IncidentReport', function () {

    this.getIncidentReportStatus = function (callback, type) {
        if (!type)
            type = "";

        webRequestObject.postRequest(this, "GET", constanObject.INCIDENT_STATUS + type, null, 1101, true);
        this.webRequestResponse = function (requestType, status, responseData) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(responseData.responseText).error);
            }
            switch (requestType) {
                case 1101:
                    //console.log(JSON.stringify(responseData));
                    callback(true, responseData.data);
                    break;
            }
        }
    };
    this.getIncidentReportList = function (url, type, page, parameter, callback) {
       var  url_ = url + "?page=" + page;
        if (type)
            if (type.length > 0)
                url_ = url + type + "&page=" + page;
        webRequestObject.postRequest(this, "GET", url_, parameter, 101, true);
        this.webRequestResponse = function (requestType, status, responseData) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(responseData.responseText).error);
            }
            switch (requestType) {
                case 101:
                    //console.log(JSON.stringify(responseData));
                    callback(true, responseData.data, responseData.last_page);
                    break;
            }
        }
    };

    this.getIncidentReportDetail = function (incident_id, callback) {
        webRequestObject.postRequest(this, "GET", constanObject.INCIDENT_DETAIL + incident_id, null, 101, true);
        this.webRequestResponse = function (requestType, status, responseData) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(responseData.responseText).error);
            }
            switch (requestType) {
                case 101:
                    //console.log(JSON.stringify(responseData));
                    for (var i in responseData.data.incident_details) {
                        //console.log(i);
                        (responseData.data.incident_details[i] == null || responseData.data.incident_details[i] == "") ? responseData.data.incident_details[i] = "<b>Not Supplied</b>" : responseData.data.incident_details[i] = responseData.data.incident_details[i];

                    }
//                      responseData.data.linked_offenders.forEach(function(obj){
//                        obj.offenders_ban_from_date=moment(obj.offenders_ban_from_date).format('DD/MM/YYYY');
//                      });
                    callback(true, responseData.data);
                    break;
            }
        }
    }


});
