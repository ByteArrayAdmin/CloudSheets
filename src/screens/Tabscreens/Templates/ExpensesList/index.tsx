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
import NewCommonHeader from ".././../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
import labels from "../../../../utils/ProjectLabels.json";
import { useNavigation } from "@react-navigation/native";
import Doclogo from "../../../../assets/Images/documentdark.svg";
import SearcBar from "../../../../commonComponents/Searchbar";
import ListCard from "./ListCard";
import { Styles } from "../RowDetailForm/style";
import { COLOURS, FONTS } from "../../../../utils/Constant";

const ExpensesList = () => {
  const navigation = useNavigation();
  const DATA = [
    { id: 1, itemname: "Grocery" },
    {
      id: 2,
      itemname: "FoodItems",
      ExpenseName: "FoodItems",
      ExpensesDate: "16 January,2023",
      ExpensesType: "Scan Code",
      ExpensesAmount: "$15",
    },
  ];
  const RenderItems = ({item}) => <ListCard items={item} />;
  return (
    <View style={Style.container}>
      <View>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          heading={labels.ExpensesList.JanuaryExpenses}
          Folder={<Doclogo />}
        />
      </View>
      <View style={Style.searchbarstyle}>
        <SearcBar placeholder={labels.ExpensesList.Searchhere} />
      </View>
      <View style={Style.flatlistview}>
        <FlatList data={DATA} renderItem={RenderItems} />
      </View>
    </View>
  );
};
export default ExpensesList;

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbarstyle: {
    marginTop: -25,
  },
  flatlistview: {
    marginTop: 17,
    marginHorizontal: 15,
  },
});
