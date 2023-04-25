import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import NewCommonHeader from "../../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../../commonComponents/Backbutton";
import { useNavigation } from "@react-navigation/native";
import labels from '../../../../../utils/ProjectLabels.json';
import CommonLayout from '../CommonLayout';
import { COLOURS, FONTS } from '../../../../../utils/Constant';
import Ic_customer from '../../../../../assets/Images/Ic_customer.svg';
import Ic_messenger from '../../../../../assets/Images/Ic_messenger.svg';
import Ic_sendMail from '../../../../../assets/Images/Ic_sendMail.svg';
import Ic_rightArrow from '../../../../../assets/Images/Ic_rightArrow.svg';
const Customer_Support_Screen = () => {
    const navigation = useNavigation()
    return (
        <>
            <View style={{ backgroundColor: COLOURS.lightBlue, flex: 1 }}>
                <NewCommonHeader
                    BackButton={<BackButton onPress={() => navigation.goBack()} />}
                    heading={labels.SubscriptionScreen.Customer_Support}
                    Folder={<Ic_customer />}
                    SecondImg={<Ic_messenger />}
                />
                <ScrollView>
                    <CommonLayout
                        Heading={labels.SubscriptionScreen.Support}
                        Content={labels.SubscriptionScreen.Support_Content}
                    />
                    <View style={{ marginTop: 20, marginHorizontal: 15 }}>
                        <Text style={styles.sendTextStyle}>{labels.SubscriptionScreen.Send_Email}</Text>
                    </View>
                    <TouchableOpacity style={styles.ButtonStyle}
                        onPress={() => navigation.navigate("Customer_Support_Form")}
                    >
                        <Ic_sendMail />
                        <View style={{ marginLeft: 11 }}>
                            <Text style={styles.supportedMailText}>{labels.SubscriptionScreen.Supported_Mail}</Text>
                        </View>
                        <View style={{ flex: 1 }}></View>
                        <Ic_rightArrow />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    )
}

export default Customer_Support_Screen;

const styles = StyleSheet.create({
    ButtonStyle: {
        marginTop: 13,
        marginHorizontal: 15,
        height: 50,
        backgroundColor: COLOURS.Skyblue,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 20
    },
    sendTextStyle: {
        fontFamily: FONTS.inter_semibold,
        fontSize: 14
    },
    supportedMailText: {
        fontFamily: FONTS.inter_regular,
        fontSize: 12,
        color: COLOURS.white
    }
})