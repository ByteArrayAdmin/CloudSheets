import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Signupconstant} from '../../src/utils/Constant';
import {styles} from '../screens/signup/style';
import Googleicon from '../assets/Images/Googlricon.svg';
import Appleicon from '../assets/Images/Apple.svg';
import MainLogo from 'src/assets/Images/Group.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Authbackgroundlayout = (props: any) => {
  const [footerview, setfooterview] = useState(true);
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.skipText}>
            <Text style={styles.skioptextcolor}>{Signupconstant.SKIP}</Text>
          </View>
          <View style={styles.createAccountview}>
            <View>
              <MainLogo />
            </View>
            <View style={styles.createView}>
              <Text style={styles.CreateAccounttext}>
                {props.Heading} <Text>{props.Cloudesheets}</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.registerdText}>{props.subheading}</Text>
            </View>
          </View>
          {props.childern}
          
        <View>
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
            <View style={styles.BottomGap}></View>
          </View> 
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Authbackgroundlayout;
