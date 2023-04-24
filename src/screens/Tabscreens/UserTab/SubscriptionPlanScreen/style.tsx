
import { COLOURS, FONTS } from "../../../../utils/Constant";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

export const Styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 15,
    },
    Registerview: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLOURS.lightred,
      marginTop: 25,
      borderRadius: 8,
    },
    registertext: {
      color: COLOURS.orignalred,
      fontFamily: FONTS.inter_regular,
      fontSize: 14,
      paddingLeft: 15,
    },
    Accounttext: {
      fontFamily: FONTS.inter_semibold,
      fontSize: 14,
      paddingVertical: 25,
    },
    innerhoeizontaline: {
      flex: 1,
      height: 1.5,
      backgroundColor: COLOURS.lightgrey,
    },
    horizontallineview: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 15,
    },
    SubcriptionplanView: {
      backgroundColor: COLOURS.Skyblue,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 25,
      paddingLeft: 25,
      height: 108,
      borderWidth: 1,
      borderRadius: 10,
    },
    subcriptext: {
      color: COLOURS.white,
      fontFamily: FONTS.manrope_bold,
      fontSize: 20,
    },
    subcripsubtext: {
      color: COLOURS.white,
      fontFamily: FONTS.inter_regular,
      fontSize: 12,
      paddingTop: 5,
    },
    space: {
      flex: 1,
    },
    bottomspace:{
      marginBottom: 120 
    },
    crownpadding:{ paddingRight: 24 }
  });