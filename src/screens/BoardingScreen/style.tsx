import {StyleSheet} from 'react-native';
import {FONTS} from '../../utils/Constant';

export const Homestyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0061FF',
  },
  mainview: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clousheetstext: {
    color: '#FFFFFF',
    fontFamily: FONTS.manrope_bold,
    fontSize: 30,
  },
  sheetstext: {
    color: '#FFFFFF',
    fontFamily: FONTS.manrope_medium,
    fontSize: 30,
  },
  welcometotext: {
    marginTop: 30,
    color: '#001521',
    fontSize: 20,
    fontFamily: FONTS.MANROPE_NORMAL,
  },
  cloudtext: {
    color: '#001521',
    fontSize: 20,
    fontFamily: FONTS.manrope_bold,
  },
  cardText: {
    color: '#001521',
    fontSize: 14,
    fontFamily: FONTS.inter_medium,
    opacity: 0.6,
    textAlign: 'center',
  },
  cardview: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardtextview: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 48,
    paddingBottom: 77,
  },
  Arrowbutton: {
    position: 'absolute',
    bottom: -70,
    borderColor: '#0061FF',
  },
  cutcardview:{
    marginTop:160
  }
});
