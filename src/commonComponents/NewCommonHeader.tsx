import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { COLOURS, FONTS } from "../utils/Constant";
const { height } = Dimensions.get("window");

const NewCommonHeader = (props: any) => {
  return (
    <>
      <SafeAreaView style={styles.backgroundcolour}></SafeAreaView>
      <View
        style={[
          styles.maincontainer,
          { height: props.styling ? props.styling : 100 },
        ]}
      >
        <View>
          <View style={styles.headerconatiner}>
            {props.BackButton ? props.BackButton : null}

            <View style={styles.foldericonmargin}>{props.Folder}</View>
            <View style={{ width: "80%" }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.classattendancetext}
              >
                {props.heading}
              </Text>
            </View>
            <View style={{ flex: 1 }}></View>
            {props.SecondImg ? (
              <TouchableOpacity style={{ right: 30 }} onPress={props.onpress}>
                {props.SecondImg}
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </>
  );
};

export default NewCommonHeader;

const styles = StyleSheet.create({
  backgroundcolour: {
    backgroundColor: COLOURS.Skyblue,
  },
  maincontainer: {
    height: 100,
    backgroundColor: COLOURS.Skyblue,
  },

  headerconatiner: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 22,
  },
  foldericonmargin: {
    marginLeft: 5,
  },
  classattendancetext: {
    paddingLeft: 8,
    fontFamily: FONTS.manrope_semibold,
    fontSize: 18,
    color: "#FFFFFF",
  },
  space: {
    flex: 1,
  },
});
