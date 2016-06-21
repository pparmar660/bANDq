BandQModule.service('compossMail', function ($rootScope) {
    var self = this;
    var filesUploaded;
    var mailId = -1;
    this.compossMailData = function (data, attachment, type, url) {
        $rootScope.attachFile = attachment;
        console.log(JSON.stringify(data));
        totalNoOfFiles = $rootScope.attachFile.length;
        filesUploaded = 0;
        mailId = -1;
        webRequestObject.postRequest(self, "POST", url, data, type, true);

    };

    this.webRequestResponse = function (requestType, status, responseData) {

        if (status == constanObject.SUCCESS) {
            switch (requestType) {
                case constanObject.WebRequestType.COMPOSS_MAIL:
                    //  console.log(JSON.stringify(responseData));
                    window.plugins.spinnerDialog.show();
                    mailId = responseData.data.id;
                    filesUploaded = 0;
                    if (totalNoOfFiles > 0) {
                        self.sendAttachmentToServer(filesUploaded, mailId);
                    }
                    else {
                        window.plugins.spinnerDialog.hide();
                        $rootScope.showCompose = false;
                    }

                    break;

                case constanObject.WebRequestType.COMPOSS_MAIL_ATTACHMENT:
                    filesUploaded++;
                    if (filesUploaded < totalNoOfFiles) {
                        self.sendAttachmentToServer(filesUploaded, mailId);
                    }
                    else {
                        window.plugins.spinnerDialog.hide();
                        $rootScope.showCompose = false;
                    }
                    break;

            }

        } else {
            showErrorAlert(requestType, responseData);
        }

    };

    var totalNoOfFiles;

    this.sendAttachmentToServer = function (no, mailId) {
        var webUrl = constanObject.COMPOSS_MAIL_ATTACHMENT + mailId;
        webRequestObject.fileUpload(self, $rootScope.attachFile[no].src, webUrl, "image_users", constanObject.WebRequestType.COMPOSS_MAIL_ATTACHMENT, false);

    };
});