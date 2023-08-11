import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import BackgroundLayout from "../../../commonComponents/Backgroundlayout/BackgroundLayout";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Mediumlogo from "../../../assets/Images/Mediumlogo.svg";
// import labels from '../../../utils/ProjectLabels.json';
import { COLOURS, FONTS } from "../../../utils/Constant";
import AuthCard from "../../../commonComponents/AuthCard";
import InputField from "../../../commonComponents/InputField";
import { useForm } from "react-hook-form";
import Button from "../../../commonComponents/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import {
  confirm_Signup,
  resend_OTP,
  checkNetwork,
} from "../../../API_Manager/index";
import CommonLoader from "../../../commonComponents/CommonLoader";
import {
  track_Screen,
  track_Click_Event,
  track_Success_Event,
  track_Error_Event,
} from "../../../eventTracking/index";
import {
  eventName,
  screenName,
  clickName,
  successActionName,
  errorActionName,
} from "../../../utils/Constant";

declare global {
  var labels: any;
}
const OtpScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const route = useRoute();
  const navigation = useNavigation();
  const [userName, setUserName] = useState(route.params.username);
  const [isFrom, setIsFrom] = useState(route?.params?.isFrom);
  const [count, setCount] = useState(0);
  const [disable, setDisable] = useState(false);
  const [loader, setLoader] = useState(false);
  var labels = global.labels;

  useEffect(() => {
    track_Screen(eventName.TRACK_SCREEN, screenName.OTP_VERIFY_SCREEN);
  }, []);

  // ----------- get network ------------
  const checkInternet = (data: any) => {
    checkNetwork()
      .then((isConnected) => {
        console.log("isConectedResp=======", isConnected);
        if (isConnected) {
          verificaton(data);
        } else {
          Alert.alert(labels.checkNetwork.networkError);
        }
      })
      .catch((error) => {
        console.log("networkErr======", error);
      });
  };
  // ----------- verify OTP -----------
  const verificaton = async (data: any) => {
    track_Click_Event(eventName.TRACK_CLICK, clickName.CLICK_ON_OTP_VERIFY);
    const { otp } = data;
    console.log("OTPData========", data, userName);
    setLoader(true);
    if (isFrom == "Profile") {
      await Auth.verifyCurrentUserAttributeSubmit("email", otp)
        .then((response: any) => {
          if (response) {
            setLoader(false);
            Alert.alert(labels.OTP_Constants.Confirmed);
            track_Success_Event(
              eventName.TRACK_SUCCESS_ACTION,
              successActionName.CHANGE_PASSWORD_OTP_VERIFY_SUCCESSFULLY
            );
            navigation.goBack();
          }
        })
        .catch((error) => {
          setLoader(false);
          track_Error_Event(
            eventName.TRACK_ERROR_ACTION,
            errorActionName.CHANGE_PASSWORD_OTP_VERIFY_ERROR
          );
          console.log("OptErr====", error);
        });
    } else {
      confirm_Signup(userName, otp)
        .then((response) => {
          console.log("OTPResp=========", response);
          setLoader(false);
          Alert.alert(labels.OTP_Constants.Confirmed);
          track_Success_Event(
            eventName.TRACK_SUCCESS_ACTION,
            successActionName.SIGNUP_OTP_VERIFY_SUCCESSFULLY
          );
          navigation.navigate("Login");
        })
        .catch((e) => {
          setLoader(false);
          track_Error_Event(
            eventName.TRACK_ERROR_ACTION,
            errorActionName.SIGNUP_OTP_VERIFY_ERROR
          );
          console.log("OTPErr=======", e);
          Alert.alert(e?.message);
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (count != 0) {
        setCount(count - 1);
      } else {
        setCount(0);
        setDisable(false);
      }
    }, 1000);
  }, [count]);

  const resendOtpFunc = async () => {
    track_Click_Event(eventName.TRACK_CLICK, clickName.CLICK_ON_RESEND_OTP);
    setDisable(true);
    setCount(labels.OTP_Constants.Sixty_Sec);
    setLoader(true);
    resend_OTP(userName)
      .then((response) => {
        setLoader(false);
        console.log("resendResp=========", response);
        track_Success_Event(
          eventName.TRACK_SUCCESS_ACTION,
          successActionName.RESEND_PASSWORD_SUCCESSFULLY
        );
        Alert.alert(labels.OTP_Constants.ResendOTPSuccess);
      })
      .catch((err) => {
        setLoader(false);
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.RESEND_PASSWORD_ERROR
        );
        console.log("error resending code: ", err);
        Alert.alert(err?.message);
      });
  };

  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={styles.safeareastyle}>
        <View style={styles.imageView}>
          <Mediumlogo />
          <View style={styles.textViewStyle}>
            <Text style={styles.CreateAccounttext}>
              {labels.OTP_Constants.EnterOtp}
            </Text>
          </View>
        </View>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <AuthCard
            subchildren={
              <>
                <InputField
                  name="otp"
                  control={control}
                  placeholder={labels.OTP_Constants.EnterOtp}
                  // Image={Progfileicon}
                  rules={{
                    required: labels.OTP_Constants.OTP_Validation,
                  }}
                  placxeholdertextstyle={styles.placeholdertextstyle}
                  styles={styles.inputview}
                  keyboardType={"numeric"}
                />
                <TouchableOpacity
                  disabled={disable}
                  style={styles.resendBtnView}
                  onPress={() => (!disable ? resendOtpFunc() : {})}
                >
                  <Text
                    style={!disable ? styles.disableText : styles.enableText}
                  >
                    {labels.OTP_Constants.ResendOTP} {count != 0 ? count : null}
                  </Text>
                </TouchableOpacity>
                <Button
                  Register={labels.OTP_Constants.VerifyOTP}
                  onPress={handleSubmit(checkInternet)}
                />
              </>
            }
          />
        </KeyboardAwareScrollView>
        {loader ? <CommonLoader /> : null}
      </SafeAreaView>
    </>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  safeareastyle: {
    flex: 1,
  },
  imageView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  CreateAccounttext: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: FONTS.manrope_bold,
  },
  textViewStyle: {
    marginTop: 20,
  },
  inputview: {
    height: 50,
    width: "100%",
    fontFamily: FONTS.inter_regular,
  },
  placeholdertextstyle: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
  },
  resendBtnView: {
    flexDirection: "row",
    height: 40,
    width: "40%",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    right: 20,
  },
  disableText: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    color: COLOURS.Skyblue,
  },
  enableText: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    color: COLOURS.red,
  },
});
