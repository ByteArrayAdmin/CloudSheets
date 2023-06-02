/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from "react";
import InputField from "../../../commonComponents/InputField";
import Mediumlogo from "../../../assets/Images/Mediumlogo.svg";
import { SafeAreaView, Text, View, TouchableOpacity, Alert } from "react-native";
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
import { Auth } from 'aws-amplify';
import CommonLoader from '../../../commonComponents/CommonLoader';

const ResetPassword = () => {
  const { control, handleSubmit, getValues } = useForm();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false)

  // --------- Change Password ---------
  const onChangePassword = async (data: any) => {
    const { oldPassword, newPassword } = data;
    console.log("Data======", data)
    setLoader(true)
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then((data) => {
        setLoader(false)
        console.log("changePassword=======", data)
        Alert.alert(data)
        navigation.goBack()
      })
      .catch((err) => {
        setLoader(false)
        Alert.alert(err.message)
        console.log("changePassErr=====", err)
      });
  }
  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={resetscreenstyle.safeareaview}>
        <KeyboardAwareScrollView>
          <View>
            <View style={resetscreenstyle.backbuttonview}>
              <BackButton onPress={() => navigation.goBack()} />
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
                      name="oldPassword"
                      control={control}
                      placeholder={
                        Resetpasswordlabel.Resetpassword.PLACEHOLDER_Old_Password
                      }
                      Image={Lock}
                      rules={{
                        required:
                          Resetpasswordlabel.Resetpassword.VALIDATION_REQUIRED,
                      }}
                      styles={resetscreenstyle.inputview}
                    />
                    <InputField
                      name="newPassword"
                      control={control}
                      placeholder={
                        Resetpasswordlabel.Resetpassword
                          .PLACEHOLDER_NewPassword
                      }
                      Image={Lock}
                      rules={{
                        required:
                          Resetpasswordlabel.Resetpassword
                            .VALIDATION_REQUIRED_CONFIRM,
                      }}
                      styles={resetscreenstyle.inputview}
                    />
                    <CommonButton
                      onPress={handleSubmit(onChangePassword)}
                      Register={Resetpasswordlabel.Resetpassword.SAVENEWPASSWORD}
                    />
                  </>
                }
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        {loader ? <CommonLoader /> : null}
      </SafeAreaView>
    </>
  );
};

export default ResetPassword;
