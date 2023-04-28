/* eslint-disable react-native/no-inline-styles */
import Verysmalllogo from "../../../../assets/Images/verysmalllogo.svg";
import CrownLogo from "../../../../assets/Images/crownLogo.svg";
import SearcBar from "../../../../commonComponents/Searchbar";
import { styles } from "./style";
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Clousheetlistscreen from "../../../../utils/ProjectLabels.json";
import { useNavigation } from "@react-navigation/native";
import { COLOURS } from "../../../../utils/Constant";

const FlatListHeader = () => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar backgroundColor={COLOURS.Skyblue} />
      <SafeAreaView style={{ backgroundColor: COLOURS.Skyblue }}></SafeAreaView>
      <View style={styles.mainconatiner}>
        <View style={styles.cloudsheetcontainer}>
          <View>
            <Verysmalllogo />
          </View>
          <View style={styles.cloudtextcontainer}>
            <Text style={styles.cloudtext}>
              {Clousheetlistscreen.cloudsheetlistconstant.CLOUDSHEETS}
            </Text>
            <Text style={styles.sheettext}>
              {Clousheetlistscreen.cloudsheetlistconstant.SHEETS}
            </Text>
          </View>
          <View style={styles.upgradeconatinerstyle} />
          <TouchableOpacity
            style={styles.upgradeContainer}
            onPress={() => navigation.navigate("UpdateCloudsheet")}
          >
            <View>
              <CrownLogo />
            </View>
            <View>
              <Text style={styles.upgradetext}>
                {Clousheetlistscreen.cloudsheetlistconstant.UPGRADE}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default FlatListHeader;
