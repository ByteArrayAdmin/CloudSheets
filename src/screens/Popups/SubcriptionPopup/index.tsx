import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FONTS, COLOURS } from "../../../utils/Constant";
import labels from "../../../utils/ProjectLabels.json";
import CustonButton from "../../../commonComponents/Button"

const SubcriptionPlan = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textview}>
        <Text style={styles.subcriptiontext}>
          {labels.SubcriptionplanPoup.SubscriptionPlan}
        </Text>
        <View>
          <Text style={styles.othertext}>{labels.SubcriptionplanPoup.infotext}</Text>
        </View>
        <View style={styles.Textview}>
          <Text style={styles.subSubcriptiontext}>{labels.SubcriptionplanPoup.SubscriptionPlan}</Text>
          <Text style={styles.othertext}>{labels.SubcriptionplanPoup.infotextsecond}</Text>
        </View>
      </View>
      <View>
        <CustonButton Register={labels.SubcriptionplanPoup.SubscribeNow}/>
      </View>
    </View>
  );
};

export default SubcriptionPlan;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  textview: {
    justifyContent: "center",
    alignItems: "center",
  },
  subcriptiontext: {
    fontFamily: FONTS.manrope_semibold,
    fontSize: 20,
    paddingBottom: 10,
  },
  subSubcriptiontext: {
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color:COLOURS.Skyblue,
    

  },
  othertext: {
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    opacity:0.6,
    padding:5
  },
  Textview:{ flexDirection: "row", justifyContent:'center', alignItems:'center'}
});
