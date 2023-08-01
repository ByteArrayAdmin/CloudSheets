import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import NewCommonHeader from "../../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../../commonComponents/Backbutton";
import { useNavigation } from "@react-navigation/native";
// import labels from "../../../../../utils/ProjectLabels.json";
import CommonLayout from "../CommonLayout";
import { COLOURS, FONTS } from "../../../../../utils/Constant";
import Ic_customer from "../../../../../assets/Images/Ic_customer.svg";
import Ic_messenger from "../../../../../assets/Images/Ic_messenger.svg";
import Ic_sendMail from "../../../../../assets/Images/Ic_sendMail.svg";
import Ic_rightArrow from "../../../../../assets/Images/Ic_rightArrow.svg";
import { track_Screen } from "../../../../../eventTracking/index";
import { eventName, screenName } from "../../../../../utils/Constant";
import Clipboard from "@react-native-clipboard/clipboard";
declare global {
  var labels: any;
}
const Customer_Support_Screen = () => {
  var labels = global.labels;
  const navigation = useNavigation();

  useEffect(() => {
    track_Screen(eventName.TRACK_SCREEN, screenName.CUSTOMER_SUPPORT_SCREEN);
  }, []);

  const copyToClipboard = (email: string) => {
    Clipboard.setString(email);
    Alert.alert("copied");
  };

  return (
    <>
      <View style={styles.backgroundcolor}>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          heading={labels.SubscriptionScreen.Customer_Support}
          Folder={<Ic_customer />}
          SecondImg={<Ic_messenger />}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <CommonLayout
            Heading={labels.SubscriptionScreen.Support}
            Content={labels.SubscriptionScreen.Support_Content}
          />
          <View style={styles.Comonlayoutspaces}>
            <Text style={styles.sendTextStyle}>
              {labels.SubscriptionScreen.Send_Email}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.ButtonStyle}
            onPress={() => navigation.navigate("Customer_Support_Form")}
            onLongPress={() =>
              copyToClipboard(labels.SubscriptionScreen.Supported_Mail)
            }
          >
            <Ic_sendMail />
            <View style={styles.textleftspace}>
              <Text style={styles.supportedMailText}>
                {labels.SubscriptionScreen.Supported_Mail}
              </Text>
            </View>
            <View style={styles.commonspace}></View>
            <Ic_rightArrow />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default Customer_Support_Screen;

const styles = StyleSheet.create({
  backgroundcolor: {
    // backgroundColor: COLOURS.Skyblue,
    flex: 1,
  },
  ButtonStyle: {
    marginTop: 13,
    marginHorizontal: 15,
    height: 50,
    backgroundColor: COLOURS.Skyblue,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 20,
  },
  sendTextStyle: {
    fontFamily: FONTS.inter_semibold,
    fontSize: 14,
  },
  supportedMailText: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    color: COLOURS.white,
  },
  Comonlayoutspaces: { marginTop: 20, marginHorizontal: 15 },
  textleftspace: { marginLeft: 11 },
  commonspace: {
    flex: 1,
  },
});
