import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { FONTS, COLOURS } from "../../../../utils/Constant";
import Label from "../../../../utils/ProjectLabels.json";

const SubCard = (props: any) => {
  return (
    <View>
      <View style={style.carddetails}>
        <View>
          <Text style={style.subheadingtext}>{props.subhaeding}</Text>
        </View>
        <View style={style.Space}></View>
        <View>
          <Text style={style.headingvalue}>{props.details}</Text>
        </View>
      </View>
    </View>
  );
};

export default SubCard;

const style = StyleSheet.create({
  Space: {
    flex: 1,
  },
  carddetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 10,
  },
  subheadingtext: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    opacity: 0.5,
    color: COLOURS.black,
  },
  headingvalue: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    color: COLOURS.black,
  },
});
