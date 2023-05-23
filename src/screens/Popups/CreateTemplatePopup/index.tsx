import React, { useRef ,useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { FONTS, COLOURS } from "../../../utils/Constant";
import Template from "../../../assets/Images/Tempate.svg";
import CreateTemplatescreen from "../../../utils/ProjectLabels.json";
import { useForm } from "react-hook-form";
import SmallButton from "../../../commonComponents/SmallButton";
import LightSmallButton from "../../../commonComponents/LightSmallbutton";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import CommonBottomsheet from "../../../commonComponents/CommonBottomsheet";
import Logo from "../../../assets/Images/templatemodel.svg";

const CreateTemplatePopup = (props:any) => {
  
  const child = useRef();
  const navigation = useNavigation();
  const [text, onChangeText] = useState();
  const [templateId, setTemplateId]  = useState('')
  const [version, setVersion] = useState()

  const CreatePress = () => {
    child.current.childFunction2();
    navigation.navigate("CreatSpreadsheet",{templateName:text});
  };
  const OnClose = () => {
    child.current.childFunction2();
  };

  useEffect(()=>{
    if(props.isEditTemplate){
      onChangeText(props.selectedTemplate.template_name)
      setTemplateId(props.selectedTemplate.id)
      setVersion(props.selectedTemplate._version)
    }
  }, [])

  return (
    <>
      <View style={Tempatestyle.container}>
        <View style={Tempatestyle.firstview}>
          <View>
            <Text style={Tempatestyle.newtemplattext}>
              {props.isEditTemplate? CreateTemplatescreen.TemBottomsheet.EditTemplate : CreateTemplatescreen.TemBottomsheet.NewTemplate}
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
          <View style={Tempatestyle.Bottominput}>
            <View style={Tempatestyle.outerinputView}>
              <View>
                <Logo />
              </View>
              <BottomSheetTextInput
                onChangeText={onChangeText}
                value={text}
                style={Tempatestyle.textInput}
                placeholder={
                  CreateTemplatescreen.TemBottomsheet.EnterTemplateName
                }
              />
            </View>
          </View>
        </View>
        <View style={Tempatestyle.buttonview}>
          <View>
            <SmallButton
              buttontext={CreateTemplatescreen.TemBottomsheet.Cancel}
              onPress={OnClose}
            />
          </View>

          <View style={Tempatestyle.space}></View>
          <View>
            <LightSmallButton
              buttontext={props.isEditTemplate? CreateTemplatescreen.TemBottomsheet.Update : CreateTemplatescreen.TemBottomsheet.Create}
              // onPress={CreatePress}
              onPress={()=>props.isEditTemplate? props.onUpdateTemplate(text,templateId,version) : props.onCreateTemplate(text)}
            />
          </View>
        </View>
      </View>
      <CommonBottomsheet ref={child} />
    </>
  );
};

export default CreateTemplatePopup;

const Tempatestyle = StyleSheet.create({
  container: {},
  firstview: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  secondviewmain: { marginTop: 30, marginHorizontal: 15 },
  newtemplattext: {
    fontSize: 20,
    fontFamily: FONTS.manrope_semibold,
    color: COLOURS.black,
  },
  subheadingtext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
    paddingTop: 5,
    opacity: 0.6,
  },
  entertemplatetext: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
    opacity: 0.6,
  },
  inputview: {
    height: 50,
    width: "100%",
    fontFamily: FONTS.inter_regular,
  },
  buttonview: {
    flexDirection: "row",
    marginHorizontal: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  Bottominput: {
    marginTop: 15,
  },
  textInput: {
    marginHorizontal: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLOURS.offwhite,
    height: 50,
    width: "75%",
  },
  outerinputView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: COLOURS.offwhite,
    marginHorizontal: 18,
    borderRadius: 8,
  },
  space: {
    width: "20%",
  },
});
