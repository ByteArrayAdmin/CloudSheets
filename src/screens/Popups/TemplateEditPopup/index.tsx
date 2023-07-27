import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import { FONTS, COLOURS } from "../../../utils/Constant";
import Infoicon from "../../../assets/Images/infocircle.svg";
import Edit from "../../../assets/Images/Edit.svg";
import Shareicon from "../../../assets/Images/sharecloud.svg";
import Rename from "../../../assets/Images/Rename.svg";
import Viewicon from "../../../assets/Images/TermLogo.svg";
import Delete from "../../../assets/Images/Deleteicon.svg";
import CommonCard from "../CommonCard";
// import labels from "../../../utils/ProjectLabels.json";
import { ScrollView } from "react-native-gesture-handler";
import moment from 'moment';
declare global {
  var labels: any;
}

const TemplateEditPopup = (props: any) => {
  const { height } = Dimensions.get('window');
  var labels = global.labels
  return (
    <View style={styles.container}>
      <View style={styles.creatcloudview}>
        <View>
          <View>
            <Text style={styles.createcloudtext}>{props?.selectedCloudSheet?.spreadsheet_name}</Text>
          </View>
        </View>
        <View style={styles.space} />
        <View>
          {/* <Infoicon /> */}
        </View>
      </View>
      <View>
        <Text style={styles.modifytext}>{moment(props?.selectedCloudSheet?.createdAt).format("MMM DD, YYYY | hh:mm a")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.commoncardview}>
          <View>
            <CommonCard
              icon={<Rename />}
              heading={labels.EditTemplatePopup.EditCloudSheetName}
              onPress={props.onEditCloudSheet}
            />
          </View>
          <View style={styles.cardspace}>
            <CommonCard
            isDisabled={true}
              icon={<Shareicon />}
              heading={labels.EditTemplatePopup.Share_CloudSheet}
            />
          </View>
          {/* <View style={styles.cardspace}>
            <CommonCard
              icon={<Rename />}
              heading={labels.EditTemplatePopup.RenameCloudSheet}
            />
          </View> */}
          {/* <View style={styles.cardspace}>
            <CommonCard
              icon={<Edit />}
              heading={labels.EditTemplatePopup.EditCloudSheet}
            />
          </View> */}
          <View style={styles.cardspace}>
            <CommonCard
              icon={<Viewicon />}
              heading={labels.EditTemplatePopup.View_CloudSheet}
              onPress={props.onViewCloudSheet}
            />
          </View>
          <View style={styles.cardspace}>
            <CommonCard
              icon={<Delete />}
              heading={labels.EditTemplatePopup.Delete_CloudSheet}
              onPress={props.onDeleteCloudSheet}
            />
          </View>
        </View>
        <View style={{marginBottom: height * 0.3}}></View>
      </ScrollView>
    </View>
  );
};

export default TemplateEditPopup;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  creatcloudview: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  createcloudtext: {
    fontFamily: FONTS.manrope_semibold,
    fontSize: 20,
    color: COLOURS.black,
  },
  space: {
    flex: 1,
  },
  modifytext: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    color: COLOURS.black,
    opacity: 0.6,
    paddingTop: 10,
  },
  cardspace: {
    marginTop: 25,
  },
  commoncardview: {
    marginTop: 30,
  },
  bottomheight:{
    
  }
});
