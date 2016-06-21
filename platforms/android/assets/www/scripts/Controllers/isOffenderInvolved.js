BandQModule.controller('isOffenderInvolvedCnt', function ($scope, OffenderService, globalService, $rootScope) {

    $rootScope.show = false;
    $scope.whyrequired = false;
    $rootScope.yesnorequired = false;
    $scope.whyNotShowStatus = false;
    $scope.offenderTemplates = null;
    $scope.offenderInfo = {};
    var noOfPageMove;

    $scope.init = function (_noOfPageMove) {
        noOfPageMove = _noOfPageMove;

        $scope.isOffenderInvolvedToolTipMessage = $scope.fieldData[97].question_hint;
        $scope.whyNotOffenderToolTipMessage = $scope.fieldData[69].question_hint;
    };
    $scope.yesAction = function () {
        $rootScope.yesnorequired = false;
        $("#main_next_Btn").addClass("active");
        $rootScope.isOffenderInvolved = true;
        $scope.whyNotShowStatus = false;
        $("#yesBtn").addClass("active");
        $("#noBtn").removeClass("active");




    };
    $scope.noAction = function () {
        $rootScope.yesnorequired = false;
        $("#main_next_Btn").addClass("active");
        $rootScope.isOffenderInvolved = false;
        $scope.whyNotShowStatus = true;
        $("#noBtn").addClass("active");
        $("#yesBtn").removeClass("active");

    };
    $scope.nextButtonClicked = function (callback) {
        if ($rootScope.isOffenderInvolved != null) {
            $rootScope.yesnorequired = false;
            if ($rootScope.isOffenderInvolved) {

                $rootScope.offenderTemplates = new Array(0);
                $rootScope.offenderTemplates = ["202", "203", "204"];
                
                $rootScope.offenserAddShowStatus = false;
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = true;
                return callback(true, 1);
            } else {
                if ($scope.offenderInvolvedNotes == "") {
                    $scope.whyrequired = true;
                    $rootScope.show = true;
                    $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";
                    return callback(false, 0);
                } else {
                    globalService.setOffender({'whyNot': $scope.offenderInvolvedNotes, 'offenderDetails': "", 'isOffenderInvolved': 'no'});
                    $rootScope.offenderTemplates = new Array(0);
                    $rootScope.offenderTemplates = null;
                    return callback(true, 3);
                }
            }

        } else {
            $rootScope.yesnorequired = true;
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "You have some form errors. Please check below.";
            return callback(false, 0);
        }

    };

    $scope.textFocus = function () {
        $scope.whyrequired = false;
    }

    $scope.back = function (callBack) {
        return callBack(true, noOfPageMove);
    }
    $scope.saveButtonAction = function () {

    };

});