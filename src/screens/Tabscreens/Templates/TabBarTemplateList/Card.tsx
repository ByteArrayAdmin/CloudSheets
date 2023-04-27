import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import Logo from "../../../../assets/Images/ColourFolder.svg";
import Threedots from "../../../../assets/Images/threedots.svg";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import EditDeleteCloudsheet from "../../../../screens/Popups/Edit_Delete_Cloudsheet";
import labels from "../../../../utils/ProjectLabels.json"


const Card = () => {


  const Opempopup= ()=>{
    child.current.childFunction1()
  }
  const child = useRef();
  const SnapPoints= ["40%"]
  return (
    <View style={styles.container}>
      <View>
        <Logo />
      </View>
      <View>
        <Text style={styles.textstyle}>Class Attendance</Text>
        <Text style={styles.datestyle}>Jan 16, 2023 | 12:54 PM</Text>
      </View>
      <View style={styles.space}></View>
      <TouchableOpacity style={styles.imagestyle} onPress={Opempopup}>
        <Threedots />
      </TouchableOpacity >
      <View>
        <CommonBottomsheet ref ={child} snapPoints={SnapPoints} children={
          <EditDeleteCloudsheet name={"My Expenses"} date={"Modify on Jan 11"} 
          editlabel={labels.TemplatePopupExpenses.Edit_Template} deletelabel={labels.TemplatePopupExpenses["Delete Template"]}/>
        } />
      </View>
    </View>
  );
};

export default Card;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  textstyle: {
    fontFamily: FONTS.inter_semibold,
    fontSize: 14,
    paddingLeft: 15,
    color: COLOURS.black,
  },
  datestyle: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    paddingLeft: 15,
    color: COLOURS.black,
    opacity: 0.6,
    paddingTop: 10,
  },
  space: {
    flex: 1,
  },
  imagestyle: {
    position: "absolute",
    right: 15,
    bottom: 48,
  },
});
