import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Controller } from "react-hook-form";

const CommonDatepicker = (props: any) => {

  return (
    <View>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultdate}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            modal
            open={props.open}
            date={value}
            onConfirm={(date) => {
              onChange(date);
              props.toggle(false, date);
            }}
            onCancel={() => {
              props.toggle(false);
            }}
          />
        )}
      />
    </View>
  );
};

export default CommonDatepicker;
