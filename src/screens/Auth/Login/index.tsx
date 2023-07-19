/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import AuthCard from "../../../commonComponents/AuthCard";
import InputField from "../../../commonComponents/InputField";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { emailRegex } from "../../../utils/Constant";
import Mesageicon from "../../../assets/Images/Message.svg";
import { useForm } from "react-hook-form";
import Lock from "../../../assets/Images/Lock.svg";
import CommonButton from "../../../commonComponents/Button";
import { loginstyle } from "./style";
import { useNavigation } from "@react-navigation/native";
import Googleicon from "../../assets/Images/Googlricon.svg";
import Appleicon from "../../assets/Images/Apple.svg";
import BackgroundLayout from "../../../commonComponents/Backgroundlayout/BackgroundLayout";
// import LoginLabels from "../../../utils/ProjectLabels.json";
import Mediumlogo from "../../../assets/Images/Mediumlogo.svg";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listUsers, getUser } from "../../../graphql/queries";
import { createUser } from "../../../graphql/mutations";
import { userLogin } from "../../../API_Manager/index";
import CommonLoader from "../../../commonComponents/CommonLoader";
import {
  track_Screen,
  track_Click_Event,
  track_Success_Event,
  track_Error_Event,
  signIn_Event,
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


const Login = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  var LoginLabels = global.labels

  useEffect(() => {
    track_Screen(eventName.TRACK_SCREEN, screenName.LOGIN_SCREEN);
    
  }, []);

  useEffect(()=>{
     
     console.log("constants========",LoginLabels)
  }, [global.labels])

  const onLoginPressed = async (data: any) => {
    Keyboard.dismiss()
    track_Click_Event(eventName.TRACK_CLICK, clickName.CLICK_ON_LOGIN);
    // const { youremail, yourpasswaord } = data;
    setLoader(true);
    userLogin(data)
      .then((response: any) => {
        console.log("signInResp=======", response);
        signIn_Event();
        setLoader(false);
        const syncUser = async () => {
          const userData = await API.graphql(
            graphqlOperation(getUser, { id: response.attributes.sub })
          );
          console.log("userDataFromTable=========", userData);
          if (userData.data.getUser) {
            console.log("user already exist in db");
            return;
          }

          const newUser = {
            id: response.attributes.sub,
            name: response.attributes.name,
            email: response.attributes.email,
          };
          const newUserResponse = await API.graphql(
            graphqlOperation(createUser, { input: newUser })
          );
        };
        syncUser();
        navigation.navigate("Tabnavigator");
      })
      .catch((e) => {
        console.log("loginErr=======", e);
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.SIGN_IN_ERROR
        );
        setLoader(false);
        if (e.code == "NotAuthorizedException") {
          Alert.alert(e.message);
        }
      });
  };
  const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
          <TouchableOpacity
            style={loginstyle.skipText}
            onPress={() => {
              navigation.navigate("Tabnavigator"),
                track_Click_Event(
                  eventName.TRACK_CLICK,
                  clickName.CLICK_ON_SKIP_LOGIN
                );
            }}
          >
            <Text style={loginstyle.skioptextcolor}>
              {LoginLabels?.LoginScreen?.SKIP}
            </Text>
          </TouchableOpacity>
          <View style={loginstyle.createAccountview}>
            <View>
              <Mediumlogo />
            </View>
            <View style={loginstyle.createView}>
              <Text style={loginstyle.CreateAccounttext}>
                {LoginLabels?.LoginScreen?.WELCOMEMESSAGE}
              </Text>
            </View>
            <View>
              <Text style={loginstyle.registerdText}>
                {LoginLabels?.LoginScreen?.LOGINSUBHEADING}
              </Text>
            </View>
          </View>
          <View>
            <AuthCard
              subchildren={
                <>
                  <InputField
                    name="youremail"
                    control={control}
                    placeholder={LoginLabels?.LoginScreen?.PLACEHOLDER_EMAIL}
                    Image={Mesageicon}
                    styles={loginstyle.inputview}
                    rules={{
                      required: LoginLabels?.LoginScreen?.EMAIL_VALIDATION,
                      pattern: {
                        value: emailRegex,
                        message: "Email is invalid",
                      },
                    }}
                  />
                  <InputField
                    name="yourpasswaord"
                    control={control}
                    placeholder={LoginLabels?.LoginScreen?.PLACEHOLDER_PASSWARD}
                    Image={Lock}
                    rules={{
                      required: LoginLabels?.LoginScreen?.PASSWAORD,
                    }}
                    secureTextEntry={true}
                    styles={loginstyle.inputview}
                    onSubmitEditing={handleSubmit(onLoginPressed)}
                  />
                  <CommonButton
                    onPress={handleSubmit(onLoginPressed)}
                    Register={LoginLabels?.LoginScreen?.LOGIN}
                  />

                  <View style={loginstyle.fogetpasswaordview}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("forgetpassword"),
                          track_Click_Event(
                            eventName.TRACK_CLICK,
                            clickName.CLICK_ON_FORGOT_PASSWORD
                          );
                      }}
                    >
                      <Text style={loginstyle.fogettext}>
                        {LoginLabels?.LoginScreen?.FORGET_PASSWARD}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              }
            />
          </View>

          {/* This feature is commented for now */}

          {/* <View style={loginstyle.ORviewstyle}>
              <View style={loginstyle.Horizontalline} />
              <View style={{paddingHorizontal: 15}}>
                <Text style={loginstyle.ortextstyle}>OR</Text>
              </View>
              <View style={loginstyle.Horizontalline} />
            </View> */}

          {/* <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                marginHorizontal: 20,
              }}>
              <View style={loginstyle.googleapplebutton}>
                <Googleicon />
              </View>
              <View style={{flex: 1}} />
              <View style={loginstyle.googleapplebutton}>
                <Appleicon />
              </View>
            </View> */}

          <View>
            <View style={loginstyle.lastview}>
              <View>
                <Text style={loginstyle.alreadyamember}>
                  {LoginLabels?.LoginScreen?.DONTHAVE_ACCOUNT}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Signupscreen"),
                    track_Click_Event(
                      eventName.TRACK_CLICK,
                      clickName.CLICK_ON_SIGN_UP
                    );
                }}
              >
                <Text style={loginstyle.sigintext}>
                  {LoginLabels?.LoginScreen?.SIGNUP}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={loginstyle.BottomGap} />
          </View>
        </KeyboardAwareScrollView>
        {loader ? <CommonLoader /> : null}
      </SafeAreaView>
    </>
  );
};

export default Login;
