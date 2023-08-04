import React, { useEffect, useState, useRef } from "react";
import { Text, View, FlatList, Keyboard, Alert } from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
// import labels from "../../../../utils/ProjectLabels.json";
import Document from "../../../../assets/Images/documentdark.svg";
import NewInputField from "../../../../commonComponents/NewInputfield";
import { useForm } from "react-hook-form";
import CommonDatepicker from "../../../../commonComponents/CommonDatepicker";
import Custombutton from "../../../../commonComponents/Button";
import { Styles } from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  get_ColumnByTemplateId,
  create_SpreadSheet_Row,
  update_SpreadSheetRow,
  getSpreadSheetRowBy_userId
} from "../../../../API_Manager/index";
import uuid from "react-native-uuid";
import moment from "moment";
import LightSmallButton from "../../../../commonComponents/LightSmallbutton";
import SmallButton from "../../../../commonComponents/SmallButton";
import UpdatedCloudSheet from "../../../Popups/UpdatedCloudSheetPopup/index";
import CommonLoader from "../../../../commonComponents/CommonLoader";
import {
  track_Screen,
  track_Click_Event,
  track_Success_Event,
  track_Error_Event,
} from "../../../../eventTracking/index";
import {
  eventName,
  screenName,
  clickName,
  errorActionName,
  successActionName,
} from "../../../../utils/Constant";
import SelectDropdown from "react-native-select-dropdown";
import Dropdowsideicon from "../../../../assets/Images/dropdown.svg";
import { Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
declare global {
  var labels: any;
}

const RowdetailForm = (props: any) => {
  var labels = global.labels;
  const navigation = useNavigation();
  const route = useRoute();
  const childRef = useRef();
  const snapPoints = ["100%"];
  const [open, setopen] = useState(false);
  const [defaultdate, setdefaultdate] = useState(new Date());
  const [date, setdate] = useState("");
  const [spreadSheet, setSpreadSheet] = useState(route?.params?.spreadSheet);
  const [isEdit, setIsEdit] = useState(route?.params?.isEdit);
  const [spreadSheetRowItems, setSpreadsheetRowItems] = useState();
  const [spreadSheetRowData, setSpreadSheetRowData] = useState(
    route.params.spreadSheetRow
  );
  const [isFromScreen, setIsFromScreen] = useState(route?.params?.isFrom);
  const [columns, setColumns] = useState([]);
  const [updatedFormData, setUpdatedFormData] = useState({});
  const { reset, control, handleSubmit, setValue, register } = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [extraData, setExtraData] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const [mount, setMount] = useState(true);
  const Dropdown = (index: any, data: any) => {};
  const getYesNo = ["Yes", "No"];
  const [rowCount, setRowCount]  = useState(0)

  // --------------Initial rendering-------------------
  useEffect(() => {
    console.log("spreadDetail======", route.params?.spreadSheet);
    console.log("spreadEdit======", route.params?.isEdit);
    console.log("spreadRow======", route.params?.spreadSheetRow);
    console.log("isFromScreen=======", route.params?.isFrom);
    getRowCount()
    if (!isEdit) {
      getColumnByID(route?.params?.spreadSheet?.templatesID);
    }
    return () => {
      setMount(false);
      setIsEdit(false);
    };
  }, [isEdit, mount]);

  useEffect(() => {
    if (isEdit) {
      track_Screen(
        eventName.TRACK_SCREEN,
        screenName.ADD_SPREADSHEET_ROW_SCREEN
      );
      setSpreadsheetRowItems(JSON.parse(route?.params?.spreadSheetRow?.items));
      console.log(
        "SelectedItem==========",
        route?.params?.spreadSheetRow?.items
      );
      setExtraData(new Date());
      setDefaultFormValue(JSON.parse(route?.params?.spreadSheetRow?.items));
    } else {
      track_Screen(
        eventName.TRACK_SCREEN,
        screenName.EDIT_SPREADSHEET_ROW_SCREEN
      );
    }
  }, [isEdit, mount]);

  // ------------- set form Value on Edit -----------

  const setDefaultFormValue = (columnValue: any) => {
    let arr1 = columnValue;
    arr1.forEach((element: any) => {
      if (element.column_Type == "Date") {
        setValue(element.column_Name, element.column_Value);
      }
      if (element.column_Type == "Yes/No") {
        setValue(element.column_Name, element.column_Value);
      }
    });
    arr1.sort(function (a, b) {
      return a.column_Index - b.column_Index;
    });
    setColumns(arr1);
  };

  //  ------------- GetSpreadSheetRow Count -----------
  const getRowCount = ()=>{
    getSpreadSheetRowBy_userId().then((response: any)=>{
      console.log("rowResp=========",response)
      let rowCount = response.data.spreadSheetRowsByUserID.items.length
      setRowCount(rowCount)
    }).catch((error)=>{
      console.log("rowErr=======",error)
    })
  }

  // ----------- check RowCount ---------------
  const checkRowCount = (data:any)=>{
    if(global.isPremium == 'false' && rowCount >= labels.trialConstants.trial_Record_Limit){
        Alert.alert(labels.limitConstants.Record_Limit_Exceed)
    }else{
      onSubmitPressed(data)
    }
  }

  // --------------Create Row Data-----------------
  const onSubmitPressed = async (data: any) => {
    console.log("use form data======>", data);
    let existingCol = columns;
    let newArr = [];
    let keys = Object.keys(data);
    console.log("allKeys=======", keys);
    existingCol.forEach((col: any) => {
      keys.forEach((keys: any) => {
        if (keys == col.column_Name) {
          let key = keys;
          let obj = {};
          // obj[key] = data[keys];
          obj.column_Name = keys;
          obj.column_Value = data[keys];
          obj.column_Type = col.column_Type;
          obj.column_Index = col.column_Index;
          console.log("updatedObj======", obj);
          newArr.push(obj);
        }
      });
    });

    console.log("updatedArray========", newArr);

    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.CLICK_ON_ADD_SPREADSHEET_ROW
    );

    let uid = uuid.v1().toString();
    let timeStamp = moment().unix().toString();
    let newUniqueId = uid + "-" + timeStamp;
    let newRow = {
      id: newUniqueId,
      userID: spreadSheet?.userID,
      templatesID: spreadSheet?.templatesID,
      spreadsheetID: spreadSheet?.id,
      items: JSON.stringify(newArr),
      soft_Deleted: false,
    };
    console.log("UpdatedRow=======", newRow);
    setLoader(true);
    create_SpreadSheet_Row(newRow)
      .then((response) => {
        track_Success_Event(
          eventName.TRACK_SUCCESS_ACTION,
          successActionName.CREATE_SPREADSHEET_ROW_SUCCESSFULLY
        );
        setLoader(false);
        console.log("spreadRowResp==========", response);
        reset();
        navigation.navigate("Attendancelist", {
          spreadSheet: spreadSheet,
          isFrom: isFromScreen,
        });
      })
      .catch((error) => {
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.CREATE_SPREADSHEET_ROW_ERROR
        );
        setLoader(false);
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        console.log("spreadRowErr========", error);
      });
  };

  // -------------After update Navigation-----------------F
  const cancelModal = () => {
    setModalVisible(false);
    if (isFromScreen == "TemplateTab") {
      navigation.navigate("CreateTemplate");
    } else if (isFromScreen == "HomeTab") {
      navigation.navigate("DashBoardTab");
    } else {
      navigation.navigate("ClousheetList");
    }
  };

  // ----------- Update Row -----------
  const onUpdateRows = (data: any) => {
    console.log("updatedRowData======", data);
    let existingCol = columns;
    let newArr = [];
    let keys = Object.keys(data);
    console.log("allKeys=======", keys);
    existingCol.forEach((col: any) => {
      keys.forEach((keys: any) => {
        if (keys == col.column_Name) {
          let key = keys;
          let obj = {};
          // obj[key] = data[keys];
          obj.column_Name = keys;
          obj.column_Value = data[keys];
          obj.column_Type = col.column_Type;
          obj.column_Index = col.column_Index;
          console.log("updatedObj======", obj);
          newArr.push(obj);
        }
      });

      console.log("UpdatedArray========", newArr);
    });
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.CLICK_ON_UPDATE_SPREADSHEET_ROW
    );
    let newRow = {
      id: spreadSheetRowData?.id,
      userID: spreadSheetRowData?.userID,
      templatesID: spreadSheetRowData?.templatesID,
      spreadsheetID: spreadSheetRowData?.spreadsheetID,
      items: JSON.stringify(newArr),
      _version: spreadSheetRowData?._version,
      soft_Deleted: spreadSheetRowData.soft_Deleted,
    };
    console.log("updateRow=========", newRow);
    setLoader(true);
    update_SpreadSheetRow(newRow)
      .then((response: any) => {
        console.log("updatedSpreadsheetRowResp=======", response);
        setLoader(false);
        track_Success_Event(
          eventName.TRACK_SUCCESS_ACTION,
          successActionName.UPDATE_SPREADSHEET_ROW_SUCCESSFULLY
        );
        setModalVisible(true);
      })
      .catch((error) => {
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.UPDATE_SPREADSHEET_ROW_ERROR
        );
        setLoader(false);
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        console.log("updateSpreadSheetRowErr========", error);
      });
    console.log("updateRowData========", newRow);
  };

  // -------- Select Date function ----------
  const toggle = (value: boolean, value2: any) => {
    console.log("dateValue=======", value, value2);
    setdate(value2);
    if (value == false) {
      setopen(false);
    }
  };

  // -------get Columnlist -----------------
  const getColumnByID = (templateId: String) => {
    setLoader(true);
    get_ColumnByTemplateId(templateId)
      .then((response: any) => {
        console.log("getColResp======", response);
        setLoader(false);
        // setColumns(response.data.templateColumnsByTemplatesID.items)
        let columnList = response.data.templateColumnsByTemplatesID.items;
        if (isEdit) {
          columnList.map((element: any, index: any) => {
            console.log("index========", index);
            if (element.column_Type == "Yes/No") {
              let rowVal = JSON.parse(route?.params?.spreadSheetRow?.items);
              element["defaultValue"] = rowVal[element.column_Name]
                ? rowVal[element.column_Name]
                : null;
              console.log("index========", index);
              setValue(element.column_Name, element.defaultValue);
            }
            if (element.column_Type == "Date") {
              let rowVal = JSON.parse(route?.params?.spreadSheetRow?.items);
              setValue(element.column_Name, rowVal[element.column_Name]);
            }
          });
          console.log("updatedValue========", columnList);
          columnList.sort(function (a, b) {
            return a.column_Index - b.column_Index;
          });
          setColumns(columnList);
          setExtraData(new Date());
        } else {
          columnList.sort(function (a, b) {
            return a.column_Index - b.column_Index;
          });
          setColumns(columnList);
        }
      })
      .catch((error) => {
        setLoader(false);
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        console.log("getColmErr=====", error);
      });
  };

  useEffect(() => {}, [open]);

  const renderItem = ({ item, index }: any) => (
    <View>
      {item.column_Type == "Sentences" ||
      item.column_Type == "Numbers" ||
      item.column_Type == "EmailPhone" ? (
        <View style={Styles.columnView}>
          <View>
            <Text style={Styles.nametext}>{item.column_Name}</Text>
          </View>
          <View style={Styles.marginTop_15}>
            <NewInputField
              defaultValue={isEdit ? item.column_Value : ""}
              name={item.column_Name}
              control={control}
              keyboardType={
                item.column_Type == "Numbers" ? "number-pad" : "default"
              }
              placeholder={item.column_Name}
              rules={{
                required: labels.Rowdetailsform.valodationmessage,
              }}
              styles={Styles.inputview}
              onBlur={() => Keyboard.dismiss()}
            />
          </View>
        </View>
      ) : item.column_Type == "Date" ? (
        <View>
          <CommonDatepicker
            open={open}
            name={item.column_Name}
            control={control}
            toggle={toggle}
            // onCancel={() => setopen(false)}
            // defaultdate={
            //   isEdit
            //     ? new Date(spreadSheetRowItems[item.column_Name])
            //     : defaultdate
            // }
          />
        </View>
      ) : item.column_Type == "Yes/No" ? (
        <View style={Styles.columnView}>
          <View>
            <Text style={Styles.nametext}>{item.column_Name}</Text>
          </View>
          <View style={Styles.marginTop_15}>
            <Controller
              control={control}
              name={item.column_Name}
              rules={{
                required: labels.Creatcloudsheetlabels.Validationmsg,
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <SelectDropdown
                    control={control}
                    data={getYesNo}
                    value={field.value}
                    defaultValue={isEdit ? item.column_Value : null}
                    onSelect={field.onChange}
                    onBlur={field.onBlur}
                    buttonStyle={Styles.buttonstyle}
                    renderDropdownIcon={(isOpened) => {
                      return isOpened ? (
                        <Dropdowsideicon />
                      ) : (
                        <Dropdowsideicon />
                      );
                    }}
                    dropdownIconPosition={"right"}
                    buttonTextStyle={Styles.dropDownBtnTextStyle}
                    dropdownStyle={Styles.dropdowmstyle}
                    rowStyle={Styles.rowStyle}
                  />
                  <View style={Styles.erroview}>
                    {error && (
                      <Text style={Styles.Textstyle}>
                        {error.message || "Error"}
                      </Text>
                    )}
                  </View>
                </>
              )}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
  const handleScreenTouch = () => {
    Keyboard.dismiss();
  };

  return (
    // <TouchableWithoutFeedback onPress={handleScreenTouch}>
    <View style={Styles.container}>
      <View>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          Folder={<Document />}
          heading={spreadSheet?.spreadsheet_name}
          onPress={navigation.canGoBack()}
        />
      </View>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        nestedScrollEnabled={true}
        style={{ flex: 1 }}
      >
        <View style={Styles.sucontainer}>
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={columns}
            renderItem={renderItem}
            extraData={extraData}
          />
        </View>
        <View style={Styles.container}></View>
        <View style={Styles.lastview}>
          {isEdit ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
          ) : (
            <Custombutton
              // onPress={handleSubmit(onSubmitPressed)}
              onPress={handleSubmit(checkRowCount)}
              Register={labels.Rowdetailsform.Submit}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
      {modalVisible ? (
        <UpdatedCloudSheet
          visible={modalVisible}
          onPress={() => cancelModal()}
        />
      ) : null}
      {loader ? <CommonLoader /> : null}
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default RowdetailForm;
