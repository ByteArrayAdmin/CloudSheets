import React, {useState} from 'react';
import InputField from '../../commonComponents/InputField';
import {emailRegex} from '../../utils/Constant';
import Mediumlogo from '../../assets/Images/Mediumlogo.svg'

import {Forgotscreenstyle} from './style';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import CommonButton from '../../commonComponents/Button';
import Mesageicon from 'src/assets/Images/Message.svg';
import BackButton from '../../commonComponents/Backbutton';
import AuthCard from '../../commonComponents/AuthCard';
import BackgroundLayout from '../../commonComponents/Backgroundlayout/BackgroundLayout';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Forgotlabel from '../../utils/ProjectLabels.json'

const ForgotPassword = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  const onSubmit = async (data: any) => {
    const {forgetemail} = data;
  };
  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={Forgotscreenstyle.safeareaview}>
        <KeyboardAwareScrollView>
          <View style={Forgotscreenstyle.backbuttonview}>
            <BackButton onpress={() => navigation.navigate('Login')} />
          </View>

          <View style={Forgotscreenstyle.forgetpassswordview}>
            <View style={Forgotscreenstyle.forgotview}>
              <Mediumlogo />
            </View>
            <View style={Forgotscreenstyle.forgetsyleview}>
              <Text style={Forgotscreenstyle.forgerpasswardtextheading}>
                {Forgotlabel.Forgotpassword.FORGOTPASSWORD}
              </Text>
            </View>
            <View style={Forgotscreenstyle.lastview}>
              <Text style={Forgotscreenstyle.subheadingtextstyle}>
                {Forgotlabel.Forgotpassword.FOGETPASSWORDSUBHEADING}
              </Text>
            </View>
          </View>
          <View>
            <AuthCard
              subchildren={
                <>
                  <InputField
                    name="forgetemail"
                    control={control}
                    placeholder={Forgotlabel.Forgotpassword.PLACEHOLDERTEXT}
                    Image={Mesageicon}
                    rules={{
                      required: Forgotlabel.Forgotpassword.EMAILREQUIRED,
                      pattern: {value: emailRegex, message: 'Email is invalid'},
                    
                    }}
                    styles={Forgotscreenstyle.inputview}
                  />

                  <CommonButton
                    onPress={handleSubmit(onSubmit)}
                    Register={Forgotlabel.Forgotpassword.SUBMIT}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={Forgotscreenstyle.backtologinview}>
                    <Text style={Forgotscreenstyle.bactologintext}>
                      {Forgotlabel.Forgotpassword.BACKTOLOGIN}
                    </Text>
                  </TouchableOpacity>
                </>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};
export default ForgotPassword;
