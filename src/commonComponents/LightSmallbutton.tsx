import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
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
    paddingHorizontal: 55,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "rgba(0, 97, 255, .1)",
  },
  canceltext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: "#0061FF",
  },
});
