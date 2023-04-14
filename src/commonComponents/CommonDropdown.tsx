import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Dropdowsideicon from "../assets/Images/dropdown.svg";
import { Controller } from "react-hook-form";

import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { COLOURS } from "../utils/Constant";
const Dropdown = (props: any) => {
  return (
    <>
      <Controller
        control={props.control}
        name={props.name}
        rules={props.rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <SelectDropdown
              data={props.countries}
              value={value}
              onSelect={onChange}
              onBlur={onBlur}
              buttonStyle={Styles.buttonstyle}
              renderDropdownIcon={(isOpened) => {
                return isOpened ? <Dropdowsideicon /> : <Dropdowsideicon />;
              }}
              dropdownIconPosition={"right"}
              buttonTextStyle={props.buttonTextStyle}
            />
            <View style={Styles.erroview}>
              {error && (
                <Text style={Styles.Textstyle}>
                  {error.message || "Error"}
                </Text>
              )}
            </View>
          </>
        )}
      />
    </>
  );
};

export default Dropdown;

const Styles = StyleSheet.create({
  buttonstyle: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: COLOURS.offwhite,
  },
  erroview: {
    marginLeft: -16,
  },
  Textstyle:{
    color: "red", marginLeft: 20 
  }
});
