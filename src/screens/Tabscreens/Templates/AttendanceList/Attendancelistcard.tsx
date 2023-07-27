import React, { useRef, useState, useEffect } from "react";
import label from "../../../../utils/ProjectLabels.json";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  FlatList,
} from "react-native";
import Downarrow from "../.././../../assets/Images/dropdown.svg";
import Ic_upArrow from "../../../../assets/Images/Ic_upArrow.svg";
import Threedot from "../.././../../assets/Images/Darkthreedots.svg";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { styles } from "../TabBarTemplateList/style";
import moment from "moment";

export const Attendancelistcard = (props: any) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    arrangeAscendingOrder();
  }, [props]);

  const arrangeAscendingOrder = () => {
    let parseItem = JSON.parse(props?.item.items);
    parseItem.sort(function (a, b) {
      return a.column_Index - b.column_Index;
    });
    setItems(parseItem);
  };

  const toggleSwitch = () => {
    setIsOpen((prev) => !prev);
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 300,
    });
  };

  //----------- check date or word ---------
  const renderValue = () => {
    let value = "";
    items.forEach((element: any) => {
      if (value == "" && element.column_Type == "Sentences") {
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
    <View style={Styles.detailview}>
      <Text style={Styles.labelheading}>{item.column_Name}</Text>
      <View style={Styles.emptyview}></View>
      <View style={{ width: "75%" }}>
        <Text style={Styles.detailnametext}>
          {item.column_Type == "Date"
            ? moment(item.column_Value).format("MMM DD, YYYY")
            : item.column_Value}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={Styles.container}>
      <View
        style={[
          Styles.innercontainer,
          {
            borderColor: isOpen
              ? COLOURS.lightgrey
              : COLOURS.cardBorder_lightBlue,
          },
        ]}
      >
        <View style={Styles.subcontainer}>
          <View>
            <Text style={Styles.nametext}>
              {renderValue() ? renderValue() : items[0]?.column_Value}
            </Text>
          </View>
          <View style={Styles.emptyview}></View>
          <TouchableOpacity style={Styles.gap} onPress={toggleSwitch}>
            {isOpen ? <Ic_upArrow /> : <Downarrow />}
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={Styles.ThreeDotview}
              onPress={props.openEditRecord}
            >
              <Threedot />
            </TouchableOpacity>
          </View>
        </View>
        {isOpen ? (
          <Animated.View style={Styles.bottomgap}>
            <View style={Styles.horizontallineview}>
              <View style={Styles.innerhoeizontaline} />
            </View>
            <FlatList data={items} renderItem={renderRowItems} />
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
};

export default Attendancelistcard;

const Styles = StyleSheet.create({
  container: {},
  innercontainer: {
    paddingHorizontal: 16,
    backgroundColor: COLOURS.white,
    borderRadius: 8,
    borderWidth: 1,
  },
  emptyview: {
    flex: 1,
  },
  subcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  gap: {
    marginRight: 10,
    width: 65,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  nametext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
  },
  detailnametext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
    textAlign: "right",
  },
  labelheading: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
    opacity: 0.5,
  },
  horizontallineview: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerhoeizontaline: {
    flex: 1,
    height: 1,
    backgroundColor: COLOURS.lightgrey,
  },
  detailview: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomgap: {
    marginBottom: 20,
  },
  ThreeDotview: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
