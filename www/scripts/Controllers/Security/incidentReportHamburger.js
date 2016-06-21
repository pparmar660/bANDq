
BandQModule.controller('incidentReportHamburger', function ($scope, $rootScope, $location) {


    $scope.showRecent = false;
    $scope.init = function () {
        if (webRequestObject && constanObject) {
            webRequestObject.postRequest($scope, "GET", constanObject.MyDraftIncidentsCount, {},
                    constanObject.WebRequestType.MyDraftIncidentsCount, false);
        } else {
            setTimeout(function () {
                $scope.init();
            }, 100);
        }
    }

    $scope.init();

    $scope.addNewIncident = function () {
        window.location.href = "dashboard.html#/createIncident";

    }


    $scope.viewIncident = function () {
        window.location.href = "dashboard.html#/incidentView";

    }

    $scope.viewMyIncident = function () {
        window.location.href = "dashboard.html#/incidentView";
        localStorage.setItem("listType", "myincident");

    }

    $scope.viewDraftIncident = function () {
        window.location.href = "dashboard.html#/incidentView";
        localStorage.setItem("listType", "mydraft");

    }
    $scope.search = function () {
        $scope.showRecent = false;
        $scope.serachList = new Array(0);
        $scope.filterData = {};
        $scope.filterData.name = $scope.searchText;
        var searchJSON = {search: $scope.filterData};
        webRequestObject.postRequest($scope, "GET", constanObject.INCIDENT_REPORT_LIST, searchJSON,
                constanObject.WebRequestType.SearchIncident, false);
    }

    $scope.webRequestResponse = function (requestType, status, responseData) {

        if (status == constanObject.ERROR) {
            showErrorAlert(requestType, responseData);
            //              alert(JSON.stringify(responseData.responseText));
            return;
        }

        switch (requestType) {

            case constanObject.WebRequestType.MyDraftIncidentsCount:
                if (responseData.count) {
                    $scope.$apply(function () {
                        $scope.draftCount = responseData.count;
                    });
                } else {
                    $scope.$apply(function () {
                        $scope.draftCount = 0;
                    });
                }
                break;

            case constanObject.WebRequestType.SearchIncident:
                $scope.$apply(function () {
                    $scope.showRecent = true;
                    $scope.serachList = responseData.data;
                });
                break;
        }
    };

});