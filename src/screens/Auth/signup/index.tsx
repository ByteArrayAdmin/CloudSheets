/* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { styles } from "./style";
import InputField from "../../../commonComponents/InputField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { emailRegex } from "../../../utils/Constant";
import { Amplify, Auth, API } from "aws-amplify";
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
// import labels from "../../../utils/ProjectLabels.json";
import {
  userSignup,
  userExist,
  get_Location_Address,
  checkNetwork,
} from "../../../API_Manager/index";
import CommonLoader from "../../../commonComponents/CommonLoader";
import {
  track_Screen,
  track_Click_Event,
  track_Success_Event,
  track_Error_Event,
  signIn_Event,
  signUp_Event,
} from "../../../eventTracking/index";
import {
  eventName,
  screenName,
  clickName,
  successActionName,
  errorActionName,
} from "../../../utils/Constant";
import Geolocation from "@react-native-community/geolocation";
import CommonBottomsheet from "../../../commonComponents/CommonBottomsheet";
import PasswordInstruction from "../../Popups/PasswordInstruction/index";
import Instucticon from "../../../assets/Images/instruction.svg";
//Aws configiuration code commented for now
Amplify.configure(awsconfig);

declare global {
  var labels: any;
}

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
  const email = watch("email");
  const [isUserExist, setIsUserExist] = useState(false);
  const [passswordpolicy, setPasswordPolicy] = useState(false);
  const [isBackHandler, setBackButtonHandler] = useState(true);
  const ChildRef = useRef();
  const snapPoints = ["60%"];
  var labels = global.labels;

  // ------------ IsEmail Exist Lamda trigger -------------
  const isEmailExist = async () => {
    console.log("lamdaCalled=====");
    const apiName = "checkEmailExist";
    const path = "/user";
    const myInit = {
      queryStringParameters: {
        email: email, // OPTIONAL
      },
    };
    await API.get(apiName, path, myInit)
      .then((response) => {
        if (response.length > 0) {
          console.log("userExist==========", response);
          setError("email", {
            type: "required",
            message: "Email already exist!",
          });
        } else {
          setError("email", null);
        }
      })
      .catch((error) => {
        console.log("isExistError======", error);
      });
  };
  // ------------------------------------------------------

  // --------------- isUserName exist ------------
  const isUserNameExist = async () => {
    setIsUserExist(false);
    const apiName = "checkUserNameExist";
    const path = "/user";
    const myInit = {
      queryStringParameters: {
        username: userName, // OPTIONAL
      },
    };
    await API.get(apiName, path, myInit)
      .then((response) => {
        console.log("userNameResp========", response);
        if (response.length > 0) {
          setIsUserExist(true);
        } else {
          setIsUserExist(false);
        }
      })
      .catch((error) => {
        console.log("isExistError======", error);
      });
  };
  // ---------------------------------------------
  useEffect(() => {
    console.log("username======", userName);
    console.log("password====>", Password);
    // justCheckPAsswordValidation()
  }, [userName]);
  const [loader, setLoader] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState("...");
  const [currentLatitude, setCurrentLatitude] = useState("...");
  const [locationStatus, setLocationStatus] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    console.log("username======", userName);
    track_Screen(eventName.TRACK_SCREEN, screenName.SIGNUP_SCREEN);
  }, [userName]);

  useEffect(() => {
    requestLocationPermission();
    // isUserNameExist()
  }, []);
  // ----------- Location permission -----------
  const requestLocationPermission = async () => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: "whenInUse",
    });
    if (Platform.OS === "ios") {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
          setLocationStatus("Permission Denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // ----------- End ----------

  // --------- Get one Time Location ---------
  const getOneTimeLocation = () => {
    setLocationStatus("Getting Location ...");

    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus("You are Here");
        console.log("preciseLocation=========", position);
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        get_Location_Address(currentLatitude, currentLongitude)
          .then((response: any) => {
            console.log("responseLoc=======", response);
            setLocation(response.results[0].components.country);
          })
          .catch((error) => {
            console.log("locationError======", error);
          });

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        console.log("locationErrorMsg========", error);
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };
  // --------- End ---------

  const isNotBlankSpace = (value: any) => {
    if (value.includes(" ")) {
      return true;
    }
  };

  // ----------- get network ------------
  const checkInternet = (data: any) => {
    checkNetwork()
      .then((isConnected) => {
        console.log("isConectedResp=======", isConnected);
        if (isConnected) {
          onRegisterPressed(data);
        } else {
          Alert.alert(labels.checkNetwork.networkError);
        }
      })
      .catch((error) => {
        console.log("networkErr======", error);
      });
  };
  // -------------- Signup user ------------
  const onRegisterPressed = async (data: any) => {
    if (isNotBlankSpace(data.username)) {
      setError("username", {
        message: "This field cannot contain only whitespace",
      });
      return;
    }
    track_Click_Event(eventName.TRACK_CLICK, clickName.CLICK_ON_REGISTER);
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
          signUp_Event(email, location);
          showAlert(username);
        })
        .catch((e) => {
          track_Error_Event(
            eventName.TRACK_ERROR_ACTION,
            errorActionName.SIGN_UP_ERROR
          );
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

  const isUserNameAlreadyExist = async () => {
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

  const validatePassword = (passwordOnChange: string) => {
    console.log("updatePass======", passwordOnChange);
    const passwordRegex = /^.{6,}$/;
    const passwordPatternRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).+$/;
    if (!passwordOnChange) {
      setError("password", {
        type: "required",
        message: "Password is required",
      });
      setPasswordPolicy(true);
    } else if (!passwordRegex.test(passwordOnChange)) {
      setError("password", {
        type: "minLength",
        message: "Password must be at least 6 characters long.",
      });
      setPasswordPolicy(true);
    } else if (!passwordPatternRegex.test(passwordOnChange)) {
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

  const validateEmail = () => {
    isEmailExist();
  };

  const Opensheet = () => {
    ChildRef.current.childFunction1();
  };

  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={styles.safeareastyle}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <TouchableOpacity
            style={styles.skipText}
            onPress={() => {
              navigation.navigate("Login"),
                track_Click_Event(
                  eventName.TRACK_CLICK,
                  clickName.CLICK_ON_SKIP_SIGNUP
                );
            }}
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
                    // onBlur={isUserNameAlreadyExist}
                    onBlur={isUserNameExist}
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
                    validate={isNotBlankSpace}
                  />
                  <InputField
                    name="email"
                    control={control}
                    // customPassword={true}
                    placeholder={signupLabel.signupcontant.PLACEHOLDER_EMAIL}
                    Image={Mesageicon}
                    rules={{
                      required: signupLabel.signupcontant.EMAIL_VALIDATION_MSG,
                      pattern: {
                        value: emailRegex,
                        message: "Email is invalid",
                      },
                    }}
                    onBlur={validateEmail}
                    // onChangeCustom={(text: string) => validateEmail(text)}
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
                      pattern: {
                        value: /^(\+)?\d{10}$/,
                        message: "Invalid mobile number",
                      },
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
                    customPassword={true}
                    secureTextEntry={true}
                    styles={styles.inputview}
                    instructionIcon={Instucticon}
                    Opensheet={Opensheet}
                    passswordpolicy={passswordpolicy}
                    onChangeCustom={(text: string) => validatePassword(text)}
                  />
                  <CommonButton
                    onPress={handleSubmit(checkInternet)}
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login"),
                    track_Click_Event(
                      eventName.TRACK_CLICK,
                      clickName.CLICK_ON_ALREADY_A_MEMBER_NAVIGATE_TO_LOGIN
                    );
                }}
              >
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
