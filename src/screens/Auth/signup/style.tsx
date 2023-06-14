import { StyleSheet } from "react-native";
import { COLOURS, FONTS } from "../../../utils/Constant";

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLOURS.Skyblue,
    height: "40%",
  },
  safeareastyle: {
    flex: 1,
  },
  registerdText: {
    color: COLOURS.darkblue,
    opacity: 0.8,
    paddingTop: 10,
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
  },
  DropShadow: {
    shadowColor: COLOURS.shadow_colour,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  Button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: COLOURS.Skyblue,
    marginHorizontal: 20,
    height: 48,
    borderRadius: 8,
    marginBottom: 50,
  },
  skipText: {
    marginTop: 40,
    alignItems: "flex-end",
    marginHorizontal: 10,
  },
  skioptextcolor: {
    color: COLOURS.white,
    opacity: 0.8,
  },
  CreateAccounttext: {
    color: COLOURS.white,
    fontSize: 20,
    fontFamily: FONTS.manrope_bold,
  },
  Inputfieldview: {
    marginHorizontal: 15,
    backgroundColor: COLOURS.white,
    marginTop: 30,
    borderRadius: 8,
    shadowColor: COLOURS.shadow_colour,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  registertext: {
    color: COLOURS.white,
    fontSize: 14,
  },
  createAccountview: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  createView: {
    marginTop: 30,
  },
  BottomGap: {
    marginBottom: 20,
  },
  placeholdertextstyle: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
  },
  ORviewstyle: {
    flexDirection: "row",
    marginHorizontal: 80,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  Horizontalline: {
    width: 80,
    height: 0.5,
    backgroundColor: COLOURS.Simplegrey,
  },
  ortextstyle: {
    color: COLOURS.Simplegrey,
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
  },
  googleapplebutton: {
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 67,
    borderRadius: 10,
    shadowColor: COLOURS.verydarkgrey,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    backgroundColor: COLOURS.white,
  },
  alreadyamember: {
    fontFamily: FONTS.inter_regular,
    fontSize: 13,
    color: COLOURS.darkblue,
  },
  sigintext: {
    fontFamily: FONTS.inter_semibold,
    color: COLOURS.Skyblue,
    fontSize: 13,
    paddingLeft: 8,
  },
  inputview: {
    height: 50,
    width: "100%",
    fontFamily: FONTS.inter_regular,
  },
  BottomSpace: {
    flexDirection: "row",
    marginTop: 60,
    justifyContent: "center",
  },
  dropdown1BtnTxtStyle: {
    textAlign: "left",
    paddingLeft: 1,
    fontSize: 12,
    color: COLOURS.black,
    opacity: 0.3
  },
  dropdowmstyle: {
    marginTop: 0,
    backgroundColor: COLOURS.offwhite,
    borderRadius: 10,
    height: 160
  },
  rowStyle: {
    marginHorizontal: 5,
    marginVertical: 8,
    height: 40
  },
  rowTextStyle: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 18, paddingLeft: 6
  },
});
