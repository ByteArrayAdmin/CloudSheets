/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from "react";
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

  const Opensheet = () => {
    ChildRef.current.childFunction1();
  };
  const Footer = () => {
    return <View style={{ height: bottomTabHeight }} />;
  };

  const renderItems = () => <Cloudsheetcard />;

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
          data={Data}
          renderItem={renderItems}
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
