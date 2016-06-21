/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

BandQModule.controller("appMainController", ['$scope', '$rootScope', '$interval', function ($scope, $rootScope, $interval) {
        var self = this;
        $rootScope.show = false;
        $rootScope.infoShow = false;
        $rootScope.successShow = false;
        self.appMainPageShowStatus = true;
        self.loginPageShowStatus = false;
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = 'Incident Reports';
        $rootScope.dashboardLink = '#/dashboard';
       
        $scope.closeMsg = function () {
            $rootScope.show = false;
        }
        $scope.infoClose = function () {
            $rootScope.infoShow = false;
        }
        $scope.successClose = function () {
            $rootScope.successShow = false;
        }
            updateClass();
        // Breadcrum Page Redirection
        $scope.breadcrumbMenu = function (val) {
           
            if (val == "Security") {
                window.location.href = "dashboard.html#/security";
            }
            else if (val == "Incident Reports") {
                 $rootScope.incidentDetail= false;
                window.location.href = "dashboard.html#/incidentView";
            }
        };


    }]);

var updateClass = function () {
   // alert(document.getElementById("link_2"));
    if (document.getElementById("link_2"))
    {
            $("#link_2").addClass("activate");
            $("#link_1").removeClass("activate");
             $("#link_3").removeClass("activate");
            $("#link_4").removeClass("activate");
            $("#link_5").removeClass("activate");
            $('#ftDashbord').removeClass("active");
         $('#ftSecurity').addClass("active");
       
    } else {
        setTimeout(function () {
            updateClass();
        }, 1000);
    }
}

