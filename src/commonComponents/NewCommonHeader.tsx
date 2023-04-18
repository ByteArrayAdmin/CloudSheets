import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLOURS, FONTS } from "../utils/Constant";

const NewCommonHeader = (props: any) => {
  return (
    <View style={styles.maincontainer}>
      <View>
        <View style={styles.headerconatiner}>
          <TouchableOpacity onPress={props.onPress}>
            {props.BackButton}
          </TouchableOpacity>
          <View style={styles.foldericonmargin}>{props.Folder}</View>
          <View>
            <Text style={styles.classattendancetext}>{props.heading}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewCommonHeader;

const styles = StyleSheet.create({
  maincontainer: {
    height: 130,
    backgroundColor: COLOURS.Skyblue,
  },

  headerconatiner: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 60,
  },
  foldericonmargin: {
    marginLeft: 16,
  },
  classattendancetext: {
    paddingLeft: 8,
    fontFamily: FONTS.manrope_semibold,
    fontSize: 18,
    color: "#FFFFFF",
  },
});
