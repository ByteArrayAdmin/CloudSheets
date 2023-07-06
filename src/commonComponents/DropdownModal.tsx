import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Controller } from "react-hook-form";
import { columnTypeList, COLOURS, FONTS } from '../utils/Constant';
const DropdownModal = (props: any) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(columnTypeList);

    return (
        <Controller
            control={props.control}
            name={props.name}
            rules={props.rules}
            render={({
                field,
                fieldState: { error },
            }) => (
                <View style={{ paddingHorizontal: 20, marginVertical: 15 }}>
                    <DropDownPicker
                        {...field}
                        open={open}
                        value={value}
                        items={items}
                        onChangeValue={field.onChange}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        listMode={'MODAL'}
                        // disabled={props.columnLength ==0 && props.index ==0? true:false}
                        modalTitle={"Column type"}
                        modalTitleStyle={styles.modalTitleStyle}
                        modalContentContainerStyle={styles.modalContentContainerStyle}
                        modalAnimationType="slide"
                        disableBorderRadius={true}
                        style={{ borderWidth: 0, backgroundColor: COLOURS.offwhite }}
                        modalProps={{ transparent: true}}
                        // iconContainerStyle={{ marginLeft: 30 }}
                        listItemContainerStyle={{ marginTop: 25 ,marginLeft: 30 }}
                        labelStyle={styles.labelStyle}
                        theme={'LIGHT'}
                        disabledItemLabelStyle={{opacity:0.2}}
                    />
                    {error && (
                    <Text style={styles.errortextstyle}>{error.message}</Text>
                  )}
                </View>
                
            )}
        />
    )
}

export default DropdownModal;

const styles = StyleSheet.create({
    labelStyle: {
        fontFamily: FONTS.inter_regular,
        fontSize: 15,
        color: COLOURS.black
    },
    modalContentContainerStyle: {
        backgroundColor: COLOURS.white,
        top: "25%",
        // marginTop:"25%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    modalTitleStyle: {
        paddingLeft: 30,
        paddingTop: 30,
        fontFamily: FONTS.inter_semibold,
        fontSize: 18,
        color: COLOURS.black
    },
    errortextstyle: {
        color: "red",
        marginLeft: 20,
      },
})