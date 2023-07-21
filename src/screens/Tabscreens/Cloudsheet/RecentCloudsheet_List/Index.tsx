/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect, useState } from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  DeviceEventEmitter,
  Alert,
  BackHandler,
} from "react-native";
import FlatListHeader from "./FlatlistHeader";
import Cloudsheetcard from "./Cloudsheetcard";
import { styles } from "./style";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Addwidget from "../../../../assets/Images/Addwidgeticon.svg";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import CreatecloudsheetPopup from "../../../Popups/CreateCloudsheets.tsx";
import SearcBar from "../../../../commonComponents/Searchbar";
// import Clousheetlistscreen from "../../../../utils/ProjectLabels.json";
import {
  get_CloudsheetByUserID,
  current_UserInfo,
  create_Template,
  update_SpreadSheet,
  spreadSheet_softDelete,
  getSpreadsheetRow_bySpreadsheetId_forSoftDelete,
  softDelete_spreadSheet_and_rows,
  search_CloudsheetByUserID,
  get_Template_List,
} from "../../../../API_Manager/index";
import {
  useNavigation,
  useRoute,
  CommonActions,
  useIsFocused,
} from "@react-navigation/native";
import CreateTemplatePopup from "../../../Popups/CreateTemplatePopup";
import CreateCloudSheetNamePopup from "../../../Popups/CreateCloudSheetNamePopup/index";
import Popup from "../../../Popups/TemplateEditPopup";
import uuid from "react-native-uuid";
import moment from "moment";
import CommonLoader from "../../../../commonComponents/CommonLoader";
import { track_Screen } from "../../../../eventTracking/index";
import { screenName, eventName } from "../../../../utils/Constant";
import RegisterGuestUserPopup from "../../../Popups/RegisterGuestUserPopup";
declare global {
  var labels: any;
}
const ClousheetList = () => {
  // --------- File States ----------
  var Clousheetlistscreen = global.labels;
  const bottomTabHeight = useBottomTabBarHeight();
  const ChildRef = useRef();
  const createTemplateRef = useRef();
  const isFocused = useIsFocused();
  const openthreeDotRef = useRef();
  const openCloudSheetEditRef = useRef();
  const snapPoints = [350, 400];
  const ChooseSnapPoints = [300, 350];
  const editCloudSheetSnapPoint = ["60%"];
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const [cloudSheetList, setCloudSheetList] = useState([]);
  const [isEditCloudSheetName, setIsEditCloudSheetName] = useState(false);
  const [userId, setUserId] = useState("");
  const [isEditTemplate, setIsEditTemplate] = useState(false);
  const [selectedCloudSheet, setSelectedCloudSheet] = useState({});
  const [extraData, setExtraData] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const [searchCloudsheet, setSearchCloudsheet] = useState("");
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [navigateId, setNavigateId] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const [isTemplate, setIsTemplate] = useState(false);

  // -------------- Initial Rendering ------------
  useEffect(() => {
    console.log("currentUser=======", global.isLoggedInUser);
    DeviceEventEmitter.addListener("updateSpreadSheetList", () =>
      get_CurrentUserId()
    );
    // get_CurrentUserId();
    track_Screen(eventName.TRACK_SCREEN, screenName.CLOUDSHEET_TAB_SCREEN);
  }, []);

  // --------- Get Template By userID ----------
  const getTemplateByUserId = (userID: string) => {
    get_Template_List(userID)
      .then((response: any) => {
        console.log("tempalateList========", response);
        const tempCount = response.data.templatesByUserID.items.length;
        console.log("TempCount=======",tempCount)
        if (tempCount == 0) {
          setIsTemplate(false);
        }else{
          setIsTemplate(true);
        }
      })
      .catch((error) => {
        console.log("getTemplateError======", error);
      });
  };

  // ------------ backHandler ---------
  useEffect(() => {
    const backAction = () => {
      if (isSheetOpen) {
        console.log("sheetIsOpen==========");
        ChildRef.current.childFunction2();
        createTemplateRef.current.childFunction2();
        openthreeDotRef.current.childFunction2();
        openCloudSheetEditRef.current.childFunction2();

        // backHandler.remove();
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

  useEffect(() => {
    if (isFocused) {
      // setIsGlobal((prevState) => !prevState);
      get_CurrentUserId();
      setViewAll(false);
    }
  }, [isFocused]);
  // ------------ Get Current userId -------------
  const get_CurrentUserId = () => {
    current_UserInfo()
      .then((response: any) => {
        console.log("currentUserResp======", response.attributes.sub);
        get_CloudsheetBy_UserID(response.attributes.sub);
        getTemplateByUserId(response.attributes.sub);
        setUserId(response.attributes.sub);
      })
      .catch((error) => {
        console.log("userIdErr=======", error);
        if(error.isConnected == false){
          Alert.alert("Not network Connected!")
        }
      });
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
  // ----------- getCloudSheet Pull to refresh -----------
  const onRefreshList = () => {
    get_CloudsheetBy_UserID(userId);
  };

  // ----------- search CloudSheet ----------
  const searchCloudsheetByUserId = (cloudSheetName: string) => {
    setCloudSheetList([]);
    setSearchCloudsheet(cloudSheetName);
    search_CloudsheetByUserID(userId, cloudSheetName)
      .then((response: any) => {
        console.log("searchResp=======", response);
        setCloudSheetList(response.data.spreadSheetsByUserID.items);
      })
      .catch((error) => {
        console.log("searchErr========", error);
      });
  };

  // ----------- get CloudSheet List ------------
  const get_CloudsheetBy_UserID = (userID: any) => {
    setLoader(true);
    get_CloudsheetByUserID(userID)
      .then((response: any) => {
        setLoader(false);
        console.log("cloudsheetRespByuserID========", response);
        let cloudSheetList = response.data.spreadSheetsByUserID.items;
        cloudSheetList.sort(function compare(a, b) {
          var dateA = new Date(a.updatedAt);
          var dateB = new Date(b.updatedAt);
          return dateB - dateA;
        });
        setCloudSheetList(cloudSheetList);
      })
      .catch((error) => {
        setLoader(false);
        console.log("cloudSheetErr=======", error);
      });
  };

  // -------------- OnDouble Click navigation -----------
  const onDoubleTab = (spreadSheetDetail: any) => {
    if (navigateId == "") {
      setTimeout(() => {
        setNavigateId("");
      }, 1000);
      setNavigateId(spreadSheetDetail.id);
    } else {
      if (navigateId == spreadSheetDetail.id) {
        setNavigateId("");
        navigation.navigate("ExpensesList", {
          spreadSheetDetail: spreadSheetDetail,
          isFrom: "CloudSheetTab",
        });
      } else {
        setTimeout(() => {
          setNavigateId("");
        }, 1000);
        setNavigateId(spreadSheetDetail.id);
      }
    }
  };

  // --------- Check Form validation -----------
  const CheckValidation = (templateName: String) => {
    if (templateName == "" || templateName == undefined) {
      setError(Clousheetlistscreen.cloudsheetlistconstant.error);
    } else {
      onCreateTemplate(templateName);
    }
  };

  // ----------- Create Template ------------
  const onCreateTemplate = (templateName: String) => {
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
    setLoader(true);
    create_Template(newTemplate)
      .then((response: any) => {
        setLoader(false);
        console.log("createTempResp=======", response);
        createTemplateRef.current.childFunction2();
        setIsSheetOpen(false);
        navigation.navigate("CreatSpreadsheet", {
          template: response.data.createTemplates,
          isEdit: isEditTemplate,
          isFrom: "CloudSheetTab",
        });
        DeviceEventEmitter.emit("refreshTemplateList");
      })
      .catch((err) => {
        setLoader(false);
        console.log("createTempErr=======", err);
      });
  };

  // ------------ Open select Template Type Popup ------------
  const Opensheet = () => {
    if (global.isLoggedInUser) {
      setIsSheetOpen(true);
      ChildRef.current.childFunction1();
    } else {
      setRegisterModalVisible(!registerModalVisible);
    }
  };
  // ----------- Create New Template Popup -----------
  const cancelCreateTemplate = () => {
    setError("");
    setIsSheetOpen(false);
    createTemplateRef.current.childFunction2();
  };

  // ----------- Create New Template Popup -----------
  const openNewTemplate = () => {
    setError("");
    setIsSheetOpen(true);
    ChildRef.current.childFunction2();
    createTemplateRef.current.childFunction1();
  };

  // ------------ On Select Existing Template ---------
  const onExistingTemplate = () => {
    console.log("isexist========",isTemplate)
    setIsSheetOpen(false);
      ChildRef.current.childFunction2();
    if (isTemplate == true) {
      
      navigation.navigate("ExistingTemplateList");
    }else{
      Alert.alert("No template is create yet!")
    }
  };

  // ------- Open CloudSheet Action Modal -------
  const openEditCloudSheetPopup = (selectedCloudSheet: any) => {
    console.log("selectedCloudSheet=======", selectedCloudSheet);
    setSelectedCloudSheet(selectedCloudSheet);
    setIsSheetOpen(true);
    openthreeDotRef.current.childFunction1();
  };

  // -------- onEdit CloudSheet ---------
  const openEditCloudSheet = () => {
    setIsEditCloudSheetName(true);
    setIsSheetOpen(true);
    openthreeDotRef.current.childFunction2();
    openCloudSheetEditRef.current.childFunction1();
  };

  // ------- Close Edit CloudSheet Modal ---------
  const OnCloseEditCloudSheetModal = () => {
    setIsEditCloudSheetName(false);
    setIsSheetOpen(false);
    openCloudSheetEditRef.current.childFunction2();
  };

  // ------------ check edit validation ----------
  const CheckEditValidation = (
    text: string,
    templateId: string,
    version: any,
    spreadSheetId: string,
    userId: string,
    softDeleted: any
  ) => {
    if (text == "" || text == undefined) {
      setError(Clousheetlistscreen.cloudsheetlistconstant.error);
    } else {
      onUpdateCloudSheet(
        text,
        templateId,
        version,
        spreadSheetId,
        userId,
        softDeleted
      );
    }
  };

  // ----------- Update CloudSheet -------------
  const onUpdateCloudSheet = (
    text: String,
    templateId: String,
    version: any,
    spreadSheetId: String,
    userId: String,
    softDeleted: boolean
  ) => {
    setIsSheetOpen(false);
    let arr1 = cloudSheetList;
    arr1.forEach((element) => {
      if (element.id == spreadSheetId) {
        element.spreadsheet_name = text;
      }
    });
    setCloudSheetList(arr1);
    setExtraData(new Date());
    setIsEditCloudSheetName(false);
    openCloudSheetEditRef.current.childFunction2();
    let newSpreadData = {
      id: spreadSheetId,
      spreadsheet_name: text,
      templatesID: templateId,
      userID: userId,
      _version: version,
      soft_Deleted: softDeleted,
    };
    setLoader(true);
    update_SpreadSheet(newSpreadData)
      .then((response) => {
        setLoader(false);
        console.log("updateResp=======", response);
      })
      .catch((error) => {
        setLoader(false);
        console.log("updateCloudSheetErr========", error);
      });
  };

  //--------- Cloudsheet delete Alert ---------
  const openCloudsheetDeleteAlert = () => {
    openthreeDotRef.current.childFunction2();
    Alert.alert(
      Clousheetlistscreen.cloudsheetlistconstant.Delete_Alert,
      Clousheetlistscreen.cloudsheetlistconstant.Delete_Quete,
      [
        {
          text: Clousheetlistscreen.cloudsheetlistconstant.Cancel,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: Clousheetlistscreen.cloudsheetlistconstant.OK,
          onPress: () => onDeleteCloudsheet(),
        },
      ]
    );
  };

  // ----------- Delete Cloudsheet ----------
  const onDeleteCloudsheet = () => {
    let arr1 = cloudSheetList;
    let index;
    arr1.forEach((element) => {
      if (element.id == selectedCloudSheet.id) {
        index = arr1.indexOf(element);
      }
    });
    arr1.splice(index, 1);
    setCloudSheetList(arr1);
    setExtraData(new Date());
    let updatedCloudsheetData = {
      id: selectedCloudSheet.id,
      spreadsheet_name: selectedCloudSheet.spreadsheet_name,
      templatesID: selectedCloudSheet.templatesID,
      userID: selectedCloudSheet.userID,
      soft_Deleted: true,
      _version: selectedCloudSheet._version,
    };
    setLoader(true);
    spreadSheet_softDelete(updatedCloudsheetData)
      .then((response: any) => {
        if (response) {
          getSpreadsheetRow_bySpreadsheetId_forSoftDelete(selectedCloudSheet.id)
            .then((response: any) => {
              let spreadSheetRows =
                response.data.spreadSheetRowsBySpreadsheetID.items;
              if (spreadSheetRows.length > 0) {
                spreadSheetRows.forEach((element: any) => {
                  element.soft_Deleted = true;
                });
                console.log("getRowResp======", spreadSheetRows);
                softDelete_spreadSheet_and_rows(spreadSheetRows)
                  .then((response: any) => {
                    console.log("spreadRowDelete======", response);
                    setLoader(false);
                  })
                  .catch((error) => {
                    setLoader(false);
                    console.log("sfSpreadSheetRow========", error);
                  });
              }
              setLoader(false);
            })
            .catch((error) => {
              setLoader(false);
              console.log("getSpRowErr=======", error);
            });
        }
      })
      .catch((error) => {
        console.log("softDelErr=======", error);
      });
  };

  const Footer = () => {
    return <View style={{ height: bottomTabHeight }} />;
  };

  const renderItems = ({ item, index }: any) => (
    console.log("items=======", item),
    (
      <TouchableOpacity onPress={() => onDoubleTab(item)}>
        <Cloudsheetcard
          index={index}
          item={item}
          onClickThreeDot={() => openEditCloudSheetPopup(item)}
        />
      </TouchableOpacity>
    )
  );

  return (
    <>
      <FlatListHeader />
      <View style={styles.inputserachview}>
        <SearcBar
          placeholder={Clousheetlistscreen.cloudsheetlistconstant.SEARCH_SHEETS}
          value={searchCloudsheet}
          onChange={(text: string) => searchCloudsheetByUserId(text)}
        />
      </View>
      <View style={styles.recentcloudview}>
        <View>
          <Text style={styles.recentcloudtext}>
            {Clousheetlistscreen.cloudsheetlistconstant.RECENT_CLOUD_SHEETS}
          </Text>
        </View>
        <View style={styles.lastview} />
        <TouchableOpacity onPress={() => setViewAll(true)}>
          <Text style={styles.viewalltext}>
            {Clousheetlistscreen.cloudsheetlistconstant.VIEWALL}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatlistview}>
        <FlatList
          data={viewAll ? cloudSheetList : cloudSheetList.slice(0, 5)}
          renderItem={renderItems}
          refreshing={false}
          onRefresh={onRefreshList}
          extraData={extraData}
          //keyExtractor={item => item._id}
          ListFooterComponent={<Footer />}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity onPress={Opensheet} style={styles.widgetstyle}>
          <Addwidget />
        </TouchableOpacity>
        <CommonBottomsheet
          ref={createTemplateRef}
          snapPoints={snapPoints}
          children={
            <CreateTemplatePopup
              error={error}
              OnCloseCreateTemplate={() => cancelCreateTemplate()}
              isEditTemplate={isEditTemplate}
              selectedTemplate={null}
              onCreateTemplate={(templateName: String) =>
                CheckValidation(templateName)
              }
              onUpdateTemplate={(
                templateName: any,
                templateId: any,
                version: any
              ) => {}}
            />
          }
        />
        <CommonBottomsheet
          ref={ChildRef}
          snapPoints={ChooseSnapPoints}
          children={
            <CreatecloudsheetPopup
              inNewTemplate={() => openNewTemplate()}
              inExistingTemplate={() => onExistingTemplate()}
            />
          }
        />

        <CommonBottomsheet
          ref={openCloudSheetEditRef}
          snapPoints={snapPoints}
          children={
            <CreateCloudSheetNamePopup
              OnClose={() => OnCloseEditCloudSheetModal()}
              error={error}
              selectedCloudSheet={selectedCloudSheet}
              isEditCloudSheetName={isEditCloudSheetName}
              onUpdateCloudSheet={(
                text: String,
                templateId: String,
                version: any,
                spreadSheetId: String,
                userId: String,
                softDeleted: boolean
              ) =>
                CheckEditValidation(
                  text,
                  templateId,
                  version,
                  spreadSheetId,
                  userId,
                  softDeleted
                )
              }
              // onCreateSpreadSheet={(SpreadSheetname: String) => spreadSheetValidation(SpreadSheetname)}
            />
          }
        />
        <CommonBottomsheet
          snapPoints={editCloudSheetSnapPoint}
          ref={openthreeDotRef}
          children={
            <Popup
              selectedCloudSheet={selectedCloudSheet}
              onEditCloudSheet={() => openEditCloudSheet()}
              onDeleteCloudSheet={() => openCloudsheetDeleteAlert()}
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
    </>
  );
};

export default ClousheetList;
