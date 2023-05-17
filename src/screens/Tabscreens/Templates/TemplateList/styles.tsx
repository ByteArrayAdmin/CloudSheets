import { StyleSheet } from "react-native";
import { FONTS, COLOURS } from "../../../../utils/Constant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Flatlistviewone: {
    // marginTop: 15,
    // marginHorizontal: 15,
  },
  recentlistview: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom:20
  },
  space: {
    flex: 1,
  },
  listext: {
    fontFamily: FONTS.inter_medium,
    fontSize: 15,
    color: COLOURS.black,
  },
  viewalltext: {
    fontFamily: FONTS.inter_medium,
    fontSize: 13,
    color: COLOURS.Skyblue,
  },
  secondflatlistview: {
    marginTop: 15,
    marginHorizontal: 15,
    flex:1,
  },
  widgetposition: {
    position: "absolute",
    bottom: 30,
    right: 15,
  },
});
