import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import { useNavigation, CommonActions } from "@react-navigation/native";
// import labels from "../../../../utils/ProjectLabels.json";
import UseLogo from "../.../../../../../assets/Images/userLogo.svg";
import Exclaim from "../../../../assets/Images/exclaimationlogo.svg";
import UseCard from "./UseCard";
import Ratelogo from "../../../../assets/Images/Ratelogo.svg";
import Privacylogo from "../../../../assets/Images/privacylogo.svg";
import CusSupportlogo from "../../../../assets/Images/cussupportlogo.svg";
import TermLogo from "../../../../assets/Images/TermLogo.svg";
import Helplogo from "../../../../assets/Images/Helplogo.svg";
import MessageLog from "../../.../../../../assets/Images/MessageLogo.svg";
import { Styles } from "./style";
import Profile from "../../../../assets/Images/ProfileLogo.svg";
import PassLogo from "../../../../assets/Images/PasswordLogo.svg";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Crown from "../../../../assets/Images/crown.svg";
import SubcriptionScreenCard from "../SubscriptionPlanScreen/SubscriptionScreenCard";
import CommonLoader from "../../../../commonComponents/CommonLoader";
import {
  track_Screen,
  track_Click_Event,
  track_Success_Event,
  track_Error_Event,
  signOut_Event,
} from "../../../../eventTracking/index";
import {
  eventName,
  screenName,
  clickName,
  successActionName,
  errorActionName,
} from "../../../../utils/Constant";
import { Auth } from "aws-amplify";
import {checkNetwork} from '../../../../API_Manager/index';
import Rate, { AndroidMarket } from 'react-native-rate';
declare global {
  var labels: any;
}
const UserSection = () => {
  var labels = global.labels;
  const navigation = useNavigation();
  const Tabheight = useBottomTabBarHeight();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    track_Screen(eventName.TRACK_SCREEN, screenName.USER_TAB_SCREEN);
  }, []);

  // ----------- SignOut Alert -----------

  const signOut_Alert = () => {
    Alert.alert(
      labels.SubscriptionScreen.SIGNOUT_ALERT,
      labels.SubscriptionScreen.SIGNOUT_QUOTE,
      [
        {
          text: labels.SubscriptionScreen.CANCEL,
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
        { text: labels.SubscriptionScreen.OK, onPress: () => checkInternet() },
      ]
    );
  };
// ----------- get network ------------
const checkInternet = ()=>{
  checkNetwork().then((isConnected)=>{
    console.log("isConectedResp=======",isConnected)
    if(isConnected){
      signOut()
    }else{
      Alert.alert(labels.checkNetwork.networkError)
    }
  }).catch((error)=>{
    console.log("networkErr======",error)
  })
}
  // ------------ Signout Function ------------
  async function signOut() {
    track_Click_Event(eventName.TRACK_CLICK, clickName.CLICK_ON_SIGN_OUT);
    setLoader(true);
    try {
      signOut_Event();
      await Auth.signOut();
      setLoader(false);
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      setLoader(false);
      track_Error_Event(
        eventName.TRACK_ERROR_ACTION,
        errorActionName.SIGN_OUT_ERROR
      );
      console.log("error signing out: ", error);
    }
  }

  // ----------- Navigate to Register ----------
  const onClickRegister = () => {
    track_Click_Event(eventName.TRACK_CLICK, clickName.CLICK_ON_REGISTER);
    navigation.dispatch(
      CommonActions.reset({
        routes: [{ name: "Signupscreen" }],
      })
    );
  };

  // ----------- Handle Rateus --------------
  const handleRateApp = () => {
    const options = {
      GooglePackageName: 'your_package_name', // Replace 'your_package_name' with your Android package name
      AmazonPackageName: 'your_amazon_package_name', // Replace 'your_amazon_package_name' with your Amazon package name (if applicable)
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: false,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: 'your_app_url_on_app_store', // Replace 'your_app_url_on_app_store' with your app's URL on the App Store (for iOS)
      inAppDelay: 2000,
      inAppTitle: 'Rate Your App',
      inAppMessage: 'If you enjoy using this app, would you mind taking a moment to rate it?',
      // playStoreFlags: [Rate.PlayStoreFlags.InAppReview],
    };

    Rate.rate(options);
  };
  return (
    <>
      <NewCommonHeader
        // BackButton={<BackButton onPress={() => navigation.goBack()} />}
        heading={labels.Guestscreen.MyAccount}
        Folder={<UseLogo />}
      />
      <View style={Styles.container}>
        {global.isLoggedInUser ? (
          <>
            <View style={Styles.SubcriptionplanView}>
              <View>
                <Text style={Styles.subcriptext}>
                  {labels.SubscriptionScreen.SubscriptionPlan}
                </Text>
                <Text style={Styles.subcripsubtext}>
                  {labels.SubscriptionScreen.Upgradeformorefeatures}
                </Text>
                <Text style={Styles.commingSoonText}>
                  {labels.SubscriptionScreen.Comming_Soon}
                </Text>
              </View>
              <View style={Styles.space}></View>
              <View style={Styles.crownpadding}>
                <Crown />
              </View>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={Styles.Registerview}
            onPress={() => onClickRegister()}
          >
            <View>
              <Exclaim />
            </View>
            <View>
              <Text style={Styles.registertext}>
                {labels.Guestscreen.Registertext}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View>
          <Text style={Styles.Accounttext}>{labels.Guestscreen.Account}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {global.isLoggedInUser ? (
            <>
              <UseCard
                Logo={<Profile />}
                heading={labels.Guestscreen.Profile}
                onPress={() => {
                  navigation.navigate("EditProfile"),
                    track_Click_Event(
                      eventName.TRACK_CLICK,
                      clickName.CLICK_ON_PROFILE_TAB
                    );
                }}
              />
              <View style={Styles.horizontallineview}>
                <View style={Styles.innerhoeizontaline} />
              </View>

              <UseCard
                Logo={<PassLogo />}
                heading={labels.Guestscreen.Password}
                onPress={() => {
                  navigation.navigate("ResetPassword"),
                    track_Click_Event(
                      eventName.TRACK_CLICK,
                      clickName.CLICK_ON_CHANGE_PASSWORD_TAB
                    );
                }}
              />
              <View style={Styles.horizontallineview}>
                <View style={Styles.innerhoeizontaline} />
              </View>
            </>
          ) : null}
          <UseCard
            Logo={<Ratelogo />}
            heading={labels.Guestscreen.RateUs}
            onPress={() => {
              // navigation.navigate("RateUs")
              handleRateApp()
              ,
                track_Click_Event(
                  eventName.TRACK_CLICK,
                  clickName.CLICK_ON_RATE_US_TAB
                );
            }}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>

          <UseCard
            Logo={<Privacylogo />}
            heading={labels.Guestscreen.PrivacyPolicy}
            onPress={() => {
              navigation.navigate("PrivacyScreen"),
                track_Click_Event(
                  eventName.TRACK_CLICK,
                  clickName.CLICK_ON_PRIVACY_POLICY_TAB
                );
            }}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard
            Logo={<CusSupportlogo />}
            heading={labels.Guestscreen.CustomerSupport}
            onPress={() => {
              navigation.navigate("Customer_Support_Screen"),
                track_Click_Event(
                  eventName.TRACK_CLICK,
                  clickName.CLICK_ON_CUSTOMER_SUPPORT_TAB
                );
            }}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard
            Logo={<TermLogo />}
            heading={labels.Guestscreen.TermsandConditions}
            onPress={() => {
              navigation.navigate("Terms_Conditions_Screen"),
                track_Click_Event(
                  eventName.TRACK_CLICK,
                  clickName.CLICK_ON_TERMS_AND_CONDITIONS_TAB
                );
            }}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard
            Logo={<Helplogo />}
            heading={labels.Guestscreen.FAQ}
            onPress={() => {
              navigation.navigate("Faq_Screen"),
                track_Click_Event(
                  eventName.TRACK_CLICK,
                  clickName.CLICK_ON_FAQ_TAB
                );
            }}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard
            Logo={<Helplogo />}
            heading={labels.Guestscreen.Signout}
            onPress={() => signOut_Alert()}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard
            Logo={<MessageLog />}
            heading={labels.Guestscreen.Help}
            onPress={() => {
              navigation.navigate("Help_Screen"),
                track_Click_Event(
                  eventName.TRACK_CLICK,
                  clickName.CLICK_ON_HELP_TAB
                );
            }}
          />
          <View style={{ height: Tabheight }}></View>
        </ScrollView>
        {loader ? <CommonLoader /> : null}
      </View>
    </>
  );
};

export default UserSection;
