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
import { get_CloudsheetByUserID, current_UserInfo, create_Template } from '../../../../API_Manager/index';
import { useNavigation, useRoute } from "@react-navigation/native";
import CreateTemplatePopup from '../../../Popups/CreateTemplatePopup';
import uuid from 'react-native-uuid';
import moment from 'moment';

const ClousheetList = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  const ChildRef = useRef();
  const createTemplateRef = useRef();
  const snapPoints = ["40%", "50%"];
  const navigation = useNavigation()
  const [cloudSheetList, setCloudSheetList] = useState([])
  const [userId, setUserId] = useState('')
  const [count, setCount] = useState(1)
  const [isEditTemplate, setIsEditTemplate] = useState(false)

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
    get_CloudsheetByUserID(userID).then((response: any) => {
      console.log('cloudsheetRespByuserID========', response)
      setCloudSheetList(response.data.spreadSheetsByUserID.items)
    }).catch((error) => {
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

    create_Template(newTemplate).then((response: any) => {
      console.log("createTempResp=======", response)
      createTemplateRef.current.childFunction2();
      navigation.navigate("CreatSpreadsheet", { template: response.data.createTemplates, isEdit: isEditTemplate, isFrom: "CloudSheetTab" });
    }).catch((err) => {
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

  const Footer = () => {
    return <View style={{ height: bottomTabHeight }} />;
  };

  const renderItems = ({ item, index }: any) => (
    console.log("items=======", item),
    <TouchableOpacity
      onPress={() => onDoubleTab(item)}
    >
      <Cloudsheetcard index={index} item={item} />
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
      </View>
    </>
  );
};

export default ClousheetList;
