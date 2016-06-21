BandQModule.controller('reporterController', ['$scope',
    'globalService', 'checkInternetConnectionService', 'getUniqueId', 'getCountryStateRegion', 'getAdvanceFilter', "getVenueList","getCategoryOutcomeType",
    function ($scope, globalService, checkInternetConnectionService, getUniqueId, getCountryStateRegion, getAdvanceFilter, getVenueList,getCategoryOutcomeType) {

        $scope.reporterName = localStorage.getItem("fullUsername");

        getCountryStateRegion.loadFromLocal();
        getAdvanceFilter.loadFromLocal();
        getVenueList.loadFromLocal();
        getCategoryOutcomeType.loadFromLocal();

        $scope.init = function () {
            //SET unique id of incident
            if (constanObject.CREATE_INCIDENT_TEMP_ID <= 0)
                constanObject.CREATE_INCIDEN_TEMP_ID = getUniqueId.getId();

            globalService.setUserId(localStorage.getItem("userId"));
        }

    }]);