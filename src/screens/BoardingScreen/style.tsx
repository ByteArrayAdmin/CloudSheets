import { StyleSheet } from "react-native";
import { COLOURS, FONTS } from "../../utils/Constant";

export const Homestyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.Skyblue,
  },
  mainview: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  clousheetstext: {
    color: COLOURS.white,
    fontFamily: FONTS.manrope_bold,
    fontSize: 30,
  },
  sheetstext: {
    color: COLOURS.white,
    fontFamily: FONTS.manrope_medium,
    fontSize: 30,
  },
  welcometotext: {
    marginTop: 30,
    color: COLOURS.black,
    fontSize: 20,
    fontFamily: FONTS.MANROPE_NORMAL,
  },
  cloudtext: {
    color: COLOURS.black,
    fontSize: 20,
    fontFamily: FONTS.manrope_bold,
  },
  cardText: {
    color: COLOURS.black,
    fontSize: 14,
    fontFamily: FONTS.inter_medium,
    opacity: 0.6,
    textAlign: "center",
  },
  cardview: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cardtextview: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 48,
    paddingBottom: 77,
  },
  Arrowbutton: {
    //  position: "absolute",
    //  alignSelf:'center',
    // bottom: "-22%",
    //  Top:90,
    alignSelf:'center',
    bottom:"15%",
    borderColor: COLOURS.Skyblue,
  },
  cutcardview: {
    marginTop: 160,
  },
  backgroundImgStyle:{
    position: "absolute",
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  }
});
