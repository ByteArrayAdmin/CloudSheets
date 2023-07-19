import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Arrow from "../../../../assets/Images/RightArrow.svg";
import { COLOURS, FONTS } from "../../../../utils/Constant";

const SubcriptionScreenCard = (props: any) => {
  return (
    <>
      <View style={Styles.card}>
        <View>{props.Logo}</View>
        <View>
          <Text style={Styles.text}>{props.heading}</Text>
        </View>
        <View style={Styles.space}></View>
        <View>
          <Arrow />
        </View>
      </View>
      
    </>
  );
};

export default SubcriptionScreenCard;

const Styles = StyleSheet.create({
  card: {
    alignItems: "center",
    flexDirection: "row",
  },
  space: {
    flex: 1,
  },
  text: {
    paddingLeft: 25,
    fontFamily: FONTS.inter_regular,
    fontSize: 15,
    color: COLOURS.black,
  },
  
});
