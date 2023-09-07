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

import {registerCWErrors} from "../../../utils/AWSLog"

declare global {
  var labels: any;
}




const OtpScreen  = () => { 
  const { control, handleSubmit, watch } = useForm();
  const route = useRoute();
  const navigation = useNavigation();
  const [userName, setUserName] = useState(route.params.username);
  const [isFrom, setIsFrom] = useState(route?.params?.isFrom);
  const [count, setCount] = useState(0);
  const [disable, setDisable] = useState(false);
  const [loader, setLoader] = useState(false);
  var labels = global.labels;

  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

  useEffect(() => {
    const runAsyncTasks = async () => {
      try {
        await registerCWErrors("In the OTP Screen:  User: " + userName);
        track_Screen(eventName.TRACK_SCREEN, screenName.OTP_VERIFY_SCREEN);
        await registerCWErrors("Value of isFrom: " + isFrom); // 1. Print the value of isFrom
        await registerCWErrors("OTP Screen Launched: User: " + userName); // 2. Log that the OTP screen is launched
      } catch (e) {
        console.error("Error logging:", e);
        await registerCWErrors(`OTP Screen Error: ${e?.message}`); 
      }
    };

    runAsyncTasks();
  }, []);

  // ----------- get network ------------
  function checkInternet(data: any): void {
    checkNetwork()
      .then((isConnected) => {
        setIsVerifyingOTP(true); // Set to true when verification starts
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
      console.log(">>>>>>>>>>>>>>>");
      //setIsVerifyingOTP(false); // Set back to false when verification ends
  }
  // ----------- verify OTP -----------
  const verificaton = async (data: any) => {

    track_Click_Event(eventName.TRACK_CLICK, clickName.CLICK_ON_OTP_VERIFY);
    const { otp } = data;
    
    //setIsVerifyingOTP(true); 
    console.log("OTPData========", data, userName);
    await registerCWErrors( `Attempting to verify OTP: Details:${data} : ${userName} OTP: ${otp}`);


    
    setLoader(true);
    await registerCWErrors( `Decision making based on isFrom: ${isFrom}` ); // 3. Log decision being made based on isFrom


    if (isFrom == "Profile") {
      await Auth.verifyCurrentUserAttributeSubmit("email", otp)
        .then(async (response: any) => {
          if (response) {
            setLoader(false);
            await registerCWErrors( `Profile Pathway : OTP Verified for User: ${userName}` );
            Alert.alert(labels.OTP_Constants.Confirmed);
            track_Success_Event(
              eventName.TRACK_SUCCESS_ACTION,
              successActionName.CHANGE_PASSWORD_OTP_VERIFY_SUCCESSFULLY
            );
            navigation.goBack();
            setIsVerifyingOTP(false); // Set back to false when verification ends
          }
        })
        .catch(async (error) => {
          setLoader(false);

          await registerCWErrors( "OTP Verification Failed for User: " + userName + " : Error : " + error?.message );

          track_Error_Event(
            eventName.TRACK_ERROR_ACTION,
            errorActionName.CHANGE_PASSWORD_OTP_VERIFY_ERROR
          );

          console.log("OptErr====", error);
          setIsVerifyingOTP(false); // Set back to false when verification ends
        });
    } else {

      confirm_Signup(userName, otp)
        .then( async (response) => {
          console.log("OTPResp=========", response);
          setLoader(false);
          await registerCWErrors( "User SignUp Successfull with OTP!" + " : User : " + userName + " : OTP : " + otp );

          Alert.alert(labels.OTP_Constants.Confirmed);
          track_Success_Event(
            eventName.TRACK_SUCCESS_ACTION,
            successActionName.SIGNUP_OTP_VERIFY_SUCCESSFULLY
          );
          await registerCWErrors( "Navigating to Login Screen!");
          navigation.navigate("Login");
          setIsVerifyingOTP(false); // Set back to false when verification ends
        })
        .catch( async (e) => {
          setLoader(false);
          track_Error_Event(
            eventName.TRACK_ERROR_ACTION,
            errorActionName.SIGNUP_OTP_VERIFY_ERROR
          );
          console.log("OTPErr=======", e);

          await registerCWErrors( `OTP Verification Failed for User: ${userName} : Error : ${e?.message} : OTP: ${otp}` );

          //Alert.alert(e?.message);
          //setIsVerifyingOTP(false); // Set back to false when verification ends

          Alert.alert(
            'Error',
            e?.message,
            [
              {
                text: 'OK',
                onPress: () => {
                  setIsVerifyingOTP(false); // This will be executed only when "OK" is pressed
                }
              },
            ]
          );
          
        }

        )};

        //setIsVerifyingOTP(false);
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
    setIsVerifyingOTP(false); // Set back to false 
    await registerCWErrors("Attempting OTP Resend: User: " + userName);
    resend_OTP(userName)
      .then(async (response) => {
        setLoader(false);
        console.log("resendResp=========", response);
        track_Success_Event(
          eventName.TRACK_SUCCESS_ACTION,
          successActionName.RESEND_PASSWORD_SUCCESSFULLY
        );

        await registerCWErrors("Resend OTP Success: User: " + userName);
        
        Alert.alert(labels.OTP_Constants.ResendOTPSuccess);
      })
      .catch( async (err) => {
        setLoader(false);
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.RESEND_PASSWORD_ERROR
        );
        console.log("error resending code: ", err);

        await registerCWErrors(`Resend OTP Failure: User: ${userName} : Error :${err?.message}`);

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
                  disabled={isVerifyingOTP} // Disable the button if OTP verification is ongoing
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
