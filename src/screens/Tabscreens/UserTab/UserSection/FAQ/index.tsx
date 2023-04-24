import React,{useState} from 'react';
import { View, ScrollView } from 'react-native';
import NewCommonHeader from "../../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../../commonComponents/Backbutton";
import { useNavigation } from "@react-navigation/native";
import labels from '../../../../../utils/ProjectLabels.json';
import CommonLayout from '../CommonLayout';
import {COLOURS} from '../../../../../utils/Constant';
import Ic_faq from '../../../../../assets/Images/Ic_faq.svg';
import CommonAccordian from './CommonAccordian';
const Faq_Screen = () => {
    const navigation = useNavigation()
    const [isOpenFirst,setIsOpenFirst] = useState(false)

    const toggle =()=> setIsOpenFirst(previewState=>!previewState)
    return (
        <>
            <View style={{ backgroundColor: COLOURS.lightBlue, flex: 1 }}>
                <NewCommonHeader
                    BackButton={<BackButton onPress={() => navigation.goBack()} />}
                    heading={labels.SubscriptionScreen.FAQ}
                    Folder={<Ic_faq />}
                />
                <ScrollView>
                    <CommonAccordian Heading={labels.SubscriptionScreen.How_App_Work} isOpen={isOpenFirst} Content={labels.SubscriptionScreen.FaqContent} onPress={toggle} />
                </ScrollView>
            </View>
        </>
    )
}

export default Faq_Screen;