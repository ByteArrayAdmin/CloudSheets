import { StyleSheet } from "react-native";
import { FONTS } from "../../../utils/Constant";

export const Tempatestyle = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  logoview: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 94,
  },
  cloudview: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  cloudtext: {
    fontFamily: FONTS.manrope_bold,
    fontSize: 19,
    color: "#FFFFFF",
  },
  sheetetxt: {
    fontFamily: FONTS.MANROPE_NORMAL,
    fontSize: 19,
    color: "#FFFFFF",
  },
  Cardcontainer: {
    marginTop: 30,
  },
  subcontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardtextstyle: {
    paddingTop: 15,
    textAlign: "center",
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color: "#001521",
  },
  cardtetxt2: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  Bottomsheetview: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 375,
    borderRadius: 25,
  },
  firstview: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  secondviewmain: { marginTop: 30, marginHorizontal: 15 },
  newtemplattext: {
    fontSize: 20,
    fontFamily: FONTS.manrope_semibold,
    color: "#001521",
  },
  subheadingtext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: "#001521",
    paddingTop: 5,
    opacity: 0.6,
  },
  entertemplatetext: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
    color: "#001521",
    opacity: 0.6,
  },
  canceltext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: "#FFFFFF",
  },
  create: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: "#0061FF",
  },
  Button: {
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 55,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#0061FF",
  },
  secondbutton: {
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 55,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "rgba(0, 97, 255, .1)",
  },
  Buttonview: {
    marginTop: 30,
    marginHorizontal: 15,
    flexDirection: "row",
  },
  authcardview: {
    marginTop: 50,
  },
  cartdtetxt: {
    marginHorizontal: 40,
  },
  inputview: {
    height: 50,
    width: '100%',
    fontFamily: FONTS.inter_regular,
  },
  
});
