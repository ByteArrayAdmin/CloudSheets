import {StyleSheet} from 'react-native';
import {FONTS} from '../../../utils/Constant';

export const resetscreenstyle = StyleSheet.create({
  safeareaview:
  {
flex:1
  },
  backbuttonview: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  resetpasswordview: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resettextheading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: FONTS.manrope_bold,
  },
  resetsubheadingtextstyle: {
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  logoview:{
    marginTop: 40
  },
  inputview: {
    height: 50,
    width: '100%',
    fontFamily: FONTS.inter_regular,
  },

});
