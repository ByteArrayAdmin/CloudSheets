import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import { styles } from "./styles";
import BackButton from "../../../../commonComponents/Backbutton";
import { useNavigation } from "@react-navigation/native";
import Folder from "../../../../assets/Images/folder12.svg";
// import labels from "../../../../utils/ProjectLabels.json";
import TemplateCard from "./TemplateCard";
import {
  get_Template_List,
  current_UserInfo,
} from "../../../../API_Manager/index";
import { track_Screen } from "../../../../eventTracking/index";
import { screenName, eventName } from "../../../../utils/Constant";
declare global {
  var labels: any;
}

const ExistingTemplateList = () => {
  var labels = global.labels;
  const navigation = useNavigation();
  const [templateList, setTemplateList] = useState([]);
  const [userId, setUserId] = useState("");

  // ------------ Initial Rendering -----------
  useEffect(() => {
    getUserId();
    track_Screen(
      eventName.TRACK_SCREEN,
      screenName.EXISTING_TEMPLATE_LIST_SCREEN
    );
  }, []);

  // --------- Get Current userId ---------
  const getUserId = () => {
    current_UserInfo()
      .then((response: any) => {
        setUserId(response.attributes.sub);
        getTemplateList(response.attributes.sub);
        console.log("currentUser=========", response);
      })
      .catch((error) => {
        console.log("currUserErr======", error);
      });
  };
  // ------------- Pull to refresh GetTemplate List -----------
  const onRefreshList = () => {
    getTemplateList(userId);
  };

  // ----------- Get Template List ----------
  const getTemplateList = (userId: any) => {
    get_Template_List(userId)
      .then((response: any) => {
        console.log("templateResp=======", response);
        setTemplateList(response.data.templatesByUserID.items);
      })
      .catch((error) => {
        console.log("getTempalteErr========", error);
      });
  };

  const renderItems = ({ item }: any) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AddrowClassattendance", {
          template: item,
          isFrom: "CloudSheetTab",
        })
      }
      // onPress={() => onDoubleTab(item)}
    >
      <TemplateCard item={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainView}>
      <View style={styles.container}>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          heading={labels.TabBarTemplateList.Template}
          Folder={<Folder />}
        />
        <View style={styles.Flatlistviewone}>
          <FlatList
            data={templateList}
            renderItem={renderItems}
            refreshing={false}
            onRefresh={onRefreshList}
          />
        </View>
      </View>
    </View>
  );
};

export default ExistingTemplateList;
