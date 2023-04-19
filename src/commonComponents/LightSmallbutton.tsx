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
    <View style={Style.Button}>
      <Text style={Style.canceltext}>{props.buttontext}</Text>
    </View>
  );
};

export default LightSmallButton;

const Style = StyleSheet.create({
  Button: {
    height: 48,
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
