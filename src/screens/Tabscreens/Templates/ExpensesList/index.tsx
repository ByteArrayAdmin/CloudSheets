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
import { useNavigation,useRoute } from "@react-navigation/native";
import Doclogo from "../../../../assets/Images/documentdark.svg";
import SearcBar from "../../../../commonComponents/Searchbar";
import ListCard from "./ListCard";
import { Styles } from "../RowDetailForm/style";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import SubcriptionPlan from "../../../../screens/Popups/SubcriptionPopup";
import {get_SpreadSheetRowBySpreadSheetId} from '../../../../API_Manager/index';

const ExpensesList = (props: any) => {
  const route = useRoute()
  const navigation = useNavigation();
  const child = useRef();
  const snapPoints = ["35%"];
  const [spreadSheetId, setSpreadSheetId] = useState(route?.params?.spreadSheetId)
  const [spreadSheetData, setSpreadSheetData] = useState([])
  const DATA = [
    { id: 1, itemname: "Grocery" },
    {
      id: 2,
      itemname: "FoodItems",
      ExpenseName: "FoodItems",
      ExpensesDate: "16 January,2023",
      ExpensesType: "Scan Code",
      ExpensesAmount: "$15",
    },
  ];

  const OpenPopup = () => {
    child.current.childFunction1();
  };

  useEffect(() => {
    console.log("spreadSheetId========",spreadSheetId)
    // OpenPopup();
    get_SpreadSheetRowBySpreadSheetID()
  }, []);

  const get_SpreadSheetRowBySpreadSheetID = ()=>{
    get_SpreadSheetRowBySpreadSheetId(spreadSheetId).then((response: any)=>{
        console.log("spreadRowResp======",response)
        setSpreadSheetData(response.data.spreadSheetRowsBySpreadsheetID.items)
    }).catch((error)=>{
        console.log("spreadRowErr========",error)
    })
  }

  const RenderItems = ({ item }: any) => <ListCard items={item} />;
  return (
    <View style={Style.container}>
      <View>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          heading={labels.ExpensesList.JanuaryExpenses}
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
