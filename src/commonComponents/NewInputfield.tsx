import React from "react";
import { View, Image, TextInput, StyleSheet, Text } from "react-native";
import { Controller } from "react-hook-form";
import { COLOURS, FONTS } from "../utils/Constant";
import Scan from "../assets/Images/Scan.svg";

const NewInputField = (props: any) => {
  return (
    <View>
      <Controller
        defaultValue={props.defaultValue}
        control={props.control}
        name={props.name}
        rules={props.rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View style={styles.container}>
              <View style={styles.viewWidth}>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={props.placeholder}
                  style={props.styles}
                  secureTextEntry={props.secureTextEntry}
                  placeholderTextColor={styles.placeholdertext}
                  keyboardType={props.keyboardType}
                />
              </View>
              <View style={styles.flexprop}></View>
              <View style={styles.scanmargin}>{props.Scanimage}</View>
              <View></View>
            </View>
            {error && (
              <Text style={styles.errormsgtext}>
                {error.message || "Error"}
              </Text>
            )}
          </>
        )}
      />
      {/* <View>
          {props.value &&
            (props.isUserExist ? <props.redcrossicon /> : <props.iconimage />)}
        </View> */}
    </View>
  );
};
export default NewInputField;

const styles = StyleSheet.create({
  container: {
    // marginTop: 18,
    backgroundColor: COLOURS.offwhite,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  textinputview: {
    width: "75%",
  },
  viewWidth: { width: "75%" },
  errormsgtext:
    { color: COLOURS.red },
  flexprop: {
    flex: 1
  },

  scanmargin: { marginRight: 17 },
  placeholdertext: {
    color: COLOURS.black,
    opacity: 0.5
  }

});
