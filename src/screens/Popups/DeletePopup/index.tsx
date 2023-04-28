import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FONTS } from "../../../utils/Constant";
import labels from "../../../utils/ProjectLabels.json";
import Create from "../../../commonComponents/LightSmallbutton"
import Delete from "../../../commonComponents/SmallButton"

const DeletePopup = (props:any) => {
  return (
    <View style={Style.container}>
      <Text style={Style.messagetext}>{labels.Deletpopup.Are_you_sure}</Text>
      <View>
        <View style={Style.Textview}> 
        <Text style={Style.subtext}>{props.Textone}</Text>
        <Text style={Style.subtext}>{props.Texttwo}</Text>
        </View>
      </View>
      <View style={Style.Buttonview}>
        <Create buttontext={props.ButtonOnetext}/>
        <View style={Style.space}></View>
        <Delete buttontext={props.ButtonTwotext}/>

      </View>
    </View>
  );
};

export default DeletePopup;

const Style = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  messagetext: {
    fontFamily: FONTS.manrope_semibold,
    fontSize: 20,
    textAlign: "center",
  },
  Textview:{
    justifyContent:'center',
    alignItems:'center',
    padding:15

  },
  subtext:{
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    textAlign: "center",
    opacity:0.6,
    padding:5
  },
  Buttonview:{
    flexDirection:'row',

  },
  space:{
    flex:1
  }
});