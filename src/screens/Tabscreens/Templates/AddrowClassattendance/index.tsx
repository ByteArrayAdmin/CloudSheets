import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar
} from "react-native";

import BackButton from "../../../../commonComponents/Backbutton";
import Folder from "../../../../assets/Images/folder12.svg";
import labels from "../../../../utils/ProjectLabels.json";
import Folderlogo from "../../../../assets/Images/folder_minus.svg";
import Fatlogo from "../../../../assets/Images/fatrows.svg";
import { Style } from "./style";
import { FONTS, COLOURS } from "../../../../utils/Constant";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {create_SpreadSheet} from '../../../../API_Manager/index';
import uuid from 'react-native-uuid';
import moment from 'moment';
const AddrowClassattendance = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const [text, onChangeText] = useState("");
  const [template, setTemplate] = useState(route.params.template)
  const [isFrom,setIsFrom] = useState(route?.params?.isFrom)

  useEffect(()=>{
    console.log("columns=======",route.params.template)
  }, [])

  const onAddRow = ()=>{
    let uid = uuid.v1().toString()
    let timeStamp = moment().unix().toString()
    let newUniqueId = uid + "-" + timeStamp
    let newSpreadData = {
      id:newUniqueId,
      spreadsheet_name:text,
      templatesID:template.id,
      userID:template.userID

    }
    console.log("spreadSheetData=======",newSpreadData)
    create_SpreadSheet(newSpreadData).then((response)=>{
        console.log("spreadResp=======",response)
        navigation.navigate("RowdetailForm",{spreadSheet:response.data.createSpreadSheet,isFrom:isFrom})
    }).catch((error)=>{
      console.log("spreadErr=====",error)
    })
  }

  return (
    <>
    <StatusBar backgroundColor={COLOURS.Skyblue}/>
    <SafeAreaView style={{backgroundColor:COLOURS.Skyblue}}>
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

        <View>
          <View style={Style.buttonview}>
            <View style={Style.subuttnview}>
              <View style={Style.buttonviewnew}>
                <Fatlogo />
              </View>
              <TouchableOpacity
                // onPress={() => navigation.navigate("RowdetailForm",{spreadSheetName:text})}
                onPress={()=>onAddRow()}
              >
                <Text style={Style.addrowtext}>
                  {labels.AddrowClassattendance.buttontext}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      </SafeAreaView>
      </>
  );
};

export default AddrowClassattendance;
