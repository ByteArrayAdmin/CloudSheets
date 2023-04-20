import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Logo from "../assets/Images/Logo.svg";
import { styles } from "../screens/Auth/signup/style";
import { Signupconstant } from "../../src/utils/Constant";
import { FONTS,COLOURS } from "../../src/utils/Constant";

const Layout = (props: any) => {
  return (
    <SafeAreaView style={style.maincontainer}>
      <View style={style.subcontainer}>
        <View style={style.backgroundview} />
        <View style={style.backgroundviewhite} />
        <View style={styles.skipText}>
          <Text style={styles.skioptextcolor}>{Signupconstant.SKIP}</Text>
        </View>
        <View style={style.cardstyle}>
          <View style={style.view}>
            <Logo />
          </View>
        </View>
        <View style={styles.createAccountview}>
          <View style={styles.createView}>
            <Text style={styles.CreateAccounttext}>{props.Heading}</Text>
          </View>
          <View style={styles.registerdText}>
            <Text style={styles.registertext}>{props.subheading}</Text>
          </View>
        </View>
        {props.childern}
        {props.footer}
      </View>
    </SafeAreaView>
  );
};

export default Layout;

const style = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  subcontainer: {
    flex: 1,
    backgroundColor: COLOURS.white,
  },
  backgroundview: { flex: 1, backgroundColor: COLOURS.Skyblue },
  backgroundviewhite: { flex: 1, backgroundColor: COLOURS.white },
  cardstyle: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  view: { marginTop: 100 },
});
