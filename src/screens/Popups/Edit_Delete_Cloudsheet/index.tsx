import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { styles } from "screens/Auth/signup/style";
import { COLOURS, FONTS } from "../../../utils/Constant";
import CommonCard from "../CommonCard";
import Edit from "../../../assets/Images/Edit.svg";
import Delete from "../../../assets/Images/Deleteicon.svg";
import labels from "../../../utils/ProjectLabels.json";
import InfoCircle from "../../../assets/Images/infocircle.svg"

const EditDeleteCloudsheet = (props:any) => {
  return (
    <View style={Style.container}>
      <View style={Style.topSpace}>
        <Text style={Style.nametext}>{props.name}</Text>
        <View style={Style.space}>

        </View>
        <View>
        <InfoCircle />
        </View>
      </View>
      
      <View>
        <Text style={Style.datetetxt}>{props.date}</Text>
      </View>
      <View style={Style.newspace}></View>
      <CommonCard
        icon={<Edit />}
        heading={props.editlabel}
      />
      <View style={Style.Cardspace}></View>
      <CommonCard
        icon={<Delete />}
        heading={props.deletelabel}
      />
    </View>
  );
};

export default EditDeleteCloudsheet;

const Style = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  topSpace: {
    marginTop: 30,
    flexDirection:'row'
  },
  nametext: {
    fontSize: 18,
    fontFamily: FONTS.inter_semibold,
    paddingBottom: 10,
    color:COLOURS.black
  },
  datetetxt: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
    paddingBottom: 10,
    opacity: 0.6,
    color:COLOURS.black
  },
  Cardspace: {
    marginTop: 25,
  },
  space:{
    flex:1
  },
  newspace:{
    marginTop:20
  }
});
