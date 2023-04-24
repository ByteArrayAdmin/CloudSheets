import {StyleSheet} from 'react-native';
import {FONTS} from '../../../utils/Constant';

export const loginstyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0061FF',
    height: '40%',
  },
  registerdText: {
    color: 'white',
    opacity: 0.8,
    paddingTop: 10,
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#0061FF',
    marginHorizontal: 20,
    height: 48,
    borderRadius: 8,
    marginBottom: 50,
  },
  skipText: {
    marginTop: 40,
    alignItems: 'flex-end',
    marginHorizontal: 10,
  },
  skioptextcolor: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  CreateAccounttext: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: FONTS.manrope_bold,
  },
  registertext: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  createAccountview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  createView: {
    marginTop: 30,
  },
  BottomGap: {
    marginBottom: 20,
  },
  placeholdertextstyle: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
  },
  ORviewstyle: {
    flexDirection: 'row',
    marginHorizontal: 80,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Horizontalline: {
    width: 80,
    height: 0.5,
    backgroundColor: '#5D6886',
  },
  ortextstyle: {
    color: '#5D6886',
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
  },
  googleapplebutton: {
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 67,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    backgroundColor: 'white',
  },
  alreadyamember: {
    fontFamily: FONTS.inter_regular,
    fontSize: 13,
    color: '#16213E',
  },
  sigintext: {
    fontFamily: FONTS.inter_semibold,
    color: '#0061FF',
    fontSize: 13,
    paddingLeft: 8,
  },

  fogettext: {
    color: '#0061FF',
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
  },
  fogetpasswaordview: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastview:{
    flexDirection: 'row',
    marginTop: 60,
    justifyContent: 'center',
  },
  inputview: {
    height: 50,
    width: '100%',
    fontFamily: FONTS.inter_regular,
  },
});