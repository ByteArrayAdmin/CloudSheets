import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FONTS, COLOURS } from '../../../../utils/Constant';
import RedCorss from '../../../../assets/Images/redcross.svg';
import labels from "../../../../utils/ProjectLabels.json";

const ColumnCard = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            {props?.item?.column_Name == "Name"?null:
            <TouchableOpacity style={styles.crossIconView}
                onPress={props.onPressRemove}
            >
                <RedCorss />
            </TouchableOpacity>
}
            <View>
                <Text style={styles.columntext}>{labels.Creatcloudsheetlabels.ColumnName}</Text>
            </View>
            <View style={styles.columnView}>
                <Text style={styles.coloumtypetext}>{props?.item?.column_Name}</Text>
            </View>
            <View>
                <Text style={styles.columntext}>{labels.Creatcloudsheetlabels.ColumnType}</Text>
            </View>
            <View style={styles.columnView}>
                <Text style={styles.coloumtypetext}>{props?.item?.column_Type}</Text>
            </View>
        </View>
    )
}

export default ColumnCard;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: COLOURS.white,
        borderRadius: 10,
        marginVertical: 10,
        padding: 10
    },
    columnView: {
        borderRadius: 8,
        padding: 16,
        marginVertical: 16,
        backgroundColor: COLOURS.offwhite
    },
    crossIconView: {
        position: 'absolute',
        alignSelf: 'flex-end',
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        right: 10,
        top: 10
    },
    columntext: {
        color: COLOURS.black,
        opacity: 0.8,
        fontSize: 12,
        fontFamily: FONTS.inter_regular
    },
    coloumtypetext: {
        fontFamily: FONTS.inter_regular,
        color: COLOURS.black,
        fontSize: 12,
        opacity: 0.5
    },
})