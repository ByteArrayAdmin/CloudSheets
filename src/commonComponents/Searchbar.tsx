import React from 'react';
import {View, Image, TextInput, StyleSheet, Text} from 'react-native';
import {Controller} from 'react-hook-form';
import {FONTS} from '../utils/Constant';
import Searchicon from '../assets/Images/searchicon.svg';

const SearcBar = (props: any) => {
  return (
    <View style={style.viewWidth}>
      <View style={style.searchstyle}>
        <Searchicon />
      </View>
      <View style={{width: '80%'}}>
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
  );
};

export default SearcBar;

const style = StyleSheet.create({
  viewWidth: {
    // borderWidth: 1,
    flexDirection: 'row',
    //justifyContent:'center',
    alignItems: 'center',
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
});
