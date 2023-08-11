import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FONTS, COLOURS } from "../../../utils/Constant";
import Template from "../../../assets/Images/Tempate.svg";
// import CreateTemplatescreen from "../../../utils/ProjectLabels.json";
import SmallButton from "../../../commonComponents/SmallButton";
import LightSmallButton from "../../../commonComponents/LightSmallbutton";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import CommonBottomsheet from "../../../commonComponents/CommonBottomsheet";
import Logo from "../../../assets/Images/templatemodel.svg";
import { track_Screen } from "../../../eventTracking/index";
import { screenName, eventName } from "../../../utils/Constant";
declare global {
  var labels: any;
}
const CreateCloudSheetNamePopup = (props: any) => {
  var CreateTemplatescreen = global.labels;
  const child = useRef();
  const navigation = useNavigation();
  const [text, onChangeText] = useState();
  const [templateId, setTemplateId] = useState("");
  const [version, setVersion] = useState();
  const [spreadSheetId, setSpreadSheetId] = useState("");
  const [userId, setUserId] = useState("");
  const [softDeleted, setSoftDeleted] = useState(false);

  useEffect(() => {
    console.log("nameErr========", props?.error);
    if (props?.isEditCloudSheetName) {
      onChangeText(props?.selectedCloudSheet?.spreadsheet_name);
      setTemplateId(props?.selectedCloudSheet?.templatesID);
      setVersion(props?.selectedCloudSheet?._version);
      setSpreadSheetId(props?.selectedCloudSheet?.id);
      setUserId(props?.selectedCloudSheet?.userID);
      setSoftDeleted(props?.selectedCloudSheet?.soft_Deleted);
      track_Screen(eventName.TRACK_SCREEN, screenName.EDIT_SPREADSHEET_MODAL);
    } else {
      track_Screen(eventName.TRACK_SCREEN, screenName.CREATE_SPREADSHEET_MODAL);
    }
  }, []);

  return (
    <>
      <View style={Tempatestyle.container}>
        <View style={Tempatestyle.firstview}>
          <View>
            <Text style={Tempatestyle.newtemplattext}>
              {props.isEditCloudSheetName
                ? CreateTemplatescreen.CloudSheetNameConstants.EditCloudSheet
                : CreateTemplatescreen.CloudSheetNameConstants.NewCloudSheet}
            </Text>
          </View>
          <View>
            <Text style={Tempatestyle.subheadingtext}>
              {
                CreateTemplatescreen.CloudSheetNameConstants
                  .PleaseNameYourCloudSheet
              }
            </Text>
          </View>
        </View>
        <View style={Tempatestyle.secondviewmain}>
          <View>
            <Text style={Tempatestyle.entertemplatetext}>
              {CreateTemplatescreen.CloudSheetNameConstants.CloudSheetName}
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
                  CreateTemplatescreen.CloudSheetNameConstants
                    .EnterCloudSheetName
                }
              />
            </View>
            {props?.error ? (
              <View style={{ marginHorizontal: 18, marginTop: 5 }}>
                <Text style={Tempatestyle.errorStyle}>{props?.error}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={Tempatestyle.buttonview}>
          <View style={Tempatestyle.spaceAround}></View>
          <View>
            <LightSmallButton
              buttontext={CreateTemplatescreen.CloudSheetNameConstants.Cancel}
              onPress={props.OnClose}
            />
          </View>

          <View style={Tempatestyle.space}></View>
          <View>
            <SmallButton
              buttontext={
                props.isEditCloudSheetName
                  ? CreateTemplatescreen.CloudSheetNameConstants.Update
                  : CreateTemplatescreen.CloudSheetNameConstants.Create
              }
              onPress={() =>
                props.isEditCloudSheetName
                  ? props.onUpdateCloudSheet(
                      text,
                      templateId,
                      version,
                      spreadSheetId,
                      userId,
                      softDeleted
                    )
                  : props.onCreateSpreadSheet(text)
              }
            />
          </View>
          <View style={Tempatestyle.spaceAround}></View>
        </View>
      </View>
      <CommonBottomsheet ref={child} />
    </>
  );
};

export default CreateCloudSheetNamePopup;

const Tempatestyle = StyleSheet.create({
  errorStyle: {
    fontFamily: FONTS.MANROPE_NORMAL,
    fontSize: 12,
    color: COLOURS.red,
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
    // marginHorizontal: 110,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
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
    flex: 1,
  },
  spaceAround: {
    flex: 0.5,
  },
});
