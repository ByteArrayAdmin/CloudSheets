import React,{useEffect} from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLOURS, FONTS } from '../../../utils/Constant';
import labels from '../../../utils/ProjectLabels.json'
import Folder from '../../../assets/Images/NewFolder.svg'
import Edit from '../../../assets/Images/Edit.svg'
import Infoicon from '../../../assets/Images/infocircle.svg'
import { track_Screen } from '../../../eventTracking/index';
import { screenName, eventName } from '../../../utils/Constant';
const CreatecloudsheetPopup = (props: any) => {

  useEffect(()=>{
    track_Screen(eventName.TRACK_SCREEN, screenName.SELECT_CREATE_SPREADSHEET_OPTION_MODAL)
  }, [])

  return (
    <View style={Tempatestyle.container}>
      <View style={Tempatestyle.creatcloudview}>
        <View>
          <Text style={Tempatestyle.createcloudtext}>
            {labels.CreateClousheetPopup.CreateCloudsheet}
          </Text>
        </View>
        <View style={Tempatestyle.space} />
        <View>
          <Infoicon />
        </View>
      </View>

      <View style={Tempatestyle.seletetmplatetext}>
        <Text>{labels.CreateClousheetPopup.SELECTTEMPLATE}</Text>
      </View>

      <TouchableOpacity style={Tempatestyle.editfolderview}
      onPress={props.inNewTemplate}
      >
        <View>
          <Folder />
        </View>
        <View>
          <Text style={Tempatestyle.newtemplatetext}>
            {labels.CreateClousheetPopup.InNewTemplate}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={Tempatestyle.folderview}
      onPress={props.inExistingTemplate}
      >
        <View>
          <Edit />
        </View>
        <View>
          <Text style={Tempatestyle.newtemplatetext}>
            {labels.CreateClousheetPopup.InExistingTemplate}
          </Text>
        </View>
      </TouchableOpacity>
    </View>

  )
}

export default CreatecloudsheetPopup

const Tempatestyle = StyleSheet.create({
  container: {
    marginHorizontal: 30
  },
  bottomsheetview: {
    backgroundColor: COLOURS.white,
    width: '100%',
    height: 268,
    borderRadius: 25,
  },
  creatcloudview: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  createcloudtext: {
    fontFamily: FONTS.manrope_semibold,
    fontSize: 20,
    color: COLOURS.black,
  },
  seletetmplatetext: {
    paddingTop: 5,
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color: COLOURS.black,
  },
  folderview: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  editfolderview: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  newtemplatetext: {
    fontFamily: FONTS.inter_regular,
    fontSize: 15,
    color: COLOURS.black,
    paddingLeft: 15
  },
  existingtemplate: {
    fontFamily: FONTS.inter_regular,
    fontSize: 15,
    color: COLOURS.black
  },
  space: {
    flex: 1
  },
  exitingtemplateview: {
    paddingLeft: 15
  }


})
