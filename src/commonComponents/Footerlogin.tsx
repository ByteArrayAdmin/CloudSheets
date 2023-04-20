import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {styles} from '../screens/Auth/signup/style';
import Googleicon from '../assets/Images/Googlricon.svg';
import Appleicon from '../assets/Images/Apple.svg';
import {Signupconstant} from '../../src/utils/Constant';

const FooterLogin = (props: any) => {
  return (
    <>
      <View style={{position: 'absolute', bottom: 0}}>
        <View style={styles.ORviewstyle}>
          <View style={styles.Horizontalline} />
          <View style={{paddingHorizontal: 15}}>
            <Text style={styles.ortextstyle}>{Signupconstant.OR}</Text>
          </View>
          <View style={styles.Horizontalline}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginHorizontal: 20,
          }}>
          <View style={styles.googleapplebutton}>
            <Googleicon />
          </View>
          <View style={{flex: 1}}></View>
          <View style={styles.googleapplebutton}>
            <Appleicon />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 60,
            justifyContent: 'center',
          }}>
          <View>
            <Text style={styles.alreadyamember}>{props.Bottomtext}</Text>
          </View>
          <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.sigintext}>{props.signin}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default FooterLogin;
