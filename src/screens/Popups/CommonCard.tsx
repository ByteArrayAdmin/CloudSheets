import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLOURS, FONTS } from "../../utils/Constant";

const CommonCard = (props: any) => {
  return (
    <TouchableOpacity style={Style.container}
    onPress={props.onPress}
    >
      <View>{props.icon}</View>
      <Text style={Style.text}>{props.heading}</Text>
    </TouchableOpacity>
  );
};

export default CommonCard;

const Style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: FONTS.inter_regular,
    fontSize: 15,
    paddingLeft: 15,
    color:COLOURS.black
  },
});
