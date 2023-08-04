import React from 'react';
import { View, Modal, StyleSheet, Text} from 'react-native';
import { COLOURS,FONTS } from '../utils/Constant';
import ImgSuspend from '../assets/Images/ic_suspend.svg';
import InfoRed from '../assets/Images/infoRed.svg';
import Button from '../commonComponents/Button';
import labels from "../utils/ProjectLabels.json";
import { useNavigation, CommonActions } from "@react-navigation/native";

declare global {
    var labels: any;
  }
const SuspensionModal = (props:any)=>{
    var labels = global.labels;
    const navigation = useNavigation()
    return(
        <Modal
        animationType='fade'
        transparent={true}
        visible={props.visible}
        >
            <View style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <ImgSuspend/>
                    <View style={{marginTop:15}}>
                        <Text style={styles.medium_20}>{labels.suspensionConstants.mainHeading1}</Text>
                    </View>
                    <View>
                        <Text style={styles.medium_20}>{labels.suspensionConstants.mainHeading2}</Text>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={styles.medium_14}>{labels.suspensionConstants.subHeading1}</Text>
                    </View>
                    <View>
                        <Text style={styles.medium_14}>{labels.suspensionConstants.subHeading2}</Text>
                    </View>
                    <View style={styles.pinkContainer}>
                        <View style={{flexDirection:'row'}}>
                            <InfoRed/>
                            <View style={{marginLeft:10}}>
                                <Text style={styles.medium_12}>{labels.suspensionConstants.superSubHeading1}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <InfoRed/>
                            <View style={{marginLeft:10}}>
                                <Text style={styles.medium_12}>{labels.suspensionConstants.superSubHeading2}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{width:"100%"}}>
                        <Button
                        onPress={props.onPress}
                         Register={labels.suspensionConstants.contactSupport}
                         />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SuspensionModal;

const styles = StyleSheet.create({
    mainContainer:{
        width:"100%",
        height:"100%",
        backgroundColor:"rgba(0, 0, 0,0.8)",
        justifyContent:'center',
        alignItems:'center'
    },
    subContainer:{
        backgroundColor:COLOURS.white,
        width:"90%",
        alignItems:'center',
        paddingVertical:30,
        borderRadius:6
    },
    pinkContainer:{
        backgroundColor:"background: rgba(255, 120, 120, 0.2)",
        padding:13,
        borderRadius:14,
        marginTop:18
    },
    medium_20:{
        fontFamily:FONTS.manrope_medium,
        fontSize:20,
        color:'#001521'
    },
    medium_14:{
        fontFamily:FONTS.inter_regular,
        fontSize:14,
        color:'#001521',
        opacity:0.6
    },
    medium_12:{
        fontFamily:FONTS.inter_regular,
        fontSize:12,
        color:'#FF7878'
    }
})
