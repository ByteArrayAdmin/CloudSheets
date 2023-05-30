import React, { useState, useRef, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
import Document from "../../../../assets/Images/documentdark.svg";
import label from "../../../../utils/ProjectLabels.json";
import Searchbar from "../../../../commonComponents/Searchbar";
import Attendancelistcard from "./Attendancelistcard";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import Fatlogo from "../../../../assets/Images/fatrows.svg";
import { Styles } from "../RowDetailForm/style";
import { useNavigation, useRoute } from "@react-navigation/native";
import { get_SpreadSheetRowBySpreadSheetId ,spreadSheetRow_softDelete} from '../../../../API_Manager/index';
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import Edit_Delete_Cloudsheet from "../../../Popups/Edit_Delete_Cloudsheet/index";
import EditSpreadsheetRecord from '../../../Popups/EditSpreadsheetRecord';
import CommonLoader from '../../../../commonComponents/CommonLoader';
const { height } = Dimensions.get("window");

const Attendancelist = () => {

  const navigation = useNavigation();
  const route = useRoute()
  const child = useRef()
  const snapPoints = ["35%", "50%"];
  const [Data, setdata] = useState([{ id: 1 }]);
  const [spreadSheet, setSpreadSheet] = useState(route?.params?.spreadSheet)
  const [spreadSheetName, setSpreadSheetName] = useState(route?.params?.spreadSheet?.spreadsheet_name)
  const [spreadSheetData, setSpreadSheetData] = useState([])
  const [selectedRow, setSelectedRow] = useState({})
  const [isFrom, setIsFrom] = useState(route?.params?.isFrom)
  const [loader, setLoader] = useState(false)
  const [extraData, setExtraData] = useState(new Date())

  // ---------- Initial Rendering ---------
  useEffect(() => {
    console.log("spreadsheet========", route?.params?.spreadSheet)
    getSpreadsheetBySpreadsheetId(route?.params?.spreadSheet?.id)
  }, [])

  // ----------- Pull to Refresh SpreadSheet Row ----------
  const onRefresh = () => {
    getSpreadsheetBySpreadsheetId(spreadSheet.id)
  }

  // ------------- Get SpreadSheet List -----------
  const getSpreadsheetBySpreadsheetId = (spreadSheetId: String) => {
    setLoader(true)
    get_SpreadSheetRowBySpreadSheetId(spreadSheetId).then((response: any) => {
      setLoader(false)
      console.log("spreadsheetResp========", response)
      setSpreadSheetData(response.data.spreadSheetRowsBySpreadsheetID.items)
    }).catch((error) => {
      setLoader(false)
      console.log("spreadSheetListErr========", error)
    })
  }

  // --------- Open Edit Record Popup --------
  const openEditRecordPopup = (spreadSheetRow: any) => {
    setSelectedRow(spreadSheetRow)
    child.current.childFunction1();
  }

  // --------- onClick Edit Record --------
  const onEditRecord = () => {
    child.current.childFunction2();

    console.log("spreadSheetRow======", selectedRow)
    console.log("spreadSheet======", spreadSheet)
    navigation.navigate("RowdetailForm", { spreadSheetRow: selectedRow, spreadSheet: spreadSheet, isEdit: true, isFrom: isFrom })
  }

  // ----------- Delete Row Alert ------------
  const deleteAlert = () => {
    child.current.childFunction2();
    Alert.alert(label.ExpensesList.Delete_Record_Alert, label.ExpensesList.Delete_Quete, [
      {
        text: label.ExpensesList.Cancel,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: label.ExpensesList.OK, onPress: () => onDeleteRow() },
    ]);
  }

  // ------------ Delete Row ------------
  const onDeleteRow = () => {
    console.log("selectedRow========", selectedRow)
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
    spreadSheetRow_softDelete(deleteRow).then((response: any)=>{
        console.log("softDeleteRowResp=========",response)
        setLoader(false)
    }).catch((error)=>{
      setLoader(false)
      console.log("deleteRow=======",error)
    })
  }

  const Footer = () => {
    return <View style={Style.footer} />;
  };

  const renderItems = ({ item }: any) => (
    console.log("spreadItem======", item),
    <View style={Style.margingap}>
      <Attendancelistcard item={item} openEditRecord={() => openEditRecordPopup(item)} />
    </View>
  );
  return (
    <>
      <View style={Style.container}>
        <View>
          <NewCommonHeader
            BackButton={<BackButton onPress={() => isFrom == "CloudSheetTab" ? navigation.navigate('ClousheetList') : navigation.navigate('CreateTemplate')} />}
            Folder={<Document />}
            heading={spreadSheetName}
            styling={120}
          />
          <View style={Style.searchbarview}>
            <Searchbar placeholder={"Search here"} />
          </View>
        </View>
        <View style={Style.flatlistview}>
          <FlatList
            data={spreadSheetData}
            renderItem={renderItems}
            ListFooterComponent={<Footer />}
            extraData={extraData}
            refreshing={false}
            onRefresh={onRefresh}
          />
        </View>
        <TouchableOpacity
          style={Style.buttonmainview}
          // onPress={() => navigation.navigate("Updateattendance")}
          onPress={() => navigation.navigate("RowdetailForm", { spreadSheet: spreadSheet })}
        >
          <View style={Style.buttonviewnew}>
            <Fatlogo />
          </View>

          <Text style={Style.addrowtext}>
            {label.Attendancelistlabels.buttontext}
          </Text>
        </TouchableOpacity>
      </View>
      <CommonBottomsheet
        ref={child}
        snapPoints={snapPoints}
        children={<EditSpreadsheetRecord
          editRecord={() => onEditRecord()}
          deleteTemplate={() => deleteAlert()}
          spreadSheetRow={selectedRow}
          editlabel={label.Edit_Delete_Cloud.EditCloudSheetRecord}
          deletelabel={label.Edit_Delete_Cloud.DeleteCloudSheet}
        />}
        
      />
      {loader?<CommonLoader/>:null}
    </>
  );
};

export default Attendancelist;

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbarview: {
    position: "absolute",
    marginTop: height * 0.13, // 10 percentage of the screen height,
    alignSelf: "center",
    bottom: -20,
  },
  subuttnview: {},
  buttonviewnew: { paddingRight: 10 },
  addrowtext: {
    fontSize: 14,
    fontFamily: FONTS.inter_semibold,
    color: COLOURS.white,
  },
  flatlistview: {
    marginTop: 35,
    marginHorizontal: 15,
  },
  buttonmainview: {
    marginHorizontal: 20,
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: COLOURS.Skyblue,
    alignSelf: "center",
    width: "90%",
  },
  margingap: {
    marginTop: 30,
  },
  footer: {
    height: 300,
  },
});
