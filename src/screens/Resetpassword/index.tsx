/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import InputField from '../../commonComponents/InputField';
import {Resetpassword} from '../../utils/Constant';
import Mediumlogo from '../../assets/Images/Mediumlogo.svg';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import CommonButton from '../../commonComponents/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackButton from '../../commonComponents/Backbutton';
import AuthCard from '../../commonComponents/AuthCard';
import {resetscreenstyle} from './style';
import Lock from '../../assets/Images/Lock.svg';
import BackgroundLayout from '../../commonComponents/Backgroundlayout/BackgroundLayout';
import Resetpasswordlabel from '../../utils/ProjectLabels.json';
const ResetPassword = () => {
  const {control, handleSubmit, getValues} = useForm();
  const navigation = useNavigation();

  const onSubmit = async (data: any) => {
    const {newpassword, confirmpassword} = data;
    console.log(
      'my useform hook resettt@@@@@@@@',
      newpassword,
      confirmpassword,
    );
  };
  return (
    <>
      <BackgroundLayout />
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView>
          <View style={resetscreenstyle.container}>
            <View style={resetscreenstyle.backbuttonview}>
              <BackButton />
            </View>
            <View style={resetscreenstyle.resetpasswordview}>
              <View style={{marginTop: 40}}>
                <Mediumlogo />
              </View>
              <View style={{marginTop: 30}}>
                <Text style={resetscreenstyle.resettextheading}>
                  {Resetpasswordlabel.Resetpassword.RESETPASSWORD}
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={resetscreenstyle.resetsubheadingtextstyle}>
                  {Resetpasswordlabel.Resetpassword.ENTTERNEWPASSWAORD}
                </Text>
              </View>
            </View>
            <View>
              <AuthCard
                subchildren={
                  <>
                    <InputField
                      name="newpassword"
                      control={control}
                      placeholder={
                        Resetpasswordlabel.Resetpassword.PLACEHOLDER_NewPassword
                      }
                      Image={Lock}
                      // placxeholdertextstyle={styles.placeholdertextstyle}
                      rules={{
                        required:
                          Resetpasswordlabel.Resetpassword.VALIDATION_REQUIRED,
                      }}
                    />
                    <InputField
                      name="confirmpassword"
                      control={control}
                      placeholder={
                        Resetpasswordlabel.Resetpassword
                          .PLACEHOLDER_Confirm_Password
                      }
                      Image={Lock}
                      // placxeholdertextstyle={styles.placeholdertextstyle}
                      rules={{
                        required:
                          Resetpasswordlabel.Resetpassword
                            .VALIDATION_REQUIRED_CONFIRM,
                        validate: (value: any) =>
                          value === getValues().newpassword ||
                          'Passwords do not match',
                      }}
                    />

                    <CommonButton
                      onPress={handleSubmit(onSubmit)}
                      Register={Resetpassword.SAVENEWPASSWORD}
                    />
                  </>
                }
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default ResetPassword;
