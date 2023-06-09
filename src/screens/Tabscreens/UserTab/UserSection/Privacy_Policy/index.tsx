import React,{useEffect} from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import NewCommonHeader from "../../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../../commonComponents/Backbutton";
import { useNavigation } from "@react-navigation/native";
import Ic_privicy from '../../../../../assets/Images/Ic_privicy.svg';
import labels from '../../../../../utils/ProjectLabels.json';
import CommonLayout from '../CommonLayout';
import {COLOURS} from '../../../../../utils/Constant';
import { track_Screen } from '../../../../../eventTracking/index';
import {eventName,screenName} from '../../../../../utils/Constant';
const PrivacyScreen = () => {
    const navigation = useNavigation()

    useEffect(()=>{
        track_Screen(eventName.TRACK_SCREEN,screenName.PRIVACY_POLICY_SCREEN)
    }, [])

    return (
        <>
            <View style={styles.container}>
                <NewCommonHeader
                    BackButton={<BackButton onPress={() => navigation.goBack()} />}
                    heading={labels.SubscriptionScreen.Privacy_Policy}
                    Folder={<Ic_privicy />}
                />
                <ScrollView>
                    <CommonLayout
                        Heading={labels.SubscriptionScreen.Our_Privacy_Policy}
                        Content={labels.SubscriptionScreen.Privacy_Content}
                    />
                </ScrollView>
            </View>
        </>
    )
}

export default PrivacyScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor: COLOURS.lightBlue, flex: 1
    }
})