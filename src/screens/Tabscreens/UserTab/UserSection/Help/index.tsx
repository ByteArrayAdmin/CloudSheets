import React from 'react';
import { View, ScrollView } from 'react-native';
import NewCommonHeader from "../../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../../commonComponents/Backbutton";
import { useNavigation } from "@react-navigation/native";
import labels from '../../../../../utils/ProjectLabels.json';
import CommonLayout from '../CommonLayout';
import {COLOURS} from '../../../../../utils/Constant';
import Ic_help from '../../../../../assets/Images/Ic_help.svg';
const Help_Screen = () => {
    const navigation = useNavigation()
    return (
        <>
            <View style={{ backgroundColor: COLOURS.lightBlue, flex: 1 }}>
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