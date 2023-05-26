import React, {useState} from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
import { useNavigation, CommonActions } from "@react-navigation/native";
import labels from "../../../../utils/ProjectLabels.json";
import UseLogo from "../.../../../../../assets/Images/userLogo.svg";
import Exclaim from "../../../../assets/Images/exclaimationlogo.svg";
import { FONTS, COLOURS } from "../../../../utils/Constant";
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
import CommonLoader from '../../../../commonComponents/CommonLoader';

import { Auth } from 'aws-amplify';
const UserSection = () => {
  const navigation = useNavigation();
  const Tabheight = useBottomTabBarHeight();
  const [loader, setLoader] = useState(false);

  async function signOut() {
    setLoader(true)
    try {
      await Auth.signOut();
      setLoader(false)
      navigation.dispatch(CommonActions.reset({
        routes: [
          { name: 'Login' },]
      }))
    } catch (error) {
      setLoader(false)
      console.log('error signing out: ', error);
    }
  }

  const onClickRegister = ()=>{
    
    navigation.dispatch(CommonActions.reset({
      routes: [
        { name: 'Signupscreen' },]
    }))
  }

  return (
    <>
      <NewCommonHeader
        BackButton={<BackButton onPress={() => navigation.goBack()} />}
        heading={labels.Guestscreen.MyAccount}
        Folder={<UseLogo />}
      />
      <View style={Styles.container}>
        {global.isLoggedInUser ?
          <>
            <View style={Styles.SubcriptionplanView}>
              <View>
                <Text style={Styles.subcriptext}>
                  {labels.SubscriptionScreen.SubscriptionPlan}
                </Text>
                <Text style={Styles.subcripsubtext}>
                  {labels.SubscriptionScreen.Upgradeformorefeatures}
                </Text>
              </View>
              <View style={Styles.space}></View>
              <View style={Styles.crownpadding}>
                <Crown />
              </View>
            </View>
          </>
          :
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
        }
        <View>
          <Text style={Styles.Accounttext}>{labels.Guestscreen.Account}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        {global.isLoggedInUser ?
          <>
          <UseCard
            Logo={<Profile />}
            heading={labels.Guestscreen.Profile}
            onPress={() => navigation.navigate("EditProfile")}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>

          <UseCard Logo={<PassLogo />} heading={labels.Guestscreen.Password} />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View></>:null}
          <UseCard
            Logo={<Ratelogo />}
            heading={labels.Guestscreen.RateUs}
            onPress={() => navigation.navigate("RateUs")}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>

          <UseCard
            Logo={<Privacylogo />}
            heading={labels.Guestscreen.PrivacyPolicy}
            onPress={() => navigation.navigate("PrivacyScreen")}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard
            Logo={<CusSupportlogo />}
            heading={labels.Guestscreen.CustomerSupport}
            onPress={() => navigation.navigate("Customer_Support_Screen")}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard
            Logo={<TermLogo />}
            heading={labels.Guestscreen.TermsandConditions}
            onPress={() => navigation.navigate("Terms_Conditions_Screen")}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard
            Logo={<Helplogo />}
            heading={labels.Guestscreen.FAQ}
            onPress={() => navigation.navigate("Faq_Screen")}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard
            Logo={<Helplogo />}
            heading={labels.Guestscreen.Signout}
            onPress={signOut}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard Logo={<MessageLog />} heading={labels.Guestscreen.Help} onPress={() => navigation.navigate("Help_Screen")} />
          <View style={{ height: Tabheight }}></View>
        </ScrollView>
        {loader?<CommonLoader/>:null}
      </View>
    </>
  );
};

export default UserSection;
