
import { FONTS, COLOURS } from "../../../../utils/Constant";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
  } from "react-native";

export const Style = StyleSheet.create({
    container: {
      flex: 1,
    },
    subcontainer: {
      height: 193,
      backgroundColor: COLOURS.Skyblue,
    },
    headerview: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 72,
      marginHorizontal: 15,
    },
    iconview: {
      marginLeft: 16,
      marginRight: 8,
    },
    staightline: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 21,
    },
    stfraightlineview: {
      flex: 1,
      height: 0.5,
      backgroundColor: COLOURS.ligthwhite,
    },
    inputviewstyle: {
      height: 40,
      fontSize: 12,
      color: COLOURS.white,
      opacity: 0.5,
    },
    maininputview: {
      marginTop: 13,
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 28,
    },
    folderview: {
      paddingRight: 13,
    },
    inputview: { width: "90%" },
    classattendancetext: {
      fontSize: 18,
      fontFamily: FONTS.manrope_semibold,
      color: COLOURS.white,
    },
    buttonview: {
      marginTop: 284,
      justifyContent: "center",
      alignItems: "center",
    },
    subuttnview:{
      flexDirection: "row",
      paddingHorizontal: 33,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      borderRadius:8,
      backgroundColor:COLOURS.Skyblue
    },
    buttonviewnew
    :{paddingRight:10},
    addrowtext:{
  fontSize:14,
  fontFamily:FONTS.inter_semibold,
  color:COLOURS.white
    }
  
  });