import React, { useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import Logo from "../../../../assets/Images/ColourFolder.svg";
import Threedots from "../../../../assets/Images/threedots.svg";
import Docimage from "../../../../assets/Images/Colouredattendancelist.svg";
import Docicon from '../../../../assets/Images/januaryAttendicon.svg';
import IC_purpleDoc from '../../../../assets/Images/IC_purpleDoc.svg';
import Ic_redDoc from '../../../../assets/Images/Ic_redDoc.svg';
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import Popup from "../../../Popups/TemplateEditPopup";
import moment from 'moment';

const CloudsheetListCard = (props: any) => {
  const Child = useRef();
  const openPopup = () => {
    Child.current.childFunction1();
  };
  const SnapPoints = ["60%"];
  return (
    <View style={styles.container}>
      <View>
        {props.index % 2 ?
          <Docicon /> : props.index % 3 ?
            <IC_purpleDoc /> : <Ic_redDoc />
        }
      </View>
      <View>
        <Text style={styles.textstyle}>{props?.item?.spreadsheet_name}</Text>
        <Text style={styles.datestyle}>{moment(props?.item?.createdAt).format("MMM DD, YYYY | HH:mm a")}</Text>
      </View>
      <View style={styles.space}></View>
      <View style={styles.imagestyle}>
        <TouchableOpacity style={styles.ThreeDotview} onPress={openPopup}>
          <Threedots />
        </TouchableOpacity>
      </View>
      <CommonBottomsheet
        snapPoints={SnapPoints}
        ref={Child}
        children={<Popup />}
      />
    </View>
  );
};

export default CloudsheetListCard;

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
    bottom: 40,
  },
  ThreeDotview: { width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }
});
