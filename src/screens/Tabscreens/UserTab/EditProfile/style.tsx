import { View, StyleSheet, Text, FlatList } from "react-native";
import { FONTS, COLOURS } from "../../../../utils/Constant";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.offwhite,
  },
  inputview: {
    height: 50,
    width: "100%",
    fontFamily: FONTS.inter_regular,
  },
  Cardcolour: {
    backgroundColor: COLOURS.white,
    marginTop: 18,
    paddingBottom: 15,
    marginHorizontal: 15,
    borderRadius: 8,
    shadowColor: COLOURS.lightgrey,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  nametext: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    paddingTop: 15,
  },
  lavbelview: {
    marginHorizontal: 23,
  },
  buttonTop:{
    marginTop:80
  }
});
