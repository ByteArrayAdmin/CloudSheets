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
import { COLOURS, FONTS } from "../utils/Constant";
import Calenderlogo from "../assets/Images//calendar.svg";


const CommonDatepicker = (props: any) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log("DatePickername==========", props.name);
  return (
    <View>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultdate}
        render={({ field: { onChange, value } }) => (
          <View style={styles.columnView}>
            <View>
              <Text style={styles.nametext}>{props.name}</Text>
            </View>

            <TouchableOpacity
              style={styles.datepickerview}
              onPress={() => setOpen(true)}
            >
              <View>
                <Text style={styles.enterdate}>{value?moment(value).format("MMM DD YYYY"): "Select Date"}</Text>
              </View>
              <View style={styles.calenderview}></View>
              <View style={styles.calenderlogview}>
                <Calenderlogo />
              </View>
            </TouchableOpacity>

            <DatePicker
              modal
              mode={"date"}
              open={open}
              date={new Date()}
              // onDateChange={(date) => setSelectedDate(new Date(date))}
              onConfirm={(date) => {
                // Format the selected date using moment
                const formattedDate = moment(date).format("MMM DD YYYY");
                onChange(date);
                setOpen(false)
              }}
              onCancel={()=>setOpen(false)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default CommonDatepicker;

const styles = StyleSheet.create({
  columnView: {
    marginTop: 15,
  },
  nametext: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
  },
  datepickerview: {
    height: 50,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOURS.offwhite,
    marginTop: 15,
  },
  enterdate: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    color: COLOURS.black,
    opacity: 0.4,
    paddingLeft: 16,
  },
  calenderview: {
    flex: 1,
  },
  calenderlogview: {
    marginRight: 17,
  },
});
