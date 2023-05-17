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
import Ic_upArrow from '../../../../assets/Images/Ic_upArrow.svg';

import Threedot from "../.././../../assets/Images/Darkthreedots.svg";
import Label from "../../../../utils/ProjectLabels.json";
import SubCard from "./SubCard";
import { styles } from "screens/Auth/signup/style";

const ListCard = (props: any) => {
  console.log("items=======",props?.items)
  const [open, setopen] = useState(false);
  const [rowData, setRowData] = useState(JSON.parse(props?.items?.items))
  const toggle = () => {
    setopen(!open);
  };
  return (
    <TouchableOpacity style={style.container}
    onPress={() => toggle()}
    >
      <View style={style.innercontainer}>
        <View style={style.subview}>
          <View>
            <Text style={style.texthead}>{Object.values(rowData)[0] }</Text>
          </View>
          <View style={style.Space}></View>
          <View
            style={[style.arrowstyle, style.ThreeDotview]}
            // onPress={() => toggle()}
          >
            {open?<Ic_upArrow/> : <Downarrow />}
          </View>
          <TouchableOpacity style={style.threeDotStyle}>
            <Threedot />
          </TouchableOpacity>
        </View>
        {open ? (
          <View style={style.horizontalspacing}>
            {/* <View style={style.horizontallineview}>
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
            /> */}
            {
            Object.keys(rowData).map((key) => {
              return (
                <View style={style.detailview}>
                  <Text style={style.labelheading}>{key}</Text>
                  <View style={style.emptyview}></View>
                  <Text style={style.detailnametext}>{(rowData)[key]}</Text>
                </View>
              )
            })}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
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
  ThreeDotview: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  detailview: { marginTop: 16, flexDirection: "row", alignItems: "center" },
  labelheading: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
    opacity: 0.5,
  },
  emptyview: {
    flex: 1,
  },
  detailnametext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
  },
  threeDotStyle:{
    height:25,
    width:25,
    justifyContent:'center',
    alignItems:'center'
  }
});
