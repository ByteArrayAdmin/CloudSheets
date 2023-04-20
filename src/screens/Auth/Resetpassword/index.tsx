/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from "react";
import InputField from "../../../commonComponents/InputField";
import Mediumlogo from "../../../assets/Images/Mediumlogo.svg";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import CommonButton from "../../../commonComponents/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BackButton from "../../../commonComponents/Backbutton";
import AuthCard from "../../../commonComponents/AuthCard";
import { resetscreenstyle } from "./style";
import Lock from "../../../assets/Images/Lock.svg";
import BackgroundLayout from "../../../commonComponents/Backgroundlayout/BackgroundLayout";
import Resetpasswordlabel from "../../../utils/ProjectLabels.json";
const ResetPassword = () => {
  const { control, handleSubmit, getValues } = useForm();
  const navigation = useNavigation();

  const onSubmit = async (data: any) => {
    const { newpassword, confirmpassword } = data;
  };
  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={resetscreenstyle.safeareaview}>
        <KeyboardAwareScrollView>
          <View>
            <View style={resetscreenstyle.backbuttonview}>
              <BackButton />
            </View>
            <View style={resetscreenstyle.resetpasswordview}>
              <View style={resetscreenstyle.logoview}>
                <Mediumlogo />
              </View>
              <View style={resetscreenstyle.labelview}>
                <Text style={resetscreenstyle.resettextheading}>
                  {Resetpasswordlabel.Resetpassword.RESETPASSWORD}
                </Text>
              </View>
              <View style={resetscreenstyle.labelview2}>
                <Text style={resetscreenstyle.resetsubheadingtextstyle}>
                  {Resetpasswordlabel.Resetpassword.ENTTERNEWPASSWAORD}
                </Text>
              </View>
            </View>
            <View>
              <AuthCard
                subchildren={
                  <>
                    <InputField
                      name="newpassword"
                      control={control}
                      placeholder={
                        Resetpasswordlabel.Resetpassword.PLACEHOLDER_NewPassword
                      }
                      Image={Lock}
                      rules={{
                        required:
                          Resetpasswordlabel.Resetpassword.VALIDATION_REQUIRED,
                      }}
                      styles={resetscreenstyle.inputview}
                    />
                    <InputField
                      name="confirmpassword"
                      control={control}
                      placeholder={
                        Resetpasswordlabel.Resetpassword
                          .PLACEHOLDER_Confirm_Password
                      }
                      Image={Lock}
                      // placxeholdertextstyle={styles.placeholdertextstyle}
                      rules={{
                        required:
                          Resetpasswordlabel.Resetpassword
                            .VALIDATION_REQUIRED_CONFIRM,
                        validate: (value: any) =>
                          value === getValues().newpassword ||
                          "Passwords do not match",
                      }}
                      styles={resetscreenstyle.inputview}
                    />

                    <CommonButton
                      onPress={handleSubmit(onSubmit)}
                      Register={Resetpassword.SAVENEWPASSWORD}
                    />
                  </>
                }
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default ResetPassword;
