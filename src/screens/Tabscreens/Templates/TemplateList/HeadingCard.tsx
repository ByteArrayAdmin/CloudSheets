import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import Logo from "../../../../assets/Images/ColourFolder.svg";
import Threedots from "../../../../assets/Images/threedots.svg";
import moment from 'moment';

const HeadingCard = (props: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Logo />
      </View>
      <View>
        <Text style={styles.textstyle}>{props?.template?.template_name}</Text>
        <Text style={styles.datestyle}>{moment(props?.template?.createdAt).format("MMM DD, YYYY | HH:mm a")}</Text>
      </View>
      <View style={styles.space}></View>
      {/* <View style={styles.imagestyle}>
        <Threedots />
      </View> */}
      <View></View>
    </View>
  );
};

export default HeadingCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
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
    position: "absolute",
    right: 15,
    bottom: 48,
  },
});
