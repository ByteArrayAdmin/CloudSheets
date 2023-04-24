import React from 'react';
import {View, Image, TextInput, StyleSheet, Text} from 'react-native';
import {Controller} from 'react-hook-form';
import {COLOURS, FONTS} from '../utils/Constant';
import Searchicon from '../assets/Images/searchicon.svg';
import { styles } from '../screens/Auth/signup/style';

const SearcBar = (props: any) => {
  return (
    <View style={style.mainview}>
    <View style={style.viewWidth}>
      <View style={style.searchstyle}>
        <Searchicon />
      </View>
      <View style={style.viewwidth}>
        <TextInput
          // value={value}
          //onChangeText={onChange}
          //onBlur={onBlur}
          placeholder={props.placeholder}
          style={style.inputView}
          //secureTextEntry={props.secureTextEntry}
          // placeholderTextColor="#001521"
          //keyboardType={props.keyboardType}
        />
      </View>
    </View>
    </View>
  );
};

export default SearcBar;

const style = StyleSheet.create({
  viewWidth: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:COLOURS.white,
    borderRadius:8

  },

  inputView: {
    height: 50,
    width: '100%',

    fontFamily: FONTS.inter_regular,
  },
  searchstyle: {
    marginLeft: 19,
    marginRight: 16,
  },
  mainview:{
    justifyContent:'center', alignItems:'center'
  },
  viewwidth:{
    width: '83%'
  }

});
