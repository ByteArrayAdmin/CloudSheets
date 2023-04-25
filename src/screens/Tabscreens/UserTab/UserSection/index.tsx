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

const UserSection = () => {
  const navigation = useNavigation();
  const Tabheight = useBottomTabBarHeight();
  return (
    <>
      <NewCommonHeader
        BackButton={<BackButton onPress={() => navigation.goBack()} />}
        heading={labels.Guestscreen.MyAccount}
        Folder={<UseLogo />}
      />
      <View style={Styles.container}>
        <TouchableOpacity
          style={Styles.Registerview}
          onPress={() => navigation.navigate("SubcriptionScreen")}
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
        <View>
          <Text style={Styles.Accounttext}>{labels.Guestscreen.Account}</Text>
        </View>
        <ScrollView>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <UseCard
              Logo={<Profile />}
              heading={labels.Guestscreen.MyAccount}
            />
            <View style={Styles.horizontallineview}>
              <View style={Styles.innerhoeizontaline} />
            </View>
          </TouchableOpacity>

          <UseCard Logo={<PassLogo />} heading={labels.Guestscreen.Password} />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("RateUs")}>
            <UseCard Logo={<Ratelogo />} heading={labels.Guestscreen.RateUs} />
            <View style={Styles.horizontallineview}>
              <View style={Styles.innerhoeizontaline} />
            </View>
          </TouchableOpacity>

          <UseCard
            Logo={<Privacylogo />}
            heading={labels.Guestscreen.PrivacyPolicy}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard
            Logo={<CusSupportlogo />}
            heading={labels.Guestscreen.CustomerSupport}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard
            Logo={<TermLogo />}
            heading={labels.Guestscreen.TermsandConditions}
          />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard Logo={<Helplogo />} heading={labels.Guestscreen.FAQ} />
          <View style={Styles.horizontallineview}>
            <View style={Styles.innerhoeizontaline} />
          </View>
          <UseCard Logo={<MessageLog />} heading={labels.Guestscreen.Help} />
          <View style={{ height: Tabheight }}></View>
        </ScrollView>
      </View>
    </>
  );
};

export default UserSection;
