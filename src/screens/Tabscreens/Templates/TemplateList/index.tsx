import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import labels from "../../../../utils/ProjectLabels.json";
import BackButton from "../../../../commonComponents/Backbutton";
import Folder from "../../../../assets/Images/folder12.svg";
import HeadingCard from "./HeadingCard";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import CloudsheetListCard from "./CloudsheetListcard";
import Addwidgeticon from "../../../../assets/Images/Addwidgeticon.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import FlatlistHeader from './FlatlistHeader';
import { styles } from "./styles";
import { getCloudsheetByTemplateID } from '../../../../API_Manager/index';

const TemplateList = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const [template, setTemplate] = useState(route?.params?.template)
  const [templateId, setTemplateId] = useState(route?.params?.template?.id)
  const [spreadSheetList, setSpreadSheetList] = useState([])
  const [count, setCount] = useState(1)

  // -------------- initial Render-------------
  useEffect(() => {
    console.log("template======", route?.params?.template)
    get_SpreadsheetByTemplateID()
  }, [])

  // --------------- On Refresh SpreadSheet ---------
  const onRefresh = () => {
    get_SpreadsheetByTemplateID()
  }

  // ------------- Get SpreadSheetList------------
  const get_SpreadsheetByTemplateID = () => {
    getCloudsheetByTemplateID(templateId).then((response: any) => {
      console.log("getSpreadByTempResp=========", response)
      setSpreadSheetList(response.data.spreadSheetsByTemplatesID.items)
    }).catch((error) => {
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

  const ListCard = ({ item, index }: any) => (
    <TouchableOpacity
      onPress={() => onDoubleTab(item)}
    >
      <CloudsheetListCard index={index} item={item} />
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
          ListHeaderComponent={<FlatlistHeader template={template} />}
        />
      </View>
      <View style={styles.widgetposition}>
        <Addwidgeticon />
      </View>
    </View>
  );
};
export default TemplateList;
