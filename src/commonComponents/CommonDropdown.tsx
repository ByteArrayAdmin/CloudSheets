import React, { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Dropdowsideicon from "../assets/Images/dropdown.svg";
import { Controller } from "react-hook-form";
import { Text, View, StyleSheet } from "react-native";
import { COLOURS } from "../utils/Constant";
const Dropdown = (props: any) => {
  useEffect(() => {
    console.log("DefaultValue=========", props.defaultValue);
  }, []);

  return (
    <>
      <Controller
        control={props.control}
        name={props.name}
        rules={props.rules}
        render={({ field, fieldState: { error } }) => (
          console.log("onChnage=======", onChange),
          (
            <>
              <SelectDropdown
                data={props.countries}
                value={field.value}
                onSelect={field.onChange}
                onBlur={field.onBlur}
                buttonStyle={Styles.buttonstyle}
                renderDropdownIcon={(isOpened) => {
                  return isOpened ? <Dropdowsideicon /> : <Dropdowsideicon />;
                }}
                dropdownIconPosition={"right"}
                buttonTextStyle={props.buttonTextStyle}
                dropdownStyle={props.dropdowmstyle}
                rowStyle={props.rowStyle}
              />
              <View style={Styles.erroview}>
                {error && (
                  <Text style={Styles.Textstyle}>
                    {error.message || "Error"}
                  </Text>
                )}
              </View>
            </>
          )
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
  Textstyle: {
    color: "red",
    marginLeft: 20,
  },
});
