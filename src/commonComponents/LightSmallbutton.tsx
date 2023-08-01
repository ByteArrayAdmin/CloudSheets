import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { FONTS } from "../utils/Constant";

const LightSmallButton = (props: any) => {
  return (
    <TouchableOpacity style={Style.Button} onPress={props.onPress}>
      <Text style={Style.canceltext}>{props.buttontext}</Text>
    </TouchableOpacity>
  );
};

export default LightSmallButton;

const Style = StyleSheet.create({
  Button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "rgba(0, 97, 255, .1)",
  },
  canceltext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: "#0061FF",
    paddingHorizontal: 50,
  },
});
