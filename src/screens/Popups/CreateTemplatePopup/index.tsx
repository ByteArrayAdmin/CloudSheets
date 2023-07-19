import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { FONTS, COLOURS } from "../../../utils/Constant";
import Template from "../../../assets/Images/Tempate.svg";
// import CreateTemplatescreen from "../../../utils/ProjectLabels.json";
import { useForm } from "react-hook-form";
import SmallButton from "../../../commonComponents/SmallButton";
import LightSmallButton from "../../../commonComponents/LightSmallbutton";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import CommonBottomsheet from "../../../commonComponents/CommonBottomsheet";
import Logo from "../../../assets/Images/templatemodel.svg";
import { track_Screen ,track_Click_Event} from '../../../eventTracking/index';
import {eventName,screenName,clickName} from '../../../utils/Constant';
declare global {
  var labels: any;
}
const CreateTemplatePopup = (props: any) => {
  var CreateTemplatescreen = global.labels
  const child = useRef();
  const navigation = useNavigation();
  const [text, onChangeText] = useState();
  const [templateId, setTemplateId] = useState('')
  const [version, setVersion] = useState()
  const [softDeleted,setSoftDeleted] = useState()

  const OnClose = () => {
    if (props.isEditTemplate) {
      track_Click_Event(eventName.TRACK_CLICK,clickName.CANCEL_UPDATE_TEMPLATE)
    }
    track_Click_Event(eventName.TRACK_CLICK,clickName.CANCEL_CREATE_TEMPLATE)
    child.current.childFunction2();
  };

  useEffect(() => {
    if (props.isEditTemplate) {
      onChangeText(props.selectedTemplate.template_name)
      setTemplateId(props.selectedTemplate.id)
      setVersion(props.selectedTemplate._version)
      setSoftDeleted(props.selectedTemplate.soft_Deleted)
      track_Screen(eventName.TRACK_SCREEN,screenName.EDIT_TEMPLATE_MODAL)
    }else{
      track_Screen(eventName.TRACK_SCREEN,screenName.CREATE_TEMPLATE_MODAL)
    }
  }, [])

  return (
    <>
      <View style={Tempatestyle.container}>
        <View style={Tempatestyle.firstview}>
          <View>
            <Text style={Tempatestyle.newtemplattext}>
              {props.isEditTemplate ? CreateTemplatescreen.TemBottomsheet.EditTemplate : CreateTemplatescreen.TemBottomsheet.NewTemplate}
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
            {props?.error ?
              <View style={Tempatestyle.errorView}>
                <Text style={Tempatestyle.errorStyle}>{props?.error}</Text>
              </View>
              : null}
          </View>
        </View>
        <View style={Tempatestyle.buttonview}>
        <View style={Tempatestyle.spaceAround}></View>
          <View>
            <LightSmallButton
               buttontext={CreateTemplatescreen.TemBottomsheet.Cancel}
              // onPress={CreatePress}
              onPress={props.OnCloseCreateTemplate}
            />
          </View>
          <View style={Tempatestyle.space}></View>
          <View>
            <SmallButton
             
             buttontext={props.isEditTemplate ? CreateTemplatescreen.TemBottomsheet.Update : CreateTemplatescreen.TemBottomsheet.Create}
              
              onPress={() => props.isEditTemplate ? props.onUpdateTemplate(text, templateId, version,softDeleted) : props.onCreateTemplate(text)}
            />
          </View>
          <View style={Tempatestyle.spaceAround}></View>
        </View>
      </View>
      <CommonBottomsheet ref={child} />
    </>
  );
};

export default CreateTemplatePopup;

const Tempatestyle = StyleSheet.create({
  errorView:{
    marginHorizontal: 18,
    marginTop: 5 
  },
  errorStyle: {
    fontFamily: FONTS.MANROPE_NORMAL,
    fontSize: 12,
    color: COLOURS.red
  },
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
    // marginHorizontal: 112,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    
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
    // width: "20%",
    flex:1
  },
  spaceAround:{
    flex:0.5
  }
});
