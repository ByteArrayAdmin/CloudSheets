/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  BackHandler,
  Dimensions,
  Alert,
} from "react-native";
import BackgroundLayout from "../../../commonComponents/Backgroundlayout/BackgroundLayout";
import Smlogo from "../../../assets/Images/smalllogo.svg";
import { welcomscreenstyle } from "./style";
import AuthCard from "../../../commonComponents/AuthCard";
import Custombutton from "../../../commonComponents/Button";
// import welocmehomelabel from "../../../utils/ProjectLabels.json";
import CommonBottomsheet from "../../../commonComponents/CommonBottomsheet";
import {
  current_UserInfo,
  create_Template,
  checkNetwork,
  get_Template_List,
} from "../../../API_Manager/index";
import {
  useNavigation,
  CommonActions,
  useIsFocused,
} from "@react-navigation/native";
import {
  track_Click_Event,
  track_Error_Event,
  track_Screen,
  track_Success_Event,
} from "../../../eventTracking/index";
import {
  clickName,
  errorActionName,
  eventName,
  screenName,
  successActionName,
} from "../../../utils/Constant";
import RegisterGuestUserPopup from "../../Popups/RegisterGuestUserPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import CreateTemplatePopup from "../../Popups/CreateTemplatePopup";
import labels from "../../../utils/ProjectLabels.json";
import uuid from "react-native-uuid";
import CommonLoader from "../../../commonComponents/CommonLoader";
import NetInfo from "@react-native-community/netinfo";
import SuspensionModal from "../../../commonComponents/SuspensionModal";

declare global {
  var labels: any;
  var isLoggedInUser: any;
  var isPremium: any;
}

const Homescreen = (props: any) => {
  var welocmehomelabel = global.labels;
  const isFocused = useIsFocused();
  const childRef = useRef(null);
  const child = useRef();
  const navigation = useNavigation();
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [isEditTemplate, setIsEditTemplate] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [templateCount, setTemplateCount] = useState(0);
  const snapPoints = [350, 400];

  // --------- Initial Rendering --------
  useEffect(() => {
    if (isFocused) {
      currentuser();
    }
    track_Screen(eventName.TRACK_SCREEN, screenName.HOME_TAB_SCREEN);
  }, [isFocused]);

  // ---------- Handle backHandler ---------
  useEffect(() => {
    const backAction = () => {
      if (isSheetOpen) {
        console.log("sheetIsOpen==========");
        child.current.childFunction2();
        setIsSheetOpen(false);
        return true;
      } else {
        console.log("sheetIsClosed==========");
        return false;
      }
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove(); // Clean up the event listener
  }, [isSheetOpen]);

  // ------------ Cancel Template modal -----------
  const cancelCreateTemplate = () => {
    setError("");
    child.current.childFunction2();
    setIsSheetOpen(false);
  };

  // ---------- Get Current userId ---------
  const currentuser = async () => {
    current_UserInfo()
      .then((response: any) => {
        console.log("currUser=====", response);
        if (response) {
          global.isLoggedInUser = true;
          setUserId(response.attributes.sub);
          global.userID = response.attributes.sub;
          getTemplateList(response.attributes.sub);
          let userInfo = response.attributes;
          const isSuspended =
            userInfo[labels.checkAccountSuspended.isSuspended];
          global.isPremium = userInfo[labels.checkPremium.isPremium];
          console.log("isAccountSuspended=========", isSuspended);
          if (isSuspended == "true") {
            setIsVisible(true);
          }
          syncDate(response.attributes.sub);
        } else {
          global.isLoggedInUser = false;
        }
      })
      .catch((error) => {
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        console.log("currentUserErr=======", error);
      });
  };

  // -------------- Get Template count by userId ----------
  const getTemplateList = (userId: string) => {
    setLoader(true)
    get_Template_List(userId)
      .then((response: any) => {
        console.log("resp==========", response);
        setLoader(false)
        let tempCount = response.data.templatesByUserID.items.length;
        setTemplateCount(tempCount);
      })
      .catch((error) => {
        setLoader(false)
        console.log("tempErr========", error);
      });
  };
  // -----------------Create Template functionality----------------
  const onCreateTemplate = async (templateName: String) => {
    let arr1 = templateList;
    console.log("templateName===========", templateName);
    let uid = uuid.v1().toString();
    let timeStamp = moment().unix().toString();
    let newUniqueId = uid + "-" + timeStamp;
    console.log("UniqueId========", newUniqueId);
    const newTemplate = {
      id: newUniqueId,
      template_name: templateName,
      userID: userId,
      soft_Deleted: false,
    };
    console.log("rowData======", newTemplate);
    if (global.isLoggedInUser) {
      setLoader(true);
      create_Template(newTemplate)
        .then((response: any) => {
          console.log("createTempResp=======", response);
          setLoader(false);
          arr1.push(response.data.createTemplates);
          setTemplateList(arr1);
          setIsSheetOpen(false);
          child.current.childFunction2();
          track_Success_Event(
            eventName.TRACK_SUCCESS_ACTION,
            successActionName.CREATE_TEMPLATE_SUCCESSFULLY
          );
          navigation.navigate("CreatSpreadsheet", {
            template: response.data.createTemplates,
            isEdit: isEditTemplate,
            isFrom: "HomeTab",
          });
          setExtraData(new Date());
        })
        .catch((err) => {
          setLoader(false);
          if (err.isConnected == false) {
            Alert.alert(labels.checkNetwork.networkError);
          }
          track_Error_Event(
            eventName.TRACK_ERROR_ACTION,
            errorActionName.CREATE_TEMPLATE_ERROR
          );
          console.log("createTempErr=======", err);
        });
    } else {
      let guestArr = [];
      guestArr.push(newTemplate);
      await AsyncStorage.setItem(
        labels.TabBarTemplateList.guestUserTemplateList,
        JSON.stringify(guestArr)
      );
      setTemplateList(guestArr);
      setExtraData(new Date());
      child.current.childFunction2();
    }
  };

  const CheckValidation = (templateName: String) => {
    if (templateName == "" || templateName == undefined) {
      setError(labels.TabBarTemplateList.TemplateErr);
    } else {
      track_Click_Event(eventName.TRACK_CLICK, clickName.AGREE_CREATE_TEMPLATE);
      onCreateTemplate(templateName);
    }
  };

  // ---------- sync guestUser Template to logInUser ---------
  const syncDate = async (userId: string) => {
    await AsyncStorage.getItem(
      welocmehomelabel.TabBarTemplateList.guestUserTemplateList
    ).then((response: any) => {
      if (response != null) {
        let dataParse = JSON.parse(response);
        const newTemplate = {
          id: dataParse[0].id,
          template_name: dataParse[0].template_name,
          userID: userId,
          soft_Deleted: false,
        };
        create_Template(newTemplate)
          .then(async (response) => {
            console.log("syncDataResp========", response);
            await AsyncStorage.removeItem(
              welocmehomelabel.TabBarTemplateList.guestUserTemplateList
            );
          })
          .catch((error) => {
            console.log("syncDataError======", error);
          });
      }
    });
  };

  // ------------- Guest user Popup ------------
  const onCreateCloudsheet = () => {
    //Toggling the visibility state of the bottom sheet
    if (global.isLoggedInUser) {
      if (
        global.isPremium == "false" &&
        templateCount >= labels.trialConstants.trial_Template_Limit
      ) {
        Alert.alert(labels.limitConstants.template_Limit_Exceed)
      } else {
        setError("");
        setIsSheetOpen(true);
        child.current.childFunction1();
      }
    } else {
      setRegisterModalVisible(!registerModalVisible);
    }
  };

  // ------------ Register guest user flow ---------
  const onClickRegister = () => {
    setRegisterModalVisible(!registerModalVisible);
    navigation.dispatch(
      CommonActions.reset({
        routes: [{ name: "Signupscreen" }],
      })
    );
  };

  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={welcomscreenstyle.container}>
          <View style={welcomscreenstyle.logoview}>
            <Smlogo />
          </View>
          <View style={welcomscreenstyle.welcomtextview}>
            <Text style={welcomscreenstyle.cloudtext}>
              {welocmehomelabel?.HomeWelcomeScreen?.CLOUDSHEETS}
            </Text>
            <Text style={welcomscreenstyle.sheettext}>
              {welocmehomelabel?.HomeWelcomeScreen?.SHEETS}
            </Text>
          </View>
          <View style={welcomscreenstyle.cardspace}>
            <AuthCard
              subchildren={
                <>
                  <View style={welcomscreenstyle.subcard}>
                    <View style={welcomscreenstyle.textview}>
                      <Text style={welcomscreenstyle.welcometotext}>
                        {welocmehomelabel?.HomeWelcomeScreen?.WELCOMETO}
                      </Text>
                    </View>
                    <View>
                      <Text style={welcomscreenstyle.cloudsheettext}>
                        {
                          welocmehomelabel?.HomeWelcomeScreen
                            ?.Clodesheetcardtext
                        }
                      </Text>
                    </View>
                    <View style={welcomscreenstyle.secondcardtext}>
                      <Text style={welcomscreenstyle.cardtext}>
                        {welocmehomelabel?.HomeWelcomeScreen?.Cardtext}
                      </Text>
                      <Text style={welcomscreenstyle.cardtext}>
                        {welocmehomelabel?.HomeWelcomeScreen?.Cardtexttwo}
                      </Text>
                    </View>
                  </View>
                  <Custombutton
                    Register={welocmehomelabel.HomeWelcomeScreen.buttontext}
                    // onPress={() => OpenCreateTemplatePopup()}
                    onPress={() => onCreateCloudsheet()}
                  />
                </>
              }
            />
          </View>
        </View>
        <RegisterGuestUserPopup
          visible={registerModalVisible}
          onClickRegister={() => onClickRegister()}
          toggleRegisterModal={() => setRegisterModalVisible(false)}
        />
        <CommonBottomsheet ref={childRef} />
        <CommonBottomsheet
          ref={child}
          snapPoints={snapPoints}
          onBackdropPress={() => setIsSheetOpen(false)}
          children={
            <CreateTemplatePopup
              error={error}
              OnCloseCreateTemplate={() => cancelCreateTemplate()}
              isEditTemplate={isEditTemplate}
              selectedTemplate={selectedTemplate}
              onCreateTemplate={(templateName: String) =>
                CheckValidation(templateName)
              }
            />
          }
        />
        {loader ? <CommonLoader /> : null}
        {
          <SuspensionModal
            visible={isVisible}
            onPress={() => {
              setIsVisible(false),
                navigation.navigate("Customer_Support_Screen", {
                  suspended: true,
                });
            }}
          />
        }
      </SafeAreaView>
    </>
  );
};

export default Homescreen;
