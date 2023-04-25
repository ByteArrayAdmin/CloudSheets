import React from "react";
import { View, Image, TextInput, StyleSheet, Text } from "react-native";
import { Controller } from "react-hook-form";
import { FONTS, COLOURS } from "../utils/Constant";

const InputField = (props: any) => {
  return (
    <View>
      <Controller
        control={props.control}
        name={props.name}
        rules={props.rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View style={styles.container}>
              <View style={styles.imagepadding}>
                {props.Image ? <props.Image /> : null}
              </View>
              <View style={styles.viewWidth}>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={props.placeholder}
                  style={props.styles}
                  secureTextEntry={props.secureTextEntry}
                  placeholderTextColor={COLOURS.black}
                  keyboardType={props.keyboardType}
                  multiline={props.multiline}
                />
              </View>
              <View></View>
              <View></View>
            </View>
            {error && (
              <Text style={styles.errortextstyle}>
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
export default InputField;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: "#F6F8FA",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  textinputview: {
    width: "75%",
  },
  imagepadding: { paddingHorizontal: 9 },
  viewWidth: { width: "75%" },
  errortextstyle: { color: "red", marginLeft: 20 },
});
