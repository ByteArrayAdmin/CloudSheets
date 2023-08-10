import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  DeviceEventEmitter,
  Alert,
  BackHandler,
} from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
// import labels from "../../../../utils/ProjectLabels.json";
import BackButton from "../../../../commonComponents/Backbutton";
import Folder from "../../../../assets/Images/folder12.svg";
import CloudsheetListCard from "./CloudsheetListcard";
import Addwidgeticon from "../../../../assets/Images/Addwidgeticon.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import FlatlistHeader from "./FlatlistHeader";
import { styles } from "./styles";
import {
  getCloudsheetByTemplateID,
  current_UserInfo,
  create_SpreadSheet,
  update_SpreadSheet,
  spreadSheet_softDelete,
  getSpreadsheetRow_bySpreadsheetId_forSoftDelete,
  softDelete_spreadSheet_and_rows,
  checkNetwork,
  get_CloudsheetByUserID,
} from "../../../../API_Manager/index";
import CreateCloudSheetNamePopup from "../../../Popups/CreateCloudSheetNamePopup/index";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import Popup from "../../../Popups/TemplateEditPopup";
import uuid from "react-native-uuid";
import moment from "moment";
import CommonLoader from "../../../../commonComponents/CommonLoader";
import {
  track_Click_Event,
  track_Error_Event,
  track_Screen,
  track_Success_Event,
} from "../../../../eventTracking/index";
import {
  clickName,
  errorActionName,
  eventName,
  screenName,
  successActionName,
} from "../../../../utils/Constant";
declare global {
  var labels: any;
}
const TemplateList = () => {
  // ----------- File States -----------
  var labels = global.labels;
  const navigation = useNavigation();
  const route = useRoute();
  const child = useRef();
  const editCloudSheetRef = useRef();
  const snapPoints = [350, 400];
  const editCloudSheetSnapPoint = ["60%"];
  const [template, setTemplate] = useState(route?.params?.template);
  const [templateId, setTemplateId] = useState(route?.params?.template?.id);
  const [spreadSheetList, setSpreadSheetList] = useState([]);
  const [isEditCloudSheetName, setIsEditCloudSheetName] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [extraData, setExtraData] = useState(new Date());
  const [selectedCloudSheet, setSelectedCloudSheet] = useState({});
  const [loader, setLoader] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [navigateId, setNavigateId] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const [cloudSheetCount, setCloudSheetCount] = useState(0);

  // -------------- initial Render-------------
  useEffect(() => {
    console.log("template======", route?.params?.template);
    get_SpreadsheetByTemplateID();
    getUserId();
    getCloudSheetCount();
    track_Screen(eventName.TRACK_SCREEN, screenName.SPREADSHEET_LISTSCREEN);
  }, []);

  // -----------------Get Curent userId----------------
  const getUserId = () => {
    current_UserInfo()
      .then((response: any) => {
        setUserId(response.attributes.sub);
      })
      .catch((error) => {
        console.log("currUserErr======", error);
      });
  };

  // ---------- Get CloudSheet by UserId --------
  const getCloudSheetCount = () => {
    get_CloudsheetByUserID(global.userID)
      .then((response: any) => {
        console.log("cloudResp========", response);
        let cloudSheetCount = response.data.spreadSheetsByUserID.items.length;
        setCloudSheetCount(cloudSheetCount);
      })
      .catch((error) => {
        console.log("cloudErr========", error);
      });
  };

  // --------------- On Refresh SpreadSheet ---------
  const onRefresh = () => {
    get_SpreadsheetByTemplateID();
  };

  // ------------- Get SpreadSheetList------------
  const get_SpreadsheetByTemplateID = () => {
    setLoader(true);
    getCloudsheetByTemplateID(templateId)
      .then((response: any) => {
        setLoader(false);
        console.log("getSpreadByTempResp=========", response);
        let cloudSheetList = response.data.spreadSheetsByTemplatesID.items;
        cloudSheetList.sort(function compare(a, b) {
          var dateA = new Date(a.createdAt);
          var dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        setSpreadSheetList(cloudSheetList);
      })
      .catch((error) => {
        setLoader(false);
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        console.log("getSpreadSheetErr=====", error);
      });
  };

  // -------------- Double Click navigation ---------------
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
          isFrom: "TemplateTab",
        });
      } else {
        setTimeout(() => {
          setNavigateId("");
        }, 1000);
        setNavigateId(spreadSheetDetail.id);
      }
    }
  };

  const openCreateCloudSheetModal = () => {
    if (
      global.isPremium == "false" &&
      cloudSheetCount >= labels.trialConstants.trial_Cloudsheet_Limit
    ) {
      Alert.alert(labels.limitConstants.CloudSheet_Limit_Exceed);
    } else {
      setIsEditCloudSheetName(false);
      track_Click_Event(
        eventName.TRACK_CLICK,
        clickName.OPEN_CREATE_SPREADSHEET_MODAL
      );
      child.current.childFunction1();
      setIsSheetOpen(true);
    }
  };

  // -------- Close SpreadSheet Modal --------
  const OnClose = () => {
    if (isEditCloudSheetName) {
      track_Click_Event(
        eventName.TRACK_CLICK,
        clickName.CANCEL_UPDATE_SPREADSHEET_MODAL
      );
    } else {
      track_Click_Event(
        eventName.TRACK_CLICK,
        clickName.CANCEL_CREATE_SPREADSHEET_MODAL
      );
    }
    child.current.childFunction2();
    setError("");
  };

  // -------- spreadSheet validation --------
  const spreadSheetValidation = (spreadSheetname: String) => {
    console.log("spreadSheetname=========", spreadSheetname);
    if (spreadSheetname == "" || spreadSheetname == undefined) {
      setError(labels.Templatelistlabel.CloudSheetError);
    } else {
      onCreateSpreadSheet(spreadSheetname);
    }
  };

  // --------- Create Spreadsheet ----------
  const onCreateSpreadSheet = (spreadSheetName: String) => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.CLICK_ON_CREATE_SPREADSHEET
    );
    let uid = uuid.v1().toString();
    let timeStamp = moment().unix().toString();
    let newUniqueId = uid + "-" + timeStamp;
    let newSpreadData = {
      id: newUniqueId,
      spreadsheet_name: spreadSheetName,
      templatesID: templateId,
      userID: userId,
      soft_Deleted: false,
    };
    console.log("spreadSheetData=======", newSpreadData);
    let arr1 = spreadSheetList;
    setLoader(true);
    create_SpreadSheet(newSpreadData)
      .then((response: any) => {
        console.log("spreadResp=======", response);
        DeviceEventEmitter.emit("updateSpreadSheetList");
        setLoader(false);
        arr1.unshift(response.data.createSpreadSheet);
        setExtraData(new Date());
        getCloudSheetCount()
        track_Success_Event(
          eventName.TRACK_SUCCESS_ACTION,
          successActionName.CREATE_SPREADSHEET_SUCCESSFULLY
        );
      })
      .catch((error) => {
        setLoader(false);
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.CREATE_SPREADSHEET_ERROR
        );
        console.log("spreadErr=====", error);
      });
    child.current.childFunction2();
  };

  // ----------- Open Edit CloudSheet Popup ----------
  const openEditCloudSheetPopup = (selectedCloudSheet: any) => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.OPEN_SPREADSHEET_ACTION_MODAL
    );
    console.log("selectedCloudSheet=======", selectedCloudSheet);
    setSelectedCloudSheet(selectedCloudSheet);
    editCloudSheetRef.current.childFunction1();
    setIsSheetOpen(true);
  };
  // ----------- On Select Edit CloudSheet -----------
  const openEditCloudSheet = () => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.OPEN_EDIT_SPREADSHEET_MODAL
    );
    setIsEditCloudSheetName(true);
    editCloudSheetRef.current.childFunction2();
    child.current.childFunction1();
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
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.CLICK_ON_UPDATE_SPREADSHEET
    );
    let arr1 = spreadSheetList;
    arr1.forEach((element) => {
      if (element.id == spreadSheetId) {
        element.spreadsheet_name = text;
      }
    });
    setSpreadSheetList(arr1);
    setExtraData(new Date());
    setIsEditCloudSheetName(false);
    child.current.childFunction2();
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
        DeviceEventEmitter.emit("updateSpreadSheetList");
        track_Success_Event(
          eventName.TRACK_SUCCESS_ACTION,
          successActionName.UPDATE_SPREADSHEET_SUCCESSFULLY
        );
        console.log("updateResp=======", response);
      })
      .catch((error) => {
        setLoader(false);
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.UPDATE_SPREADSHEET_ERROR
        );
        console.log("updateCloudSheetErr========", error);
      });
  };

  //--------- Cloudsheet delete Alert ---------
  const openCloudsheetDeleteAlert = () => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.SELECT_DELETE_SPREADSHEET
    );
    track_Screen(eventName.TRACK_SCREEN, screenName.DELETE_SPREADSHEET_ALERT);
    editCloudSheetRef.current.childFunction2();
    Alert.alert(
      labels.Templatelistlabel.Delete_Cloudsheet_Alert,
      labels.Templatelistlabel.Delete_CloudSheet_Quete,
      [
        {
          text: labels.Templatelistlabel.Cancel,
          onPress: () => {
            console.log("Cancel Pressed"),
              track_Click_Event(
                eventName.TRACK_CLICK,
                clickName.CANCEL_DELETE_SPREADSHEET
              );
          },
          style: "cancel",
        },
        {
          text: labels.Templatelistlabel.OK,
          onPress: () => checkInternet(),
        },
      ]
    );
  };

  // ----------- get network ------------
  const checkInternet = () => {
    checkNetwork()
      .then((isConnected) => {
        console.log("isConectedResp=======", isConnected);
        if (isConnected) {
          onDeleteCloudsheet();
        } else {
          Alert.alert(labels.checkNetwork.networkError);
        }
      })
      .catch((error) => {
        console.log("networkErr======", error);
      });
  };

  // ----------- Delete Cloudsheet ----------
  const onDeleteCloudsheet = () => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.SELECT_DELETE_SPREADSHEET
    );
    let arr1 = spreadSheetList;
    let index;
    arr1.forEach((element) => {
      if (element.id == selectedCloudSheet.id) {
        index = arr1.indexOf(element);
      }
    });
    arr1.splice(index, 1);
    setSpreadSheetList(arr1);
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
          DeviceEventEmitter.emit("updateSpreadSheetList");
          getSpreadsheetRow_bySpreadsheetId_forSoftDelete(selectedCloudSheet.id)
            .then((response: any) => {
              let spreadSheetRows =
                response.data.spreadSheetRowsBySpreadsheetID.items;
              track_Success_Event(
                eventName.TRACK_SUCCESS_ACTION,
                successActionName.DELETE_SPREADSHEET_SUCCESSFULLY
              );
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
        getCloudSheetCount()
      })
      .catch((error) => {
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.DELETE_SPREADSHEET_ERROR
        );
        setLoader(false);
        console.log("softDelErr=======", error);
      });
  };

  const ListCard = ({ item, index }: any) => (
    <TouchableOpacity onPress={() => onDoubleTab(item)}>
      <CloudsheetListCard
        index={index}
        item={item}
        openEditCloudSheetPopup={() => openEditCloudSheetPopup(item)}
      />
    </TouchableOpacity>
  );
  useEffect(() => {
    const backAction = () => {
      if (isSheetOpen) {
        console.log("sheetIsOpen==========");
        child.current.childFunction2();
        editCloudSheetRef.current.childFunction2();
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

  return (
    <View style={styles.container}>
      <NewCommonHeader
        BackButton={<BackButton onPress={() => navigation.goBack()} />}
        heading={labels.Templatelistlabel.Template}
        Folder={<Folder />}
      />
      <View style={styles.secondflatlistview}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={
            viewAll
              ? spreadSheetList
              : spreadSheetList.slice(0, labels.viewAll_length.length)
          }
          renderItem={ListCard}
          refreshing={false}
          onRefresh={onRefresh}
          extraData={extraData}
          ListHeaderComponent={
            <FlatlistHeader
              onViewAll={() => setViewAll(true)}
              template={template}
            />
          }
        />
      </View>
      <TouchableOpacity
        style={styles.widgetposition}
        onPress={() => openCreateCloudSheetModal()}
      >
        <Addwidgeticon />
      </TouchableOpacity>
      <CommonBottomsheet
        ref={child}
        snapPoints={snapPoints}
        children={
          <CreateCloudSheetNamePopup
            OnClose={() => OnClose()}
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
              onUpdateCloudSheet(
                text,
                templateId,
                version,
                spreadSheetId,
                userId,
                softDeleted
              )
            }
            onCreateSpreadSheet={(SpreadSheetname: String) =>
              spreadSheetValidation(SpreadSheetname)
            }
          />
        }
      />
      <CommonBottomsheet
        snapPoints={editCloudSheetSnapPoint}
        ref={editCloudSheetRef}
        children={
          <Popup
            selectedCloudSheet={selectedCloudSheet}
            onEditCloudSheet={() => openEditCloudSheet()}
            onDeleteCloudSheet={() => openCloudsheetDeleteAlert()}
            onViewCloudSheet={()=>{
              editCloudSheetRef.current.childFunction2(),
              navigation.navigate("ExpensesList", {
                spreadSheetDetail: selectedCloudSheet,
                isFrom: "TemplateTab",
              })
            }}
          />
        }
      />
      {loader ? <CommonLoader /> : null}
    </View>
  );
};
export default TemplateList;
