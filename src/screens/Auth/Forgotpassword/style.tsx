import {StyleSheet} from 'react-native';
import {FONTS, COLOURS} from '../../../utils/Constant';

export const Forgotscreenstyle = StyleSheet.create({
  safeareaview:{
flex:1
  },
  Forgotscreenstyle: {
    backgroundColor: COLOURS.Skyblue,
    height: '50%',
  },
  backbuttonview: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  forgerpasswardtextheading: {
    color: COLOURS.white,
    fontSize: 20,
    fontFamily: FONTS.manrope_bold,
  },
  subheadingtextstyle: {
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color: COLOURS.white,
    opacity: 0.8,
  },
  backtologinview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bactologintext: {
    color: '#2455F1',
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
  },
  forgetpassswordview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotview:{
    marginTop: 40
  },
  forgetsyleview:{
    marginTop: 30
  },
  lastview:{
    marginTop:10
  },
  inputview: {
    height: 50,
    width: '100%',
    fontFamily: FONTS.inter_regular,
  },
  
  
});
