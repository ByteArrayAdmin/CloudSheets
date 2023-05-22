import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
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
import { get_ColumnByTemplateId, create_SpreadSheet_Row, update_SpreadSheetRow } from '../../../../API_Manager/index';
import uuid from 'react-native-uuid';
import moment from 'moment';
import LightSmallButton from '../../../../commonComponents/LightSmallbutton';
import SmallButton from '../../../../commonComponents/SmallButton';
import CommonBottomsheet from '../../../../commonComponents/CommonBottomsheet';
import UpdatedCloudSheet from '../../../Popups/UpdatedCloudSheetPopup/index';

const RowdetailForm = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const childRef = useRef()
  const snapPoints = ["100%"];
  const [open, setopen] = useState(false);
  const [defaultdate, setdefaultdate] = useState(new Date());
  const [date, setdate] = useState("");
  const [spreadSheet, setSpreadSheet] = useState(route?.params?.spreadSheet)
  const [isEdit, setIsEdit] = useState(route?.params?.isEdit)
  const [spreadSheetRowItems, setSpreadsheetRowItems] = useState()
  const [spreadSheetRowData, setSpreadSheetRowData] = useState(route?.params?.spreadSheetRow)
  const [isFromScreen, setIsFromScreen] = useState(route?.params?.isFrom)
  const [columns, setColumns] = useState([])
  const [updatedFormData, setUpdatedFormData] = useState({})
  const { reset, control, handleSubmit } = useForm();
  const [modalVisible, setModalVisible] = useState(false)

  // --------------Initial rendering-------------------
  useEffect(() => {
    console.log("spreadDetail======", route?.params?.spreadSheet)
    console.log("spreadEdit======", route?.params?.isEdit)
    console.log("spreadRow======", route?.params?.spreadSheetRow)
    console.log("isFromScreen=======", route?.params?.isFrom)

    if (route?.params?.isEdit) {
      setSpreadsheetRowItems(JSON.parse(route?.params?.spreadSheetRow?.items))
    }
    getColumnByID(route.params.spreadSheet.templatesID)
  }, [])

  // --------------Create Row Data-----------------
  const onSubmitPressed = async (data: any) => {
    const { date } = data;
    console.log("rowData=======", data)
    let uid = uuid.v1().toString()
    let timeStamp = moment().unix().toString()
    let newUniqueId = uid + "-" + timeStamp
    let newRow = {
      id: newUniqueId,
      userID: spreadSheet?.userID,
      templatesID: spreadSheet?.templatesID,
      spreadsheetID: spreadSheet?.id,
      items: JSON.stringify(data)
    }
    console.log("UpdatedRow=======", newRow)
    create_SpreadSheet_Row(newRow).then((response) => {
      console.log("spreadRowResp==========", response)
      reset()
      navigation.navigate("Attendancelist", { spreadSheet: spreadSheet, isFrom: isFromScreen })
    }).catch((error) => {
      console.log("spreadRowErr========", error)
    })
  };

  // -------------After update Navigation-----------------
  const cancelModal = () => {
    setModalVisible(false)
    if (isFromScreen == "TemplateTab") {
      navigation.navigate("CreateTemplate")
    } else {
      navigation.navigate("ClousheetList")
    }
  }

  // ----------- Update Row -----------
  const onUpdateRows = (data: any) => {
    let newRow = {
      id: spreadSheetRowData?.id,
      userID: spreadSheetRowData?.userID,
      templatesID: spreadSheetRowData?.templatesID,
      spreadsheetID: spreadSheetRowData?.spreadsheetID,
      items: JSON.stringify(data),
      _version: spreadSheetRowData?._version
    }
    update_SpreadSheetRow(newRow).then((response: any) => {
      console.log("updatedSpreadsheetRowResp=======", response)
      setModalVisible(true)
    }).catch((error) => {
      console.log("updateSpreadSheetRowErr========", error)
    })
    console.log("updateRowData========", newRow)
  }

  // -------- Select Date function ----------
  const toggle = (value: boolean, value2: any) => {
    console.log("dateValue=======", value, value2)
    setdate(value2.toDateString());
    if (value == false) {
      setopen(false);
    }
  };

  // -------get Columnlist -----------------
  const getColumnByID = (templateId: String) => {
    get_ColumnByTemplateId(templateId).then((response: any) => {
      console.log("getColResp======", response)
      setColumns(response.data.templateColumnsByTemplatesID.items)
    }).catch((error) => {
      console.log("getColmErr=====", error)
    })
  }

  useEffect(() => { }, [open]);

  const renderItem = ({ item, index }: any) => (
    console.log("itemIndex======", index),
    <View >
      {item.column_Type == "Text" ?
        <>
          <View style={Styles.viewMargin}>
            <Text style={Styles.nametext}>{item.column_Name}</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <NewInputField
              defaultValue={isEdit ? spreadSheetRowItems[item.column_Name] : ''}
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
                  {date == '' && isEdit ? moment(spreadSheetRowItems[item.column_Name]).format("YYYY-MM-DD") : date != "" ? date : labels.Rowdetailsform.PlaceholderEnterDate}
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
              onCancel={() => setopen(false)}
              defaultdate={isEdit ? new Date(spreadSheetRowItems[item.column_Name]) : defaultdate}
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
                  defaultValue={isEdit ? spreadSheetRowItems[item.column_Name] : ''}
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
            />
          </View>
        </View>
      </View>
      <View style={Styles.container}></View>
      <View style={Styles.lastview}>
        {isEdit ?
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <LightSmallButton
              buttontext={labels.Rowdetailsform.Cancel}
              onPress={() => navigation.goBack()}
            />
            <View style={{ width: 19 }}></View>
            <SmallButton
              buttontext={labels.Rowdetailsform.Update}
              // onPress={()=>navigation.navigate("UpdateCloudsheet")}
              onPress={handleSubmit(onUpdateRows)}
            />
          </View>
          :
          <Custombutton
            onPress={handleSubmit(onSubmitPressed)}
            Register={labels.Rowdetailsform.Submit}
          />}
      </View>
      {modalVisible ? <UpdatedCloudSheet visible={modalVisible} onPress={() => cancelModal()} /> : null}
    </View>
  );
};

export default RowdetailForm;
