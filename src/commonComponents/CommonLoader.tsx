import React from 'react';
import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { COLOURS } from '../utils/Constant';

const CommonLoader = (props: any) => {
    return (
        <View style={styles.viewStyle}>
            <View style={{backgroundColor:'rgba(0,0,0,0.6)',padding:20,borderRadius:10}}>
            <ActivityIndicator size="large" color={COLOURS.white}  />
            </View>
        </View>
    )
}

export default CommonLoader;

const styles = StyleSheet.create({
    viewStyle:{
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.0)',
        width:"100%",
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    }
})