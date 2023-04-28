/* eslint-disable react-native/no-inline-styles */
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import BackgroundLayout from "../../../commonComponents/Backgroundlayout/BackgroundLayout";
import Smlogo from "../../../assets/Images/smalllogo.svg";
import { welcomscreenstyle } from "./style";
import AuthCard from "../../../commonComponents/AuthCard";
import Custombutton from "../../../commonComponents/Button";
import welocmehomelabel from "../../../utils/ProjectLabels.json";
import GuestModel from "../../../Bottomsheet/BottomsheetLayout";
import { BottomSheet } from "react-native-btr";
import Exclaimationlogo from "../../../assets/Images/exclaimationlogo.svg";
import modelLabels from "../../../utils/ProjectLabels.json";
import { Tempatestyle } from "../Templates/Createtemplate/Style";
import CommonBottomsheet from "../../../commonComponents/CommonBottomsheet";

const Homescreen = (props: any) => {
  const [visible, setVisible] = useState(false);
  const childRef = useRef(null);
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

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
                    onPress={() => toggleBottomNavigationView()}
                  />

                  <BottomSheet
                    style={Tempatestyle.Bottomsheetview}
                    visible={visible}
                    onBackButtonPress={toggleBottomNavigationView}
                    onBackdropPress={toggleBottomNavigationView}
                  >
                    <View style={welcomscreenstyle.bottomNavigationView}>
                      <View style={welcomscreenstyle.subconatiner}>
                        <View style={{ marginTop: 30 }}>
                          <Exclaimationlogo />
                        </View>
                        <View>
                          <Text style={welcomscreenstyle.Textguest}>
                            {modelLabels.Guestbottomsheet.YOUAREAGUEST}
                          </Text>
                        </View>
                        <View>
                          <Text style={welcomscreenstyle.regitercontinuetext}>
                            {modelLabels.Guestbottomsheet.REGISTERTOCONTINUE}
                          </Text>
                        </View>
                      </View>
                      <Custombutton
                        Register={modelLabels.Guestbottomsheet.Registernow}
                        onPress={() => toggleBottomNavigationView()}
                      />
                    </View>
                  </BottomSheet>
                </>
              }
            />
          </View>
        </View>
        <CommonBottomsheet ref={childRef} />
      </SafeAreaView>
    </>
  );
};

export default Homescreen;
