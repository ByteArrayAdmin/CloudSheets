import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import NewCommonHeader from ".././../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
import labels from "../../../../utils/ProjectLabels.json";
import { useNavigation, useRoute } from "@react-navigation/native";
import Doclogo from "../../../../assets/Images/documentdark.svg";
import SearcBar from "../../../../commonComponents/Searchbar";
import ListCard from "./ListCard";
import { Styles } from "../RowDetailForm/style";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import SubcriptionPlan from "../../../../screens/Popups/SubcriptionPopup";
import { get_SpreadSheetRowBySpreadSheetId } from '../../../../API_Manager/index';
import EditDeleteCloudsheet from "../../../../screens/Popups/Edit_Delete_Cloudsheet";
import EditSpreadsheetRecord from "../../../../screens/Popups/EditSpreadsheetRecord/index";

const ExpensesList = (props: any) => {
  const route = useRoute()
  const navigation = useNavigation();
  const child = useRef();
  const editRecordRef = useRef();
  const snapPoints = ["35%"];
  const [spreadSheetDetail, setSpreadSheetDetail] = useState(route?.params?.spreadSheetDetail)
  const [spreadSheetData, setSpreadSheetData] = useState([])
  const [selectedRow, setSelectedRow] = useState({})
  const [isFrom, setIsFrom] = useState(route?.params?.isFrom)

  const OpenPopup = () => {
    child.current.childFunction1();
  };

  const onEditRecord = ()=>{
    editRecordRef.current.childFunction2();
    console.log("spreadSheetRow=======",selectedRow)
    console.log("spreadSheetDetail======",spreadSheetDetail)
    navigation.navigate("RowdetailForm",{spreadSheetRow:selectedRow,spreadSheet:spreadSheetDetail,isEdit:true,isFrom:isFrom})
  }

  const openEditRecordPopup = (spreadSheetRow: any)=>{
    setSelectedRow(spreadSheetRow)
    editRecordRef.current.childFunction1();
  }

  useEffect(() => {
    console.log("spreadSheetId========", spreadSheetDetail)
    // OpenPopup();
    get_SpreadSheetRowBySpreadSheetID()
  }, []);

  const get_SpreadSheetRowBySpreadSheetID = () => {
    get_SpreadSheetRowBySpreadSheetId(spreadSheetDetail.id).then((response: any) => {
      console.log("spreadRowResp======", response)
      setSpreadSheetData(response.data.spreadSheetRowsBySpreadsheetID.items)
    }).catch((error) => {
      console.log("spreadRowErr========", error)
    })
  }

  const RenderItems = ({ item }: any) => (
    <ListCard items={item} onPressThreeDot={()=>openEditRecordPopup(item)} />
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
        <FlatList data={spreadSheetData} renderItem={RenderItems} />
      </View>
      <CommonBottomsheet
        ref={child}
        snapPoints={snapPoints}
        children={<SubcriptionPlan />}
      />
      <CommonBottomsheet
        ref={editRecordRef}
        snapPoints={snapPoints}
        children={<EditSpreadsheetRecord
          editRecord={()=>onEditRecord()}
           spreadSheetRow={selectedRow}
           editlabel={labels.ExpensesList.Edit_CloudSheet_Record}
            deletelabel={labels.ExpensesList.Delete_CloudSheet_Record}
           />}
      />
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
    marginTop: 17,
    marginHorizontal: 15,
  },
});
