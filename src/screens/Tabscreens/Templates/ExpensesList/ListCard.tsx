import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  FlatList,
} from "react-native";
import { FONTS, COLOURS } from "../../../../utils/Constant";
import Downarrow from "../.././../../assets/Images/dropdown.svg";
import Ic_upArrow from "../../../../assets/Images/Ic_upArrow.svg";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Threedot from "../.././../../assets/Images/Darkthreedots.svg";
import moment from "moment";

const ListCard = (props: any) => {
  console.log("items=======", props?.items);
  const [open, setopen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const toggle = () => {
    setopen(!open);
  };

  useEffect(() => {
    arrangeAscendingOrder();
  }, [props]);

  const arrangeAscendingOrder = () => {
    let parseItem = JSON.parse(props?.items.items);
    parseItem.sort(function (a, b) {
      return a.column_Index - b.column_Index;
    });
    setRowData(parseItem);
  };

  const toggleButton = () => {
    setopen((prev) => !prev);
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 300,
    });
  };

  const renderValue = () => {
    let value = "";
    rowData.forEach((element: any) => {
      if (value =='' && element.column_Type == "Sentences") {
        value = element.column_Value;
      }
      if (value == "" && element.column_Type == "Date") {
        value = moment(element.column_Value).format("MMM DD, YYYY");
      }
    });
    return value;
  };

  // ----------- Render Row Items -----------

  const renderRowItems = ({ item }: any) => (
    <View style={style.detailview}>
      <View>
      <Text style={style.labelheading}>{item.column_Name}</Text>
      </View>
      <View style={style.emptyview}></View>
      <View>
      <Text style={style.detailnametext}>
        {item.column_Type == "Date"
          ? moment(item.column_Value).format("MMM DD, YYYY")
          : item.column_Value}
      </Text>
      </View>
    </View>
  );

  return (
    <View
      style={[
        style.innercontainer,
        {
          borderWidth: 1,
          borderColor: open ? COLOURS.lightgrey : COLOURS.cardBorder_lightBlue,
        },
      ]}
    >
      <View style={style.subview}>
        <View style={{ height: 40, justifyContent: "center" }}>
          <Text style={style.texthead}>{renderValue()?renderValue():rowData[0]?.column_Value}</Text>
        </View>
        <View style={style.Space}></View>
        <TouchableOpacity
          style={style.arrowstyle}
          onPress={() => toggleButton()}
        >
          {open ? <Ic_upArrow /> : <Downarrow />}
        </TouchableOpacity>
        <TouchableOpacity
          style={style.threeDotStyle}
          onPress={props.onPressThreeDot}
        >
          <Threedot />
        </TouchableOpacity>
      </View>
      {open ? (
        <Animated.View style={style.horizontalspacing}>
          <Animated.View style={style.seprator}></Animated.View>
          <FlatList data={rowData} renderItem={renderRowItems} />
        </Animated.View>
      ) : null}
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
    paddingHorizontal: 18,
    paddingVertical: 10,
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
  threeDotStyle: {
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  seprator: {
    borderWidth: 1,
    borderColor: COLOURS.lightgrey,
  },
});
