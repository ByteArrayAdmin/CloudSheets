/* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "./style";
import InputField from "../../../commonComponents/InputField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { emailRegex } from "../../../utils/Constant";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../../../aws-exports";
import Progfileicon from "../../../assets/Images/profile.svg";
import Mesageicon from "../../../assets/Images/Message.svg";
import VectorIcom from "../../../assets/Images/Vector.svg";
import Lock from "../../../assets/Images/Lock.svg";
import { useForm } from "react-hook-form";
import CommonButton from "../../../commonComponents/Button";
// import Googleicon from '../../assets/Images/Googlricon.svg';
// import Appleicon from '../../assets/Images/Apple.svg';
import { useNavigation } from "@react-navigation/native";
import BackgroundLayout from "../../../commonComponents/Backgroundlayout/BackgroundLayout";
import signupLabel from "../../../utils/ProjectLabels.json";
import Mediumlogo from "../../../assets/Images/Mediumlogo.svg";
import RedCorss from "../../../assets/Images/redcross.svg";
import BlueTick from "../../../assets/Images/bluetick.svg";
import AuthCard from "../../../commonComponents/AuthCard";
import labels from "../../../utils/ProjectLabels.json";
import { userSignup, userExist } from "../../../API_Manager/index";
import CommonLoader from "../../../commonComponents/CommonLoader";
import Instucticon from "../../../assets/Images/instruction.svg";
import CommonBottomsheet from "../../../commonComponents/CommonBottomsheet";
import PasswordInstruction from "../../Popups/PasswordInstruction/index";

//Aws configiuration code commented for now

Amplify.configure(awsconfig);
const Signup = () => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { isValid, errors },
  } = useForm();
  const navigation = useNavigation();
  const userName = watch("username");
  const Password = watch("password");
  const [isUserExist, setIsUserExist] = useState(false);
  const [loader, setLoader] = useState(false);
  const [passswordpolicy, setPasswordPolicy] = useState(false);
  const ChildRef = useRef();
  const snapPoints = ["60%"];
  useEffect(() => {
    console.log("username======", userName);
    console.log("password====>", Password);
    // justCheckPAsswordValidation()
  }, [userName]);

  const onRegisterPressed = async (data: any) => {
    if (isUserExist) {
    } else {
      const { name, username, email, mobilenumber, password } = data;
      const userSignUp = {
        username: username,
        password: password,
        attributes: {
          email: email,
          phone_number: mobilenumber,
          name: name,
        },
      };
      setLoader(true);
      userSignup(userSignUp)
        .then((response) => {
          setLoader(false);
          showAlert(username);
        })
        .catch((e) => {
          setLoader(false);
          console.log("SignupErr=======", e);
          Alert.alert(e?.message);
        });
    }
  };

  const showAlert = (username: any) =>
    Alert.alert(
      labels.signupcontant.SUCCESFULLY_REGISTERED,
      labels.signupcontant.confirmEmailText,
      [
        {
          text: "Ok",
          onPress: () =>
            navigation.navigate("OtpScreen", { username: username }),
        },
      ]
    );

  const isUserNameAlreadyExist = () => {
    setIsUserExist(false);
    const temp_code = "000000";
    console.log("userName=======", userName);
    userExist(userName, temp_code)
      .then((response) => {
        console.log("checkIsExist========", response);
      })
      .catch((err) => {
        if (
          err.code === "CodeMismatchException" ||
          err.code === "AliasExistsException"
        ) {
          setIsUserExist(true);
        }
      });
  };

  const validatePassword = () => {
    if (!Password) {
      setError("password", {
        type: "required",
        message: "Password is required",
      });
      setPasswordPolicy(true);
    } else if (Password.length < 6) {
      console.log("Passworc ")
      setError("password", {
        type: "minLength",
        message: "Password must be at least 6 characters long",
      });
      setPasswordPolicy(true);
    } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).+$/.test(Password)) {
      setError("password", {
        type: "pattern",
        message:
          "Password must contain at least one number, one special character, and one uppercase letter",
      });
      setPasswordPolicy(true);
    } else {
      setError("password", null); // Clear the error if validation passes
      setPasswordPolicy(false);
    }
  };
  const Opensheet = () => {
    ChildRef.current.childFunction1();
  };

  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={styles.safeareastyle}>
        <KeyboardAwareScrollView>
          <TouchableOpacity
            style={styles.skipText}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.skioptextcolor}>
              {signupLabel.signupcontant.SKIP}
            </Text>
          </TouchableOpacity>
          <View style={styles.createAccountview}>
            <View>
              <Mediumlogo />
            </View>
            <View style={styles.createView}>
              <Text style={styles.CreateAccounttext}>
                {signupLabel.signupcontant.CREATE_ACCOUNT}
              </Text>
            </View>
            <View>
              <Text style={styles.registerdText}>
                {signupLabel.signupcontant.REGISTER_TEXT}
              </Text>
            </View>
          </View>
          <View>
            <AuthCard
              subchildren={
                <>
                  <InputField
                    name="name"
                    control={control}
                    placeholder={signupLabel.signupcontant.PLACEHOLDER_NAME}
                    Image={Progfileicon}
                    rules={{
                      required: signupLabel.signupcontant.NAME_VALIDATION_MSG,
                    }}
                    placxeholdertextstyle={styles.placeholdertextstyle}
                    styles={styles.inputview}
                  />
                  <InputField
                    name="username"
                    control={control}
                    value={userName}
                    isUserExist={isUserExist}
                    onBlur={isUserNameAlreadyExist}
                    onChangeUser={(text: string) =>
                      console.log("onChangeText=========", text)
                    }
                    placeholder={signupLabel.signupcontant.PLACEHOLDER_USERNAME}
                    Image={Progfileicon}
                    ic_red={RedCorss}
                    ic_blue={BlueTick}
                    rules={{
                      required:
                        signupLabel.signupcontant.USERNAME_VALIDATION_MSG,
                    }}
                    styles={styles.inputview}
                  />
                  <InputField
                    name="email"
                    control={control}
                    placeholder={signupLabel.signupcontant.PLACEHOLDER_EMAIL}
                    Image={Mesageicon}
                    rules={{
                      required: signupLabel.signupcontant.EMAIL_VALIDATION_MSG,
                      pattern: {
                        value: emailRegex,
                        message: "Email is invalid",
                      },
                    }}
                    keyboardType={"email-address"}
                    styles={styles.inputview}
                  />
                  <InputField
                    name="mobilenunber"
                    control={control}
                    placeholder={
                      signupLabel.signupcontant.PLACEHOLDER_MOBILNUMBER
                    }
                    Image={VectorIcom}
                    rules={{
                      required:
                        signupLabel.signupcontant.MOBILENO_VALIDATION_MSG,
                    }}
                    keyboardType={"phone-pad"}
                    styles={styles.inputview}
                  />
                  <InputField
                    name="password"
                    control={control}
                    placeholder={signupLabel.signupcontant.PLACEHOLDER_PASSWORD}
                    Image={Lock}
                    rules={{
                      required:
                        signupLabel.signupcontant.PASSWARD_VALIDATION_MSG,
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
                    secureTextEntry={true}
                    styles={styles.inputview}
                    instructionIcon={Instucticon}
                    Opensheet={Opensheet}
                    passswordpolicy={passswordpolicy}
                    onChangePassword={() => validatePassword()}
                  />
                  <CommonButton
                    onPress={handleSubmit(onRegisterPressed)}
                    // onPress={() => showAlert("shivam.infowind@gmail.com")}

                    Register={signupLabel.signupcontant.REGISTER}
                  />
                </>
              }
            />
          </View>

          <View>
            {/* //This feature is commented for now  */}
            {/* <View style={styles.ORviewstyle}>
              <View style={styles.Horizontalline} />
              <View style={{paddingHorizontal: 15}}>
                <Text style={styles.ortextstyle}>
                  {signupLabel.signupcontant.OR}
                </Text>
              </View>
              <View style={styles.Horizontalline} />
            </View> */}

            {/* <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                marginHorizontal: 20,
              }}>
              <View style={styles.googleapplebutton}>
                <Googleicon />
              </View>
              <View style={{flex: 1}} />
              <View style={styles.googleapplebutton}>
                <Appleicon />
              </View>
            </View> */}

            <View style={styles.BottomSpace}>
              <View>
                <Text style={styles.alreadyamember}>
                  {signupLabel.signupcontant.Bottomtext}
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.sigintext}>
                  {signupLabel.signupcontant["Sign in"]}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.BottomGap} />
          </View>
        </KeyboardAwareScrollView>
        {loader ? <CommonLoader /> : null}
        <CommonBottomsheet
          ref={ChildRef}
          snapPoints={snapPoints}
          children={<PasswordInstruction />}
        />
      </SafeAreaView>
    </>
  );
};
export default Signup;
