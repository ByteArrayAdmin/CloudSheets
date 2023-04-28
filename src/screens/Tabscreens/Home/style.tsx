import {StyleSheet} from 'react-native';
import {FONTS, COLOURS} from '../../../utils/Constant';

export const welcomscreenstyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  cloudtext: {
    fontFamily: FONTS.manrope_bold,
    fontSize: 19,
    color: COLOURS.white,
  },
  logoview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 94,
  },
  sheettext: {
    fontFamily: FONTS.MANROPE_NORMAL,
    fontSize: 19,
    color: COLOURS.white,
  },
  welcometotext: {
    fontFamily: FONTS.MANROPE_NORMAL,
    fontSize: 20,
    color: COLOURS.black,
  },
  cloudsheettext: {
    fontFamily: FONTS.manrope_semibold,
    fontSize: 20,
    color: COLOURS.black,
  },
  cardtext: {
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color: COLOURS.black,
    textAlign: 'center',
    opacity: 0.6,
    padding:5
  },
  welcomtextview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  bottomNavigationView: {
    backgroundColor: COLOURS.white,
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
    color: COLOURS.black,
  },
  regitercontinuetext: {
    paddingTop: 5,
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color: COLOURS.black,
  },
  cardspace:{
   marginTop: 50 
  },
  subcard:{
    alignItems: "center", justifyContent: "center" 
  },
  textview:{
  marginTop: 30 
  },
  secondcardtext:{
  marginTop: 15 
  }
});


export const styles = StyleSheet.create({



})