import {StyleSheet} from 'react-native';
import {FONTS} from '../../../utils/Constant';

export const welcomscreenstyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  cloudtext: {
    fontFamily: FONTS.manrope_bold,
    fontSize: 19,
    color: '#FFFFFF',
  },
  logoview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 94,
  },
  sheettext: {
    fontFamily: FONTS.MANROPE_NORMAL,
    fontSize: 19,
    color: '#FFFFFF',
  },
  welcometotext: {
    fontFamily: FONTS.MANROPE_NORMAL,
    fontSize: 20,
    color: '#001521',
  },
  cloudsheettext: {
    fontFamily: FONTS.manrope_semibold,
    fontSize: 20,
    color: '#001521',
  },
  cardtext: {
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color: '#001521',
    textAlign: 'center',
    opacity: 0.6,
  },
  welcomtextview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  bottomNavigationView: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 282,
    borderRadius: 25,
  },
  subconatiner: {
    alignItems: 'center',
  },
  Textguest: {
    paddingTop: 15,
    fontFamily: FONTS.manrope_bold,
    fontSize: 20,
    color: '#001521',
  },
  regitercontinuetext: {
    paddingTop: 5,
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color: '#001521',
  },
});
