import React from 'react';
import {View, Text,StyleSheet,TouchableOpacity} from 'react-native';
import {COLOURS,FONTS} from '../../../../../utils/Constant';
import Ic_upArrow from '../../../../../assets/Images/Ic_upArrow.svg';
import DropDown from '../../../../../assets/Images/dropdown.svg'
const CommonAccordian = (props:any)=>{
    return(
        <TouchableOpacity style={styles.maincontainer}
        onPress={props.onPress}
        >
            <View style={styles.subContainerView}>
                <View>
                    <Text style={styles.headingText}>{props.Heading}</Text>
                </View>
                <View style={styles.space}></View>
                <View>
                    {props.isOpen?<Ic_upArrow/>:<DropDown/>}
                </View>
            </View>
            {props.isOpen?
                <View style={styles.viewspace}>
                    <Text style={styles.contentText}>{props.Content}</Text>
                </View>:null}
        </TouchableOpacity>
    )
}

export default CommonAccordian;

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
    subContainerView:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center"
    },
    headingText:{
        fontFamily:FONTS.inter_semibold,
        fontSize:14
    },
    contentText:{
        fontFamily:FONTS.inter_regular,
        fontSize:12,
        opacity:0.6
    },
    space:{
        flex:1
    },
    viewspace:{
marginTop:15
    }

})