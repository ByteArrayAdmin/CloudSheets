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
//Fix KeyBoard Drop Issue 
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { registerCWErrors, logDeviceInfo } from "../../../utils/AWSLog"

//import React, { useState } from 'react';





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
  updatePinpointEndpoint,
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



//SignUp Hack to Report Errors
const registerSignUpErrors = async ( errorString ) => {

  //Amplify.configure(awsconfig);
  /*Auth.currentCredentials()
.then(d => console.log('data: ', d))
.catch(e => console.log('error: ', e));*/

const credentials = await Auth.currentCredentials();

AWS.config.update({
  accessKeyId: credentials.accessKeyId,
  secretAccessKey: credentials.secretAccessKey,
  sessionToken: credentials.sessionToken,
  region: 'us-east-1'  // your region
})

const customMessage = ""; // Your custom message
  
const combinedError = `Detailed Message: ${errorString}`;

  console.log("", combinedError );


  // Initialize the AWS Lambda SDK
  const lambda = new AWS.Lambda({
    region: 'us-east-1', // Change to your region
    credentials: AWS.config.credentials, // should be set by Cognito Identity Pool
  });


  // Prepare payload
  const payload = {
    email: combinedError, // OPTIONAL
  };

  // Prepare Lambda params
  const lambdaParams = {
    FunctionName: 'registerCloudSheetPromotionEmail', // your Lambda function name
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(payload),
  };

  try {
    const result = await lambda.invoke(lambdaParams).promise();
    console.log("Lambda invocation result:", result);
    
    if (result.StatusCode === 200) {
      console.log("Success", JSON.parse(result.Payload));
    } else {
      console.log("Error Scenario");
    }
  } catch (error) {
    console.log("Error invoking Lambda", error);
  }
};



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

  const [isSignUpInProgress, setIsSignUpInProgress] = useState(false);



  // ------------ IsEmail Exist Lamda trigger -------------
  const isEmailExist = async () => {
    //console.log("lamdaCalled=====");
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
    setIsSignUpInProgress(true);  // Disable the button

    checkNetwork()
      .then(async (isConnected) => {
        console.log("isConectedResp=======", isConnected);
        
        await registerCWErrors("Logging Device Info Against User Details: " +  JSON.stringify(data));
        await logDeviceInfo();

        if (isConnected) {
          onRegisterPressed(data);
        } else {
          Alert.alert(labels.checkNetwork.networkError);
        }
      })
      .catch((error) => {
        console.log("networkErr======", error);
      });

      console.log(">>>>>>>>>>>>>>>>>>>>>>>>");
      //setIsSignUpInProgress(false);  // Enable the button back

  };




  // -------------- Signup user ------------
  const onRegisterPressed = async (data: any) => {

    await registerSignUpErrors( "$$$SignUp Attempted with details" + JSON.stringify(data));

    if (isNotBlankSpace(data.username)) {
      setError("username", {
        message: "This field cannot contain only whitespace",
      });
      return;
    }
    track_Click_Event(eventName.TRACK_CLICK, clickName.CLICK_ON_REGISTER);


    if (isUserExist) {

      await registerSignUpErrors( "$$$Entered SignUp With User Already Registered: " + JSON.stringify(data));
      setIsSignUpInProgress(false);  // Enable the button back

    } else {
      const { name, username, email, mobilenumber, password } = data;
      const userSignUp = {
        username: username,
        password: password,
        attributes: {
          email: email,
          phone_number: mobilenumber,
          name: name,
          "custom:premium": "false",
          "custom:suspended": "false",
        },
      };
      setLoader(true);
      userSignup(userSignUp)
        .then(async (response) => {
          setLoader(false);
          signUp_Event(email, location);
          await registerSignUpErrors( "$$$SignUp Success with details" + JSON.stringify(data));
          await updatePinpointEndpoint(data, location);
          showAlert(username);
        })
        .catch( async (e) => {
        // Construct your error object or string here
        /*const errorInfo = {
          name: data.name,
          username: data.username,
          email: data.email,
          mobilenumber: data.mobilenumber,
          password: data.password,
          error: JSON.stringify(e) + e.message,
        }; */

          const stringifiedError =   e.message +  JSON.stringify(e) + JSON.stringify(data);     // JSON.stringify(errorInfo);

          track_Error_Event(
            eventName.TRACK_ERROR_ACTION,
            errorActionName.SIGN_UP_ERROR
          );
          
          await registerSignUpErrors("$$$SIGNUP Failure:" + stringifiedError);
          await updatePinpointEndpoint(data, location);
          
          setLoader(false);
          console.log("SignupErr=======", e);
          setIsSignUpInProgress(false);  // Enable the button back
          Alert.alert(e?.message);
        });
    }
  };


  const showAlert = async (username: any) =>
  { 
    const usr_name = { username: username };
    await registerCWErrors("Entered ShowAlert Pathway for OTP Screen: User:" + usr_name );
    // Disable the button before showing the alert
    //setIsSignUpInProgress(true);

    Alert.alert(
    labels.signupcontant.SUCCESFULLY_REGISTERED,
    labels.signupcontant.confirmEmailText,
    [
      {
        text: "Ok",
        onPress: async () => { 
          try {

            await registerCWErrors("Attempting to navigate to OTPScreen: User:" + usr_name );
            navigation.navigate("OtpScreen", { username: username });
            await registerCWErrors("Post OTP Screen Navigation Call. User: " +  usr_name );

          } catch (error) {
            await registerCWErrors(`Failed to navigate to OTPScreen: ${error?.message}`);
          }
          // Enable the button back if an error occurs
          setIsSignUpInProgress(false);

        },
      },
    ]
  );
  
};



    const validatePassword = (passwordOnChange: string) => {
      console.log("updatePass======", passwordOnChange);
      const passwordRegex = /^.{6,}$/; // This will check for a minimum length of 6 characters
    
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
      } else {
        setError("password", null); // Clear the error if validation passes
        setPasswordPolicy(false);
      }
    }; 

/*
    const validatePassword = (passwordOnChange: string) => {
      console.log("updatePass======", passwordOnChange);
      
      // Updated Regex: 
      // - ^ asserts the start of the string
      // - (?=.*[a-z]) ensures at least one lowercase letter
      // - (?=.*[A-Z]) ensures at least one uppercase letter
      // - (?=.*\d) ensures at least one digit
      // - (?=.*[@$!%*?&#]) ensures at least one special character
      // - .{8,} ensures at least 8 characters
      // - $ asserts the end of the string
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;
      
      if (!passwordOnChange) {
        setError("password", {
          type: "required",
          message: "Password is required",
        });
        setPasswordPolicy(true);
      } else if (!passwordRegex.test(passwordOnChange)) {
        setError("password", {
          type: "minLength",
          message: "Password must be at least 8 characters long, include at least one uppercase character, one number, and one symbol.",
        });
        setPasswordPolicy(true);
      } else {
        setError("password", null); // Clear the error if validation passes
        setPasswordPolicy(false);
      }
    };
    */
    

  const validateEmail = () => {
    isEmailExist();
  };

  const Opensheet = () => {
    ChildRef.current.childFunction1();
  };

  return (
    <>
      <BackgroundLayout />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
               CloudSheet User Login
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
                    keyboardType={"email-address"}
                    styles={styles.inputview}
                  />

                <InputField
                  name="mobilenumber"
                  control={control}
                  placeholder={signupLabel.signupcontant.PLACEHOLDER_MOBILNUMBER}
                  Image={VectorIcom}
                  rules={{
                    required: signupLabel.signupcontant.MOBILENO_VALIDATION_MSG,
                    pattern: {
                      //value: /^\+\d{10,15}$/,  // '+' is mandatory and allows 10 to 15 digits
                      value: /^\+(\d{1,4})\d{10}$/, 
                      message: "Invalid mobile number, must be 10 digits and include country code starting with +",
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
                        required: signupLabel.signupcontant.PASSWARD_VALIDATION_MSG,
                        minLength: {
                          value: 6, // Minimum length of 6 characters
                          message: "Password must be at least 6 characters long.",
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
                        onPress={isSignUpInProgress ? () => {} : handleSubmit(checkInternet)}
                        Register={signupLabel.signupcontant.REGISTER}
                        disabled={isSignUpInProgress} // Disable the button if the sign-up process is ongoing
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
      </TouchableWithoutFeedback>
    </>
  );
};
export default Signup;
