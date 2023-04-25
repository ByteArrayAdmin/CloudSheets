import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOURS, FONTS } from '../../../../utils/Constant';
const CommonLayout = (props: any) => {
    return (
        <View style={styles.maincontainer}>
            <View>
                <Text style={styles.headingTextStyle}>{props.Heading}</Text>
            </View>
            <View style={{marginTop:10}}>
                <Text style={styles.contentTextStyle}>{props.Content}</Text>
            </View>
        </View>
    )
}

export default CommonLayout;

const styles = StyleSheet.create({
    maincontainer: {
        padding: 15,
        marginTop: 25,
        backgroundColor: COLOURS.white,
        marginHorizontal: 15,
        borderRadius: 10,
        shadowColor: COLOURS.lightgrey,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },
    headingTextStyle: {
        fontFamily: FONTS.inter_semibold,
        fontSize: 14
    },
    contentTextStyle:{
        fontFamily:FONTS.inter_regular,
        fontSize:12,
        opacity:0.6
    }
})