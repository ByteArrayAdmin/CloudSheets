import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { columnTypeList, COLOURS, FONTS } from '../../utils/Constant';
import moment from 'moment';
import Infoicon from '../../assets/Images/infocircle.svg';

const ColumnTypePopup = (props: any) => {

    // ------render Colunm type card --------
    const renderColumnType = ({ item }: any) => (
        <TouchableOpacity style={styles.renderCardmainView}
            onPress={() => props.onSelectColumn(item)}
        >
            <View>
                {item.image}
            </View>
            <View style={styles.margin_15}>
                <Text style={styles.interRegular_15}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerMainView}>
                <View>
                    <Text style={styles.interSemiBold_18}>Column Type</Text>
                    <Text style={styles.interRegular_12}>{"modify on"} {moment(new Date()).format("MMM DD, YYYY")}</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <View>
                    <Infoicon />
                </View>
            </View>
            <FlatList
                data={columnTypeList}
                renderItem={renderColumnType}
                style={{ height: "100%" }}
            />
        </View>
    )
}

export default ColumnTypePopup;

const styles = StyleSheet.create({
    interSemiBold_18: {
        fontFamily: FONTS.inter_semibold,
        fontSize: 18,
        color: COLOURS.black
    },
    headerMainView: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 25
    },
    interRegular_12: {
        fontFamily: FONTS.inter_regular,
        fontSize: 12,
        color: COLOURS.black,
        opacity: 0.6,
        marginTop: 10
    },
    mainContainer: {
        paddingLeft: 30,
        paddingRight: 17
    },
    renderCardmainView: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 25
    },
    margin_15: {
        marginLeft: 15
    },
    interRegular_15: {
        fontFamily: FONTS.inter_regular,
        fontSize: 15,
        color: COLOURS.black
    }
})