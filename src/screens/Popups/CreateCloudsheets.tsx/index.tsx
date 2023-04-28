import React from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLOURS, FONTS } from '../../../utils/Constant';
import labels from '../../../utils/ProjectLabels.json'
import Folder from '../../../assets/Images/NewFolder.svg'
import Edit from '../../../assets/Images/Edit.svg'
import Infoicon from '../../../assets/Images/infocircle.svg'

const CreatecloudsheetPopup = () => {
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

<View style={Tempatestyle.editfolderview}>
  <View>
    <Folder />
  </View>
  <View>
    <Text style={Tempatestyle.newtemplatetext}>
      {labels.CreateClousheetPopup.InNewTemplate}
    </Text>
  </View>
</View>
<View style={Tempatestyle.folderview}>
  <View>
    <Edit />
  </View>
  <View>
    <Text style={Tempatestyle.newtemplatetext}>
      {labels.CreateClousheetPopup.InExistingTemplate}
    </Text>
  </View>
</View>
</View>

  )
}

export default CreatecloudsheetPopup

const Tempatestyle = StyleSheet.create({
    container:{
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
        paddingLeft:15
      },
      existingtemplate: {
        fontFamily: FONTS.inter_regular,
        fontSize: 15,
        color: COLOURS.black
      },
      space:{
        flex:1
      },
      exitingtemplateview:{
        paddingLeft: 15
      }
    

})
