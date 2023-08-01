import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLOURS, FONTS } from "../../utils/Constant";

const CommonCard = (props: any) => {
  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      style={Style.container}
      onPress={props.onPress}
    >
      <View style={{ opacity: props.isDisabled ? 0.3 : 1 }}>{props.icon}</View>
      <Text style={props.isDisabled ? Style.disabeledTextStyle : Style.text}>
        {props.heading}
      </Text>
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
    color: COLOURS.black,
  },
  disabeledTextStyle: {
    fontFamily: FONTS.inter_regular,
    fontSize: 15,
    paddingLeft: 15,
    color: COLOURS.lightgrey,
  },
});
