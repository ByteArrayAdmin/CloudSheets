/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Threedots from '../../../assets/Images/threedots.svg';
import Docicon from '../../../assets/Images/januaryAttendicon.svg';
import {FONTS} from '../../../utils/Constant';
import Smallfolder from '../../../assets/Images/smallfoldericon.svg';

const Cloudsheetcard = () => (
  <View style={Cardstyle.cardconatiner}>
    <View style={Cardstyle.subconatainer}>
      <View>
        <Docicon />
      </View>

      <View>
        <Text style={Cardstyle.jantext}>January Attendance</Text>
        <Text style={Cardstyle.datetext}>Jan 16, 2023 | 12:45 PM</Text>
      </View>
      <View style={Cardstyle.threedotview} />
      <View style={Cardstyle.threedotview}>
        <Threedots />
      </View>
    </View>
    <View style={Cardstyle.Horizontalline}>
      <View style={Cardstyle.emptyview} />
    </View>
    <View style={Cardstyle.lastview}>
      <View>
        <Smallfolder />
      </View>
      <View style={Cardstyle.lastview}>
        <Text style={Cardstyle.Text}>Monthly Expenses (3)</Text>
      </View>
    </View>
  </View>
);

export default Cloudsheetcard;

const Cardstyle = StyleSheet.create({
  cardconatiner: {
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: '#FFFFFF',
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
    color: '#001521',
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
    color: '#001521',
    opacity: 0.5,
  },
  threedotview:{
    flex: 1
  },
  threedotsubview:{
    marginBottom: 22
  },
  emptyview:{
    borderBottomWidth: 0.2
  },
  lastview:{paddingLeft: 6}
});
