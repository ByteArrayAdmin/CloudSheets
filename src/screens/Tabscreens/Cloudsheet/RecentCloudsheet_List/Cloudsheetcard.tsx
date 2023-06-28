/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Threedots from '../../../../assets/Images/threedots.svg';
import Docicon from '../../../../assets/Images/januaryAttendicon.svg';
import { COLOURS, FONTS } from '../../../../utils/Constant';
import Smallfolder from '../../../../assets/Images/smallfoldericon.svg';
import IC_purpleDoc from '../../../../assets/Images/IC_purpleDoc.svg';
import Ic_redDoc from '../../../../assets/Images/Ic_redDoc.svg';
import moment from 'moment';
import { spreadSheetRow_Count } from '../../../../API_Manager/index';

const Cloudsheetcard = (props: any) => {
  const [count, setCount] = useState()

  const getCounts = (rowId:any)=>{
  
    spreadSheetRow_Count(rowId).then((response: any)=>{
      console.log('RowCounts======',response)
      setCount(response.data.spreadSheetRowsBySpreadsheetID.items.length.toString())
      // console.log("count========",rowCount)
    }).catch((error)=>{
      console.log("errorCount======",error)
    })
    // console.log("rowcount outer=====>",rowCount )
    return count
  }

  return (
    <View style={Cardstyle.cardconatiner}>
      <View style={Cardstyle.subconatainer}>
        <View>
          {props.index % 2 ?
            <Docicon /> : props.index % 3 ?
              <IC_purpleDoc /> : <Ic_redDoc />
          }
        </View>
        <View>
          <Text style={Cardstyle.jantext}>{props?.item?.spreadsheet_name}</Text>
          <Text style={Cardstyle.datetext}>{moment(props?.item?.createdAt,["HH:mm"]).format("MMM DD, YYYY | hh:mm:a")}</Text>
        </View>
        <View style={Cardstyle.threedotview} />
        <TouchableOpacity style={Cardstyle.threedotstyling}
          onPress={props.onClickThreeDot}
        >
          <Threedots />
        </TouchableOpacity>
      </View>
      <View style={Cardstyle.Horizontalline}>
        <View style={Cardstyle.emptyview} />
      </View>
      <View style={Cardstyle.lastView}>
        <View style={Cardstyle.foldespace}>
          <Smallfolder />
        </View>
        <View>
          <Text style={Cardstyle.Text}>{props?.item?.Templates?.template_name} {`(${getCounts(props?.item?.id)})`}</Text>
        </View>
      </View>
    </View>
  )
};

export default Cloudsheetcard;

const Cardstyle = StyleSheet.create({
  cardconatiner: {
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: COLOURS.white,
    height: 126,
    borderRadius: 10,
  },
  subconatainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 15,
    alignItems: 'center',
  },
  jantext: {
    paddingLeft: 15,
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
  },
  datetext: {
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 12,
    fontFamily: FONTS.MANROPE_NORMAL,
  },
  Horizontalline: {
    marginHorizontal: 15,
    marginTop: 20,
    opacity: 0.5,
  },
  lastview: {
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Text: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    color: COLOURS.black,
    opacity: 0.5,
  },
  threedotview: {
    flex: 1
  },
  threedotsubview: {
    marginBottom: 22
  },
  emptyview: {
    borderBottomWidth: 0.2
  },

  lastView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 15
  },
  foldespace: { paddingRight: 6 },
  threedotstyling: {
    position: 'absolute',
    right: 30,
    top: 26,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
