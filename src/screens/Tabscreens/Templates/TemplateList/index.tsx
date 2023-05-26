import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  DeviceEventEmitter
} from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import labels from "../../../../utils/ProjectLabels.json";
import BackButton from "../../../../commonComponents/Backbutton";
import Folder from "../../../../assets/Images/folder12.svg";
import CloudsheetListCard from "./CloudsheetListcard";
import Addwidgeticon from "../../../../assets/Images/Addwidgeticon.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import FlatlistHeader from './FlatlistHeader';
import { styles } from "./styles";
import { getCloudsheetByTemplateID, current_UserInfo, create_SpreadSheet, update_SpreadSheet } from '../../../../API_Manager/index';
import CreateCloudSheetNamePopup from '../../../Popups/CreateCloudSheetNamePopup/index';
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import Popup from "../../../Popups/TemplateEditPopup";
import uuid from 'react-native-uuid';
import moment from 'moment';
import CommonLoader from '../../../../commonComponents/CommonLoader';
const TemplateList = () => {
  // ----------- File States -----------
  const navigation = useNavigation();
  const route = useRoute()
  const child = useRef()
  const editCloudSheetRef = useRef()
  const snapPoints = ["45%"];
  const editCloudSheetSnapPoint = ["60%"];
  const [template, setTemplate] = useState(route?.params?.template)
  const [templateId, setTemplateId] = useState(route?.params?.template?.id)
  const [spreadSheetList, setSpreadSheetList] = useState([])
  const [count, setCount] = useState(1)
  const [isEditCloudSheetName, setIsEditCloudSheetName] = useState(false)
  const [userId, setUserId] = useState('')
  const [error, setError] = useState("")
  const [extraData, setExtraData] = useState(new Date())
  const [selectedCloudSheet, setSelectedCloudSheet] = useState({})
  const [loader, setLoader] = useState(false)
  // -------------- initial Render-------------
  useEffect(() => {
    console.log("template======", route?.params?.template)
    get_SpreadsheetByTemplateID()
    getUserId()
  }, [])

  // -----------------Get Curent userId----------------
  const getUserId = () => {
    current_UserInfo().then((response: any) => {
      setUserId(response.attributes.sub)
    }).catch((error) => {
      console.log("currUserErr======", error)
    })
  }

  // --------------- On Refresh SpreadSheet ---------
  const onRefresh = () => {
    get_SpreadsheetByTemplateID()
  }

  // ------------- Get SpreadSheetList------------
  const get_SpreadsheetByTemplateID = () => {
    setLoader(true)
    getCloudsheetByTemplateID(templateId).then((response: any) => {
      setLoader(false)
      console.log("getSpreadByTempResp=========", response)
      setSpreadSheetList(response.data.spreadSheetsByTemplatesID.items)
    }).catch((error) => {
      setLoader(false)
      console.log("getSpreadSheetErr=====", error)
    })
  }

  // -------------- Double Click navigation ---------------
  const onDoubleTab = (spreadSheetDetail: any) => {
    setCount(count + 1)
    console.log("totalCount======", count)
    if (count == 2) {
      navigation.navigate("ExpensesList", { spreadSheetDetail: spreadSheetDetail, isFrom: "TemplateTab" })
    } else {
      setTimeout(() => {
        setCount(1)
      }, 3000);
    }
  }

  const openCreateCloudSheetModal = () => {
    setIsEditCloudSheetName(false)
    child.current.childFunction1();
  }

  // -------- Close SpreadSheet Modal --------
  const OnClose = () => {
    child.current.childFunction2();
    setError("")
  }

  // -------- spreadSheet validation --------
  const spreadSheetValidation = (spreadSheetname: String) => {
    console.log("spreadSheetname=========", spreadSheetname)
    if (spreadSheetname == "" || spreadSheetname == undefined) {
      setError(labels.Templatelistlabel.CloudSheetError)
    } else {
      onCreateSpreadSheet(spreadSheetname)
    }
  }

  // --------- Create Spreadsheet ----------
  const onCreateSpreadSheet = (spreadSheetName: String) => {
    let uid = uuid.v1().toString()
    let timeStamp = moment().unix().toString()
    let newUniqueId = uid + "-" + timeStamp
    let newSpreadData = {
      id: newUniqueId,
      spreadsheet_name: spreadSheetName,
      templatesID: templateId,
      userID: userId
    }
    console.log("spreadSheetData=======", newSpreadData)
    let arr1 = spreadSheetList
    setLoader(true)
    create_SpreadSheet(newSpreadData).then((response: any) => {
      console.log("spreadResp=======", response)
      setLoader(false)
      arr1.push(response.data.createSpreadSheet)
      setExtraData(new Date())
      DeviceEventEmitter.emit('updateSpreadSheetList')
    }).catch((error) => {
      setLoader(false)
      console.log("spreadErr=====", error)
    })
    child.current.childFunction2();
  }

  // ----------- Open Edit CloudSheet Popup ----------
  const openEditCloudSheetPopup = (selectedCloudSheet: any) => {
    console.log("selectedCloudSheet=======", selectedCloudSheet)
    setSelectedCloudSheet(selectedCloudSheet)
    editCloudSheetRef.current.childFunction1();
  }
  // ----------- On Select Edit CloudSheet -----------
  const openEditCloudSheet = () => {
    setIsEditCloudSheetName(true)
    editCloudSheetRef.current.childFunction2();
    child.current.childFunction1();
  }

  // ----------- Update CloudSheet -------------
  const onUpdateCloudSheet = (text: String, templateId: String, version: any, spreadSheetId: String, userId: String) => {
    let arr1 = spreadSheetList
    arr1.forEach(element => {
      if (element.id == spreadSheetId) {
        element.spreadsheet_name = text
      }
    });
    setSpreadSheetList(arr1)
    setExtraData(new Date())
    setIsEditCloudSheetName(false)
    child.current.childFunction2();
    let newSpreadData = {
      id: spreadSheetId,
      spreadsheet_name: text,
      templatesID: templateId,
      userID: userId,
      _version: version
    }
    setLoader(true)
    update_SpreadSheet(newSpreadData).then((response) => {
      setLoader(false)
      console.log("updateResp=======", response)
    }).catch((error) => {
      setLoader(false)
      console.log("updateCloudSheetErr========", error)
    })
  }

  const ListCard = ({ item, index }: any) => (
    <TouchableOpacity
      onPress={() => onDoubleTab(item)}
    >
      <CloudsheetListCard index={index} item={item} openEditCloudSheetPopup={() => openEditCloudSheetPopup(item)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NewCommonHeader
        BackButton={<BackButton onPress={() => navigation.goBack()} />}
        heading={labels.Templatelistlabel.Template}
        Folder={<Folder />}
      />
      <View style={styles.secondflatlistview}>
        <FlatList
          data={spreadSheetList}
          renderItem={ListCard}
          refreshing={false}
          onRefresh={onRefresh}
          extraData={extraData}
          ListHeaderComponent={<FlatlistHeader template={template} />}
        />
      </View>
      <TouchableOpacity style={styles.widgetposition}
        onPress={() => openCreateCloudSheetModal()}
      >
        <Addwidgeticon />
      </TouchableOpacity>
      <CommonBottomsheet
        ref={child}
        snapPoints={snapPoints}
        children={<CreateCloudSheetNamePopup
          OnClose={() => OnClose()}
          error={error}
          selectedCloudSheet={selectedCloudSheet}
          isEditCloudSheetName={isEditCloudSheetName}
          onUpdateCloudSheet={(text: String, templateId: String, version: any, spreadSheetId: String, userId: String) => onUpdateCloudSheet(text, templateId, version, spreadSheetId, userId)}
          onCreateSpreadSheet={(SpreadSheetname: String) => spreadSheetValidation(SpreadSheetname)}
        />
        }
      />
      <CommonBottomsheet
        snapPoints={editCloudSheetSnapPoint}
        ref={editCloudSheetRef}

        children={<Popup
          selectedCloudSheet={selectedCloudSheet}
          onEditCloudSheet={() => openEditCloudSheet()}
        />
        }
      />
      {loader?<CommonLoader/>:null}
    </View>
  );
};
export default TemplateList;
