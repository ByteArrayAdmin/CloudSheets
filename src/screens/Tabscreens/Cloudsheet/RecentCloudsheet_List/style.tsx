import { StyleSheet } from "react-native";
import { COLOURS, FONTS } from "../../../../utils/Constant";

import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height - 640;

export const styles = StyleSheet.create({
  backgroundlayout: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
  },
  secondview: { flex: 1, backgroundColor: COLOURS.Skyblue },
  thirdview: {
    flex: 3,
    backgroundColor: COLOURS.offwhite,
  },
  cloudsheetcontainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 27,
  },
  cloudtextcontainer: {
    flexDirection: "row",
    paddingLeft: 12,
  },
  mainconatiner: {
    backgroundColor: COLOURS.Skyblue,
    height: 130,
  },
  cloudtext: {
    fontFamily: FONTS.manrope_semibold,
    fontSize: 18,
    color: COLOURS.white,
  },
  sheettext: {
    fontFamily: FONTS.MANROPE_NORMAL,
    fontSize: 18,
    color: COLOURS.white,
  },
  upgradeContainer: {
    alignItems: "center",
    // flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 11,
    backgroundColor: COLOURS.ligthwhite,
    height: 52,
  },
  upgradetext: {
    paddingLeft: 11,
    fontSize: 13,
    fontFamily: FONTS.inter_medium,
    color: COLOURS.white,
  },
  comingSoonStyle:{
    fontSize: 13,
    fontFamily: FONTS.inter_medium,
    color: "#1AD461",
  },
  inputserachview: {
    backgroundColor: COLOURS.white,
    marginHorizontal: 20,
    width: "94%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    height: 52,
    alignItems: "center",
    bottom: 25,
  },
  recentcloudview: {
    flexDirection: "row",
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  recentcloudtext: {
    fontFamily: FONTS.inter_medium,
    fontSize: 15,
    color: COLOURS.black,
  },
  viewalltext: {
    fontFamily: FONTS.inter_medium,
    fontSize: 13,
    color: COLOURS.Skyblue,
  },
  AttendanceText: {
    paddingLeft: 15,
  },
  widgetstyle: {
    position: "absolute",
    bottom: 80,
    right: 15,
  },
  upgradeconatinerstyle: {
    flex: 1,
  },
  lastview: {
    flex: 1,
  },
  flatlistview: {
    flex: 1,
  },
});
