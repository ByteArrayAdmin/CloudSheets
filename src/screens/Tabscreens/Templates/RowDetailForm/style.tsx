import { COLOURS, FONTS } from "../../../../utils/Constant";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
  } from "react-native";


export const Styles = StyleSheet.create({
    container: {
     flex: 1,
    },
    sucontainer: {
      // flex:1,
      marginHorizontal: 15,
      marginTop: 18,
      backgroundColor: COLOURS.white,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingBottom:15
    },
    inputview: {
      height: 50,
      paddingLeft: 16,
      fontFamily: FONTS.inter_regular,
      fontSize: 12,
    },
    nametext: {
      fontSize: 12,
      fontFamily: FONTS.inter_regular,
      color: COLOURS.black,
    },
    Attendancetext: {
      paddingVertical: 15,
      fontSize: 12,
      fontFamily: FONTS.inter_regular,
      color: COLOURS.black,
    },
    enterdate: {
      fontFamily: FONTS.inter_regular,
      fontSize: 12,
      color: COLOURS.black,
      opacity: 0.5,
      paddingLeft: 16,
    },
    datepickerview: {
      height: 50,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLOURS.offwhite,
      marginTop:15
    },
    presenttextview: {
      paddingTop: 15,
      fontSize: 12,
      fontFamily: FONTS.inter_regular,
      color: COLOURS.black,
    },
    calenderview: {
      flex: 1,
    },
    calenderlogview: { marginRight: 17 },
    lastview: {justifyContent:'flex-end',bottom:30},
    viewMargin:{marginVertical:15},
    marginTop_15:{
      marginTop:15
    },
    borderWidth:{
      borderWidth:1
    },
    columnView:{
      marginTop: 15 
    }
    
  });