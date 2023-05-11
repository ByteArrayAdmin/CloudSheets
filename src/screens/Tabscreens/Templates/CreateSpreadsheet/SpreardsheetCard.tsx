import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import InputField from "../../../../commonComponents/InputField";
import CommonDropdown from "../../../../commonComponents/CommonDropdown";
import { useForm } from "react-hook-form";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import labels from "../../../../utils/ProjectLabels.json";

const SpreadsheetCard = (props: any) => {
  const { control, handleSubmit } = useForm();
  const countries = ["Text", "Date", "Yes/No"];
  const Dropdown = (index: any, data: any) => {};
  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.columntext}>
          {labels.Creatcloudsheetlabels.ColumnName}
        </Text>
      </View>
      <View>
        <InputField
        
          name={`column_Name${props.index}`}
          control={props.control}
          placeholder={labels.Creatcloudsheetlabels.PLACEHOLDERTEXT}
          Image={false}
          rules={{
            required: labels.Creatcloudsheetlabels.Validationmsg,
          }}
          styles={styles.inputview}
        />
        <View>
          <Text style={styles.coloumtypetext}>
            {labels.Creatcloudsheetlabels.ColumnType}
          </Text>
        </View>

        <View>
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
            />
          </View>
        </View>
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
    paddingVertical: 15,
  },

  dropdown1BtnTxtStyle: {
    textAlign: "left",
    paddingLeft: 1,
    fontSize: 12,
    color:COLOURS.black,
    opacity:0.3
  },
  inputview: {
    height: 50,
    borderRadius: 8,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
    fontSize: 12,
  },
  commondropdownview:{
    marginHorizontal: 18, marginBottom: 15 
  }
});
