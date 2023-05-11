import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
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
import { useNavigation ,useRoute} from "@react-navigation/native";
import {get_SpreadSheetRowBySpreadSheetId} from '../../../../API_Manager/index';
const { height } = Dimensions.get("window");

const Attendancelist = () => {
  
  const navigation = useNavigation();
  const route = useRoute()
  const [Data, setdata] = useState([{ id: 1 }]);
  const [spreadSheet, setSpreadSheet] = useState(route?.params?.spreadSheet)
  const [spreadSheetName, setSpreadSheetName] = useState(route?.params?.spreadSheet?.spreadsheet_name)
  const [spreadSheetData, setSpreadSheetData] = useState([])

  useEffect(()=>{
      console.log("spreadsheet========",route?.params?.spreadSheet)
      getSpreadsheetBySpreadsheetId(route?.params?.spreadSheet?.id)
  }, [])

  const getSpreadsheetBySpreadsheetId = (spreadSheetId:String)=>{
    get_SpreadSheetRowBySpreadSheetId(spreadSheetId).then((response: any)=>{
        console.log("spreadsheetResp========",response)
        setSpreadSheetData(response.data.spreadSheetRowsBySpreadsheetID.items)
    }).catch((error)=>{
        console.log("spreadSheetListErr========",error)
    })
  }

  const Footer = () => {
    return <View style={Style.footer} />;
  };

  const renderItems = ({item}:any) => (
    console.log("spreadItem======",item),
    <View style={Style.margingap}>
      <Attendancelistcard  item={item} />
    </View>
  );
  return (
    <>
      <View style={Style.container}>
        <View>
          <NewCommonHeader
            BackButton={<BackButton onPress={() => navigation.navigate('CreateTemplate')} />}
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
          />
        </View>
        <TouchableOpacity
          style={Style.buttonmainview}
          // onPress={() => navigation.navigate("Updateattendance")}
          onPress={()=>navigation.navigate("RowdetailForm",{spreadSheet:spreadSheet})}
        >
          <View style={Style.buttonviewnew}>
            <Fatlogo />
          </View>

          <Text style={Style.addrowtext}>
            {label.Attendancelistlabels.buttontext}
          </Text>
        </TouchableOpacity>
      </View>
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
