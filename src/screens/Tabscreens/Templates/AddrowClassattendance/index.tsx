import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  DeviceEventEmitter
} from "react-native";

import BackButton from "../../../../commonComponents/Backbutton";
import Folder from "../../../../assets/Images/folder12.svg";
import labels from "../../../../utils/ProjectLabels.json";
import Folderlogo from "../../../../assets/Images/folder_minus.svg";
import Fatlogo from "../../../../assets/Images/fatrows.svg";
import { Style } from "./style";
import { FONTS, COLOURS, successActionName, errorActionName } from "../../../../utils/Constant";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { create_SpreadSheet } from '../../../../API_Manager/index';
import uuid from 'react-native-uuid';
import moment from 'moment';
import CommonLoader from '../../../../commonComponents/CommonLoader';
import { track_Click_Event, track_Error_Event, track_Screen, track_Success_Event } from '../../../../eventTracking/index';
import {eventName,screenName,clickName} from '../../../../utils/Constant';
const AddrowClassattendance = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const [text, onChangeText] = useState("");
  const [error, setError] = useState("")
  const [template, setTemplate] = useState(route.params.template)
  const [isFrom, setIsFrom] = useState(route?.params?.isFrom)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    console.log("columns=======", route.params.template)
    track_Screen(eventName.TRACK_SCREEN,screenName.CREATE_SPREADSHEET_SCREEN)
  }, [])

  // ---------------Check form validation----------------
  const checkValidation = () => {
    if (text == "") {
      setError("Spreadsheet name is required!")
    } else {
      onAddRow()
    }
  }

  // ----------------- Add SpreadSheet name------------
  const onAddRow = () => {
    track_Click_Event(eventName.TRACK_CLICK, clickName.CREATE_SPREADSHEET_NAME)
    let uid = uuid.v1().toString()
    let timeStamp = moment().unix().toString()
    let newUniqueId = uid + "-" + timeStamp
    let newSpreadData = {
      id: newUniqueId,
      spreadsheet_name: text,
      templatesID: template.id,
      userID: template.userID,
      soft_Deleted: false
    }
    console.log("spreadSheetData=======", newSpreadData)
    setLoader(true)
    create_SpreadSheet(newSpreadData).then((response: any) => {
      setLoader(false)
      track_Success_Event(eventName.TRACK_SUCCESS_ACTION,successActionName.CREATE_SPREADSHEET_NAME_SUCCESSFULLY)
      console.log("spreadResp=======", response)
      DeviceEventEmitter.emit('updateSpreadSheetList')
      navigation.navigate("RowdetailForm", { spreadSheet: response.data.createSpreadSheet, isFrom: isFrom })
    }).catch((error) => {
      track_Error_Event(eventName.TRACK_ERROR_ACTION,errorActionName.CREATE_SPREADSHEET_NAME_ERROR)
      setLoader(false)
      console.log("spreadErr=====", error)
    })
  }

  return (
    <>
      <StatusBar backgroundColor={COLOURS.Skyblue} />
      <SafeAreaView style={{ backgroundColor: COLOURS.Skyblue }}>
        <View style={Style.container}>
          <View style={Style.subcontainer}>
            <View style={Style.headerview}>
              <View>
                <BackButton onPress={() => navigation.goBack()} />
              </View>
              <View style={Style.iconview}>
                <Folder />
              </View>
              <View>
                <Text style={Style.classattendancetext}>
                  {template?.template_name}
                </Text>
              </View>
            </View>
            <View style={Style.staightline}>
              <View style={Style.stfraightlineview} />
            </View>
            <View></View>
            <View style={Style.maininputview}>
              <View style={Style.folderview}>
                <Folderlogo />
              </View>
              <View style={Style.inputview}>
                <TextInput
                  style={Style.inputviewstyle}
                  onChangeText={onChangeText}
                  value={text}
                  placeholder={labels.AddrowClassattendance.Placeholdertext}
                  placeholderTextColor={COLOURS.white} />
              </View>
            </View>
          </View>
          {error ?
            <View style={Style.errorView}>
              <Text style={Style.errorStyle}>{error}</Text>
            </View> : null}

          <View>
            <View style={Style.buttonview}>
              <TouchableOpacity style={Style.subuttnview}
                onPress={() => checkValidation()}
              >
                <View style={Style.buttonviewnew}>
                  <Fatlogo />
                </View>
                <Text style={Style.addrowtext}>
                  {labels.AddrowClassattendance.buttontext}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </SafeAreaView>
      {loader?<CommonLoader/>:null}
    </>
  );
};

export default AddrowClassattendance;
