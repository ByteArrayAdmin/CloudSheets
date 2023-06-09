import React,{useEffect} from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import NewCommonHeader from "../../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../../commonComponents/Backbutton";
import { useNavigation } from "@react-navigation/native";
import labels from '../../../../../utils/ProjectLabels.json';
import CommonLayout from '../CommonLayout';
import {COLOURS} from '../../../../../utils/Constant';
import Ic_help from '../../../../../assets/Images/Ic_help.svg';
import { track_Screen } from '../../../../../eventTracking/index';
import {eventName,screenName} from '../../../../../utils/Constant';
const Help_Screen = () => {
    const navigation = useNavigation()

    useEffect(()=>{
        track_Screen(eventName.TRACK_SCREEN,screenName.HELP_SCREEN)
    }, [])

    return (
        <>
            <View style={styles.container}>
                <NewCommonHeader
                    BackButton={<BackButton onPress={() => navigation.goBack()} />}
                    heading={labels.SubscriptionScreen.Help}
                    Folder={<Ic_help />}
                />
                <ScrollView>
                    <CommonLayout
                        Heading={labels.SubscriptionScreen.Help}
                        Content={labels.SubscriptionScreen.Help_Content}
                    />
                </ScrollView>
            </View>
        </>
    )
}

export default Help_Screen;

const styles = StyleSheet.create({
    container:{
        backgroundColor: COLOURS.lightBlue, flex: 1
    }
})