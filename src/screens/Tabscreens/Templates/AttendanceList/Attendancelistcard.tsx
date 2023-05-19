import React, { useRef, useState } from "react";
import label from "../../../../utils/ProjectLabels.json";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Downarrow from "../.././../../assets/Images/dropdown.svg";
import Ic_upArrow from '../../../../assets/Images/Ic_upArrow.svg';
import Threedot from "../.././../../assets/Images/Darkthreedots.svg";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import { useNavigation, useRoute } from "@react-navigation/native";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import Edit_Delete_Cloudsheet from "../../../Popups/Edit_Delete_Cloudsheet/index";

export const Attendancelistcard = (props: any) => {
  const child = useRef();
  const snapPoints = ["35%", "50%"];
  const [items, setItems] = useState(JSON.parse(props?.item.items))
  const [isOpen, setIsOpen] = useState(false)

  const OpenPopop = () => {
    child.current.childFunction1();
  };

  const toggleSwitch = () => setIsOpen(previousState => !previousState);

  return (
    <TouchableOpacity style={Styles.container}
      onPress={toggleSwitch}
    >
    
      <View style={[Styles.innercontainer,{borderColor:isOpen?COLOURS.lightgrey:COLOURS.cardBorder_lightBlue}]}>
        <View style={Styles.subcontainer}>
          <View>
            <Text style={Styles.nametext}>{Object.values(items)[0]}</Text>
          </View>
          <View style={Styles.emptyview}></View>
          <View style={Styles.gap}>
            {isOpen ? <Ic_upArrow /> : <Downarrow />}
          </View>
          <View>
            <TouchableOpacity style={Styles.ThreeDotview} onPress={props.openEditRecord}>
              <Threedot />
            </TouchableOpacity>
          </View>
        </View>

        {isOpen ?
          <View style={Styles.bottomgap}>
            <View style={Styles.horizontallineview}>
              <View style={Styles.innerhoeizontaline} />
            </View>
            {
              Object.keys(items).map((key) => {
                return (
                  <View style={Styles.detailview}>
                    <Text style={Styles.labelheading}>{key}</Text>
                    <View style={Styles.emptyview}></View>
                    <Text style={Styles.detailnametext}>{(items)[key]}</Text>
                  </View>
                )
              })}
          </View> : null}
      </View>

      <CommonBottomsheet
        ref={child}
        snapPoints={snapPoints}
        children={
          <Edit_Delete_Cloudsheet
            editlabel={label.Edit_Delete_Cloud.EditCloudSheetRecord}
            deletelabel={label.Edit_Delete_Cloud.DeleteCloudSheet}
            date={"Modify on Jan 11"}
            name={"Rahul Raj"}
          />
        }
      />
    </TouchableOpacity>
  );
};

export default Attendancelistcard;

const Styles = StyleSheet.create({
  container: {},
  innercontainer: {
    paddingHorizontal: 16,

    backgroundColor: COLOURS.white,
    borderRadius: 8,
    borderWidth:1
  },
  emptyview: {
    flex: 1,
  },
  subcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  gap: {
    paddingRight: 16,
  },
  nametext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
  },
  detailnametext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
  },
  labelheading: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
    opacity: 0.5,
  },
  horizontallineview: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerhoeizontaline: {
    flex: 1,
    height: 1,
    backgroundColor: COLOURS.lightgrey,
  },
  detailview: { marginTop: 16, flexDirection: "row", alignItems: "center" },
  bottomgap: {
    marginBottom: 20,
  },
  ThreeDotview: { width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }
});
