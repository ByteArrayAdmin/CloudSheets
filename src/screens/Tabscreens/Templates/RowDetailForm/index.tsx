import React, { useEffect, useState, useRef } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
import labels from "../../../../utils/ProjectLabels.json";
import Document from "../../../../assets/Images/documentdark.svg";
import NewInputField from "../../../../commonComponents/NewInputfield";
import { useForm } from "react-hook-form";
import CommonDatepicker from "../../../../commonComponents/CommonDatepicker";
import Calenderlogo from "../../../../assets/Images/calendar.svg";
import Custombutton from "../../../../commonComponents/Button";
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
import CommonLoader from '../../../../commonComponents/CommonLoader';
import { track_Screen, track_Click_Event,track_Success_Event,track_Error_Event } from '../../../../eventTracking/index';
import {eventName,screenName,clickName,errorActionName,successActionName} from '../../../../utils/Constant';
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
  const [extraData, setExtraData] = useState(new Date())
  const [loader, setLoader] = useState(false)

  // --------------Initial rendering-------------------
  useEffect(() => {
    console.log("spreadDetail======", route?.params?.spreadSheet)
    console.log("spreadEdit======", route?.params?.isEdit)
    console.log("spreadRow======", route?.params?.spreadSheetRow)
    console.log("isFromScreen=======", route?.params?.isFrom)

    getColumnByID(route.params.spreadSheet.templatesID)
  }, [])

  useEffect(() => {
    if (isEdit) {
      track_Screen(eventName.TRACK_SCREEN,screenName.ADD_SPREADSHEET_ROW_SCREEN)
      setSpreadsheetRowItems(JSON.parse(route?.params?.spreadSheetRow?.items))
      setExtraData(new Date())
    }else{
      track_Screen(eventName.TRACK_SCREEN,screenName.EDIT_SPREADSHEET_ROW_SCREEN)
    }
  }, [isEdit])

  // --------------Create Row Data-----------------
  const onSubmitPressed = async (data: any) => {
    track_Click_Event(eventName.TRACK_CLICK, clickName.CLICK_ON_ADD_SPREADSHEET_ROW)
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
      items: JSON.stringify(data),
      soft_Deleted: false
    }
    console.log("UpdatedRow=======", newRow)
    setLoader(true)
    create_SpreadSheet_Row(newRow).then((response) => {
      track_Success_Event(eventName.TRACK_SUCCESS_ACTION,successActionName.CREATE_SPREADSHEET_ROW_SUCCESSFULLY)
      setLoader(false)
      console.log("spreadRowResp==========", response)
      reset()
      navigation.navigate("Attendancelist", { spreadSheet: spreadSheet, isFrom: isFromScreen })
    }).catch((error) => {
      track_Error_Event(eventName.TRACK_ERROR_ACTION, errorActionName.CREATE_SPREADSHEET_ROW_ERROR)
      setLoader(false)
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
    track_Click_Event(eventName.TRACK_CLICK, clickName.CLICK_ON_UPDATE_SPREADSHEET_ROW)
    let newRow = {
      id: spreadSheetRowData?.id,
      userID: spreadSheetRowData?.userID,
      templatesID: spreadSheetRowData?.templatesID,
      spreadsheetID: spreadSheetRowData?.spreadsheetID,
      items: JSON.stringify(data),
      _version: spreadSheetRowData?._version,
      soft_Deleted: spreadSheetRowData.soft_Deleted
    }
    setLoader(true)
    update_SpreadSheetRow(newRow).then((response: any) => {
      console.log("updatedSpreadsheetRowResp=======", response)
      setLoader(false)
      track_Success_Event(eventName.TRACK_SUCCESS_ACTION,successActionName.UPDATE_SPREADSHEET_ROW_SUCCESSFULLY)
      setModalVisible(true)
    }).catch((error) => {
      track_Error_Event(eventName.TRACK_ERROR_ACTION,errorActionName.UPDATE_SPREADSHEET_ROW_ERROR)
      setLoader(false)
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
    setLoader(true)
    get_ColumnByTemplateId(templateId).then((response: any) => {
      console.log("getColResp======", response)
      setLoader(false)
      setColumns(response.data.templateColumnsByTemplatesID.items)
    }).catch((error) => {
      setLoader(false)
      console.log("getColmErr=====", error)
    })
  }

  useEffect(() => { }, [open]);

  const renderItem = ({ item, index }: any) => (
    console.log("itemIndex======", index),
    <View>
      {item.column_Type == "Sentences" || item.column_Type == "Numbers" || item.column_Type == "EmailPhone" ?
        <View style={Styles.columnView}>
          <View>
            <Text style={Styles.nametext}>{item.column_Name}</Text>
          </View>
          <View style={Styles.marginTop_15}>
            <NewInputField
              defaultValue={isEdit ? spreadSheetRowItems[item.column_Name] : ''}
              name={item.column_Name}
              control={control}
              keyboardType={item.column_Type == "Numbers" ? 'number-pad' : 'default'}
              placeholder={item.column_Name}
              rules={{
                required: labels.Rowdetailsform.valodationmessage,
              }}
              styles={Styles.inputview}
            />
          </View>
        </View>

        : item.column_Type == "Date" ?

          <View style={Styles.columnView} >
            <View>
              <Text style={Styles.nametext}>{item.column_Name}</Text>
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
          </View>
          : item.column_Type == "Yes/No" ?
            <View style={Styles.columnView}>
              <View >
                <Text style={Styles.nametext}>{item.column_Name}</Text>
              </View>
              <View style={Styles.marginTop_15}>
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
            </View>
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={columns}
          renderItem={renderItem}
          extraData={extraData}
        />
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
      {loader ? <CommonLoader /> : null}
    </View>
  );
};

export default RowdetailForm;
