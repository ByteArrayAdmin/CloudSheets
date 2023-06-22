import React, { useState, useRef } from 'react';
import InputField from '../../../commonComponents/InputField';
import { emailRegex } from '../../../utils/Constant';
import Mediumlogo from '../../../assets/Images/Mediumlogo.svg'
import { Forgotscreenstyle } from './style';
import { SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import CommonButton from '../../../commonComponents/Button';
import Mesageicon from 'src/assets/Images/Message.svg';
import BackButton from '../../../commonComponents/Backbutton';
import AuthCard from '../../../commonComponents/AuthCard';
import BackgroundLayout from '../../../commonComponents/Backgroundlayout/BackgroundLayout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Forgotlabel from '../../../utils/ProjectLabels.json'
import Lock from "../../../assets/Images/Lock.svg";
import { forgetPassword_sendEmail, forgetPassword_submit } from '../../../API_Manager/index';
import Instucticon from '../../../assets/Images/instruction.svg';
import CommonBottomsheet from '../../../commonComponents/CommonBottomsheet';
import PasswordInstruction from '../../Popups/PasswordInstruction/index';
import Loader from '../../../commonComponents/CommonLoader';

const ForgotPassword = () => {
  const useForm1 = useForm();
  const useFormSendEmail = useForm();
  const {
    handleSubmit,
    control
  } = useForm({
  });
  const {
    handleSubmit: handleSubmit2,
    control: control2
  } = useForm({
  });
  const navigation = useNavigation();
  const ChildRef = useRef();
  const [isSubmitted, setIssubmitted] = useState(false);
  const [passswordpolicy, setPasswordPolicy] = useState(false);
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('')
  const snapPoints = ["60%"];

  // ------------ Password Validation ---------
  const validatePassword = (passwordOnChange: string) => {
    console.log('updatePass======', passwordOnChange)
    const passwordRegex = /^.{6,}$/;
    const passwordPatternRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).+$/
    if (!passwordOnChange) {
      useForm1.setError("password", {
        type: "required",
        message: "Password is required",
      });
      setPasswordPolicy(true);
    } else if (!passwordRegex.test(passwordOnChange)) {
      useForm1.setError("password", {
        type: "minLength",
        message: "Password must be at least 6 characters long.",
      });
      setPasswordPolicy(true);
    } else if (!passwordPatternRegex.test(passwordOnChange)) {
      useForm1.setError("password", {
        type: "pattern",
        message:
          "Password must contain at least one number, one special character, and one uppercase letter",
      });
      setPasswordPolicy(true);
    } else {
      useForm1.setError("newPassword", null); // Clear the error if validation passes
      setPasswordPolicy(false);
    }

  };

  // ------------ send OTP to email ------------
  const onSubmit = async (data: any) => {
    console.log("EmailData======", data)
    const email = data.email
    setLoader(true)
    forgetPassword_sendEmail(email).then((response: any) => {
      console.log('sendEmail=======', response)
      setEmail(email)
      Alert.alert(Forgotlabel.Forgotpassword.OTP_SEND_QUOTE)
      setLoader(false)
      setIssubmitted(true)
    }).catch((error) => {
      setLoader(false)
      Alert.alert(error.message)
      console.log("sendMailError=======", error)
    })

  };
  // ----------- Update Password Submit -----------

  const onUpdatePassword = async (data: any) => {
    console.log("EmailData======", data)
    const code = data.code
    const newPassword = data.newPassword
    setLoader(true)
    forgetPassword_submit(email, code, newPassword).then((response: any) => {
      console.log("submitPassResp=====", response)
      setLoader(false)
      Alert.alert(response)
      navigation.goBack()
    }).catch((error) => {
      setLoader(false)
      Alert.alert(error.message)
      console.log("submitPasswordErr=======", error)
    })
  }

  // ------------ open Privacy policy -----------
  const Opensheet = () => {
    ChildRef.current.childFunction1();
  };

  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={Forgotscreenstyle.safeareaview}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={Forgotscreenstyle.backbuttonview}>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
          <View style={Forgotscreenstyle.forgetpassswordview}>
            <View style={Forgotscreenstyle.forgotview}>
              <Mediumlogo />
            </View>
            <View style={Forgotscreenstyle.forgetsyleview}>
              <Text style={Forgotscreenstyle.forgerpasswardtextheading}>
                {Forgotlabel.Forgotpassword.FORGOTPASSWORD}
              </Text>
            </View>
            <View style={Forgotscreenstyle.lastview}>
              <Text style={Forgotscreenstyle.subheadingtextstyle}>
                {Forgotlabel.Forgotpassword.FOGETPASSWORDSUBHEADING}
              </Text>
            </View>
          </View>
          <View>
            <AuthCard

              subchildren={
                !isSubmitted ?
                  <>
                    <InputField
                      name="email"
                      control={control}
                      placeholder={Forgotlabel.Forgotpassword.PLACEHOLDERTEXT}
                      Image={Mesageicon}
                      rules={{
                        required: Forgotlabel.Forgotpassword.EMAILREQUIRED,
                        pattern: { value: emailRegex, message: 'Email is invalid' },

                      }}
                      styles={Forgotscreenstyle.inputview}
                    />
                    <CommonButton
                      onPress={handleSubmit(onSubmit)}
                      Register={Forgotlabel.Forgotpassword.SUBMIT}
                    />
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Login')}
                      style={Forgotscreenstyle.backtologinview}>
                      <Text style={Forgotscreenstyle.bactologintext}>
                        {Forgotlabel.Forgotpassword.BACKTOLOGIN}
                      </Text>
                    </TouchableOpacity>
                  </> : <>
                    <View>
                      <View>
                        <InputField
                          name="code"
                          control={control2}
                          placeholder={Forgotlabel.Forgotpassword.ENTER_CODE}
                          Image={Lock}
                          rules={{
                            required: Forgotlabel.Forgotpassword.OTP_REQUIRED,
                          }}
                          styles={Forgotscreenstyle.inputview}
                          keyboardType={'numeric'}
                        />
                      </View>
                      <View>
                        <InputField
                          name="newPassword"
                          control={control2}
                          placeholder={Forgotlabel.Forgotpassword.ENTER_NEW_PASSWORD}
                          Image={Lock}
                          rules={{
                            required: Forgotlabel.Forgotpassword.NEW_PASSWORD_REQUIRED,
                            minLength: {
                              value: 6, // Replace with your desired minimum length
                              message: "Username must be at least 6 characters long.",
                            },
                            pattern: {
                              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).+$/, // Regular expression pattern for at least one number, one special character, and one uppercase letter
                              message:
                                "Password must contain at least one number, one special character, and one uppercase letter.",
                            },
                          }}
                          customPassword={true}
                          secureTextEntry={true}
                          instructionIcon={Instucticon}
                          Opensheet={Opensheet}
                          passswordpolicy={passswordpolicy}
                          onChangeCustom={(text: string) => validatePassword(text)}
                          styles={Forgotscreenstyle.inputview}
                        />
                      </View>
                      <CommonButton
                        onPress={handleSubmit2(onUpdatePassword)}
                        Register={Forgotlabel.Forgotpassword.CONFIRM_NEW_PASSWORD}
                      />
                    </View>
                  </>
              }
            />
            <CommonBottomsheet
              ref={ChildRef}
              snapPoints={snapPoints}
              children={<PasswordInstruction />}
            />
            {loader ? <Loader /> : null}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};
export default ForgotPassword;
