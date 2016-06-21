BandQModule.service("breadCrum", function (manageDropDownFieldSet) {

    this.setBreadCrumOnNextClick = function (curentTabId, NextTabId) {

//       // alert(curentTabId+","+NextTabId);
//        //console.log(JSON.stringify(showHidePageService.getTabArray()));

        if (curentTabId != NextTabId)
        {
            var tabIndex = -1;
            var scope = angular.element('#incidenctCreateMainId').scope();
            for (var i = 0; i < scope.tabDataArray.length; i++)
            {
                if (scope.tabDataArray[i].pk_incident_report_tabs == curentTabId)
                {
                    scope.tabDataArray[i].class = "deactive";//complete
                    tabIndex = i;
                }
                if (scope.tabDataArray[i].pk_incident_report_tabs == NextTabId) {
                    if (scope.tabDataArray[i].class != "deactive")
                        scope.tabDataArray[i].class = "current";

                    tabIndex = i;
                    scope.breadCrumDropDownFielsSet = angular.copy(scope.tabDataArray[i].fieldSet);
                    
                    manageDropDownFieldSet.setDropDownFieldSet(scope.hideFieldSetForBreadCrum);
                    
                        

                }

            }
            if (tabIndex >= 0) {
                for (var i = 0; i < scope.tabDataArray.length; i++)
                {
                    if (i == tabIndex)
                        scope.tabDataArray[i].BoldClass = "txt_bold";
                    else
                        scope.tabDataArray[i].BoldClass = "";
                }

            }

        }


    }

});