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
import moment from "moment";

const CommonDatepicker = (props: any) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <View>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultdate}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            modal
            mode={"date"}
            open={props.open}
            date={selectedDate}
            onDateChange={(date) => setSelectedDate(new Date(date))}
            onConfirm={(date) => {
              // Format the selected date using moment
              const formattedDate = moment(date).format('MMM DD YYYY');
              onChange(formattedDate);
              props.toggle(false, formattedDate);
            }}
            onCancel={props.onCancel}
          />
        )}
      />
    </View>
  );
};

export default CommonDatepicker;
