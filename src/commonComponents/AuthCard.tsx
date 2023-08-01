import React from "react";
import { View, StyleSheet } from "react-native";
import { COLOURS } from "../utils/Constant";

const AuthCard = (props: any) => {
  return <View style={cardstyle.Inputfieldview}>{props.subchildren}</View>;
};
export default AuthCard;

const cardstyle = StyleSheet.create({
  Inputfieldview: {
    marginHorizontal: 15,
    backgroundColor: COLOURS.white,
    marginTop: 30,
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
});
