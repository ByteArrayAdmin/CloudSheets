import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { COLOURS, FONTS } from "../utils/Constant";

const SmallButton = (props: any) => {
  return (
    <TouchableOpacity style={Style.Button} onPress={props.onPress}>
      <Text style={Style.canceltext}>{props.buttontext}</Text>
    </TouchableOpacity>
  );
};

export default SmallButton;

const Style = StyleSheet.create({
  Button: {
    height: 50,
    justifyContent: "center",
    alignItems:'center',
    borderRadius: 8,
    backgroundColor: COLOURS.Skyblue,
  },
  canceltext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.white,
    paddingHorizontal: 50,
  },
});
