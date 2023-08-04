import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
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
  get_ColumnByTemplateId,
  get_CloudsheetByUserID,
} from "../../../../API_Manager/index";
import { track_Screen } from "../../../../eventTracking/index";
import { screenName, eventName } from "../../../../utils/Constant";
import CommonLoader from '../../../../commonComponents/CommonLoader';
declare global {
  var labels: any;
}

const ExistingTemplateList = () => {
  var labels = global.labels;
  const navigation = useNavigation();
  const [templateList, setTemplateList] = useState([]);
  const [userId, setUserId] = useState("");
  const [cloudSheetCount, setCloudSheetCount] = useState(0);
  const [loader, setLoader] = useState(false);

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
        getCloudsheetByUserID();
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

  // ----------- Get CloudSheet by UserId -------------
  const getCloudsheetByUserID = () => {
    get_CloudsheetByUserID(global.userID)
      .then((response: any) => {
        console.log("cloudSheet========", response);
        let cloudSheetLength = response.data.spreadSheetsByUserID.items.length;
        setCloudSheetCount(cloudSheetLength);
      })
      .catch((error) => {
        console.log("getCloudsheetErr=========", error);
      });
  };

  // ----------- Get Template List ----------
  const getTemplateList = (userId: any) => {
    setLoader(true)
    get_Template_List(userId)
      .then((response: any) => {
        console.log("templateResp=======", response);
        setLoader(false)
        setTemplateList(response.data.templatesByUserID.items);
      })
      .catch((error) => {
        setLoader(false)
        console.log("getTempalteErr========", error);
      });
  };

  // ------------- Get Template Column By TemplateID --------------
  const getTemplateColumn = (item: any) => {
    setLoader(true)
    get_ColumnByTemplateId(item.id)
      .then((response: any) => {
        console.log("colResp==========", response);
        setLoader(false)
        let cloumnLength =
          response.data.templateColumnsByTemplatesID.items.length;
        if (cloumnLength > 0) {
          if (
            global.isPremium == "false" &&
            cloudSheetCount >= labels.trialConstants.trial_Cloudsheet_Limit
          ) {
            Alert.alert(labels.limitConstants.CloudSheet_Limit_Exceed);
          } else {
            navigation.navigate("AddrowClassattendance", {
              template: item,
              isFrom: "CloudSheetTab",
            });
          }
        }else{
          Alert.alert(
            labels.ExpensesList.ColumnAlert,
            labels.ExpensesList.ColumnError,
            [{ text: labels.ExpensesList.OK, onPress: () => {} }]
          );
        }
      })
      .catch((error) => {
        console.log("colErr==========", error);
        setLoader(false)
      });
  };

  const renderItems = ({ item }: any) => (
    console.log("tempItem========", item),
    (
      <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate("AddrowClassattendance", {
        //     template: item,
        //     isFrom: "CloudSheetTab",
        //   })
        // }
        onPress={() => getTemplateColumn(item)}
        // onPress={() => onDoubleTab(item)}
      >
        <TemplateCard item={item} />
      </TouchableOpacity>
    )
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
      {loader? <CommonLoader/>:null}
    </View>
  );
};

export default ExistingTemplateList;
