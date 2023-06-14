import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheet } from "react-native-btr";
import { COLOURS, FONTS } from '../../utils/Constant';
import Exclaimationlogo from "../../assets/Images/exclaimationlogo.svg";
import Custombutton from "../../commonComponents/Button";
import modelLabels from "../../utils/ProjectLabels.json";

const RegisterGuestUserPopup = (props: any) => {
    return (
        <BottomSheet
            style={styles.Bottomsheetview}
            visible={props.visible}
            onBackButtonPress={props.toggleRegisterModal}
            onBackdropPress={props.toggleRegisterModal}
        >
            <View style={styles.bottomNavigationView}>
                <View style={styles.subconatiner}>
                    <View style={{ marginTop: 30 }}>
                        <Exclaimationlogo />
                    </View>
                    <View>
                        <Text style={styles.Textguest}>
                            {modelLabels.Guestbottomsheet.YOUAREAGUEST}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.regitercontinuetext}>
                            {modelLabels.Guestbottomsheet.REGISTERTOCONTINUE}
                        </Text>
                    </View>
                </View>
                <Custombutton
                    Register={modelLabels.Guestbottomsheet.Registernow}
                    onPress={props.onClickRegister}
                />
            </View>
        </BottomSheet>
    )
}

export default RegisterGuestUserPopup;

const styles = StyleSheet.create({
    Bottomsheetview: {
        backgroundColor: COLOURS.white,
        width: "100%",
        height: 375,
        borderRadius: 25,
    },
    bottomNavigationView: {
        backgroundColor: COLOURS.white,
        width: '100%',
        height: 282,
        borderRadius: 25,
    },
    subconatiner: {
        alignItems: 'center',
    },
    Textguest: {
        paddingTop: 15,
        fontFamily: FONTS.manrope_bold,
        fontSize: 20,
        color: COLOURS.black,
    },
    regitercontinuetext: {
        paddingTop: 5,
        fontFamily: FONTS.inter_regular,
        fontSize: 14,
        color: COLOURS.black,
    },
})