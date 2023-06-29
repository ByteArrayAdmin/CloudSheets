import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Touchable,
} from "react-native";
import InputField from "../../../../commonComponents/InputField";
import { useForm } from "react-hook-form";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import labels from "../../../../utils/ProjectLabels.json";
import DropdownModal from '../../../../commonComponents/DropdownModal';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SpreadsheetCard = (props: any) => {
  const { setError ,handleSubmit} = useForm();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.columntext}>
          {labels.Creatcloudsheetlabels.ColumnName}
        </Text>
      </View>
      <View>
        <InputField
          defaultValue={''}
          name={`column_Name${props.index}`}
          control={props.control}
          // customPassword={true}
          // onChangeCustom={(colname:string)=>props.onChangeCustom(colname,`column_Name${props.index}`)}
          // isEditable={props.columnLength ==0 && props.index == 0 ? false : true}
          isEdit={props.isEdit}
          index={props.index}
          placeholder={labels.Creatcloudsheetlabels.PLACEHOLDERTEXT}
          Image={false}
          rules={{
            required: labels.Creatcloudsheetlabels.Validationmsg,
          }
          }
          styles={styles.inputview}
        />
        <View>
          <Text></Text>
        </View>
        <View>
          <Text style={styles.coloumtypetext}>
            {labels.Creatcloudsheetlabels.ColumnType}
          </Text>
        </View>
        <DropdownModal
          isEdit={props.isEdit}
          index={props.index}
          columnLength={props.columnLength}
          control={props.control}
          name={`column_Type${props.index}`}
          rules={{
            required: labels.Creatcloudsheetlabels.Validationmsg,

          }}
        />

        

        {/* <View>
          <View style={styles.commondropdownview}>
            <CommonDropdown
              countries={countries}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              onselect={(index: any, data: any) => Dropdown(index, data)}
              control={props.control}
              name={`column_Type${props.index}`}
              rules={{
                required: labels.Creatcloudsheetlabels.Validationmsg,
              }}
              dropdownstyle={styles.dropdowmstyle}
              rowstyle={styles.rowStyle}
              rowTextStyle={styles.rowTextStyle}
            />
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default SpreadsheetCard;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: COLOURS.white,
    borderRadius: 10,
  },
  columntext: {
    paddingTop: 15,
    paddingHorizontal: 22,
    color: COLOURS.black,
    opacity: 0.8,
    fontSize: 12,
  },
  coloumtypetext: {
    paddingTop: 15,
    paddingHorizontal: 22,
    color: COLOURS.black,
    opacity: 0.8,
    fontSize: 12,
  },
  dropdown1BtnTxtStyle: {
    textAlign: "left",
    paddingLeft: 1,
    fontSize: 12,
    color: COLOURS.black,
    opacity: 0.3
  },
  inputview: {
    height: 50,
    borderRadius: 8,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
    fontSize: 12,
  },
  commondropdownview: {
    marginHorizontal: 18, marginBottom: 15
  },
  dropdowmstyle: {
    marginTop: 0,
    backgroundColor: COLOURS.offwhite,
    borderRadius: 10,
    height: 160
  },
  rowStyle: {
    marginHorizontal: 5,
    marginVertical: 8,
    height: 40
  },
  rowTextStyle: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 18, paddingLeft: 6
  },
  marginBottom20: {
    marginBottom: 20
  }
});
