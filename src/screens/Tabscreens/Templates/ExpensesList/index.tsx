import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert
} from "react-native";
import NewCommonHeader from ".././../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
import labels from "../../../../utils/ProjectLabels.json";
import { useNavigation, useRoute } from "@react-navigation/native";
import Doclogo from "../../../../assets/Images/documentdark.svg";
import SearcBar from "../../../../commonComponents/Searchbar";
import ListCard from "./ListCard";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import SubcriptionPlan from "../../../../screens/Popups/SubcriptionPopup";
import { get_SpreadSheetRowBySpreadSheetId, spreadSheetRow_softDelete } from '../../../../API_Manager/index';
import EditDeleteCloudsheet from "../../../../screens/Popups/Edit_Delete_Cloudsheet";
import EditSpreadsheetRecord from "../../../../screens/Popups/EditSpreadsheetRecord/index";
import Addwidgeticon from "../../../../assets/Images/Addwidgeticon.svg";
import CommonLoader from '../../../../commonComponents/CommonLoader';
import { track_Screen, track_Click_Event, track_Success_Event, track_Error_Event } from '../../../../eventTracking/index';
import { eventName, screenName, clickName, successActionName, errorActionName } from '../../../../utils/Constant';
const ExpensesList = (props: any) => {
  // --------- File States ---------
  const route = useRoute()
  const navigation = useNavigation();
  const child = useRef();
  const editRecordRef = useRef();
  const snapPoints = ["35%"];
  const [spreadSheetDetail, setSpreadSheetDetail] = useState(route?.params?.spreadSheetDetail)
  const [spreadSheetData, setSpreadSheetData] = useState([])
  const [selectedRow, setSelectedRow] = useState({})
  const [isFrom, setIsFrom] = useState(route?.params?.isFrom)
  const [loader, setLoader] = useState(false)
  const [extraData, setExtraData] = useState(new Date())

  // ----------- Initial Rendering ------------
  useEffect(() => {
    console.log("spreadSheetId========", spreadSheetDetail)
    // OpenPopup();
    get_SpreadSheetRowBySpreadSheetID()
    track_Screen(eventName.TRACK_SCREEN, screenName.SPREADSHEET_ROWLIST_SCREEN)
  }, []);

  // ----------- Pull to Refresh SpreadSheet Row ----------
  const onRefresh = () => {
    get_SpreadSheetRowBySpreadSheetID()
  }

  // ----------- Get SpreadSheet Row Data -------------
  const get_SpreadSheetRowBySpreadSheetID = () => {
    setLoader(true)
    get_SpreadSheetRowBySpreadSheetId(spreadSheetDetail.id).then((response: any) => {
      setLoader(false)
      console.log("spreadRowResp======", response)
      setSpreadSheetData(response.data.spreadSheetRowsBySpreadsheetID.items)
    }).catch((error) => {
      setLoader(false)
      console.log("spreadRowErr========", error)
    })
  }

  // ------------ Open Subscribtion popUp ------------
  const OpenPopup = () => {
    child.current.childFunction1();
  };

  // ------------ onClick Edit Record popup ------------
  const onEditRecord = () => {
    track_Click_Event(eventName.TRACK_CLICK, clickName.SELECT_EDIT_SPREADSHEET_ROW)
    editRecordRef.current.childFunction2();
    console.log("spreadSheetRow=======", selectedRow)
    console.log("spreadSheetDetail======", spreadSheetDetail)
    navigation.navigate("RowdetailForm", { spreadSheetRow: selectedRow, spreadSheet: spreadSheetDetail, isEdit: true, isFrom: isFrom })
  }

  // ------------- Open Edit Record PopUp ----------------
  const openEditRecordPopup = (spreadSheetRow: any) => {
    track_Click_Event(eventName.TRACK_CLICK, clickName.OPEN_SPREADSHEET_ROW_ACTION_MODAL)
    setSelectedRow(spreadSheetRow)
    editRecordRef.current.childFunction1();
  }

  // --------------- Add New SpreadSheet Record ---------------
  const onClickAddRow = () => {
    track_Click_Event(eventName.TRACK_CLICK, clickName.SELECT_ADD_SPREADSHEET_ROW)
    navigation.navigate("RowdetailForm", { spreadSheet: spreadSheetDetail, isFrom: isFrom })
  }

  // ----------- Delete Row Alert ------------
  const deleteAlert = () => {
    track_Click_Event(eventName.TRACK_CLICK, clickName.SELECT_DELETE_SPREADSHEET_ROW)
    track_Screen(eventName.TRACK_SCREEN, screenName.DELETE_SPREADSHEET_ROW_ALERT)
    editRecordRef.current.childFunction2();
    Alert.alert(labels.ExpensesList.Delete_Record_Alert, labels.ExpensesList.Delete_Quete, [
      {
        text: labels.ExpensesList.Cancel,
        onPress: () => { console.log('Cancel Pressed'), track_Click_Event(eventName.TRACK_CLICK, clickName.SELECT_CANCEL_DELETE_SPREADSHEET_ROW) },
        style: 'cancel',
      },
      { text: labels.ExpensesList.OK, onPress: () => onDeleteRow() },
    ]);
  }
  // ------------ Delete Row ------------
  const onDeleteRow = () => {
    track_Click_Event(eventName.TRACK_CLICK, clickName.SELECT_DELETE_SPREADSHEET_ROW)
    console.log("selectedRow========", selectedRow)
    let obj = selectedRow
    let arr1 = spreadSheetData
    let index
    arr1.forEach(element => {
      if (element.id == selectedRow.id) {
        index = arr1.indexOf(element)
      }
    });
    arr1.splice(index, 1)
    setSpreadSheetData(arr1)
    setExtraData(new Date())
    const deleteRow = {
      id: selectedRow.id,
      items: selectedRow.items,
      userID: selectedRow.userID,
      templatesID: selectedRow.templatesID,
      spreadsheetID: selectedRow.spreadsheetID,
      soft_Deleted: true,
      _version: selectedRow._version
    }
    setLoader(true)
    spreadSheetRow_softDelete(deleteRow).then((response: any) => {
      console.log("softDeleteRowResp=========", response)
      track_Success_Event(eventName.TRACK_SUCCESS_ACTION, successActionName.DELETE_SPREADSHEET_ROW_SUCCESSFULLY)
      setLoader(false)
    }).catch((error) => {
      setLoader(false)
      track_Error_Event(eventName.TRACK_ERROR_ACTION, errorActionName.DELETE_SPREADSHEET_ROW_ERROR)
      console.log("deleteRow=======", error)
    })
  }

  const RenderItems = ({ item }: any) => (
    <ListCard items={item} onPressThreeDot={() => openEditRecordPopup(item)} />
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
        <SearcBar placeholder={labels.ExpensesList.Searchhere} />
      </View>
      <View style={Style.flatlistview}>
        <FlatList
          data={spreadSheetData}
          renderItem={RenderItems}
          refreshing={false}
          onRefresh={onRefresh}
          extraData={extraData}
        />
      </View>
      <TouchableOpacity style={Style.widgetposition}
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
        children={<EditSpreadsheetRecord
          editRecord={() => onEditRecord()}
          deleteTemplate={() => deleteAlert()}
          spreadSheetRow={selectedRow}
          editlabel={labels.ExpensesList.Edit_CloudSheet_Record}
          deletelabel={labels.ExpensesList.Delete_CloudSheet_Record}
        />}
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
