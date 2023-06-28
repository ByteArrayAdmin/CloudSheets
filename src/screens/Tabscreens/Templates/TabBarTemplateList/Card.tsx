import React, { useRef, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, } from "react-native";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import Logo from "../../../../assets/Images/ColourFolder.svg";
import Threedots from "../../../../assets/Images/threedots.svg";
import moment from 'moment';

const Card = (props: any) => {

  const OpenPopup = () => {
    child.current.childFunction1()
  }
  const child = useRef();

  return (
    <View style={styles.container}>
      <View>
        <Logo />
      </View>
      <View>
        <Text style={styles.textstyle}>{props?.item?.template_name}</Text>
        <Text style={styles.datestyle}>{moment(props?.item?.createdAt,["HH:mm"]).format("MMM DD, YYYY | hh:mm a")}</Text>
      </View>
      <View style={styles.space}></View>
      <TouchableOpacity style={styles.imagestyle} onPress={props.onEditTemplate}>
        <Threedots />
      </TouchableOpacity >
    </View>
  );
};

export default Card;
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

    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    position: "absolute",
    right: 15,
    bottom: 40,
  },
});
