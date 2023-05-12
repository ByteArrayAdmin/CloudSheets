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
              buttonStyle={{
                width: "100%",
                borderRadius: 8,
                backgroundColor: "#F6F8FA",
              }}
              renderDropdownIcon={(isOpened) => {
                return isOpened ? <Dropdowsideicon /> : <Dropdowsideicon />;
              }}
              dropdownIconPosition={"right"}
              buttonTextStyle={props.buttonTextStyle}
              dropdownStyle={props.dropdownstyle}
              rowStyle={props.rowstyle}
              rowTextStyle={props.rowTextStyle}
            />
            <View style={{marginLeft:-16}}>
              {error && (
                <Text style={{ color: "red", marginLeft: 20 }}>
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

const Styles = StyleSheet.create({});
