import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FONTS, COLOURS } from "../../../../utils/Constant";
import Downarrow from "../.././../../assets/Images/dropdown.svg";
import Threedot from "../.././../../assets/Images/Darkthreedots.svg";
import Label from "../../../../utils/ProjectLabels.json";
import SubCard from "./SubCard";

const ListCard = (props: any) => {
  const [open, setopen] = useState(false);
  const toggle = () => {
    setopen(!open);
  };
  return (
    <View style={style.container}>
      <View style={style.innercontainer}>
        <View style={style.subview}>
          <View>
            <Text style={style.texthead}>{props.items.itemname}</Text>
          </View>
          <View style={style.Space}></View>
          <View style={style.arrowstyle}>
            <Downarrow />
          </View>
          <TouchableOpacity onPress={() => toggle()}>
            <Threedot />
          </TouchableOpacity>
        </View>
        {open ? (
          <View styel={style.horizontalspacing}>
            <View style={style.horizontallineview}>
              <View style={style.innerhoeizontaline} />
            </View>
            <SubCard
              subhaeding={Label.ExpensesList.ExpensesName}
              details={props.items.itemname}
            />
            <SubCard
              subhaeding={Label.ExpensesList.ExpensesDate}
              details={props.items.ExpensesDate}
            />
            <SubCard
              subhaeding={Label.ExpensesList.ExpensesType}
              details={props.items.ExpensesType}
            />
            <SubCard
              subhaeding={Label.ExpensesList.ExpensesAmount}
              details={props.items.ExpensesAmount}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default ListCard;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  subview: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    height: 50,
  },
  texthead: {
    fontFamily: FONTS.inter_medium,
    fontSize: 14,
    color: COLOURS.black,
  },
  Space: {
    flex: 1,
  },
  arrowstyle: {
    marginRight: 16,
  },
  innerhoeizontaline: {
    flex: 1,
    height: 1,
    backgroundColor: COLOURS.lightgrey,
  },
  horizontallineview: {
    flexDirection: "row",
    alignItems: "center",
  },
  innercontainer: {
    paddingHorizontal: 16,

    backgroundColor: COLOURS.white,
    borderRadius: 8,
    marginBottom: 20,
  },
  carddetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  subheadingtext: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    opacity: 0.5,
    color: COLOURS.black,
  },
  headingvalue: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    color: COLOURS.black,
  },
  horizontalspacing: { marginBottom: 20 },
});
