function  Constant() {

    this.employmentWebRequestTypeInit = 200;

    this.WebRequestType = {
        LoginRequest: 0,
        LoginPinrequest: 1,
        UpdatePinRequest: 2,
        VechilePartialPlate: 3,
        VechileFullPlate: 4,
        VechileDetailsById: 5,
        AddNewVechile: 6,
        FilterData: 7,
        VechileSearch: 8,
        UpdateVechile: 9,
        SelectVechile: 10,
        FILE_UPLOAD: 11,
        VENUE_LIST: 12,
        LinkedStaffMember: 13,
        ReportCategory: 14,
        OutcomesByCatId: 15,
        UserInfo: 16,
        ListSwasArea: 17,
        PoliceList: 18,
        OFFENDER_FILTER: 20,
        ADD_NEW_WITNESS: 21,
        WITNESS_DETAILS: 22,
        WITNESS_LIST: 23,
        UPDATE_WITNESS: 24,
        WITNESS_FILE: 25,
        INCIDENT_REPORT_SUBMIT: 26,
        INCIDENT_REPORT_SAVE: 27,
        INCIDENT_REPORT_LOGIN: 28,
        
//        MOD: 2,ADMIN: 3,


        FORGOT_PASSWORD: 29,
        DYNAMIC_QUESTION: 30,
        INCIDENT_CONFIG: 31,
        COMMS_AND_TASK: 32,
        ListOffenderCategory: 33,
        DELETE_INMAIL_MESSAGE: 34,
        UNREAD_MESSAGE_COUNT: 35,
        VIEW_MESSAGE: 36,
        OFFENDER_SEARCH: 101,
        VEHICLE_COUNT: 102,
        MyDraftIncidentsCount: 103,
        SearchIncident: 104,
        appMenu: 105,
        logOut: 106,
        COMPOSS_MAIL: 107,
        COMPOSS_MAIL_ATTACHMENT: 108,
        //employment module....

    };

    this.employmentWebRequestType = {
        STAFF_DETAIL: this.employmentWebRequestTypeInit,
        GET_STAFF_ACCESS_LEVEL: this.employmentWebRequestTypeInit + 1,
        GET_LIST_STAFF_MEMBERS: this.employmentWebRequestTypeInit + 2,
        GET_LIST_STAFF_CATEGORIES: this.employmentWebRequestTypeInit + 3,
        GET_LIST_VENUE_ALL: this.employmentWebRequestTypeInit + 4,
        GET_STAFF_CAT_FILTER: this.employmentWebRequestTypeInit + 5,
        GET_LOCATION_WISE_FILTER: this.employmentWebRequestTypeInit + 6,
        GET_LIST_VENUE_SECTOR: this.employmentWebRequestTypeInit + 7,
        GET_LIST_VENUE_CATEGORIES: this.employmentWebRequestTypeInit + 8,
        GET_LIST_VENUE_BY_CATEGORIES: this.employmentWebRequestTypeInit + 9,
        GET_VENUE_DETAIL: this.employmentWebRequestTypeInit + 10,
        GET_STAFF_IMAGE: this.employmentWebRequestTypeInit + 11,
        FILTER_DATA: this.employmentWebRequestTypeInit + 12,
        GET_VENUELIST_WISE_FILTER: this.employmentWebRequestTypeInit + 13,
        CHANGE_PASSWORD: this.employmentWebRequestTypeInit + 14,
        GET_VENUE_IMAGE: this.employmentWebRequestTypeInit + 15,
        STAFF_CATEGORIES: this.employmentWebRequestTypeInit + 16,
        ADD_STAFF: this.employmentWebRequestTypeInit + 17,
        UPDATE_STAFF: this.employmentWebRequestTypeInit + 18,
    };

  this.FileUploadModuleId = {
        FILE_UPLOAD: 1,
        DYNAMIC_QUESTION: 2,
        OFFENDER: 3,
        VICTIM: 4,
        WITNESS: 5,
        VECHILE: 6,
        STAFF: 7

    };


    this.CommsAndTaskWebRequestInit = 300;
    this.CommsAndTaskWebRequestType = {
        CommsConfigType: this.CommsAndTaskWebRequestInit + 1,
        ListStaff: this.CommsAndTaskWebRequestInit + 2,
        AddComms: this.CommsAndTaskWebRequestInit + 3,
        UploadCommsFile: this.CommsAndTaskWebRequestInit + 4,
        CommsDetails: this.CommsAndTaskWebRequestInit + 5,
        TaskList: this.CommsAndTaskWebRequestInit + 6,
        OverdueTask: this.CommsAndTaskWebRequestInit + 7,
        CompleteTask: this.CommsAndTaskWebRequestInit + 8,
        PendingTask: this.CommsAndTaskWebRequestInit + 9,
        TaskDetails: this.CommsAndTaskWebRequestInit + 10,
        TaskCount: this.CommsAndTaskWebRequestInit + 11,
        VenueList: this.CommsAndTaskWebRequestInit + 12,
        NotificationCount: this.CommsAndTaskWebRequestInit + 13,
        ListNotificationTask: this.CommsAndTaskWebRequestInit + 14,
        ListNotificationAlerts: this.CommsAndTaskWebRequestInit + 15,
        ListAppAlerts: this.CommsAndTaskWebRequestInit + 16,
        ListNotificationOverlay: this.CommsAndTaskWebRequestInit + 17,
        ListNotificationEmails: this.CommsAndTaskWebRequestInit + 18,
        OnLineFormUpdate: this.CommsAndTaskWebRequestInit + 19
    };


    this.VEHICLE_IMAGE_KEY = "image_vehicle";
    this.COMMS_IMAGE_KEY = "image_comms";
    this.IncidentReportVenueRadius = 2; // 1 mile = 1.609344 km therefore rounding it to nearest digit i.e. 2

    this.SUCCESS = "success";
    this.ERROR = "error";
// http://api247.org/v1/forgotPassword
    this.MainUrl = "https://api247.org/";
    this.MainUrl2 = "https://api.admin247.org/";
    this.VesionNo = "v1/";

    this.civilRecovery = this.MainUrl + this.VesionNo + "GetCivilRecoveryStatus";
    this.authenticateUser = this.MainUrl + this.VesionNo + "login";
    this.authenticatePin = this.MainUrl + this.VesionNo + "login";
    this.updatePin = this.MainUrl + this.VesionNo + "updatepin";
    this.forgotPassword = this.MainUrl + this.VesionNo + "forgotPassword";


    this.APP_MENU_CONFIG = this.MainUrl + this.VesionNo + "GetAppMenuConfig";
    this.GENERATE_INCIDENT_REPORT = this.MainUrl + this.VesionNo + "GenerateIncidentReport";
    this.OFFENDERS_LIST_URL = this.MainUrl + this.VesionNo + "ListOffenders";


    this.userInfo = this.MainUrl + this.VesionNo + "GetUserConfig";

    this.ListSwasArea = this.MainUrl + this.VesionNo + "Listvsp";
    this.LinkedStaffMember = this.MainUrl + this.VesionNo + "ListStaffMembers/all";
    this.Listcategory = this.MainUrl + this.VesionNo + "Listcot";

    this.VENUE_LIST = this.MainUrl + this.VesionNo + "ListVenues/all";
    this.FILTER_DATA = this.MainUrl + this.VesionNo + "GenerateFilters";
    this.EDIT_OFFENDER_URL = this.MainUrl + this.VesionNo + "updateoffender/";
    this.OFFENDER_DETAIL_URL = this.MainUrl + this.VesionNo + "GetOffenderDetails/";
    this.SEARCH_CINFIG_URL = this.MainUrl + this.VesionNo + "OffenderSearchConfig";
    this.ADD_OFFENDER_URL = this.MainUrl + this.VesionNo + "insertoffender";
    this.UPLOAD_OFFENDER_FILE_URL = this.MainUrl + this.VesionNo + "UploadOffenderFiles/";
    this.offenderImageBaseUrl = this.MainUrl + this.VesionNo + "getOffenderImage/";
    this.dynamicQuestionUrl = this.MainUrl + this.VesionNo + "GenerateDynamicQuestions";

    this.dynamicQuestionUrl_ = this.MainUrl + this.VesionNo + "GenerateDynamicQuestions";

    this.UNKNOWN_OFFENDER = this.MainUrl + this.VesionNo + "ListOffenders?selection=ContactType&selection_type=status&selection_id=0";
    this.UNKNOWN_OFFENDER_PARAMETERS = "?selection=ContactType&selection_type=status&selection_id=0";
    this.KNOWN_OFFENDER = this.MainUrl + this.VesionNo + "ListOffenders?selection=ContactType&selection_type=status&selection_id=3";
    this.KNOWN_OFFENDER_PARAMETERS = "?selection=ContactType&selection_type=status&selection_id=3";
    this.ListOffenderCategories = this.MainUrl + this.VesionNo + "ListOffenderCategories";

    this.OFFENDER = this.MainUrl + this.VesionNo + "ListOffenders?selection=ContactType&selection_type=status&selection_id=";
    this.OFFENDER_PARAMETERS = "?selection=ContactType&selection_type=status&selection_id=";

    this.UPLOAD_DO_YOU_HAVE_ANY_FILE_URL = this.MainUrl + this.VesionNo + "UploadAllIncidentFiles/";

    //////////////////////////VECHILS///////////////////////////////////////

    this.AddNewVechile = this.MainUrl + this.VesionNo + "insertvehicle";
    this.UpdateVechile = this.MainUrl + this.VesionNo + "updatevehicle/"
    this.GetVehicleByPlate = this.MainUrl + this.VesionNo + "getVehicleByPlate";
    this.GetVehicleByPartialPlate = this.MainUrl + this.VesionNo + "getVehicleByPartialPlate";
    this.GetVehicleDetailsById = this.MainUrl + this.VesionNo + "GetVehicleDetails/";
    this.vechileSearch = this.MainUrl + this.VesionNo + "ListVehicles";
    this.vechileFullPlate = this.MainUrl + this.VesionNo + "ListVehicles/fullplate";
    this.vechilePartial = this.MainUrl + this.VesionNo + "ListVehicles/partialplate";
    this.getVechileImages = this.MainUrl + this.VesionNo + "getVehicleImage/";
    this.UploadVechileFile = this.MainUrl + this.VesionNo + "UploadVehicleFiles/";
    this.VehicleCount = this.MainUrl + this.VesionNo + "GetVehicleCount";



////////////////////////////////////VICTIM////////////////////////////////////
    this.VICTIME_LIST = this.MainUrl + this.VesionNo + "ListVictims";
    this.ADD_NEW_VICTIME = this.MainUrl + this.VesionNo + "insertvictims";
    this.VICTIME_DETAILS = this.MainUrl + this.VesionNo + "GetVictimsDetails/";
    this.VICTIME_CATEGORY = this.MainUrl + this.VesionNo + "ListVictimsCategories";
    this.VICTIME_IMAGE_UPLOAD = this.MainUrl + this.VesionNo + "UploadVictimFiles/";
    this.VICTIME_CATEGORIES = this.MainUrl + this.VesionNo + "ListVictimsCategories"; //Also used for witness category. 
    this.VICTIME_EDIT = this.MainUrl + this.VesionNo + "updatevictims/";
    this.VICTIME_IMAGE = this.MainUrl + this.VesionNo + "getVictimsImage/";
    ////////////////////////////////////WITNESS////////////////////////////////////
    this.WITNESS_LIST = this.MainUrl + this.VesionNo + "ListWitnesses";
    this.ADD_NEW_WITNESS = this.MainUrl + this.VesionNo + "insertwitness";
    this.WITNESS_DETAILS = this.MainUrl + this.VesionNo + "GetWitnessDetails/";
    this.UPDATE_WITNESS = this.MainUrl + this.VesionNo + "updatewitness/";
    this.UPLOAD_WITNESS_FILES = this.MainUrl + this.VesionNo + "UploadWitnessFiles/";
    this.WITNESS_CATEGORIES = this.MainUrl + this.VesionNo + "ListWitnessCategories";
    this.WITNESS_IMAGE = this.MainUrl + this.VesionNo + "getWitnessImage/";

    //////////////////////////Police and Authority ///////////////////////
    this.POLICE_LIST = this.MainUrl + this.VesionNo + "ListPoliceandAuthority";
    this.INCIDENT_LOCATION_DISTANCE_MILE = 1;


    //////////////////////////INCIDENT REPORT ///////////////////////
    this.INCIDENT_REPORT_LIST = this.MainUrl + this.VesionNo + "ListIncidentReport";
    this.INCIDENT_DETAIL = this.MainUrl + this.VesionNo + "getIncidentDetails/";
    this.INCIDENT_STATUS = this.MainUrl + this.VesionNo + "ListIncidentReportStatuses";
    this.INCIDENT_REPORT_LIST_BY_STATUS = this.INCIDENT_REPORT_LIST + "/status/";


    //// Additional Comment //////////////
    this.INSERT_INCIDENT_REPORT = this.MainUrl + this.VesionNo + "insertincident";

    // error messge
    this.ValidationMessageIncidentCreate = "Insufficient Information: Please check the error messages displayed on the screen.";

    this.INCIDENT_LOCATION_DISTANCE_MILE = 1;
    this.CREATE_INCIDENT_TEMP_ID = -1;

    this.CREATE_INCIDENT_ID = -1;

    this.INCIDENT_FILE_URL = this.MainUrl + this.VesionNo + "getIncidentMedia";
    this.MyDraftIncidentsCount = this.MainUrl + this.VesionNo + "MyDraftIncidentsCount";


    this.GetAppMenuConfig = this.MainUrl + this.VesionNo + "GetAppMenuConfig";


    ///////////////////////EMPLOYMENT//////////////////////////////////
    this.GET_STAFF_PROFILE = this.MainUrl + this.VesionNo + "StaffDetail/";
    this.GET_STAFF_ACCESS_LEVEL = this.MainUrl + this.VesionNo + "listStaffLevels";
    this.GET_LIST_STAFF_MEMBERS = this.MainUrl + this.VesionNo + "ListStaffMembers/all";//all
    this.GET_LIST_STAFF_CATEGORIES = this.MainUrl + this.VesionNo + "listStaffCategories";
    this.GET_LIST_VENUE_ALL = this.MainUrl + this.VesionNo + "ListVenues/all";
    this.GET_STAFF_CAT_FILTER = this.MainUrl + this.VesionNo + "ListStaffMembers/Category/";
    this.GET_LIST_VENUE_SECTOR = this.MainUrl + this.VesionNo + "ListVenueSector";
    this.GET_LIST_VENUE_CATEGORIES = this.MainUrl + this.VesionNo + "ListVenueCategories";
    this.GET_LIST_VENUE_BY_CATEGORIES = this.MainUrl + this.VesionNo + "ListVenuesByCategory/";
    this.GET_VENUE_DETAIL = this.MainUrl + this.VesionNo + "GetVenueDetails/";
    this.GET_STAFF_IMAGE = this.MainUrl + this.VesionNo + "getStaffImage/";
    this.GET_VENUE_IMAGE = this.MainUrl + this.VesionNo + "getVenueImage/";
    this.GET_LOCATION_WISE_FILTER = this.MainUrl + this.VesionNo + "ListStaffMembers";
    this.GET_VENUELIST_WISE_FILTER = this.MainUrl + this.VesionNo + "ListVenues";
    this.CHANGE_PASSWORD = this.MainUrl + this.VesionNo + "updatepassword";
    this.GET_STAFF_CATEGORIES = this.MainUrl + this.VesionNo + "listStaffCategories";
    this.ADD_STAFF = this.MainUrl + this.VesionNo + "insertstaff";
    this.UPDATE_STAFF = this.MainUrl + this.VesionNo + "updatestaff/";
    this.UPLOAD_STAFF_IMAGE = this.MainUrl + this.VesionNo + "UploadStaffFiles/";

    /////////////Comms and Task/////////////////////////

    this.CommsConfig = this.MainUrl + this.VesionNo + "GetCommsConfig/";
    this.ListStaff = this.MainUrl + this.VesionNo + "ListStaffMembers/all";
    this.InsertComms = this.MainUrl + this.VesionNo + "insertComms";
    this.UploadCommsFile = this.MainUrl + this.VesionNo + "UploadCommsFiles/";
    this.GetCommsDetails = this.MainUrl + this.VesionNo + "GetCommsDetails/";//https://api247.org/v1/GetCommsDetails/213/40529
    this.GetStaffImage = this.MainUrl + this.VesionNo + "getStaffImage/";//https://api247.org/v1/getStaffImage/{:staffid}/1 

    this.getTaskList = this.MainUrl + this.VesionNo + "list-tasks-checklists";
    this.getOverdueTask = this.MainUrl + this.VesionNo + "list-tasks-checklists/overdue";
    this.getCompleteTask = this.MainUrl + this.VesionNo + "list-tasks-checklists/completed";
    this.getPendingTask = this.MainUrl + this.VesionNo + "list-tasks-checklists/pending";
    this.getTaskDetails = this.MainUrl + this.VesionNo + "tasks-checklists-detail/";
    this.getTaskCount = this.MainUrl + this.VesionNo + "get-task-checklist-count";
    this.getVenueList = this.MainUrl + this.VesionNo + "ListVenues/myvenues/all";
    this.GET_ALL_MESSAGE = this.MainUrl + this.VesionNo + "listallmessages";
    this.COMMS_AND_TASK_INBOX = this.MainUrl + this.VesionNo + "listInmail";
    this.COMMS_AND_TASK_TRASH = this.MainUrl + this.VesionNo + "listtrash";
    this.COMMS_AND_TASK_SENT = this.MainUrl + this.VesionNo + "listsent";
    this.COMMS_AND_TASK_DRAFT = this.MainUrl + this.VesionNo + "listdraft";
    this.COMMS_AND_TASK_ALERT = this.MainUrl + this.VesionNo + "listalerts";
    this.COMMS_AND_TASK_COMMS = this.MainUrl + this.VesionNo + "listcomms";
    this.MESSAGE_UNREAD_COUNT = this.MainUrl + this.VesionNo + "get-notification-count";
    this.COMMS_AND_TASK_NOTIFICATION = this.MainUrl + this.VesionNo + "listnotifications";
    this.getNotificationCount = this.MainUrl + this.VesionNo + "get-notification-count";
    this.getListNotificationTask = this.MainUrl + this.VesionNo + "list-notification-tasks";
    this.getListNotificationAlerts = this.MainUrl + this.VesionNo + "list-notification-alerts";
    this.getListAppAlerts = this.MainUrl + this.VesionNo + "list-app-alerts";
    this.getListNotificationOverlay = this.MainUrl + this.VesionNo + "list-notification-overlay";
    this.getListNotificationEmails = this.MainUrl + this.VesionNo + "list-notification-emails";
    this.INMAIL_VIEW = this.MainUrl + this.VesionNo + "Readmessage/inbox";
    this.ALERT_VIEW = this.MainUrl + this.VesionNo + "Readmessage/alert";
    this.NOTIFICATION_VIEW = this.MainUrl + this.VesionNo + "Readmessage/notification";
    this.COMMS_VIEW = this.MainUrl + this.VesionNo + "Readmessage/comms";
    this.TRASH_VIEW = this.MainUrl + this.VesionNo + "Readmessage/archive";
    this.SENT_VIEW = this.MainUrl + this.VesionNo + "Readmessage/sent";
    this.DRAFTS_VIEW = this.MainUrl + this.VesionNo + "Readmessage/draft";  
    this.MESSAGES_DELETE = this.MainUrl + this.VesionNo + "deletemessages";
    this.LOG_OUT = this.MainUrl + this.VesionNo + "logout";
    this.COMPOSS_MAIL = this.MainUrl + this.VesionNo + "SendMail";
    this.COMPOSS_MAIL_ATTACHMENT = this.MainUrl + this.VesionNo +"AttachMail/"

    this.SendPushNotification = this.MainUrl2 + this.VesionNo + "pushnotifications";



    this.TASK_CHECKLIST = this.MainUrl + this.VesionNo + "list-tasks-checklists/";
    this.updateOnLineForm = this.MainUrl + this.VesionNo + "update-tasks-checklists/";
    this.APP_MENU = this.MainUrl + this.VesionNo + "GetAppMenuConfig";
    this.PushApiKey = "AIzaSyCNDEWGLyKpf-8nXw_pL9qejt_jSFI5d7U";
    this.PushServerKey = "AIzaSyB3sBygazehykRiu4HZaAOfEfYNerHEShM";
    this.PushSenderId = "134803807727";
    this.PushBrowserKey = "AIzaSyDYPCqteLYMBi8SL29GevKbcRL_EYTugcs";


}
