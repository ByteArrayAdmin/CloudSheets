import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Smlogo from "../../../../assets/Images/smalllogo.svg";
// import labels from "../../../utils/ProjectLabels.json";
import { COLOURS, FONTS } from "../../../utils/Constant";
import AuthCard from "../../../commonComponents/AuthCard";
import Logo from "../../../assets/Images/updatecloud.svg";
import CustomButton from "../../../commonComponents/Button";
import { useNavigation } from "@react-navigation/native";
import { BottomSheet } from 'react-native-btr';
import { ColorSpace } from 'react-native-reanimated';
import { styles } from 'screens/Auth/signup/style';
declare global {
    var labels: any;
  }
const UpdatedCloudSheet = (props: any) => {

    const navigation = useNavigation()
    var labels = global.labels
    return (
        <BottomSheet
            visible={props.visible}
            //setting the visibility state of the bottom shee
            onBackButtonPress={props.onBackButtonPress}
            //Toggling the visibility state
            onBackdropPress={props.onBackdropPress}
        >
            <View style={Style.mainContainerView}>

                <View style={Style.parentCard}>
                    <View style={Style.cardcontainer}>
                        <View style={Style.logospacing}>
                            <Logo />
                        </View>
                        <View>
                            <Text style={Style.updatetext}>
                                {labels.updatecloudsheet.UpdatedCloudSheet}
                            </Text>
                        </View>

                        <View style={Style.cardtext}>
                            <Text style={Style.cardtextstyle}>
                                {labels.updatecloudsheet.Cardtext}
                            </Text>
                            <Text style={Style.cardtextstyle}>
                                {labels.updatecloudsheet.successfully_updated}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <CustomButton
                            Register={labels.updatecloudsheet.Ok}
                            onPress={props.onPress}
                        />
                    </View>
                </View>
            </View>
        </BottomSheet>

    )
}

export default UpdatedCloudSheet;

const Style = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoview: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 94,
    },
    cloudview: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    cloudtext: {
        fontFamily: FONTS.manrope_bold,
        fontSize: 19,
        color: COLOURS.white,
    },
    sheetetxt: {
        fontFamily: FONTS.MANROPE_NORMAL,
        fontSize: 19,
        color: COLOURS.white,
    },
    mainContainerView: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: 'center',
        
    },
    parentCard:{
        backgroundColor: COLOURS.white, 
        width: "90%",
        borderRadius: 10
    },
    cardcontainer: {
    // marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
},
    logospacing: {
    marginTop: 30,
    marginBottom: 15,
},
    updatetext: {
    fontFamily: FONTS.manrope_semibold,
    fontSize: 20,
    color: COLOURS.black,
},
    cardtext: {
    marginTop: 20,
},
    cardtextstyle: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    color: COLOURS.black,
    opacity: 0.6,
    textAlign: "center",
    padding: 3,
},
});