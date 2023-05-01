import React, { useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import BackgroundLayout from "../../../../commonComponents/Backgroundlayout/BackgroundLayout";
import Smlogo from "../../../../assets/Images/smalllogo.svg";
import InputField from "../../../../commonComponents/InputField";
import AuthCard from "../../../../commonComponents/AuthCard";
import Custombutton from "../../../../commonComponents/Button";
import CreateTemplatescreen from "../../../../utils/ProjectLabels.json";
import Templatelogo from "../../../../assets/Images/Templatelogo.svg";
import { Tempatestyle } from "./Style";
import BottomsheetLayout from "../../../../Bottomsheet/BottomsheetLayout";
import { useForm } from "react-hook-form";
import Template from "../../../../assets/Images/Tempate.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import CreateTemplatePopup from "./../../../Popups/CreateTemplatePopup";

const CreateTemplate = () => {
  const [visible, setVisible] = useState(false);
  const { control, handleSubmit } = useForm();
  const child = useRef();
  const navigation = useNavigation();
  const toggleBottomNavigationView = () => {
    child.current.childFunction1();
  };

  const snapPoints = ["45%"];

  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={Tempatestyle.safeareaview}>
        <View style={Tempatestyle.container}>
          <View style={Tempatestyle.logoview}>
            <Smlogo />
          </View>
          <View style={Tempatestyle.cloudview}>
            <Text style={Tempatestyle.cloudtext}>
              {CreateTemplatescreen.CreateTemplatescreen.Cloud}
            </Text>
            <Text style={Tempatestyle.sheetetxt}>
              {CreateTemplatescreen.CreateTemplatescreen.Sheets}
            </Text>
          </View>

          <View style={Tempatestyle.authcardview}>
            <AuthCard
              subchildren={
                <>
                  <View style={Tempatestyle.Cardcontainer}>
                    <View style={Tempatestyle.subcontainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("TabBarTemplateList")
                        }
                      >
                        <Templatelogo />
                      </TouchableOpacity>
                      <View style={Tempatestyle.cartdtetxt}>
                        <View>
                          <Text style={Tempatestyle.cardtextstyle}>
                            {CreateTemplatescreen.CreateTemplatescreen.CARDTEXT}
                          </Text>
                        </View>
                        <View style={Tempatestyle.cardtetxt2}>
                          <Text style={Tempatestyle.cardtextstyle}>
                            {
                              CreateTemplatescreen.CreateTemplatescreen
                                .CARDTEXT2
                            }
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Custombutton
                      Register={
                        CreateTemplatescreen.CreateTemplatescreen.CreateTemplate
                      }
                      onPress={() => toggleBottomNavigationView()}
                    />
                  </View>
                </>
              }
            />
          </View>
          <CommonBottomsheet
            ref={child}
            snapPoints={snapPoints}
            children={<CreateTemplatePopup />}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default CreateTemplate;
