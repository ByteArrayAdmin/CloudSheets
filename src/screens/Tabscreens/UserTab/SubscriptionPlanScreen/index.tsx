import React from "react";
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
import { useNavigation } from "@react-navigation/native";
import labels from "../../../../utils/ProjectLabels.json";
import UseLogo from "../.../../../../../assets/Images/userLogo.svg";
import Exclaim from "../../../../assets/Images/exclaimationlogo.svg";
import { FONTS, COLOURS } from "../../../../utils/Constant";
import SubcriptionScreenCard from "./SubscriptionScreenCard";
import Ratelogo from "../../../../assets/Images/Ratelogo.svg";
import Privacylogo from "../../../../assets/Images/privacylogo.svg";
import CusSupportlogo from "../../../../assets/Images/cussupportlogo.svg";
import TermLogo from "../../../../assets/Images/TermLogo.svg";
import Helplogo from "../../../../assets/Images/Helplogo.svg";
import MessageLog from "../../.../../../../assets/Images/MessageLogo.svg";
import Crown from "../../../../assets/Images/crown.svg";
import Profile from "../../../../assets/Images/ProfileLogo.svg";
import PassLogo from "../../../../assets/Images/PasswordLogo.svg";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {Styles} from "./style"
const SubcriptionScreen = () => {
  const navigation = useNavigation();
  const tabheight = useBottomTabBarHeight();

  return (
    <>
      <NewCommonHeader
        BackButton={<BackButton onPress={() => navigation.goBack()} />}
        heading={labels.Guestscreen.MyAccount}
        Folder={<UseLogo />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.container}>
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
          <View>
            <Text style={Styles.Accounttext}>{labels.Guestscreen.Account}</Text>
          </View>
          <View>
            <SubcriptionScreenCard
              Logo={<Profile />}
              heading={labels.SubscriptionScreen.MyAccount}
            />
          </View>
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <View>
            <SubcriptionScreenCard
              Logo={<PassLogo />}
              heading={labels.SubscriptionScreen.Password}
            />
          </View>
          <View>
            <Text style={Styles.Accounttext}>{labels.Guestscreen.Account}</Text>
          </View>
          <SubcriptionScreenCard
            Logo={<Ratelogo />}
            heading={labels.SubscriptionScreen.RateUs}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>

          <SubcriptionScreenCard
            Logo={<Privacylogo />}
            heading={labels.SubscriptionScreen.PrivacyPolicy}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <SubcriptionScreenCard
            Logo={<CusSupportlogo />}
            heading={labels.SubscriptionScreen.CustomerSupport}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <SubcriptionScreenCard
            Logo={<TermLogo />}
            heading={labels.SubscriptionScreen.TermsandConditions}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <SubcriptionScreenCard
            Logo={<PassLogo />}
            heading={labels.SubscriptionScreen.FAQ}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <SubcriptionScreenCard
            Logo={<Helplogo />}
            heading={labels.SubscriptionScreen.Help}
          />
        </View>
      </ScrollView>
      <View style={Styles.bottomspace}></View>
    </>
  );
};

export default SubcriptionScreen;


