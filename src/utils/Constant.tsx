import React from 'react';
import Ic_word  from '../assets/Images/ic_word.svg';
import Ic_number  from '../assets/Images/ic_number.svg';
import Ic_pickList  from '../assets/Images/ic_pickList.svg';
import Ic_chooseDate  from '../assets/Images/ic_chooseDate.svg';
import Ic_emailPhone  from '../assets/Images/ic_emailPhone.svg';
import Ic_physicalAddress  from '../assets/Images/ic_physicalAddress.svg';
import Ic_barcode  from '../assets/Images/ic_barcode.svg';
import Ic_yesNo from '../assets/Images/ic_yesNo.svg';
import moment from "moment";

export const emailRegex = /^\w+([\.-]?\w+)*@(\w+([\.-]?\w+)*\.(\w{2,3}|tech))$/


export const FONTS = {
  MANROPE_NORMAL: "Manrope-Regular",
  inter_regular: "Inter-Regular",
  inter_bold: "Inter-Bold",
  inter_semibold: "Inter-Semibold",
  manrope_bold: "Manrope-Bold",
  manrope_semibold: "Manrope-SemiBold",
  inter_medium: "Inter-Medium",
  manrope_medium: "Manrope-Medium",
};
export const COLOURS = {
  white: "#FFFFFF",
  Skyblue: "#0061FF",
  black: "#001521",
  offwhite: "#F6F8FA",
  GREY: "#ECEEF0",
  ligthwhite: "rgba(255, 255, 255, 0.1)",
  whitepointfive: "rgba(255, 255, 255, 1)",
  red: "#FF0000",
  lightgrey: "#E7EFF6",
  shadowcolour: "#000",
  lightred:"rgba(255, 120, 120, 0.12)",
  orignalred:"#FF7878",
  offGrey:" #ECEFF2",
  Simplegrey:"#5D6886",
 verydarkgrey: "#171717",
 darkblue:"#16213E",
 shadow_colour:"#000",
 cardBorder_lightBlue:"rgba(0, 97, 255, 0.5)",
 inActiveTabColor: "#7C8BA6"
};

export const columnTypeList = [
  {
    label: 'Words or Sentences',
    value: 'Sentences',
    icon:() =><Ic_word/>
  },
  {
    label:"Numbers",
    value:"Numbers",
    icon:() =><Ic_number/>
  },
  {
    label:"Yes or No Choice",
    value:"Yes/No",
    icon:() =><Ic_yesNo/>
  },
  {
    label:"Pick from a List",
    value:"List",
    icon:() =><Ic_pickList/>
  },
  
  {
    label:"Choose a Date",
    value:"Date",
    icon:() =><Ic_chooseDate/>
  },
  {
    label:"Email or Phone",
    value:"EmailPhone",
    icon:() =><Ic_emailPhone/>
  },
  {
    label:"Scan Image or Barcode",
    value:"Barcode",
    icon:() =><Ic_barcode/>
  },
  {
    label:"Physical Address",
    value:"Address",
    icon:() =><Ic_physicalAddress/>
  },
]

export const yesNoArray = [
  "Yes","No"
]

export const screenName ={
  CLOUDSHEET_TAB_SCREEN:"cloudSheetTabScreen",
  HOME_TAB_SCREEN: "homeTabScreen",
  TEMPLATE_TAB_SCREEN: "templateTabScreen",
  USER_TAB_SCREEN: "userTabScreen",
  PROFILE_SCREEN: "profileScreen",
  CUSTOMER_SUPPORT_SCREEN: "customerSupportScreen",
  CHANGE_PASSWORD_SCREEN: "changePasswordScreen",
  RATEUS_SCREEN: "rateusScreen",
  PRIVACY_POLICY_SCREEN: "privacyPolicyScreen",
  TERMS_AND_CONDITIONS_SCREEN: "termsAndConditionsScreen",
  FAQ_SCREEN: "faqScreen",
  HELP_SCREEN: "helpScreen",
  SPREADSHEET_LISTSCREEN: "spreadSheetListScreen",
  SPREADSHEET_ROWLIST_SCREEN: "spreadSeetRowListScreen",
  CREATE_TEMPLATE_MODAL: "createTemplateModal",
  EDIT_TEMPLATE_MODAL: "editTemplateModal",
  ADD_COLUMN_SCREEN: "addColumnScreen",
  EDIT_COLUMN_SCREEN: "editColumnScreen",
  CREATE_SPREADSHEET_SCREEN: 'createSpreadsheetScreen',
  ADD_SPREADSHEET_ROW_SCREEN: 'addSpreadsheetRowScreen',
  EDIT_SPREADSHEET_ROW_SCREEN: 'editSpreadsheetRowScreen',
  SPREADSHEET_ROW_LIST_SCREEN: 'spreadSheetRowListScreen',
  EXISTING_TEMPLATE_LIST_SCREEN: 'existingTemplateListScreen',
  SELECT_CREATE_SPREADSHEET_OPTION_MODAL: 'selectCreateSpreadsheetOptionModal',
  CREATE_SPREADSHEET_MODAL: 'createSpreadsheetModal',
  EDIT_SPREADSHEET_MODAL: 'editSpreadsheetModal',
  DELETE_TEMPLATE_ALERT: 'deleteTemplateAlert',
  DELETE_SPREADSHEET_ALERT: 'deleteSpreadsheetAlert',
  DELETE_SPREADSHEET_ROW_ALERT: 'deleteSpreadsheetRowAlert',
  OTP_VERIFY_SCREEN: 'otpVerifyScreen',
  LOGIN_SCREEN: 'loginScreen',
  SIGNUP_SCREEN: 'signUpScreen'
}
export const clickName = {
  CANCEL_DELETE_TEMPLATE_ALERT: 'cancelDeleteTemplateAlert',
  AGREE_DELETE_TEMPLATE_ALERT: 'agreeDeleteTemplateAlert',
  CANCEL_CREATE_TEMPLATE:'cancelCreateTemplate',
  AGREE_CREATE_TEMPLATE: 'agreeCreateTemplate',
  AGREE_UPDATE_TEMPLATE: 'agreeUpdateTemplate',
  SELECT_EDIT_TEMPLATE: 'selectEditTemplate',
  CANCEL_UPDATE_TEMPLATE: 'cancelUpdateTemplate',
  OPEN_CREATE_TEMPLATE_MODAL:'openCreateTemplateModal',
  OPEN_CREATE_SPREADSHEET_MODAL: 'openCreateSpreadsheetModal',
  CANCEL_UPDATE_SPREADSHEET_MODAL: 'cancelUpdateSpreadsheetModal',
  CANCEL_CREATE_SPREADSHEET_MODAL: 'cancelCreateSpreadsheetModal',
  CLICK_ON_CREATE_SPREADSHEET: 'clickOnCreateSpreadsheet',
  OPEN_SPREADSHEET_ACTION_MODAL: 'openSpreadsheetActionModal',
  OPEN_EDIT_SPREADSHEET_MODAL: 'openEditSpreadsheetModal',
  CLICK_ON_UPDATE_SPREADSHEET:'clickOnUpdateSpreadsheet',
  SELECT_DELETE_SPREADSHEET: 'selectDeleteSpreadsheet',
  CANCEL_DELETE_SPREADSHEET: 'cancelDeleteSpreadsheet',
  OPEN_SPREADSHEET_ROW_ACTION_MODAL: 'openSpreadsheetRowActionModal',
  SELECT_EDIT_SPREADSHEET_ROW: 'selectEditSpreadsheetRow',
  SELECT_ADD_SPREADSHEET_ROW: 'selectAddSpreadsheetRow',
  SELECT_DELETE_SPREADSHEET_ROW: 'selectDeleteSpreadsheetRow',
  SELECT_CANCEL_DELETE_SPREADSHEET_ROW: 'selectCancelDeleteSpreadsheetRow',
  SELECT_ADD_COLUMN: 'selectAddColumn',
  OPEN_REMOVE_COLUMN_ALERT: 'openRemoveColumnAlert',
  SELECT_CANCEL_REMOVE_COLUMN: 'selectCancelRemoveColumn',
  SELECT_DELETE_REMOVE_COLUMN: 'selectDeleteRemoveColumn',
  ADD_COLUMN: 'addColumn',
  CREATE_SPREADSHEET_NAME: 'createSpreadsheetName',
  CLICK_ON_ADD_SPREADSHEET_ROW: 'clickOnAddSpreadsheetRow',
  CLICK_ON_UPDATE_SPREADSHEET_ROW: 'clickOnUpdateSpreadsheetRow',
  CLICK_ON_UPDATE_PROFILE: 'clickOnUpdateProfile',
  CLICK_ON_OTP_VERIFY: 'clickOnOTpVerify',
  CLICK_ON_RESEND_OTP: 'clickOnResendOTP',
  CLICK_UPDATE_PASSWORD: 'clickOnUpdatePassword',
  CLICK_ON_SIGN_OUT: 'clickOnSignOut',
  CLICK_ON_REGISTER: 'clickOnRegister',
  CLICK_ON_PROFILE_TAB : 'clickOnProfileTab',
  CLICK_ON_CHANGE_PASSWORD_TAB: 'clickOnChanagePasswordTab',
  CLICK_ON_RATE_US_TAB: 'clickOnRateUsTab',
  CLICK_ON_PRIVACY_POLICY_TAB: 'clickOnPrivacyPolicyTab',
  CLICK_ON_CUSTOMER_SUPPORT_TAB: 'clickOnCustomerSupportTab',
  CLICK_ON_TERMS_AND_CONDITIONS_TAB: 'clickOnTermsAndConditionsTab',
  CLICK_ON_FAQ_TAB: 'clickOnFAQTab',
  CLICK_ON_HELP_TAB: 'clickOnHelpTab',
  CLICK_ON_SKIP_LOGIN: 'clickOnSkipLogin',
  CLICK_ON_LOGIN: 'clickOnLogin',
  CLICK_ON_FORGOT_PASSWORD: 'clickOnForgotPassword',
  CLICK_ON_SIGN_UP: 'clickOnSignUp',
  CLICK_ON_SKIP_SIGNUP: 'clickOnSkipSignup',
  CLICK_ON_ALREADY_A_MEMBER_NAVIGATE_TO_LOGIN: 'clickOnAlreadyAMemberNavigateToLogin'

}
export const successActionName = {
  DELETE_TEMPLATE_SUCCESSULLY: 'deleteTemplateSuccessfully',
  CREATE_TEMPLATE_SUCCESSFULLY: 'createTemplateSuccessfully',
  UPDATE_TEMPLATE_SUCCESSFULLY:'updateTemplateSuccessfully',
  CREATE_SPREADSHEET_SUCCESSFULLY: 'createSpreadsheetSuccessfully',
  UPDATE_SPREADSHEET_SUCCESSFULLY:'updateSpreadsheetSuccessfully',
  DELETE_SPREADSHEET_SUCCESSFULLY: 'deleteSpreadsheetSuccessfully',
  DELETE_SPREADSHEET_ROW_SUCCESSFULLY: 'deleteSpreadsheetRowSuccessfully',
  DELETE_COLUMN_SUCCESSFULLY: 'deleteColumnSuccessfully',
  COLUMN_CREATE_SUCCESSFULLY: 'columnCreateSuccessfully',
  CREATE_SPREADSHEET_NAME_SUCCESSFULLY: 'createSpreadsheetNameSuccessfully',
  CREATE_SPREADSHEET_ROW_SUCCESSFULLY: 'createSpreadsheetRowSuccessfully',
  UPDATE_SPREADSHEET_ROW_SUCCESSFULLY: 'updateSpreadsheetRowSuccessfully',
  UPDATE_PROFILE_SUCCESSFULLY: 'updateProfileSuccessfully',
  SIGNUP_OTP_VERIFY_SUCCESSFULLY: 'signupOTPVerifySuccessfully',
  CHANGE_PASSWORD_OTP_VERIFY_SUCCESSFULLY: 'changePasswordOTPVerifySuccessfully',
  RESEND_PASSWORD_SUCCESSFULLY: 'resendPasswordSuccessfully',
  CHANGE_PASSWORD_SUCCESSFULLY: 'changePasswordSuccessfully'

}
export const errorActionName = {
    DELETE_TEMPLATE_ERROR: 'deleteTemplateError',
    CREATE_TEMPLATE_ERROR: 'createTemplateError',
    UPDATE_TEMPLATE_ERROR: 'updateTemplateError',
    CREATE_SPREADSHEET_ERROR: 'createSpreadsheetError',
    UPDATE_SPREADSHEET_ERROR: 'updateSpreadsheetError',
    DELETE_SPREADSHEET_ERROR: 'deleteSpreadsheetError',
    DELETE_SPREADSHEET_ROW_ERROR: 'deleteSpreadsheetRowError',
    DELETE_COLUMN_ERROR: 'deleteColumnError',
    CREATE_COLUMN_ERROR: 'createColumnError',
    CREATE_SPREADSHEET_NAME_ERROR: 'createSpreadsheetNameError',
    CREATE_SPREADSHEET_ROW_ERROR: 'createSpreadsheetRowError',
    UPDATE_SPREADSHEET_ROW_ERROR: 'updateSpreadsheetRowError',
    UPDATE_PROFILE_ERROR: 'updateProfileError',
    SIGNUP_OTP_VERIFY_ERROR: 'signupOTPVerifyError',
    CHANGE_PASSWORD_OTP_VERIFY_ERROR: 'changePasswordOTPVerifyError',
    RESEND_PASSWORD_ERROR: 'resendPasswordError',
    CHANGE_PASSWORD_ERROR: 'changePasswordError',
    SIGN_OUT_ERROR: 'signOutError',
    SIGN_IN_ERROR: 'signInError',
    SIGN_UP_ERROR: 'signupError'
}
export const eventName = {
  TRACK_SCREEN: 'track_Screen',
  TRACK_CLICK: 'track_Click',
  TRACK_SUCCESS_ACTION: 'track_Success_Action',
  TRACK_ERROR_ACTION: 'track_Error_Action',
}

export const renderValue = (rowDate:any) => {
  let value = "";
  rowDate.forEach((element: any) => {
    if (element.column_Type == "Sentences") {
      value = element.column_Value;
    }
    if (value == "" && element.column_Type == "Date") {
      value = moment(element.column_Value).format("MMM DD, YYYY");
    }
  });
  return value;
};
