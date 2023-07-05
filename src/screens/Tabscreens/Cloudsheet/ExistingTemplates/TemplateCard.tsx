import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FONTS, COLOURS } from "../../../../utils/Constant";
import Logo from "../../../../assets/Images/ColourFolder.svg";
import Threedots from "../../../../assets/Images/threedots.svg";
import moment from "moment";
import RightArrow from "../../../../assets/Images/RightArrow.svg";
const TemplateCard = (props: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Logo />
      </View>
      <View>
        <Text style={styles.textstyle}>{props?.item?.template_name}</Text>
        <Text style={styles.datestyle}>
          {moment(props?.item?.createdAt).format("MMM DD, YYYY | hh:mm a")}
        </Text>
      </View>
      <View style={styles.space}></View>
      <View style={styles.imagestyle}>
        <RightArrow />
      </View>
    </View>
  );
};

export default TemplateCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  textstyle: {
    fontFamily: FONTS.inter_semibold,
    fontSize: 14,
    paddingLeft: 15,
    color: COLOURS.black,
  },
  datestyle: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    paddingLeft: 15,
    color: COLOURS.black,
    opacity: 0.6,
    paddingTop: 10,
  },
  space: {
    flex: 1,
  },
  imagestyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    position: "absolute",
    right: 15,
    // bottom: 40,
  },
});
