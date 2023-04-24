import { StyleSheet } from "react-native";
import { FONTS } from "../../../../utils/Constant";
import { COLOURS } from "../../../../utils/Constant";

const Createspreadstyle = StyleSheet.create({
  buttonview: {
    alignItems: "center",
  },
  addcoloumbutton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 29,
    flexDirection: "row",
    height: 32,
    paddingHorizontal: 15,
    marginTop: 25,
    backgroundColor: COLOURS.GREY,
    paddingVertical: 8,
  },
  Addcolumnbuttontext: {
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
    fontSize: 12,
    paddingLeft: 8,
  },
  Bottomgap: {
    marginBottom: 40,
  },
});

export default Createspreadstyle;
