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
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    paddingVertical: 25,
    color:COLOURS.black
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
});
