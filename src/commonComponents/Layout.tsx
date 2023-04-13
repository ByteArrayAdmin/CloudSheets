import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Logo from '../assets/Images/Logo.svg';
import {styles} from '../screens/signup/style';
import {Signupconstant} from '../../src/utils/Constant';

const Layout = (props: any) => {
  return (
    <SafeAreaView style={{flex: 1}}>
        
      <View
        style={{
          // Try setting `flexDirection` to `"row"`.
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View style={{flex: 1, backgroundColor: '#0061FF'}} />
        <View style={{flex: 1, backgroundColor: 'white'}} />
        <View style={styles.skipText}>
          <Text style={styles.skioptextcolor}>{Signupconstant.SKIP}</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{marginTop: 100}}>
            <Logo />
          </View>
        </View>
        <View style={styles.createAccountview}>
          <View style={styles.createView}>
            <Text style={styles.CreateAccounttext}>{props.Heading}</Text>
          </View>
          <View style={styles.registerdText}>
            <Text style={styles.registertext}>{props.subheading}</Text>
          </View>
        </View>
        {props.childern}
        {props.footer}
      </View>
    </SafeAreaView>
  );
};

export default Layout;

const style = StyleSheet.create({});
