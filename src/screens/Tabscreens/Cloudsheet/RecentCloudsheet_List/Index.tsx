/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity, Text } from "react-native";
import FlatListHeader from "./FlatlistHeader";
import Cloudsheetcard from "./Cloudsheetcard";
import { styles } from "./style";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Addwidget from "../../../../assets/Images/Addwidgeticon.svg";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import CreatecloudsheetPopup from "../../../Popups/CreateCloudsheets.tsx";
import SearcBar from "../../../../commonComponents/Searchbar";
import Clousheetlistscreen from "../../../../utils/ProjectLabels.json";
import {get_CloudsheetByUserID, current_UserInfo} from '../../../../API_Manager/index';

const ClousheetList = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  const Data = [
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
  ];

  const ChildRef = useRef();
  const snapPoints = ["40%", "50%"];
  const [cloudSheetList, setCloudSheetList] = useState([])
  const [userId, setUserId] = useState('')

  useEffect(()=>{
    get_CurrentUserId()
  }, [])

  

  const get_CurrentUserId = ()=>{
    current_UserInfo().then((response: any)=>{
        console.log("currentUserResp======",response.attributes.sub)
        get_CloudsheetBy_UserID(response.attributes.sub)
        setUserId(response.attributes.sub)
    }).catch((error)=>{
      console.log("userIdErr=======",error)
    })
  }
  const onRefreshList = () => {
    get_CloudsheetBy_UserID(userId)
  }

  const get_CloudsheetBy_UserID = (userID:any)=>{
    get_CloudsheetByUserID(userID).then((response: any)=>{
      console.log('cloudsheetRespByuserID========',response)
      setCloudSheetList(response.data.spreadSheetsByUserID.items)
    }).catch((error)=>{
      console.log("cloudSheetErr=======",error)
    })
  }

  const Opensheet = () => {
    ChildRef.current.childFunction1();
  };
  const Footer = () => {
    return <View style={{ height: bottomTabHeight }} />;
  };

  const renderItems = ({item,index}: any) => <Cloudsheetcard index={index} item={item} />;

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
          ref={ChildRef}
          snapPoints={snapPoints}
          children={<CreatecloudsheetPopup />}
        />
      </View>
    </>
  );
};

export default ClousheetList;
