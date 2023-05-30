import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import { styles } from "screens/Auth/signup/style";
import { COLOURS, FONTS } from "../../../utils/Constant";
import CommonCard from "../CommonCard";
import Edit from "../../../assets/Images/Edit.svg";
import Delete from "../../../assets/Images/Deleteicon.svg";
import labels from "../../../utils/ProjectLabels.json";
import InfoCircle from "../../../assets/Images/infocircle.svg";
import moment from 'moment';

const EditSpreadsheetRecord = (props: any) => {
    console.log("props=====",props?.spreadSheetRow)
    let spreadSheetData = JSON.parse(props?.spreadSheetRow?.items)
  return (
    <View style={Style.container}>
      <View style={Style.topSpace}>
        <Text style={Style.nametext}>{ Object.values(spreadSheetData)[0]}</Text>
        <View style={Style.space}>

        </View>
        <View>
          <InfoCircle />
        </View>
      </View>

      <View>
        <Text style={Style.datetetxt}>{moment(props?.spreadSheetRow?.createdAt).format("MMM DD, YYYY | h:mm a")}</Text>
      </View>
      <View style={Style.newspace}></View>
      <CommonCard
        onPress={props.editRecord}
        icon={<Edit />}
        heading={props.editlabel}
      />
      <View style={Style.Cardspace}></View>
      <CommonCard
        onPress={props.deleteTemplate}
        icon={<Delete />}
        heading={props.deletelabel}
      />
    </View>
  );
};

export default EditSpreadsheetRecord;

const Style = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  topSpace: {
    marginTop: 30,
    flexDirection: 'row'
  },
  nametext: {
    fontSize: 18,
    fontFamily: FONTS.inter_semibold,
    paddingBottom: 10,
    color: COLOURS.black
  },
  datetetxt: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
    paddingBottom: 10,
    opacity: 0.6,
    color: COLOURS.black
  },
  Cardspace: {
    marginTop: 25,
  },
  space: {
    flex: 1
  },
  newspace: {
    marginTop: 20
  }
});
