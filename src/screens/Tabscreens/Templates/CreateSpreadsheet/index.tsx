import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert
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
import uuid from 'react-native-uuid';
import moment from 'moment';
import { create_Template_Column, get_ColumnByTemplateId, templateColumn_softDelete } from '../../../../API_Manager/index';
import ColumnCard from './ColumnCard';
import CommonLoader from '../../../../commonComponents/CommonLoader';

const CreatSpreadsheet = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const [Data, setData] = useState([]);
  const [template, setTemplate] = useState(route?.params?.template)
  const [templateID, setTemplateID] = useState(route?.params?.template?.id)
  const [isEdit, setIsEdit] = useState(route?.params?.isEdit)
  const [isFrom, setIsFrom] = useState(route?.params?.isFrom)
  const { control, handleSubmit } = useForm();
  const [columnList, setColumnList] = useState([]);
  const [extraData, setExtraData] = useState(new Date())
  const [loader, setLoader] = useState(false)

  // ----------- useEffect for initial Rendering---------------
  useEffect(() => {
    console.log("templateName=======", route?.params?.template)
    console.log("isEdit=========", isEdit)
    if (isEdit) {
      getExistingColumn()
    } else {
      AddColoumn()
    }
  }, [])

  // ----------- Pull to refresh get Existing Colm ----------
  const onRefresh = () => {
    getExistingColumn()
  }
  // ----------- Get Existing Cloumn List---------------
  const getExistingColumn = () => {
    setLoader(true)
    get_ColumnByTemplateId(templateID).then((response: any) => {
      console.log("responseCol=====", response)
      setLoader(false)
      setColumnList(response.data.templateColumnsByTemplatesID.items)
    }).catch((error) => {
      setLoader(false)
      console.log("getColmErr=======", error)
    })
  }

  // --------------Create Cloumn functionality-----------------
  const onSubmit = async (data: any) => {
    console.log("ColumnArray=======", data)
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

    const newArray = objectsWithPairs.map(obj => {
      const keys = Object.keys(obj); // Get the keys of the object
      const newKeys = keys.map(key => { // Map over the keys array and modify the keys
        return key.slice(0, key.lastIndexOf(" ")); // Remove the last word from the key
      });
      const newObj = {}; // Create a new object
      keys.forEach((key, i) => { // Iterate over the keys of the original object
        newObj[newKeys[i]] = obj[key]; // Assign the modified key and value to the new object
      });

      return newObj; // Return the modified object
    });
    console.log("updatedArr==========", newArray)
    console.log("arrWithID===========", Data)

    newArray.map((el: any, index) => {
      console.log("arrayIndex======", index)
      el.id = Data[index].id;
      el.templatesID = Data[index].templatesID;
      el.soft_Deleted = Data[index].soft_Deleted
      return el
    }
    );
    console.log("updateArrWithID===========", newArray)
    setLoader(true)
    create_Template_Column(newArray).then((response) => {
      setLoader(false)
      console.log("createColmResponse=========", response)
    }).catch((error) => {
      setLoader(false)
      console.log("createColmErr======", error)
    })
    if (isEdit) {
      navigation.goBack()
    } else {
      navigation.navigate("AddrowClassattendance", { template: template, isFrom: isFrom });
    }
  };

  // --------------Add Column functionality---------------
  const AddColoumn = () => {
    const newIndex = Data.length;
    let uid = uuid.v1().toString()
    let timeStamp = moment().unix().toString()
    let newUniqueId = uid + "-" + timeStamp
    setData((oldArray) => [...Data, { id: newUniqueId, templatesID: templateID, soft_Deleted: false }]);
  };

  // --------------Remove Existing Column Alert---------------
  const removeColumnAlert = (item: any, index: any) => {
    Alert.alert(labels.Creatcloudsheetlabels.Delete_Column, labels.Creatcloudsheetlabels.Delete_Warning, [
      {
        text: labels.Creatcloudsheetlabels.Cancel,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: labels.Creatcloudsheetlabels.OK, onPress: () => removeColumn(item, index) },
    ]);
  }

  // --------------Remove Existing Column Functionality---------------
  const removeColumn = (item: any, index: any) => {
    console.log("removeCol=========", item, index)
    let arr1 = columnList
    arr1.splice(index, 1)
    setColumnList(arr1)
    setExtraData(new Date())
    let updatedColm = {
      id: item.id,
      column_Name: item.column_Name,
      column_Type: item.column_Type,
      templatesID: item.templatesID,
      soft_Deleted: true,
      _version: item._version
    }
    setLoader(true)
    templateColumn_softDelete(updatedColm).then((response: any) => {
      console.log("removeColmResp=========", response)
      setLoader(false)
    }).catch((error) => {
      setLoader(false)
      console.log("removeColmErr=======", error)
    })
  }

  const renderItems = ({ index }: any) => (
    <SpreadsheetCard control={control} index={index} />
  );

  const renderExistingColumn = ({ item, index }: any) => (
    <ColumnCard item={item} onPressRemove={() => removeColumnAlert(item, index)} />
  )

  return (
    <>
      {/* <ScrollView> */}
      <View>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          Folder={<Folder />}
          heading={template?.template_name}
          onPress={navigation.canGoBack()}
        />
        <View>
          <FlatList
            style={{ marginTop: 10, marginHorizontal: 15 }}
            data={columnList} renderItem={renderExistingColumn}
            extraData={extraData}
            refreshing={false}
            onRefresh={onRefresh}
          />
        </View>
        <View>
          <FlatList data={Data} renderItem={renderItems} />
          <View style={Createspreadstyle.buttonview}>
            <TouchableOpacity
              onPress={() => AddColoumn()}

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
            {!isEdit ?
              <Custombutton
                onPress={handleSubmit(onSubmit)}
                Register={labels.Creatcloudsheetlabels.CreateSpreadsheet}
              /> : Data.length > 0 ?
                <Custombutton
                  onPress={handleSubmit(onSubmit)}
                  Register={labels.Creatcloudsheetlabels.Update_Column}
                /> : <Custombutton
                  onPress={handleSubmit(onSubmit)}
                  Register={labels.Creatcloudsheetlabels.Done}
                />
            }
          </View>
          <View style={Createspreadstyle.Bottomgap}></View>
        </View>
      </View>
      {/* </ScrollView> */}
      {loader ? <CommonLoader /> : null}
    </>
  );
};

export default CreatSpreadsheet;
