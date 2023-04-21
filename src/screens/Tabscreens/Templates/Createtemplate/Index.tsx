import React, { useState } from "react";
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

const CreateTemplate = () => {
  const [visible, setVisible] = useState(false);
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  const CreatePress = () => {
    navigation.navigate("CreatSpreadsheet");
    toggleBottomNavigationView();
    console.log("my project  toggle");
  };
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
                          <Text>
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
        </View>
      </SafeAreaView>
      <BottomsheetLayout
        styless={Tempatestyle.Bottomsheetview}
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
        children={
          <>
            <KeyboardAwareScrollView style={{ flex: 1 }}>
              <View style={Tempatestyle.firstview}>
                <View>
                  <Text style={Tempatestyle.newtemplattext}>
                    {CreateTemplatescreen.TemBottomsheet.NewTemplate}
                  </Text>
                </View>
                <View>
                  <Text style={Tempatestyle.subheadingtext}>
                    {CreateTemplatescreen.TemBottomsheet.PleasenameyourTemplate}
                  </Text>
                </View>
              </View>
              <View style={Tempatestyle.secondviewmain}>
                <View>
                  <Text style={Tempatestyle.entertemplatetext}>
                    {CreateTemplatescreen.TemBottomsheet.TemplateName}
                  </Text>
                </View>
              </View>
              <View>
                <InputField
                  name="Template"
                  control={control}
                  placeholder={
                    CreateTemplatescreen.TemBottomsheet.EnterTemplateName
                  }
                  Image={Template}
                  styles={Tempatestyle.inputview}
                />
              </View>
              <View style={Tempatestyle.Buttonview}>
                <View style={Tempatestyle.Button}>
                  <Text style={Tempatestyle.canceltext}>
                    {CreateTemplatescreen.TemBottomsheet.Cancel}
                  </Text>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  style={Tempatestyle.secondbutton}
                  onPress={() => CreatePress()}
                >
                  <Text style={Tempatestyle.create}>
                    {CreateTemplatescreen.TemBottomsheet.Create}
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
          </>
        }
      />
    </>
  );
};

export default CreateTemplate;
