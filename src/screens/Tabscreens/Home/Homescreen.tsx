/* eslint-disable react-native/no-inline-styles */
import React, {
  useRef,
  useState,
  useEffect
} from "react";
import { View, SafeAreaView, Text, TouchableOpacity, DeviceEventEmitter } from "react-native";
import BackgroundLayout from "../../../commonComponents/Backgroundlayout/BackgroundLayout";
import Smlogo from "../../../assets/Images/smalllogo.svg";
import { welcomscreenstyle } from "./style";
import AuthCard from "../../../commonComponents/AuthCard";
import Custombutton from "../../../commonComponents/Button";
import welocmehomelabel from "../../../utils/ProjectLabels.json";
import GuestModel from "../../../Bottomsheet/BottomsheetLayout";
import { BottomSheet } from "react-native-btr";
import Exclaimationlogo from "../../../assets/Images/exclaimationlogo.svg";
import CommonBottomsheet from "../../../commonComponents/CommonBottomsheet";
import { current_UserInfo, create_Template } from '../../../API_Manager/index';
import { useNavigation, CommonActions } from "@react-navigation/native";
import { track_Screen } from '../../../eventTracking/index';
import { eventName, screenName } from '../../../utils/Constant';
import RegisterGuestUserPopup from '../../Popups/RegisterGuestUserPopup';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Homescreen = (props: any) => {

  const childRef = useRef(null);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [isGolbal, setIsGlobal] = useState(false)

  // --------- Initial Rendering --------
  useEffect(() => {
    currentuser()
    track_Screen(eventName.TRACK_SCREEN, screenName.HOME_TAB_SCREEN)

  }, [])

  // ---------- Get Current userId ---------
  const currentuser = async () => {
    current_UserInfo().then((response: any) => {
      console.log("currUser=====", response)
      if (response) {
        global.isLoggedInUser = true
        syncDate(response.attributes.sub)
      } else {
        global.isLoggedInUser = false
      }
    }).catch((error) => {
      console.log("currentUserErr=======", error)
    })
  }

  // ---------- sync guestUser Template to logInUser ---------
  const syncDate = async (userId: string) => {
    await AsyncStorage.getItem(welocmehomelabel.TabBarTemplateList.guestUserTemplateList).then((response: any) => {
      if (response != null) {
        let dataParse = JSON.parse(response)
        const newTemplate = {
          id: dataParse[0].id,
          template_name: dataParse[0].template_name,
          userID: userId,
          soft_Deleted: false
        }
        create_Template(newTemplate).then(async (response) => {
          console.log('syncDataResp========', response)
          await AsyncStorage.removeItem(welocmehomelabel.TabBarTemplateList.guestUserTemplateList)
        }).catch((error) => {
          console.log("syncDataError======", error)
        })
      }
    })
  }

  // ------------- Guest user Popup ------------
  const onCreateCloudsheet = () => {
    //Toggling the visibility state of the bottom sheet
    if (global.isLoggedInUser) {
      global.IsFromHome = true
      
      navigation.navigate('TemplatesTab')
      // setTimeout(() => {
      //   DeviceEventEmitter.emit('openCreateTemplate')
      // }, 1000);
        
      
    } else {
      setRegisterModalVisible(!registerModalVisible);
    }
  };

  // ------------ Register guest user flow ---------
  const onClickRegister = () => {
    setRegisterModalVisible(!registerModalVisible);
    navigation.dispatch(CommonActions.reset({
      routes: [
        { name: 'Signupscreen' },]
    }))
  }

  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={welcomscreenstyle.container}>
          <View style={welcomscreenstyle.logoview}>
            <Smlogo />
          </View>
          <View style={welcomscreenstyle.welcomtextview}>
            <Text style={welcomscreenstyle.cloudtext}>
              {welocmehomelabel.HomeWelcomeScreen.CLOUDSHEETS}
            </Text>
            <Text style={welcomscreenstyle.sheettext}>
              {welocmehomelabel.HomeWelcomeScreen.SHEETS}
            </Text>
          </View>
          <View style={welcomscreenstyle.cardspace}>
            <AuthCard
              subchildren={
                <>
                  <View style={welcomscreenstyle.subcard}>
                    <View style={welcomscreenstyle.textview}>
                      <Text style={welcomscreenstyle.welcometotext}>
                        {welocmehomelabel.HomeWelcomeScreen.WELCOMETO}
                      </Text>
                    </View>
                    <View>
                      <Text style={welcomscreenstyle.cloudsheettext}>
                        {welocmehomelabel.HomeWelcomeScreen.Clodesheetcardtext}
                      </Text>
                    </View>
                    <View style={welcomscreenstyle.secondcardtext}>
                      <Text style={welcomscreenstyle.cardtext}>
                        {welocmehomelabel.HomeWelcomeScreen.Cardtext}
                      </Text>
                      <Text style={welcomscreenstyle.cardtext}>
                        {welocmehomelabel.HomeWelcomeScreen.Cardtexttwo}
                      </Text>
                    </View>
                  </View>
                  <Custombutton
                    Register={welocmehomelabel.HomeWelcomeScreen.buttontext}
                    onPress={() => onCreateCloudsheet()}
                  />
                </>
              }
            />
          </View>
        </View>
        <RegisterGuestUserPopup visible={registerModalVisible} onClickRegister={() => onClickRegister()} toggleRegisterModal={() => setRegisterModalVisible(false)} />
        <CommonBottomsheet ref={childRef} />
      </SafeAreaView>
    </>
  );
};

export default Homescreen;
