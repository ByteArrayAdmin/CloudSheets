import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView
} from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
import Folder from "../../assets/Images/folder12.svg";
import labels from "../../../../utils/ProjectLabels.json";
import Document from "../../../../assets/Images/documentdark.svg";

import NewInputField from "../../../../commonComponents/NewInputfield";
import { useForm } from "react-hook-form";
import CommonDatepicker from "../../../../commonComponents/CommonDatepicker";
import Calenderlogo from "../../../../assets/Images/calendar.svg";
import Custombutton from "../../../../commonComponents/Button";
import Scanimage from "../../../../assets/Images/Scan.svg";
import { Styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RowdetailForm = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const [open, setopen] = useState(false);
  const[defaultdate, setdefaultdate] = useState(new Date());
  const [date, setdate] = useState("");
  const onSubmitPressed = async (data: any) => {
    const { date } = data;
    navigation.navigate("Attendancelist")

  };

  const toggle = (value: boolean, value2: any) => {
    setdate(value2.toDateString());
    if (value == false) {
      setopen(false);
    }
  };

  useEffect(() => {}, [open]);

  return (
    <KeyboardAwareScrollView>
    <View style={Styles.container}>
      
      <View>
        <NewCommonHeader
          BackButton={<BackButton onPress={()=>navigation.goBack()} />}
          Folder={<Document />}
          heading={labels.Rowdetailsform.headerlabel}
          onPress={navigation.canGoBack()}
        />
      </View>
      
      <View style={Styles.sucontainer}>
        <View style={Styles.formcontainer}>
          <View>
            <Text style={Styles.nametext}>{labels.Rowdetailsform.Name}</Text>
          </View>
          <View>
            <NewInputField
              name="nameform"
              control={control}
              placeholder={labels.Rowdetailsform.Name}
              rules={{
                required: labels.Rowdetailsform.valodationmessage,
              }}
              styles={Styles.inputview}
            />
          </View>
          <View>
            <Text style={Styles.Attendancetext}>
              {labels.Rowdetailsform.Attendance_Date}
            </Text>
          </View>
          <TouchableOpacity
            style={Styles.datepickerview}
            onPress={() => setopen(true)}
          >
            <View>
              <Text style={Styles.enterdate}>
                {date ? date : labels.Rowdetailsform.PlaceholderEnterDate}
              </Text>
            </View>
            <View style={Styles.calenderview}></View>
            <View style={Styles.calenderlogview}>
              <Calenderlogo />
            </View>
          </TouchableOpacity>
          <CommonDatepicker
            open={open}
            name={"date"}
            control={control}
            toggle={toggle}
            defaultdate={defaultdate}
          />
          <View>
            <Text style={Styles.presenttextview}>
              {labels.Rowdetailsform.Present}
            </Text>
          </View>
          <View>
            <NewInputField
              name="present"
              control={control}
              placeholder={labels.Rowdetailsform.PlaceholderPresent}
              rules={{
                required: labels.Rowdetailsform.valodationmessage,
              }}
              styles={Styles.inputview}
              Scanimage={<Scanimage />}
            />
          </View>
          <View>
            <Text style={Styles.presenttextview}>
              {labels.Rowdetailsform.Samples}
            </Text>
          </View>
          <View>
            <NewInputField
              name="sample"
              control={control}
              placeholder={labels.Rowdetailsform.placeholderEnterSamples}
              rules={{
                required: labels.Rowdetailsform.valodationmessage,
              }}
              styles={Styles.inputview}
            />
          </View>
        </View>
      </View>
      <View style={Styles.lastview}>
        <Custombutton
          onPress={handleSubmit(onSubmitPressed)}
          Register={labels.Rowdetailsform.Submit}
        />
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
};

export default RowdetailForm;
