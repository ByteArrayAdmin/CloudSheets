import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import NewCommonHeader from "../../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../../commonComponents/Backbutton";
import { useNavigation } from "@react-navigation/native";
// import labels from "../../../../../utils/ProjectLabels.json";
import CommonLayout from "../CommonLayout";
import { COLOURS } from "../../../../../utils/Constant";
import Ic_terms from "../../../../../assets/Images/Ic_terms.svg";
import { track_Screen } from "../../../../../eventTracking/index";
import { eventName, screenName } from "../../../../../utils/Constant";
declare global {
  var labels: any;
}
const Terms_Conditions_Screen = () => {
  var labels = global.labels;
  const navigation = useNavigation();

  useEffect(() => {
    track_Screen(
      eventName.TRACK_SCREEN,
      screenName.TERMS_AND_CONDITIONS_SCREEN
    );
  }, []);

  return (
    <>
      <View style={styles.container}>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          heading={labels.SubscriptionScreen.Terms_Conditions}
          Folder={<Ic_terms />}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <CommonLayout
            Heading={labels.SubscriptionScreen.Terms_Conditions}
            Content={labels.SubscriptionScreen.Terms_Content}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default Terms_Conditions_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
