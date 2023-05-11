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
import {get_ColumnByTemplateId, create_SpreadSheet_Row} from '../../../../API_Manager/index';
import uuid from 'react-native-uuid';
import moment from 'moment';

const RowdetailForm = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const { control, handleSubmit } = useForm();
  const [open, setopen] = useState(false);
  const [defaultdate, setdefaultdate] = useState(new Date());
  const [date, setdate] = useState("");
  const [spreadSheet, setSpreadSheet] = useState(route.params.spreadSheet)
  const [columns, setColumns] = useState([])

  useEffect(() => {
    console.log("spreadName======", route.params.spreadSheet)
    getColumnByID(route.params.spreadSheet.templatesID)
  }, [])

  const onSubmitPressed = async (data: any) => {
    const { date } = data;
    console.log("rowData=======",data)
    let uid = uuid.v1().toString()
    let timeStamp = moment().unix().toString()
    let newUniqueId = uid + "-" + timeStamp

    let newRow = {
      id:newUniqueId,
      userID: spreadSheet?.userID,
      templatesID: spreadSheet?.templatesID,
      spreadsheetID: spreadSheet?.id,
      items:JSON.stringify(data)
    }

    create_SpreadSheet_Row(newRow).then((response)=>{
        console.log("spreadRowResp==========",response)
        navigation.navigate("Attendancelist",{spreadSheet:spreadSheet})
    }).catch((error)=>{
      console.log("spreadRowErr========",error)
    })

  };

  const toggle = (value: boolean, value2: any) => {
    setdate(value2.toDateString());
    if (value == false) {
      setopen(false);
    }
  };

  const getColumnByID = (templateId:String)=>{
    get_ColumnByTemplateId(templateId).then((response:any)=>{
        console.log("getColResp======",response)
        setColumns(response.data.templateColumnsByTemplatesID.items)
    }).catch((error)=>{
      console.log("getColmErr=====",error)
    })
  }

  useEffect(() => { }, [open]);

  const renderItem = ({ item ,index}: any) => (
    console.log("itemIndex======",index),
    <View>
      {item.column_Type == "Text" ?
        <>
          <View style={Styles.viewMargin}>
            <Text style={Styles.nametext}>{item.column_Name}</Text>
          </View>
          <View style={{marginBottom:10}}>
            <NewInputField
              name={item.column_Name}
              control={control}
              placeholder={item.column_Name}
              rules={{
                required: labels.Rowdetailsform.valodationmessage,
              }}
              styles={Styles.inputview}
            />
          </View></> : item.column_Type == "Date" ?
          <>
            <View>
              <Text style={Styles.Attendancetext}>
                {item.column_Name}
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
              name={item.column_Name}
              control={control}
              toggle={toggle}
              defaultdate={defaultdate}
            />
          </> : item.column_Type == "Yes/No" ?
            <>
              <View >
                <Text style={Styles.Attendancetext}>{item.column_Name}</Text>
              </View>
              <View>
                <NewInputField
                  name={item.column_Name}
                  control={control}
                  placeholder={item.column_Name}
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
          heading={spreadSheet?.spreadsheet_name}
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
              // ListFooterComponent={Footer}
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
