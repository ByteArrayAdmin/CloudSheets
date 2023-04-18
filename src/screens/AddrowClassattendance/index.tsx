import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import BackButton from "../../commonComponents/Backbutton";
import Folder from "../../assets/Images/folder12.svg";
import labels from "../../utils/ProjectLabels.json";
import Folderlogo from "../../assets/Images/folder_minus.svg";
import Fatlogo from "../../assets/Images/fatrows.svg";
import {Style} from './style'
import { FONTS, COLOURS } from "../../utils/Constant";
import { useNavigation } from "@react-navigation/native";
const AddrowClassattendance = () => {
    const navigation = useNavigation();
    const [text, onChangeText] = useState('');
    
    


  return (
    <View style={Style.container}>
      <View style={Style.subcontainer}>
        <View style={Style.headerview}>
          <View>
            <BackButton />
          </View>
          <View style={Style.iconview}>
            <Folder />
          </View>
          <View>
            <Text style={Style.classattendancetext}>
              {labels.AddrowClassattendance.ClassAttendance}
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
              placeholderTextColor={COLOURS.white}
            />
          </View>
        </View>
      </View>

      <View>
        <View style={Style.buttonview}>
          <View
            style={Style.subuttnview}
          >
            <View style={Style.buttonviewnew}>
              <Fatlogo />
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("RowdetailForm")}>
              <Text style={Style.addrowtext}>{labels.AddrowClassattendance.buttontext}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddrowClassattendance;


