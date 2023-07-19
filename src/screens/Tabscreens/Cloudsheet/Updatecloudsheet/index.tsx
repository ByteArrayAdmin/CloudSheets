import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import BackgroundLayout from "../../../../commonComponents/Backgroundlayout/BackgroundLayout";
import Smlogo from "../../../../assets/Images/smalllogo.svg";
import labels from "../../../../utils/ProjectLabels.json";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import AuthCard from "../../../../commonComponents/AuthCard";
import Logo from "../../../../assets/Images/updatecloud.svg";
import { Styles } from "../../Templates/RowDetailForm/style";
import CustomButton from "../../../../commonComponents/Button";
import { useNavigation } from "@react-navigation/native";
const UpdateCloudsheet = () => {
  const navigation = useNavigation();

  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={Style.container}>
        <ScrollView>
          <View>
            <View style={Style.logoview}>
              <Smlogo />
            </View>
            <View style={Style.cloudview}>
              <Text style={Style.cloudtext}>
                {labels.updatecloudsheet.Cloud}
              </Text>
              <Text style={Style.sheetetxt}>
                {labels.updatecloudsheet.Sheets}
              </Text>
            </View>
            <View style={Style.Authcardview}>
              <AuthCard
                subchildren={
                  <>
                    <View style={Style.cardcontainer}>
                      <View style={Style.logospacing}>
                        <Logo />
                      </View>
                      <View>
                        <Text style={Style.updatetext}>
                          {labels.updatecloudsheet.UpdatedCloudSheet}
                        </Text>
                      </View>

                      <View style={Style.cardtext}>
                        <Text style={Style.cardtextstyle}>
                          {labels.updatecloudsheet.Cardtext}
                        </Text>
                        <Text style={Style.cardtextstyle}>
                          {labels.updatecloudsheet.successfully_updated}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <CustomButton
                        Register={labels.updatecloudsheet.Ok}
                        onPress={() => navigation.navigate("ClousheetList")}
                      />
                    </View>
                  </>
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default UpdateCloudsheet;

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoview: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 94,
  },
  cloudview: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  cloudtext: {
    fontFamily: FONTS.manrope_bold,
    fontSize: 19,
    color: COLOURS.white,
  },
  sheetetxt: {
    fontFamily: FONTS.MANROPE_NORMAL,
    fontSize: 19,
    color: COLOURS.white,
  },
  Authcardview: {
    marginTop: 50,
    justifyContent: "center",
    marginBottom: 30,
  },
  cardcontainer: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logospacing: {
    marginTop: 30,
    marginBottom: 15,
  },
  updatetext: {
    fontFamily: FONTS.manrope_semibold,
    fontSize: 20,
    color: COLOURS.black,
  },
  cardtext: {
    marginTop: 20,
  },
  cardtextstyle: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    color: COLOURS.black,
    opacity: 0.6,
    textAlign: "center",
    padding: 3,
  },
});
