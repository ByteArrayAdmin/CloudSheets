import {StyleSheet} from 'react-native';
import {FONTS} from '../../utils/Constant';

export const Forgotscreenstyle = StyleSheet.create({
  Forgotscreenstyle: {
    backgroundColor: '#0061FF',
    height: '50%',
  },
  backbuttonview: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  forgerpasswardtextheading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: FONTS.manrope_bold,
  },
  subheadingtextstyle: {
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color: '#FFFFFF',
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
});
