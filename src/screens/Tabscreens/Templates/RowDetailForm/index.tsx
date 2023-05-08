import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "screens/Auth/signup/style";

const RowdetailForm = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const { control, handleSubmit } = useForm();
  const [open, setopen] = useState(false);
  const [defaultdate, setdefaultdate] = useState(new Date());
  const [date, setdate] = useState("");
  const [spreadSheetName, setSpreadSheetName] = useState(route.params.spreadSheetName)
  const [columns, setColumns] = useState(route.params.columns)
  const onSubmitPressed = async (data: any) => {
    const { date } = data;
    console.log("rowData=======",data)
    navigation.navigate("Attendancelist",{row:data})

  };

  const toggle = (value: boolean, value2: any) => {
    setdate(value2.toDateString());
    if (value == false) {
      setopen(false);
    }
  };

  useEffect(() => {
    console.log("spreadName======", route.params.spreadSheetName)
    console.log("ColName=========", route.params.columns)
  }, [])

  useEffect(() => { }, [open]);

  const renderItem = ({ item ,index}: any) => (
    console.log("itemIndex======",index),
    <View>
      {item.columnType == "Text" ?
        <>
          <View style={Styles.viewMargin}>
            <Text style={Styles.nametext}>{item.columnName}</Text>
          </View>
          <View>
            <NewInputField
              name={item.columnName}
              control={control}
              placeholder={item.columnName}
              rules={{
                required: labels.Rowdetailsform.valodationmessage,
              }}
              styles={Styles.inputview}
            />
          </View></> : item.columnType == "Date" ?
          <>
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
              name={item.columnName}
              control={control}
              toggle={toggle}
              defaultdate={defaultdate}
            />
          </> : item.columnType == "Yes/No" ?
            <>
              <View >
                <Text style={Styles.Attendancetext}>{item.columnName}</Text>
              </View>
              <View>
                <NewInputField
                  name={item.columnName}
                  control={control}
                  placeholder={item.columnName}
                  rules={{
                    required: labels.Rowdetailsform.valodationmessage,
                  }}
                  styles={Styles.inputview}
                />
              </View>
            </>
            : null
      }
    </View>

  )

  const Footer = () => {
    
    return (
      <>
        <View>
          <Text style={Styles.presenttextview}>
            {labels.Rowdetailsform.Samples}
          </Text>
        </View>
        <View style={Styles.viewMargin}>
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
      </>
    )
  }

  return (

    <View style={Styles.container}>
      <View>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          Folder={<Document />}
          heading={labels.Rowdetailsform.headerlabel}
          onPress={navigation.canGoBack()}
        />
      </View>
      <View style={Styles.sucontainer}>
        <View style={Styles.formcontainer}>
          <View >
            <FlatList
            showsVerticalScrollIndicator={false}
              data={columns}
              renderItem={renderItem}
              ListFooterComponent={Footer}
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
  );
};

export default RowdetailForm;
