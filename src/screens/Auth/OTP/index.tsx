import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import BackgroundLayout from '../../../commonComponents/Backgroundlayout/BackgroundLayout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Mediumlogo from "../../../assets/Images/Mediumlogo.svg";
import labels from '../../../utils/ProjectLabels.json';
import { COLOURS, FONTS } from '../../../utils/Constant';
import AuthCard from '../../../commonComponents/AuthCard';
import InputField from '../../../commonComponents/InputField';
import { useForm } from 'react-hook-form';
import Button from '../../../commonComponents/Button';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Auth } from 'aws-amplify';
import { confirm_Signup, resend_OTP } from '../../../API_Manager/index';
const OtpScreen = () => {

    const { control, handleSubmit, watch } = useForm();
    const route = useRoute();
    const navigation = useNavigation()
    const [userName, setUserName] = useState(route.params.username)
    const [count, setCount] = useState(0)
    const [disable, setDisable] = useState(false)

    const verificaton = async (data: any) => {
        const { otp } = data
        console.log("OTPData========", data, userName)
        confirm_Signup(userName, otp).then((response) => {
            console.log("OTPResp=========", response)
            Alert.alert(labels.OTP_Constants.Confirmed);
            navigation.navigate("Login")
        }).catch((e) => {
            console.log("OTPErr=======", e)
            Alert.alert(e?.message);
        })
    }

    useEffect(() => {
        setTimeout(() => {
            if (count != 0) {
                setCount(count - 1)
            } else {
                setCount(0)
                setDisable(false)
            }
        }, 1000);
    }, [count])

    const resendOtpFunc = async () => {
        setDisable(true)
        setCount(labels.OTP_Constants.Sixty_Sec)
        resend_OTP(userName).then((response)=>{
            console.log("resendResp=========", response)
            Alert.alert(labels.OTP_Constants.ResendOTPSuccess)
        }).catch((err)=>{
            console.log('error resending code: ', err);
            Alert.alert(err?.message);
        })
    }

    return (
        <>
            <BackgroundLayout />
            <SafeAreaView style={styles.safeareastyle}>
                <View style={styles.imageView}>
                    <Mediumlogo />
                    <View style={styles.textViewStyle}>
                        <Text style={styles.CreateAccounttext}>{labels.OTP_Constants.EnterOtp}</Text>
                    </View>
                </View>
                <KeyboardAwareScrollView>
                    <AuthCard
                        subchildren={
                            <>
                                <InputField
                                    name="otp"
                                    control={control}
                                    placeholder={labels.OTP_Constants.EnterOtp}
                                    // Image={Progfileicon}
                                    rules={{
                                        required: labels.OTP_Constants.OTP_Validation,
                                    }}
                                    placxeholdertextstyle={styles.placeholdertextstyle}
                                    styles={styles.inputview}
                                />
                                <TouchableOpacity disabled={disable} style={styles.resendBtnView}
                                    onPress={() => !disable ? resendOtpFunc() : {}}
                                >
                                    <Text style={!disable ? styles.disableText : styles.enableText}>{labels.OTP_Constants.ResendOTP} {count != 0 ? count : null}</Text>

                                </TouchableOpacity>
                                <Button Register={labels.OTP_Constants.VerifyOTP} onPress={handleSubmit(verificaton)} />
                            </>
                        }
                    />
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </>
    )
}

export default OtpScreen;

const styles = StyleSheet.create({
    safeareastyle: {
        flex: 1
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    CreateAccounttext: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: FONTS.manrope_bold,
    },
    textViewStyle: {
        marginTop: 20
    },
    inputview: {
        height: 50,
        width: '100%',
        fontFamily: FONTS.inter_regular,
    },
    placeholdertextstyle: {
        fontSize: 12,
        fontFamily: FONTS.inter_regular,
    },
    resendBtnView: {
        flexDirection: 'row',
        height: 40,
        width: "40%",
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
        right: 20
    },
    disableText: {
        fontFamily: FONTS.inter_regular,
        fontSize: 12,
        color: COLOURS.Skyblue
    },
    enableText: {
        fontFamily: FONTS.inter_regular,
        fontSize: 12,
        color: COLOURS.red
    }
})

