import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import { useNavigation } from "@react-navigation/native";
import Card from "./Card";
import labels from "../../../../utils/ProjectLabels.json";
import BackButton from "../../../../commonComponents/Backbutton";
import Folder from "../../../../assets/Images/folder12.svg";
import Addwidgeticon from "../../../../assets/Images/Addwidgeticon.svg";
import { styles } from "./style";

const TabBarTemplateList = () => {
  const DATA = useState([{ id: 1 }, { id: 1 }]);
  const navigation = useNavigation();

  const renderItems = () => <TouchableOpacity onPress={() => navigation.navigate("ExpensesList")}><Card /></TouchableOpacity>;
  return (
    <>
      <View>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          heading={labels.TabBarTemplateList.Template}
          Folder={<Folder />}
        />
        <View style={styles.Flatlistviewone}>
          <FlatList data={DATA} renderItem={renderItems} />
        </View>
      </View>
      <View style={styles.widgetposition}>
        <Addwidgeticon />
      </View>
    </>
  );
};

export default TabBarTemplateList;
