import React, {useState} from 'react';
import {View, StyleSheet, ScrollView,KeyboardAvoidingView} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const BottomsheetLayout = (props: any) => {
  return (
    
      <BottomSheet
        visible={props.visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={props.onBackButtonPress}
        //Toggling the visibility state
        onBackdropPress={props.onBackdropPress}
        //Toggling the visibility state
      >
        <View style={props.styless}>
          <View style={styles.notchmainview}>
            <View style={styles.notchsubview} />
          </View>
          {props.children}
        </View>
      </BottomSheet>
    
      
  );
};

export default BottomsheetLayout;

const styles = StyleSheet.create({
  bottomsheetview: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    //height: 268,
    borderRadius: 25,
  },
  notchmainview: {
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notchsubview: {
    borderWidth: 2,
    marginTop: 0.1,
    width: 59,
    borderRadius: 4,
    borderColor: '#001521',
    opacity: 0.1,
  },
});
