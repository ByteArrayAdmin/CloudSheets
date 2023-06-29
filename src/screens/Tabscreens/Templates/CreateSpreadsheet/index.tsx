import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
import Folder from "../../../../assets/Images/folder12.svg";
import labels from "../../../../utils/ProjectLabels.json";
import SpreadsheetCard from "./SpreardsheetCard";
import Addbutton from "../../../../assets/Images/Add.svg";
import Createspreadstyle from "./style";
import Custombutton from "../../../../commonComponents/Button";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import uuid from "react-native-uuid";
import moment from "moment";
import {
  create_Template_Column,
  get_ColumnByTemplateId,
  templateColumn_softDelete,
} from "../../../../API_Manager/index";
import ColumnCard from "./ColumnCard";
import CommonLoader from "../../../../commonComponents/CommonLoader";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import ColumnTypePopup from "../../../Popups/ColumnTypePopup";
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
  successActionName,
  errorActionName,
} from "../../../../utils/Constant";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const CreatSpreadsheet = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const columnTypeRef = useRef();
  const [Data, setData] = useState([]);
  const [template, setTemplate] = useState(route?.params?.template);
  const [templateID, setTemplateID] = useState(route?.params?.template?.id);
  const [isEdit, setIsEdit] = useState(route?.params?.isEdit);
  const [isFrom, setIsFrom] = useState(route?.params?.isFrom);
  const [userId, setUserId] = useState(route?.params?.template?.userID);
  const { control, handleSubmit, setValue, setError } = useForm();
  const [columnList, setColumnList] = useState([]);
  const [extraData, setExtraData] = useState(new Date());
  const [extraDataCol, setExtraDataCol] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const snapPoints = ["80%"];
  const [columnTypeObj, setColumTypeObj] = useState({});
  const scrollRef = useRef(null);

  // ----------- useEffect for initial Rendering---------------
  useEffect(() => {
    console.log("templateName=======", route?.params?.template);
    console.log("isEdit=========", isEdit);
    getExistingColumn();
    if (isEdit) {
      track_Screen(eventName.TRACK_SCREEN, screenName.EDIT_COLUMN_SCREEN);
    } else {
      AddColoumn();
      track_Screen(eventName.TRACK_SCREEN, screenName.ADD_COLUMN_SCREEN);
    }
  }, []);

  // ----------- Pull to refresh get Existing Colm ----------
  const onRefresh = () => {
    getExistingColumn();
  };
  // ----------- Get Existing Cloumn List---------------
  const getExistingColumn = () => {
    setLoader(true);
    get_ColumnByTemplateId(templateID)
      .then((response: any) => {
        console.log("responseCol=====", response);
        setLoader(false);
        setColumnList(response.data.templateColumnsByTemplatesID.items);
        let columnList = response.data.templateColumnsByTemplatesID.items;
        if (columnList.length == 0) {
          AddColoumn();
        }
        setExtraData(new Date());
      })
      .catch((error) => {
        setLoader(false);
        console.log("getColmErr=======", error);
      });
  };

  // --------------Create Cloumn functionality-----------------
  const onSubmit = async (data: any) => {
    console.log("ColumnArray=======", data);
    const pairs = Object.entries(data);
    const objectsWithPairs = pairs.reduce((result, [key, value], index) => {
      if (index % 2 === 0) {
        // Create a new object with pairs of keys and values
        result.push({ [key]: value });
      } else {
        // Add the value to the previous object
        result[result.length - 1][key] = value;
      }
      return result;
    }, []);
    console.log("updatedColumnArray=======", objectsWithPairs);

    const newArray = objectsWithPairs.map((obj) => {
      const keys = Object.keys(obj); // Get the keys of the object
      const newKeys = keys.map((key) => {
        // Map over the keys array and modify the keys
        return key.slice(0, key.lastIndexOf(" ")); // Remove the last word from the key
      });
      const newObj = {}; // Create a new object
      keys.forEach((key, i) => {
        // Iterate over the keys of the original object
        newObj[newKeys[i]] = obj[key]; // Assign the modified key and value to the new object
      });

      return newObj; // Return the modified object
    });
    console.log("updatedArr==========", newArray);
    console.log("arrWithID===========", Data);

    newArray.map((el: any, index) => {
      console.log("arrayIndex======", index);
      el.id = Data[index].id;
      el.templatesID = Data[index].templatesID;
      el.soft_Deleted = Data[index].soft_Deleted;
      el.userID = Data[index].userID;
      el.column_Index = Data[index].column_Index;
      return el;
    });
    console.log("updateArrWithID===========", newArray);
   
    setLoader(true);
    create_Template_Column(newArray)
      .then((response) => {
        track_Success_Event(
          eventName.TRACK_SUCCESS_ACTION,
          successActionName.COLUMN_CREATE_SUCCESSFULLY
        );
        setLoader(false);
        console.log("createColmResponse=========", response);
      })
      .catch((error) => {
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.CREATE_COLUMN_ERROR
        );
        setLoader(false);
        console.log("createColmErr======", error);
      });
    if (isEdit) {
      navigation.goBack();
    } else {
      navigation.navigate("AddrowClassattendance", {
        template: template,
        isFrom: isFrom,
      });
    }
  };

  // --------------Add Column functionality---------------
  const AddColoumn = () => {
    track_Click_Event(eventName.TRACK_CLICK, clickName.SELECT_ADD_COLUMN);

    let uid = uuid.v1().toString();
    let timeStamp = moment().unix().toString();
    let newUniqueId = uid + "-" + timeStamp;
    // if (!isEdit && newIndex == 0) {
    // if (columnList.length == 0 && Data.length == 0) {
    //   setValue("column_Name0", col_name);
    //   setValue("column_Type0", col_Type);
    // }

    setData((oldArray) => [
      ...Data,
      {
        id: newUniqueId,
        templatesID: templateID,
        soft_Deleted: false,
        value: "",
        userID: userId,
        column_Index: columnList.length + Data.length
      },
    ]);
    const newIndex =columnList.length + Data.length;
    // Alert.alert("myindex", newIndex)
    console.log("my index@@@@@@@@@======>", newIndex);
  };
  //==============ScrollToIndexFunctonality===============

  // --------------Remove Existing Column Alert---------------
  const removeColumnAlert = (item: any, index: any) => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.OPEN_REMOVE_COLUMN_ALERT
    );

    Alert.alert(
      labels.Creatcloudsheetlabels.Delete_Column,
      labels.Creatcloudsheetlabels.Delete_Warning,
      [
        {
          text: labels.Creatcloudsheetlabels.Cancel,
          onPress: () => {
            console.log("Cancel Pressed"),
              track_Click_Event(
                eventName.TRACK_CLICK,
                clickName.SELECT_CANCEL_REMOVE_COLUMN
              );
          },
          style: "cancel",
        },
        {
          text: labels.Creatcloudsheetlabels.OK,
          onPress: () => removeColumn(item, index),
        },
      ]
    );
  };

  // --------------Remove Existing Column Functionality---------------
  const removeColumn = (item: any, index: any) => {
    track_Click_Event(
      eventName.TRACK_CLICK,
      clickName.SELECT_DELETE_REMOVE_COLUMN
    );
    console.log("removeCol=========", item, index);
    let arr1 = columnList;
    arr1.splice(index, 1);
    setColumnList(arr1);
    setExtraData(new Date());
    let updatedColm = {
      id: item.id,
      column_Name: item.column_Name,
      column_Type: item.column_Type,
      templatesID: item.templatesID,
      soft_Deleted: true,
      _version: item._version,
    };
    setLoader(true);
    templateColumn_softDelete(updatedColm)
      .then((response: any) => {
        console.log("removeColmResp=========", response);
        track_Success_Event(
          eventName.TRACK_SUCCESS_ACTION,
          successActionName.DELETE_COLUMN_SUCCESSFULLY
        );
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        track_Error_Event(
          eventName.TRACK_ERROR_ACTION,
          errorActionName.DELETE_COLUMN_ERROR
        );
        console.log("removeColmErr=======", error);
      });
  };

  // ----------- open columnList modal ---------
  const openColumList = (columnObj: any) => {
    setColumTypeObj(columnObj);
    columnTypeRef.current.childFunction1();
  };

  // -------- onSelect Column type ---------
  const onSelectColumn = (selectedType: any) => {
    console.log("selectedColmType=======", selectedType);
    console.log("colmObj========", columnTypeObj);
    columnTypeObj;
    let arr1 = Data;
    arr1.forEach((element) => {
      if (element.id == columnTypeObj.id) {
        element.value = selectedType.name;
      }
    });
    console.log("updatedArr========", arr1);
    setData([...arr1]);
    columnTypeRef.current.childFunction2();
    setExtraDataCol(new Date());
  };

  // ------- checkValidate -------
  const onValidation = (text: string, colname: any) => {
    console.log("onchangeVal========", text, colname);

    if (isEdit) {
      if (text == "Name" && columnList.length > 0) {
        setError(colname, {
          type: "required",
          message: "Name is already added",
        });
      } else {
        setError(colname, null);
      }
    } else if (!isEdit && Data.length >= 1) {
      if (text == "Name") {
        setError(colname, {
          type: "required",
          message: "Name is already added",
        });
      } else {
        setError(colname, null);
      }
    }
  };

  // -------------- Render New Column Added -------------
  const renderItems = ({ item, index }: any) => (
    console.log("colItem=====", item),
    (
      <SpreadsheetCard
        control={control}
        setError={setError}
        // onChangeCustom={(text: string, colName: string) =>
        //   onValidation(text, colName)
        // }
        item={item}
        columnLength={columnList.length}
        index={index}
        isEdit={isEdit}
        selectColumnType={() => openColumList(item)}
      />
    )
  );

  // ------------ Render Existing Columns ------------
  const renderExistingColumn = ({ item, index }: any) => (
    <ColumnCard
      item={item}
      onPressRemove={() => removeColumnAlert(item, index)}
    />
  );

  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        // ref={scrollRef}
        // onContentSizeChange={() =>
        //   scrollRef.current.scrollToEnd({ animated: true })
        // }
        extraScrollHeight={100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView>
          <NewCommonHeader
            BackButton={<BackButton onPress={() => navigation.goBack()} />}
            Folder={<Folder />}
            heading={template?.template_name}
            onPress={navigation.canGoBack()}
          />
          <View>
            <FlatList
              style={{ marginTop: 10, marginHorizontal: 15 }}
              data={columnList}
              renderItem={renderExistingColumn}
              extraData={extraData}
              refreshing={false}
              onRefresh={onRefresh}
              keyboardShouldPersistTaps="handled"
            />
          </View>
          <View>
            <FlatList
              data={Data}
              renderItem={renderItems}
              extraData={extraDataCol}
              ref={scrollRef}
              scrollEnabled={true}
            />
            <View style={Createspreadstyle.buttonview}>
              <TouchableOpacity
                onPress={() => AddColoumn("", "")}
                style={Createspreadstyle.addcoloumbutton}
              >
                <View>
                  <Addbutton />
                </View>
                <View>
                  <Text style={Createspreadstyle.Addcolumnbuttontext}>
                    {labels.Creatcloudsheetlabels.AddNewColumn}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              {!isEdit ? (
                <Custombutton
                  onPress={handleSubmit(onSubmit)}
                  Register={labels.Creatcloudsheetlabels.CreateSpreadsheet}
                />
              ) : Data.length > 0 ? (
                <Custombutton
                  onPress={handleSubmit(onSubmit)}
                  Register={labels.Creatcloudsheetlabels.Update_Column}
                />
              ) : (
                <Custombutton
                  onPress={handleSubmit(onSubmit)}
                  Register={labels.Creatcloudsheetlabels.Done}
                />
              )}
            </View>
            <View style={Createspreadstyle.Bottomgap}></View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <CommonBottomsheet
        ref={columnTypeRef}
        snapPoints={snapPoints}
        children={
          <ColumnTypePopup
            onSelectColumn={(selectedType: any) => onSelectColumn(selectedType)}
          />
        }
      />
      {loader ? <CommonLoader /> : null}
    </>
  );
};

export default CreatSpreadsheet;
