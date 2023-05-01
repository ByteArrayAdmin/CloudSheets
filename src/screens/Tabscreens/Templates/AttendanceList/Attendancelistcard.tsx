import React, { useRef } from "react";
import label from "../../../../utils/ProjectLabels.json";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Downarrow from "../.././../../assets/Images/dropdown.svg";
import Threedot from "../.././../../assets/Images/Darkthreedots.svg";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import Edit_Delete_Cloudsheet from "../../../Popups/Edit_Delete_Cloudsheet/index";

export const Attendancelistcard = () => {
  const child = useRef();
  const snapPoints = ["35%", "50%"];

  const OpenPopop = () => {
    child.current.childFunction1();
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.innercontainer}>
        <View style={Styles.subcontainer}>
          <View>
            <Text style={Styles.nametext}>Rahul Raj</Text>
          </View>
          <View style={Styles.emptyview}></View>
          <View style={Styles.gap}>
            <Downarrow />
          </View>
          <View>
            <TouchableOpacity style={Styles.ThreeDotview} onPress={OpenPopop}>
              <Threedot />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.horizontallineview}>
          <View style={Styles.innerhoeizontaline} />
        </View>
        <View style={Styles.bottomgap}>
          <View style={Styles.detailview}>
            <View>
              <Text style={Styles.labelheading}>
                {label.Attendancelistlabels.Name}
              </Text>
            </View>
            <View style={Styles.emptyview}></View>
            <View>
              <Text style={Styles.detailnametext}>Rahul Raj</Text>
            </View>
          </View>
          <View style={Styles.detailview}>
            <View>
              <Text style={Styles.labelheading}>
                {label.Attendancelistlabels.AttendanceDate}
              </Text>
            </View>
            <View style={Styles.emptyview}></View>
            <View>
              <Text style={Styles.detailnametext}>16 January,2023</Text>
            </View>
          </View>
          <View style={Styles.detailview}>
            <View>
              <Text style={Styles.labelheading}>
                {label.Attendancelistlabels.Present}
              </Text>
            </View>
            <View style={Styles.emptyview}></View>
            <View>
              <Text style={Styles.detailnametext}>Yes</Text>
            </View>
          </View>
          <View style={Styles.detailview}>
            <View>
              <Text style={Styles.labelheading}>
                {label.Attendancelistlabels.Samples}
              </Text>
            </View>
            <View style={Styles.emptyview}></View>
            <View>
              <Text style={Styles.detailnametext}>-</Text>
            </View>
          </View>
        </View>
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
    </View>
  );
};

export default Attendancelistcard;

const Styles = StyleSheet.create({
  container: {},
  innercontainer: {
    paddingHorizontal: 16,

    backgroundColor: COLOURS.white,
    borderRadius: 8,
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
 ThreeDotview: {width:25, height:25, justifyContent:'center', alignItems:'center'}
});
