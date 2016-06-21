BandQModule.controller("ReportTypeCtrl",
        function ($scope, $http, $rootScope, CategoryOutcomeTypeService, globalService, showHidePageService) {

            $scope.ts = [];
            var tempArray = [];

            $scope.iconBaseUrl = constanObject.MainUrl;
            $rootScope.show = false;
            $scope.req1 = false;
            $scope.derivedMsg = "";
            var prevOutcomeId = -1;
            var resetType = false;
            //    var rawOuts = [];.

            function clearActive() {
                for (var i = 0; i < $scope.ts.length; i++) {
                    $scope.ts[i].active = false;
                }
            }

            function fillTypes() {

                //    //console.log(CategoryOutcomeTypeService.tempData);

                var allTypes = CategoryOutcomeTypeService.tempData.type;
                var allOutcomes = CategoryOutcomeTypeService.tempData.outcome;
                // //console.log(allTypes);
                ////console.log(allOutcomes);
                var cLimit = allOutcomes.length; // all outcome
                var oLimit = allTypes.length; // all types
                $scope.ts = [];

                var targetOutcomeId = globalService.getOutcomeId();

                //        //console.log(targetOutcomeId);

                for (var c = 0; c < cLimit; c++) {
                    if (targetOutcomeId == allOutcomes[c].id_otc) {

                        //                                //console.log(allOutcomes[c]);

                        var userDefaultTypeIds = allOutcomes[c].typeId; // users types

                        var outTypeLimit = userDefaultTypeIds.length;


                        for (var so = 0; so < outTypeLimit; so++) {
                            for (var o = 0; o < oLimit; o++) {
                                //                        if(o == oLimit - 1){
                                //                            $scope.$apply(function(){
                                //                                $scope.outs = tempArray;
                                //                                //console.log($scope.outs);
                                //                            })
                                //                        }
                                //                        //console.log(parseInt(userDefaultTypeIds[so]), parseInt(allOutcomes[o].id_otc));
                                if (parseInt(userDefaultTypeIds[so]) == parseInt(allTypes[o].id_it)) {
                                    // fill outcomesArray
                                    //                            tempArraypush(allOutcomes[o]);
                                    //                            tempArray.push(allTypes[o]);
                                    if (resetType) {
                                        allTypes[o].activeClass = false;
                                    }
                                    $scope.ts.push(allTypes[o]);

                                    break;
                                }

                            }

                        }
                        //                $scope.$apply(function(){
                        //    $scope.outs.push(allOutcomes[o]);
                        //                                //console.log(tempArray);

                        //                $scope.ts = tempArray;
                        //                angular.copy();
                        //                //console.log($scope.ts);
                        //                    rawOuts = tempArray;
                        //                    //console.log($scope.outs);
                        //                })
                        //                //console.log($scope.outs);
                    }
                    if (c == cLimit - 1 & resetType) {
                        clearActive();
                        resetType = false;
                    }

                }

            }


            //.postRequest =   function(classObject,type,webUrl,parameters,requestType,showProgress)
            $scope.webRequestResponse = function (requestType, status, responseData) {
                //        //console.log('in web request response from doYouHaveAnyFileController.js');
                //        //console.log(responseData);
                //        $scope.IncidentReports = [];
                //        var tempItem = [];
                //        for(var i = 1; i < responseData.data.length; i++){
                //           tempItem = {
                //              "caption": responseData.data[i].firstname_usr + " " + responseData.data[i].lastname_usr,
                //              "value":responseData.data[i].E_pin_usr
                //           }
                //           $scope.IncidentReports.push(tempItem);
                //        }
            };

            //   webRequestObject.postRequest($scope, "GET", constanObject.LinkedStaffMember, {}, constanObject.WebRequestType.LinkedStaffMember, false);


            function selectType(obj) {

                //        //console.log(obj);

                for (var i = 0; i < $scope.ts.length; i++) {
                    if ($scope.ts[i].id_it == obj.id_it) {
                        $scope.ts[i].activeClass = true;
                        $scope.derivedMsg = $scope.ts[i].description_it;
                        //                //console.log($scope.derivedMsg, $scope.ts[i].description_it);
                        //                $scope.cats[i].activeClass = 'active';
                        //                return false;
                        //                //console.log($scope.cats[i].activeClass);
                    } else {
                        $scope.ts[i].activeClass = false;
                        //                $scope.cats[i].activeClass = '';
                    }
                }
            }


            $scope.changeOutcome = function (obj) {
                globalService.setTypeId(obj.id_it);
                selectType(obj);
            }


            $scope.nextButtonClicked = function (callBack) {
                //        //console.log(typeof globalService.getSwasAreaId());
                //        //console.log(globalService.getSwasAreaId());
                if (parseInt(globalService.getTypeId()) > 0) {

                    showHidePageService.updateHideFieldsetArray();
                    
                    
                    
                    
                    $rootScope.show = false;
                    $scope.req1 = false;
                    $scope.req2 = false;
                    return callBack(true, 1);
                } else {
                    $rootScope.show = true;
                    $scope.req1 = true;
                    $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                    //            alert('Kindly select your Type');
                    return callBack(false, 1);
                }
            };
            var noOfPageMove = 1;
            $scope.init = function (_noOfPageMove) {
                noOfPageMove = _noOfPageMove;
                $scope.typeToolTipMessage = $scope.fieldData[12].question_hint;
                //            //console.log('init form report type');
                if (prevOutcomeId != -1 & prevOutcomeId != parseInt(globalService.getOutcomeId())) {
                    resetType = true;
                    $scope.derivedMsg = "";
                    globalService.setTypeId(-1);
                }
                if (prevOutcomeId == -1)
                    resetType = true;
                if (parseInt(globalService.getOutcomeId()) > 0 & resetType) {
                    prevOutcomeId = parseInt(globalService.getOutcomeId());
                    $scope.ts = [];
                    fillTypes();
                }
            }

            $scope.back = function (callBack) {
                $rootScope.show = false;
                $scope.req1 = false;
                $scope.req2 = false;
                //        globalService.setTypeId(-1);
                return callBack(true, noOfPageMove);
            }
        });