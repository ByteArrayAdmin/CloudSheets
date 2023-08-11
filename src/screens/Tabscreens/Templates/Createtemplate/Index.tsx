import React, { useRef, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  DeviceEventEmitter,
  BackHandler,
} from "react-native";
import BackgroundLayout from "../../../../commonComponents/Backgroundlayout/BackgroundLayout";
import Smlogo from "../../../../assets/Images/smalllogo.svg";
import AuthCard from "../../../../commonComponents/AuthCard";
import Custombutton from "../../../../commonComponents/Button";
// import CreateTemplatescreen from "../../../../utils/ProjectLabels.json";
import Templatelogo from "../../../../assets/Images/Templatelogo.svg";
import { Tempatestyle } from "./Style";
import {
  useNavigation,
  CommonActions,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import CreateTemplatePopup from "./../../../Popups/CreateTemplatePopup";
import EditDeleteCloudsheet from "../../../../screens/Popups/Edit_Delete_Cloudsheet";
import {
  create_Template,
  update_Template,
  current_UserInfo,
  get_Template_List,
  soft_delete_template,
  checkNetwork,
} from "../../../../API_Manager/index";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import Card from "../TabBarTemplateList/Card";
// import labels from "../../../../utils/ProjectLabels.json";
import Folder from "../../../../assets/Images/folder12.svg";
import Addwidgeticon from "../../../../assets/Images/Addwidgeticon.svg";
import { styles } from "../TabBarTemplateList/style";
import uuid from "react-native-uuid";
import moment from "moment";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import CommonLoader from "../../../../commonComponents/CommonLoader";
import {
  track_Screen,
  track_Click_Event,
  track_Success_Event,
  track_Error_Event,
} from "../../../../eventTracking/index";
import {
  eventName,
  screenName,
  clickName,
  successActionName,
  errorActionName,
} from "../../../../utils/Constant";
import RegisterGuestUserPopup from "../../../Popups/RegisterGuestUserPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
declare global {
  var labels: any;
  var userID: string;
}
const CreateTemplate = () => {
  // --------- File States -----------
  var labels = global.labels;
  const child = useRef();
  const editTempRef = useRef();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const [userId, setUserId] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [isEditTemplate, setIsEditTemplate] = useState(false);
  const [extraData, setExtraData] = useState(new Date());
  const bottomTabHeight = useBottomTabBarHeight();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [isGlobal, setIsGlobal] = useState(false);
  const [isRefNull, setIsRefNull] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [navigateId, setNavigateId] = useState("");

  useEffect(() => {
    const refreshTemplate = DeviceEventEmitter.addListener(
      "refreshTemplateList",
      () => getTemplateList()
    );

    if (global.isLoggedInUser) {
      getTemplateList();
    } else {
      getGuestUserTemplates();
    }
    track_Screen(eventName.TRACK_SCREEN, screenName.TEMPLATE_TAB_SCREEN);
    return () => {
      // Run this code when the component unmounts or the dependencies change
      refreshTemplate.remove(); // Clean up the event listener
      setIsRefNull(false);
      console.log("Component unmounted");
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (isSheetOpen) {
        console.log("sheetIsOpen==========");
        child.current.childFunction2();
        editTempRef.current.childFunction2();
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

  // --------- Get Guest user Template List --------
  const getGuestUserTemplates = async () => {
    await AsyncStorage.getItem(
      labels.TabBarTemplateList.guestUserTemplateList
    ).then((response: any) => {
      console.log("guestTemp==========", response);
      if (response != null) {
        let parseTemplate = JSON.parse(response);
        setTemplateList(parseTemplate);
      }
    });
  };

  //  --------- update Guest Template ------------

  const updateGuestTemplate = async (templateName: string) => {
    let arr1 = [];
    const newTemplate = {
      id: selectedTemplate.id,
      template_name: templateName,
      userID: global.userID,
      soft_Deleted: false,
    };
    arr1.push(newTemplate);
    await AsyncStorage.setItem(
      labels.TabBarTemplateList.guestUserTemplateList,
      JSON.stringify(arr1)
    );

    setTemplateList(arr1);
    setExtraData(new Date());
    child.current.childFunction2();
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

  // ------------ Select Create Template Popup --------
  const toggleBottomNavigationView = () => {
    setIsRefNull(true);
    setIsEditTemplate(false);
    setSelectedTemplate(null);
    setError("");
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.OPEN_CREATE_TEMPLATE_MODAL
    );
    if (global.isLoggedInUser) {
      if (
        global.isPremium == "false" &&
        templateList.length >= labels.trialConstants.trial_Template_Limit
      ) {
        Alert.alert(labels.limitConstants.template_Limit_Exceed);
      } else {
        setIsSheetOpen(true);
        child.current.childFunction1();
      }
    } else {
      if (templateList.length > 0) {
        setRegisterModalVisible(true);
      } else {
        child.current.childFunction1();
        setIsSheetOpen(true);
      }
    }
  };

  // ----------- Create New Template Popup -----------
  const cancelCreateTemplate = () => {
    setError("");
    child.current.childFunction2();
    setIsSheetOpen(false);
  };

  // ----------- Open Create Template popup ----------
  const OpenPopup = (item: any) => {
    console.log("selectedTemp========", item);
    setSelectedTemplate(item);
    setIsSheetOpen(true);
    editTempRef.current.childFunction1();
    setIsSheetOpen(true);
  };

  // -----------------Get Curent user TemplateList pull to Refresh----------------
  const onRefreshList = () => {
    getTemplateList();
  };

  // -----------------Get Curent user TemplateList----------------
  const getTemplateList = () => {
    let arr = [];
    setLoader(true);
    get_Template_List(global.userID)
      .then((response: any) => {
        console.log("getTempResp=======", response);
        setLoader(false);
        let templateList = response.data.templatesByUserID.items;
        templateList.sort(function compare(a, b) {
          var dateA = new Date(a.updatedAt);
          var dateB = new Date(b.updatedAt);
          return dateB - dateA;
        });
        setTemplateList(templateList);
      })
      .catch((error) => {
        console.log("getTempErr======", error);
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        setLoader(false);
      });
  };

  // --------- Check Form validation -----------
  const CheckValidation = (templateName: String) => {
    if (templateName == "" || templateName == undefined) {
      setError(labels.TabBarTemplateList.TemplateErr);
    } else {
      track_Click_Event(eventName.TRACK_CLICK, clickName.AGREE_CREATE_TEMPLATE);
      onCreateTemplate(templateName);
      setError(" ");
    }
  };

  // -----------------Create Template functionality----------------
  const onCreateTemplate = async (templateName: String) => {
    let arr1 = templateList;
    let newTemp;
    console.log("templateName===========", templateName);
    let uid = uuid.v1().toString();
    let timeStamp = moment().unix().toString();
    let newUniqueId = uid + "-" + timeStamp;
    console.log("UniqueId========", newUniqueId);
    const newTemplate = {
      id: newUniqueId,
      template_name: templateName,
      userID: global.userID,
      soft_Deleted: false,
    };
    console.log("rowData======", newTemplate);

    if (global.isLoggedInUser) {
      setLoader(true);
      create_Template(newTemplate)
        .then((response: any) => {
          console.log("createTempResp=======", response);
          setLoader(false);
          arr1.unshift(response.data.createTemplates);
          setTemplateList(arr1);
          child.current.childFunction2();
          track_Success_Event(
            eventName.TRACK_SUCCESS_ACTION,
            successActionName.CREATE_TEMPLATE_SUCCESSFULLY
          );
          navigation.navigate("CreatSpreadsheet", {
            template: response.data.createTemplates,
            isEdit: isEditTemplate,
            isFrom: "TemplateTab",
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

  // -------------- check Edit validation -----------

  const CheckEditValidation = (
    templateName: any,
    templateId: any,
    version: any,
    softDeleted: boolean
  ) => {
    if (templateName == "" || templateName == undefined) {
      setError(labels.TabBarTemplateList.TemplateErr);
    } else {
      onUpdateTemplates(templateName, templateId, version, softDeleted);
      setError(" ");
    }
  };

  // -----------------Update Template functionality----------------
  const onUpdateTemplates = (
    templateName: any,
    templateId: any,
    version: any,
    softDeleted: boolean
  ) => {
    track_Click_Event(eventName.TRACK_CLICK, clickName.AGREE_UPDATE_TEMPLATE);
    let arr1 = templateList;
    arr1.forEach((element) => {
      if (element.id == templateId) {
        element.template_name = templateName;
      }
    });
    setTemplateList(arr1);
    setExtraData(new Date());
    setIsEditTemplate(false);
    child.current.childFunction2();
    const updateTemplate = {
      id: templateId,
      template_name: templateName,
      userID: global.userID,
      _version: version,
      soft_Deleted: softDeleted,
    };
    console.log("updatedRow==========", updateTemplate);
    setLoader(true);
    update_Template(updateTemplate)
      .then((response: any) => {
        setLoader(false);
        console.log("updateTemplate========", response);
        track_Success_Event(
          eventName.TRACK_SUCCESS_ACTION,
          successActionName.UPDATE_TEMPLATE_SUCCESSFULLY
        );
        // navigation.navigate("CreatSpreadsheet", {
        //   template: response.data.updateTemplates,
        //   isEdit: isEditTemplate,
        // });
      })
      .catch((error) => {
        setLoader(false);
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.UPDATE_TEMPLATE_ERROR
        );
        console.log("updateTempErr=======", error);
      });
  };

  // ----------- Delete Row Alert ------------
  const deleteAlert = () => {
    track_Screen(eventName.TRACK_SCREEN, screenName.DELETE_TEMPLATE_ALERT);
    editTempRef.current.childFunction2();
    Alert.alert(
      labels.ExpensesList.Delete_Template,
      labels.ExpensesList.Delete_Template_Quete,
      [
        {
          text: labels.ExpensesList.Cancel,
          onPress: () => {
            console.log("Cancel Pressed"),
              track_Click_Event(
                eventName.TRACK_CLICK,
                clickName.CANCEL_DELETE_TEMPLATE_ALERT
              );
          },
          style: "cancel",
        },
        {
          text: labels.ExpensesList.OK,
          onPress: () =>
            global.isLoggedInUser ? checkInternet() : deleteGuestTemplate(),
        },
      ]
    );
  };

  // ------------- Delete guestTemplate -----------
  const deleteGuestTemplate = async () => {
    await AsyncStorage.removeItem(
      labels.TabBarTemplateList.guestUserTemplateList
    );
    setTemplateList([]);
    setExtraData(new Date());
  };

  // ----------- get network ------------
  const checkInternet = () => {
    checkNetwork()
      .then((isConnected) => {
        console.log("isConectedResp=======", isConnected);
        if (isConnected) {
          onDeleteTemplate();
        } else {
          Alert.alert(labels.checkNetwork.networkError);
        }
      })
      .catch((error) => {
        console.log("networkErr======", error);
      });
  };
  // -----------------Delete Template functionality----------------
  const onDeleteTemplate = () => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.AGREE_DELETE_TEMPLATE_ALERT
    );
    const deleteTemplate = {
      id: selectedTemplate.id,
      template_name: selectedTemplate.template_name,
      userID: selectedTemplate.userID,
      _version: selectedTemplate._version,
      soft_Deleted: true,
    };
    console.log("deleteTemplate=======", deleteTemplate);
    setLoader(true);
    soft_delete_template(deleteTemplate)
      .then((response: any) => {
        console.log("colId=======", response);
        let arr1 = templateList;
        let index;
        arr1.forEach((element) => {
          if (element.id == selectedTemplate.id) {
            index = arr1.indexOf(element);
          }
        });
        arr1.splice(index, 1);
        setTemplateList(arr1);
        setExtraData(new Date());
        setLoader(false);
        DeviceEventEmitter.emit("updateSpreadSheetList");
        track_Success_Event(
          eventName.TRACK_SUCCESS_ACTION,
          successActionName.DELETE_TEMPLATE_SUCCESSULLY
        );
      })
      .catch((error) => {
        setLoader(false);
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        console.log("getColErr======", error);
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.DELETE_TEMPLATE_ERROR
        );
      });
  };

  // ------------- On Edit Template --------------
  const onEditTemplate = () => {
    setIsEditTemplate(true);
    child.current.childFunction2();
    navigation.navigate("CreatSpreadsheet", {
      template: selectedTemplate,
      isEdit: true,
    });
  };

  // --------------Open Edit Template Name popup functionality-------------------
  const onEditTemplateName = () => {
    setIsSheetOpen(true);
    console.log("sheetStatusOnEdit=======", isSheetOpen);
    editTempRef.current.childFunction2();
    child.current.childFunction1();

    track_Click_Event(eventName.TRACK_CLICK, clickName.SELECT_EDIT_TEMPLATE);
    setIsEditTemplate(true);
  };
  const snapPoints = [350, 400];
  const EditSnapPoints = ["60%"];

  // -------------navigate to detail Screen functionality on Double Tap---------------
  const onDoubleTab = (template: any) => {
    if (navigateId == "") {
      setTimeout(() => {
        setNavigateId("");
      }, 1000);
      setNavigateId(template.id);
    } else {
      if (navigateId == template.id) {
        setNavigateId("");
        // navigation.navigate("TemplateList", { template: template });
        navigation.navigate("CreatSpreadsheet", {
          template: template,
          isEdit: true,
        });
      } else {
        setTimeout(() => {
          setNavigateId("");
        }, 1000);
        setNavigateId(template.id);
      }
    }
  };

  const renderItems = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        onDoubleTab(item);
      }}
    >
      <Card item={item} onEditTemplate={() => OpenPopup(item)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {templateList.length > 0 ? (
        <>
          <View
            style={[styles.container, { marginBottom: bottomTabHeight + 20 }]}
          >
            <NewCommonHeader
              // BackButton={<BackButton onPress={() => navigation.goBack()} />}
              heading={labels.TabBarTemplateList.Template}
              Folder={<Folder />}
            />
            <View style={styles.Flatlistviewone}>
              <FlatList
                data={templateList}
                renderItem={renderItems}
                extraData={extraData}
                refreshing={false}
                onRefresh={onRefreshList}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.widgetposition}
            onPress={() => toggleBottomNavigationView()}
          >
            <Addwidgeticon />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <BackgroundLayout />
          <SafeAreaView style={Tempatestyle.safeareaview}>
            <View style={Tempatestyle.container}>
              <View style={Tempatestyle.logoview}>
                <Smlogo />
              </View>
              <View style={Tempatestyle.cloudview}>
                <Text style={Tempatestyle.cloudtext}>
                  {labels.CreateTemplatescreen.Cloud}
                </Text>
                <Text style={Tempatestyle.sheetetxt}>
                  {labels.CreateTemplatescreen.Sheets}
                </Text>
              </View>

              <View style={Tempatestyle.authcardview}>
                <AuthCard
                  subchildren={
                    <>
                      <View style={Tempatestyle.Cardcontainer}>
                        <View style={Tempatestyle.subcontainer}>
                          <View>
                            <Templatelogo />
                          </View>
                          <View style={Tempatestyle.cartdtetxt}>
                            <View>
                              <Text style={Tempatestyle.cardtextstyle}>
                                {labels.CreateTemplatescreen.CARDTEXT}
                              </Text>
                            </View>
                            <View style={Tempatestyle.cardtetxt2}>
                              <Text style={Tempatestyle.cardtextstyle}>
                                {labels.CreateTemplatescreen.CARDTEXT2}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <Custombutton
                          Register={labels.CreateTemplatescreen.CreateTemplate}
                          onPress={() => toggleBottomNavigationView()}
                        />
                      </View>
                    </>
                  }
                />
              </View>
            </View>
          </SafeAreaView>
        </>
      )}

      <CommonBottomsheet
        ref={child}
        snapPoints={snapPoints}
        onBackdropPress={() => {}}
        children={
          <CreateTemplatePopup
            error={error}
            OnCloseCreateTemplate={() => cancelCreateTemplate()}
            isEditTemplate={isEditTemplate}
            selectedTemplate={selectedTemplate}
            onCreateTemplate={(templateName: String) =>
              CheckValidation(templateName)
            }
            onUpdateTemplate={(
              templateName: any,
              templateId: any,
              version: any,
              softDeleted: boolean
            ) =>
              global.isLoggedInUser
                ? CheckEditValidation(
                    templateName,
                    templateId,
                    version,
                    softDeleted
                  )
                : updateGuestTemplate(templateName)
            }
          />
        }
      />
      <View>
        <CommonBottomsheet
          ref={editTempRef}
          snapPoints={EditSnapPoints}
          children={
            <EditDeleteCloudsheet
              editTemplate={() => onEditTemplate()}
              deleteTemplate={() => deleteAlert()}
              editTemplateName={() => onEditTemplateName()}
              viewTemplate={() => {
                editTempRef.current.childFunction2(),
                  navigation.navigate("TemplateList", {
                    template: selectedTemplate,
                  });
              }}
              selectedTemplate={selectedTemplate}
              editTemplateNameLabel={
                labels.TemplatePopupExpenses.Edit_Template_Name
              }
              editlabel={labels.TemplatePopupExpenses.Edit_Template}
              ViewTemplatelabel={
                labels.TemplatePopupExpenses.View_Template_Sheets
              }
              deletelabel={labels.TemplatePopupExpenses["Delete Template"]}
            />
          }
        />
      </View>
      <RegisterGuestUserPopup
        visible={registerModalVisible}
        onClickRegister={() => onClickRegister()}
        toggleRegisterModal={() => setRegisterModalVisible(false)}
      />
      {loader ? <CommonLoader /> : null}
    </View>
  );
};

export default CreateTemplate;
