import {StyleSheet} from 'react-native';
import {FONTS} from '../../../../utils/Constant';

import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height - 640;

export const styles = StyleSheet.create({
  backgroundlayout: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  secondview: {flex: 1, backgroundColor: '#0061FF'},
  thirdview: {
    flex: 3,
    backgroundColor: '#F6F8FA',
  },
  cloudsheetcontainer: {
    flexDirection: 'row',
    marginTop: 77,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  cloudtextcontainer: {
    flexDirection: 'row',
    paddingLeft: 12,
  },
  cloudtext: {
    fontFamily: FONTS.manrope_semibold,
    fontSize: 18,
    color: '#FFFFFF',
  },
  sheettext: {
    fontFamily: FONTS.MANROPE_NORMAL,
    fontSize: 18,
    color: '#FFFFFF',
  },
  upgradeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 38,
  },
  upgradetext: {
    paddingLeft: 11,
    fontSize: 13,
    fontFamily: FONTS.inter_medium,
    color: '#FFFFFF',
  },
  inputserachview: {
    backgroundColor: '#FFFFFF',
    // position:'absolute',
    marginHorizontal: 20,
    width: '94%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    height: 52,
    alignItems: 'center',
    marginTop: windowHeight * 0.35,
  },
  recentcloudview: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentcloudtext: {
    fontFamily: FONTS.inter_medium,
    fontSize: 15,
    color: '#001521',
  },
  viewalltext: {
    fontFamily: FONTS.inter_medium,
    fontSize: 13,
    color: '#0061FF',
  },
  AttendanceText: {
    paddingLeft: 15,
  },
  widgetstyle: {
    position: 'absolute',
    bottom: 80,
    right: 15,
  },
  upgradeconatinerstyle:{
    flex:1
  },
  lastview:{
    flex:1
  },
  flatlistview:{
flex:1
  }
});
