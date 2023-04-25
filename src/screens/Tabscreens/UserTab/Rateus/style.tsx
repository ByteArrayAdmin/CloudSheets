
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
import { COLOURS,FONTS } from "../../../../utils/Constant";


export const Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLOURS.offGrey,
    },
    Cardcontainer: {},
    Thumblogostyle: {
      marginTop: 36,
      justifyContent: "center",
      alignItems: "center",
    },
    subcardstyle: {
      marginHorizontal: 20,
      marginTop: 36,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: COLOURS.lightgrey,
      marginBottom: 20,
      borderRadius: 8,
    },
    cardtext: {
      fontFamily: FONTS.inter_regular,
      fontSize: 14,
      opacity: 0.6,
      paddingVertical: 5,
    },
    cardtext1: {
      fontFamily: FONTS.inter_regular,
      fontSize: 14,
      opacity: 0.6,
      paddingVertical: 5,
    },
    textEnjoyapp: {
      fontFamily: FONTS.manrope_semibold,
      fontSize: 20,
      paddingBottom: 5,
      paddingTop: 15,
    },
    ratingview: {
      marginTop: 15,
      marginBottom: 20,
    },
    sendfeedbacktext: {
      fontFamily: FONTS.inter_regular,
      fontSize: 12,
      opacity: 0.6,
      paddingTop: 5,
      paddingLeft: 20,
    },
    inputview: {
      height: 150,
      width: "100%",
      fontFamily: FONTS.inter_regular,
      padding: 5,
    },
    Bottom: {
      marginBottom: 20,
    },
  });