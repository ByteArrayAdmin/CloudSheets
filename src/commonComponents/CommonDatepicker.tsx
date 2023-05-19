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
import moment from 'moment';

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
            mode={'date'}
            open={props.open}
            date={value}
            onConfirm={(date) => {
              onChange(date);
              props.toggle(false, date);
            }}
            onCancel={props.onCancel}
          />
        )}
      />
    </View>
  );
};

export default CommonDatepicker;
