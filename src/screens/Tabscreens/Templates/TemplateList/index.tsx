import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import labels from "../../../../utils/ProjectLabels.json";
import BackButton from "../../../../commonComponents/Backbutton";
import Folder from "../../../../assets/Images/folder12.svg";
import HeadingCard from "./HeadingCard";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import CloudsheetListCard from "./CloudsheetListcard";
import Addwidgeticon from "../../../../assets/Images/Addwidgeticon.svg";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

const TemplateList = () => {
  const navigation = useNavigation();
  const Data = [{ id: 1 }];
  const Datatwo = [{ id: 1 }, { id: 1 }];
  const renderItems = () => <HeadingCard />;
  const ListCard = () => <CloudsheetListCard />;
  return (
    <View style={styles.container}>
      <NewCommonHeader
        BackButton={<BackButton onPress={() => navigation.goBack()} />}
        heading={labels.Templatelistlabel.Template}
        Folder={<Folder />}
      />

      <View style={styles.Flatlistviewone}>
        <FlatList data={Data} renderItem={renderItems} />
      </View>
      <View style={styles.recentlistview}>
        <View>
          <Text style={styles.listext}>{labels.Templatelistlabel.Listtxt}</Text>
        </View>
        <View style={styles.space}></View>
        <View>
          <Text style={styles.viewalltext}>
            {labels.Templatelistlabel.ViewAll}
          </Text>
        </View>
      </View>

      <View style={styles.secondflatlistview}>
        <FlatList data={Datatwo} renderItem={ListCard} />
      </View>
      <View style={styles.widgetposition}>
        <Addwidgeticon />
      </View>
    </View>
  );
};
export default TemplateList;
