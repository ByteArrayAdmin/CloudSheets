import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  BackHandler,
  DeviceEventEmitter
} from "react-native";
import NewCommonHeader from ".././../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
// import labels from "../../../../utils/ProjectLabels.json";
import { useNavigation, useRoute } from "@react-navigation/native";
import Doclogo from "../../../../assets/Images/documentdark.svg";
import SearcBar from "../../../../commonComponents/Searchbar";
import ListCard from "./ListCard";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import SubcriptionPlan from "../../../../screens/Popups/SubcriptionPopup";
import {
  get_SpreadSheetRowBySpreadSheetId,
  spreadSheetRow_softDelete,
  get_ColumnByTemplateId,
  getSpreadSheetRowBy_userId
} from "../../../../API_Manager/index";
import EditSpreadsheetRecord from "../../../../screens/Popups/EditSpreadsheetRecord/index";
import Addwidgeticon from "../../../../assets/Images/Addwidgeticon.svg";
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
declare global {
  var labels: any;
}

const ExpensesList = (props: any) => {
  // --------- File States ---------
  var labels = global.labels;
  const route = useRoute();
  const navigation = useNavigation();
  const child = useRef();
  const editRecordRef = useRef();
  const snapPoints = [300, 350];
  const [spreadSheetDetail, setSpreadSheetDetail] = useState(
    route?.params?.spreadSheetDetail
  );
  const [spreadSheetData, setSpreadSheetData] = useState([]);
  const searchRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isFrom, setIsFrom] = useState(route?.params?.isFrom);
  const [loader, setLoader] = useState(false);
  const [extraData, setExtraData] = useState(new Date());
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isColumnExist, setIsColumnExist] = useState(false);
  const [totalRowLength, setTotalRowLength] = useState(0)

  // ----------- Initial Rendering ------------
  useEffect(() => {
    console.log("spreadSheetId========", spreadSheetDetail);
    // OpenPopup();
    get_SpreadSheetRowBySpreadSheetID();
    getColumn();
    getRowByUserId()
    track_Screen(eventName.TRACK_SCREEN, screenName.SPREADSHEET_ROWLIST_SCREEN);
  }, []);

  // ----------- Pull to Refresh SpreadSheet Row ----------
  const onRefresh = () => {
    get_SpreadSheetRowBySpreadSheetID();
  };

  // ------------ Spreadsheet Row by userId -------------

  const getRowByUserId = ()=>{
    setLoader(true)
    getSpreadSheetRowBy_userId().then((response: any)=>{
      console.log("rowByuser=======",response)
        let rows = response.data.spreadSheetRowsByUserID.items.length
        setTotalRowLength(rows)
        setLoader(false)
    }).catch((error)=>{
      setLoader(false)
      console.log("error=======",error)
    })
  }

  // ----------- Get SpreadSheet Row Data -------------
  const get_SpreadSheetRowBySpreadSheetID = () => {
    setLoader(true);
    get_SpreadSheetRowBySpreadSheetId(spreadSheetDetail.id)
      .then((response: any) => {
        setLoader(false);
        console.log("spreadRowResp======", response);
        let spreadSheetRowList =
          response.data.spreadSheetRowsBySpreadsheetID.items;
        spreadSheetRowList.sort(function compare(a, b) {
          var dateA = new Date(a.updatedAt);
          var dateB = new Date(b.updatedAt);
          return dateB - dateA;
        });
        setSpreadSheetData(spreadSheetRowList);
        searchRef.current = spreadSheetRowList;
      })
      .catch((error) => {
        setLoader(false);
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        console.log("spreadRowErr========", error);
      });
  };

  // ------------ Get Column By TemplateID ----------
  const getColumn = () => {
    get_ColumnByTemplateId(spreadSheetDetail.templatesID)
      .then((response: any) => {
        console.log("getColumnList=========", response);
        if (response.data.templateColumnsByTemplatesID.items.length > 0) {
          console.log("True==========");
          setIsColumnExist(true);
        }
      })
      .catch((error) => {
        console.log("getColErr=======", error);
      });
  };

  // ------------ Open Subscribtion popUp ------------
  const OpenPopup = () => {
    child.current.childFunction1();
  };
  useEffect(() => {
    const backAction = () => {
      if (isSheetOpen) {
        console.log("sheetIsOpen==========");
        editRecordRef.current.childFunction2();
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

  // ------------ onClick Edit Record popup ------------
  const onEditRecord = () => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.SELECT_EDIT_SPREADSHEET_ROW
    );
    editRecordRef.current.childFunction2();
    console.log("spreadSheetRow=======", selectedRow);
    console.log("spreadSheetDetail======", spreadSheetDetail);
    navigation.navigate("RowdetailForm", {
      spreadSheetRow: selectedRow,
      spreadSheet: spreadSheetDetail,
      isEdit: true,
      isFrom: isFrom,
    });
  };

  // ------------- Open Edit Record PopUp ----------------
  const openEditRecordPopup = (spreadSheetRow: any) => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.OPEN_SPREADSHEET_ROW_ACTION_MODAL
    );
    setSelectedRow(spreadSheetRow);
    editRecordRef.current.childFunction1();
    setIsSheetOpen(true);
  };

  // --------------- Add New SpreadSheet Record ---------------
  const onClickAddRow = () => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.SELECT_ADD_SPREADSHEET_ROW
    );
    if (isColumnExist) {
      if(global.isPremium == "false" && totalRowLength >= labels.trialConstants.trial_Record_Limit){
        Alert.alert(labels.limitConstants.Record_Limit_Exceed)
      }else{
        navigation.navigate("RowdetailForm", {
          spreadSheet: spreadSheetDetail,
          isFrom: isFrom,
        });
      }
      
    } else {
      Alert.alert(
        labels.ExpensesList.ColumnAlert,
        labels.ExpensesList.ColumnError,
        [{ text: labels.ExpensesList.OK, onPress: () => navigation.goBack() }]
      );
    }
  };

  // ----------- Delete Row Alert ------------
  const deleteAlert = () => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.SELECT_DELETE_SPREADSHEET_ROW
    );
    track_Screen(
      eventName.TRACK_SCREEN,
      screenName.DELETE_SPREADSHEET_ROW_ALERT
    );
    editRecordRef.current.childFunction2();
    Alert.alert(
      labels.ExpensesList.Delete_Record_Alert,
      labels.ExpensesList.Delete_Quete,
      [
        {
          text: labels.ExpensesList.Cancel,
          onPress: () => {
            console.log("Cancel Pressed"),
              track_Click_Event(
                eventName.TRACK_CLICK,
                clickName.SELECT_CANCEL_DELETE_SPREADSHEET_ROW
              );
          },
          style: "cancel",
        },
        { text: labels.ExpensesList.OK, onPress: () => onDeleteRow() },
      ]
    );
  };
  // ------------ Delete Row ------------
  const onDeleteRow = () => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.SELECT_DELETE_SPREADSHEET_ROW
    );
    console.log("selectedRow========", selectedRow);
    let obj = selectedRow;
    let arr1 = spreadSheetData;
    let index;
    arr1.forEach((element) => {
      if (element.id == selectedRow.id) {
        index = arr1.indexOf(element);
      }
    });
    arr1.splice(index, 1);
    setSpreadSheetData(arr1);
    setExtraData(new Date());
    const deleteRow = {
      id: selectedRow.id,
      items: selectedRow.items,
      userID: selectedRow.userID,
      templatesID: selectedRow.templatesID,
      spreadsheetID: selectedRow.spreadsheetID,
      soft_Deleted: true,
      _version: selectedRow._version,
    };
    setLoader(true);
    spreadSheetRow_softDelete(deleteRow)
      .then((response: any) => {
        getRowByUserId()
        console.log("softDeleteRowResp=========", response);
        DeviceEventEmitter.emit("updateSpreadSheetList");
        track_Success_Event(
          eventName.TRACK_SUCCESS_ACTION,
          successActionName.DELETE_SPREADSHEET_ROW_SUCCESSFULLY
        );
        
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.DELETE_SPREADSHEET_ROW_ERROR
        );
        console.log("deleteRow=======", error);
      });
  };

  // ------------ Search shpreadSheetRow -----------

  const search_Row = (text: string) => {
    let row = JSON.parse(JSON.stringify(searchRef.current));
    console.log("allitems=======", row);
    let searchedArr = [];
    if (text.trim() !== "") {
      row.filter((item) => {
        let parseEle = JSON.parse(item.items);
        let isValue = false;
        console.log("filterDataAbove========", parseEle);
        parseEle.forEach((element) => {
          if (
            element.column_Value &&
            element.column_Value.includes(text) &&
            !searchedArr.includes(item)
          ) {
            console.log("filterDataIf========", item);
            isValue = true;
            searchedArr.push(item);
          }
        });
      });
    } else {
      searchedArr = [...row];
    }
    setSpreadSheetData(searchedArr);
    setExtraData(new Date());
    console.log("searchData=====", searchedArr);
  };

  const RenderItems = ({ item }: any) => (
    console.log("items========", item),
    (
      <ListCard
        items={item}
        onPressThreeDot={() => openEditRecordPopup(item)}
      />
    )
  );

  return (
    <View style={Style.container}>
      <View>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          heading={spreadSheetDetail?.spreadsheet_name}
          Folder={<Doclogo />}
          styling={130}
        />
      </View>
      <View style={Style.searchbarstyle}>
        <SearcBar
          placeholder={labels.ExpensesList.Searchhere}
          onChange={(text: string) => search_Row(text)}
        />
      </View>
      <View style={Style.flatlistview}>
        <FlatList
          data={spreadSheetData}
          renderItem={RenderItems}
          refreshing={false}
          onRefresh={onRefresh}
          extraData={extraData}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity
        style={Style.widgetposition}
        onPress={() => onClickAddRow()}
      >
        <Addwidgeticon />
      </TouchableOpacity>
      <CommonBottomsheet
        ref={child}
        snapPoints={snapPoints}
        children={<SubcriptionPlan />}
      />
      <CommonBottomsheet
        ref={editRecordRef}
        snapPoints={snapPoints}
        children={
          <EditSpreadsheetRecord
            editRecord={() => onEditRecord()}
            deleteTemplate={() => deleteAlert()}
            spreadSheetRow={selectedRow}
            editlabel={labels.ExpensesList.Edit_CloudSheet_Record}
            deletelabel={labels.ExpensesList.Delete_CloudSheet_Record}
          />
        }
      />
      {loader ? <CommonLoader /> : null}
    </View>
  );
};
export default ExpensesList;

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbarstyle: {
    marginTop: -25,
  },
  flatlistview: {
    flex: 1,
    marginTop: 17,
    marginHorizontal: 15,
  },
  widgetposition: {
    position: "absolute",
    bottom: 90,
    right: 15,
  },
});
