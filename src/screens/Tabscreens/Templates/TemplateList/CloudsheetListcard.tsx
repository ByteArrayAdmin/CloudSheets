import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import Logo from "../../../../assets/Images/ColourFolder.svg";
import Threedots from "../../../../assets/Images/threedots.svg";
import Docimage from "../../../../assets/Images/Colouredattendancelist.svg";

const CloudsheetListCard = () => {
  return (
    <View style={styles.container}>
      <View>
        <Docimage />
      </View>
      <View>
        <Text style={styles.textstyle}>January Attendance</Text>
        <Text style={styles.datestyle}>Jan 16, 2023 | 12:54 PM</Text>
      </View>
      <View style={styles.space}></View>
      <View style={styles.imagestyle}>
        <Threedots />
      </View>
      <View></View>
    </View>
  );
};

export default CloudsheetListCard;

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
    position: "absolute",
    right: 15,
    bottom: 48,
  },
});
