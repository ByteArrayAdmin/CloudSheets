/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity, Text, DeviceEventEmitter } from "react-native";
import FlatListHeader from "./FlatlistHeader";
import Cloudsheetcard from "./Cloudsheetcard";
import { styles } from "./style";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Addwidget from "../../../../assets/Images/Addwidgeticon.svg";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import CreatecloudsheetPopup from "../../../Popups/CreateCloudsheets.tsx";
import SearcBar from "../../../../commonComponents/Searchbar";
import Clousheetlistscreen from "../../../../utils/ProjectLabels.json";
import { get_CloudsheetByUserID, current_UserInfo, create_Template, update_SpreadSheet } from '../../../../API_Manager/index';
import { useNavigation, useRoute } from "@react-navigation/native";
import CreateTemplatePopup from '../../../Popups/CreateTemplatePopup';
import CreateCloudSheetNamePopup from '../../../Popups/CreateCloudSheetNamePopup/index';
import Popup from "../../../Popups/TemplateEditPopup";
import uuid from 'react-native-uuid';
import moment from 'moment';
import CommonLoader from '../../../../commonComponents/CommonLoader';

const ClousheetList = () => {
  // --------- File States ----------
  const bottomTabHeight = useBottomTabBarHeight();
  const ChildRef = useRef();
  const createTemplateRef = useRef();
  const openthreeDotRef = useRef()
  const openCloudSheetEditRef = useRef()
  const snapPoints = ["40%", "50%"];
  const editCloudSheetSnapPoint = ["60%"]
  const [error, setError] = useState("")
  const navigation = useNavigation()
  const [cloudSheetList, setCloudSheetList] = useState([])
  const [isEditCloudSheetName, setIsEditCloudSheetName] = useState(false)
  const [userId, setUserId] = useState('')
  const [count, setCount] = useState(1)
  const [isEditTemplate, setIsEditTemplate] = useState(false)
  const [selectedCloudSheet, setSelectedCloudSheet] = useState({})
  const [extraData, setExtraData] = useState(new Date())
  const [loader, setLoader] = useState(false)

  // -------------- Initial Rendering ------------
  useEffect(() => {
    console.log("currentUser=======", global.isLoggedInUser)
    DeviceEventEmitter.addListener('updateSpreadSheetList', () => get_CurrentUserId())
    get_CurrentUserId()
  }, [])

  // ------------ Get Current userId -------------
  const get_CurrentUserId = () => {
    current_UserInfo().then((response: any) => {
      console.log("currentUserResp======", response.attributes.sub)
      get_CloudsheetBy_UserID(response.attributes.sub)
      setUserId(response.attributes.sub)
    }).catch((error) => {
      console.log("userIdErr=======", error)
    })
  }

  // ----------- getCloudSheet Pull to refresh -----------
  const onRefreshList = () => {
    get_CloudsheetBy_UserID(userId)
  }

  // ----------- get CloudSheet List ------------
  const get_CloudsheetBy_UserID = (userID: any) => {
    setLoader(true)
    get_CloudsheetByUserID(userID).then((response: any) => {
      setLoader(false)
      console.log('cloudsheetRespByuserID========', response)
      setCloudSheetList(response.data.spreadSheetsByUserID.items)
    }).catch((error) => {
      setLoader(false)
      console.log("cloudSheetErr=======", error)
    })
  }

  // -------------- OnDouble Click navigation -----------
  const onDoubleTab = (spreadSheetDetail: any) => {
    setCount(count + 1)
    console.log("totalCount======", count)
    if (count == 2) {
      navigation.navigate("ExpensesList", { spreadSheetDetail: spreadSheetDetail, isFrom: "CloudSheetTab" })
    } else {
      setTimeout(() => {
        setCount(1)
      }, 3000);
    }
  }

  // ----------- Create Template ------------
  const onCreateTemplate = (templateName: String) => {
    console.log("templateName===========", templateName)
    let uid = uuid.v1().toString()
    let timeStamp = moment().unix().toString()
    let newUniqueId = uid + "-" + timeStamp
    console.log("UniqueId========", newUniqueId)
    const newTemplate = {
      id: newUniqueId,
      template_name: templateName,
      userID: userId
    }
    console.log("rowData======", newTemplate)
    setLoader(true)
    create_Template(newTemplate).then((response: any) => {
      setLoader(false)
      console.log("createTempResp=======", response)
      createTemplateRef.current.childFunction2();
      navigation.navigate("CreatSpreadsheet", { template: response.data.createTemplates, isEdit: isEditTemplate, isFrom: "CloudSheetTab" });
    }).catch((err) => {
      setLoader(false)
      console.log("createTempErr=======", err)
    })
  }

  // ------------ Open select Template Type Popup ------------
  const Opensheet = () => {
    ChildRef.current.childFunction1();
  };

  // ----------- Create New Template Popup -----------
  const openNewTemplate = () => {
    ChildRef.current.childFunction2();
    createTemplateRef.current.childFunction1();
  }

  // ------------ On Select Existing Template ---------
  const onExistingTemplate = () => {
    ChildRef.current.childFunction2();
    navigation.navigate("ExistingTemplateList")
  }

  // ------- Open CloudSheet Action Modal -------
  const openEditCloudSheetPopup = (selectedCloudSheet: any) => {
    console.log("selectedCloudSheet=======", selectedCloudSheet)
    setSelectedCloudSheet(selectedCloudSheet)
    openthreeDotRef.current.childFunction1();
  }

  // -------- onEdit CloudSheet ---------
  const openEditCloudSheet = () => {
    setIsEditCloudSheetName(true)
    openthreeDotRef.current.childFunction2();
    openCloudSheetEditRef.current.childFunction1();
  }

  // ------- Close Edit CloudSheet Modal ---------
  const OnCloseEditCloudSheetModal = () => {
    setIsEditCloudSheetName(false)
    openCloudSheetEditRef.current.childFunction2();
  }

  // ----------- Update CloudSheet -------------
  const onUpdateCloudSheet = (text: String, templateId: String, version: any, spreadSheetId: String, userId: String) => {
    let arr1 = cloudSheetList
    arr1.forEach(element => {
      if (element.id == spreadSheetId) {
        element.spreadsheet_name = text
      }
    });
    setCloudSheetList(arr1)
    setExtraData(new Date())
    setIsEditCloudSheetName(false)
    openCloudSheetEditRef.current.childFunction2();
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

  const Footer = () => {
    return <View style={{ height: bottomTabHeight }} />;
  };

  const renderItems = ({ item, index }: any) => (
    console.log("items=======", item),
    <TouchableOpacity
      onPress={() => onDoubleTab(item)}
    >
      <Cloudsheetcard index={index} item={item} onClickThreeDot={() => openEditCloudSheetPopup(item)} />
    </TouchableOpacity>
  );

  return (
    <>
      <FlatListHeader />
      <View style={styles.inputserachview}>
        <SearcBar
          placeholder={Clousheetlistscreen.cloudsheetlistconstant.SEARCH_SHEETS}
        />
      </View>
      <View style={styles.recentcloudview}>
        <View>
          <Text style={styles.recentcloudtext}>
            {Clousheetlistscreen.cloudsheetlistconstant.RECENT_CLOUD_SHEETS}
          </Text>
        </View>
        <View style={styles.lastview} />
        <View>
          <Text style={styles.viewalltext}>
            {Clousheetlistscreen.cloudsheetlistconstant.VIEWALL}
          </Text>
        </View>
      </View>
      <View style={styles.flatlistview}>
        <FlatList
          data={cloudSheetList}
          renderItem={renderItems}
          refreshing={false}
          onRefresh={onRefreshList}
          extraData={extraData}
          //keyExtractor={item => item._id}
          ListFooterComponent={<Footer />}
        />
        <TouchableOpacity onPress={Opensheet} style={styles.widgetstyle}>
          <Addwidget />
        </TouchableOpacity>
        <CommonBottomsheet
          ref={createTemplateRef}
          snapPoints={snapPoints}
          children={
            <CreateTemplatePopup
              isEditTemplate={isEditTemplate}
              selectedTemplate={null}
              onCreateTemplate={(templateName: String) => onCreateTemplate(templateName)}
              onUpdateTemplate={(templateName: any, templateId: any, version: any) => { }}
            />}
        />
        <CommonBottomsheet
          ref={ChildRef}
          snapPoints={snapPoints}
          children={<CreatecloudsheetPopup
            inNewTemplate={() => openNewTemplate()}
            inExistingTemplate={() => onExistingTemplate()}
          />
          }
        />

        <CommonBottomsheet
          ref={openCloudSheetEditRef}
          snapPoints={snapPoints}
          children={<CreateCloudSheetNamePopup
            OnClose={() => OnCloseEditCloudSheetModal()}
            error={error}
            selectedCloudSheet={selectedCloudSheet}
            isEditCloudSheetName={isEditCloudSheetName}
            onUpdateCloudSheet={(text: String, templateId: String, version: any, spreadSheetId: String, userId: String) => onUpdateCloudSheet(text, templateId, version, spreadSheetId, userId)}
          // onCreateSpreadSheet={(SpreadSheetname: String) => spreadSheetValidation(SpreadSheetname)}
          />
          }
        />
        <CommonBottomsheet
          snapPoints={editCloudSheetSnapPoint}
          ref={openthreeDotRef}

          children={<Popup
            selectedCloudSheet={selectedCloudSheet}
            onEditCloudSheet={() => openEditCloudSheet()}
          />
          }
        />
      </View>
      {loader ? <CommonLoader /> : null}
    </>
  );
};

export default ClousheetList;
