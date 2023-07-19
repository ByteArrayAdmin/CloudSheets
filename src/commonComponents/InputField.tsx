import React from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Controller } from "react-hook-form";
import { FONTS, COLOURS } from "../utils/Constant";
// import lables from "../utils/ProjectLabels.json";
declare global {
  var labels: any;
}
const InputField = (props: any) => {
  var lables = global.labels
  console.log("defaultValue========", props.defaultValue);
  return (
    <View>
      <Controller
        control={props.control}
        name={props.name}
        rules={props.rules}
        defaultValue={props.defaultValue}
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
                  pointerEvents={props.pointerEvents}
                  onChangeText={(text) => {
                    onChange(text),
                    props.customPassword?
                      props.onChangeCustom(text):null
                    
                    
                  }}
                  onChange={props.onChangePassword}
                  editable={props.isEditable}
                  onBlur={props.onBlur}
                  placeholder={props.placeholder}
                  style={props.styles}
                  textAlignVertical={props.textAlignVertical}
                  multiline={props.multiline}
                  secureTextEntry={props.secureTextEntry}
                  placeholderTextColor={styles.placeholdercolour}
                  keyboardType={props.keyboardType}
                  multiline={props.multiline}
                  onSubmitEditing={props.onSubmitEditing}
            
                />
              </View>
              <View>
                {props.value &&
                  (props.isUserExist ? <props.ic_red /> : <props.ic_blue />)}
              </View>
              {props.passswordpolicy ? (
                <TouchableOpacity onPress={props.Opensheet}>
                  {props.instructionIcon && <props.instructionIcon />}
                </TouchableOpacity>
              ) : (
                ""
              )}
              {/* <View></View>
              <View></View> */}
            </View>
            {error && (
              <Text style={styles.errortextstyle}>{error.message}</Text>
            )}
          </>
        )}
      />
      <View>
        {props.value &&
          (props.isUserExist ? (
            <Text style={styles.errortextstyle}>
              {lables.signupcontant.userExist}
            </Text>
          ) : null)}
      </View>
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
  imagepadding: {
    paddingHorizontal: 9,
  },
  viewWidth: {
    width: "75%",
  },
  errortextstyle: {
    color: "red",
    marginLeft: 20,
  },
  placeholdercolour: {
    color: COLOURS.black,
  },
});
