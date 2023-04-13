import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';


const AuthCard = (props:any)=>{
    return(
<View style={cardstyle.Inputfieldview}>
{props.subchildren}
</View>
    )
}
export default AuthCard;

const cardstyle = StyleSheet.create({
Inputfieldview: {
    marginHorizontal: 15,
    backgroundColor: '#FFFFFF',
     marginTop: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  }
})

